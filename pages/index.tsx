import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, {FormEvent, useEffect} from 'react';
import { getChannels } from '../services/messages';
import styles from '../styles/Board.module.css';
import {useBoardApi} from '../utils/client/useBoardApi';

type BoardProps = {
  channels: readonly string[];
}

export const getStaticProps: GetStaticProps<BoardProps> = async (context) => {
  const channels = await getChannels();
  return {
    props: {
      channels,
    },
  };
};

const Board: NextPage<BoardProps> = (props) => {
  const {addMessage, getChannelMessages, activeChannel, setActiveChannel} = useBoardApi();

  const onFormSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    addMessage(form.message.value);
    form.reset();
    form.message.focus();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Messages Board</title>
        <meta name="description" content="Read and write messages online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <menu className={styles.channelsMenu}>
        {props.channels.map((channel) => (
          <li key={channel} className={[
            styles.channelsMenuItem,
            channel === activeChannel ? styles.channelsMenuItemSelected : ''
          ].join(' ')} onClick={() => setActiveChannel(channel)}>{channel}</li>
        ))}
      </menu>
      <main className={styles.channelMessages}>
        {getChannelMessages().map((message, messageIndex) => (
          <article className={styles.channelMessagesItem} key={messageIndex}>{message}</article>
        ))}
        {activeChannel ? <form onSubmit={onFormSubmit} className={styles.newMessageForm}>
          <textarea autoFocus name="message" required></textarea>
          <input type="submit" value="Add message" />
          </form> : null}
      </main>
    </div>
  );
};

export default Board;

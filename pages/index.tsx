import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, {FormEvent, useEffect} from 'react';
import { getChannels } from '../services/messages';
import styles from '../styles/Board.module.css';
import {addMessage, getChannelMessages} from '../utils/client/boardApi';

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
  const [selectedChannel, setSelectedChannel] = React.useState<string | null>(null);
  const [channelMessages, setChannelMessages] = React.useState<string[]>([]);

  useEffect(() => {
    if (!selectedChannel) {
      return;
    }
    let isNonActual = false;
    (async () => {
      const messages = await getChannelMessages(selectedChannel);
      if (!isNonActual) {
        setChannelMessages(messages);
      }
    })();
    return () => {
      isNonActual = true;
    }
  }, [selectedChannel]);

  const onFormSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const message = form.message.value;
    addMessage(selectedChannel as string, message).then((channelMessages) => {
      form.reset();
      form.message.focus();
      setChannelMessages(channelMessages);
    });
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
            channel === selectedChannel ? styles.channelsMenuItemSelected : ''
          ].join(' ')} onClick={() => setSelectedChannel(channel)}>{channel}</li>
        ))}
      </menu>
      <main className={styles.channelMessages}>
        {channelMessages.map((message, messageIndex) => (
          <article className={styles.channelMessagesItem} key={messageIndex}>{message}</article>
        ))}
        {selectedChannel ? <form onSubmit={onFormSubmit} className={styles.newMessageForm}>
          <textarea autoFocus name="message" required></textarea>
          <input type="submit" value="Add message" />
          </form> : null}
      </main>
    </div>
  );
};

export default Board;

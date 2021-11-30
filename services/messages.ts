/**
 * Data
 */
const channels = ['js', 'ts', 'react', 'node'] as const;

type Channel = typeof channels[number];

const messages = channels.reduce((acc, channelName) => ({
    ...acc,
    [channelName]: new Array(10).fill('').map((_, i) => `${channelName} message ${i}`),
  }), {}) as Record<Channel, string[]>;

/**
 * API
 */

export const getChannels = async () => channels;

export const getChannelMessages = async (channel: string) => channel in messages ? messages[channel as Channel] : [];

export const addChannelMessage = async (channel: string, message: string) => {
  if (!(channel in messages)) {
    throw new Error(`"${channel}"" is not a valid channel name`);
  }
  messages[channel as Channel].push(message);
  return messages[channel as Channel];
}
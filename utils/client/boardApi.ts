export async function addMessage(channel:string | null, message:string):Promise<string[]> {
  if (!channel) {
    throw new Error(`You have to select channel before posting a message`);
  }
  return fetch(`/api/${channel}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message
    })
  }).then(response => response.json());
}

export async function getChannelMessages(channel: string | null): Promise<string[]> {
  if (!channel) {
    throw new Error('You must specify channel to load messages');
  }
  const req = await fetch(`/api/messages/${channel}`);
  return req.json();
}
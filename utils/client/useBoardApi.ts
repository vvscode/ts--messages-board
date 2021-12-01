import React, {useEffect} from "react";

export const useBoardApi = () => {
  const cache = React.useRef<Record<string, string[]>>({});
  const [activeChannel, setActiveChannel] = React.useState<string | null>(null);
  const [version, setVersion] = React.useState(0);
  console.log({cache})

   const addMessage = React.useCallback((message:string) => {
    if (!activeChannel) {
      throw new Error(`You have to select channel before posting a message`);
    }
    fetch(`/api/${activeChannel}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message
      })
    })
    .then(response => response.json())
    .then((messages) => {
      cache.current[activeChannel] = messages;
      setVersion((version) => version + 1);
    });
  }, [activeChannel]);
  
   const getChannelMessages = React.useCallback((): string[] => {
    return cache.current[activeChannel as any] || [];
  }, [activeChannel]);

  useEffect(() => {
    if (!activeChannel) {
      return;
    }
    (async () => {
      const req = await fetch(`/api/messages/${activeChannel}`);
      const messages = await req.json();
      cache.current[activeChannel] = messages;
      setVersion((version) => version + 1);
    })();
  }, [activeChannel, cache]);

  return {
    addMessage,
    getChannelMessages,
    activeChannel,
    setActiveChannel,
  }
}

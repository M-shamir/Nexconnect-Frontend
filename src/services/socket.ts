// src/utils/socket.ts
type Callback = (data: any) => void;

export interface ChatSocket {
  send: (data: any) => void;
  disconnect: () => void;
  onMessage: (cb: Callback) => void;
  onOpen: (cb: () => void) => void;
  onClose: (cb: () => void) => void;
}

export function createChatSocket(roomId: string): ChatSocket {
  const socket = new WebSocket(`${import.meta.env.VITE_WS_BASE_URL}${roomId}/`);


  let onMessageCallback: Callback = () => {};
  let onOpenCallback: () => void = () => {};
  let onCloseCallback: () => void = () => {};

  socket.onopen = () => {
    onOpenCallback();
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessageCallback(data);
  };

  socket.onclose = () => {
    onCloseCallback();
  };

  return {
    send: (data) => socket.send(JSON.stringify(data)),
    disconnect: () => socket.close(),
    onMessage: (cb) => (onMessageCallback = cb),
    onOpen: (cb) => (onOpenCallback = cb),
    onClose: (cb) => (onCloseCallback = cb),
  };
}

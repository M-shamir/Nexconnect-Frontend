type MessageHandler = (data: { message: string; username: string }) => void;

class ChatSocket {
  private socket: WebSocket | null = null;

  connect(roomId: string, onMessage: MessageHandler): void {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${protocol}://localhost:8000/ws/chat/${roomId}/`;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    this.socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.socket.onclose = () => {
      console.log('❌ WebSocket closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  send(message: string, username: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ message, username }));
    }
  }

  disconnect(): void {
    this.socket?.close();
  }
}

export default new ChatSocket();

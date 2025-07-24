import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import chatSocket from '../../services/chatSocket';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export default function Chat() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Setup WebSocket connection
  useEffect(() => {
    if (!roomId || !user) return;

    chatSocket.connect(roomId, (data) => {
      const incomingMsg: Message = {
        id: Date.now().toString(),
        sender: data.username,
        text: data.message,
        timestamp: new Date(),
        isCurrentUser: data.username === user.username,
      };
      setMessages((prev) => [...prev, incomingMsg]);
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [roomId, user]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    chatSocket.send(newMessage, user.username);
    setNewMessage('');
  };

  const handleLeaveRoom = () => {
    chatSocket.disconnect();
    navigate('/rooms');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Chat header */}
        <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Room: {roomId}</h1>
              <button
                onClick={handleLeaveRoom}
                className="text-sm bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full transition-colors"
              >
                Leave Room
              </button>
            </div>
            <div className="text-sm text-gray-300">
              {user?.username || 'You'}
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-4 px-2">
            {messages.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                Start the conversation by sending a message
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[65%] rounded-xl p-4 relative ${
                      msg.isCurrentUser 
                        ? 'bg-blue-600 rounded-br-none' 
                        : 'bg-gray-700 rounded-bl-none'
                    }`}
                  >
                    {!msg.isCurrentUser && (
                      <div className="text-xs font-semibold text-blue-400 mb-1">
                        {msg.sender}
                      </div>
                    )}
                    <div className="text-sm break-words">{msg.text}</div>
                    <div className="text-xs text-gray-300 mt-1 opacity-80">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div
                      className={`absolute bottom-0 w-3 h-3 ${
                        msg.isCurrentUser
                          ? 'right-0 bg-blue-600 rounded-br-sm -mr-[2px]'
                          : 'left-0 bg-gray-700 rounded-bl-sm -ml-[2px]'
                      }`}
                    />
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <div className="bg-gray-800/80 border-t border-gray-700 p-4 sticky bottom-0">
          <form
            onSubmit={handleSendMessage}
            className="max-w-3xl mx-auto flex gap-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoFocus
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-5 py-3 rounded-lg font-medium transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
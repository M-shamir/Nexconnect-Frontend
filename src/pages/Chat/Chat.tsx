// src/pages/Chat/Chat.tsx
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface User {
  id: string;
  name: string;
  initials: string;
  online: boolean;
}

export default function Chat() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'Alex Johnson',
        text: 'Hey everyone! Welcome to the room! How are you all doing today? This is a longer message to test the chat bubble wrapping and alignment.',
        timestamp: new Date(Date.now() - 3600000),
        isCurrentUser: false
      },
      {
        id: '2',
        sender: 'You',
        text: 'Thanks for having me! I\'m excited to collaborate with everyone here.',
        timestamp: new Date(Date.now() - 1800000),
        isCurrentUser: true
      },
      {
        id: '3',
        sender: 'Sarah Miller',
        text: 'What are we discussing today? I was thinking we could go over the new design mockups.',
        timestamp: new Date(Date.now() - 900000),
        isCurrentUser: false
      },
      {
        id: '4',
        sender: 'Michael Chen',
        text: 'I\'ve prepared some initial concepts for the homepage redesign.',
        timestamp: new Date(Date.now() - 600000),
        isCurrentUser: false
      },
      {
        id: '5',
        sender: 'You',
        text: 'That sounds great! I\'ve been working on the user flows and would love to get your feedback.',
        timestamp: new Date(Date.now() - 300000),
        isCurrentUser: true
      }
    ];
    setMessages(mockMessages);
  }, [roomId]);

  const users: User[] = [
    { id: '1', name: 'Alex Johnson', initials: 'AJ', online: true },
    { id: '2', name: 'Sarah Miller', initials: 'SM', online: true },
    { id: '3', name: 'Michael Chen', initials: 'MC', online: true },
    { id: '4', name: 'You', initials: 'YO', online: true }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: newMessage,
      timestamp: new Date(),
      isCurrentUser: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleLeaveRoom = () => {
    // Add any cleanup logic here before leaving
    navigate('/rooms');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Room Info Bar */}
        <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Design Team Collaboration</h1>
              <button 
                onClick={handleLeaveRoom}
                className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full transition-colors"
              >
                Leave Room
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowUsers(!showUsers)}
                className="flex -space-x-2 hover:space-x-0 transition-all duration-200"
              >
                {users.slice(0, 4).map((user) => (
                  <div 
                    key={user.id}
                    className={`w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs font-medium transition-all ${
                      user.online ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    {user.initials}
                  </div>
                ))}
              </button>
              <span className="text-sm text-gray-300">{users.length} online</span>
            </div>
          </div>
        </div>

        {/* Users Modal */}
        {showUsers && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md mx-4">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Room Members</h3>
                <button 
                  onClick={() => setShowUsers(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center p-4 hover:bg-gray-700/50 transition-colors">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mr-3 ${
                      user.online ? 'border-green-500' : 'border-gray-600'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        user.online ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        {user.initials}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">
                        {user.name} {user.id === '4' && '(You)'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {user.online ? 'Online' : 'Offline'}
                      </div>
                    </div>
                    {user.online && (
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div 
          ref={messagesContainerRef}
          className="flex-grow p-4 overflow-y-auto scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="max-w-3xl mx-auto space-y-3 px-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[65%] rounded-xl p-4 relative ${
                    message.isCurrentUser
                      ? 'bg-blue-600 rounded-br-none'
                      : 'bg-gray-700 rounded-bl-none'
                  }`}
                >
                  {!message.isCurrentUser && (
                    <div className="text-xs font-semibold text-blue-400 mb-1">
                      {message.sender}
                    </div>
                  )}
                  <div className="text-sm break-words">{message.text}</div>
                  <div className={`text-xs text-gray-300 mt-1 ${
                    message.isCurrentUser ? 'text-blue-200' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  {/* Chat bubble tail */}
                  <div className={`absolute bottom-0 w-3 h-3 ${
                    message.isCurrentUser 
                      ? 'right-0 bg-blue-600 rounded-br-sm -mr-[2px]' 
                      : 'left-0 bg-gray-700 rounded-bl-sm -ml-[2px]'
                  }`}></div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 p-4 sticky bottom-0">
          <form 
            onSubmit={handleSendMessage} 
            className="max-w-3xl mx-auto flex gap-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
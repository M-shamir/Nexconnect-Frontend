import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

interface Room {
  id: string;
  name: string;
  room_type: 'chat' | 'video';
  created_by: string;
  created_at: string;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [roomType, setRoomType] = useState<'chat' | 'video'>('chat');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    fetchRooms();
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get('chat/rooms/');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      setLoading(true);
      const response = await api.post('chat/rooms/', {
        room_name: newRoomName,
        room_type: roomType,
      });
      const createdRoom = response.data;
      navigate(`/chat/${createdRoom.id}`);
    } catch (error) {
      console.error('Room creation failed:', error);
      alert('Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: '0px 5px 15px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 overflow-hidden">
      <Header />

      <main className="flex-grow">
        <motion.section
          className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10 mix-blend-multiply animate-float"></div>
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-10 mix-blend-multiply animate-float-delay"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Active Rooms
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Join existing rooms or create a new one
              </p>
            </motion.div>

            {/* Create Room Form */}
            <motion.form
              onSubmit={handleCreateRoom}
              className="mb-10 flex flex-col sm:flex-row gap-4 items-center"
              variants={itemVariants}
            >
              <input
                type="text"
                placeholder="Enter Room Name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                required
              />
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as 'chat' | 'video')}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white"
              >
                <option value="chat">Chat</option>
                
              </select>
              <motion.button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-white"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create & Join'}
              </motion.button>
            </motion.form>

            {/* Rooms List */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{room.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span
                            className={`px-2 py-1 rounded-md text-xs ${
                              room.room_type === 'video'
                                ? 'bg-purple-900/50 text-purple-400'
                                : 'bg-blue-900/50 text-blue-400'
                            }`}
                          >
                            {room.room_type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-6">
                      <span>{new Date(room.created_at).toLocaleString()}</span>
                    </div>

                    <motion.button
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => navigate(`/chat/${room.id}`)}
                    >
                      Join Room
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

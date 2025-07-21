// src/pages/Rooms.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Mock data for rooms
const rooms = [
  {
    id: '1',
    title: 'Design Team Collaboration',
    type: 'chat',
    creator: 'Alex Johnson',
    createdAt: '2 hours ago',
    members: 5,
  },
  {
    id: '2',
    title: 'Weekly Standup Meeting',
    type: 'video call',
    creator: 'Sarah Miller',
    createdAt: '1 day ago',
    members: 8,
  },
  {
    id: '3',
    title: 'Project Brainstorming',
    type: 'chat',
    creator: 'Michael Chen',
    createdAt: '3 days ago',
    members: 3,
  },
];

export default function Rooms() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
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
          {/* Animated background elements */}
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

            {/* Create Room Button */}
            <motion.div 
              className="mb-10"
              variants={itemVariants}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium flex items-center gap-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Room
              </motion.button>
            </motion.div>

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
                        <h3 className="text-xl font-semibold mb-1">{room.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span className={`px-2 py-1 rounded-md text-xs ${
                            room.type === 'video call' 
                              ? 'bg-purple-900/50 text-purple-400' 
                              : 'bg-blue-900/50 text-blue-400'
                          }`}>
                            {room.type}
                          </span>
                          <span>{room.members} members</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                          {room.creator.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>Created by {room.creator}</span>
                      </div>
                      <span>{room.createdAt}</span>
                    </div>

                    <motion.button
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
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
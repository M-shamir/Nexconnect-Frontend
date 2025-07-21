// src/pages/Home.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
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
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 overflow-hidden">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-float"></div>
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-float-delay"></div>
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 leading-tight"
              variants={itemVariants}
            >
              Realtime Connections<br />Made Simple
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
              variants={itemVariants}
            >
              Instantly create secure chat rooms, share unique links, and collaborate with your team in realtime.
            </motion.p>
            
            <motion.div 
              className="flex justify-center"
              variants={itemVariants}
            >
              <motion.button 
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg relative overflow-hidden group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">Create New Room</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              variants={containerVariants}
            >
              {[
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  desc: 'Messages delivered in milliseconds with our realtime infrastructure'
                },
                {
                  icon: '🔒',
                  title: 'End-to-End Secure',
                  desc: 'All communications are encrypted for maximum privacy'
                },
                {
                  icon: '🌐',
                  title: 'Cross-Platform',
                  desc: 'Works seamlessly on all devices and browsers'
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
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
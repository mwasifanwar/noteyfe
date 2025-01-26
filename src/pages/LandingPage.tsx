import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Heart, Notebook, ArrowRight, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get smart suggestions and organize your thoughts effortlessly"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Organization",
      description: "Automatic categorization and tagging for better note management"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Beautiful Interface",
      description: "A delightful and intuitive experience for your daily note-taking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-pink-100 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Notebook className="w-6 sm:w-8 h-6 sm:h-8 text-pink-400" />
            <span className="text-xl sm:text-2xl font-playfair text-gray-800">Notesy</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-pink-50 transition-all md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Button */}
          <button
            onClick={() => navigate('/app')}
            className="hidden md:flex px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all"
          >
            Open App
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-pink-100 p-4 md:hidden"
          >
            <button
              onClick={() => {
                navigate('/app');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all"
            >
              Open App
            </button>
          </motion.div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Hero Content */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-playfair text-gray-800 mb-4 sm:mb-6 px-4"
          >
            Your Thoughts, <span className="text-pink-400">Beautifully</span> Organized
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Experience note-taking reimagined with AI-powered organization, beautiful design, and seamless collaboration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => navigate('/app')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all text-base sm:text-lg font-semibold flex items-center gap-2 mx-auto"
            >
              Get Started <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 3) }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-pink-100"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-pink-50 rounded-lg flex items-center justify-center text-pink-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-playfair text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-xl mx-4"
        >
          <img
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&auto=format&fit=crop&q=60"
            alt="App preview"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 sm:p-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-playfair mb-3 sm:mb-4">Beautiful. Intuitive. Powerful.</h2>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-xl">Experience a note-taking app that adapts to your style and helps you stay organized effortlessly.</p>
              <button
                onClick={() => navigate('/app')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-800 rounded-lg hover:bg-pink-50 transition-all font-semibold text-sm sm:text-base"
              >
                Try Now
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 py-6 sm:py-8 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600 text-sm sm:text-base">
          <p>© 2024 Notesy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
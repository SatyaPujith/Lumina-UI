import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Calendar, MapPin, User, Moon, Sun, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import { useEvents } from '../context/EventContext';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { setFilters } = useEvents();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      if (searchQuery) {
        setSearchQuery('');
        setFilters({ search: '' });
      }
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchQuery });
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass border-b-0">
      <Link to="/" className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-black rounded-full" />
        </motion.div>
        <span className="text-xl font-medium tracking-tighter serif italic">Lumina</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {[
          { name: 'Explore', path: '/' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "text-sm font-medium tracking-wide transition-colors hover:text-white",
              location.pathname === item.path ? "text-white" : "text-white/50"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="relative flex items-center">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleSearchSubmit}
                className="overflow-hidden mr-2"
              >
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-white/30 text-white placeholder:text-white/30"
                  autoFocus
                />
              </motion.form>
            )}
          </AnimatePresence>
          <button
            onClick={handleSearchToggle}
            className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            title="Search"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>
        <Link
          to="/host"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Host Event</span>
        </Link>
        <Link
          to="/schedule"
          title="Profile & My Schedule"
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center overflow-hidden bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <User size={20} className="text-white/50 hover:text-white transition-colors" />
        </Link>
      </div>
    </nav>
  );
};

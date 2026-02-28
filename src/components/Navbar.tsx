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

      <div className="flex items-center gap-1.5 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer flex-shrink-0"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="relative flex items-center">
          <AnimatePresence>
            {isSearchOpen && (
              <>
                {/* Mobile Full Navbar Search Overlay */}
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSearchSubmit}
                  className="fixed sm:hidden top-0 left-0 right-0 h-[72px] z-[60] flex items-center px-6 bg-black/90 backdrop-blur-xl border-b border-white/10"
                >
                  <Search size={20} className="text-white/50 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-white/30 text-base py-2 w-full"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="p-2 -mr-2 text-white/50 hover:text-white transition-colors ml-2 flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </motion.form>

                {/* Desktop/Tablet Inline Search */}
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="hidden sm:block overflow-hidden relative"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[200px] md:w-[220px] mr-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-white/30 text-white placeholder:text-white/30"
                    autoFocus
                  />
                </motion.form>
              </>
            )}
          </AnimatePresence>
          <button
            onClick={handleSearchToggle}
            className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            title="Search"
          >
            {isSearchOpen ? <X size={20} className="hidden sm:block" /> : <Search size={20} />}
            {isSearchOpen && <Search size={20} className="sm:hidden" />}
          </button>
        </div>
        <Link
          to="/host"
          className="flex items-center justify-center gap-2 w-[36px] h-[36px] sm:w-auto sm:h-auto sm:px-4 sm:py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-all active:scale-95 flex-shrink-0"
          title="Host Event"
        >
          <Plus size={18} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:block">Host Event</span>
        </Link>
        <Link
          to="/schedule"
          title="Profile & My Schedule"
          className="w-[36px] h-[36px] sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center overflow-hidden bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
        >
          <User size={18} className="text-white/50 hover:text-white transition-colors sm:w-5 sm:h-5" />
        </Link>
      </div>
    </nav>
  );
};

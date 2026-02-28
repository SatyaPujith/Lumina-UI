/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { EventDetail } from './pages/EventDetail';
import { HostEvent } from './pages/HostEvent';
import { Schedule } from './pages/Schedule';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/host" element={<HostEvent />} />
                <Route path="/schedule" element={<Schedule />} />
              </Routes>
            </AnimatePresence>

            <footer className="py-20 px-6 border-t border-white/5 mt-20">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-black rounded-full" />
                  </motion.div>
                  <span className="text-xl font-medium tracking-tighter serif italic">Lumina</span>
                </div>
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  © 2026 Lumina Experiences. All rights reserved.
                </p>
                <div className="flex gap-8 text-white/30 text-xs uppercase tracking-widest">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </EventProvider>
    </ThemeProvider>
  );
}

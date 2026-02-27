import React from 'react';
import { motion } from 'motion/react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { Calendar } from 'lucide-react';

export const Schedule = () => {
  const { events, registeredEvents } = useEvents();
  const myEvents = events.filter(e => registeredEvents.includes(e.id));

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16">
        <h1 className="text-6xl font-light serif italic mb-4">Your <br /><span className="font-bold not-italic">Schedule.</span></h1>
        <p className="text-white/50">Keep track of the experiences you've joined.</p>
      </header>

      {myEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {myEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center glass rounded-[40px] border-dashed border-white/10">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={24} className="text-white/20" />
          </div>
          <p className="text-white/30 text-xl serif italic mb-8">Your schedule is currently empty.</p>
          <a 
            href="/"
            className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
          >
            Explore Events
          </a>
        </div>
      )}
    </main>
  );
};

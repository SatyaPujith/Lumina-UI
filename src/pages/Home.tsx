import React from 'react';
import { motion } from 'motion/react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { Filter, X } from 'lucide-react';

export const Home = () => {
  const { filteredEvents, setFilters, events } = useEvents();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const types = ['All', ...new Set(events.map(e => e.type))];
  const locations = ['All', ...new Set(events.map(e => e.location))];

  return (
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter serif italic mb-4">
              Discover <br />
              <span className="font-bold not-italic">Moments.</span>
            </h1>
            <p className="text-white/50 max-w-md text-lg">
              Curated local experiences designed for the curious and the connected.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all"
            >
              <Filter size={18} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </motion.div>

        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 p-6 glass rounded-2xl border-white/5 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setFilters({ type })}
                      className="px-4 py-2 rounded-full text-xs border border-white/10 hover:border-white/30 transition-all"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 block">Location</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setFilters({ location: loc })}
                      className="px-4 py-2 rounded-full text-xs border border-white/10 hover:border-white/30 transition-all"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 block">Search</label>
                <input
                  type="text"
                  placeholder="Find an experience..."
                  onChange={(e) => setFilters({ search: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-white/30 text-xl serif italic">No events found matching your criteria.</p>
          <button 
            onClick={() => setFilters({ type: 'All', location: 'All', search: '' })}
            className="mt-4 text-white underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      )}
    </main>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../data/events';
import { cn } from '../lib/utils';

interface EventCardProps {
  event: Event;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <Link to={`/event/${event.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              {event.type}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-medium serif italic mb-2 leading-tight">
              {event.title}
            </h3>
            <div className="flex flex-col gap-1 text-white/60 text-xs font-medium uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

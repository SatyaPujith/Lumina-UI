import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, User, ArrowLeft, CheckCircle2, Share2, Heart } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { cn } from '../lib/utils';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registerForEvent, registeredEvents } = useEvents();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const event = events.find(e => e.id === Number(id));
  const isRegistered = registeredEvents.includes(Number(id));

  if (!event) return <div className="pt-32 text-center">Event not found</div>;

  const handleRSVP = () => {
    registerForEvent(event.id);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[60vh] w-full">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 p-3 rounded-full glass hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-12 left-6 right-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-black rounded-full mb-6 inline-block">
              {event.type}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold serif italic mb-6 leading-tight max-w-4xl">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-8 text-white/60 text-sm font-medium uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-white" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-white" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-white" />
                <span>Hosted by {event.host}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <img src={`https://i.pravatar.cc/150?u=${event.host}`} alt={event.host} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="text-white font-medium text-lg">Hosted by {event.host}</h3>
                <p className="text-white/40 text-sm">Experience Creator • {((event.id * 7) % 50) + 5} past events</p>
              </div>
            </div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">The Experience</h2>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              {event.description}
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">What to expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(event.expectations && event.expectations.length > 0 ? event.expectations : [
                "Expert-led session",
                "Community networking",
                "Premium venue",
                "Refreshments included"
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5">
                  <CheckCircle2 size={18} className="text-white/40" />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-32 p-8 rounded-3xl glass border-white/10">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-medium tracking-tight">{event.price || "Free Entry"}</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full border border-white/10 hover:bg-white/5 cursor-pointer"><Share2 size={18} /></button>
                <button className="p-2 rounded-full border border-white/10 hover:bg-white/5 cursor-pointer"><Heart size={18} /></button>
              </div>
            </div>

            <div className="flex -space-x-3 mb-6 justify-center">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${(event.id * i + 10) % 70}`}
                  alt="Attendee"
                  className="w-10 h-10 rounded-full border-2 border-black object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-xs font-medium backdrop-blur-md">
                +{((event.id * 13) % 150 + 20)}
              </div>
            </div>

            <button
              onClick={handleRSVP}
              disabled={isRegistered}
              className={cn(
                "w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all active:scale-[0.98]",
                isRegistered
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                  : "bg-white text-black hover:bg-white/90"
              )}
            >
              {isRegistered ? "You're Registered" : "Join Experience"}
            </button>

            <p className="mt-6 text-center text-xs text-white/40">
              Limited spots available. RSVP to secure your place.
            </p>
          </div>
        </aside>
      </main>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full p-12 rounded-[40px] bg-white text-black text-center"
            >
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold serif italic mb-4">You're in!</h2>
              <p className="text-black/60 mb-8 leading-relaxed">
                We've added <strong>{event.title}</strong> to your schedule. See you in {event.location}!
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-4 bg-black text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

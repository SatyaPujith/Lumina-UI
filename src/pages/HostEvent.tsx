import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { ArrowLeft, Upload, MapPin, Calendar, Tag, Info } from 'lucide-react';

export const HostEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Workshop',
    date: '',
    location: '',
    host: '',
    description: '',
    image: '',
    price: 'Free',
    expectations: 'Expert-led session, Community networking',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expectationsArray = formData.expectations.split(',').map(s => s.trim()).filter(Boolean);
    addEvent({
      ...formData,
      expectations: expectationsArray
    });
    navigate('/');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium uppercase tracking-widest">Back</span>
      </button>

      <header className="mb-16">
        <h1 className="text-5xl font-light serif italic mb-4">Host an <br /><span className="font-bold not-italic">Experience.</span></h1>
        <p className="text-white/50">Share your passion with the community. Fill in the details below to list your event.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        <section className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Cover Image</label>
              <div className={`relative border-2 border-dashed border-white/10 rounded-2xl p-12 hover:border-white/30 transition-colors cursor-pointer group flex flex-col items-center justify-center overflow-hidden ${formData.image ? 'border-none' : ''}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                {formData.image ? (
                  <img src={formData.image} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-40 transition-opacity" />
                ) : null}
                <Upload size={32} className="text-white/40 mb-3 z-10" />
                <span className="text-sm font-medium text-white/40 z-10">
                  {formData.image ? 'Change cover image' : 'Click or drag to upload cover image'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Event Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Midnight Jazz Session"
                className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light focus:outline-none focus:border-white transition-colors"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Category</label>
                <div className="relative">
                  <Tag className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <select
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-lg focus:outline-none focus:border-white transition-colors appearance-none"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    {['Workshop', 'Music', 'Sports', 'Meetup', 'Social', 'Entertainment', 'Fitness'].map(t => (
                      <option key={t} value={t} className="bg-neutral-900">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    required
                    type="date"
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-lg focus:outline-none focus:border-white transition-colors"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="City or Venue"
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-lg focus:outline-none focus:border-white transition-colors"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Host Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your Name or Organization"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-lg focus:outline-none focus:border-white transition-colors"
                  value={formData.host}
                  onChange={e => setFormData({ ...formData, host: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Price</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Free, $10, etc."
                  className="w-full bg-transparent border-b border-white/10 py-4 text-lg focus:outline-none focus:border-white transition-colors"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">What to Expect (Comma Separated)</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Networking, Drinks, Music"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-lg focus:outline-none focus:border-white transition-colors"
                  value={formData.expectations}
                  onChange={e => setFormData({ ...formData, expectations: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Description</label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about the experience..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-white/30 transition-colors resize-none"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-6 bg-white text-black rounded-2xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all active:scale-[0.98]"
        >
          Publish Experience
        </button>
      </form>
    </div>
  );
};

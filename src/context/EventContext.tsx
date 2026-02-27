import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, MOCK_EVENTS } from '../data/events';

interface EventContextType {
  events: Event[];
  filteredEvents: Event[];
  setFilters: (filters: { type?: string; location?: string; date?: string; search?: string }) => void;
  registerForEvent: (eventId: number) => void;
  registeredEvents: number[];
  addEvent: (event: Omit<Event, 'id'>) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(MOCK_EVENTS);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [currentFilters, setCurrentFilters] = useState<{ type?: string; location?: string; date?: string; search?: string }>({});

  useEffect(() => {
    let result = [...events];

    if (currentFilters.search) {
      const search = currentFilters.search.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(search) || 
        e.description.toLowerCase().includes(search) ||
        e.host.toLowerCase().includes(search)
      );
    }

    if (currentFilters.type && currentFilters.type !== 'All') {
      result = result.filter(e => e.type === currentFilters.type);
    }

    if (currentFilters.location && currentFilters.location !== 'All') {
      result = result.filter(e => e.location === currentFilters.location);
    }

    if (currentFilters.date) {
      result = result.filter(e => e.date === currentFilters.date);
    }

    setFilteredEvents(result);
  }, [currentFilters, events]);

  const setFilters = (filters: { type?: string; location?: string; date?: string; search?: string }) => {
    setCurrentFilters(prev => ({ ...prev, ...filters }));
  };

  const registerForEvent = (eventId: number) => {
    setRegisteredEvents(prev => [...prev, eventId]);
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      image: eventData.image || `https://picsum.photos/seed/${Math.random()}/800/600`
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <EventContext.Provider value={{ events, filteredEvents, setFilters, registerForEvent, registeredEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents must be used within an EventProvider');
  return context;
};

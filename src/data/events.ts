export interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  location: string;
  host: string;
  description: string;
  image?: string;
  price?: string;
  expectations?: string[];
}

export const MOCK_EVENTS: Event[] = [
  {
    "id": 1,
    "title": "Community Yoga Session",
    "type": "Fitness",
    "date": "2025-08-20",
    "location": "Bangalore",
    "host": "Yoga with Anu",
    "description": "Join us for a peaceful yoga session in Cubbon Park. Perfect for all levels, focusing on mindfulness and breathwork.",
    "image": "https://picsum.photos/seed/yoga/800/600"
  },
  {
    "id": 2,
    "title": "Beginner Guitar Workshop",
    "type": "Music",
    "date": "2025-08-22",
    "location": "Mumbai",
    "host": "Strings Academy",
    "description": "Learn the basics of guitar playing with hands-on guidance. No prior experience needed.",
    "image": "https://picsum.photos/seed/guitar/800/600"
  },
  {
    "id": 3,
    "title": "Startup Networking Meetup",
    "type": "Meetup",
    "date": "2025-08-25",
    "location": "Delhi",
    "host": "Delhi Entrepreneurs Club",
    "description": "Meet fellow entrepreneurs, pitch ideas, and network with industry leaders.",
    "image": "https://picsum.photos/seed/startup/800/600"
  },
  {
    "id": 4,
    "title": "Digital Marketing Seminar",
    "type": "Workshop",
    "date": "2025-08-28",
    "location": "Hyderabad",
    "host": "Marketing Gurus",
    "description": "Learn the latest trends and strategies in digital marketing to grow your business.",
    "image": "https://picsum.photos/seed/marketing/800/600"
  },
  {
    "id": 5,
    "title": "Weekend Trek to Nandi Hills",
    "type": "Sports",
    "date": "2025-08-30",
    "location": "Bangalore",
    "host": "Adventure Trails",
    "description": "An early morning trek to Nandi Hills followed by breakfast and great views.",
    "image": "https://picsum.photos/seed/trek/800/600"
  },
  {
    "id": 6,
    "title": "Art & Craft for Kids",
    "type": "Workshop",
    "date": "2025-09-01",
    "location": "Pune",
    "host": "Creative Hands",
    "description": "Fun and educational art activities for children aged 6–12. All materials provided.",
    "image": "https://picsum.photos/seed/art/800/600"
  },
  {
    "id": 7,
    "title": "City Photography Walk",
    "type": "Meetup",
    "date": "2025-09-03",
    "location": "Chennai",
    "host": "Lens Lovers Club",
    "description": "Explore the city while improving your photography skills with expert guidance.",
    "image": "https://picsum.photos/seed/photo/800/600"
  },
  {
    "id": 8,
    "title": "Cooking Masterclass: Italian Cuisine",
    "type": "Workshop",
    "date": "2025-09-05",
    "location": "Kolkata",
    "host": "Chef Maria",
    "description": "Learn to cook authentic Italian dishes from scratch in this hands-on masterclass.",
    "image": "https://picsum.photos/seed/cooking/800/600"
  },
  {
    "id": 9,
    "title": "Live Jazz Night",
    "type": "Music",
    "date": "2025-09-07",
    "location": "Goa",
    "host": "Goa Jazz Club",
    "description": "An evening of live jazz performances by local musicians in a cozy atmosphere.",
    "image": "https://picsum.photos/seed/jazz/800/600"
  },
  {
    "id": 10,
    "title": "Community Beach Cleanup",
    "type": "Social",
    "date": "2025-09-10",
    "location": "Mumbai",
    "host": "Eco Warriors",
    "description": "Join us in cleaning up Juhu Beach and making a difference for our environment.",
    "image": "https://picsum.photos/seed/beach/800/600"
  },
  {
    "id": 11,
    "title": "Stand-up Comedy Night",
    "type": "Entertainment",
    "date": "2025-09-12",
    "location": "Bangalore",
    "host": "Laugh Out Loud",
    "description": "A night full of laughter with top stand-up comedians from across the country.",
    "image": "https://picsum.photos/seed/comedy/800/600"
  },
  {
    "id": 12,
    "title": "Chess Tournament",
    "type": "Sports",
    "date": "2025-09-14",
    "location": "Delhi",
    "host": "Delhi Chess Club",
    "description": "Compete with fellow chess enthusiasts for exciting prizes and bragging rights.",
    "image": "https://picsum.photos/seed/chess/800/600"
  },
  {
    "id": 13,
    "title": "Mindfulness Meditation Retreat",
    "type": "Fitness",
    "date": "2025-09-16",
    "location": "Rishikesh",
    "host": "Peaceful Minds",
    "description": "A weekend retreat to practice mindfulness and meditation in the Himalayas.",
    "image": "https://picsum.photos/seed/meditation/800/600"
  },
  {
    "id": 14,
    "title": "Blockchain for Beginners",
    "type": "Workshop",
    "date": "2025-09-18",
    "location": "Pune",
    "host": "TechLearn Hub",
    "description": "Understand the basics of blockchain technology and its real-world applications.",
    "image": "https://picsum.photos/seed/blockchain/800/600"
  },
  {
    "id": 15,
    "title": "Bird Watching Morning",
    "type": "Meetup",
    "date": "2025-09-20",
    "location": "Jaipur",
    "host": "Nature Explorers",
    "description": "Join us to spot and learn about local bird species in their natural habitat.",
    "image": "https://picsum.photos/seed/bird/800/600"
  },
  {
    "id": 16,
    "title": "Poetry Open Mic",
    "type": "Entertainment",
    "date": "2025-09-22",
    "location": "Chandigarh",
    "host": "Words & Verses",
    "description": "An evening for poets to share their work with the community in a supportive space.",
    "image": "https://picsum.photos/seed/poetry/800/600"
  },
  {
    "id": 17,
    "title": "DIY Home Gardening Workshop",
    "type": "Workshop",
    "date": "2025-09-24",
    "location": "Ahmedabad",
    "host": "Green Thumbs",
    "description": "Learn how to start and maintain your own home garden, even in small spaces.",
    "image": "https://picsum.photos/seed/garden/800/600"
  },
  {
    "id": 18,
    "title": "Marathon for Charity",
    "type": "Sports",
    "date": "2025-09-26",
    "location": "Kochi",
    "host": "Run for Cause",
    "description": "Participate in a marathon to raise funds for local charity initiatives.",
    "image": "https://picsum.photos/seed/marathon/800/600"
  },
  {
    "id": 19,
    "title": "Language Exchange Meetup",
    "type": "Meetup",
    "date": "2025-09-28",
    "location": "Bangalore",
    "host": "Global Friends",
    "description": "Practice languages and make friends from different cultures in a relaxed setting.",
    "image": "https://picsum.photos/seed/language/800/600"
  },
  {
    "id": 20,
    "title": "Film Screening: Indie Shorts",
    "type": "Entertainment",
    "date": "2025-09-30",
    "location": "Mumbai",
    "host": "Cinephiles Club",
    "description": "An evening of short films by independent filmmakers followed by a Q&A.",
    "image": "https://picsum.photos/seed/film/800/600"
  }
];

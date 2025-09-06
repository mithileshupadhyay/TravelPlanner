import React, { useState } from 'react';
import { Bot, Send, Sparkles, MapPin, Calendar, DollarSign, Heart, Mic, MicOff, Clock, Utensils, Camera, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  itinerary?: GeneratedItinerary;
}

interface GeneratedItinerary {
  destination: string;
  duration: string;
  budget: string;
  title: string;
  description: string;
  days: ItineraryDay[];
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  theme: string;
  activities: ItineraryActivity[];
}

interface ItineraryActivity {
  period: 'morning' | 'afternoon' | 'evening';
  time: string;
  title: string;
  location: string;
  duration: string;
  category: string;
  icon: string;
  cost: string;
  description: string;
  tips?: string;
}

const AIAssistantCard: React.FC = () => {
  const { setCurrentView, setPlanningData, addTrip, setCurrentTrip } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm TravelYatri, your personal travel expert. Just tell me where you want to go, when, and your budget - I'll create a complete itinerary for you instantly! For example: 'Plan a 5-day trip to Tokyo in March with a $2000 budget' or 'Weekend getaway to Paris, romantic, $800 budget'.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    { icon: MapPin, text: '3-day Tokyo adventure', prompt: 'Plan a 3-day adventure trip to Tokyo with a $1500 budget' },
    { icon: Calendar, text: 'Week in Paris', prompt: 'Create a 7-day romantic itinerary for Paris with $2500 budget' },
    { icon: DollarSign, text: 'Budget Bali trip', prompt: 'Plan a 5-day budget trip to Bali for $800' },
    { icon: Heart, text: 'Weekend in NYC', prompt: 'Plan a weekend cultural trip to New York City with $1200 budget' }
  ];

  const extractTripInfo = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Extract destination
    const destinations = ['tokyo', 'paris', 'london', 'new york', 'nyc', 'bali', 'rome', 'barcelona', 'dubai', 'singapore', 'bangkok', 'amsterdam', 'berlin', 'sydney', 'mumbai', 'delhi'];
    const destination = destinations.find(dest => lowerText.includes(dest)) || 'Amazing Destination';
    
    // Extract duration
    const durationMatch = text.match(/(\d+)[\s-]*(day|week)/i);
    let duration = '3 days';
    if (durationMatch) {
      const num = parseInt(durationMatch[1]);
      const unit = durationMatch[2].toLowerCase();
      duration = unit === 'week' ? `${num * 7} days` : `${num} days`;
    } else if (lowerText.includes('weekend')) {
      duration = '2 days';
    }
    
    // Extract budget
    const budgetMatch = text.match(/\$(\d+)/);
    const budget = budgetMatch ? `$${budgetMatch[1]}` : '$1500';
    
    // Extract preferences
    const preferences = [];
    if (lowerText.includes('romantic') || lowerText.includes('romance')) preferences.push('romantic');
    if (lowerText.includes('adventure')) preferences.push('adventure');
    if (lowerText.includes('culture') || lowerText.includes('cultural')) preferences.push('culture');
    if (lowerText.includes('food') || lowerText.includes('culinary')) preferences.push('food');
    if (lowerText.includes('budget')) preferences.push('budget');
    if (lowerText.includes('luxury')) preferences.push('luxury');
    
    return { destination, duration, budget, preferences };
  };

  const generateItinerary = (tripInfo: any): GeneratedItinerary => {
    const { destination, duration, budget, preferences } = tripInfo;
    const days = parseInt(duration.split(' ')[0]);
    
    const getDestinationItinerary = (dest: string, days: number, budget: string, preferences: string[]) => {
      const destLower = dest.toLowerCase();
      
      // Tokyo Itineraries
      if (destLower.includes('tokyo') || destLower.includes('japan')) {
        const tokyoActivities = [
          // Day 1 Activities
          [
            { period: 'morning', time: '09:00', title: 'Arrive in Tokyo', location: 'Narita Airport', duration: '2 hours', category: 'travel', icon: '✈️', cost: '₹4,800', description: 'Land at Narita Airport → Take Airport Express to city center → Check into hotel', tips: 'Get a JR Pass for unlimited train travel throughout Japan' },
            { period: 'afternoon', time: '14:00', title: 'Explore Asakusa District', location: 'Asakusa', duration: '3 hours', category: 'culture', icon: '⛩️', cost: 'Free', description: 'Visit ancient Senso-ji Temple → Walk through traditional Nakamise Shopping Street → Try taiyaki and ningyo-yaki snacks', tips: 'Best time for photos is late afternoon with golden light on the temple' },
            { period: 'evening', time: '19:00', title: 'Authentic Ramen Experience', location: 'Shibuya', duration: '1.5 hours', category: 'food', icon: '🍜', cost: '₹2,000', description: 'Dinner at famous Ichiran or Ippudo ramen shop → Experience Tokyo nightlife in Shibuya', tips: 'Try tonkotsu ramen - it\'s a local favorite, and don\'t be shy about slurping!' }
          ],
          // Day 2 Activities
          [
            { period: 'morning', time: '09:00', title: 'Tokyo Skytree Experience', location: 'Sumida', duration: '2.5 hours', category: 'sightseeing', icon: '🗼', cost: '₹2,500', description: 'Ascend Tokyo\'s tallest tower → 360° city views → Visit Skytree Town shopping complex', tips: 'Book tickets online to skip long queues, especially on weekends' },
            { period: 'afternoon', time: '13:00', title: 'Tsukiji Outer Market Food Tour', location: 'Tsukiji', duration: '2 hours', category: 'food', icon: '🐟', cost: '₹3,200', description: 'Fresh sushi breakfast → Street food sampling → Learn about Japanese culinary culture', tips: 'Go early for the freshest selections and try the famous tuna sashimi' },
            { period: 'evening', time: '18:00', title: 'Shibuya Crossing & Shopping', location: 'Shibuya', duration: '2 hours', category: 'sightseeing', icon: '🚶', cost: '₹1,600', description: 'Experience world\'s busiest crossing → Shopping at Shibuya 109 → Visit Hachiko statue', tips: 'Best crossing views from Starbucks overlooking the intersection' }
          ],
          // Day 3 Activities
          [
            { period: 'morning', time: '09:00', title: 'Meiji Shrine & Harajuku', location: 'Shibuya', duration: '3 hours', category: 'culture', icon: '⛩️', cost: 'Free', description: 'Peaceful shrine in the city → Harajuku fashion district → Takeshita Street shopping', tips: 'Visit shrine early for peaceful atmosphere, then explore colorful Harajuku' },
            { period: 'afternoon', time: '14:00', title: 'Imperial Palace Gardens', location: 'Chiyoda', duration: '2 hours', category: 'nature', icon: '🏯', cost: 'Free', description: 'Beautiful Japanese gardens → Historical palace grounds → Cherry blossoms (seasonal)', tips: 'Free guided tours available on weekends' },
            { period: 'evening', time: '18:00', title: 'Ginza Fine Dining', location: 'Ginza', duration: '2 hours', category: 'food', icon: '🍱', cost: '₹4,800', description: 'Upscale sushi experience → Premium wagyu beef → Sake tasting', tips: 'Make reservations in advance for the best restaurants' }
          ],
          // Day 4 Activities
          [
            { period: 'morning', time: '09:00', title: 'Ueno Park & Museums', location: 'Ueno', duration: '3 hours', category: 'culture', icon: '🎨', cost: '₹1,200', description: 'Tokyo National Museum → Ueno Zoo → Beautiful park walks', tips: 'Great for families, especially the panda exhibit at the zoo' },
            { period: 'afternoon', time: '14:00', title: 'Akihabara Electronics District', location: 'Akihabara', duration: '2.5 hours', category: 'shopping', icon: '🤖', cost: '₹2,400', description: 'Electronics shopping → Anime culture → Gaming arcades → Maid cafes', tips: 'Perfect for tech enthusiasts and anime fans' },
            { period: 'evening', time: '19:00', title: 'Roppongi Nightlife', location: 'Roppongi', duration: '2 hours', category: 'nightlife', icon: '🌃', cost: '₹3,200', description: 'International dining → Rooftop bars → Tokyo Tower night views', tips: 'Great area for international cuisine and nightlife' }
          ],
          // Day 5 Activities
          [
            { period: 'morning', time: '08:00', title: 'Day Trip to Nikko', location: 'Nikko', duration: '4 hours', category: 'nature', icon: '🏔️', cost: '₹4,000', description: 'UNESCO World Heritage temples → Beautiful nature → Traditional architecture', tips: 'Take JR pass for easy train access, about 2 hours from Tokyo' },
            { period: 'afternoon', time: '15:00', title: 'Return to Tokyo - Odaiba', location: 'Odaiba', duration: '3 hours', category: 'sightseeing', icon: '🌉', cost: '₹1,600', description: 'Futuristic island → Rainbow Bridge → TeamLab digital art museum', tips: 'Book TeamLab tickets online well in advance' },
            { period: 'evening', time: '19:00', title: 'Farewell Dinner in Shinjuku', location: 'Shinjuku', duration: '2 hours', category: 'food', icon: '🍻', cost: '₹3,600', description: 'Izakaya experience → Memory Lane (Omoide Yokocho) → Final Tokyo night', tips: 'Try yakitori and local sake for an authentic experience' }
          ],
          // Day 6 Activities
          [
            { period: 'morning', time: '09:00', title: 'Tokyo DisneySea', location: 'Urayasu', duration: '8 hours', category: 'entertainment', icon: '🎢', cost: '₹6,400', description: 'Unique Disney park → Nautical themed attractions → Full day adventure', tips: 'Get FastPass tickets early for popular rides' },
            { period: 'evening', time: '19:00', title: 'Sumida River Cruise', location: 'Sumida River', duration: '1.5 hours', category: 'sightseeing', icon: '🚢', cost: '₹2,000', description: 'Evening river cruise → Tokyo skyline → Relaxing end to busy day', tips: 'Beautiful views of Tokyo Skytree and city lights' }
          ],
          // Day 7 Activities
          [
            { period: 'morning', time: '09:00', title: 'Kamakura Day Trip', location: 'Kamakura', duration: '4 hours', category: 'culture', icon: '🗿', cost: '₹2,800', description: 'Great Buddha statue → Historic temples → Traditional Japanese town', tips: 'Take Odakyu line from Shinjuku, about 1 hour journey' },
            { period: 'afternoon', time: '15:00', title: 'Last-minute Shopping in Shibuya', location: 'Shibuya', duration: '2 hours', category: 'shopping', icon: '🛍️', cost: '₹4,000', description: 'Souvenir shopping → Final photos at Hachiko → Shibuya Sky observation deck', tips: 'Don\'t forget to buy omiyage (souvenirs) for friends and family' },
            { period: 'evening', time: '18:00', title: 'Departure Preparation', location: 'Hotel', duration: '2 hours', category: 'travel', icon: '🧳', cost: 'Free', description: 'Pack belongings → Check-out → Airport transfer preparation', tips: 'Allow extra time for airport security and departure procedures' }
          ]
        ];

        const dayTitles = [
          'Welcome to Tokyo!',
          'Modern Tokyo & Sky Views', 
          'Culture & Fashion Districts',
          'Museums & Electronics',
          'Nature & Art Experiences',
          'Disney Magic & River Views',
          'Historic Towns & Farewell'
        ];

        const dayThemes = [
          'Arrival, traditional culture, and modern city vibes',
          'Skyscrapers, technology, and panoramic city views',
          'Spiritual sites and youth culture exploration',
          'Art, history, and modern Japanese pop culture',
          'Natural beauty and cutting-edge digital art',
          'Theme park fun and scenic river cruises',
          'Historical day trips and final Tokyo memories'
        ];

        return {
          title: `Tokyo Adventure: ${days}-Day Cultural & Culinary Journey`,
          description: 'Experience the perfect blend of traditional culture and modern marvels in Japan\'s vibrant capital',
          days: Array.from({ length: Math.min(days, 7) }, (_, i) => ({
            day: i + 1,
            title: dayTitles[i] || `Day ${i + 1} in Tokyo`,
            theme: dayThemes[i] || 'Exploring more of Tokyo\'s wonders',
            activities: tokyoActivities[i] || tokyoActivities[i % tokyoActivities.length]
          }))
        };
      }
      
      // Paris Itineraries
      if (destLower.includes('paris') || destLower.includes('france')) {
        const parisActivities = [
          // Day 1
          [
            { period: 'morning', time: '09:00', title: 'Eiffel Tower Experience', location: 'Champ de Mars', duration: '2.5 hours', category: 'sightseeing', icon: '🗼', cost: '₹2,800', description: 'Ascend the Iron Lady → Panoramic Paris views → Photo session at Trocadéro Gardens', tips: 'Visit early morning to avoid crowds and get the best photos' },
            { period: 'afternoon', time: '14:00', title: 'Seine River Cruise', location: 'Seine River', duration: '1.5 hours', category: 'romantic', icon: '🚢', cost: '₹2,300', description: 'Romantic boat ride → See Paris from the water → Pass Notre-Dame and Louvre', tips: 'Choose a sunset cruise for the most romantic experience with champagne' },
            { period: 'evening', time: '19:30', title: 'French Bistro Dinner', location: 'Latin Quarter', duration: '2 hours', category: 'food', icon: '🥖', cost: '₹6,000', description: 'Authentic French cuisine → Wine pairing → Candlelit atmosphere at Le Procope', tips: 'Try coq au vin or bouillabaisse for a true French culinary experience' }
          ],
          // Day 2
          [
            { period: 'morning', time: '09:00', title: 'Louvre Museum Tour', location: 'Louvre', duration: '3 hours', category: 'culture', icon: '🎨', cost: '₹1,600', description: 'See Mona Lisa → Venus de Milo → Egyptian antiquities → Skip-the-line access', tips: 'Book timed entry tickets online and focus on 2-3 wings to avoid overwhelm' },
            { period: 'afternoon', time: '14:00', title: 'Champs-Élysées Stroll', location: 'Champs-Élysées', duration: '2 hours', category: 'shopping', icon: '🛍️', cost: '₹4,000', description: 'Window shopping → Arc de Triomphe → Café culture experience', tips: 'Perfect for people-watching and enjoying French café culture' },
            { period: 'evening', time: '19:00', title: 'Montmartre Evening', location: 'Montmartre', duration: '2.5 hours', category: 'culture', icon: '🎭', cost: '₹2,400', description: 'Sacré-Cœur Basilica → Artist squares → Sunset views over Paris', tips: 'Take the funicular up the hill and stay for the magical sunset views' }
          ],
          // Day 3
          [
            { period: 'morning', time: '09:00', title: 'Versailles Palace Day Trip', location: 'Versailles', duration: '4 hours', category: 'culture', icon: '👑', cost: '₹3,200', description: 'Opulent palace → Hall of Mirrors → Marie Antoinette\'s estate → Royal gardens', tips: 'Take RER C train from central Paris, book skip-the-line tickets' },
            { period: 'afternoon', time: '15:00', title: 'Latin Quarter Exploration', location: 'Latin Quarter', duration: '2 hours', category: 'culture', icon: '📚', cost: 'Free', description: 'Sorbonne University → Panthéon → Shakespeare and Company bookstore', tips: 'Great area for intellectual atmosphere and historic cafés' },
            { period: 'evening', time: '19:00', title: 'Wine Tasting Experience', location: 'Marais District', duration: '2 hours', category: 'food', icon: '🍷', cost: '₹4,800', description: 'French wine education → Cheese pairing → Local wine bar experience', tips: 'Learn about different French wine regions and perfect pairings' }
          ],
          // Day 4
          [
            { period: 'morning', time: '09:00', title: 'Musée d\'Orsay', location: 'Saint-Germain', duration: '2.5 hours', category: 'culture', icon: '🎨', cost: '₹1,200', description: 'Impressionist masterpieces → Monet, Renoir, Van Gogh → Beautiful Belle Époque station', tips: 'Less crowded than Louvre, perfect for art lovers' },
            { period: 'afternoon', time: '13:00', title: 'Luxembourg Gardens', location: 'Luxembourg', duration: '2 hours', category: 'nature', icon: '🌳', cost: 'Free', description: 'Beautiful palace gardens → Model sailboats → Peaceful walks → Palace visit', tips: 'Perfect for picnics and relaxation in the heart of Paris' },
            { period: 'evening', time: '18:00', title: 'Cabaret Show at Moulin Rouge', location: 'Pigalle', duration: '2.5 hours', category: 'entertainment', icon: '💃', cost: '₹8,000', description: 'Iconic cabaret performance → French cancan → Champagne dinner option', tips: 'Book well in advance, dress code required' }
          ],
          // Day 5
          [
            { period: 'morning', time: '09:00', title: 'Sainte-Chapelle & Notre-Dame Area', location: 'Île de la Cité', duration: '2.5 hours', category: 'culture', icon: '⛪', cost: '₹1,600', description: 'Stunning stained glass → Gothic architecture → Seine island exploration', tips: 'Visit Sainte-Chapelle on sunny day for best stained glass experience' },
            { period: 'afternoon', time: '14:00', title: 'Le Marais District', location: 'Marais', duration: '3 hours', category: 'culture', icon: '🏘️', cost: '₹2,000', description: 'Jewish quarter → Vintage shopping → Art galleries → Historic architecture', tips: 'Great for unique shopping and discovering hidden courtyards' },
            { period: 'evening', time: '19:00', title: 'Dinner Cruise on Seine', location: 'Seine River', duration: '2.5 hours', category: 'romantic', icon: '🛥️', cost: '₹7,200', description: 'Gourmet dinner → Paris landmarks by night → Romantic atmosphere', tips: 'Most romantic way to see illuminated Paris monuments' }
          ]
        ];

        const parisDayTitles = [
          'Iconic Paris Welcome',
          'Art & Culture Immersion',
          'Royal Splendor & Literary Paris',
          'Gardens & Glamorous Nights',
          'Gothic Beauty & Historic Quarters'
        ];

        const parisDayThemes = [
          'Classic landmarks and Seine river magic',
          'World-class museums and Parisian elegance',
          'Royal palaces and intellectual atmosphere',
          'Peaceful gardens and spectacular entertainment',
          'Medieval architecture and charming neighborhoods'
        ];

        return {
          title: `Paris Romance: ${days}-Day Enchanting Journey`,
          description: 'Fall in love with the City of Light through art, cuisine, and timeless romance',
          days: Array.from({ length: Math.min(days, 5) }, (_, i) => ({
            day: i + 1,
            title: parisDayTitles[i] || `Day ${i + 1} in Paris`,
            theme: parisDayThemes[i] || 'Discovering more Parisian charm',
            activities: parisActivities[i] || parisActivities[i % parisActivities.length]
          }))
        };
      }
      
      // London Itineraries
      if (destLower.includes('london') || destLower.includes('uk') || destLower.includes('england')) {
        const londonActivities = [
          // Day 1
          [
            { period: 'morning', time: '09:00', title: 'Buckingham Palace & Changing of Guard', location: 'Westminster', duration: '2 hours', category: 'culture', icon: '👑', cost: 'Free', description: 'Watch the famous ceremony → Explore St. James\'s Park → Royal photo opportunities', tips: 'Arrive early for the best viewing spots, ceremony happens at 11:00 AM' },
            { period: 'afternoon', time: '13:00', title: 'Westminster Abbey & Big Ben', location: 'Westminster', duration: '2.5 hours', category: 'culture', icon: '⛪', cost: '₹2,000', description: 'Royal wedding venue → Poets\' Corner → Crown Jewels nearby → Thames walk', tips: 'Audio guide included - don\'t miss the Coronation Chair' },
            { period: 'evening', time: '18:00', title: 'Traditional Pub Experience', location: 'Covent Garden', duration: '2 hours', category: 'food', icon: '🍺', cost: '₹3,200', description: 'Fish & chips → Local ales → Live music → British pub culture', tips: 'Try a proper pint of bitter and don\'t forget mushy peas with your fish & chips' }
          ],
          // Day 2
          [
            { period: 'morning', time: '09:00', title: 'Tower of London & Crown Jewels', location: 'Tower Hill', duration: '3 hours', category: 'culture', icon: '💎', cost: '₹2,400', description: 'Historic fortress → Crown Jewels → Beefeater tour → Tower Bridge views', tips: 'Book online to skip queues, join a Yeoman Warder tour for best stories' },
            { period: 'afternoon', time: '14:00', title: 'British Museum', location: 'Bloomsbury', duration: '2.5 hours', category: 'culture', icon: '🏛️', cost: 'Free', description: 'Rosetta Stone → Egyptian mummies → Greek sculptures → World history', tips: 'Free entry but donations appreciated, focus on specific galleries' },
            { period: 'evening', time: '19:00', title: 'West End Theatre Show', location: 'West End', duration: '3 hours', category: 'entertainment', icon: '🎭', cost: '₹4,800', description: 'World-class musical → Historic theatres → London\'s Broadway equivalent', tips: 'Book popular shows in advance, same-day lottery tickets available' }
          ],
          // Day 3
          [
            { period: 'morning', time: '09:00', title: 'Windsor Castle Day Trip', location: 'Windsor', duration: '4 hours', category: 'culture', icon: '🏰', cost: '₹3,600', description: 'Queen\'s weekend residence → State Apartments → St. George\'s Chapel → Royal history', tips: 'Take train from London Paddington, check if Queen is in residence' },
            { period: 'afternoon', time: '15:00', title: 'Hyde Park & Kensington Palace', location: 'Kensington', duration: '2 hours', category: 'nature', icon: '🌳', cost: '₹1,600', description: 'Princess Diana memorial → Speaker\'s Corner → Beautiful gardens → Royal residence', tips: 'Great for walking and learning about recent royal history' },
            { period: 'evening', time: '18:00', title: 'Afternoon Tea Experience', location: 'Mayfair', duration: '1.5 hours', category: 'food', icon: '🫖', cost: '₹4,000', description: 'Traditional British afternoon tea → Scones with clotted cream → Finger sandwiches', tips: 'Dress smart casual, book at historic hotels like The Ritz or Fortnum & Mason' }
          ]
        ];

        const londonDayTitles = [
          'Royal London',
          'Historic Treasures & Theatre',
          'Royal Castles & Garden Parties'
        ];

        const londonDayThemes = [
          'Palaces, guards, and British traditions',
          'Crown jewels, world museums, and West End magic',
          'Royal residences and quintessential British experiences'
        ];

        return {
          title: `London Explorer: ${days}-Day Royal & Cultural Adventure`,
          description: 'Discover royal palaces, world-class museums, and quintessential British culture',
          days: Array.from({ length: Math.min(days, 3) }, (_, i) => ({
            day: i + 1,
            title: londonDayTitles[i] || `Day ${i + 1} in London`,
            theme: londonDayThemes[i] || 'Exploring more of London\'s heritage',
            activities: londonActivities[i] || londonActivities[i % londonActivities.length]
          }))
        };
      }
      
      // New York Itineraries
      if (destLower.includes('new york') || destLower.includes('nyc') || destLower.includes('manhattan')) {
        const nycActivities = [
          // Day 1
          [
            { period: 'morning', time: '09:00', title: 'Statue of Liberty & Ellis Island', location: 'Liberty Island', duration: '3 hours', category: 'sightseeing', icon: '🗽', cost: '₹2,000', description: 'Ferry ride → Crown access → Immigration museum → Harbor views', tips: 'Book crown access tickets well in advance - they sell out quickly' },
            { period: 'afternoon', time: '14:00', title: 'Central Park Exploration', location: 'Central Park', duration: '2 hours', category: 'nature', icon: '🌳', cost: 'Free', description: 'Bethesda Fountain → Bow Bridge → Strawberry Fields → People watching', tips: 'Rent a bike to cover more ground or enjoy a picnic lunch' },
            { period: 'evening', time: '19:00', title: 'Times Square & Broadway', location: 'Times Square', duration: '2.5 hours', category: 'entertainment', icon: '🎭', cost: '₹6,400', description: 'Bright lights → Street performers → Broadway show → NYC energy', tips: 'Book Broadway shows in advance or try same-day lottery tickets' }
          ],
          // Day 2
          [
            { period: 'morning', time: '09:00', title: 'Empire State Building & Top of the Rock', location: 'Midtown', duration: '3 hours', category: 'sightseeing', icon: '🏢', cost: '₹3,200', description: 'Iconic skyscraper views → Art Deco architecture → 360° city panorama', tips: 'Visit both for different perspectives, early morning has clearest views' },
            { period: 'afternoon', time: '14:00', title: 'Metropolitan Museum of Art', location: 'Upper East Side', duration: '2.5 hours', category: 'culture', icon: '🎨', cost: '₹2,000', description: 'World-class art collection → Egyptian wing → American paintings → Rooftop garden', tips: 'Pay-what-you-wish for NY residents, focus on 2-3 wings' },
            { period: 'evening', time: '19:00', title: 'Little Italy & Chinatown Food Tour', location: 'Lower Manhattan', duration: '2 hours', category: 'food', icon: '🍜', cost: '₹3,600', description: 'Authentic ethnic cuisines → Cultural neighborhoods → Street food sampling', tips: 'Come hungry and try dim sum, cannoli, and pizza' }
          ],
          // Day 3
          [
            { period: 'morning', time: '09:00', title: 'Brooklyn Bridge & DUMBO', location: 'Brooklyn', duration: '3 hours', category: 'sightseeing', icon: '🌉', cost: 'Free', description: 'Historic bridge walk → Brooklyn Bridge Park → Manhattan skyline views → Artisanal shops', tips: 'Walk the bridge early to avoid crowds, great photo opportunities' },
            { period: 'afternoon', time: '14:00', title: '9/11 Memorial & One World Trade', location: 'Financial District', duration: '2.5 hours', category: 'culture', icon: '🕊️', cost: '₹2,400', description: 'Moving memorial → One World Observatory → Reflecting pools → Historical significance', tips: 'Reserve timed tickets online, very emotional and meaningful experience' },
            { period: 'evening', time: '18:00', title: 'High Line & Chelsea Market', location: 'Chelsea', duration: '2 hours', category: 'culture', icon: '🚶', cost: 'Free', description: 'Elevated park → Urban gardens → Food market → Unique NYC experience', tips: 'Perfect for sunset walks and gourmet food sampling' }
          ]
        ];

        const nycDayTitles = [
          'Manhattan Highlights',
          'Sky-High Views & World-Class Culture',
          'Bridges, Memorials & Urban Parks'
        ];

        const nycDayThemes = [
          'Iconic skylines and urban energy',
          'Towering perspectives and artistic treasures',
          'Historic connections and innovative spaces'
        ];

        return {
          title: `New York City: ${days}-Day Urban Adventure`,
          description: 'Experience the city that never sleeps through iconic landmarks and cultural hotspots',
          days: Array.from({ length: Math.min(days, 3) }, (_, i) => ({
            day: i + 1,
            title: nycDayTitles[i] || `Day ${i + 1} in NYC`,
            theme: nycDayThemes[i] || 'Discovering more of the Big Apple',
            activities: nycActivities[i] || nycActivities[i % nycActivities.length]
          }))
        };
      }
      
      // Bali Itineraries
      if (destLower.includes('bali') || destLower.includes('indonesia')) {
        const baliActivities = [
          // Day 1
          [
            { period: 'morning', time: '08:00', title: 'Tegallalang Rice Terraces', location: 'Ubud', duration: '2 hours', category: 'nature', icon: '🌾', cost: '₹800', description: 'Stunning terraced landscapes → Traditional farming → Instagram-worthy photos', tips: 'Visit early morning for best lighting and fewer crowds' },
            { period: 'afternoon', time: '13:00', title: 'Sacred Monkey Forest & Ubud Palace', location: 'Ubud Center', duration: '2.5 hours', category: 'culture', icon: '🐒', cost: '₹400', description: 'Ancient temple complex → Playful monkeys → Royal palace architecture', tips: 'Keep bags closed - monkeys are very curious about food and shiny objects' },
            { period: 'evening', time: '18:00', title: 'Traditional Balinese Dinner', location: 'Ubud', duration: '2 hours', category: 'food', icon: '🍛', cost: '₹1,600', description: 'Nasi goreng → Satay → Tropical fruits → Cultural performance', tips: 'Try gado-gado and don\'t miss the traditional kecak fire dance' }
          ],
          // Day 2
          [
            { period: 'morning', time: '07:00', title: 'Mount Batur Sunrise Trek', location: 'Mount Batur', duration: '4 hours', category: 'adventure', icon: '🌋', cost: '₹2,400', description: 'Early morning hike → Spectacular sunrise → Active volcano → Hot springs', tips: 'Bring warm clothes, starts very early but worth the sunrise views' },
            { period: 'afternoon', time: '14:00', title: 'Tirta Empul Holy Water Temple', location: 'Tampaksiring', duration: '2 hours', category: 'culture', icon: '💧', cost: '₹400', description: 'Sacred spring temple → Purification ritual → Ancient Balinese traditions', tips: 'Bring sarong and sash, participate respectfully in purification ceremony' },
            { period: 'evening', time: '18:00', title: 'Ubud Art Market & Spa', location: 'Ubud', duration: '2.5 hours', category: 'relaxation', icon: '🎨', cost: '₹2,000', description: 'Local handicrafts → Traditional Balinese massage → Relaxation after active day', tips: 'Bargain at the market, book spa treatments in advance' }
          ],
          // Day 3
          [
            { period: 'morning', time: '08:00', title: 'Tanah Lot Temple', location: 'Tabanan', duration: '2.5 hours', category: 'culture', icon: '🏛️', cost: '₹600', description: 'Sea temple on rock formation → Dramatic ocean views → Sunset temple (if staying)', tips: 'Best visited during low tide, famous for sunset photos' },
            { period: 'afternoon', time: '13:00', title: 'Seminyak Beach & Water Sports', location: 'Seminyak', duration: '3 hours', category: 'beach', icon: '🏄', cost: '₹2,800', description: 'Beautiful beaches → Surfing lessons → Beach clubs → Ocean activities', tips: 'Great for beginners to learn surfing, many beach clubs for relaxation' },
            { period: 'evening', time: '19:00', title: 'Jimbaran Seafood Dinner', location: 'Jimbaran Bay', duration: '2 hours', category: 'food', icon: '🦞', cost: '₹2,400', description: 'Fresh seafood BBQ → Beachside dining → Romantic sunset → Local fishing village', tips: 'Choose restaurants on the beach for best atmosphere and fresh catch' }
          ],
          // Day 4
          [
            { period: 'morning', time: '08:00', title: 'Sekumpul Waterfall Trek', location: 'North Bali', duration: '3 hours', category: 'nature', icon: '💦', cost: '₹1,600', description: 'Hidden waterfall → Jungle trekking → Swimming in natural pools → Scenic beauty', tips: 'Wear good hiking shoes, bring swimwear for the natural pools' },
            { period: 'afternoon', time: '14:00', title: 'Ulun Danu Beratan Temple', location: 'Bedugul', duration: '2 hours', category: 'culture', icon: '🛶', cost: '₹400', description: 'Lake temple → Mountain scenery → Iconic Bali postcard view → Cool mountain air', tips: 'Famous temple on the lake, bring jacket as it\'s cooler in mountains' },
            { period: 'evening', time: '18:00', title: 'Traditional Balinese Cooking Class', location: 'Ubud', duration: '3 hours', category: 'food', icon: '👨‍🍳', cost: '₹2,000', description: 'Learn local recipes → Market visit → Hands-on cooking → Authentic flavors', tips: 'Great way to learn about Balinese culture through food' }
          ],
          // Day 5
          [
            { period: 'morning', time: '08:00', title: 'Nusa Penida Day Trip', location: 'Nusa Penida', duration: '6 hours', category: 'adventure', icon: '🏝️', cost: '₹4,000', description: 'Island hopping → Kelingking Beach → Angel\'s Billabong → Crystal Bay snorkeling', tips: 'Full day trip, bring sunscreen and snorkeling gear' },
            { period: 'evening', time: '19:00', title: 'Farewell Dinner & Cultural Show', location: 'Ubud', duration: '2.5 hours', category: 'culture', icon: '💃', cost: '₹2,800', description: 'Traditional Legong dance → Gamelan music → Farewell feast → Cultural immersion', tips: 'Perfect way to end your Bali journey with traditional arts' }
          ]
        ];

        const baliDayTitles = [
          'Ubud Cultural Immersion',
          'Volcanic Adventures & Sacred Waters',
          'Temples & Beach Paradise',
          'Waterfalls & Mountain Temples',
          'Island Hopping & Cultural Farewell'
        ];

        const baliDayThemes = [
          'Rice terraces, temples, and traditional arts',
          'Sunrise treks and spiritual purification',
          'Ocean temples and beach relaxation',
          'Natural wonders and mountain serenity',
          'Island exploration and cultural celebration'
        ];

        return {
          title: `Bali Paradise: ${days}-Day Tropical & Cultural Journey`,
          description: 'Discover tropical beaches, ancient temples, and Balinese culture',
          days: Array.from({ length: Math.min(days, 5) }, (_, i) => ({
            day: i + 1,
            title: baliDayTitles[i] || `Day ${i + 1} in Bali`,
            theme: baliDayThemes[i] || 'Exploring more of Bali\'s wonders',
            activities: baliActivities[i] || baliActivities[i % baliActivities.length]
          }))
        };
      }
      
      // Mumbai Itineraries (keep existing)
      if (destLower.includes('mumbai') || destLower.includes('bombay') || destLower.includes('india')) {
        return {
          title: `Mumbai with Family: ${days}-Day Budget-Friendly Itinerary`,
          description: 'Blend of city sights, local flavors, and quality time together for every generation',
          days: [
            {
              day: 1,
              title: 'Welcome to Mumbai!',
              theme: 'Arrival, settling in, and a taste of local life',
              activities: [
                { period: 'morning', time: '09:00', title: 'Arrive in Mumbai', location: 'Mumbai Airport', duration: '2 hours', category: 'travel', icon: '✈️', cost: '$40', description: 'Check in at YMCA International House (affordable, family-friendly)', tips: 'YMCA offers clean, safe accommodation perfect for families' },
                { period: 'afternoon', time: '14:00', title: 'Walk around Crawford Market', location: 'Crawford Market', duration: '2 hours', category: 'culture', icon: '🏪', cost: '$10', description: 'Try street snacks like vada pav and bhel puri → Explore local spices and fruits', tips: 'Bargain for better prices and try fresh fruit juices' },
                { period: 'evening', time: '19:00', title: 'Dinner at Sukh Sagar', location: 'Marine Drive', duration: '1.5 hours', category: 'food', icon: '🍽️', cost: '$25', description: 'Vegetarian, family favorite → Stroll along Marine Drive for sunset', tips: 'Marine Drive is perfect for evening walks with kids' }
              ]
            },
            {
              day: 2,
              title: 'Museums & Iconic Landmarks',
              theme: 'History, culture, and seaside fun',
              activities: [
                { period: 'morning', time: '09:00', title: 'Visit Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', location: 'Fort District', duration: '2.5 hours', category: 'culture', icon: '🏛️', cost: '$8', description: 'Prince of Wales Museum for an educational start → Ancient artifacts and art collections', tips: 'Great for kids to learn about Indian history and culture' },
                { period: 'afternoon', time: '13:00', title: 'Gateway of India & Boat Ride', location: 'Colaba', duration: '2 hours', category: 'sightseeing', icon: '⛵', cost: '$15', description: 'Iconic monument → Optional boat ride to Elephanta Caves', tips: 'Take photos at the Gateway - it\'s Mumbai\'s most famous landmark' },
                { period: 'evening', time: '17:00', title: 'Juhu Beach Family Time', location: 'Juhu', duration: '2 hours', category: 'relaxation', icon: '🏖️', cost: '$12', description: 'Beach activities → Street food → Watch sunset with family', tips: 'Try bhel puri and pav bhaji from beach vendors' }
              ]
            }
          ]
        };
      }
      
      // Default/Generic Itinerary for other destinations
      return {
        title: `${destination} Adventure: ${days}-Day Discovery Journey`,
        description: `Explore the best of ${destination} with a perfect mix of culture, cuisine, and unforgettable experiences`,
        days: [
          {
            day: 1,
            title: `Welcome to ${destination}!`,
            theme: 'Arrival and first taste of local culture',
            activities: [
              { period: 'morning', time: '09:00', title: `Arrive in ${destination}`, location: 'City Center', duration: '2 hours', category: 'travel', icon: '✈️', cost: '$50', description: `Check into accommodation → Get oriented with ${destination} → Local transportation setup`, tips: 'Research local transportation options and get a city map or app' },
              { period: 'afternoon', time: '14:00', title: 'Historic City Center Tour', location: 'Old Town', duration: '3 hours', category: 'culture', icon: '🏛️', cost: '$25', description: 'Explore main historical sites → Local architecture → Cultural landmarks', tips: 'Join a free walking tour to get oriented and meet other travelers' },
              { period: 'evening', time: '19:00', title: 'Traditional Local Dinner', location: 'Local Restaurant', duration: '1.5 hours', category: 'food', icon: '🍽️', cost: '$35', description: 'Authentic local cuisine → Regional specialties → Cultural dining experience', tips: 'Ask locals for restaurant recommendations for the most authentic experience' }
            ]
          },
          {
            day: 2,
            title: 'Cultural Immersion',
            theme: 'Museums, art, and local traditions',
            activities: [
              { period: 'morning', time: '09:00', title: 'Main Museum Visit', location: 'Cultural District', duration: '2.5 hours', category: 'culture', icon: '🎨', cost: '$20', description: 'Local history and art → Cultural exhibitions → Educational experience', tips: 'Check for free museum days or student discounts' },
              { period: 'afternoon', time: '13:00', title: 'Local Market Exploration', location: 'Central Market', duration: '2 hours', category: 'shopping', icon: '🛍️', cost: '$30', description: 'Local crafts → Street food → Cultural shopping experience', tips: 'Bring cash and be prepared to bargain for better prices' },
              { period: 'evening', time: '18:00', title: 'Scenic Viewpoint', location: 'City Overlook', duration: '2 hours', category: 'sightseeing', icon: '🌅', cost: '$15', description: 'Panoramic city views → Sunset photography → Relaxing evening', tips: 'Arrive 30 minutes before sunset for the best lighting' }
            ]
          }
        ]
      };
    };

    const itineraryTemplate = getDestinationItinerary(destination, days, budget, preferences);

    // Adapt the template to requested duration
    const adaptedDays = itineraryTemplate.days.slice(0, Math.min(days, itineraryTemplate.days.length));
    
    // If user requested more days than template, repeat pattern
    while (adaptedDays.length < days && adaptedDays.length < 7) {
      const templateDay = itineraryTemplate.days[adaptedDays.length % itineraryTemplate.days.length];
      adaptedDays.push({
        ...templateDay,
        day: adaptedDays.length + 1,
        date: new Date(Date.now() + adaptedDays.length * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }

    return {
      destination: destination.charAt(0).toUpperCase() + destination.slice(1),
      duration,
      budget,
      title: itineraryTemplate.title,
      description: itineraryTemplate.description,
      days: adaptedDays.map((day, index) => ({
        ...day,
        day: index + 1,
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString()
      }))
    };
  };

  const createTripFromItinerary = (itinerary: GeneratedItinerary) => {
    const newTrip = {
      id: Date.now().toString(),
      title: `${itinerary.duration} in ${itinerary.destination}`,
      destination: itinerary.destination,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + parseInt(itinerary.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      budget: parseInt(itinerary.budget.replace('$', '')),
      preferences: ['AI Generated'],
      status: 'planned' as const,
      coverImage: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      days: itinerary.days.map(day => ({
        day: day.day,
        date: day.date,
        activities: day.activities.map(activity => ({
          id: Math.random().toString(),
          time: activity.time,
          title: activity.title,
          location: activity.location,
          duration: activity.duration,
          category: activity.category as any,
          icon: activity.icon
        }))
      }))
    };
    
    addTrip(newTrip);
    setCurrentTrip(newTrip);
    return newTrip;
  };

  const handleQuickSuggestion = (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const tripInfo = extractTripInfo(prompt);
      const itinerary = generateItinerary(tripInfo);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Perfect! I've created a complete ${itinerary.duration} itinerary for ${itinerary.destination} within your ${itinerary.budget} budget. This includes carefully selected activities, optimal timing, and cost estimates. You can save this itinerary to your trips or view the full details!`,
        sender: 'assistant',
        timestamp: new Date(),
        itinerary
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const currentMessage = message.trim();
      const userMessage: Message = {
        id: Date.now().toString(),
        text: currentMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);
      
      setTimeout(() => {
        const tripInfo = extractTripInfo(currentMessage);
        
        // Check if user is asking for an itinerary or just general travel question
        const isItineraryRequest = currentMessage.toLowerCase().includes('plan') || 
                                 currentMessage.toLowerCase().includes('trip') || 
                                 currentMessage.toLowerCase().includes('itinerary') ||
                                 currentMessage.toLowerCase().includes('day') ||
                                 /\$\d+/.test(currentMessage) || // Contains budget
                                 /(tokyo|paris|mumbai|delhi|london|new york|bali|dubai|singapore|bangkok|rome|barcelona)/i.test(currentMessage);
        
        let assistantMessage: Message;
        
        if (isItineraryRequest) {
          const itinerary = generateItinerary(tripInfo);
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            text: `Excellent choice! I've crafted a personalized ${itinerary.duration} itinerary for ${itinerary.destination} that fits your ${itinerary.budget} budget perfectly. Each day is optimized for the best experience with a mix of must-see attractions, local experiences, and great dining options.`,
            sender: 'assistant',
            timestamp: new Date(),
            itinerary
          };
        } else {
          // Generate general travel advice responses
          const generalResponses = [
            "That's a great question! As your travel expert, I'd recommend considering the local culture and customs when planning your activities. What specific aspect would you like me to help you with?",
            "Absolutely! Based on my experience helping travelers, I can share some insights about that. Are you looking for recommendations for a specific destination or general travel tips?",
            "Great point! I love helping with travel planning details. From my years of experience, I've found that preparation makes all the difference. What would you like to know more about?",
            "That's something many travelers ask about! I'm here to help you make the most of your trip. Would you like me to create a detailed itinerary for a specific destination?",
            "Excellent question! Travel planning can seem overwhelming, but I'm here to make it easy for you. Just tell me your destination, dates, and budget, and I'll create a complete itinerary!"
          ];
          
          const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
          
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            sender: 'assistant',
            timestamp: new Date()
          };
        }
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleSaveItinerary = (itinerary: GeneratedItinerary) => {
    const trip = createTripFromItinerary(itinerary);
    setCurrentView('itinerary');
  };

  const handleViewItinerary = (itinerary: GeneratedItinerary) => {
    const trip = createTripFromItinerary(itinerary);
    setCurrentView('itinerary');
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const ItineraryPreview: React.FC<{ itinerary: GeneratedItinerary }> = ({ itinerary }) => (
    <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800 max-w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-headline mb-1">
            🎯 {itinerary.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
            {itinerary.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {itinerary.duration} • {itinerary.budget} budget • {itinerary.days.length} days planned
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewItinerary(itinerary)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium"
          >
            View Full
          </button>
          <button
            onClick={() => handleSaveItinerary(itinerary)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium"
          >
            Save Trip
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {itinerary.days.slice(0, Math.min(2, itinerary.days.length)).map((day) => (
          <div key={day.day} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="mb-3">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center space-x-2">
                <span className="text-lg">🏛️</span>
                <span>Day {day.day} - {day.title}</span>
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">{day.theme}</p>
            </div>
            
            <div className="space-y-3">
              {day.activities.slice(0, 3).map((activity, idx) => (
                <div key={idx} className="border-l-3 border-blue-200 dark:border-blue-800 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm">
                        {activity.period === 'morning' ? '🌅' : activity.period === 'afternoon' ? '☀️' : '🌆'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          {activity.period}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </div>
                      <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1 flex items-center space-x-2">
                        <span className="text-base">{activity.icon}</span>
                        <span>{activity.title}</span>
                      </h6>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        📍 {activity.location} • ⏱️ {activity.duration}
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-1">
                        {activity.description}
                      </p>
                      {activity.tips && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 rounded px-2 py-1 mb-1">
                          💡 {activity.tips}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {activity.category}
                        </span>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                          {activity.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {day.activities.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                  +{day.activities.length - 3} more detailed activities...
                </p>
              )}
            </div>
          </div>
        ))}
        {itinerary.days.length > 2 && (
          <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-dashed border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              📅 {itinerary.days.length - 2} More Amazing Days Planned!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Complete itinerary with detailed activities, timings, and insider tips
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline">TravelYatri</h3>
            <p className="text-purple-100">Your Personal Travel Expert</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-purple-100">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm">Instant Itinerary Generation • No Follow-ups Needed</span>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 font-headline">
          Quick Itinerary Examples
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleQuickSuggestion(suggestion.prompt)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <suggestion.icon className="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {suggestion.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-6">
        <div className="space-y-4 mb-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600" id="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {msg.sender === 'assistant' && (
                <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                  <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                  <div className="h-4 w-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                </div>
              )}
              <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-xl max-w-full ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {msg.itinerary && <ItineraryPreview itinerary={msg.itinerary} />}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="e.g., '5-day trip to Bali, ₹96,000 budget, adventure'"
            className={`flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all ${
              isTyping ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isTyping}
          />
          <button
            onClick={toggleVoiceInput}
            disabled={isTyping}
            className={`p-2 rounded-xl transition-colors ${
              isListening 
                ? 'bg-red-600 text-white' 
                : isTyping
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className={`p-2 rounded-xl transition-colors ${
              !message.trim() || isTyping
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCard;
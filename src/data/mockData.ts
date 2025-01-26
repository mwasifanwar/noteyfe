import { Note, Folder, Tag } from '../types';
import { Book, Briefcase, Heart, Star, Coffee, Plane, Dumbbell, Brain, Music, Camera, Code, Pizza, Plane as Plant, Sun } from 'lucide-react';

export const mockNotes: Note[] = [
  {
    id: 1,
    title: "Today's Inspiration",
    content: "Remember to stay positive and embrace creativity in everything you do! Sometimes the best ideas come when we least expect them. Take time to appreciate the small moments and find beauty in the ordinary. 🌸\n\nDaily Affirmations:\n1. I am capable of achieving great things\n2. I choose to be positive and happy\n3. I attract success and abundance\n4. I am grateful for all that I have",
    tags: ["Inspiration", "Personal"],
    folder: "Journal",
    color: "#FFC1E3",
    isPinned: true,
    isFavorite: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10")
  },
  {
    id: 2,
    title: "Project Brainstorm",
    content: "1. AI-powered chat assistant with emotion recognition\n2. Virtual garden planner with climate data integration\n3. Digital wellness tracker with mood analysis\n4. Smart recipe organizer with ingredient substitution\n5. Personal finance visualization tool",
    tags: ["Work", "Ideas"],
    folder: "Projects",
    color: "#B8E8D2",
    createdAt: new Date("2024-03-09"),
    updatedAt: new Date("2024-03-09")
  },
  {
    id: 3,
    title: "Weekly Goals",
    content: "- Meditate for 10 minutes daily\n- Read two chapters of 'Atomic Habits'\n- Practice yoga every morning\n- Call mom on Sunday\n- Drink 8 glasses of water daily\n- Complete the React course",
    tags: ["Goals", "Personal"],
    folder: "Personal",
    color: "#D9C6F2",
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08")
  },
  {
    id: 4,
    title: "Recipe: Matcha Latte",
    content: "Perfect Matcha Latte Recipe:\n\n- 1 tsp ceremonial grade matcha\n- 1 cup oat milk\n- Hot water (80°C)\n- Optional: honey to taste\n\nWhisk matcha with a small amount of hot water until smooth. Heat and froth oat milk. Combine and enjoy! ☕️",
    tags: ["Personal", "Ideas"],
    folder: "Journal",
    color: "#E3C5A2",
    createdAt: new Date("2024-03-07"),
    updatedAt: new Date("2024-03-07")
  },
  {
    id: 5,
    title: "Meeting Notes: Product Team",
    content: "Discussion Points:\n- Q2 roadmap review\n- User feedback analysis\n- New feature prioritization\n- Performance metrics\n\nAction Items:\n1. Create user survey\n2. Schedule UX review\n3. Update sprint planning",
    tags: ["Work"],
    folder: "Projects",
    color: "#B8E8D2",
    createdAt: new Date("2024-03-06"),
    updatedAt: new Date("2024-03-06")
  },
  {
    id: 6,
    title: "Travel Plans: Japan 2024",
    content: "Places to Visit:\n- Tokyo: Shibuya, Harajuku, Akihabara\n- Kyoto: Fushimi Inari, Arashiyama\n- Osaka: Dotonbori, Osaka Castle\n\nTo Do:\n- Book flights\n- Reserve hotels\n- Get JR Pass\n- Learn basic Japanese phrases",
    tags: ["Personal", "Goals"],
    folder: "Personal",
    color: "#FFC1E3",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05")
  },
  {
    id: 7,
    title: "Book Notes: Atomic Habits",
    content: "Key Takeaways:\n1. Make it obvious\n2. Make it attractive\n3. Make it easy\n4. Make it satisfying\n\nQuotes:\n'You do not rise to the level of your goals. You fall to the level of your systems.'",
    tags: ["Personal", "Ideas"],
    folder: "Journal",
    color: "#D9C6F2",
    createdAt: new Date("2024-03-04"),
    updatedAt: new Date("2024-03-04")
  },
  {
    id: 8,
    title: "Workout Routine",
    content: "Monday: Upper Body\n- Push-ups: 3x12\n- Pull-ups: 3x8\n- Shoulder press: 3x10\n\nWednesday: Lower Body\n- Squats: 3x15\n- Lunges: 3x12\n- Deadlifts: 3x10\n\nFriday: Full Body\n- Circuit training\n- HIIT",
    tags: ["Goals", "Personal"],
    folder: "Personal",
    color: "#FFDFE5",
    createdAt: new Date("2024-03-03"),
    updatedAt: new Date("2024-03-03")
  },
  {
    id: 9,
    title: "Photography Tips",
    content: "Camera Settings for Different Scenarios:\n\nPortrait:\n- Aperture: f/1.8 - f/4\n- ISO: 100-400\n- Shutter: 1/125+\n\nLandscape:\n- Aperture: f/8 - f/11\n- ISO: 100\n- Shutter: Variable\n\nComposition Rules:\n1. Rule of Thirds\n2. Leading Lines\n3. Symmetry\n4. Natural Framing",
    tags: ["Hobbies", "Creative"],
    folder: "Projects",
    color: "#B8E8D2",
    isPinned: false,
    isFavorite: true,
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-03-02")
  },
  {
    id: 10,
    title: "Coding Resources",
    content: "Useful Programming Resources:\n\n1. Documentation:\n- MDN Web Docs\n- React Documentation\n- TypeScript Handbook\n\n2. Learning Platforms:\n- Frontend Masters\n- Egghead.io\n- LeetCode\n\n3. YouTube Channels:\n- Fireship\n- Traversy Media\n- Web Dev Simplified",
    tags: ["Work", "Learning"],
    folder: "Resources",
    color: "#D9C6F2",
    isPinned: true,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01")
  },
  {
    id: 11,
    title: "Garden Planning",
    content: "Spring Garden Plan:\n\nVegetables:\n- Tomatoes (Cherry, Roma)\n- Cucumbers\n- Bell Peppers\n- Lettuce\n\nHerbs:\n- Basil\n- Mint\n- Rosemary\n- Thyme\n\nFlowers:\n- Lavender\n- Marigolds\n- Sunflowers",
    tags: ["Hobbies", "Ideas"],
    folder: "Personal",
    color: "#E3C5A2",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28")
  },
  {
    id: 12,
    title: "Music Practice",
    content: "Guitar Practice Routine:\n\n1. Warm-up (10 mins):\n- Finger exercises\n- Scales practice\n\n2. Theory (15 mins):\n- Chord progressions\n- Music notation\n\n3. Songs to Learn:\n- Blackbird - The Beatles\n- Dust in the Wind - Kansas\n- Wonderwall - Oasis",
    tags: ["Hobbies", "Creative"],
    folder: "Personal",
    color: "#FFDFE5",
    createdAt: new Date("2024-02-27"),
    updatedAt: new Date("2024-02-27")
  }
];

export const mockFolders: Folder[] = [
  {
    id: 1,
    name: "Journal",
    subfolders: ["Daily", "Reflections", "Dreams"],
    icon: "Book",
    color: "#FFC1E3"
  },
  {
    id: 2,
    name: "Projects",
    subfolders: ["Active", "Ideas", "Archived"],
    icon: "Briefcase",
    color: "#B8E8D2"
  },
  {
    id: 3,
    name: "Personal",
    subfolders: ["Goals", "Memories", "Health", "Finance"],
    icon: "Heart",
    color: "#D9C6F2"
  },
  {
    id: 4,
    name: "Resources",
    subfolders: ["Learning", "References", "Tools"],
    icon: "Brain",
    color: "#E3C5A2"
  }
];

export const mockTags: Tag[] = [
  {
    id: 1,
    name: "Inspiration",
    color: "#FFC1E3",
    description: "Ideas and motivation"
  },
  {
    id: 2,
    name: "Work",
    color: "#B8E8D2",
    description: "Work-related notes"
  },
  {
    id: 3,
    name: "Personal",
    color: "#D9C6F2",
    description: "Personal thoughts and memories"
  },
  {
    id: 4,
    name: "Ideas",
    color: "#E3C5A2",
    description: "Creative concepts and brainstorms"
  },
  {
    id: 5,
    name: "Goals",
    color: "#FFDFE5",
    description: "Objectives and aspirations"
  },
  {
    id: 6,
    name: "Hobbies",
    color: "#B8E8D2",
    description: "Leisure activities"
  },
  {
    id: 7,
    name: "Creative",
    color: "#FFC1E3",
    description: "Artistic and creative projects"
  },
  {
    id: 8,
    name: "Learning",
    color: "#D9C6F2",
    description: "Educational content"
  }
];

export const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Book, Briefcase, Heart, Star, Coffee, Plane, 
    Dumbbell, Brain, Music, Camera, Code, Pizza, Plant, Sun
  };
  return icons[iconName] || Book;
};
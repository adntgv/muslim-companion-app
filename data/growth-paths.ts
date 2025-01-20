import type { GrowthPath } from '@/types/growth-map';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Heart,
  Clock,
  GraduationCap,
} from 'lucide-react';

export const GROWTH_PATHS: GrowthPath[] = [
  {
    id: 'prayers',
    title: "Prayer Excellence",
    description: "Master the art of prayer and khushu",
    icon: Clock,
    category: "Core Practices",
    levels: [
      {
        id: 'prayers-1',
        title: "5 Daily Prayers",
        description: "Establish consistency in obligatory prayers",
      },
      {
        id: 'prayers-2',
        title: "Prayer Quality",
        description: "Develop khushu and understanding",
        requirements: ['Complete all daily prayers on time for 30 days']
      },
      {
        id: 'prayers-3',
        title: "Sunnah Prayers",
        description: "Incorporate regular sunnah prayers",
        requirements: ['Master prayer quality', 'Maintain 90% prayer consistency']
      }
    ]
  },
  {
    id: 'quran',
    title: "Quran Connection",
    description: "Build a strong relationship with the Quran",
    icon: BookOpen,
    category: "Core Practices",
    levels: [
      {
        id: 'quran-1',
        title: "Daily Reading",
        description: "Establish daily Quran reading habit",
      },
      {
        id: 'quran-2',
        title: "Tajweed Mastery",
        description: "Learn and apply tajweed rules",
        requirements: ['Complete daily reading for 40 days']
      },
      {
        id: 'quran-3',
        title: "Understanding & Reflection",
        description: "Study translation and tafsir",
        requirements: ['Master tajweed rules', 'Complete basic Arabic course']
      }
    ]
  },
  {
    id: 'knowledge',
    title: "Islamic Knowledge",
    description: "Build a strong foundation in Islamic sciences",
    icon: GraduationCap,
    category: "Learning",
    levels: [
      {
        id: 'knowledge-1',
        title: "Basic Aqeedah",
        description: "Learn fundamental beliefs",
      },
      {
        id: 'knowledge-2',
        title: "Fiqh of Worship",
        description: "Study rules of Islamic practices",
        requirements: ['Complete basic aqeedah course']
      },
      {
        id: 'knowledge-3',
        title: "Advanced Studies",
        description: "Deep dive into Islamic sciences",
        requirements: ['Master fiqh of worship', 'Complete intermediate level']
      }
    ]
  },
  {
    id: 'character',
    title: "Character Excellence",
    description: "Develop noble character traits",
    icon: Heart,
    category: "Personal Growth",
    levels: [
      {
        id: 'character-1',
        title: "Core Values",
        description: "Establish basic Islamic character",
      },
      {
        id: 'character-2',
        title: "Advanced Traits",
        description: "Develop patience and gratitude",
        requirements: ['Practice core values for 30 days']
      },
      {
        id: 'character-3',
        title: "Leadership Qualities",
        description: "Become a positive influence",
        requirements: ['Master advanced traits', 'Complete mentorship program']
      }
    ]
  }
]; 
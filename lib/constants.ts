export const timezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'Asia/Dubai', label: 'Dubai (UTC+4)' },
  { value: 'Asia/Riyadh', label: 'Riyadh (UTC+3)' },
  { value: 'Asia/Tehran', label: 'Tehran (UTC+3:30)' },
  { value: 'Asia/Karachi', label: 'Karachi (UTC+5)' },
  { value: 'Asia/Jakarta', label: 'Jakarta (UTC+7)' },
  { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur (UTC+8)' },
  { value: 'Europe/London', label: 'London (UTC+0/+1)' },
  { value: 'Europe/Paris', label: 'Paris (UTC+1/+2)' },
  { value: 'Europe/Istanbul', label: 'Istanbul (UTC+3)' },
  { value: 'America/New_York', label: 'New York (UTC-5/-4)' },
  { value: 'America/Chicago', label: 'Chicago (UTC-6/-5)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (UTC-8/-7)' },
  { value: 'Australia/Sydney', label: 'Sydney (UTC+10/+11)' },
] as const;

export const prayerTimes = [
  'Fajr',
  'Sunrise',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
] as const;

export const prayerCalculationMethods = [
  { value: 'MWL', label: 'Muslim World League' },
  { value: 'ISNA', label: 'Islamic Society of North America' },
  { value: 'Egypt', label: 'Egyptian General Authority of Survey' },
  { value: 'Makkah', label: 'Umm Al-Qura University, Makkah' },
  { value: 'Karachi', label: 'University of Islamic Sciences, Karachi' },
  { value: 'Tehran', label: 'Institute of Geophysics, University of Tehran' },
  { value: 'Jafari', label: 'Shia Ithna-Ashari, Leva Institute, Qum' },
] as const;

export const quranReadingGoals = [
  { value: '1_page', label: '1 Page Daily' },
  { value: '2_pages', label: '2 Pages Daily' },
  { value: '4_pages', label: '4 Pages Daily' },
  { value: '1_juz', label: '1 Juz Daily' },
  { value: '2_juz', label: '2 Juz Daily' },
  { value: 'custom', label: 'Custom Goal' },
] as const;

export const defaultHabits = [
  { id: 'morning_adhkar', name: 'Morning Adhkar', category: 'daily' },
  { id: 'evening_adhkar', name: 'Evening Adhkar', category: 'daily' },
  { id: 'quran_reading', name: 'Quran Reading', category: 'daily' },
  { id: 'tahajjud', name: 'Tahajjud Prayer', category: 'optional' },
  { id: 'duha', name: 'Duha Prayer', category: 'optional' },
  { id: 'fasting_monday', name: 'Monday Fasting', category: 'weekly' },
  { id: 'fasting_thursday', name: 'Thursday Fasting', category: 'weekly' },
] as const;

export const learningCategories = [
  { id: 'basics', name: 'Islamic Basics' },
  { id: 'quran', name: 'Quran Studies' },
  { id: 'hadith', name: 'Hadith Studies' },
  { id: 'fiqh', name: 'Islamic Jurisprudence' },
  { id: 'seerah', name: 'Prophetic Biography' },
  { id: 'arabic', name: 'Arabic Language' },
] as const; 
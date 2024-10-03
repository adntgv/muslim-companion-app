export interface Word {
  arabic: string;
  transliteration: string;
  russian: string;
  kazakh: string;
  rootLetters: string;
  usage: string;
  frequency: number;
}

export interface Verse {
  arabic: string;
  transliteration: string;
  translation: {
    russian: string;
    kazakh: string;
  };
  words: Word[];
  surah: number;
  ayah: number;
  number: number; // Add this line
}
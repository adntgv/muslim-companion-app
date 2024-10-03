import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="transition-all duration-300 hover:bg-primary/20 hover:scale-110"
    >
      {theme === 'dark' ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
};

export default ThemeToggle;
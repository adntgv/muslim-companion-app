'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  Heart,
  Sun,
  Moon,
  Calendar,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

export default function ReflectionJournal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const promptsOfDay = [
    "What act of worship brought you the most peace today?",
    "How did you implement patience in challenging situations?",
    "What are you most grateful for today?",
    "How did you benefit others today?"
  ];

  const moodOptions = [
    { icon: Smile, label: "Peaceful", color: "text-primary dark:text-primary" },
    { icon: Meh, label: "Neutral", color: "text-yellow-500 dark:text-yellow-400" },
    { icon: Frown, label: "Struggling", color: "text-destructive dark:text-destructive" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Reflection Journal</h1>
          <p className="text-muted-foreground mt-2">Document your spiritual journey and insights</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Journal Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Entry */}
            <Card className="p-6 bg-card">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">Today's Reflection</h2>
                  <p className="text-muted-foreground">Monday, 15 January 2024</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Save Draft
                  </Button>
                  <Button size="sm">
                    Complete Entry
                  </Button>
                </div>
              </div>

              {/* Mood Selector */}
              <div className="mb-6">
                <h3 className="font-medium text-card-foreground mb-3">How are you feeling spiritually today?</h3>
                <div className="flex gap-4">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setSelectedMood(mood.label)}
                      className={`flex-1 p-4 rounded-lg border ${
                        selectedMood === mood.label 
                          ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                          : 'border-border hover:border-primary/50 dark:hover:border-primary/70'
                      }`}
                    >
                      <mood.icon className={`h-6 w-6 mx-auto mb-2 ${mood.color}`} />
                      <p className="text-sm text-center text-card-foreground">{mood.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection Prompts */}
              <div className="space-y-6">
                {promptsOfDay.map((prompt, index) => (
                  <div key={index}>
                    <p className="font-medium text-card-foreground mb-2">{prompt}</p>
                    <Textarea 
                      placeholder="Write your reflection here..." 
                      className="min-h-[100px] bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Past Entries Preview */}
            <Card className="p-6 bg-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">Recent Reflections</h2>
                <Button variant="outline">View All</Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-card-foreground">Sunday, 14 January 2024</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Smile className="h-4 w-4 text-primary" />
                          <span>Peaceful</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Read</Button>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Today I felt a strong connection during Fajr prayer. The morning dhikr routine helped me...
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="p-6 bg-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-card-foreground">January 2024</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {/* Calendar grid would go here */}
            </Card>

            {/* Insights */}
            <Card className="p-6 bg-card">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">Monthly Insights</h2>
              <div className="space-y-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="font-medium text-card-foreground">Most Peaceful Days</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Fridays and early mornings show your highest spiritual connection</p>
                </div>
                <div className="bg-secondary/10 dark:bg-secondary/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-secondary" />
                    <span className="font-medium text-card-foreground">Growth Areas</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Consistent improvement in patience and gratitude</p>
                </div>
              </div>
            </Card>

            {/* Quick Prompts */}
            <Card className="p-6 bg-card">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">Reflection Prompts</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Sun className="h-4 w-4 mr-2" />
                  Morning Reflection
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Moon className="h-4 w-4 mr-2" />
                  Evening Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Custom Prompt
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
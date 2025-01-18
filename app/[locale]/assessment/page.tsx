'use client';

import React, { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, BookOpen, Heart, Star, Clock, Target } from 'lucide-react';
import { ROUTES } from '@/lib/navigation';

interface Answer {
  [key: string]: string;
}

export default function AssessmentScreen() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const sections = [
    {
      title: "Prayer Habits",
      description: "Let's understand your current prayer routine",
      icon: Clock,
      questions: [
        {
          id: "prayer_1",
          question: "How consistent are you with your five daily prayers?",
          options: [
            { value: "1", label: "I miss most prayers" },
            { value: "2", label: "I pray some prayers" },
            { value: "3", label: "I pray most prayers but often late" },
            { value: "4", label: "I pray all prayers mostly on time" }
          ]
        },
        {
          id: "prayer_2",
          question: "Do you pray in congregation when possible?",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Sometimes" },
            { value: "3", label: "Often" },
            { value: "4", label: "Always when possible" }
          ]
        },
        {
          id: "prayer_3",
          question: "How would you rate your khushu (concentration) in prayer?",
          options: [
            { value: "1", label: "Often distracted" },
            { value: "2", label: "Sometimes focused" },
            { value: "3", label: "Mostly focused" },
            { value: "4", label: "Deeply focused" }
          ]
        }
      ]
    },
    {
      title: "Quran Relationship",
      description: "Assess your connection with the Quran",
      icon: BookOpen,
      questions: [
        {
          id: "quran_1",
          question: "How often do you read Quran?",
          options: [
            { value: "1", label: "Rarely" },
            { value: "2", label: "Few times a month" },
            { value: "3", label: "Few times a week" },
            { value: "4", label: "Daily" }
          ]
        },
        {
          id: "quran_2",
          question: "Can you read Arabic script?",
          options: [
            { value: "1", label: "Not at all" },
            { value: "2", label: "Learning basics" },
            { value: "3", label: "Can read with difficulty" },
            { value: "4", label: "Can read fluently" }
          ]
        },
        {
          id: "quran_3",
          question: "Do you understand the meaning of what you read?",
          options: [
            { value: "1", label: "No understanding" },
            { value: "2", label: "Basic understanding" },
            { value: "3", label: "Moderate understanding" },
            { value: "4", label: "Good understanding" }
          ]
        }
      ]
    },
    {
      title: "Knowledge Level",
      description: "Evaluate your Islamic knowledge foundation",
      icon: Star,
      questions: [
        {
          id: "knowledge_1",
          question: "How would you rate your understanding of basic Islamic beliefs?",
          options: [
            { value: "1", label: "Very basic" },
            { value: "2", label: "Basic understanding" },
            { value: "3", label: "Good understanding" },
            { value: "4", label: "Advanced understanding" }
          ]
        },
        {
          id: "knowledge_2",
          question: "How familiar are you with Islamic jurisprudence (fiqh)?",
          options: [
            { value: "1", label: "Very limited" },
            { value: "2", label: "Basic knowledge" },
            { value: "3", label: "Intermediate" },
            { value: "4", label: "Advanced" }
          ]
        }
      ]
    },
    {
      title: "Character Development",
      description: "Reflect on your personal growth areas",
      icon: Heart,
      questions: [
        {
          id: "character_1",
          question: "How would you rate your patience in difficult situations?",
          options: [
            { value: "1", label: "Need significant improvement" },
            { value: "2", label: "Working on it" },
            { value: "3", label: "Generally patient" },
            { value: "4", label: "Very patient" }
          ]
        },
        {
          id: "character_2",
          question: "How consistent are you in being truthful?",
          options: [
            { value: "1", label: "Need improvement" },
            { value: "2", label: "Mostly truthful" },
            { value: "3", label: "Very truthful" },
            { value: "4", label: "Always truthful" }
          ]
        }
      ]
    },
    {
      title: "Goals & Aspirations",
      description: "Set your development priorities",
      icon: Target,
      questions: [
        {
          id: "goals_1",
          question: "What's your primary focus for improvement?",
          options: [
            { value: "prayer", label: "Prayer and Worship" },
            { value: "quran", label: "Quran Connection" },
            { value: "knowledge", label: "Islamic Knowledge" },
            { value: "character", label: "Character Development" }
          ]
        },
        {
          id: "goals_2",
          question: "How much time can you dedicate daily to your development?",
          options: [
            { value: "15", label: "15 minutes" },
            { value: "30", label: "30 minutes" },
            { value: "60", label: "1 hour" },
            { value: "90", label: "1.5 hours or more" }
          ]
        }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleComplete = async () => {
    // TODO: Save assessment answers
    console.log('Assessment completed:', answers);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <div className="mb-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Assessment Completed!</h2>
            <p className="text-gray-600 mt-2">Your personalized growth plan is ready.</p>
          </div>
          <Button asChild className="w-full">
            <Link href={ROUTES.DASHBOARD}>
              Go to Dashboard
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  const progress = ((currentSection + 1) / sections.length) * 100;
  const currentSectionData = sections[currentSection];
  const SectionIcon = currentSectionData.icon;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Falah</h1>
          <p className="text-gray-600 mt-2">
            Let's understand your journey to create your personalized growth plan
          </p>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600">
              Section {currentSection + 1} of {sections.length}
            </p>
            <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <SectionIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentSectionData.title}</h2>
              <p className="text-gray-600">{currentSectionData.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            {currentSectionData.questions.map((q) => (
              <div key={q.id} className="space-y-4">
                <p className="font-medium">{q.question}</p>
                <RadioGroup
                  onValueChange={(value: string) => handleAnswer(q.id, value)}
                  value={answers[q.id]}
                >
                  <div className="space-y-3">
                    {q.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          answers[q.id] === option.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem
                            value={option.value}
                            id={`${q.id}-${option.value}`}
                            className="mr-3"
                          />
                          <Label htmlFor={`${q.id}-${option.value}`}>
                            {option.label}
                          </Label>
                        </div>
                        {answers[q.id] === option.value && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentSection < sections.length - 1) {
                  setCurrentSection(prev => prev + 1);
                } else {
                  handleComplete();
                }
              }}
            >
              {currentSection < sections.length - 1 ? 'Next' : 'Complete & Generate Plan'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
import React from 'react';
import { 
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Users,
  ChevronUp,
  Sparkles,
  Award,
  Target,
  LucideIcon,
  Crown,
  Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RankCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: string;
  gradient: string;
}

interface LeaderboardUserProps {
  rank: number;
  level: number;
  progress: number;
  isCurrentUser?: boolean;
}

interface SuggestionCardProps {
  title: string;
  description: string;
  impact: string;
  gradient: string;
  icon: LucideIcon;
}

interface GradientCardProps {
  children: React.ReactNode;
  gradient?: string;
}

const GradientCard: React.FC<GradientCardProps> = ({ children, gradient = "from-blue-500 to-purple-600" }) => (
  <div className={`rounded-xl overflow-hidden mb-4 bg-gradient-to-r ${gradient} shadow-lg dark:shadow-none`}>
    <div className="px-6 py-5 text-white">
      {children}
    </div>
  </div>
);

const RankCard: React.FC<RankCardProps> = ({ icon: Icon, title, value, trend, gradient }) => (
  <GradientCard gradient={gradient}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-white/10 mr-3">
          <Icon className="text-white" size={20} />
        </div>
        <div>
          <p className="text-sm text-white/80">{title}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-white">
          <ChevronUp size={20} className="text-white/80" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      )}
    </div>
  </GradientCard>
);

const LeaderboardUser: React.FC<LeaderboardUserProps> = ({ rank, level, progress, isCurrentUser = false }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500 dark:text-yellow-400 mr-2" size={18} />;
      case 2:
        return <Medal className="text-gray-400 dark:text-gray-300 mr-2" size={18} />;
      case 3:
        return <Medal className="text-amber-600 dark:text-amber-500 mr-2" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg transition-colors ${
      isCurrentUser 
        ? 'bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10' 
        : 'hover:bg-accent/50'
    }`}>
      <div className="w-8 font-bold text-muted-foreground flex items-center">
        {getRankIcon(rank)}
        {!getRankIcon(rank) && `#${rank}`}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className={`font-medium ${
            isCurrentUser 
              ? 'text-primary dark:text-primary' 
              : 'text-foreground'
          }`}>
            {isCurrentUser ? 'You' : `Anonymous User ${rank}`}
          </span>
          {isCurrentUser && (
            <div className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20">
              <span className="text-xs text-primary">Current</span>
            </div>
          )}
        </div>
        <div className="flex items-center mt-2">
          <div className="flex-1 mr-4">
            <Progress 
              value={progress} 
              className={`h-2 ${
                rank <= 3 
                  ? 'bg-gradient-to-r from-primary/20 to-primary/10' 
                  : ''
              }`} 
            />
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-primary mr-1" />
            <span className="text-sm font-medium text-foreground">Level {level}</span>
          </div>
        </div>
      </div>
      <div className="text-sm font-medium ml-4">
        <span className={`px-3 py-1 rounded-full ${
          isCurrentUser 
            ? 'bg-primary text-white' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, description, impact, gradient, icon: Icon }) => (
  <Card className="overflow-hidden">
    <div className={`h-1 bg-gradient-to-r ${gradient}`} />
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} mr-3`}>
          <Icon className="text-white" size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center mt-2 text-sm">
            <Target size={16} className="mr-1 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent font-medium">
              Potential Impact: {impact}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AnonymousLeaderboard: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* User's Rankings - Mobile: Stack, Desktop: Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RankCard 
          icon={Trophy}
          title="Your Rank"
          value="Top 12%"
          trend="+5%"
          gradient="from-yellow-500 to-amber-600"
        />
        <RankCard 
          icon={Users}
          title="Active Users"
          value="10,000+"
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Current Level Stats */}
      <GradientCard gradient="from-purple-500 to-pink-600">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-1 flex items-center">
              <Award className="mr-2" />
              Your Progress
            </h2>
            <p className="opacity-90">Keep going, you're doing great!</p>
          </div>
          <div className="p-3 rounded-full bg-white/10">
            <Flame className="text-white" size={24} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-white/90">Level 12</span>
              <span className="text-sm text-white/80">850/1000 XP</span>
            </div>
            <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-[85%] bg-white/80 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center bg-white/10 rounded-lg p-2">
              <p className="text-sm text-white/80">Challenges</p>
              <p className="text-xl font-bold">7/12</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-2">
              <p className="text-sm text-white/80">Achievements</p>
              <p className="text-xl font-bold">15</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-2">
              <p className="text-sm text-white/80">Streak</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>
      </GradientCard>

      {/* Anonymous Leaderboard */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-foreground">
            <Trophy className="mr-2 text-yellow-500 dark:text-yellow-400" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <LeaderboardUser 
              rank={1}
              level={15}
              progress={95}
            />
            <LeaderboardUser 
              rank={2}
              level={14}
              progress={88}
            />
            <LeaderboardUser 
              rank={3}
              level={14}
              progress={82}
            />
            {/* Divider for current user */}
            <div className="border-t border-b border-border py-2 my-2">
              <LeaderboardUser 
                rank={127}
                level={12}
                progress={85}
                isCurrentUser={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Suggestions - Mobile: Stack, Desktop: Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center text-foreground">
          <TrendingUp className="mr-2 text-primary" />
          Ways to Improve
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <SuggestionCard 
            title="Complete Daily Challenge"
            description="Join today's community challenge to boost your ranking."
            impact="Move up 15 positions"
            gradient="from-green-500 to-emerald-600"
            icon={Target}
          />
          <SuggestionCard 
            title="Maintain Your Streak"
            description="You're on a great streak! Keep it going for bonus points."
            impact="Top 8% potential"
            gradient="from-orange-500 to-red-600"
            icon={Flame}
          />
          <SuggestionCard 
            title="Unlock Next Achievement"
            description="You're close to unlocking a new milestone."
            impact="Rank boost +3%"
            gradient="from-blue-500 to-indigo-600"
            icon={Award}
          />
        </div>
      </div>
    </div>
  );
};

export default AnonymousLeaderboard; 
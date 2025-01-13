'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from '@/i18n/routing';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement actual authentication logic
      console.log('Login attempt with:', { email, password });
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual signup logic
      console.log('Signup attempt with:', { email, password });
      alert('Signed up successfully! You can now log in.');
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
        <Button 
          type="button" 
          onClick={handleSignUp} 
          disabled={loading}
          variant="outline"
          className="w-full"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, AlertCircle, Timer } from 'lucide-react';
import { usePasswordAttempts } from '../hooks/usePasswordAttempts';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

const CORRECT_PASSWORD = 'wommala';

export default function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { attempts, isLocked, remainingTime, incrementAttempts, reset } = usePasswordAttempts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      return;
    }

    if (password === CORRECT_PASSWORD) {
      setError('');
      reset();
      onAuthenticated();
    } else {
      incrementAttempts();
      setError(`Incorrect password. ${3 - (attempts + 1)} attempts remaining.`);
      setPassword('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-gray-700 bg-gray-900/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-600">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
            Bittu Kadai
          </CardTitle>
          <CardDescription className="text-gray-400 text-base">
            Enter the password to access your code experiments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLocked ? (
            <Alert className="border-gray-700 bg-gray-800/50">
              <Timer className="h-5 w-5 text-gray-300" />
              <AlertDescription className="text-gray-300 ml-2">
                Too many failed attempts. Please wait {formatTime(remainingTime)} before trying again.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 text-base">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={isLocked}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500 min-h-[44px]"
                  autoFocus
                />
              </div>

              {error && (
                <Alert variant="destructive" className="border-gray-700 bg-gray-800/50">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="ml-2">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 font-medium min-h-[44px]"
                disabled={isLocked || !password}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock Access
              </Button>

              <p className="text-xs text-gray-500 text-center">
                {attempts > 0 && !isLocked && (
                  <span>Attempts used: {attempts}/3</span>
                )}
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

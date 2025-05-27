
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        await signUp(email, password, fullName);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">connect</span>
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight">
              COLLECT2MITS
            </h1>
            <div className="text-2xl lg:text-4xl font-bold text-primary-600 mt-8">
              Data Collection<br />
              made easier<br />
              than ever
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {!isLogin && (
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 text-base"
                      required={!isLogin}
                    />
                  )}
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-base pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold bg-primary-600 hover:bg-primary-700"
                >
                  {loading ? 'Loading...' : (isLogin ? 'LOGIN' : 'SIGN UP')}
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setEmail('');
                        setPassword('');
                        setFullName('');
                      }}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {isLogin ? 'Sign up now' : 'Login here'}
                    </button>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
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
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        
        if (error) throw error;
        
        toast({
          title: "Password reset email sent!",
          description: "Check your email for a link to reset your password.",
        });
        setIsForgotPassword(false);
      } else if (isLogin) {
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

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Login Form */}
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-12">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">connect</span>
              </div>
            </div>

            {/* Main Title */}
            <div className="mb-16">
              <h1 className="text-6xl lg:text-7xl font-black text-black tracking-tight mb-4">
                COLLECT2MITS
              </h1>
            </div>

            {/* Auth Form */}
            <Card className="w-full shadow-none border-0 bg-transparent p-0">
              <CardContent className="p-0 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {!isLogin && !isForgotPassword && (
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-14 text-lg border-2 border-gray-300 rounded-lg px-4"
                        required={!isLogin && !isForgotPassword}
                      />
                    )}
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-lg border-2 border-gray-300 rounded-lg px-4"
                      required
                    />
                    {!isForgotPassword && (
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-14 text-lg border-2 border-gray-300 rounded-lg px-4 pr-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-14 px-4 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  {isLogin && !isForgotPassword && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(true);
                          resetForm();
                        }}
                        className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    {loading ? 'Loading...' : (
                      isForgotPassword ? 'Send Reset Email' : (isLogin ? 'LOGIN' : 'SIGN UP')
                    )}
                  </Button>

                  {!isForgotPassword && (
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsLogin(!isLogin);
                            resetForm();
                          }}
                          className="text-gray-800 hover:text-red-600 font-medium"
                        >
                          {isLogin ? 'Sign in now' : 'Login here'}
                        </button>
                      </span>
                    </div>
                  )}

                  {isForgotPassword && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(false);
                          resetForm();
                        }}
                        className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to login</span>
                      </button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="space-y-8 text-center lg:text-left order-1 lg:order-2">
          <div className="space-y-8">
            <div className="text-6xl lg:text-8xl font-black text-red-600 leading-tight">
              Data Collection<br />
              made easier<br />
              than ever
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

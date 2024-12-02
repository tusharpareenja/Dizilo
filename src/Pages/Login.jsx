import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function LoginRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    const form = event.currentTarget;
    const username = form.elements.namedItem('username').value;
    const password = form.elements.namedItem('password').value;

    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { username, password },
        { withCredentials: true }
      );
      setSuccess('Login Successful');
      console.log(response.data);
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const form = event.currentTarget;
    const name = form.elements.namedItem('name').value;
    const username = form.elements.namedItem('username').value;
    const password = form.elements.namedItem('password').value;
    const email = form.elements.namedItem('email').value;
    const confirmPassword = form.elements.namedItem('confirm-password').value;

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/user/register',
        { username, name, password, email },
        { withCredentials: true }
      );
      setSuccess('Registration successful! Please log in.');
      console.log(response.data);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
};


  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-[1000px] grid md:grid-cols-2 overflow-hidden rounded-3xl shadow-xl">
        {/* Left Side - Spline Animation */}
        <div className="bg-gray-100 flex items-center justify-center overflow-hidden z-10 max-h-[600px]">
          <Spline scene="https://prod.spline.design/wFbLNLgN95bbv1iQ/scene.splinecode" />
        </div>

        {/* Right Side - Auth Form */}
        <div className="p-8 md:p-12 relative h-[600px] overflow-y-auto">
          {/* Plus Icon */}
          <div className="absolute top-4 right-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-6 max-w-sm mx-auto">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">{isLogin ? 'Welcome back!' : 'Create an account'}</h1>
              <p className="text-gray-500">{isLogin ? 'Please enter your details' : 'Please fill in your information'}</p>
            </div>

            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
              {/* Form fields */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Enter your name" type="text" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Enter your username" type="text" required />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="Enter your email" type="email" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    placeholder="Confirm your password"
                    name="confirm-password"
                    type="password"
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember for 30 days
                    </label>
                  </div>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button className="w-full bg-black text-white hover:bg-gray-900" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : (isLogin ? 'Log in' : 'Sign up')}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 13.99c-.28-.8-.44-1.66-.44-2.49s.16-1.69.44-2.49V6.61H2.18C1.74 8.29 1.5 10.14 1.5 12s.24 3.71.68 5.39h3.66z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.25c1.57 0 2.92.54 4.02 1.46L18.45 3.2C16.74 2.02 14.51 1.25 12 1.25 7.7 1.25 3.99 3.72 2.18 6.61l3.66 2.83c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </Button>

              <p className="text-center text-sm text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="font-semibold text-gray-800"
                >
                  {isLogin ? 'Sign up here' : 'Log in here'}
                </button>
              </p>
            </form>
            {error && <div className="text-red-600 mt-4">{error}</div>}
            {success && <div className="text-green-600 mt-4">{success}</div>}
          </div>
        </div>
      </Card>
    </div>
  );
}


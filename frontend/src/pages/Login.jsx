import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dasboard.jsx';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
              console.log(data);


      if (response.ok) {
        // Save token to localStorage
        console.log(data);
        
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        setTimeout(() => {
          navigate('/Dashboard', { 
            state: { 
              message: 'Login successful!',
              user: data.user 
              
            }
          });
        }, 1000);
      } else {
        setErrors({ submit: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Medium Size Card */}
      <div className="w-full max-w-md"> {/* Increased to max-w-md */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center"> {/* Increased padding */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/30"> {/* Larger icon */}
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1> {/* Larger text */}
            <p className="text-white/80">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-7"> {/* Increased padding */}
            <form onSubmit={handleSubmit} className="space-y-5"> {/* More spacing */}
              
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-green-400 focus:border-green-400'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1"> {errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-green-400 focus:border-green-400'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-300 text-sm mt-1"> {errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-green-600 bg-white/5 border-white/20 rounded focus:ring-green-500"
                  />
                  <label htmlFor="remember" className="text-sm text-white/80">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-green-300 hover:text-green-200 underline transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2 cursor-pointer">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin " />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In to Your Account'
                )}
              </button>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm text-center">{errors.submit}</p>
                </div>
              )}
            </form>

            {/* Signup Link */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-white/60">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-green-300 hover:text-green-200 font-semibold underline transition-colors duration-300"
                >
                  Create New Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
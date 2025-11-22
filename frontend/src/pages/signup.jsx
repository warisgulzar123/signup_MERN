import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords mismatch';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const username = `${formData.firstName}${formData.lastName}`.toLowerCase();
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Account created successfully!' }
          });
        }, 1000);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Perfect Size Card - 90vh height */}
      <div className="w-full max-w-md h-[90vh] flex items-center justify-center"> {/* 90vh height */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden w-full">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-5 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Join Us</h1>
            <p className="text-white/80 text-sm">Create your account</p>
          </div>

          {/* Form - Comfortable spacing */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 text-sm ${
                      errors.firstName ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                    }`}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-xs mt-1"> {errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 text-sm ${
                      errors.lastName ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                    }`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-xs mt-1"> {errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 text-sm ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                  }`}
                  placeholder="Email Address"
                />
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1"> {errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 text-sm ${
                    errors.password ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1"> {errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 text-sm ${
                    errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                  }`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-300 text-xs mt-1"> {errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 bg-white/5 border-white/20 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms" className="text-sm text-white/80">
                  I agree to <span className="text-purple-300 underline">Terms</span>
                </label>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm">Creating...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-2">
                  <p className="text-red-300 text-xs text-center"> {errors.submit}</p>
                </div>
              )}
            </form>

            {/* Login Link */}
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                Have an account?{' '}
                <Link
                  to="/login"
                  className="text-purple-300 hover:text-purple-200 font-semibold underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
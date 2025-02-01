import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-purple-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl animate-pulse"></div>
        
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 backdrop-blur-lg bg-opacity-80">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 transform hover:scale-105 transition duration-300">Contact Form</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative transform transition duration-300 hover:scale-[1.01]">
                    <label htmlFor="name" className="text-gray-600 mb-2 block font-semibold">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="peer block w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                        transition duration-300 ease-in-out
                        hover:border-indigo-400"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="relative transform transition duration-300 hover:scale-[1.01]">
                    <label htmlFor="email" className="text-gray-600 mb-2 block font-semibold">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="peer block w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                        transition duration-300 ease-in-out
                        hover:border-indigo-400"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="relative transform transition duration-300 hover:scale-[1.01]">
                    <label htmlFor="phone" className="text-gray-600 mb-2 block font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="peer block w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                        transition duration-300 ease-in-out
                        hover:border-indigo-400"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="relative mt-8">
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
                        text-lg font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 
                        hover:from-indigo-700 hover:to-purple-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        transform transition duration-300 ease-in-out
                        hover:scale-[1.02] hover:shadow-lg
                        active:scale-95"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100 transition-colors duration-300" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 5l7 7-7 7"/>
                        </svg>
                      </span>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

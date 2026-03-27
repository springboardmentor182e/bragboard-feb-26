import api from './api.js';

export const signupUser = async (email, password) => {
  try {
    const response = await api.post('/auth/signup', {
      email,
      password,
      role: "employee"  // Hardcoded
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    let errorMsg = 'Signup failed';
    
    if (error.response) {
      const status = error.response.status;
      if (status === 400) errorMsg = 'An account with this email already exists.';
      else if (status === 422) errorMsg = 'Invalid input. Please check your details.';
      else if (status === 404) errorMsg = 'Signup service not available. Check if server is running.';
      else errorMsg = error.response.data.detail || errorMsg;
    } else if (error.request) {
      errorMsg = 'Server is unavailable. Please try again later.';
    }

    return {
      success: false,
      error: errorMsg
    };
  }
};


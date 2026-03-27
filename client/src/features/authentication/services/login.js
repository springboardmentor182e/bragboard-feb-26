import api from './api.js';

export const loginUser = async (email, password, role = "employee") => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      role
    });

    // Store tokens
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_role', role);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    let errorMsg = 'Login failed';
    
    if (error.response) {
      const status = error.response.status;
      if (status === 401) errorMsg = 'Invalid email or password.';
      else if (status === 403) errorMsg = `Access denied. You don't have permission for this role.`;
      else if (status === 422) errorMsg = 'Invalid input. Please check your details.';
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


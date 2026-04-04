import API from './api';

/**
 * Settings Service - API integration for user and admin settings
 */

export const settingsService = {
  // ========== USER SETTINGS ==========

  /**
   * Fetch all user preferences for logged-in user
   * GET /users/me/settings
   */
  getUserSettings: async () => {
    try {
      const response = await API.get('/users/me/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching user settings:', error);
      throw error;
    }
  },

  /**
   * Auto-save a single user setting
   * PUT /users/me/settings/{key}
   */
  updateUserSetting: async (settingKey, value) => {
    try {
      const response = await API.put(`/users/me/settings/${settingKey}`, {
        value
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating setting ${settingKey}:`, error);
      throw error;
    }
  },

  /**
   * Change user password
   * POST /users/me/change-password
   */
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await API.post('/users/me/change-password', {
        old_password: oldPassword,
        new_password: newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // ========== ADMIN SETTINGS ==========

  /**
   * Fetch system-wide admin settings (admin only)
   * GET /admin/settings
   */
  getAdminSettings: async () => {
    try {
      const response = await API.get('/admin/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin settings:', error);
      throw error;
    }
  },

  /**
   * Auto-save a single admin setting (admin only)
   * PUT /admin/settings/{key}
   */
  updateAdminSetting: async (settingKey, value) => {
    try {
      const response = await API.put(`/admin/settings/${settingKey}`, {
        value
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating admin setting ${settingKey}:`, error);
      throw error;
    }
  }
};

export default settingsService;

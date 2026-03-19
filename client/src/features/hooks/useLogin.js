import { loginUser } from "../authentication/services/login";

const useLogin = () => {
  const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  };

  return { handleLogin };
};

export default useLogin;

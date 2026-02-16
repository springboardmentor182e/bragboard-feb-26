import { loginUser } from "../services/loginService";

const useLogin = () => {
  const handleLogin = async (email, password) => {
    const response = await loginUser(email, password);
    return response;
  };

  return { handleLogin };
};

export default useLogin;
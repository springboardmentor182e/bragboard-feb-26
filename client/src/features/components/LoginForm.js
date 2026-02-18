import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    console.log(result);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login Form</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
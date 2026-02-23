import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, roleRequired }) {
  const role = localStorage.getItem("role");

  if (role !== roleRequired) {
    // redirect unauthorized users
    return <Navigate to="/" replace />;
  }

  return children;
}
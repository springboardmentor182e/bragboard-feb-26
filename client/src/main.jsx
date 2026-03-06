import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure Tailwind is imported here
import App from './App.jsx';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ));
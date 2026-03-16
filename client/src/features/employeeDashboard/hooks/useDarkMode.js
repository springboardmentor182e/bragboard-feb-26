import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  const toggleDark = () => setDark((prev) => !prev);

  return { dark, toggleDark };
};

export default useDarkMode;
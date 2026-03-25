import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_BASE_URL}${url}`, {
          timeout: 10000,
          ...options
        });
        setData(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        if (options.fallbackData !== undefined) {
          setData(options.fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

export default useFetch;


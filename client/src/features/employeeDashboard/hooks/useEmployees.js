import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getEmployees();

        // 🔥 IMPORTANT FIX
        let data = [];

        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (Array.isArray(res.data?.data)) {
          data = res.data.data;
        } else if (Array.isArray(res.data?.employees)) {
          data = res.data.employees;
        }

        console.log("✅ Employees:", data);

        setEmployees(data);

        if (data.length > 0) {
          setSelectedEmployee(data[0]);
        }

      } catch (err) {
        console.error("❌ Failed to load employees", err);
        setError("Failed to load employees.");
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { employees, selectedEmployee, setSelectedEmployee, loading, error };
};

export default useEmployees;
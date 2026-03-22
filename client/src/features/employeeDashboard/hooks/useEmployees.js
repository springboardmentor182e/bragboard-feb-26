// import { useEffect, useState } from "react";
// import { getEmployees } from "../services/employeeService";

// const useEmployees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       try {
//         const res = await getEmployees();
//         setEmployees(res.data);
//         if (res.data.length > 0) setSelectedEmployee(res.data[0]);
//       } catch (err) {
//         console.error("Failed to load employees", err);
//         setError("Failed to load employees.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   return { employees, selectedEmployee, setSelectedEmployee, loading, error };
// };

// export default useEmployees;

// useEmployees.js — no changes needed, preserved exactly
import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";

const useEmployees = () => {
  const [employees, setEmployees]               = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading]                   = useState(false);
  const [error, setError]                       = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getEmployees();
        setEmployees(res.data);
        if (res.data.length > 0) setSelectedEmployee(res.data[0]);
      } catch (err) {
        console.error("Failed to load employees", err);
        setError("Failed to load employees.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { employees, selectedEmployee, setSelectedEmployee, loading, error };
};

export default useEmployees;

import { useMemo } from "react";

export function useLeaderboardFilter(
  leaderboard,
  search,
  departmentFilter,
  currentPage,
  usersPerPage
) {
  const sorted = useMemo(() => {
    return [...leaderboard].sort((a, b) => b.points - a.points);
  }, [leaderboard]);

  const filteredUsers = useMemo(() => {
    return sorted.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        user.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [sorted, search, departmentFilter]);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return { sorted, currentUsers, totalPages };
}
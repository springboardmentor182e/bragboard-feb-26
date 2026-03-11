const API_URL = import.meta.env.VITE_API_URL;

export async function getLeaderboard() {
  try {
    if (!API_URL) {
      throw new Error("API URL is not configured");
    }

    const response = await fetch(`${API_URL}/leaderboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard (Status: ${response.status})`);
    }

    const result = await response.json();

    const users = Array.isArray(result) ? result : result.data || [];

    return users;

  } catch (error) {
    throw new Error(error.message || "Unable to load leaderboard");
  }
}
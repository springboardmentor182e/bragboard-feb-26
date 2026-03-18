import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/profile`)
      .then(res => setProfile(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
    </div>
  );
};

export default Profile;
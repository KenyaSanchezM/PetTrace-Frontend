import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch('http://localhost:8000/api/perfil-usuario/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      {profile ? (
        <div>
          <h1>{profile.nombre}</h1>
          <p>Email: {profile.email}</p>
          {/* Agrega más detalles aquí */}
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
};

export default UserProfile;

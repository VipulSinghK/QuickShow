import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react'; // Import useAuth
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth(); // Get token function
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const token = await getToken(); // Obtain valid JWT
        const response = await fetch('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the fetched token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [isLoaded, user, navigate, getToken]);

  // Rest of the component remains the same
  // ...
};

export default Profile;
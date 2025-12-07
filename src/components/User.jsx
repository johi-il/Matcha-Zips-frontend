import React, { useState, useEffect } from 'react';

function User ({ userId }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: ''});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/user'; // Replace with your actual API endpoint

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
        setFormData({ name: data.name });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // Empty dependency array means this effect runs once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset form data if canceling edit
    if (isEditing) {
      setFormData({ name: user.name});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false); // Switch back to view mode
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
      alert('Failed to update profile.');
    }
  };

  if (isLoading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};
export default User;

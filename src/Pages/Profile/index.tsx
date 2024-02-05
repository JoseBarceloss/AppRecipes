import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Profile() {
  const [email, setEmail] = useState<any>('');

  const navigate = useNavigate();

  const getEmail = () => {
    const user = localStorage.getItem('user');
    setEmail(user);
  };

  useEffect(() => {
    getEmail();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="profile-email">{email}</h3>
        <button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

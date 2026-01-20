import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

import PagesRoutes from './PagesRoutes';
import HeaderBar from './Components/HomePageComponent/HeaderBar';
import FooterBar from './Components/HomePageComponent/FooterBar';
import { useProfileData } from './context/ProfileContext';

function App() {
  const { profileState, changeProfile } = useProfileData();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile && !profileState) {
      changeProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <BrowserRouter>
      <HeaderBar />
      <PagesRoutes />
      <FooterBar />
    </BrowserRouter>
  );
}

export default App;

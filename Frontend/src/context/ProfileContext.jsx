import { createContext,useState,useContext } from "react";
const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileState, setProfileState] = useState(null);

  const changeProfile = (data) => {
    setProfileState(data);
  };

  const clearProfileData = () => {
    setProfileState(null);
  };

  return (
    <ProfileContext.Provider value={{ profileState, changeProfile, clearProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfileData = () => useContext(ProfileContext);

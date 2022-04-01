import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

const AuthContext = createContext();
export default function AuthContextProvider(props) {
  const {userInfo, isLoggedIn} = props;
  const [isCurrentlyLoggedIn, setIsCurrentlyLoggedIn] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({});
  useEffect(() => {
    setIsCurrentlyLoggedIn(userInfo);
  }, [userInfo, isLoggedIn]);

  // useMemo for the provided state
  const value = useMemo(
    () => ({
      isCurrentlyLoggedIn,
      loggedInUserInfo,
      setLoggedInUserInfo,
      setIsCurrentlyLoggedIn,
    }),
    [loggedInUserInfo, loggedInUserInfo],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used in descendent of AuthContextProvider',
    );
  }
  return context;
}

import { createRoot } from 'react-dom/client';
import "./index.css"
import App from "./App"
import { useState } from 'react';
import { User } from 'types/api/user';
// import { useAuthProvider } from 'hooks/useAuthProvider';
import {AuthProvider} from 'hooks/provider/useAuthProvider';
// import { AuthContext } from 'context';

// const [loading, setLoading] = useState<boolean>(false)
// const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
// const [currentUser, setCurrentUser] = useState<User | undefined>()
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
// const { AuthProvider } = useAuthProvider();
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
  // <AuthContext>
  //   <App />
  // </AuthContext>
  // <App />

  // <AuthContext.Provider value={
  //   {
  //     loading,
  //     setLoading,
  //     isSignedIn,
  //     setIsSignedIn,
  //     currentUser,
  //     setCurrentUser
  //   }}>
  //   <App />
  // </AuthContext.Provider>
);

import { AuthContext } from "context";
import { Context, FC, ReactNode, useCallback, useContext, useState } from "react";
import { User } from "types/api/user";
import { createContext } from "vm";

type Props ={
  children: ReactNode
}
  // export const AuthContext: Context<unknown> = createContext() as Context<unknown>;

// const AuthContext = createContext({} as {
//   loading: boolean
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>
//   isSignedIn: boolean
//   setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
//   currentUser: User | undefined
//   setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
// })

// const AuthContext = React.createContext();


// export const useAuth = () => {
//   return useContext(AuthContext);
// };
export const useAuth = () => useContext(AuthContext);

// export const useAuthProvider = () => {
//   const AuthProvider: FC<Props> = useCallback(({ children }) => {
//     // const { children } = props;
//     const [loading, setLoading] = useState<boolean>(false)
//     const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
//     const [currentUser, setCurrentUser] = useState<User | undefined>()

//     const value={
//           loading,
//           setLoading,
//           isSignedIn,
//           setIsSignedIn,
//           currentUser,
//           setCurrentUser
//     }

//     return (
//       <AuthContext.Provider value={value}>
//         {children}
//       </AuthContext.Provider>
//     );
//   }, [])
//   return {AuthProvider};
// }


const AuthProvider: FC<Props> = ({ children }) => {
  // const { children } = props;
  const [loading, setLoading] = useState<boolean>(false)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const value={
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider }

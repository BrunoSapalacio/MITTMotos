import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const getUser = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          const { uid, displayName, email } = user;
          const userType = email === 'admin@mittmotos.com' ? 'Administrador' : 'Suporte';
          setUser({
            id: uid,
            name: displayName,
            email: email,
            userType: userType,
          });
        } else {
          console.log('não logado');
          setUser(null);
        }
        setLoading(false);
      });

      return getUser;
  },[auth])

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

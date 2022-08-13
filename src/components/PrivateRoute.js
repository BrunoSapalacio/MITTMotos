import { Navigate, Outlet } from "react-router-dom";

// Hooks
import useAuth from "../hooks/useAuth";


export default function PrivateRoute() {
  const { user } = useAuth();
  console.log(user)
  
      return (
        <>
            {user ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )
}

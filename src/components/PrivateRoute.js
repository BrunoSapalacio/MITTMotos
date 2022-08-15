import { Navigate, Outlet } from "react-router-dom";

// Hooks
import useAuth from "../hooks/useAuth";


export default function PrivateRoute() {
  const { user } = useAuth();
  
      return (
        <>
            {user ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )
}

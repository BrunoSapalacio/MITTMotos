import { Navigate, Outlet } from "react-router-dom";
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

import { useState } from "react";

//Imagem
import Motorcycle from "../images/Motorcycle.png";

//CSS
import "./Home.css";

//Componentes
import Register from "../components/Register";
import Login from "../components/Login";

const Home = () => {
  const [home, setHome] = useState("Login");

  const stateLogin = () => setHome("Login");
  const stateRegister = () => setHome("Register");

  return (
    <div className="content">
      {/* Imagem home */}
      <div className="image">
        <img src={Motorcycle} alt="Moto" />
      </div>
      {/* Login */}
      <div className="home">
        {home && home === "Login" ? (
          <Login state={stateRegister}></Login>
        ) : (
          <Register state={stateLogin}></Register>
        )}
        <footer className="footer-home">
          <h3>© Bruno Sapalacio</h3>
        </footer>
      </div>
    </div>
  );
};

export default Home;

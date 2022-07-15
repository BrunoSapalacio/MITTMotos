import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Cria rotas de páginas
import axios from "axios"; // Cria conexao HTTP

// CSS
import "./App.css";

// Paginas
import Home from "./pages/Home";
import Panel from "./pages/Panel";
import Profile from "./pages/Profile";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Pega os dados da API
    async function getData() {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    }
    getData();
    console.log(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const homeScreen = () => {
    // Muda para a tela de login
    axios.patch("http://localhost:3000/users", { login: false });
    //document.location.reload(true)
    document.location.replace("/");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Verifica se o usuario está logado */}
          {users && users.login === false ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route
              path="/"
              element={<Panel path="/panel" homeScreen={homeScreen} />}
            />
          )}
          <Route
            path="/profile"
            element={<Profile users={users} homeScreen={homeScreen} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

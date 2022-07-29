import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Cria rotas de páginas
import db from "./firebase/Database";
import {collection, getDocs } from "firebase/firestore";

// CSS
import "./App.css";

// Paginas
import Home from "./pages/Home";
import Panel from "./pages/Panel";
import Profile from "./pages/Profile";

function App() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  //const url = "http://localhost:3000/users";

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getUsers();
    console.log(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const homeScreen = () => {
    // Muda para a tela de login
    //axios.patch(url, { login: false });
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
            element={<Profile user={users} homeScreen={homeScreen} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

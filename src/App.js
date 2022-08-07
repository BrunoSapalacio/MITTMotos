import { BrowserRouter, Routes, Route } from "react-router-dom"; // Cria rotas de páginas

// CSS
import "./App.css";

// Paginas
import Home from "./pages/Home";
import Panel from "./pages/Panel";
import Profile from "./pages/Profile";

// Components
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/" element={<Panel />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact path="/login" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

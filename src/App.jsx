import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Publish from "./pages/Publish/Publish";
import Cookies from "js-cookie";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token);
      setIsConnected(true);
    } else {
      Cookies.remove("userToken");
      setIsConnected(false);
    }
  };

  return (
    <Router>
      <Header
        isConnected={isConnected}
        handleToken={handleToken}
        setIsConnected={setIsConnected}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home title={title} priceMin={priceMin} priceMax={priceMax} />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={
            <Signup
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              handleToken={handleToken}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              handleToken={handleToken}
            />
          }
        />
        <Route
          path="/publish"
          element={<Publish isConnected={isConnected} />}
        />
        <Route
          path="*"
          element={
            <div className="container">Vous n'êtes pas censés etre ici</div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

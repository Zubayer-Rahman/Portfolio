import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import "normalize.css";
import "./App.css";
import SplashScreen from "./components/SplashScreen.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </>
  );
}

export default App;

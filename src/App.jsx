import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";
import { useState } from "react";

function App() {
  // Initialize user state from localStorage (parse user info)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/contact" element={<Contact user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

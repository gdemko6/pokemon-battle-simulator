import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Battle from "./pages/Battle";
import History from "./pages/History";

// Placeholder components for pages

function About() {
  return <h1>About the App</h1>;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

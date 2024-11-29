import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Placeholder components for pages
function Home() {
  return <h1>Welcome to Pokémon Fight Simulator</h1>;
}

function Battle() {
  return <h1>Battle Page</h1>;
}

function History() {
  return <h1>Battle History</h1>;
}

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
      </Routes>
    </Router>
  );
}

export default App;

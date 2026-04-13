import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { MouseAnimation } from "./components/MouseAnimation";
import { LocationGreeting } from "./components/LocationGreeting";
import { FunFeatures } from "./components/FunFeatures";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { PlayGameSection } from "./components/PlayGameSection";
import { Blog } from "./components/sections/Blog";
import "./index.css";
import { Contact } from "./components/sections/Contact";
import { F1DashboardArticle } from "./components/blog/F1DashboardArticle";

function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <MouseAnimation />
      <LocationGreeting />
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-th-bg text-th-text noise desktop-cursor`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <PlayGameSection />
        <Blog />
        <Contact />
        <FunFeatures />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog/f1-intelligence-dashboard" element={<F1DashboardArticle />} />
    </Routes>
  );
}

export default App;

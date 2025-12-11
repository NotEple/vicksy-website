import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Socials from "./pages/Socials";
// import Error from "./pages/Error";
// import Landing from "./pages/Landing";
import TitleController from "./components/TitleController";
import vicksyPeek from "./assets/vicksyPeek.png";
import vicksyFastRoll from "./assets/vicksyFastRoll.gif";
import Development from "./pages/Development";

function App() {
  return (
    <BrowserRouter>
      <TitleController />
      <div className="w-full h-dvh flex flex-col bg-bg-light">
        <Navbar />
        <main className="h-full relative overflow-hidden items-center flex justify-center w-full">
          <Routes>
            <Route path="/" element={<Development />} />
            {/* <Route path="/merch" element={<Merch />} /> */}
            <Route path="/socials" element={<Development />} />
            <Route path="/dashboard" element={<Development />} />
            <Route path="*" element={<Development />} />
          </Routes>

          <img src={vicksyPeek} className="absolute top-1/2 -left-6" />
          <img
            src={vicksyFastRoll}
            className="absolute -bottom-1 move-across"
            id="rolling"
          />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

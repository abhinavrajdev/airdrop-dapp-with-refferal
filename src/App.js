import Landingpage from "./pages/Landingpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/airdrop/:filter" element={<Landingpage />} />
        <Route path="/airdrop" element={<Landingpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

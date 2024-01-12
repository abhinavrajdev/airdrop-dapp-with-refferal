import ContactUs from "./pages/ContactUs";
import Farm from "./pages/Farm";
import Landingpage from "./pages/Landingpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/airdrop/:filter" element={<Landingpage />} />
        <Route path="/airdrop" element={<Landingpage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/farm" element={<Farm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

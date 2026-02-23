import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyShoutouts from "./pages/MyShoutouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyShoutouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
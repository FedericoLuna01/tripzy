import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/home/home";
import NotFound from "./routes/not-found/not-found";
import Login from "./routes/login/login";
import Register from "./routes/register/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

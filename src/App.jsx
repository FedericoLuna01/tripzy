import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/home/home";
import NotFound from "./routes/not-found/not-found";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Layout from "./components/layout/layout";
import Trips from "./routes/trips/trips";
import NewTrip from "./routes/new-trip/new-trip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/new-trip" element={<NewTrip />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import TripLayout from "./components/trip-layout/trip-layout";
import AboutUs from "./components/about-us/about-us";
import Layout from "./components/layout/layout";
import ProtectedRoutes from "./routes/protected-routes/protected-routes";
import TripMembers from "./routes/trip-members/trip-members";
import ProfileEdit from "./routes/profile-edit/profile-edit";
import AdminEdit from "./routes/admin-edit/admin-edit";
import NotFound from "./routes/not-found/not-found";
import TripEdit from "./routes/trip-edit/trip-edit";
import Register from "./routes/register/register";
import NewTrip from "./routes/new-trip/new-trip";
import Profile from "./routes/profile/profile";
import Login from "./routes/login/login";
import Admin from "./routes/admin/admin";
import Home from "./routes/home/home";
import Trip from "./routes/trip/trip";
import AdminProtectedRoutes from "./routes/admin-protected-routes/admin-protected-routes";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/new-trip" element={<NewTrip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/trip/edit/:id" element={<TripEdit />} />
            <Route element={<TripLayout />}>
              <Route path="/trip/:id" element={<Trip />} />
              <Route path="/trip/:id/members" element={<TripMembers />} />
            </Route>
          </Route>
          {/* <Route element={<AdminProtectedRoutes />}> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit/:id" element={<AdminEdit />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

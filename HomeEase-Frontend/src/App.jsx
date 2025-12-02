import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Footer } from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import { Dashboard } from "./components/Dashboard";
import { Aboutus } from "./components/Aboutus";
import { ServiceDashBord } from "./components/ServicesDashBord";

import DisplayElectronics from "./components/ElectricalService";
import DisplayPlumbing from "./components/PlumbingService";
import DisplayCarpentry from "./components/CarpentryService";
import DisplayGardaning from "./components/GardningServices";
import DisplayCleaning from "./components/CleaningService";
import DisplayPainting from "./components/PaintingService";

import Payment from "./components/Payment";
import { PaymentList } from "./components/PaymentList";
import { FeedbackForm } from "./components/FeedbackForm";
import { FeedbackList } from "./components/FeedbackList";

import { AddServices } from "./components/AddServices";
import { ServiceList } from "./components/ServiceList";
import { EditService } from "./components/EditService";

import { PrivateRoute } from "./components/PrivateRoute";
import { ROLES } from "./constants/RoleConstants";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">

        {/* NAVBAR */}
        <NavigationBar />

        {/* Single Toast Container */}
        <ToastContainer />

        {/* MAIN PAGE CONTENT */}
        <div className="flex-grow-1">
          <Routes>

            {/* ---------- PUBLIC ROUTES ---------- */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/service-dashboard" element={<ServiceDashBord />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ---------- USER + ADMIN PROTECTED ROUTES ---------- */}
            <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]} />}>
              <Route path="/electrical-services" element={<DisplayElectronics />} />
              <Route path="/plumbing-services" element={<DisplayPlumbing />} />
              <Route path="/carpentry-services" element={<DisplayCarpentry />} />
              <Route path="/gardening-services" element={<DisplayGardaning />} />
              <Route path="/cleaning-services" element={<DisplayCleaning />} />
              <Route path="/painting-services" element={<DisplayPainting />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payments" element={<PaymentList />} />
              <Route path="/feedback" element={<FeedbackForm />} />
            </Route>

            {/* ---------- ADMIN ONLY ROUTES ---------- */}
            <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/add-services" element={<AddServices />} />
              <Route path="/serviceList" element={<ServiceList />} />
              <Route path="/edit-service/:id" element={<EditService />} />
              <Route path="/feedback-list" element={<FeedbackList />} />
            </Route>

          </Routes>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

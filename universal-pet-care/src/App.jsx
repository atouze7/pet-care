import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import { VetListing } from "./components/vet/VetListing";
import BookAppointment from "./components/appointment/BookAppointment";
import Vet from "./components/vet/Vet";
import UserRegistration from "./components/user/UserRegistration";
import Login from "./components/auth/Login";
import UserProfile from "./components/user/UserProfile";
import UserDashboard from "./components/user/UserDashboard";
import UserUpdate from "./components/user/UserUpdate";
import AdminDashboard from "./components/appointment/admin/AdminDashboard";
import EmailVerification from "./components/auth/EmailVerification";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Routes accessible without authentication */}

        <Route index element={<Home />} />
        <Route path="/doctors" element={<VetListing />} />

        <Route path="/vet/:vetId/vet" element={<Vet />} />

        <Route path="/register-user" element={<UserRegistration />} />

        <Route path="/login" element={<Login />} />

        <Route path="/vet-reviews/:vetId/vet" element={<Vet />} />

        <Route
          path="/password-rest-request"
          element={<PasswordResetRequest />}
        />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/email-verification" element={<EmailVerification />} />
        {/* Routes accessible without authentication */}

        {/* Wrap the routes that require authentication and possibly authorization 
        <Route
          element={
            <ProtectedRoutes
              allowedRoles={["ROLE_PATIENT", "ROLE_ADMIN", "ROLE_VET"]}
              useOutlet={true}
            />
          }
        > */}
        <Route
          path="/user-dashboard/:userId/my-dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/book-appointment/:recipientId/new-appointment"
          element={<BookAppointment />}
        />

        <Route path="/update-user/:userId/update" element={<UserUpdate />} />
        {/*</Route>*/}

        {/************  End authenticated users only  *******************/}
      </Route>
    )
  );
  return (
    <main className="">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;

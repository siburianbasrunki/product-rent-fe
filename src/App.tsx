import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BottomNav from "./components/NavigationBotton";
import { BookingPage } from "./pages/booking";
import { CreateBooking } from "./pages/booking/CreateBooking";
import { BalancePage } from "./pages/balance/balance";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { OtpPage } from "./pages/otp";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BookingDetail } from "./pages/booking/BookingDetails";
import { ConfirmationProvider } from "./components/PopUp";
import { ReturnCamera } from "./pages/booking/ReturnCameraBook";
import ProductListPage from "./pages/Product/ListProduct";
import ProductDetail from "./pages/Product/DetailProduct";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideBottomNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/otp";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col shadow-xl relative">
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <ProductListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/*"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <CreateBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/detail/:id"
              element={
                <ProtectedRoute>
                  <BookingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/return/:id"
              element={
                <ProtectedRoute>
                  <ReturnCamera />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <ProtectedRoute>
                  <BalancePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfirmationProvider>
          <Router>
            <AppContent />
          </Router>
        </ConfirmationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

// Replace any import statements for CSS files that have nesting with imports to non-nested CSS files
// For example, if App.css imports are causing issues, comment them out
// import './App.css'; -> // import './App.css';

// Keep importing the index.css as it contains Tailwind directives
// import './index.css'; -> keep this import if it exists 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import NavbarComponent from './components/Navbar';
import Footer from './components/footer';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRouteGuard from './components/AdminRouteGuard';
import AdminChat from './components/AdminChat';
import UserChat from './components/UserChat';
import Chat from './components/Chat';

// Import Home component directly to avoid circular dependency
import HomeComponent from './App.home.jsx';

// Lazy load pages for better performance
const Material = lazy(() => import('./pages/material'));
const AllJobs = lazy(() => import('./pages/all-jobs'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const InteriorDesign = lazy(() => import('./pages/interior-design'));
const ArchitectureDesign = lazy(() => import('./pages/architecture-design'));
const Rent = lazy(() => import('./pages/rent'));
const SellerDashboard = lazy(() => import('./pages/seller-dashboard'));
const StructuralMaterials = lazy(() => import('./pages/structural-materials'));
const SafetyMaterials = lazy(() => import('./pages/safety-materials'));
const PlumbingMaterials = lazy(() => import('./pages/plumbing-materials'));
const FinishingMaterials = lazy(() => import('./pages/finishing-materials'));
const Job = lazy(() => import('./pages/job'));
const HouseRenovation = lazy(() => import('./pages/house-renovation'));
const AdminDashboard = lazy(() => import('./pages/admin-dashboard'));
const Traditional = lazy(() => import('./pages/traditional'));
const Sophisticated = lazy(() => import('./pages/sophisticated'));
const Relaxed = lazy(() => import('./pages/relaxed'));
const HistoricFormal = lazy(() => import('./pages/historic-formal'));
const Farmhouse = lazy(() => import('./pages/farmhouse'));
const Casual = lazy(() => import('./pages/casual'));
const Electrical = lazy(() => import('./pages/electrical'));
const Hardware = lazy(() => import('./pages/hardware'));
const Success = lazy(() => import('./pages/success'));
const Cancel = lazy(() => import('./pages/cancel'));

// New pages
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/Register'));
const SellerRegister = lazy(() => import('./pages/seller-register'));
const Consultant = lazy(() => import('./pages/consultant'));
const Cart = lazy(() => import('./pages/cart'));
const Checkout = lazy(() => import('./pages/checkout'));
const UserProfile = lazy(() => import('./pages/profile'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const SimpleChatPage = lazy(() => import('./pages/SimpleChatPage'));
const SupportChatPage = lazy(() => import('./pages/SupportChatPage'));
const AdminChatPage = lazy(() => import('./pages/AdminChatPage'));
const AddProduct = lazy(() => import('./pages/AddProduct'));

// Admin Dashboard Components
const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));
const ProductsManagement = lazy(() => import('./pages/admin/ProductsManagement'));
const WorkersManagement = lazy(() => import('./pages/admin/WorkersManagement'));
const VehiclesManagement = lazy(() => import('./pages/admin/VehiclesManagement'));
const OrdersManagement = lazy(() => import('./pages/admin/OrdersManagement'));
const AnalyticsPanel = lazy(() => import('./pages/admin/AnalyticsPanel'));
const SettingsPanel = lazy(() => import('./pages/admin/SettingsPanel'));
const InquiriesManagement = lazy(() => import('./pages/admin/InquiriesManagement'));
const JobsManagement = lazy(() => import('./pages/admin/JobsManagement'));
const SellersManagement = lazy(() => import('./pages/admin/SellersManagement'));
const InteriorDesignsManagement = lazy(() => import('./pages/admin/InteriorDesignsManagement'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Import global styles
import "./assets/css/global.css";

// Create a separate component for the routes to use useAuth
const AppRoutes = () => {
  const { userType } = useAuth();

  return (
              <Routes>
                <Route path="/" element={<HomeComponent />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/seller-register" element={<SellerRegister />} />
                <Route path="/profile" element={<UserProfile />} />
                
                {/* Chat Routes */}
      {userType === 'admin' ? (
        <Route path="/chat" element={<AdminChat />} />
      ) : (
        <Route path="/chat" element={<UserChat />} />
      )}
                
                {/* Product Routes */}
                <Route path="/material" element={<Material />} />
                <Route path="/structural-materials" element={<StructuralMaterials />} />
                <Route path="/safety-materials" element={<SafetyMaterials />} />
                <Route path="/plumbing-materials" element={<PlumbingMaterials />} />
                <Route path="/finishing-materials" element={<FinishingMaterials />} />
                <Route path="/electrical" element={<Electrical />} />
                <Route path="/hardware" element={<Hardware />} />
                <Route path="/add-product" element={<AddProduct />} />
                
                {/* Job Routes */}
                <Route path="/all-jobs" element={<AllJobs />} />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route path="/jobs" element={<Job />} />
                
                {/* Design Routes */}
                <Route path="/interior-design" element={<InteriorDesign />} />
                <Route path="/architecture-design" element={<ArchitectureDesign />} />
                <Route path="/house-renovation" element={<HouseRenovation />} />
                <Route path="/traditional" element={<Traditional />} />
                <Route path="/sophisticated" element={<Sophisticated />} />
                <Route path="/relaxed" element={<Relaxed />} />
                <Route path="/historic-formal" element={<HistoricFormal />} />
                <Route path="/farmhouse" element={<Farmhouse />} />
                <Route path="/casual" element={<Casual />} />
                
                {/* Rental Routes */}
                <Route path="/rent" element={<Rent />} />
                
                {/* Consultant Routes */}
                <Route path="/consultant" element={<Consultant />} />
                
                {/* Shopping Routes */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
                
                {/* Dashboard Routes */}
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
                
      {/* Admin Dashboard - automatically accessible */}
      <Route path="/admin" element={<AdminRouteGuard />}>
        <Route element={<AdminDashboard />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="products" element={<ProductsManagement />} />
                    <Route path="workers" element={<WorkersManagement />} />
                    <Route path="vehicles" element={<VehiclesManagement />} />
                    <Route path="orders" element={<OrdersManagement />} />
                    <Route path="inquiries" element={<InquiriesManagement />} />
                    <Route path="jobs" element={<JobsManagement />} />
                    <Route path="sellers" element={<SellersManagement />} />
                    <Route path="interior-designs" element={<InteriorDesignsManagement />} />
                    <Route path="analytics" element={<AnalyticsPanel />} />
                    <Route path="settings" element={<SettingsPanel />} />
          <Route path="chat" element={<AdminChat />} />
                  </Route>
                </Route>
                
                {/* Fallback route for 404 */}
                <Route path="*" element={<div className="container-custom py-20 text-center"><h1 className="text-3xl font-bold mb-4">Page Not Found</h1><p>The page you're looking for doesn't exist.</p></div>} />
              </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <NavbarComponent />
          <main className="min-h-screen pt-16">
            <Suspense fallback={<LoadingSpinner />}>
              <AppRoutes />
            </Suspense>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </Router>
        </CartProvider>
      </AuthProvider>
  );
};

export default App; 
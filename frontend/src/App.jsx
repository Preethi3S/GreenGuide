import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { NotFound } from "./components/common/NotFound";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectRoute from "./components/ProtectRoute";
import Sidebar from "./components/Sidebar";

// Auth
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

// User Features
import Profile from "./features/userProfile/Profile";
import UserDashboard from "./features/userProfile/UserDashboard";

import AddGrowthLog from "./features/growthTracker/AddGrowthLog";
import GrowthLogPlantPicker from "./features/growthTracker/GrowthLogPlantPicker";
import { default as GrowthLogs, default as GrowthTracker } from "./features/growthTracker/GrowthLogs";

import DiseaseDetector from "./features/diseaseDetector/DiseaseDetect";
import Notifications from "./features/notifications/NotificationList";

import CreateReminder from "./features/reminders/CreateReminder";
import Reminders from "./features/reminders/ReminderList";

import AddWaterLog from "./features/waterTracker/AddWaterLog";
import EditWaterLogForm from "./features/waterTracker/EditWaterLogForm";
import WaterLogs from "./features/waterTracker/WaterLogs";

import AddPlant from "./features/plants/AddPlant";
import EditPlant from "./features/plants/EditPlant";
import MyPlants from "./features/plants/MyPlants";

import Community from "./features/community/CommunityFeed";

// Admin Features
import AdminDashboard from "./features/admin/AdminDashboard";
import Analytics from "./features/admin/Analytics.jsx";
import ManageUsers from "./features/admin/UserList";

// Encyclopedia
import AddEncyclopediaPlant from "./features/encyclopedia/AddEncyclopediaPlant";
import EditEncyclopediaPlant from "./features/encyclopedia/EditEncyclopediaPlant";
import EncyclopediaDetail from "./features/encyclopedia/EncyclopediaDetail";
import EncyclopediaList from "./features/encyclopedia/EncyclopediaList";

import AdminMessagePanel from "./features/messages/AdminMessagePanel";
import MessageForm from "./features/messages/MessageForm";
import AdminPanel from "./features/shop/AdminPanel";
import Cart from "./features/shop/Cart";
import Checkout from "./features/shop/Checkout";
import MyOrders from "./features/shop/MyOrders";
import OrderSuccess from "./features/shop/OrderSuccess";
import Shop from "./features/shop/Shop";

import { loadAuthFromStorage } from "./features/auth/authSlice.js";
import UserMessagePanel from "./features/messages/UserMessagePanel";

import About from "./components/About.jsx";
import BackgroundAnimations from "./components/common/BackgroundAnimations.jsx";
import Contact from "./components/Contact.jsx";
import ChatWrapper from "./features/chatbot/ChatWrapper.jsx";
import GardenPlanner from "./features/garden/GardenPlanner.jsx";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Redirect root to dashboard
  useEffect(() => {
    if (isLandingPage) {
      navigate('/dashboard');
    }
  }, [isLandingPage, navigate]);

  return (
    <div className="h-screen flex flex-col bg-light-bg text-dark-text overflow-hidden relative">
      <BackgroundAnimations />
      {/* Fixed Header */}
      <div className="flex-none z-50">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="flex-none z-40 h-full">
           <Sidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 pb-20 scroll-smooth">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* User Dashboard */}
              <Route
                path="/dashboard"
                element={
                <ProtectRoute>
                  <UserDashboard />
                </ProtectRoute>
              }
            />

            <Route path="/shop" element={<ProtectRoute><Shop /></ProtectRoute>} />
            <Route path="/cart" element={<ProtectRoute><Cart /></ProtectRoute>} />
            <Route path="/checkout" element={<ProtectRoute><Checkout /></ProtectRoute>} />
            <Route path="/order-success" element={<ProtectRoute><OrderSuccess /></ProtectRoute>} />
            <Route path="/orders" element={<ProtectRoute><MyOrders /></ProtectRoute>} />
            <Route path="/admin/shop" element={<ProtectRoute adminOnly={true}><AdminPanel /></ProtectRoute>} />

            <Route path="/plants" element={<ProtectRoute><MyPlants /></ProtectRoute>} />
            <Route path="/plants/new" element={<ProtectRoute><AddPlant /></ProtectRoute>} />
            <Route path="/plants/:id" element={<ProtectRoute><EditPlant /></ProtectRoute>} />

            <Route path="/growth/:plantId/logs" element={<ProtectRoute><GrowthTracker /></ProtectRoute>} />
            <Route path="/growth" element={<ProtectRoute><GrowthLogs /></ProtectRoute>} />
            <Route path="/growth/:plantId/logs/add" element={<ProtectRoute><AddGrowthLog /></ProtectRoute>} />
            <Route path="/growth/:plantId/logs/edit/:logId" element={<ProtectRoute><AddGrowthLog /></ProtectRoute>} />
            <Route path="/growth/add" element={<ProtectRoute><GrowthLogPlantPicker /></ProtectRoute>} />

            <Route path="/community" element={<ProtectRoute><Community /></ProtectRoute>} />
            <Route path="/reminders" element={<ProtectRoute><Reminders /></ProtectRoute>} />
            <Route path="/reminders/create" element={<ProtectRoute><CreateReminder /></ProtectRoute>} />
            <Route path="/notifications" element={<ProtectRoute><Notifications /></ProtectRoute>} />
            <Route path="/disease-detector" element={<ProtectRoute><DiseaseDetector /></ProtectRoute>} />

            <Route path="/water" element={<ProtectRoute><WaterLogs /></ProtectRoute>} />
            <Route path="/water/add" element={<ProtectRoute><AddWaterLog /></ProtectRoute>} />
            <Route path="/water/:id" element={<ProtectRoute><EditWaterLogForm /></ProtectRoute>} />
            {/* Encyclopedia */}
            <Route path="/encyclopedia" element={<EncyclopediaList />} />
            <Route path="/encyclopedia/:id" element={<EncyclopediaDetail />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectRoute adminOnly={true}><AdminDashboard /></ProtectRoute>} />
            <Route path="/admin/users" element={<ProtectRoute adminOnly={true}><ManageUsers /></ProtectRoute>} />
            <Route path="/admin/encyclopedia/new" element={<ProtectRoute adminOnly={true}><AddEncyclopediaPlant /></ProtectRoute>} />
            <Route path="/admin/encyclopedia/:id/edit" element={<ProtectRoute adminOnly={true}><EditEncyclopediaPlant /></ProtectRoute>} />
            <Route path="/admin/analytics" element={<ProtectRoute adminOnly={true}><Analytics /></ProtectRoute>} />
            {/* ChatGPT Bot */}
            <Route path="/garden" element={<ProtectRoute><GardenPlanner /></ProtectRoute>} />

              <Route
  path="/profile"
  element={
    <ProtectRoute>
      <Profile />
    </ProtectRoute>
  }
/>

             <Route
    path="/messages"
    element={
      <ProtectRoute>
        <MessageForm />
      </ProtectRoute>
    }
  />

  <Route path="/my-messages" element={<ProtectRoute><UserMessagePanel /></ProtectRoute>} />


  {/* Admin message view */}
  <Route
    path="/admin/messages"
    element={
      <ProtectRoute adminOnly={true}>
        <AdminMessagePanel />
      </ProtectRoute>
    }
  />
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </main>
      </div>

      {/* Fixed Footer */}
      <div className="flex-none z-50">
        <Footer />
      </div>

      <ToastContainer position="bottom-right" />

      {/* Floating ChatBot Button */}
      <ChatWrapper />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

const RoleBasedRedirect = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/dashboard" />;
};

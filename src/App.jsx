import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { PageTransition } from "./components/ui/PageTransition";
import { AuthProvider } from "./context/AuthContext";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/Home/HomePage";
import PricingPage from "./pages/Home/Pricing";
import VenuesPage from "./pages/Home/Venues";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EventsPage from "./pages/Events/EventsPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import GuestsPage from "./pages/Dashboard/GuestsPage";
import ExpensesPage from "./pages/Dashboard/ExpensesPage";
import WeddingGiftPage from "./pages/Dashboard/WeddingGiftPage";
import TemplatePage from "./features/Template/TemplatePage"; // Path តាម Folder structure របស់បង
import AddTemplatePage from "./pages/Dashboard/AddTemplatePage";

/* ── បញ្ជី Path ដែលត្រូវលាក់ Header & Footer (សម្រាប់តែទំព័រ Dashboard ផ្ទៃក្នុង) ── */
const HIDDEN_LAYOUT_PATHS = [
  "/login", 
  "/register", 
  "/forgot-password", 
  "/events",
  "/dashboard", 
  "/guests", 
  "/expenses", 
  "/gifts", 
  "/add-template"
  // "/templates" ត្រូវបានដកចេញពីទីនេះ ដើម្បីកុំឱ្យមាន Sidebar
];

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // ឆែកមើលថា តើ Path បច្ចុប្បន្នស្ថិតក្នុងបញ្ជីដែលត្រូវលាក់ Header ឬទេ
  const isDashboardOrAuth = HIDDEN_LAYOUT_PATHS.some(p => location.pathname.startsWith(p));

  return (
    <>
      {/* បង្ហាញ Header តែលើទំព័រណាដែលមិនមែនជា Dashboard/Auth */}
      {!isDashboardOrAuth && <Header />}

      <main className={!isDashboardOrAuth ? "main-content-layout" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Pages (ជាមួយ Header/Footer) */}
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
            <Route path="/venues" element={<PageTransition><VenuesPage /></PageTransition>} />
            <Route path="/templates" element={<PageTransition><TemplatePage /></PageTransition>} />
            
            {/* Auth Pages */}
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
            
            {/* Dashboard Routes (ប្រើ Sidebar ផ្ទាល់ខ្លួន មិនប្រើ Header រួម) */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/guests" element={<GuestsPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/gifts" element={<WeddingGiftPage />} />
            <Route path="/add-template" element={<AddTemplatePage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* បង្ហាញ Footer តែលើទំព័រណាដែលមិនមែនជា Dashboard/Auth */}
      {!isDashboardOrAuth && <Footer />}

      <style>{`
        /* រុញ Content ចុះក្រោមដើម្បីកុំឱ្យ Header Fixed បាំង */
        .main-content-layout {
          padding-top: 85px; 
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

function App() {
  useLenis(); // សម្រាប់ Smooth Scrolling

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <AnimatedRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
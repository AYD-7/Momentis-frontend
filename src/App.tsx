import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home/HomePage';
import EventsPage from './pages/Events/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import TicketLookupPage from './pages/TicketLookupPage';
import ValidatePage from './pages/ValidatePage';
import AboutPage from './pages/About/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/layout/ScrollToTop';

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<HomePage />} />
        <Route path="/events"        element={<EventsPage />} />
        <Route path="/events/:id"    element={<EventDetailPage />} />
        <Route path="/ticket-lookup" element={<TicketLookupPage />} />
        <Route path="/validate"      element={<ValidatePage />} />
        <Route path="/about"         element={<AboutPage />} />
        <Route path="*"              element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main><AppRoutes /></main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--ink)',
          },
          success: { iconTheme: { primary: '#4f46e5', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  );
}

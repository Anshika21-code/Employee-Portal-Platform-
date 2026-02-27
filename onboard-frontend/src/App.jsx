import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home";

function AppContent() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    // <Routes>
    //   {/* Public */}
    //   <Route path="/" element={<Home/>}/>
    //   <Route path="/login/*" element={<Login />} />

    //   {/* Root Redirect */}
    //   <Route
    //     path="/"
    //     element={
    //       isSignedIn
    //         ? <Navigate to="/dashboard" replace />
    //         : <Navigate to="/login" replace />
    //     }
    //   />

    //   {/* Protected */}
    //   <Route
    //     element={
    //       isSignedIn
    //         ? <DashboardLayout />
    //         : <Navigate to="/login" replace />
    //     }
    //   >
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/employees" element={<Employees />} />
    //     <Route path="/settings" element={<Settings />} />
    //   </Route>

    //   {/* Catch-all */}
    //   <Route
    //     path="*"
    //     element={
    //       isSignedIn
    //         ? <Navigate to="/dashboard" replace />
    //         : <Navigate to="/login" replace />
    //     }
    //   />
    // </Routes>
    <Routes>
  {/* PUBLIC ROUTES */}
  <Route path="/" element={<Home />} />
  <Route path="/login/*" element={<Login />} />

  {/* PROTECTED ROUTES */}
  <Route
    element={
      isSignedIn
        ? <DashboardLayout />
        : <Navigate to="/login" replace />
    }
  >
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/employees" element={<Employees />} />
    <Route path="/settings" element={<Settings />} />
  </Route>

  {/* Catch-all */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0b1220] dark:to-[#0a0f1c]">
      <AppContent />
    </div>
  );
}
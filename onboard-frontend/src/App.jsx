// import { Routes, Route, Navigate } from "react-router-dom"
// import { useUser } from "@clerk/clerk-react"
// import { ThemeProvider } from "./context/ThemeContext";

// import Login from "./pages/Login"
// import Dashboard from "./pages/Dashboard"
// import Employees from "./pages/Employees"
// import Settings from "./pages/Settings"
// import DashboardLayout from "./components/layout/DashboardLayout"

// function AppContent() {
//   const { isSignedIn, isLoaded } = useUser()

//   // Show nothing while Clerk is loading
//   if (!isLoaded) return (
//     <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
//       <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//     </div>
//   )

//   return (
//     <ThemeProvider>
//     <Routes>
//       {/* Public route */}
//       <Route path="/login/*" element={<Login />} />

//       {/* Root redirect */}
//       <Route
//         path="/"
//         element={
//           isSignedIn
//             ? <Navigate to="/dashboard" replace />
//             : <Navigate to="/login" replace />
//         }
//       />

//       {/* Protected routes — all wrapped in DashboardLayout (sidebar lives here) */}
//       <Route
//         element={
//           isSignedIn
//             ? <DashboardLayout />
//             : <Navigate to="/login" replace />
//         }
//       >
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route path="/settings" element={<Settings />} />
//       </Route>

//       {/* Catch-all */}
//       <Route
//         path="*"
//         element={
//           isSignedIn
//             ? <Navigate to="/dashboard" replace />
//             : <Navigate to="/login" replace />
//         }
//       />
//     </Routes>
//     </ThemeProvider>
//   )
// }

// export default function App() {
//   return <AppContent />
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";

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
    <Routes>
      {/* Public */}
      <Route path="/login/*" element={<Login />} />

      {/* Root Redirect */}
      <Route
        path="/"
        element={
          isSignedIn
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Protected */}
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
      <Route
        path="*"
        element={
          isSignedIn
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />
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
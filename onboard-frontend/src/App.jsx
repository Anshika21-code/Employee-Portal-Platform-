// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import { useUser, useClerk } from "@clerk/clerk-react";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import EmployeeDetail from "./pages/EmployeeDetail";
// import Admin from "./pages/Admin";
// import Header from "./components/layout/Header";

// function AppContent() {
//   const { user, isSignedIn, isLoaded } = useUser();
//   const { signOut } = useClerk();

//   if (!isLoaded) return null;

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {isSignedIn && (
//         <nav className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16">

//               <div className="flex space-x-8">
//                 <Link to="/dashboard" className="inline-flex items-center px-1 pt-1">
//                   <img
//                     src="/assets/logo.png"
//                     alt="OnboardAI Logo"
//                     className="h-8 w-auto"
//                   />
//                 </Link>

//                 <Link
//                   to="/dashboard"
//                   className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900"
//                 >
//                   Dashboard
//                 </Link>

//                 {user?.publicMetadata?.role === "admin" && (
//                   <Link
//                     to="/admin"
//                     className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900"
//                   >
//                     Admin Panel
//                   </Link>
//                 )}
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="text-sm">
//                   <p className="font-medium text-gray-900">
//                     {user?.fullName || user?.primaryEmailAddress?.emailAddress}
//                   </p>
//                   <p className="text-gray-500 text-xs">
//                     {user?.publicMetadata?.role || "Employee"}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => signOut({ redirectUrl: "/login" })}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>

//             </div>
//           </div>
//         </nav>
//       )}

//       <Routes>

//         <Route path="/login/*" element={<Login />} />

//         <Route
//           path="/"
//           element={
//             isSignedIn
//               ? <Navigate to="/dashboard" replace />
//               : <Navigate to="/login" replace />
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             isSignedIn
//               ? <Dashboard />
//               : <Navigate to="/login" replace />
//           }
//         />

//         <Route
//           path="/employee/:id"
//           element={
//             isSignedIn
//               ? <EmployeeDetail />
//               : <Navigate to="/login" replace />
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             isSignedIn
//               ? <Admin />
//               : <Navigate to="/login" replace />
//           }
//         />

//         <Route
//           path="*"
//           element={
//             isSignedIn
//               ? <Navigate to="/dashboard" replace />
//               : <Navigate to="/login" replace />
//           }
//         />

//       </Routes>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDetail from "./pages/EmployeeDetail";
import Admin from "./pages/Admin";
import Header from "./components/layout/Header";

function AppContent() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Global Header (shows on ALL pages) */}
      

      {/* Page Content */}
      <div className="flex-1">
        <Routes>

          <Route path="/login/*" element={<Login />} />

          <Route
            path="/"
            element={
              isSignedIn
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/dashboard"
            element={
              isSignedIn
                ? <Dashboard />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/employee/:id"
            element={
              isSignedIn
                ? <EmployeeDetail />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/admin"
            element={
              isSignedIn
                ? <Admin />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="*"
            element={
              isSignedIn
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            }
          />

        </Routes>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
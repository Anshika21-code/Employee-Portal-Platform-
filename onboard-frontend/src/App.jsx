// import { Routes, Route } from "react-router-dom"
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"
// import DashboardLayout from "./components/layout/DashboardLayout"
// import Dashboard from "./pages/Dashboard"
// import Employees from "./pages/Employees"
// import Settings from "./pages/Settings"

// function App() {
//   return (
//     <>
//       <SignedIn>
//         <Routes>
//           <Route element={<DashboardLayout />}>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/employees" element={<Employees />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>
//         </Routes>
//       </SignedIn>

//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>
//     </>
//   )
// }

// export default App

// import { Routes, Route, Navigate } from "react-router-dom"
// import { useUser } from "@clerk/clerk-react"

// import Login from "./pages/Login"
// import Dashboard from "./pages/Dashboard"
// import Employees from "./pages/Employees"
// import Settings from "./pages/Settings"
 

// function AppContent() {
//   const { isSignedIn, isLoaded } = useUser()

//   if (!isLoaded) return null

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">

       

//       <div className="flex-1">
//         <Routes>

//           <Route path="/login/*" element={<Login />} />

//           <Route
//             path="/"
//             element={
//               isSignedIn
//                 ? <Navigate to="/dashboard" replace />
//                 : <Navigate to="/login" replace />
//             }
//           />

//           <Route
//             path="/dashboard"
//             element={
//               isSignedIn
//                 ? <Dashboard />
//                 : <Navigate to="/login" replace />
//             }
//           />

//           <Route
//             path="/employee/:id"
//             element={
//               isSignedIn
//                 ? <Employees />
//                 : <Navigate to="/login" replace />
//             }
//           />

//           <Route
//             path="/settings"
//             element={
//               isSignedIn
//                 ? <Settings />
//                 : <Navigate to="/login" replace />
//             }
//           />

//           <Route
//             path="*"
//             element={
//               isSignedIn
//                 ? <Navigate to="/dashboard" replace />
//                 : <Navigate to="/login" replace />
//             }
//           />

//         </Routes>
//       </div>
//     </div>
//   )
// }

// export default function App() {
//   return <AppContent />
// }


import { Routes, Route, Navigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Employees from "./pages/Employees"
import Settings from "./pages/Settings"
import DashboardLayout from "./components/layout/DashboardLayout"

function AppContent() {
  const { isSignedIn, isLoaded } = useUser()

  // Show nothing while Clerk is loading
  if (!isLoaded) return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login/*" element={<Login />} />

      {/* Root redirect */}
      <Route
        path="/"
        element={
          isSignedIn
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Protected routes — all wrapped in DashboardLayout (sidebar lives here) */}
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
  )
}

export default function App() {
  return <AppContent />
}
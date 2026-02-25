import { Routes, Route } from "react-router-dom"
import DashboardLayout from "./components/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Employees from "./pages/Employees"
import Settings from "./pages/Settings"

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
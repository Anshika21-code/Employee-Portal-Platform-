// import {
//     Sidebar,
//     SidebarContent,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuItem,
//     SidebarMenuButton,
//   } from "@/components/ui/sidebar"
  
//   import { Badge } from "@/components/ui/badge"
  
//   export function AppSidebar() {
//     return (
//       <Sidebar collapsible="icon">
//         <SidebarHeader className="p-4">
//           <h2 className="text-lg font-bold">OnboardAI</h2>
//           <Badge className="mt-2">HR Dashboard</Badge>
//         </SidebarHeader>
  
//         <SidebarContent>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton>Dashboard</SidebarMenuButton>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <SidebarMenuButton>Employees</SidebarMenuButton>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <SidebarMenuButton>AI Assistant</SidebarMenuButton>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <SidebarMenuButton>Settings</SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarContent>
//       </Sidebar>
//     )
//   }

// import { NavLink, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Bot,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
// } from "lucide-react";
// import { useState } from "react";
 

// const navItems = [
//   { label: "Dashboard", path: "/", icon: LayoutDashboard },
//   { label: "Employees", path: "/employees", icon: Users },
//   { label: "AI Assistant", path: "/ai-assistant", icon: Bot },
//   { label: "Settings", path: "/settings", icon: Settings },
// ];

// export default function AppSidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   return (
//     <aside
//       className={`relative flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out ${
//         collapsed ? "w-[70px]" : "w-[230px]"
//       } min-h-screen flex-shrink-0`}
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800">
//         <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
//           <Zap size={16} className="text-white" />
//         </div>
//         {!collapsed && (
//           <span className="font-bold text-lg tracking-tight whitespace-nowrap">
//             OnboardAI
//           </span>
//         )}
//       </div>
       

//       {/* Role Badge */}
//       {!collapsed && (
//         <div className="mx-4 mt-4 mb-2">
//           <span className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full">
//             HR Dashboard
//           </span>
//         </div>
//       )}

//       {/* Nav */}
//       <nav className="flex-1 px-3 py-4 space-y-1">
//         {navItems.map(({ label, path, icon: Icon }) => {
//           const isActive =
//             path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
//           return (
//             <NavLink
//               key={label}
//               to={path}
//               className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
//                 isActive
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`}
//               title={collapsed ? label : ""}
//             >
//               <Icon size={18} className="flex-shrink-0" />
//               {!collapsed && <span className="whitespace-nowrap">{label}</span>}
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* Collapse Toggle */}
//       <button
//         onClick={() => setCollapsed(!collapsed)}
//         className="absolute -right-3 top-8 w-6 h-6 bg-gray-700 hover:bg-indigo-600 border border-gray-600 rounded-full flex items-center justify-center text-white transition-colors shadow-md"
//       >
//         {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
//       </button>

//       {/* Footer */}
//       <div className="px-4 py-4 border-t border-gray-800">
//         {collapsed ? (
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold mx-auto">
//             HR
//           </div>
//         ) : (
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
//               HR
//             </div>
//             <div className="min-w-0">
//               <p className="text-sm font-semibold text-white truncate">HR Admin</p>
//               <p className="text-xs text-gray-500 truncate">admin@company.com</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

import { NavLink, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  Users,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Employees", path: "/employees", icon: Users },
  { label: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.emailAddresses?.[0]?.emailAddress || "HR Admin";

  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const initials = displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <aside
      className={`relative flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-[70px]" : "w-[230px]"
      } min-h-screen flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight whitespace-nowrap">
            OnboardAI
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="mx-4 mt-4 mb-2">
          <span className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full">
            HR Dashboard
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={label}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              title={collapsed ? label : ""}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-gray-700 hover:bg-indigo-600 border border-gray-600 rounded-full flex items-center justify-center text-white transition-colors shadow-md"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Footer: User + Sign Out */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-2">
        <div className={`flex items-center gap-3 px-2 ${collapsed ? "justify-center" : ""}`}>
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {initials}
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{displayName}</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
          )}
        </div>

        {/* Sign Out */}
        <button
          onClick={() => signOut({ redirectUrl: "/login" })}
          title={collapsed ? "Sign Out" : ""}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
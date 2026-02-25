// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "./AppSidebar"

// export function DashboardLayout({ children }) {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full bg-muted/40">
//         <AppSidebar />
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </SidebarProvider>
//   )
// }
// import {
//     SidebarProvider,
//     SidebarInset,
//     SidebarTrigger,
//   } from "@/components/ui/sidebar"
  
//   import { AppSidebar } from "@/components/layout/AppSidebar"
  
//   export function DashboardLayout({ children }) {
//     return (
//       <SidebarProvider>
//         <AppSidebar />
  
//         <SidebarInset>
//           <div className="p-6">
//             <SidebarTrigger className="mb-4" />
//             {children}
//           </div>
//         </SidebarInset>
//       </SidebarProvider>
//     )
//   }

import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5f6fa]">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
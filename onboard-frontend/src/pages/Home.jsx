// export default function Home() {
//     return (
//       <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold">Welcome to OnboardAI</h1>
//           <p className="text-muted-foreground">
//             AI-powered employee onboarding management system.
//           </p>
//           <a
//             href="/login"
//             className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl"
//           >
//             HR Login
//           </a>
//         </div>
//       </div>
//     );
//   }

import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Home() {

    const { isSignedIn } = useUser();

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 text-gray-900">
  
        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-10 py-6">
          <h1 className="text-2xl font-bold text-indigo-600">OnboardAI</h1>
          <div className="space-x-6 text-sm font-medium">
            <Link to={isSignedIn ? "/dashboard" : "/login"}>
                Dashboard
            </Link>
            <Link to={isSignedIn ? "/employees" : "/login"}>
                 Employees
            </Link>
            <a href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Login
            </a>
          </div>
        </nav>
  
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
  
          {/* LEFT TEXT */}
          <div className="max-w-xl space-y-6">
            <h2 className="text-5xl font-extrabold leading-tight">
              The Art of <span className="text-indigo-600">Hiring Employees</span>
            </h2>
  
            <p className="text-gray-600 text-lg">
              Track onboarding progress, detect delays early, and empower HR with AI-driven insights.
            </p>
  
            <div className="flex gap-4">
              <a
                href="/login"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition"
              >
                Get Started
              </a>
  
              <button className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>
  
          {/* RIGHT IMAGE */}
          <div className="mt-10 md:mt-0">
            <img
              src="/hero.jfif"
              alt="Onboarding Illustration"
              className="w-[500px]"
            />
          </div>
  
        </section>
      </div>
    );
  }
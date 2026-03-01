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

// import { useUser } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";

// export default function Home() {

//     const { isSignedIn } = useUser();

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 text-gray-900">
  
//         {/* NAVBAR */}
//         <nav className="flex justify-between items-center px-10 py-6">
//           <h1 className="text-2xl font-bold text-indigo-600">OnboardAI</h1>
//           <div className="space-x-6 text-sm font-medium">
//             <Link to={isSignedIn ? "/dashboard" : "/login"}>
//                 Dashboard
//             </Link>
//             <Link to={isSignedIn ? "/employees" : "/login"}>
//                  Employees
//             </Link>
//             <a href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
//               Login
//             </a>
//           </div>
//         </nav>
  
//         {/* HERO SECTION */}
//         <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
  
//           {/* LEFT TEXT */}
//           <div className="max-w-xl space-y-6">
//             <h2 className="text-5xl font-extrabold leading-tight">
//               The Art of <span className="text-indigo-600">Hiring Employees</span>
//             </h2>
  
//             <p className="text-gray-600 text-lg">
//               Track onboarding progress, detect delays early, and empower HR with AI-driven insights.
//             </p>
  
//             <div className="flex gap-4">
//               <a
//                 href="/login"
//                 className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition"
//               >
//                 Get Started
//               </a>
  
//               <button className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
//                 Learn More
//               </button>
//             </div>
//           </div>
  
//           {/* RIGHT IMAGE */}
//           <div className="mt-10 md:mt-0">
//             <img
//               src="/hero.jfif"
//               alt="Onboarding Illustration"
//               className="w-[500px]"
//             />
//           </div>
          
//         </section>
//       </div>
//     );
//   }

import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { BarChart3, Brain, Bell } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-violet-50 text-gray-900">

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
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
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
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>

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

      {/* FEATURES SECTION — NOW CORRECTLY BELOW HERO */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Powerful Features for Smart Onboarding
          </h2>

          <p className="text-gray-500 mb-12">
            Everything HR teams need to track and improve onboarding.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

  {/* Feature 1 */}
  <div className="p-6 rounded-2xl bg-gray-50 shadow hover:shadow-lg transition text-center">
    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
      <BarChart3 size={22} />
    </div>
    <h3 className="text-lg font-semibold mb-2">
      Real-Time Dashboard
    </h3>
    <p className="text-gray-600 text-sm">
      Track employee progress and onboarding metrics instantly.
    </p>
  </div>

  {/* Feature 2 */}
  <div className="p-6 rounded-2xl bg-gray-50 shadow hover:shadow-lg transition text-center">
    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-xl">
      <Brain size={22} />
    </div>
    <h3 className="text-lg font-semibold mb-2">
      AI Risk Prediction
    </h3>
    <p className="text-gray-600 text-sm">
      Identify at-risk employees early using machine learning insights.
    </p>
  </div>

  {/* Feature 3 */}
  <div className="p-6 rounded-2xl bg-gray-50 shadow hover:shadow-lg transition text-center">
    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-amber-100 text-amber-600 rounded-xl">
      <Bell size={22} />
    </div>
    <h3 className="text-lg font-semibold mb-2">
      Smart Alerts
    </h3>
    <p className="text-gray-600 text-sm">
      Automated notifications reduce manual follow-ups.
    </p>
  </div>

</div>

            
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-xl font-bold text-indigo-600 mb-3">
              OnboardAI
            </h3>
            <p className="text-gray-600 text-sm">
              AI-powered onboarding system that helps HR teams track progress and detect risks early.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Dashboard</li>
              <li>Employees</li>
              <li>Login</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-600">
              Built by Anshika Tank 
            </p>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} OnboardAI
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
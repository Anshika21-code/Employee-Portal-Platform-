// import { Settings as SettingsIcon, Bell, Moon, FileText, Mail, Shield } from "lucide-react";

// const { darkMode, setDarkMode, compactView, setCompactView } = useTheme();

// const sections = [
//   {
//     title: "Notifications",
//     icon: Bell,
//     description: "Configure AI nudges and email reminders",
//     options: [
//       { label: "Email reminders for delayed employees", enabled: true },
//       { label: "AI nudge alerts", enabled: true },
//       { label: "Weekly progress summary", enabled: false },
//     ],
//   },
//   {
//     title: "Appearance",
//     icon: Moon,
//     description: "UI preferences",
//     options: [
//       { label: "Dark mode", enabled: false },
//       { label: "Compact view", enabled: false },
//     ],
//   },
//   {
//     title: "Reports",
//     icon: FileText,
//     description: "Export and reporting options",
//     options: [
//       { label: "Auto-generate weekly PDF report", enabled: true },
//       { label: "Include ML predictions in report", enabled: false },
//     ],
//   },
// ];

// export default function Settings() {
//   return (
//     <div className="min-h-screen bg-[#f5f6fa] p-6 font-sans">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
//         <p className="text-gray-500 mt-1 text-sm">Manage your OnboardAI preferences</p>
//       </div>

//       <div className="max-w-2xl space-y-5">
//         {sections.map((section) => {
//           const Icon = section.icon;
//           return (
//             <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <div className="flex items-center gap-3 mb-1">
//                 <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
//                   <Icon size={16} className="text-indigo-600" />
//                 </div>
//                 <h2 className="font-semibold text-gray-800">{section.title}</h2>
//               </div>
//               <p className="text-sm text-gray-400 mb-4 ml-11">{section.description}</p>
//               <div className="space-y-3">
//                 {section.options.map((opt) => (
//                   <div key={opt.label} className="flex items-center justify-between py-2 border-t border-gray-50">
//                     <span className="text-sm text-gray-700">{opt.label}</span>
//                     <button
//                       className={`w-10 h-5 rounded-full relative transition-colors ${opt.enabled ? "bg-indigo-600" : "bg-gray-200"}`}
//                     >
//                       <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${opt.enabled ? "left-5" : "left-0.5"}`} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
//               <Shield size={16} className="text-indigo-600" />
//             </div>
//             <h2 className="font-semibold text-gray-800">Admin Account</h2>
//           </div>
//           <div className="space-y-3">
//             <div>
//               <label className="text-xs text-gray-400 block mb-1">Name</label>
//               <input defaultValue="HR Admin" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
//             </div>
//             <div>
//               <label className="text-xs text-gray-400 block mb-1">Email</label>
//               <input defaultValue="admin@company.com" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
//             </div>
//             <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Settings as SettingsIcon, Bell, Moon, FileText, Shield } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function Settings() {
  // ✅ Get darkMode from global theme
  const { darkMode, setDarkMode } = useTheme();

  // Other toggles (visual only)
  const [emailReminders, setEmailReminders] = useState(true);
  const [aiNudges, setAiNudges] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [autoPDF, setAutoPDF] = useState(true);
  const [mlInReport, setMlInReport] = useState(false);

  const sections = [
    {
      title: "Notifications",
      icon: Bell,
      description: "Configure AI nudges and email reminders",
      options: [
        { label: "Email reminders for delayed employees", enabled: emailReminders, set: setEmailReminders },
        { label: "AI nudge alerts", enabled: aiNudges, set: setAiNudges },
        { label: "Weekly progress summary", enabled: weeklySummary, set: setWeeklySummary },
      ],
    },
    {
      title: "Appearance",
      icon: Moon,
      description: "UI preferences",
      options: [
        // ✅ REAL DARK MODE TOGGLE
        { label: "Dark mode", enabled: darkMode, set: setDarkMode },
      ],
    },
    {
      title: "Reports",
      icon: FileText,
      description: "Export and reporting options",
      options: [
        { label: "Auto-generate weekly PDF report", enabled: autoPDF, set: setAutoPDF },
        { label: "Include ML predictions in report", enabled: mlInReport, set: setMlInReport },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fa] dark:bg-gray-900 p-6 font-sans transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Manage your OnboardAI preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-5">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center">
                  <Icon size={16} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  {section.title}
                </h2>
              </div>

              <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 ml-11">
                {section.description}
              </p>

              <div className="space-y-3">
                {section.options.map((opt) => (
                  <div
                    key={opt.label}
                    className="flex items-center justify-between py-2 border-t border-gray-50 dark:border-gray-700"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {opt.label}
                    </span>

                    {/* Toggle Button */}
                    <button
                      onClick={() => opt.set(!opt.enabled)}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300
                        ${opt.enabled ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-600"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300
                          ${opt.enabled ? "left-5" : "left-0.5"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Admin Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Admin Account
            </h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">
                Name
              </label>
              <input
                defaultValue="HR Admin"
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">
                Email
              </label>
              <input
                defaultValue="admin@company.com"
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
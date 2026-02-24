import { Link } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function Header() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Side */}
          <div className="flex items-center space-x-6">
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="OnboardAI Logo"
                className="h-8 w-auto"
              />
            </Link>

            {isSignedIn && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-black">
                  Dashboard
                </Link>

                {user?.publicMetadata?.role === "admin" && (
                  <Link to="/admin" className="text-gray-600 hover:text-black">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <div className="text-sm text-right">
                  <p className="font-medium">
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.publicMetadata?.role || "Employee"}
                  </p>
                </div>

                <button
                  onClick={() => signOut({ redirectUrl: "/login" })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-black text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
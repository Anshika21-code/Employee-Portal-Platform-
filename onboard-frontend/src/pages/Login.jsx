import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex">

      {/* Left Animation */}
      <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center bg-gray-50">
  <img
    src="/assets/onboarding-animation.gif"
    alt="Onboarding Visual"
    className="max-w-xl w-4/5 h-auto object-contain"
  />
</div>

      {/* Right Side Clerk */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full text-center">

          <SignIn
            routing="path"
            path="/login"
            appearance={{
              elements: {
                card: "shadow-none border border-gray-200 p-6",
                headerTitle: "text-xl",
                headerSubtitle: "text-sm",
                formFieldLabel: "text-sm",
                formFieldInput: "py-2 text-sm",
                formButtonPrimary:
                  "bg-black hover:bg-gray-900 text-white py-2 text-sm",
                footerActionText: "text-xs",
                footerActionLink: "text-xs",
              },
            }}
          />

          <p className="mt-6 text-sm text-gray-600">
            Powered by AI with Secure Authentication
          </p>

        </div>
      </div>

    </div>
  );
}
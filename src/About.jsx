import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function About({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to signup if not logged in
      navigate("/signup");
    }
  }, [user, navigate]);

  if (!user) return null; // or loading spinner while redirecting

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>
        This is the About page. Only visible if logged in. Otherwise, you get redirected to Signup.
      </p>
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>You can contact us here. Only visible if logged in.</p>
    </div>
  );
}

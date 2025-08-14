import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }

    fetch("https://d0455ed5b011.ngrok-free.app/profile", {  // <-- yahan URL change hua
      headers: {
        Authorization: `Bearer ${token}`, // Token header me bhejo
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          setError(true);
          return;
        }
        const data = await res.json();
        setUser(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading profile...</div>;

  if (error) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Hello, {user.name}!</h1>
        <p className="text-gray-700">Welcome to your profile page.</p>
        <p className="text-gray-500 mt-2">Email: {user.email}</p>
      </div>
    </div>
  );
}


import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-slate-400">Page not found.</p>

      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
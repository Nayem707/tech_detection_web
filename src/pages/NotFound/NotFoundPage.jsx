import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl font-bold text-slate-900">404</p>
      <h1 className="mt-4 text-lg font-semibold text-slate-800">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}

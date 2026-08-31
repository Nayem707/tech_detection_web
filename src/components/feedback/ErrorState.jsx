export default function ErrorState({
  title = "We couldn't analyze this website.",
  message,
  action,
}) {
  return (
    <div className="card p-8 text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-600 grid place-items-center text-xl">
        !
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        {message ||
          "The website may be unavailable, blocking automated requests, or taking too long to respond."}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

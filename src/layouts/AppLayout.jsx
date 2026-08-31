import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, History } from "lucide-react";

const linkClasses = ({ isActive }) =>
  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function AppLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white grid place-items-center">
              <BarChart3 className="h-4 w-4" strokeWidth={2} />
            </div>
            <span className="font-semibold tracking-tight">Website Audit</span>
          </NavLink>

          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={linkClasses}>
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" strokeWidth={2} />
                New Audit
              </span>
            </NavLink>
            <NavLink to="/audits" className={linkClasses}>
              <span className="flex items-center gap-2">
                <History className="h-4 w-4" strokeWidth={2} />
                History
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Website Audit Platform</span>
          <span>Phase 1 · HTTP-based analysis</span>
        </div>
      </footer>
    </div>
  );
}

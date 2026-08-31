import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/Home/HomePage";
import AuditPage from "../pages/Audit/AuditPage";
import AuditHistoryPage from "../pages/AuditHistory/AuditHistoryPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/audit/:id", element: <AuditPage /> },
      { path: "/audits", element: <AuditHistoryPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

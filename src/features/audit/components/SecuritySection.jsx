import { ShieldCheck } from "lucide-react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

export default function SecuritySection({ security }) {
  if (!security) return null;
  const {
    https,
    httpToHttpsRedirect,
    headers = [],
    cookies = [],
    mixedContentCount = 0,
  } = security;

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" strokeWidth={2} />
          Security
        </span>
      }
      description="Passive checks against transport, headers, and cookies."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="section-title mb-2">Transport</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">HTTPS</span>
              <Badge tone={https ? "success" : "danger"}>
                {https ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">HTTP → HTTPS redirect</span>
              <Badge tone={httpToHttpsRedirect ? "success" : "warning"}>
                {httpToHttpsRedirect ? "Yes" : "Not verified"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Mixed content resources</span>
              <Badge tone={mixedContentCount === 0 ? "success" : "danger"}>
                {mixedContentCount}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <h4 className="section-title mb-2">Security headers</h4>
          <ul className="space-y-2 text-sm">
            {headers.map((h) => (
              <li key={h.name} className="flex items-center justify-between">
                <span className="text-slate-700 font-mono text-xs">
                  {h.name}
                </span>
                <Badge tone={h.present ? "success" : "warning"}>
                  {h.present ? "Present" : "Missing"}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {cookies.length > 0 && (
        <div className="mt-6">
          <h4 className="section-title mb-2">Cookies</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Secure</th>
                  <th className="py-2 pr-4">HttpOnly</th>
                  <th className="py-2 pr-4">SameSite</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((c) => (
                  <tr key={c.name} className="border-t border-slate-100">
                    <td className="py-2 pr-4 font-mono text-xs">{c.name}</td>
                    <td className="py-2 pr-4">
                      <Badge tone={c.secure ? "success" : "warning"}>
                        {c.secure ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge tone={c.httpOnly ? "success" : "warning"}>
                        {c.httpOnly ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge tone={c.sameSite ? "success" : "warning"}>
                        {c.sameSite || "None"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}

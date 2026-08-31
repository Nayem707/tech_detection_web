import { useState } from "react";
import { Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateAuditMutation } from "../auditApi";
import { beginAudit, resetAudit } from "../auditSlice";
import { isLikelyUrl, normalizeInputUrl } from "../../../utils/url";

const FRIENDLY_ERROR_MESSAGES = {
  UNSAFE_TARGET: "This URL is not permitted. Please provide a public website.",
  VALIDATION_ERROR: "Please check the URL and try again.",
  WEBSITE_FETCH_FAILED:
    "We could not reach that website. It may be unavailable or blocking automated requests.",
  RATE_LIMITED: "Too many requests. Please try again in a moment.",
};

function extractError(err) {
  const data = err?.data;
  const code = data?.error?.code;
  const backendMessage = data?.message;
  const friendly = FRIENDLY_ERROR_MESSAGES[code];
  return (
    friendly || backendMessage || "Something went wrong. Please try again."
  );
}

export default function AuditForm() {
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);
  const [createAudit, { isLoading, error }] = useCreateAuditMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationError =
    touched && !isLikelyUrl(url)
      ? "Enter a valid URL (e.g. https://example.com)"
      : null;

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched(true);
    if (!isLikelyUrl(url)) return;

    const normalized = normalizeInputUrl(url);
    dispatch(beginAudit(normalized));

    try {
      const audit = await createAudit({ url: normalized }).unwrap();
      dispatch(resetAudit());
      navigate(`/audit/${audit.id}`);
    } catch (err) {
      // Error is surfaced by the hook; we intentionally leave the form on-screen.
      dispatch(resetAudit());
      // eslint-disable-next-line no-console
      console.warn("Audit failed:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="url"
        className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
      >
        <Globe className="h-4 w-4" strokeWidth={2} />
        Website URL
      </label>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          id="url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://example.com"
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={isLoading}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? "url-error" : undefined}
        />
        <button
          type="submit"
          className="btn btn-primary md:w-56"
          disabled={isLoading}
        >
          <span className="flex items-center justify-center gap-2">
            <Search className="h-4 w-4" strokeWidth={2} />
            {isLoading ? "Analyzing…" : "Analyze Website"}
          </span>
        </button>
      </div>

      {validationError && (
        <p id="url-error" className="mt-2 text-sm text-rose-600">
          {validationError}
        </p>
      )}
      {error && !validationError && (
        <p role="alert" className="mt-3 text-sm text-rose-600">
          {extractError(error)}
        </p>
      )}

      <p className="mt-3 text-xs text-slate-500">
        HTTP-based passive audit. Private and internal addresses are never
        contacted.
      </p>
    </form>
  );
}

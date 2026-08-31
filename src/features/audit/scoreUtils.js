export function scoreTone(score) {
  if (score == null) return "neutral";
  if (score >= 85) return "success";
  if (score >= 60) return "warning";
  return "danger";
}

export function scoreLabel(score) {
  if (score == null) return "N/A";
  if (score >= 85) return "Good";
  if (score >= 60) return "Needs Work";
  return "Poor";
}

export function scoreColorHex(score) {
  if (score == null) return "#94a3b8";
  if (score >= 85) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

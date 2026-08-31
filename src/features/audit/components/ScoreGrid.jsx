import Card from "../../../components/ui/Card";
import ScoreRing from "./ScoreRing";

const CATEGORIES = [
  { key: "performance", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Accessibility" },
  { key: "security", label: "Security" },
  { key: "technical", label: "Technical" },
];

export default function ScoreGrid({ scores }) {
  return (
    <Card
      title="Scores"
      description="Weighted category scores make up the overall score."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
        {CATEGORIES.map((c) => (
          <ScoreRing key={c.key} score={scores?.[c.key]} label={c.label} />
        ))}
      </div>
    </Card>
  );
}

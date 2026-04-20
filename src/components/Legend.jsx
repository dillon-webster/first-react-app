import { categoryColors } from "../data/elements";

export default function Legend({ activeCategory, onCategoryClick }) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      justifyContent: "center",
      marginBottom: "16px",
    }}>
      {Object.entries(categoryColors).map(([key, val]) => (
        <button
          key={key}
          onClick={() => onCategoryClick(activeCategory === key ? null : key)}
          style={{
            background: activeCategory === key ? val.bg : val.bg + "44",
            color: activeCategory === key ? val.text : val.bg,
            border: `1px solid ${val.bg}`,
            borderRadius: "20px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.15s",
            fontFamily: "inherit",
          }}
        >
          {val.label}
        </button>
      ))}
    </div>
  );
}

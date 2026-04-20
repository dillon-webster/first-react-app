import { categoryColors } from "../data/elements";

export default function ElementCell({ element, isSelected, isHighlighted, onClick }) {
  const color = categoryColors[element.category];
  const dimmed = isHighlighted === false;

  return (
    <button
      onClick={() => onClick(element)}
      title={element.name}
      style={{
        backgroundColor: isSelected ? "#fff" : color.bg,
        color: isSelected ? color.bg : color.text,
        border: isSelected ? `2px solid ${color.bg}` : "2px solid transparent",
        opacity: dimmed ? 0.25 : 1,
        transition: "all 0.15s ease",
        cursor: "pointer",
        borderRadius: "6px",
        width: "100%",
        aspectRatio: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2px",
        fontFamily: "inherit",
        transform: isSelected ? "scale(1.08)" : "scale(1)",
        boxShadow: isSelected ? `0 0 0 2px ${color.bg}, 0 4px 12px rgba(0,0,0,0.3)` : "none",
      }}
    >
      <span style={{ fontSize: "clamp(5px, 1.1vw, 11px)", lineHeight: 1 }}>
        {element.number}
      </span>
      <span style={{ fontSize: "clamp(8px, 1.6vw, 16px)", fontWeight: "700", lineHeight: 1.1 }}>
        {element.symbol}
      </span>
      <span style={{ fontSize: "clamp(4px, 0.75vw, 8px)", lineHeight: 1, opacity: 0.85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
        {element.name}
      </span>
    </button>
  );
}

import { categoryColors } from "../data/elements";

export default function ElementDetail({ element, onClose }) {
  if (!element) return null;
  const color = categoryColors[element.category];

  const stat = (label, value, unit = "") =>
    value != null ? (
      <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ opacity: 0.65, fontSize: "13px" }}>{label}</span>
        <span style={{ fontWeight: "600", fontSize: "13px" }}>{value}{unit}</span>
      </div>
    ) : null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "16px",
    }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#1e1e2e",
          borderRadius: "16px",
          padding: "28px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          border: `2px solid ${color.bg}`,
          color: "#e0e0e0",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "none",
            border: "none",
            color: "#aaa",
            fontSize: "22px",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >×</button>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
          <div style={{
            background: color.bg,
            color: color.text,
            borderRadius: "12px",
            width: "80px",
            height: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "11px" }}>{element.number}</span>
            <span style={{ fontSize: "30px", fontWeight: "800", lineHeight: 1 }}>{element.symbol}</span>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", color: "#fff" }}>{element.name}</h2>
            <span style={{
              display: "inline-block",
              marginTop: "4px",
              padding: "2px 10px",
              borderRadius: "20px",
              background: color.bg + "33",
              color: color.bg,
              fontSize: "12px",
              fontWeight: "600",
            }}>
              {categoryColors[element.category].label}
            </span>
          </div>
        </div>

        <p style={{ fontSize: "13px", opacity: 0.8, lineHeight: 1.6, marginBottom: "16px" }}>
          {element.description}
        </p>

        <div>
          {stat("Atomic Mass", element.mass, " u")}
          {stat("Period", element.period)}
          {stat("Group", element.group)}
          {stat("Electron Config", element.config)}
          {stat("Electronegativity", element.electronegativity)}
          {stat("Melting Point", element.meltingPoint, " °C")}
          {stat("Boiling Point", element.boilingPoint, " °C")}
        </div>
      </div>
    </div>
  );
}

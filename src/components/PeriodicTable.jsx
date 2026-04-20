import { useState, useMemo } from "react";
import { elements } from "../data/elements";
import ElementCell from "./ElementCell";
import ElementDetail from "./ElementDetail";
import Legend from "./Legend";

// Standard periodic table grid positions [period, group]
// Lanthanides/Actinides shown in their own rows below
const GRID_COLS = 18;
const GRID_ROWS = 7;

function getGridPosition(el) {
  if (el.group === null) return null; // lanthanide/actinide — handled separately
  return { row: el.period, col: el.group };
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  const matchedNumbers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      elements
        .filter(e =>
          e.name.toLowerCase().includes(q) ||
          e.symbol.toLowerCase().includes(q) ||
          String(e.number) === q
        )
        .map(e => e.number)
    );
  }, [search]);

  function isHighlighted(el) {
    if (matchedNumbers) return matchedNumbers.has(el.number);
    if (activeCategory) return el.category === activeCategory;
    return true;
  }

  const mainElements = elements.filter(e => e.group !== null);
  const lanthanides = elements.filter(e => e.category === "lanthanide");
  const actinides = elements.filter(e => e.category === "actinide");

  function handleClick(el) {
    setSelected(prev => (prev?.number === el.number ? null : el));
  }

  // Build a 7x18 grid of main-table elements
  const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));
  mainElements.forEach(el => {
    const pos = getGridPosition(el);
    if (pos) grid[pos.row - 1][pos.col - 1] = el;
  });

  return (
    <div style={{ padding: "16px 8px" }}>
      <h1 style={{
        textAlign: "center",
        color: "#e0e0e0",
        fontSize: "clamp(18px, 3vw, 28px)",
        marginBottom: "4px",
        letterSpacing: "2px",
        fontWeight: "300",
      }}>
        PERIODIC TABLE OF ELEMENTS
      </h1>
      <p style={{ textAlign: "center", color: "#888", fontSize: "12px", marginBottom: "16px" }}>
        Click any element for details · Filter by category or search
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
        <input
          type="text"
          placeholder="Search by name, symbol, or number…"
          value={search}
          onChange={e => { setSearch(e.target.value); setActiveCategory(null); }}
          style={{
            background: "#1e1e2e",
            border: "1px solid #444",
            borderRadius: "24px",
            padding: "8px 18px",
            color: "#e0e0e0",
            fontSize: "14px",
            width: "100%",
            maxWidth: "340px",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      <Legend
        activeCategory={activeCategory}
        onCategoryClick={cat => { setActiveCategory(cat); setSearch(""); }}
      />

      {/* Main table grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gap: "3px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {grid.flat().map((el, i) => {
          if (!el) return <div key={i} />;
          return (
            <ElementCell
              key={el.number}
              element={el}
              isSelected={selected?.number === el.number}
              isHighlighted={isHighlighted(el)}
              onClick={handleClick}
            />
          );
        })}
      </div>

      {/* f-block rows */}
      <div style={{ maxWidth: "1200px", margin: "12px auto 0" }}>
        {/* Spacer label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "clamp(50px, 5vw, 80px)", flexShrink: 0 }} />
          <span style={{ fontSize: "10px", color: "#666", letterSpacing: "1px" }}>
            57–71 LANTHANIDES
          </span>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gap: "3px",
        }}>
          {/* 3 empty cols, then 15 lanthanides */}
          <div /><div /><div />
          {lanthanides.map(el => (
            <ElementCell
              key={el.number}
              element={el}
              isSelected={selected?.number === el.number}
              isHighlighted={isHighlighted(el)}
              onClick={handleClick}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0 4px" }}>
          <div style={{ width: "clamp(50px, 5vw, 80px)", flexShrink: 0 }} />
          <span style={{ fontSize: "10px", color: "#666", letterSpacing: "1px" }}>
            89–103 ACTINIDES
          </span>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gap: "3px",
        }}>
          <div /><div /><div />
          {actinides.map(el => (
            <ElementCell
              key={el.number}
              element={el}
              isSelected={selected?.number === el.number}
              isHighlighted={isHighlighted(el)}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      <ElementDetail element={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

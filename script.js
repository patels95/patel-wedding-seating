function normalize(str) {
  return str.toLowerCase().replace(/[^a-z]/g, "");
}

function init(TABLES) {
  // Build a flat lookup: normalized name → { table, displayName, tablemates[] }
  const lookup = {};

  Object.entries(TABLES).forEach(([tableNum, guests]) => {
    guests.forEach((name) => {
      if (!name) return;
      const displayName = name.replace(/\s*\(.*?\)/g, "").trim();
      const key = normalize(displayName);
      lookup[key] = {
        table: tableNum,
        displayName,
        tablemates: guests
          .filter(
            (g) => g && normalize(g.replace(/\s*\(.*?\)/g, "").trim()) !== key,
          )
          .map((g) => g.replace(/\s*\(.*?\)/g, "").trim()),
      };
    });
  });

  // ── SEARCH ──
  const searchInput = document.getElementById("searchInput");
  const resultCard = document.getElementById("resultCard");

  let matches = [];
  let matchIndex = 0;

  searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim();
    if (val.length < 2) {
      resultCard.classList.add("hidden");
      matches = [];
      matchIndex = 0;
      return;
    }
    matches = findGuests(val);
    matchIndex = 0;
    renderResult();
  });

  function findGuests(query) {
    const q = normalize(query);
    if (lookup[q]) return [lookup[q]];
    const keys = Object.keys(lookup);
    const startsWith = keys.filter((k) => k.startsWith(q));
    const contains = keys.filter((k) => k.includes(q) && !k.startsWith(q));
    return [...startsWith, ...contains].map((k) => lookup[k]);
  }

  function renderResult() {
    const match = matches[matchIndex];
    const total = matches.length;

    resultCard.classList.remove("hidden");

    if (!match) {
      resultCard.className = "result-card not-found";
      resultCard.innerHTML = `
        <div class="not-found-msg">Name not found</div>
        <div class="not-found-sub">Try a different spelling, or scroll below to find your table.</div>
      `;
      return;
    }

    resultCard.className = "result-card";

    const navHtml =
      total > 1
        ? `<div class="result-nav">
           <button class="nav-btn" id="prevMatch">&#8592;</button>
           <span class="nav-indicator">${matchIndex + 1} of ${total}</span>
           <button class="nav-btn" id="nextMatch">&#8594;</button>
         </div>`
        : "";

    const tmHtml = match.tablemates.length
      ? `<div class="result-tablemates">
          <div class="result-tablemates-label">Also at your table</div>
          <div class="result-tablemates-names">${match.tablemates.join(" &nbsp;·&nbsp; ")}</div>
         </div>`
      : "";

    resultCard.innerHTML = `
      ${navHtml}
      <div class="result-label">Welcome</div>
      <div class="result-name">${match.displayName}</div>
      <div class="result-table-num">${match.table}</div>
      <div class="result-table-word">Your Table</div>
      ${tmHtml}
    `;

    if (total > 1) {
      document.getElementById("prevMatch").addEventListener("click", () => {
        matchIndex = (matchIndex - 1 + total) % total;
        renderResult();
      });
      document.getElementById("nextMatch").addEventListener("click", () => {
        matchIndex = (matchIndex + 1) % total;
        renderResult();
      });
    }
  }

  // ── RENDER TABLE GRID ──
  const grid = document.getElementById("tablesGrid");

  Object.entries(TABLES).forEach(([num, guests]) => {
    const card = document.createElement("div");
    card.className = "table-card";
    const names = guests
      .filter(Boolean)
      .map((g) => g.replace(/\s*\(.*?\)/g, "").trim());
    card.innerHTML = `
      <div class="table-card-num">${num}</div>
      <div class="table-card-label">Table</div>
      <div class="table-card-guests">${names.join("<br>")}</div>
    `;
    card.addEventListener("click", () => openDetail(num, names));
    grid.appendChild(card);
  });
}

// ── TABLE DETAIL ──
function openDetail(num, guests) {
  document.getElementById("detailTitle").innerHTML =
    `Table <span>${num}</span>`;
  const guestHtml = guests
    .map(
      (g) => `
    <div class="guest-row"><span class="guest-dot"></span>${g}</div>
  `,
    )
    .join("");
  document.getElementById("detailGuests").innerHTML = guestHtml;
  document.getElementById("tableDetail").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function closeDetail() {
  document.getElementById("tableDetail").classList.add("hidden");
}

function switchTab(t) {
  document
    .querySelectorAll(".tab")
    .forEach((el) => el.classList.remove("active"));
  document
    .getElementById("tab" + t.charAt(0).toUpperCase() + t.slice(1))
    .classList.add("active");
}

fetch("seating.json")
  .then((r) => r.json())
  .then(init);

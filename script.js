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
      if (!lookup[key]) lookup[key] = [];
      lookup[key].push({
        table: tableNum,
        displayName,
        tablemates: guests
          .filter(
            (g) => g && normalize(g.replace(/\s*\(.*?\)/g, "").trim()) !== key,
          )
          .map((g) => g.replace(/\s*\(.*?\)/g, "").trim()),
      });
    });
  });

  // ── SEARCH ──
  const searchInput = document.getElementById("searchInput");
  const resultCard = document.getElementById("resultCard");
  const tablematesBar = document.getElementById("tablematesBar");

  let matches = [];
  let matchIndex = 0;
  let currentMatchHasTablemates = false;
  const stickyBar = document.querySelector(".sticky-bar");

  // Keep sticky bar pinned to the visual viewport when the mobile keyboard is open.
  // position:sticky is relative to the layout viewport, which doesn't shrink on iOS
  // when the keyboard opens, causing the bar to scroll off the visible area.
  let pinBar = () => {};
  if (window.visualViewport) {
    const vv = window.visualViewport;
    const initialVVHeight = vv.height;
    const header = document.querySelector(".header");
    const spacer = document.createElement("div");
    stickyBar.insertAdjacentElement("afterend", spacer);

    pinBar = function () {
      const keyboardOpen = vv.height < initialVVHeight - 50;
      const headerVisible = header.getBoundingClientRect().bottom > 0;

      // Pin to the visual viewport only after the header scrolls off, so the bar
      // never covers the header or pushes the result card down with a gap.
      if (keyboardOpen && !headerVisible) {
        spacer.style.height = stickyBar.offsetHeight + "px";
        stickyBar.style.position = "fixed";
        stickyBar.style.top = vv.offsetTop + "px";
        stickyBar.style.width = "100%";
      } else {
        spacer.style.height = "";
        stickyBar.style.position = "";
        stickyBar.style.top = "";
        stickyBar.style.width = "";
      }
    };

    vv.addEventListener("resize", pinBar);
    vv.addEventListener("scroll", pinBar);
  }

  function syncTablematesBar() {
    if (!currentMatchHasTablemates) return;
    const cardBottom = resultCard.getBoundingClientRect().bottom;
    const barBottom = stickyBar.getBoundingClientRect().bottom;
    tablematesBar.classList.toggle("hidden", cardBottom > barBottom);
    pinBar();
  }

  window.addEventListener("scroll", syncTablematesBar, { passive: true });

  function dismissCard() {
    currentMatchHasTablemates = false;
    resultCard.classList.add("hidden");
    tablematesBar.classList.add("hidden");
    matches = [];
    matchIndex = 0;
  }

  searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim();
    if (val.length < 2) {
      dismissCard();
      return;
    }
    matches = findGuests(val);
    matchIndex = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderResult();
  });

  // Dismiss the keyboard when the guest presses Enter; search is already live.
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchInput.blur();
    }
  });

  function findGuests(query) {
    const q = normalize(query);
    if (lookup[q]) return lookup[q];
    const keys = Object.keys(lookup);
    const startsWith = keys.filter((k) => k.startsWith(q));
    const contains = keys.filter((k) => k.includes(q) && !k.startsWith(q));
    return [...startsWith, ...contains].flatMap((k) => lookup[k]);
  }

  function renderResult() {
    const match = matches[matchIndex];
    const total = matches.length;

    currentMatchHasTablemates = false;
    tablematesBar.classList.add("hidden");
    resultCard.classList.remove("hidden");

    if (!match) {
      resultCard.className = "result-card not-found";
      resultCard.innerHTML = `
        <button class="dismiss-btn" id="dismissCard">&#x2715;</button>
        <div class="not-found-msg">Name not found</div>
        <div class="not-found-sub">Try a different spelling, or scroll below to find your table.</div>
      `;
      document.getElementById("dismissCard").addEventListener("click", dismissCard);
      return;
    }

    resultCard.className = "result-card";

    const navHtml =
      total > 1
        ? `<div class="result-nav">
           <button class="nav-btn" id="prevMatch"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
           <span class="nav-indicator">${matchIndex + 1} of ${total}</span>
           <button class="nav-btn" id="nextMatch"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
         </div>`
        : "";

    const tmHtml = match.tablemates.length
      ? `<div class="result-tablemates">
          <div class="result-tablemates-label">Also at your table</div>
          <div class="result-tablemates-names">${match.tablemates.join(" &nbsp;·&nbsp; ")}</div>
         </div>`
      : "";

    resultCard.innerHTML = `
      <button class="dismiss-btn" id="dismissCard">&#x2715;</button>
      ${navHtml}
      <div class="result-label">Welcome</div>
      <div class="result-name">${match.displayName}</div>
      <div class="result-table-num">${match.table}</div>
      <div class="result-table-word">Your Table</div>
      ${tmHtml}
    `;

    document.getElementById("dismissCard").addEventListener("click", dismissCard);

    if (match.tablemates.length) {
      currentMatchHasTablemates = true;
      tablematesBar.innerHTML = `
        <div class="tablemates-bar-table-section">
          <div class="tablemates-bar-table-label">Table</div>
          <div class="tablemates-bar-table">${match.table}</div>
        </div>
        <div class="tablemates-bar-center">
          <div class="tablemates-bar-label">Also at your table</div>
          <div class="tablemates-bar-names">${match.tablemates.join(" &nbsp;·&nbsp; ")}</div>
        </div>
        <button class="tablemates-bar-dismiss" id="tablematesDismiss">&#x2715;</button>
      `;
      document.getElementById("tablematesDismiss").addEventListener("click", dismissCard);
    }

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
  const detail = document.getElementById("tableDetail");
  detail.scrollTop = 0;
  detail.classList.remove("hidden");
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

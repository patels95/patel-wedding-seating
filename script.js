// ─────────────────────────────────────────────
//  SEATING DATA
//  To update: replace the arrays inside TABLES.
//  Each key is the table label; value is an array of guest names.
//  Names should match how guests will type them (first + last).
// ─────────────────────────────────────────────
const TABLES = {
  1: [
    "Himani Patel",
    "Mahek Patel",
    "Amani Patel",
    "Tulsi Patel",
    "Nandini Patel",
    "Sahil Patel",
    "Dhruv Patel",
    "Jasmine Patel",
    "Anil Sharma",
  ],
  2: [
    "Anshul Doshi",
    "Karan Das",
    "Shalin Mehta",
    "Saumil Kothari",
    "Pavan Manilal",
    "Naman Shah",
    "Pranil Vora",
    "Ayushi Shah",
    "Avya Vora (infant)",
    "Nirali Sheth",
    "Ann Cox",
  ],
  3: [
    "Bhavesh Patel",
    "Pinal Patel",
    "Bhavin Patel",
    "Hetal Patel",
    "Purvi Patel",
    "Amrish Patel",
    "Leena Patel",
    "Mehul Patel",
  ],
  4: [
    "Derek Mei",
    "Christy Park",
    "Brett Moretzky",
    "Caitlin Vanderberg",
    "Chirag Aswani",
    "Grace Schoenhoff",
    "Jordan Walker (DP)",
    "Tim Walker (DP)",
    "Maeve Healy (DP)",
    "Emily Pina (DP)",
  ],
  5: [
    "Malini Achar",
    "Aneesh Tyle",
    "Varshini Kadadevermath",
    "Arvind Kouta",
    "Alishba Rehman",
    "James Voytek",
    "Vishnu Varada",
    "Samiksha Pal",
    "Adithya Rajan",
  ],
  6: [
    "Dveet Patel",
    "Maddie Patel",
    "Kareena Patel",
    "Chandni Patel",
    "Jash Patel",
    "Janvi Patel",
    "Krishna Patel",
    "Kangna Patel",
    "Saajan Patel",
  ],
  7: [
    "Sana Allam",
    "Aashrita Madireddi",
    "Sonal Patel",
    "Premika Pandian",
    "Adithya Jay",
    "Mihir Joshi",
    "Neal Mistry",
    "Poojan Patel",
  ],
  8: [
    "Alay Patel",
    "Nirali Patel",
    "Naman Patel",
    "Ishan Patel",
    "Ramilaben Patel",
    "Rashmi Patel",
    "Devendra Patel",
    "Ashok Patel",
    "Komal Patel",
    "Ishita Singhal",
  ],
  9: [
    "Hemangini Sharma",
    "Hemant Sharma",
    "Jay Sharma",
    "Mitul Patel",
    "Palak Patel",
    "Aryan Patel",
    "Aiyra Patel",
    "Amita Patel",
    "Surendra Patel",
    "Jaydev Sharma",
  ],
  10: [
    "Aarti Shukla",
    "Chirag Shukla",
    "Avya Shukla",
    "Puja Patel",
    "Aakash Patel",
    "Samantha Patel",
    "Kush Pandya",
    "Mansi Pandya",
    "Mehaanya Pandya (infant)",
  ],
  11: [
    "Shardul Mehta",
    "Aarti Mehta",
    "Shivaan Mehta",
    "Ahaana Mehta",
    "Anokhi Mehta",
    "Veer Ramchand",
    "Jayesh Patel",
    "Malini Mehta",
  ],
  12: [
    "Mehul Shah",
    "Mita Shah",
    "Ketan Doshi",
    "Manisha Doshi",
    "Sujit Das",
    "Hena Das",
    "Sagar Mehta",
    "Sejal Mehta",
    "Nimish Mehta",
    "Pinaki Mehta",
  ],
  13: [
    "Elizabeth Terrell",
    "Ben Terrell",
    "Kendall Mesnard",
    "Abby Gaffner",
    "Simon Devlin",
    "Rishi Patel",
    "Jay Patel",
    "Jill Patel",
    "Garv Patel",
  ],
  14: [
    "Shreena Shah",
    "Saira Shah (highchair)",
    "Shanaya Shah",
    "Sanika Shah",
    "Payal Shah",
    "Kokila Shah",
    "Neel Shah",
    "Aneri Doshi",
    "Kiara Kothari (highchair)",
  ],
  15: [
    "Aachal Patel",
    "Ishaan Patel",
    "Inaiya Patel",
    "Mohit Patel",
    "Aarav Patel",
    "Anika Patel",
    "Abhishay Patel",
    "Jaanvi Patel",
    "Ashiyana Patel",
  ],
  16: [
    "Sanjay Shah",
    "Kavita Shah",
    "Snehal Kothari",
    "Mona Kothari",
    "Nilesh Sheth",
    "Purvi Sheth",
    "Nimish Bhatt",
    "Naina Bhatt",
  ],
  17: [
    "Ronak Patel",
    "Alpa Patel",
    "Saaya Patel",
    "Sahaan Patel",
    "Badal Patel",
    "Khushbu Patel",
    "Saavan Patel",
    "Sia Patel",
    "Akash Patel",
    "Astha Mor",
    "Aashi Patel",
  ],
  18: [
    "Shekhar Bhansali",
    "Prita Bhansali",
    "Sunil Doshi",
    "Avni Doshi",
    "Rupa Jobanputra",
    "Parag Vora",
    "Priti Vora",
  ],
  19: [
    "Ayushi Patel",
    "Ayanna Patel",
    "Karishma Parel",
    "Sagar Patel",
    "Hely Desai",
    "Jasel Patel",
    "Ria Patel",
    "Prachi Patel",
    "Setu Patel",
  ],
  20: [
    "Nipa Patel",
    "Dhavanay Patel",
    "Rupangi Patel",
    "Tanha Patel",
    "Vipul Patel",
    "Chirag Patel",
    "Neeraj Patel",
    "Sonal Patel",
    "Amrish Patel",
    "Aashni Patel",
  ],
  21: [
    "Jigar Patel",
    "Jesika Patel",
    "Samir Patel",
    "Apexa Patel",
    "Milan Patel",
    "Payal Patel",
    "Nilpesh Patel",
    "Kinita Patel",
    "Shital Patel",
    "Vaishali Patel",
  ],
  22: [
    "Nita Patel",
    "Ajay Patel",
    "Snehal Patel",
    "Pranav Patel",
    "Harsha Patel",
    "Viral Pandya",
    "Preeti Pandya",
    "Milan Patel",
    "Reshma Patel",
  ],
  23: [
    "Mayura Patel",
    "Kundan Patel",
    "Dipa Patel",
    "Hitesh Patel",
    "Nila Patel",
    "Sanjay Patel",
    "Raj Patel",
    "Preeti Patel",
  ],
  24: [
    "Ambalal Patel",
    "Jyostna Patel",
    "Babu Patel",
    "Dashrat Patel",
    "Sushila Patel",
    "Gordhan Patel",
    "Kusum Patel",
    "Narendra Patel",
    "Uma Patel",
    "Renuka Patel",
    "Kaushik Patel",
  ],
  25: [
    "Daxa Patel",
    "Kanulal Patel",
    "Varsha Patel",
    "Narendra Patel",
    "Pushpa Patel",
    "Dinesh Patel",
    "Arun Patel",
    "Manda Patel",
    "Smita Mehta",
    "Divyang Mehta",
  ],
  26: [
    "Biren Patel",
    "Roma Patel",
    "Nia Patel",
    "Ziya Patel",
    "Tia Trivedi",
    "Utsav Trivedi",
    "Aarav Trivedi",
    "Anaya Trivedi",
    "Rohina Patel",
    "Anil Patel",
  ],
  27: [
    "Mukesh Patel",
    "Sonal Patel",
    "Ashok Patel",
    "Sudha Patel",
    "Krupali Patel",
    "Mitesh Patel",
    "Tithi Patel",
    "Rahi Patel",
    "Nithik Patel",
  ],
  28: [
    "Mahendra Patel",
    "Panna Patel",
    "Manish Desai",
    "Lopa Desai",
    "Raju Patel",
    "Ranjan Patel",
    "Raj Patel",
    "Ashwin Patel",
    "Mita Patel",
    "Jyoti Patel",
  ],
  29: [
    "Aarti Sharma",
    "Anita Sharma",
    "Adithya Sharma",
    "Sahiba Nagpal",
    "Sagar Parikh",
    "Tulasi Pandav",
    "Rushiel Patel",
    "Nandish Desai",
    "Aditi Shah",
  ],
};

// Build a flat lookup: normalized name → { table, displayName, tablemates[] }
const lookup = {};

Object.entries(TABLES).forEach(([tableNum, guests]) => {
  guests.forEach((name) => {
    if (!name) return;
    const displayName = name.replace(/\s*\(.*?\)/g, "").trim(); // strip "(infant)" etc
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

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z]/g, "");
}

// ── SEARCH ──
const searchInput = document.getElementById("searchInput");
const resultCard = document.getElementById("resultCard");

searchInput.addEventListener("input", () => {
  const val = searchInput.value.trim();
  if (val.length < 2) {
    resultCard.classList.add("hidden");
    return;
  }
  const match = findGuest(val);
  renderResult(match, val);
});

function findGuest(query) {
  const q = normalize(query);
  // Exact match first
  if (lookup[q]) return lookup[q];
  // Partial match (starts-with)
  const keys = Object.keys(lookup);
  let best = null;
  for (const k of keys) {
    if (k.startsWith(q)) {
      best = lookup[k];
      break;
    }
  }
  if (best) return best;
  // Contains match
  for (const k of keys) {
    if (k.includes(q)) {
      best = lookup[k];
      break;
    }
  }
  return best;
}

function renderResult(match, query) {
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
  const tmHtml = match.tablemates.length
    ? `<div class="result-tablemates">
        <div class="result-tablemates-label">Also at your table</div>
        <div class="result-tablemates-names">${match.tablemates.join(" &nbsp;·&nbsp; ")}</div>
       </div>`
    : "";
  resultCard.innerHTML = `
    <div class="result-label">Welcome</div>
    <div class="result-name">${match.displayName}</div>
    <div class="result-table-num">${match.table}</div>
    <div class="result-table-word">Your Table</div>
    ${tmHtml}
  `;
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

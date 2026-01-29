const moviesContainer = document.getElementById("MoviesContainer");
const searchInput = document.getElementById("SearchInput");
const filterButtons = document.querySelectorAll(".chip");
const sortSelect = document.getElementById("SortSelect");

let allMovies = Array.isArray(window.tempData) ? window.tempData : [];
let activeFilter = "all";

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";

  const img = document.createElement("img");
  img.className = "movie-poster";
  img.src = movie.poster;
  img.alt = movie.title;

  img.addEventListener("error", () => {
    img.src = "./assets/Captura de pantalla 2026-01-29 085957.png";
  });

  const info = document.createElement("div");
  info.className = "movie-info";

  const title = document.createElement("h3");
  title.className = "movie-title";
  title.textContent = movie.title;

  const meta = document.createElement("p");
  meta.className = "movie-meta";
  meta.textContent = `${movie.year ?? "—"} • ⭐ ${movie.rate ?? "—"}`;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "movie-btn";
  btn.textContent = "Ver ahora";

  info.append(title, meta, btn);
  card.append(img, info);
  return card;
}

function renderList(list) {
  if (!moviesContainer) return;

  moviesContainer.innerHTML = "";

  if (!list.length) {
    moviesContainer.innerHTML = `<div class="movies-empty">No hay resultados con esos filtros.</div>`;
    return;
  }

  list.forEach((m) => moviesContainer.appendChild(createMovieCard(m)));
}

function applyFilter(list) {
  const copy = [...list];

  if (activeFilter === "top") return copy.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
  if (activeFilter === "new") return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return copy;
}

function applySearch(list) {
  const q = normalizeText(searchInput?.value);
  if (!q) return list;

  return list.filter((m) => {
    const t = normalizeText(m.title);
    const d = normalizeText(m.director);
    const y = normalizeText(m.year);
    return t.includes(q) || d.includes(q) || y.includes(q);
  });
}

function applySort(list) {
  const copy = [...list];
  const v = sortSelect?.value ?? "newest";

  if (v === "newest") copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  if (v === "oldest") copy.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
  if (v === "rate_desc") copy.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
  if (v === "rate_asc") copy.sort((a, b) => (a.rate ?? 0) - (b.rate ?? 0));
  if (v === "title_asc") copy.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
  if (v === "title_desc") copy.sort((a, b) => (b.title ?? "").localeCompare(a.title ?? ""));

  return copy;
}

function paint() {
  let list = applyFilter(allMovies);
  list = applySearch(list);
  list = applySort(list);
  renderList(list);
}

function setActiveFilter(next) {
  activeFilter = next;

  filterButtons.forEach((b) => {
    b.classList.toggle("chip--active", b.dataset.filter === next);
  });

  paint();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setActiveFilter(btn.dataset.filter));
});

searchInput?.addEventListener("input", paint);
sortSelect?.addEventListener("change", paint);

paint();

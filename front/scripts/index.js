const API_URL = "http://localhost:3000/peliculas";

const cardsContainer = document.getElementById("CardsContainer");

const overlay = document.createElement("div");
overlay.className = "movies-overlay";
document.body.appendChild(overlay);

function closeOpenCard() {
  const open = document.querySelector(".cardHome.is-open");
  if (open) open.classList.remove("is-open");
  overlay.classList.remove("is-open");
}

overlay.addEventListener("click", closeOpenCard);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOpenCard();
});

function createCard(movie) {
  const card = document.createElement("article");
  card.className = "cardHome";

  const img = document.createElement("img");
  img.className = "cardHome__img";
  img.src = movie.poster;
  img.alt = movie.title || "Poster";

  img.addEventListener("error", () => {
    img.src = "./assets/tomas-martinez-logo.png";
  });

  const info = document.createElement("div");
  info.className = "cardHome__info";

  const title = document.createElement("h3");
  title.className = "cardHome__title";
  title.textContent = movie.title || "Sin título";

  const meta = document.createElement("p");
  meta.className = "cardHome__meta";
  meta.textContent = `${movie.year ?? "—"} • ⭐ ${movie.rate ?? "—"}`;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cardHome__btn";
  btn.textContent = "Ver ahora";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  info.append(title, meta, btn);
  card.append(img, info);

  card.addEventListener("click", () => {
    const alreadyOpen = card.classList.contains("is-open");
    closeOpenCard();

    if (!alreadyOpen) {
      overlay.classList.add("is-open");
      card.classList.add("is-open");
    }
  });

  return card;
}

function render(list) {
  if (!cardsContainer) return;

  cardsContainer.innerHTML = "";

  const items = Array.isArray(list) ? list : [];
  if (!items.length) return;

  items.forEach((m) => cardsContainer.appendChild(createCard(m)));
}

async function loadMovies() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    render(data);
  } catch (err) {
    console.error("No se pudo cargar la API:", err);

    if (Array.isArray(window.tempData)) {
      render(window.tempData);
    }
  }
}

loadMovies();

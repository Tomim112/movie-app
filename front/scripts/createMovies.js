const API_URL = "http://localhost:3000/peliculas";

const form = document.getElementById("createMovieForm");
const msg = document.getElementById("formMsg"); 

function show(text, ok = true) {
  if (!msg) return;
  msg.textContent = text;
  msg.style.opacity = "1";
  msg.style.color = ok ? "#7CFC98" : "#FF8080";
}

function getValue(id) {
  return document.getElementById(id)?.value?.trim() ?? "";
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = getValue("title");
  const year = Number(getValue("year")) || undefined;
  const director = getValue("director");
  const duration = getValue("duration");
  const genreRaw = getValue("genre");
  const rate = Number(getValue("rate")) || undefined;
  const poster = getValue("poster");

  const movie = {
    title,
    year,
    director,
    duration,
    genre: genreRaw ? genreRaw.split(",").map(g => g.trim()).filter(Boolean) : [],
    rate,
    poster,
  };

  if (!movie.title || !movie.poster) {
    show("Faltan campos obligatorios: Título y Poster URL.", false);
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("POST error:", res.status, data);
      show(`Error al guardar (${res.status}): ${data.error || "Revisá la API"}`, false);
      return;
    }

    show("✅ Película guardada. Actualizá Movies/Home.");
    form.reset();

  } catch (err) {
    console.error(err);
    show("No se pudo conectar con la API (¿back apagado?).", false);
  }
});


const cards = [...document.querySelectorAll(".game-card")];
const search = document.getElementById("searchInput");
const filters = [...document.querySelectorAll(".filter")];
const empty = document.getElementById("emptyState");
const dialog = document.getElementById("gameDialog");
const dialogTitle = document.getElementById("dialogTitle");
let activeFilter = "All";

function updateGames() {
  const term = (search?.value || "").trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const matchesText = card.dataset.name.toLowerCase().includes(term);
    const matchesCategory = activeFilter === "All" || card.dataset.category === activeFilter;
    const visible = matchesText && matchesCategory;
    card.hidden = !visible;
    if (visible) shown++;
  });
  empty.hidden = shown !== 0;
}
search?.addEventListener("input", updateGames);
filters.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle("active", item === button));
  updateGames();
}));
document.querySelectorAll(".category-tile").forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.category;
  filters.forEach(item => item.classList.toggle("active", item.dataset.filter === activeFilter));
  updateGames();
  document.getElementById("games").scrollIntoView({behavior:"smooth"});
}));
function openGame(card) {
  dialogTitle.textContent = card.dataset.name;
  dialog.showModal();
}
cards.forEach(card => {
  card.addEventListener("click", event => {
    if (event.target.closest(".play-btn") || event.target === card || event.target.closest(".game-thumb") || event.target.closest(".game-info")) openGame(card);
  });
});
document.getElementById("closeDialog")?.addEventListener("click", () => dialog.close());
document.getElementById("dialogOk")?.addEventListener("click", () => dialog.close());
document.getElementById("menuBtn")?.addEventListener("click", () => {
  document.querySelector("nav").style.display = "flex";
  document.querySelector("nav").style.position = "absolute";
  document.querySelector("nav").style.top = "68px";
  document.querySelector("nav").style.right = "5%";
  document.querySelector("nav").style.padding = "18px";
  document.querySelector("nav").style.background = "#17171f";
  document.querySelector("nav").style.border = "1px solid #8b5cf655";
  document.querySelector("nav").style.borderRadius = "12px";
});

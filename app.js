const GAME_DATA = [
  {id:"2048",name:"2048",description:"Slide and merge tiles to reach 2048.",category:"Puzzle",icon:"🔢",thumb:"thumb-maze"},
  {id:"snake",name:"Snake",description:"Grow your snake without biting your tail.",category:"Classic",icon:"🐍",thumb:"thumb-neon"},
  {id:"tetris",name:"Tetris",description:"The timeless block-stacking classic.",category:"Classic",icon:"🧱",thumb:"thumb-cosmic"},
  {id:"flappy",name:"Flappy Bird",description:"Tap to flap through the pipes.",category:"Arcade",icon:"🐤",thumb:"thumb-bounce"},
  {id:"minesweeper",name:"Minesweeper",description:"Flag the mines, clear the field.",category:"Puzzle",icon:"💣",thumb:"thumb-shadow"},
  {id:"pacman",name:"Pac-Man",description:"Eat dots and dodge ghosts in the maze.",category:"Classic",icon:"🟡",thumb:"thumb-maze"},
  {id:"wordle",name:"Word Hunt",description:"Guess the five-letter word in six tries.",category:"Word",icon:"🔤",thumb:"thumb-pixel"},
  {id:"cookieclicker",name:"Cookie Clicker",description:"Click, buy, automate, repeat forever.",category:"Idle",icon:"🍪",thumb:"thumb-bounce"},
  {id:"breakout",name:"Breakout",description:"Bounce the ball and smash every brick.",category:"Arcade",icon:"🎾",thumb:"thumb-neon"},
  {id:"pong",name:"Pong",description:"The original. Beat the AI paddle to 7.",category:"Classic",icon:"🏓",thumb:"thumb-cosmic"},
  {id:"memory",name:"Memory Match",description:"Flip cards and find every matching pair.",category:"Casual",icon:"🃏",thumb:"thumb-shadow"},
  {id:"sliding-puzzle",name:"15 Puzzle",description:"Slide tiles into order, 1 through 15.",category:"Puzzle",icon:"🧩",thumb:"thumb-maze"},
  {id:"sudoku",name:"Sudoku",description:"Fill the grid with numbers and logic.",category:"Puzzle",icon:"🔢",thumb:"thumb-cosmic"},
  {id:"tictactoe",name:"Tic-Tac-Toe",description:"Three in a row against an AI.",category:"Strategy",icon:"⭕",thumb:"thumb-pixel"},
  {id:"connect4",name:"Connect Four",description:"Drop pieces, line up four, beat the AI.",category:"Strategy",icon:"🔴",thumb:"thumb-neon"},
  {id:"simon",name:"Simon",description:"Repeat the growing color sequence.",category:"Rhythm",icon:"🎨",thumb:"thumb-pixel"},
  {id:"whackamole",name:"Whack-a-Mole",description:"Bonk as many moles as you can in 30 seconds.",category:"Casual",icon:"🔨",thumb:"thumb-bounce"},
  {id:"aimtrainer",name:"Aim Trainer",description:"Click targets fast. How high can you score?",category:"Action",icon:"🎯",thumb:"thumb-shadow"},
  {id:"reaction",name:"Reaction Time",description:"How fast can you click when it turns green?",category:"Casual",icon:"⚡",thumb:"thumb-neon"},
  {id:"stack",name:"Stack",description:"Drop blocks perfectly to build a tower.",category:"Arcade",icon:"🏗️",thumb:"thumb-cosmic"},
  {id:"doodlejump",name:"Doodle Jump",description:"Bounce up forever. Don't miss a platform.",category:"Arcade",icon:"🦘",thumb:"thumb-bounce"},
  {id:"slope",name:"Slope",description:"Steer a ball down an endless neon track.",category:"Runner",icon:"🔮",thumb:"thumb-neon"},
  {id:"geometrydash",name:"Geometry Dash",description:"One-button rhythm runner. Jump the spikes.",category:"Rhythm",icon:"🔺",thumb:"thumb-pixel"},
  {id:"run3",name:"Run 3",description:"Endless space runner. Jump gaps and walls.",category:"Runner",icon:"🚀",thumb:"thumb-cosmic"},
  {id:"polytrack",name:"PolyTrack",description:"Top-down arcade racer. Three laps, go fast.",category:"Racing",icon:"🏎️",thumb:"thumb-shadow"},
  {id:"crossyroad",name:"Crossy Road",description:"Hop across roads. Dodge the traffic.",category:"Action",icon:"🐔",thumb:"thumb-bounce"},
  {id:"slither",name:"Slither",description:"Grow your snake and avoid crashing.",category:"Multiplayer",icon:"🐍",thumb:"thumb-neon"},
  {id:"helix",name:"Helix Jump",description:"Rotate the tower to drop the ball through gaps.",category:"Arcade",icon:"🌀",thumb:"thumb-maze"}
];

const grid = document.getElementById("gameGrid");
const search = document.getElementById("searchInput");
const filters = [...document.querySelectorAll(".filter")];
const empty = document.getElementById("emptyState");
const dialog = document.getElementById("gameDialog");
const dialogTitle = document.getElementById("dialogTitle");
const gameFrame = document.getElementById("gameFrame");
let activeFilter = "All";

function gameScreenshotUrl(game) {
  const gameUrl = new URL("./games/" + game.id + "/index.html", window.location.href).href;
  return "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(gameUrl) + "?w=640&h=360";
}
function renderCards() {
  grid.innerHTML = GAME_DATA.map(game => `
    <article class="game-card" data-name="${game.name}" data-category="${game.category}" data-game-id="${game.id}" tabindex="0" role="button" aria-label="Play ${game.name}">
      <div class="game-thumb ${game.thumb}">
        <span class="thumb-icon">${game.icon}</span>
        <img class="game-shot" src="${gameScreenshotUrl(game)}" alt="${game.name} gameplay screenshot" loading="lazy" referrerpolicy="no-referrer" onload="this.parentElement.classList.add('has-shot')" onerror="this.remove()">
        <span class="thumb-tag">${game.category.toUpperCase()}</span>
      </div>
      <div class="game-info"><div><h3>${game.name}</h3><p>${game.description}</p></div><button class="play-btn" type="button" aria-label="Play ${game.name}">▶</button></div>
    </article>`).join("");
}
function updateGames() {
  const term = (search?.value || "").trim().toLowerCase();
  let shown = 0;
  grid.querySelectorAll(".game-card").forEach(card => {
    const game = GAME_DATA.find(item => item.id === card.dataset.gameId);
    const matchesText = (game.name + " " + game.description + " " + game.category).toLowerCase().includes(term);
    const matchesCategory = activeFilter === "All" || game.category === activeFilter;
    const visible = matchesText && matchesCategory;
    card.hidden = !visible;
    if (visible) shown++;
  });
  empty.hidden = shown !== 0;
}
function setFilter(category) {
  activeFilter = category;
  filters.forEach(item => item.classList.toggle("active", item.dataset.filter === category));
  updateGames();
}
function openGame(game) {
  dialogTitle.textContent = game.name;
  gameFrame.src = "./games/" + game.id + "/index.html";
  if (!dialog.open) dialog.showModal();
}
renderCards();
updateGames();
search?.addEventListener("input", updateGames);
filters.forEach(button => button.addEventListener("click", () => setFilter(button.dataset.filter)));
document.querySelectorAll(".category-tile").forEach(button => button.addEventListener("click", () => {
  const category = button.dataset.category;
  setFilter(GAME_DATA.some(game => game.category === category) ? category : "All");
  document.getElementById("games").scrollIntoView({behavior:"smooth"});
}));
grid.addEventListener("click", event => {
  const card = event.target.closest(".game-card");
  if (card) openGame(GAME_DATA.find(game => game.id === card.dataset.gameId));
});
grid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("game-card")) {
    event.preventDefault();
    openGame(GAME_DATA.find(game => game.id === event.target.dataset.gameId));
  }
});
function closeGame() {
  leaveFallbackFullscreen();
  if (document.fullscreenElement) document.exitFullscreen?.();
  if (dialog.open) dialog.close();
  gameFrame.src = "about:blank";
}
document.getElementById("closeDialog")?.addEventListener("click", closeGame);
dialog.addEventListener("click", event => { if (event.target === dialog) closeGame(); });
dialog.addEventListener("close", () => { gameFrame.src = "about:blank"; });
const fullscreenBtn = document.getElementById("fullscreenBtn");
function leaveFallbackFullscreen() {
  dialog.classList.remove("is-fullscreen");
  fullscreenBtn.textContent = "Fullscreen ↗";
  document.body.classList.remove("player-fullscreen-open");
}
async function enterGameFullscreen() {
  try {
    if (dialog.requestFullscreen) {
      await dialog.requestFullscreen();
      return;
    }
    if (gameFrame.requestFullscreen) {
      await gameFrame.requestFullscreen();
      return;
    }
  } catch (error) {
    // Use the in-page full-window fallback when native fullscreen is blocked.
  }
  dialog.classList.add("is-fullscreen");
  document.body.classList.add("player-fullscreen-open");
  fullscreenBtn.textContent = "Exit fullscreen";
}
fullscreenBtn?.addEventListener("click", async () => {
  if (dialog.classList.contains("is-fullscreen")) {
    leaveFallbackFullscreen();
    return;
  }
  if (document.fullscreenElement) {
    await document.exitFullscreen?.();
    return;
  }
  await enterGameFullscreen();
});
document.addEventListener("fullscreenchange", () => {
  fullscreenBtn.textContent = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen ↗";
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && dialog.classList.contains("is-fullscreen")) leaveFallbackFullscreen();
});
document.getElementById("menuBtn")?.addEventListener("click", () => {
  const nav = document.querySelector("nav");
  const isOpen = nav.style.display === "flex";
  nav.style.display = isOpen ? "" : "flex";
  nav.style.position = isOpen ? "" : "absolute";
  nav.style.top = isOpen ? "" : "68px";
  nav.style.right = isOpen ? "" : "5%";
  nav.style.padding = isOpen ? "" : "18px";
  nav.style.background = isOpen ? "" : "#17171f";
  nav.style.border = isOpen ? "" : "1px solid #8b5cf655";
  nav.style.borderRadius = isOpen ? "" : "12px";
});

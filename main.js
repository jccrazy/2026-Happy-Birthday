const welcomeScreen = document.querySelector("#welcomeScreen");
const openSurprise = document.querySelector("#openSurprise");
const bgMusic = document.querySelector("#bgMusic");
const musicToggle = document.querySelector("#musicToggle");
const floatingLayer = document.querySelector("#floatingLayer");
const fireworkLayer = document.querySelector("#fireworkLayer");
const wishWordLayer = document.querySelector("#wishWordLayer");
const typewriterText = document.querySelector("#typewriterText");
const typingCursor = document.querySelector("#typingCursor");
const wishButton = document.querySelector("#wishButton");
const wishModal = document.querySelector("#wishModal");
const modalClose = document.querySelector("#modalClose");
const againButton = document.querySelector("#againButton");

const blessing = `亲爱的老婆：

生日快乐呀。

希望新的一岁，你继续做那个可爱、明亮、坚定又温柔的自己。
你可以慢慢来，可以偶尔撒娇，可以放心地被爱。

愿你像小猪一样有满满福气，像金牛座一样稳定发光。
也愿我一直有机会，把每一个普通的今天，都变成你喜欢的样子。

我爱你，不止今天。`;

let typingTimer = null;
let floatingTimer = null;
let fireworkTimer = null;
let wishWordTimer = null;
let isTyping = false;
let hasOpenedSurprise = false;
let shouldPlayMusic = false;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function playMusic() {
  if (!bgMusic) return;

  musicToggle.classList.remove("is-unavailable");
  bgMusic.volume = 0.82;

  bgMusic.play()
    .then(() => {
      musicToggle.classList.add("is-playing");
      musicToggle.classList.remove("is-unavailable");
      musicToggle.setAttribute("aria-label", "暂停背景音乐");
      musicToggle.setAttribute("title", "暂停背景音乐");
    })
    .catch(() => {
      musicToggle.classList.remove("is-playing");
      musicToggle.classList.add("is-unavailable");
      musicToggle.setAttribute("aria-label", "音乐暂时无法播放，请确认 assets/bg-music.mp3 已放入");
      musicToggle.setAttribute("title", "音乐暂时无法播放");
    });
}

function pauseMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  shouldPlayMusic = false;
  musicToggle.classList.remove("is-playing");
  musicToggle.classList.remove("is-unavailable");
  musicToggle.setAttribute("aria-label", "播放背景音乐");
  musicToggle.setAttribute("title", "播放背景音乐");
}

function requestMusicPlay() {
  if (!bgMusic) return;
  shouldPlayMusic = true;
  bgMusic.load();
  playMusic();
}

function startTypewriter() {
  if (isTyping) return;

  isTyping = true;
  typewriterText.textContent = "";
  let index = 0;

  typingTimer = window.setInterval(() => {
    typewriterText.textContent += blessing[index];
    index += 1;

    if (index >= blessing.length) {
      window.clearInterval(typingTimer);
      typingCursor.style.display = "none";
      isTyping = false;
    }
  }, 72);
}

function resetTypewriter() {
  window.clearInterval(typingTimer);
  isTyping = false;
  typingCursor.style.display = "inline-block";
  startTypewriter();
}

function createFloatingItem() {
  const symbols = [
    { text: "♡", type: "float-heart" },
    { text: "♥", type: "float-heart" },
    { text: "✦", type: "float-star" },
    { text: "✧", type: "float-star" },
    { text: "♉", type: "float-star" },
    { text: "🐷", type: "float-heart" }
  ];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const item = document.createElement("span");
  const size = 18 + Math.random() * 18;
  const left = Math.random() * 100;
  const duration = 7 + Math.random() * 5;
  const drift = -34 + Math.random() * 68;

  item.className = `float-item ${symbol.type}`;
  item.textContent = symbol.text;
  item.style.left = `${left}%`;
  item.style.setProperty("--size", `${size}px`);
  item.style.setProperty("--duration", `${duration}s`);
  item.style.setProperty("--drift", `${drift}px`);

  floatingLayer.appendChild(item);
  window.setTimeout(() => item.remove(), duration * 1000);
}

function startFloatingMagic() {
  if (floatingTimer || prefersReducedMotion) return;

  for (let i = 0; i < 14; i += 1) {
    window.setTimeout(createFloatingItem, i * 130);
  }

  floatingTimer = window.setInterval(createFloatingItem, 780);
}

function createFirework(x = 20 + Math.random() * 60, y = 12 + Math.random() * 38) {
  if (!fireworkLayer || prefersReducedMotion) return;

  const colors = ["#ffd166", "#ff8fab", "#fff3b0", "#d8a84f", "#ffffff"];
  const firework = document.createElement("span");
  const particleCount = 14 + Math.floor(Math.random() * 8);

  firework.className = "firework";
  firework.style.setProperty("--x", `${x}%`);
  firework.style.setProperty("--y", `${y}%`);

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("i");
    const angle = (Math.PI * 2 * i) / particleCount;
    const distance = 34 + Math.random() * 48;

    particle.className = "firework-particle";
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--particle-size", `${4 + Math.random() * 4}px`);
    particle.style.setProperty("--particle-color", colors[i % colors.length]);
    firework.appendChild(particle);
  }

  fireworkLayer.appendChild(firework);
  window.setTimeout(() => firework.remove(), 1100);
}

function startFireworks() {
  if (fireworkTimer || prefersReducedMotion) return;

  createFirework(50, 24);
  window.setTimeout(() => createFirework(28, 20), 420);
  window.setTimeout(() => createFirework(72, 30), 780);
  fireworkTimer = window.setInterval(() => createFirework(), 1350);
}

function createWishWord() {
  if (!wishWordLayer || prefersReducedMotion) return;

  const words = ["来财", "变美", "开心", "健康", "好运", "暴富", "顺遂", "闪闪发光", "福气满满"];
  const word = document.createElement("span");
  const left = 8 + Math.random() * 76;
  const duration = 6.8 + Math.random() * 2.8;
  const drift = -28 + Math.random() * 56;
  const tilt = -8 + Math.random() * 16;

  word.className = "wish-word";
  word.textContent = words[Math.floor(Math.random() * words.length)];
  word.style.setProperty("--left", `${left}%`);
  word.style.setProperty("--word-duration", `${duration}s`);
  word.style.setProperty("--word-drift", `${drift}px`);
  word.style.setProperty("--tilt", `${tilt}deg`);
  word.style.setProperty("--word-size", `${14 + Math.random() * 4}px`);

  wishWordLayer.appendChild(word);
  window.setTimeout(() => word.remove(), duration * 1000);
}

function startWishWords() {
  if (wishWordTimer || prefersReducedMotion) return;

  for (let i = 0; i < 8; i += 1) {
    window.setTimeout(createWishWord, i * 260);
  }

  wishWordTimer = window.setInterval(createWishWord, 950);
}

function createBurst(originElement, count = 24) {
  const rect = originElement.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const symbols = ["♡", "♥", "✦", "✧", "♉"];

  for (let i = 0; i < count; i += 1) {
    const item = document.createElement("span");
    const angle = (Math.PI * 2 * i) / count;
    const distance = 58 + Math.random() * 86;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    item.className = "burst-item";
    item.textContent = symbols[i % symbols.length];
    item.style.setProperty("--x", `${x}px`);
    item.style.setProperty("--y", `${y}px`);
    item.style.setProperty("--dx", `${dx}px`);
    item.style.setProperty("--dy", `${dy}px`);
    item.style.setProperty("--rotate", `${-28 + Math.random() * 56}deg`);
    item.style.setProperty("--size", `${15 + Math.random() * 16}px`);
    item.style.setProperty("--burst-color", i % 3 === 0 ? "#d8a84f" : "#e85e83");

    document.body.appendChild(item);
    window.setTimeout(() => item.remove(), 950);
  }
}

function openBirthdayPage() {
  if (hasOpenedSurprise) return;

  hasOpenedSurprise = true;
  createBurst(openSurprise, 32);
  document.body.classList.add("surprise-open");
  welcomeScreen.classList.add("is-hidden");
  requestMusicPlay();
  startFloatingMagic();
  startFireworks();
  startWishWords();
  window.setTimeout(startTypewriter, 850);
}

function openWishModal() {
  createBurst(wishButton, 22);
  createFirework(50, 24);
  wishModal.classList.add("is-open");
  wishModal.setAttribute("aria-hidden", "false");
  modalClose.focus();
}

function closeWishModal() {
  wishModal.classList.remove("is-open");
  wishModal.setAttribute("aria-hidden", "true");
  wishButton.focus();
}

openSurprise.addEventListener("click", openBirthdayPage);

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    requestMusicPlay();
  } else {
    pauseMusic();
  }
});

document.addEventListener("WeixinJSBridgeReady", () => {
  if (hasOpenedSurprise && shouldPlayMusic && bgMusic.paused) {
    playMusic();
  }
}, false);

wishButton.addEventListener("click", openWishModal);
modalClose.addEventListener("click", closeWishModal);

againButton.addEventListener("click", () => {
  closeWishModal();
  document.querySelector(".blessing-section").scrollIntoView({ behavior: "smooth" });
  resetTypewriter();
});

wishModal.addEventListener("click", (event) => {
  if (event.target === wishModal) {
    closeWishModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && wishModal.classList.contains("is-open")) {
    closeWishModal();
  }
});

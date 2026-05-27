const siteConfig = {
  friendName: "Mahi",
  letter: [
    "Heyy, happy birthday :)",
    "",
    "I know you're someone who likes keeping a little distance and avoids getting too attached, and honestly, that's completely okay. But even then, I hope you know you still deserve care, kindness, and people who genuinely look out for you.",
    "",
    "The kind of person you are is rare. Your nature, the way you talk, the comfort you give so effortlessly, it's something really special. Even though I've never heard your voice, your texts still somehow carry a softness that stays in my mind long after I read them.",
    "",
    "I truly adore the way you are, and I hope you never feel like you have to change yourself for anyone. And since you're my friend now, caring about you just comes naturally to me. I'll always be happy to be there for you whenever you need it.",
    "",
    "I'm genuinely really lucky to know someone like you.",
    "",
    "Happy birthday once again, and I hope this year treats you gently and gives you all the peace and happiness you deserve."
  ].join("\n")
};

const fallbackSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#47223f"/>
        <stop offset=".48" stop-color="#c77e91"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      <radialGradient id="r" cx="50%" cy="34%" r="48%">
        <stop stop-color="#ffd7cf" stop-opacity=".9"/>
        <stop offset="1" stop-color="#ffd7cf" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="900" height="1125" fill="url(#g)"/>
    <circle cx="450" cy="350" r="310" fill="url(#r)"/>
    <rect x="125" y="160" width="650" height="805" rx="48" fill="none" stroke="#fff3df" stroke-opacity=".42" stroke-width="3"/>
    <text x="450" y="532" text-anchor="middle" fill="#fff3df" font-family="Georgia, serif" font-size="54">Add reference.jpeg</text>
    <text x="450" y="604" text-anchor="middle" fill="#fff3df" fill-opacity=".8" font-family="Arial, sans-serif" font-size="25">Place your friend's photo in /assets</text>
  </svg>
`);

const fallbackImage = `data:image/svg+xml;charset=UTF-8,${fallbackSvg}`;

function setFriendName() {
  document.querySelectorAll("[data-friend-name]").forEach((element) => {
    element.textContent = siteConfig.friendName;
  });
}

function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-hidden"), 1600);
  });
}

function initImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.src = fallbackImage;
    }, { once: true });
  });
}

function initPaletteFromHero() {
  const image = document.getElementById("heroImage");
  if (!image) return;

  const sample = () => {
    if (!image.complete || image.naturalWidth === 0 || image.src.startsWith("data:")) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const width = 36;
    const height = 45;
    canvas.width = width;
    canvas.height = height;

    try {
      context.drawImage(image, 0, 0, width, height);
      const pixels = context.getImageData(0, 0, width, height).data;
      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;

      for (let index = 0; index < pixels.length; index += 16) {
        r += pixels[index];
        g += pixels[index + 1];
        b += pixels[index + 2];
        count += 1;
      }

      const average = {
        r: Math.round(r / count),
        g: Math.round(g / count),
        b: Math.round(b / count)
      };

      document.documentElement.style.setProperty("--rose", `rgb(${Math.min(255, average.r + 36)}, ${Math.min(255, average.g + 24)}, ${Math.min(255, average.b + 34)})`);
      document.documentElement.style.setProperty("--blush", `rgb(${Math.min(255, average.r + 70)}, ${Math.min(255, average.g + 58)}, ${Math.min(255, average.b + 52)})`);
      document.documentElement.style.setProperty("--plum", `rgb(${Math.max(22, average.r - 82)}, ${Math.max(16, average.g - 78)}, ${Math.max(22, average.b - 62)})`);
    } catch (error) {
      console.info("Palette sampling skipped because the image could not be read.", error);
    }
  };

  if (image.complete) sample();
  image.addEventListener("load", sample, { once: true });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

function initScrollProgress() {
  const progress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.width = `${amount * 100}%`;
  }, { passive: true });
}

function initParallax() {
  const card = document.querySelector("[data-parallax-card]");
  if (!card) return;

  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * -12;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  window.addEventListener("pointerleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

function initSmoothButtons() {
  document.querySelectorAll("[data-scroll-to]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initLetter() {
  const envelope = document.getElementById("envelope");
  const paper = document.getElementById("letterPaper");
  const typed = document.getElementById("typedLetter");
  let hasTyped = false;

  envelope.addEventListener("click", () => {
    envelope.classList.add("is-open");
    envelope.setAttribute("aria-expanded", "true");
    paper.classList.add("is-visible");

    if (!hasTyped) {
      hasTyped = true;
      typeText(typed, siteConfig.letter, 22);
    }
  });
}

function typeText(target, text, speed) {
  target.textContent = "";
  let index = 0;

  const timer = setInterval(() => {
    target.textContent += text.charAt(index);
    index += 1;
    if (index >= text.length) clearInterval(timer);
  }, speed);
}

function initHearts() {
  const button = document.getElementById("smileButton");
  const layer = document.getElementById("heartLayer");

  button.addEventListener("click", () => {
    for (let index = 0; index < 18; index += 1) {
      const heart = document.createElement("span");
      heart.className = "heart";
      heart.textContent = "♥";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 0.9}s`;
      heart.style.fontSize = `${1 + Math.random() * 1.4}rem`;
      layer.appendChild(heart);
      setTimeout(() => heart.remove(), 5200);
    }
  });
}

setFriendName();
initLoader();
initImageFallbacks();
initPaletteFromHero();
initReveal();
initCursorGlow();
initScrollProgress();
initParallax();
initSmoothButtons();
initLetter();
initHearts();

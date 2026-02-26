// HERO 3D PARALLAX
const cake = document.getElementById("cake3d");
document.addEventListener("mousemove", e => {
  const x = (window.innerWidth/2 - e.pageX)/25;
  const y = (window.innerHeight/2 - e.pageY)/25;
  cake.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateZ(20px)`;
});
const butterflies = document.querySelectorAll(".butterfly");
const sections = document.querySelectorAll("section");

// Initialize random positions
let positions = Array.from(butterflies).map(() => ({
  x: Math.random() * (window.innerWidth - 60),
  y: Math.random() * (window.innerHeight - 60)
}));

butterflies.forEach((b, i) => {
  b.style.left = positions[i].x + "px";
  b.style.top = positions[i].y + "px";
});

let lastScroll = window.scrollY;
let mouse = { x: -1000, y: -1000 }; // start far away

// Track mouse position
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Function to avoid collisions between butterflies
function avoidCollisions() {
  const minDistance = 70; // minimum allowed distance between butterflies
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < minDistance){
        // Push each butterfly away slightly
        const pushX = (dx / distance) * 2;
        const pushY = (dy / distance) * 2;
        positions[i].x += pushX;
        positions[i].y += pushY;
        positions[j].x -= pushX;
        positions[j].y -= pushY;
      }
    }
  }
}

// Main update loop
function updateButterflies() {
  butterflies.forEach((butterfly, i) => {
    let pos = positions[i];

    // Find visible section center
    const currentSection = Array.from(sections).find(sec => {
      const rect = sec.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

    let targetX = pos.x;
    let targetY = pos.y;

    if(currentSection){
      const rect = currentSection.getBoundingClientRect();
      targetX = rect.left + rect.width / 2 - 30;
      targetY = rect.top + rect.height / 2 - 30;
    }

    // Move toward section center
    pos.x += (targetX - pos.x) * 0.02;
    pos.y += (targetY - pos.y) * 0.02;

    // Move away from mouse if close
    const dx = pos.x - mouse.x;
    const dy = pos.y - mouse.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < 150){
      pos.x += (dx / distance) * 5;
      pos.y += (dy / distance) * 5;
    }

    // Random jitter on scroll
    if(scrollMoving){
      pos.x += Math.random() * 20 - 10;
      pos.y += Math.random() * 20 - 10;
    }

    // Keep within viewport
    pos.x = Math.min(Math.max(pos.x, 0), window.innerWidth - 60);
    pos.y = Math.min(Math.max(pos.y, 0), window.innerHeight - 60);

    // Apply to element
    butterfly.style.left = pos.x + "px";
    butterfly.style.top = pos.y + "px";
    butterfly.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
  });

  // Call collision avoidance after updating positions
  avoidCollisions();

  requestAnimationFrame(updateButterflies);
}

// Track scrolling
let scrollMoving = false;
let scrollTimeout;
window.addEventListener("scroll", () => {
  scrollMoving = true;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => scrollMoving = false, 200);
});

updateButterflies();
// GALLERY DATA
const galleries = {
  birthday: [
    "https://images.unsplash.com/photo-1542826438-bd32f43d626f",
    "https://images.unsplash.com/photo-1603073531625-1d9ec9fbb7ad",
    "https://images.unsplash.com/photo-1599785209798-6a1d0d8f3d2c"
  ],
  wedding: [
    "https://images.unsplash.com/photo-1621303837174-89787a7d4729",
    "https://images.unsplash.com/photo-1599785209798-6a1d0d8f3d2c",
    "https://images.unsplash.com/photo-1542826438-bd32f43d626f"
  ],
  custom: [
    "https://images.unsplash.com/photo-1604413191066-4dd20bedf486",
    "https://images.unsplash.com/photo-1603073531625-1d9ec9fbb7ad",
    "https://images.unsplash.com/photo-1551024601-bec78aea704b"
  ],
  cupcakes: [
    "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    "https://images.unsplash.com/photo-1519869325930-281384150729",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40"
  ]
};

// MODAL LOGIC
const modal = document.getElementById("galleryModal");
const galleryImages = document.getElementById("galleryImages");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".cake-card").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.gallery;
    galleryImages.innerHTML = "";
    galleries[type].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      galleryImages.appendChild(img);
    });
    modal.style.display = "flex";
  });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target===modal) modal.style.display="none"; };

// HERO 3D PARALLAX
const cake = document.getElementById("cake3d");
document.addEventListener("mousemove", e => {
  const x = (window.innerWidth/2 - e.pageX)/25;
  const y = (window.innerHeight/2 - e.pageY)/25;
  cake.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateZ(20px)`;
});

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
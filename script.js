let currentPage = 0;
const pages = document.querySelectorAll(".page");
let isScrolling = false;
let startY = 0;

function showPage(index) {
  if (isScrolling || index === currentPage) return;

  isScrolling = true;

  const direction = index > currentPage ? "down" : "up";

  const current = pages[currentPage];
  const next = pages[index];

  // reset all classes + inline transforms
  pages.forEach(p => {
    p.classList.remove("active", "prev");
    p.style.transform = "";
  });

  // current stays behind
  current.classList.add("prev");

  // 🔥 FORCE correct start position
  if (direction === "down") {
    next.style.transform = "translateY(100%)";  // from bottom
  } else {
    next.style.transform = "translateY(-100%)"; // from top
  }

  // 🔥 force browser to apply it
  next.offsetHeight;

  // animate to center
  next.style.transform = "translateY(0)";
  next.classList.add("active");

  currentPage = index;

  setTimeout(() => {
    isScrolling = false;
  }, 280);
}
// scroll
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentPage < pages.length - 1) {
    showPage(currentPage + 1);
  } else if (e.deltaY < 0 && currentPage > 0) {
    showPage(currentPage - 1);
  }
});

// touch
window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

window.addEventListener("touchend", (e) => {
  if (isScrolling) return;

  const endY = e.changedTouches[0].clientY;
  const diff = startY - endY;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    } else if (diff < 0 && currentPage > 0) {
      showPage(currentPage - 1);
    }
  }
});
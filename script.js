let currentPage = 0;
const pages = document.querySelectorAll(".page");
let startY = 0;
let isScrolling = false;

function showPage(index) {
  if (isScrolling) return;
  isScrolling = true;

  pages.forEach(p => p.classList.remove("active"));
  pages[index].classList.add("active");

  setTimeout(() => {
    isScrolling = false;
  }, 600);
}

// 🔹 Desktop
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentPage < pages.length - 1) {
    currentPage++;
  } else if (e.deltaY < 0 && currentPage > 0) {
    currentPage--;
  }

  showPage(currentPage);
});

// 🔹 Mobile (better detection)
window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  e.preventDefault(); // 🔥 stops normal scrolling
}, { passive: false });

window.addEventListener("touchend", (e) => {
  if (isScrolling) return;

  let endY = e.changedTouches[0].clientY;
  let diff = startY - endY;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentPage < pages.length - 1) {
      currentPage++;
    } else if (diff < 0 && currentPage > 0) {
      currentPage--;
    }

    showPage(currentPage);
  }
});
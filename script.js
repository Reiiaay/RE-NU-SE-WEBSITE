document.addEventListener("DOMContentLoaded", () => {
  // Mobile/desktop navigation is handled by normal HTML links.

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const resultMessage = document.getElementById("resultMessage");
  const cards = [...document.querySelectorAll(".research-card")];

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        cards.forEach(card => card.classList.remove("hidden"));
        if (resultMessage) resultMessage.textContent = "Browse a growing body of student research.";
        return;
      }

      let matches = 0;
      cards.forEach(card => {
        const searchable = (
          card.dataset.search + " " +
          card.querySelector("h3").textContent + " " +
          card.querySelector("p").textContent
        ).toLowerCase();

        const match = searchable.includes(query);
        card.classList.toggle("hidden", !match);
        if (match) matches++;
      });

      if (resultMessage) {
        resultMessage.textContent = `${matches} result${matches === 1 ? "" : "s"} found for "${searchInput.value.trim()}".`;
      }
    });
  }

  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      setTimeout(() => {
        const firstCard = document.querySelector(".research-card");
        if (firstCard) firstCard.animate(
          [{transform:"translateY(0)"},{transform:"translateY(-8px)"},{transform:"translateY(0)"}],
          {duration:600}
        );
      }, 300);
    });
  }

  const modal = document.getElementById("paperModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalClose = document.getElementById("modalClose");
  const paperLink = document.getElementById("paperLink");

  document.querySelectorAll(".read-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      if (!modal) return;
      modalTitle.textContent = link.dataset.title || "Research Paper";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  const fullPaperBtn = document.getElementById("fullPaperBtn");
  if (fullPaperBtn) {
    fullPaperBtn.addEventListener("click", event => {
      event.preventDefault();
      alert("Replace the # link in about.html with the URL or PDF file of your full research paper.");
    });
  }

  if (paperLink) {
    paperLink.addEventListener("click", event => {
      if (paperLink.getAttribute("href") === "#") {
        event.preventDefault();
        alert("Replace this link with the actual PDF or repository paper URL.");
      }
    });
  }
});

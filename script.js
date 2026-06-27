const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

const updateHeader = () => {
  if (!header) {
    return;
  }

  const isScrolled = window.scrollY > 16;
  header.classList.toggle("is-scrolled", isScrolled);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (navToggle && navMenu && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
    header.classList.toggle("is-open", !isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") {
      return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
    header.classList.remove("is-open");
  });
}

document.querySelectorAll("[data-mail-form]").forEach((form) => {
  const statusMessage = form.querySelector("[data-form-status]");
  const recipient = form.dataset.recipient || "hello@baselayersstudio.in";
  const subjectPrefix = form.dataset.subject || "BaseLayers Studio inquiry";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const subject = encodeURIComponent(`${subjectPrefix} from ${name || "website visitor"}`);
    const bodyLines = [];

    formData.forEach((value, key) => {
      bodyLines.push(`${key.replace(/-/g, " ")}: ${String(value).trim()}`);
    });

    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    if (statusMessage) {
      statusMessage.textContent = "Your email client is opening with the inquiry details.";
    }
  });
});

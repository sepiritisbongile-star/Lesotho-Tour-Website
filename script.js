function showImage(image) {
    let largeImage = document.getElementById("dojaImage");

    largeImage.src = image.src;
    largeImage.alt = image.alt;
}

let contactForm = document.getElementById("titanicForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        let response = document.getElementById("gladiatorResponse");

        if (name === "" || email === "" || subject === "" || message === "") {
            response.textContent = "Please complete all fields.";
            response.style.color = "red";
            return;
        }

        response.textContent = "Thank you, " + name + "! Your message has been received.";
        response.style.color = "green";

        contactForm.reset();
    });
}
(() => {
  const root = document.documentElement;
  const toggles = document.querySelectorAll(".mustang-toggle");
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function readSavedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function saveTheme(isDark) {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      // Fail gracefully if localStorage is unavailable
    }
  }

  function syncButtons(isDark) {
    toggles.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function applyTheme(isDark, shouldSave = false) {
    root.classList.toggle("dark", isDark);
    syncButtons(isDark);
    if (shouldSave) {
      saveTheme(isDark);
    }
  }

  // Initialize state on load
  const savedTheme = readSavedTheme();
  const initialDark = savedTheme ? savedTheme === "dark" : mediaQuery.matches;
  applyTheme(initialDark, false);

  // Toggle theme when any responsive toggle button is clicked
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextIsDark = !root.classList.contains("dark");
      applyTheme(nextIsDark, true);
    });
  });

  // Automatically follow OS theme changes ONLY if the user hasn't picked a manual override
  const handleSystemChange = (event) => {
    if (!readSavedTheme()) {
      applyTheme(event.matches, false);
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemChange);
  } else if (typeof mediaQuery.addListener === "function") {
    // Fallback for older mobile/desktop browsers
    mediaQuery.addListener(handleSystemChange);
  }
})();
(() => {
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const year = document.getElementById("year");

  // Atualiza o visual do cabeçalho ao rolar a página.
  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  // Configura o menu apenas se os elementos existirem.
  if (menuBtn && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("open", open);
      menuBtn.classList.toggle("open", open);

      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute(
        "aria-label",
        open ? "Fechar menu" : "Abrir menu"
      );
    };

    // Abre ou fecha o menu pelo botão.
    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    // Fecha o menu ao clicar em um link.
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });

    // Fecha o menu ao clicar fora dele e do botão.
    document.addEventListener("click", (event) => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";

      if (
        isOpen &&
        !nav.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    // Fecha o menu com Escape e devolve o foco ao botão.
    document.addEventListener("keydown", (event) => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";

      if (event.key === "Escape" && isOpen) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // Fecha o menu ao mudar para a versão desktop.
    const desktop = window.matchMedia("(min-width: 1025px)");

    const handleScreenChange = (event) => {
      if (event.matches) {
        setMenu(false);
      }
    };

    if (desktop.addEventListener) {
      desktop.addEventListener("change", handleScreenChange);
    } else if (desktop.addListener) {
      desktop.addListener(handleScreenChange);
    }
  }

  // Atualiza automaticamente o ano do rodapé.
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();

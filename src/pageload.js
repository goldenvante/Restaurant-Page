const pageLoad = (() => {
  //container
  const contentContainer = document.querySelector("#content");

  const header = document.createElement("header");
  header.innerHTML = `
  <nav>
  <h2>Food on Time</h2>
  <a href="#" class="hamburger">
    <span class="line line1"></span>
    <span class="line line2"></span>
    <span class="line line3"></span>
  </a>
  <ul class="links">
    <li data-tab-target="#home" class="tab red">Inicio</li>
    <li data-tab-target="#menu" class="tab">Menú</li>
    <li data-tab-target="#order" class="tab">Ordenar</li>
    <li data-tab-target="#contact" class="tab">Contáctanos</li>
  </ul>
</nav>`;

    contentContainer.appendChild(header)
})();

export { pageLoad };
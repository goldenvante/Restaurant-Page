const renderHomePage = (() => {
  //container
  const contentContainer = document.querySelector("#content");

  const home = document.createElement("div");
  home.classList.add("tab-content")
  home.innerHTML = `<div id="home" class="active" data-tab-content>
  <div class="hero">
    <h1>¡Ven a probar nuestra deliciosa comida!</h1>
    <p>¡Rica y a buen precio!</p>
    <div class="btn-container">
      <a data-tab-target="#order" class="order-now">Ordena ahora</a>
    </div>
  </div>
  <div class="info">
    <div class="address">
      <span><i class="fi-xnsuxl-map-marker-solid"></i></span>
      <p>Ejercito Nacional 0810<br /> CDMX 558390</p>
    </div>
    <div class="hours">
      <span><i class="fi-cnsuhl-clock-solid"></i></span>
      <p>
        <span>Lun-Jue:</span>8am-8pm<br /><span>Vie-Dom:</span
        >8am-11pm
      </p>
    </div>
  </div>
</div>`;

  contentContainer.appendChild(home);
})();

export { renderHomePage };

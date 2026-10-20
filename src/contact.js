const renderContactPage = (() => {
  //container
  const contentContainer = document.querySelector("#content");
  const contact = document.createElement("div");
  contact.setAttribute("id", "contact");
  contact.setAttribute("data-tab-content", "");
  contact.innerHTML = `
    <div class="hero">
    <h1>Contáctanos</h1>
  </div>
  <div class="contact-container">
    <div class="info">
      <div class="address">
        <p>
          <i class="fi-xnsuxl-map-marker-solid"></i>Ejercito Nacional 0810<br /> CDMX 558390
        </p>
      </div>
      <div class="hours">
        <p>
          <i class="fi-cnsuhl-clock-solid"></i
          ><span>Lun-Jue:</span>8am-8pm<br /><span>Vie-Dom:</span
          >8am-11pm
        </p>
      </div>
      <div class="phone">
        <p><i class="fi-xnsrxl-phone-solid"></i>(222)-888 5555</p>
      </div>
      <div class="contact-form">
        <form onsubmit="return false">
          <h3><i class="fi-xwsuxl-envelope-solid"></i>Envíanos un mensaje</h3>
          <div class="input-box">
            <input type="text" required />
            <span>Nombre completo</span>
          </div>
          <div class="input-box">
            <input type="text" required />
            <span>Correo electrónico</span>
          </div>
          <div class="input-box">
            <textarea required></textarea>
            <span>Escribe tu mensaje...</span>
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
    <iframe
      src="https://www.google.com/maps?q=19.4388161,-99.2020268&z=17&output=embed"
      width="600"
      height="450"
      frameborder="0"
      style="border: 0"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    ></iframe>
  </div>`;

  contentContainer.appendChild(contact);
})();

export { renderContactPage };

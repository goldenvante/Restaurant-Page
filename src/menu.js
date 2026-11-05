const renderMenuPage = (() => {
  //container
  const contentContainer = document.querySelector("#content");
  const menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  menu.setAttribute("data-tab-content", "");
  menu.innerHTML = `
  <div class="hero">
  <h1>Menú</h1>
  <img src="./images/chef.png" alt="" width="50" height="50" />
</div>
<div class="menu-container">
  <div class="menu-item">
    <img src="./images/hamburger.png" alt="" />
    <div class="item-content">
      <h4>Hamburguesa: <span>$120.00</span></h4>
      <p>
        Pan, carne, jitomate, cebolla, lechuga y nuestra receta familiar
        secreta.
      </p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/cheeseburger.png" alt="" />
    <div class="item-content">
      <h4>Cheeseburger: <span>$140.00</span></h4>
      <p>Similar a nuestra hamburguesa, pero con queso.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/double-cheeseburger.png" alt="" />
    <div class="item-content">
      <h4>Cheeseburger Doble: <span>$170.00</span></h4>
      <p>Similar a nuestra Cheeseburger, pero con una carne extra.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/steak.png" alt="" />
    <div class="item-content">
      <h4>Corte: <span>$250.00</span></h4>
      <p>Un jugoso bistec preparado exactamente como lo quieres.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/ribs.png" alt="" />
    <div class="item-content">
      <h4>Alitas: <span>$200.00</span></h4>
      <p>Alitas de pollo bañadas sobre la salsa de tu preferencia
      acompañadas de la guarnicion que prefieras.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/grilled-cheese.png" alt="" />
    <div class="item-content">
      <h4>Sandwich Cheese: <span>$100.00</span></h4>
      <p>
        Un sándwich de queso tostado y a la plancha, bañado en nuestra salsa
        especial.
      </p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/caesar-salad.png" alt="" />
    <div class="item-content">
      <h4>Ensalada Caesar: <span>$180.00</span></h4>
      <p>
        Nuestra ensalada César con el aderezo que prefieras.
      </p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/french-fries.png" alt="" />
    <div class="item-content">
      <h4>Papas a la francesa: <span>$65.00</span></h4>
      <p>
        A veces no quieres comer tu hamburguesa sola, ¿por qué no agregar
        unas papas a la francesa?
      </p>
    </div>
  </div>
  <h2 class="menu-section-title">Bebidas</h2>
  <div class="menu-item">
    <img src="./images/water.png" alt="Agua" />
    <div class="item-content">
      <h4>Agua: <span>$25.00</span></h4>
      <p>Botella de agua natural.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/soda.png" alt="Refresco" />
    <div class="item-content">
      <h4>Refresco: <span>$35.00</span></h4>
      <p>Refresco frío del sabor de tu preferencia.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/juice.png" alt="Jugo" />
    <div class="item-content">
      <h4>Jugo: <span>$30.00</span></h4>
      <p>Jugo frío de frutas de temporada.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/sparkling.png" alt="Agua mineral" />
    <div class="item-content">
      <h4>Agua mineral: <span>$32.00</span></h4>
      <p>Agua mineral bien fría.</p>
    </div>
  </div>
</div>`;

  contentContainer.appendChild(menu);
})();

export { renderMenuPage };

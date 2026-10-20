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
      <h4>Hamburger: <span>$2.49</span></h4>
      <p>
        Pan, carne, jitomate, cebolla, lechuga y nuestra receta familiar
        secreta.
      </p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/cheeseburger.png" alt="" />
    <div class="item-content">
      <h4>Cheeseburger: <span>$2.99</span></h4>
      <p>Similar a nuestra hamburguesa, pero con queso.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/double-cheeseburger.png" alt="" />
    <div class="item-content">
      <h4>Double Cheeseburger: <span>$3.49</span></h4>
      <p>Similar a nuestra Cheeseburger, pero con una carne extra.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/steak.png" alt="" />
    <div class="item-content">
      <h4>Steak: <span>$11.99</span></h4>
      <p>Un jugoso bistec preparado exactamente como lo quieres.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/ribs.png" alt="" />
    <div class="item-content">
      <h4>BBQ Ribs: <span>$8.99</span></h4>
      <p>Costillas de barbecue con el acompañamiento que elijas.</p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/grilled-cheese.png" alt="" />
    <div class="item-content">
      <h4>Grilled Cheese Sandwich: <span>$4.99</span></h4>
      <p>
        Un sándwich de queso tostado y a la plancha, bañado en nuestra salsa
        especial.
      </p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/caesar-salad.png" alt="" />
    <div class="item-content">
      <h4>Caesar Salad: <span>$7.99</span></h4>
      <p>
        Nuestra ensalada César con el aderezo que prefieras.
      </p>
    </div>
  </div>
  <div class="menu-item">
    <img src="./images/french-fries.png" alt="" />
    <div class="item-content">
      <h4>French Fries: <span>$1.99</span></h4>
      <p>
        A veces no quieres comer tu hamburguesa sola, ¿por qué no agregar
        unas papas a la francesa?
      </p>
    </div>
  </div>
</div>`;

  contentContainer.appendChild(menu);
})();

export { renderMenuPage };

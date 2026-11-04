import { cart, formatMoney } from "./cart.js";
import { updatePaymentSummary } from "./payment.js";

const menuItems = [
  { id: 1, name: "Hamburguesa", price: 120 },
  { id: 2, name: "Cheeseburger", price: 140 },
  { id: 3, name: "Cheeseburger Doble", price: 170 },
  { id: 4, name: "Corte", price: 250 },
  { id: 5, name: "Alitas", price: 200 },
  { id: 6, name: "Sandwich Cheese", price: 100 },
  { id: 7, name: "Ensalada Caesar ", price: 180 },
  { id: 8, name: "Papas a la francesa", price: 65},
  { id: 9, name: "Agua", price: 25 },
  { id: 10, name: "Refresco", price: 35 },
  { id: 11, name: "Jugo", price: 30 },
  { id: 12, name: "Agua mineral", price: 32 },
];

const extrasOptions = `
  <option value="0|Sin extras">Sin extras</option>
  <option value="15|Queso extra">Queso extra (+$15.00)</option>
  <option value="30|Tocino">Tocino (+$30.00)</option>
  <option value="15|Cebolla caramelizada">Cebolla caramelizada (+$15.00)</option>
  <option value="10|Jalapeños">Jalapeños (+$10.00)</option>
`;

const wingSauceOptions = `
  <option value="0|BBQ">BBQ</option>
  <option value="0|Tamarindo">Tamarindo</option>
  <option value="0|Lemon Pepper">Lemon Pepper</option>
  <option value="0|Mango Habanero">Mango Habanero</option>
  <option value="0|Bufalo picante">Búfalo picante</option>
  <option value="0|Habanero">Habanero</option>
  <option value="0|Diabla">Diabla</option>
`;

const renderOrderPage = (() => {
  const contentContainer = document.querySelector("#content");
  const order = document.createElement("div");
  order.setAttribute("id", "order");
  order.setAttribute("data-tab-content", "");

  const itemsHtml = menuItems
    .map(
      (item) => `
    <div class="order-item" data-item-id="${item.id}">
      <div class="order-item-header">
        <h4>${item.name}: <span>${formatMoney(item.price)}</span></h4>
      </div>
      <div class="order-item-options">
        <label>
          Cantidad:
          <input type="number" class="qty-input" min="1" max="20" value="1" />
        </label>
        <label>
          ${item.id === 5 ? "Salsa (sin costo):" : "Extras:"}
          <select class="extras-select">${item.id === 5 ? wingSauceOptions : extrasOptions}</select>
        </label>
      </div>
      <button type="button" class="add-to-cart-btn">Agregar al carrito</button>
    </div>`
    )
    .join("");

  order.innerHTML = `
  <div class="hero">
    <h1>Ordenar</h1>
  </div>
  <div class="order-container">
    <div class="order-menu">
      <h3>Elige tus platillos</h3>
      <div class="order-items-grid">
        ${itemsHtml}
      </div>
    </div>
    <div class="cart">
      <h3>Tu pedido</h3>
      <div class="cart-items" id="cart-items">
        <p class="cart-empty">Tu carrito está vacío</p>
      </div>
      <div class="cart-summary">
        <div class="cart-row">
          <span>Subtotal:</span>
          <span id="cart-subtotal">$0.00</span>
        </div>
        <div class="cart-row">
          <span>Envío:</span>
          <span id="cart-delivery">$0.00</span>
        </div>
        <div class="cart-row">
          <span>IVA (16%):</span>
          <span id="cart-tax">$0.00</span>
        </div>
        <div class="cart-row cart-total">
          <span>Total:</span>
          <span id="cart-total">$0.00</span>
        </div>
      </div>
      <button type="button" class="checkout-btn" id="checkout-btn">Proceder al pago</button>
    </div>
  </div>`;

  contentContainer.appendChild(order);

  const cartItemsEl = order.querySelector("#cart-items");
  const subtotalEl = order.querySelector("#cart-subtotal");
  const deliveryEl = order.querySelector("#cart-delivery");
  const taxEl = order.querySelector("#cart-tax");
  const totalEl = order.querySelector("#cart-total");

  const renderCart = () => {
    if (cart.items.length === 0) {
      cartItemsEl.innerHTML = `<p class="cart-empty">Tu carrito está vacío</p>`;
    } else {
      cartItemsEl.innerHTML = cart.items
        .map(
          (item) => `
        <div class="cart-item" data-key="${item.key}">
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <small>${item.extrasName} x${item.qty}</small>
          </div>
          <div class="cart-item-actions">
            <span>${formatMoney(item.unitPrice * item.qty)}</span>
            <button type="button" class="remove-item-btn" title="Eliminar">×</button>
          </div>
        </div>`
        )
        .join("");

      cartItemsEl.querySelectorAll(".remove-item-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const key = e.target.closest(".cart-item").dataset.key;
          cart.remove(key);
          renderCart();
        });
      });
    }

    subtotalEl.textContent = formatMoney(cart.getSubtotal());
    deliveryEl.textContent = formatMoney(cart.getDelivery());
    taxEl.textContent = formatMoney(cart.getTax());
    totalEl.textContent = formatMoney(cart.getTotal());
  };

  order.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemEl = e.target.closest(".order-item");
      const id = Number(itemEl.dataset.itemId);
      const item = menuItems.find((m) => m.id === id);
      const qty = Number(itemEl.querySelector(".qty-input").value) || 1;
      const extrasValue = itemEl.querySelector(".extras-select").value;
      const [extrasPrice, extrasName] = extrasValue.split("|");

      cart.add({
        id: item.id,
        name: item.name,
        qty,
        extrasName,
        unitPrice: item.price + Number(extrasPrice),
      });

      renderCart();

      btn.textContent = "¡Agregado!";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "Agregar al carrito";
        btn.classList.remove("added");
      }, 1000);
    });
  });

  order.querySelector("#checkout-btn").addEventListener("click", () => {
    if (cart.items.length === 0) {
      alert("Tu carrito está vacío. Agrega platillos primero.");
      return;
    }

    document.querySelectorAll("[data-tab-content]").forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    document.querySelectorAll(".links li").forEach((li) => {
      li.classList.remove("red");
    });
    document.querySelector("#payment").classList.add("active");
    updatePaymentSummary();
  });

  renderCart();
})();

export { renderOrderPage };

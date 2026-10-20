import { cart, formatMoney } from "./cart";
import { updatePaymentSummary } from "./payment";

const menuItems = [
  { id: 1, name: "Hamburger", price: 2.49 },
  { id: 2, name: "Cheeseburger", price: 2.99 },
  { id: 3, name: "Double Cheeseburger", price: 3.49 },
  { id: 4, name: "Steak", price: 11.99 },
  { id: 5, name: "BBQ Ribs", price: 8.99 },
  { id: 6, name: "Grilled Cheese Sandwich", price: 4.99 },
  { id: 7, name: "Caesar Salad", price: 7.99 },
  { id: 8, name: "French Fries", price: 1.99 },
];

const extrasOptions = `
  <option value="0|Sin extras">Sin extras</option>
  <option value="0.5|Queso extra">Queso extra (+$0.50)</option>
  <option value="0.75|Tocino">Tocino (+$0.75)</option>
  <option value="1|Cebolla caramelizada">Cebolla caramelizada (+$1.00)</option>
  <option value="1.5|Jalapeños">Jalapeños (+$1.50)</option>
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
          Extras:
          <select class="extras-select">${extrasOptions}</select>
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

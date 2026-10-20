import { cart, formatMoney } from "./cart";

const renderPaymentPage = (() => {
  const contentContainer = document.querySelector("#content");
  const payment = document.createElement("div");
  payment.setAttribute("id", "payment");
  payment.setAttribute("data-tab-content", "");

  payment.innerHTML = `
  <div class="hero">
    <h1>Pago</h1>
  </div>
  <div class="payment-container">
    <div class="payment-summary">
      <h3>Resumen del pedido</h3>
      <div class="payment-items" id="payment-items">
        <p class="cart-empty">Tu carrito está vacío</p>
      </div>
      <div class="cart-summary">
        <div class="cart-row">
          <span>Subtotal:</span>
          <span id="payment-subtotal">$0.00</span>
        </div>
        <div class="cart-row">
          <span>Envío:</span>
          <span id="payment-delivery">$0.00</span>
        </div>
        <div class="cart-row">
          <span>IVA (16%):</span>
          <span id="payment-tax">$0.00</span>
        </div>
        <div class="cart-row cart-total">
          <span>Total:</span>
          <span id="payment-total">$0.00</span>
        </div>
      </div>
    </div>
    <div class="payment-form-container">
      <h3><i class="fi-xnsrxl-creditcard-solid"></i>Datos de pago (ficticio)</h3>
      <form id="payment-form" onsubmit="return false">
        <div class="payment-grid">
          <div class="input-box">
            <input type="text" id="pay-name" required />
            <span>Nombre completo</span>
          </div>
          <div class="input-box">
            <input type="tel" id="pay-phone" required />
            <span>Teléfono</span>
          </div>
          <div class="input-box full-width">
            <input type="text" id="pay-address" required />
            <span>Dirección de entrega</span>
          </div>
          <div class="input-box full-width">
            <input type="text" id="pay-card" maxlength="19" required />
            <span>Número de tarjeta</span>
          </div>
          <div class="input-box">
            <input type="text" id="pay-expiry" maxlength="5" required />
            <span>Vencimiento (MM/AA)</span>
          </div>
          <div class="input-box">
            <input type="text" id="pay-cvv" maxlength="3" required />
            <span>CVV</span>
          </div>
          <div class="input-box full-width">
            <input type="text" id="pay-zip" required />
            <span>Código postal</span>
          </div>
        </div>
        <button type="submit" class="pay-btn" id="pay-btn">Pagar</button>
        <p class="payment-note">*Esta es una página de pago ficticia, no se realiza ningún cobro real.</p>
      </form>
      <div class="payment-success" id="payment-success">
        <h3>¡Gracias por tu pedido!</h3>
        <p>Tu pedido <strong id="order-number"></strong> fue recibido correctamente.</p>
        <p>Tu comida estará lista pronto.</p>
        <button type="button" class="back-to-menu-btn" id="back-to-menu-btn">Volver al menú</button>
      </div>
    </div>
  </div>`;

  contentContainer.appendChild(payment);

  const form = payment.querySelector("#payment-form");
  const successBox = payment.querySelector("#payment-success");
  const cardInput = payment.querySelector("#pay-card");
  const expiryInput = payment.querySelector("#pay-expiry");

  cardInput.addEventListener("input", () => {
    let value = cardInput.value.replace(/\D/g, "").slice(0, 16);
    cardInput.value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  });

  expiryInput.addEventListener("input", () => {
    let value = expiryInput.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    expiryInput.value = value;
  });

  form.addEventListener("submit", () => {
    if (cart.items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const orderNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;
    payment.querySelector("#order-number").textContent = orderNumber;

    form.style.display = "none";
    successBox.classList.add("show");

    cart.clear();
    updatePaymentSummary();
  });

  payment.querySelector("#back-to-menu-btn").addEventListener("click", () => {
    document.querySelectorAll("[data-tab-content]").forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    document.querySelectorAll(".links li").forEach((li) => {
      li.classList.remove("red");
    });
    document.querySelector('[data-tab-target="#menu"]').classList.add("red");
    document.querySelector("#menu").classList.add("active");

    form.reset();
    form.style.display = "block";
    successBox.classList.remove("show");
  });
})();

const updatePaymentSummary = () => {
  const itemsEl = document.querySelector("#payment-items");
  if (!itemsEl) return;

  if (cart.items.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Tu carrito está vacío</p>`;
  } else {
    itemsEl.innerHTML = cart.items
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <small>${item.extrasName} x${item.qty}</small>
        </div>
        <span>${formatMoney(item.unitPrice * item.qty)}</span>
      </div>`
      )
      .join("");
  }

  document.querySelector("#payment-subtotal").textContent = formatMoney(cart.getSubtotal());
  document.querySelector("#payment-delivery").textContent = formatMoney(cart.getDelivery());
  document.querySelector("#payment-tax").textContent = formatMoney(cart.getTax());
  document.querySelector("#payment-total").textContent = formatMoney(cart.getTotal());
};

export { renderPaymentPage, updatePaymentSummary };

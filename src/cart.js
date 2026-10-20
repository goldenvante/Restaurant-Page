const cart = {
  items: [],
  deliveryMode: "domicilio",

  add(item) {
    const key = `${item.id}|${item.extrasName}`;
    const existing = this.items.find((i) => i.key === key);
    if (existing) {
      existing.qty += item.qty;
    } else {
      this.items.push({ ...item, key });
    }
  },

  remove(key) {
    this.items = this.items.filter((i) => i.key !== key);
  },

  getSubtotal() {
    return this.items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  },

  getDelivery() {
    if (this.items.length === 0 || this.deliveryMode === "recoger") return 0;
    return 2.99;
  },

  getTax() {
    return this.getSubtotal() * 0.16;
  },

  getTotal() {
    return this.getSubtotal() + this.getDelivery() + this.getTax();
  },

  clear() {
    this.items = [];
    this.deliveryMode = "domicilio";
  },
};

const formatMoney = (amount) => `$${amount.toFixed(2)}`;

export { cart, formatMoney };

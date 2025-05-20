// Cart Management
class CartManager {
  constructor() {
    this.cart = [];
    this.listeners = [];
    this.loadFromLocalStorage();
  }
  
  /**
   * Add item to cart
   * @param {object} item - Menu item
   * @param {number} quantity - Quantity to add
   * @param {object} customizations - Selected customizations
   */
  addItem(item, quantity = 1, customizations = {}) {
    // Check if item with same customizations exists
    const existingItemIndex = this.findCartItemIndex(item.id, customizations);
    
    if (existingItemIndex !== -1) {
      // Increase quantity of existing item
      this.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: quantity,
        customizations: customizations
      });
    }
    
    this.saveToLocalStorage();
    this.notifyListeners();
  }
  
  /**
   * Update item quantity
   * @param {number} index - Item index in cart
   * @param {number} quantity - New quantity
   */
  updateQuantity(index, quantity) {
    if (index >= 0 && index < this.cart.length) {
      this.cart[index].quantity = Math.max(1, quantity);
      this.saveToLocalStorage();
      this.notifyListeners();
    }
  }
  
  /**
   * Remove item from cart
   * @param {number} index - Item index in cart
   */
  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveToLocalStorage();
      this.notifyListeners();
    }
  }
  
  /**
   * Clear the cart
   */
  clearCart() {
    this.cart = [];
    this.saveToLocalStorage();
    this.notifyListeners();
  }
  
  /**
   * Get cart items
   * @returns {Array} - Cart items
   */
  getItems() {
    return this.cart;
  }
  
  /**
   * Get cart count
   * @returns {number} - Total items in cart
   */
  getCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  /**
   * Calculate cart total
   * @returns {number} - Total price
   */
  getTotal() {
    return this.cart.reduce((total, item) => {
      return total + calculateItemTotal(item);
    }, 0);
  }
  
  /**
   * Find cart item index by id and customizations
   * @param {string} itemId - Item ID
   * @param {object} customizations - Customizations
   * @returns {number} - Index or -1 if not found
   */
  findCartItemIndex(itemId, customizations) {
    return this.cart.findIndex(cartItem => {
      if (cartItem.id !== itemId) return false;
      
      // Check if customizations match
      const cartCustomKeys = Object.keys(cartItem.customizations || {});
      const newCustomKeys = Object.keys(customizations || {});
      
      // If different number of customization types, not a match
      if (cartCustomKeys.length !== newCustomKeys.length) return false;
      
      // Check if all customization options match
      for (const type of cartCustomKeys) {
        if (!customizations[type] || cartItem.customizations[type].id !== customizations[type].id) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  /**
   * Save cart to localStorage
   */
  saveToLocalStorage() {
    localStorage.setItem('campusCanteenCart', JSON.stringify(this.cart));
  }
  
  /**
   * Load cart from localStorage
   */
  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('campusCanteenCart');
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
        this.cart = [];
      }
    }
  }
  
  /**
   * Add listener for cart changes
   * @param {Function} listener - Callback function
   */
  addListener(listener) {
    this.listeners.push(listener);
  }
  
  /**
   * Notify all listeners of cart changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.cart));
  }
}

// Create global cart instance
const cartManager = new CartManager();
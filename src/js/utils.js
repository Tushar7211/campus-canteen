/**
 * Format price to currency format
 * @param {number} price - Price in number
 * @returns {string} - Formatted price
 */
function formatPrice(price) {
  return `₹${price.toFixed(2)}`;
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Format date to readable format
 * @param {Date} date - Date object
 * @returns {string} - Formatted date
 */
function formatDate(date) {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {'success'|'error'} type - Type of toast
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) {
    console.error('Toast element not found');
    return;
  }
  const toastIcon = toast.querySelector('.toast-icon');
  const toastMessage = toast.querySelector('.toast-message');
  
  toastIcon.className = 'toast-icon';
  if (type === 'success') {
    toastIcon.classList.add('fas', 'fa-check-circle', 'success');
  } else if (type === 'error') {
    toastIcon.classList.add('fas', 'fa-exclamation-circle', 'error');
  }
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Toggle an element's active state
 * @param {HTMLElement} element - Element to toggle
 * @param {boolean} force - Force state
 */
function toggleElementActive(element, force) {
  if (!element) return;
  if (force !== undefined) {
    if (force) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  } else {
    element.classList.toggle('active');
  }
}

/**
 * Parse customization options from cart item
 * @param {object} cartItem - Cart item
 * @returns {string} - Formatted customization text
 */
function parseCustomizations(cartItem) {
  if (!cartItem || !cartItem.customizations || Object.keys(cartItem.customizations).length === 0) {
    return '';
  }

  return Object.entries(cartItem.customizations)
    .map(([type, value]) => {
      if (Array.isArray(value)) {
        return value
          .filter(opt => opt && opt.name && Number.isFinite(opt.price))
          .map(opt => `${type}: ${opt.name} (+₹${opt.price})`)
          .join(', ');
      } else if (value && value.name && Number.isFinite(value.price)) {
        return `${type}: ${value.name} (+₹${value.price})`;
      }
      return '';
    })
    .filter(text => text)
    .join(', ');
}

/**
 * Calculate the total price of a cart item including customizations
 * @param {object} cartItem - Cart item
 * @returns {number} - Total price
 */
function calculateItemTotal(cartItem) {
  if (!cartItem || !Number.isFinite(cartItem.price) || !Number.isFinite(cartItem.quantity)) {
    console.warn('Invalid cart item:', cartItem);
    return 0;
  }

  let total = cartItem.price * cartItem.quantity;

  if (cartItem.customizations) {
    Object.values(cartItem.customizations).forEach(value => {
      if (Array.isArray(value)) {
        value.forEach(option => {
          if (option && Number.isFinite(option.price)) {
            total += option.price * cartItem.quantity;
          }
        });
      } else if (value && Number.isFinite(value.price)) {
        total += value.price * cartItem.quantity;
      }
    });
  }

  return total;
}

/**
 * Get random order status for simulation
 * @returns {string} - Order status
 */
function getRandomOrderStatus() {
  const statuses = ['placed', 'preparing', 'ready', 'completed'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

/**
 * Filter menu items based on criteria
 * @param {Array} items - Menu items
 * @param {object} filters - Filter criteria
 * @returns {Array} - Filtered items
 */
function filterMenuItems(items, filters) {
  return items.filter(item => {
    if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }
    if (filters.searchTerm && !item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
        !item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.foodType === 'veg' && !item.isVeg) {
      return false;
    }
    if (filters.foodType === 'non-veg' && item.isVeg) {
      return false;
    }
    if (filters.maxPrice && item.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}
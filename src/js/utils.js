/**
 * Format price to currency format
 * @param {number} price - Price in number
 * @returns {string} - Formatted price
 */
function formatPrice(price) {
  return `₹${price}`;
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
  const toastIcon = toast.querySelector('.toast-icon');
  const toastMessage = toast.querySelector('.toast-message');
  
  // Set icon based on type
  toastIcon.className = 'toast-icon';
  if (type === 'success') {
    toastIcon.classList.add('fas', 'fa-check-circle', 'success');
  } else if (type === 'error') {
    toastIcon.classList.add('fas', 'fa-exclamation-circle', 'error');
  }
  
  // Set message
  toastMessage.textContent = message;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
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
  if (!cartItem.customizations || Object.keys(cartItem.customizations).length === 0) {
    return '';
  }
  
  let customizationText = '';
  
  Object.entries(cartItem.customizations).forEach(([type, option]) => {
    customizationText += `${option.name}, `;
  });
  
  // Remove trailing comma and space
  return customizationText.slice(0, -2);
}

/**
 * Calculate the total price of a cart item including customizations
 * @param {object} cartItem - Cart item
 * @returns {number} - Total price
 */
function calculateItemTotal(cartItem) {
  let totalPrice = cartItem.price;
  
  // Add customization prices
  if (cartItem.customizations) {
    Object.values(cartItem.customizations).forEach(option => {
      totalPrice += option.price || 0;
    });
  }
  
  // Multiply by quantity
  totalPrice *= cartItem.quantity;
  
  return totalPrice;
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
    // Filter by category
    if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm && !item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
        !item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by food type (veg/non-veg)
    if (filters.foodType === 'veg' && !item.isVeg) {
      return false;
    }
    if (filters.foodType === 'non-veg' && item.isVeg) {
      return false;
    }
    
    // Filter by price
    if (filters.maxPrice && item.price > filters.maxPrice) {
      return false;
    }
    
    return true;
  });
}
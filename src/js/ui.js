// UI Components and Rendering
class UIManager {
  constructor() {
    // Cache DOM elements
    this.menuPageElement = document.getElementById('menu-page');
    this.myOrdersPageElement = document.getElementById('my-orders-page');
    this.categoriesContainer = document.getElementById('categories');
    this.menuItemsContainer = document.getElementById('menu-items');
    this.cartItemsContainer = document.getElementById('cart-items');
    this.cartEmptyElement = document.getElementById('cart-empty');
    this.cartCountElement = document.getElementById('cart-count');
    this.cartTotalElement = document.getElementById('cart-total-price');
    this.myOrdersContainer = document.getElementById('my-orders-container');
    this.emptyOrdersMessage = document.getElementById('empty-orders-message');
    this.placeOrderButton = document.getElementById('place-order-btn');
    this.customizationBodyElement = document.getElementById('customization-body');
    this.orderConfirmationDetailsElement = document.getElementById('order-confirmation-details');
    
    // Current filter state
    this.currentFilters = {
      category: 'all',
      searchTerm: '',
      foodType: 'all',
      maxPrice: 500
    };
    
    // Store currently customizing item
    this.currentItem = null;
    this.currentCustomizations = {};
  }
  
  /**
   * Initialize UI and event listeners
   */
  initialize() {
    this.renderCategories();
    this.renderMenuItems();
    this.updateCartUI();
    this.renderOrders();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Listen for cart changes
    cartManager.addListener(() => this.updateCartUI());
  }
  
  /**
   * Set up all event listeners
   */
  initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.dataset.page;
        this.switchPage(targetPage);
      });
    });
    
    // Cart toggle
    document.getElementById('cart-icon').addEventListener('click', () => {
      this.toggleCart(true);
    });
    
    document.getElementById('close-cart').addEventListener('click', () => {
      this.toggleCart(false);
    });
    
    // Overlay click to close modals
    document.getElementById('overlay').addEventListener('click', () => {
      this.toggleCart(false);
      this.toggleCustomizationModal(false);
      this.toggleOrderConfirmationModal(false);
    });
    
    // Place order
    this.placeOrderButton.addEventListener('click', () => {
      this.handlePlaceOrder();
    });
    
    // Filter button
    document.getElementById('filter-btn').addEventListener('click', () => {
      const filtersPanel = document.getElementById('filters-panel');
      toggleElementActive(filtersPanel);
    });
    
    // Apply filters
    document.getElementById('apply-filters').addEventListener('click', () => {
      this.applyFilters();
    });
    
    // Price range slider
    const priceRangeInput = document.getElementById('price-range');
    const priceValueDisplay = document.getElementById('price-value');
    
    priceRangeInput.addEventListener('input', (e) => {
      const value = e.target.value;
      priceValueDisplay.textContent = `₹${value}`;
    });
    
    // Search input
    document.getElementById('search-input').addEventListener('input', (e) => {
      this.currentFilters.searchTerm = e.target.value;
      this.renderMenuItems();
    });
    
    // Customization modal close
    document.getElementById('close-customization').addEventListener('click', () => {
      this.toggleCustomizationModal(false);
    });
    
    document.getElementById('cancel-customization').addEventListener('click', () => {
      this.toggleCustomizationModal(false);
    });
    
    document.getElementById('add-to-cart-customized').addEventListener('click', () => {
      this.addCustomizedItemToCart();
    });
    
    // Order confirmation modal buttons
    document.getElementById('continue-shopping').addEventListener('click', () => {
      this.toggleOrderConfirmationModal(false);
      this.switchPage('menu');
    });
    
    document.getElementById('view-orders').addEventListener('click', () => {
      this.toggleOrderConfirmationModal(false);
      this.switchPage('my-orders');
    });
    
    // Browse menu button in empty orders
    document.getElementById('browse-menu-btn').addEventListener('click', () => {
      this.switchPage('menu');
    });
  }
  
  /**
   * Switch between pages
   * @param {string} pageName - Page to switch to
   */
  switchPage(pageName) {
    // Update active page
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    document.getElementById(`${pageName}-page`).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === pageName) {
        link.classList.add('active');
      }
    });
    
    // If switching to orders page, refresh orders
    if (pageName === 'my-orders') {
      this.renderOrders();
    }
  }
  
  /**
   * Toggle cart visibility
   * @param {boolean} show - Whether to show or hide
   */
  toggleCart(show) {
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.getElementById('overlay');
    
    toggleElementActive(cartModal, show);
    toggleElementActive(overlay, show);
  }
  
  /**
   * Toggle customization modal
   * @param {boolean} show - Whether to show or hide
   */
  toggleCustomizationModal(show) {
    const modal = document.getElementById('customization-modal');
    const overlay = document.getElementById('overlay');
    
    toggleElementActive(modal, show);
    toggleElementActive(overlay, show);
  }
  
  /**
   * Toggle order confirmation modal
   * @param {boolean} show - Whether to show or hide
   */
  toggleOrderConfirmationModal(show) {
    const modal = document.getElementById('order-confirmation-modal');
    const overlay = document.getElementById('overlay');
    
    toggleElementActive(modal, show);
    toggleElementActive(overlay, show);
  }
  
  /**
   * Render menu categories
   */
  renderCategories() {
    this.categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
      const isActive = category.id === this.currentFilters.category;
      
      const categoryElement = document.createElement('div');
      categoryElement.className = `category${isActive ? ' active' : ''}`;
      categoryElement.setAttribute('data-category', category.id);
      categoryElement.innerHTML = `
        <i class="fas ${category.icon}"></i>
        <span>${category.name}</span>
      `;
      
      categoryElement.addEventListener('click', () => {
        // Update active category
        document.querySelectorAll('.category').forEach(cat => {
          cat.classList.remove('active');
        });
        categoryElement.classList.add('active');
        
        // Update filter and render items
        this.currentFilters.category = category.id;
        this.renderMenuItems();
      });
      
      this.categoriesContainer.appendChild(categoryElement);
    });
  }
  
  /**
   * Render menu items based on current filters
   */
  renderMenuItems() {
    this.menuItemsContainer.innerHTML = '';
    
    // Apply filters
    const filteredItems = filterMenuItems(menuItems, this.currentFilters);
    
    if (filteredItems.length === 0) {
      this.menuItemsContainer.innerHTML = `
        <div class="empty-results">
          <p>No items match your filters. Try adjusting your search or filters.</p>
        </div>
      `;
      return;
    }
    
    filteredItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'menu-item animate-fade-in';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
        <div class="menu-item-info">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-badge badge-${item.isVeg ? 'veg' : 'non-veg'}">
              ${item.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          <p class="menu-item-description">${item.description}</p>
          <div class="menu-item-footer">
            <div class="menu-item-price">${formatPrice(item.price)}</div>
            <button class="add-to-cart-btn">
              <i class="fas fa-plus"></i>
              <span>Add</span>
            </button>
          </div>
        </div>
      `;
      
      // Add to cart click handler
      const addButton = itemElement.querySelector('.add-to-cart-btn');
      addButton.addEventListener('click', () => {
        // Check if item has customization options
        if (item.customizationOptions && item.customizationOptions.length > 0) {
          this.showCustomizationModal(item);
        } else {
          // Add to cart directly
          cartManager.addItem(item, 1);
          showToast(`${item.name} added to cart`, 'success');
        }
      });
      
      this.menuItemsContainer.appendChild(itemElement);
    });
  }
  
  /**
   * Apply filters from UI inputs
   */
  applyFilters() {
    // Get food type
    const foodTypeInputs = document.querySelectorAll('input[name="food-type"]');
    foodTypeInputs.forEach(input => {
      if (input.checked) {
        this.currentFilters.foodType = input.value;
      }
    });
    
    // Get price range
    const priceRange = document.getElementById('price-range');
    this.currentFilters.maxPrice = parseInt(priceRange.value);
    
    // Hide filters panel
    const filtersPanel = document.getElementById('filters-panel');
    toggleElementActive(filtersPanel, false);
    
    // Render filtered items
    this.renderMenuItems();
  }
  
  /**
   * Show customization modal for an item
   * @param {object} item - Menu item
   */
  showCustomizationModal(item) {
    this.currentItem = item;
    this.currentCustomizations = {};
    
    // Set modal content
    this.customizationBodyElement.innerHTML = '';
    
    item.customizationOptions.forEach(customizationGroup => {
      const sectionElement = document.createElement('div');
      sectionElement.className = 'customization-section';
      sectionElement.innerHTML = `
        <h4>${customizationGroup.type}</h4>
        <div class="customization-options" data-type="${customizationGroup.type}">
          ${customizationGroup.options.map(option => `
            <div class="customization-option" data-option-id="${option.id}">
              <div class="customization-option-info">
                <input type="radio" name="${customizationGroup.type}" id="${option.id}">
                <label for="${option.id}">${option.name}</label>
              </div>
              <div class="customization-option-price">${option.price > 0 ? `+${formatPrice(option.price)}` : ''}</div>
            </div>
          `).join('')}
        </div>
      `;
      
      this.customizationBodyElement.appendChild(sectionElement);
    });
    
    // Add event listeners to options
    document.querySelectorAll('.customization-option').forEach(optionElement => {
      optionElement.addEventListener('click', () => {
        const type = optionElement.closest('.customization-options').dataset.type;
        const optionId = optionElement.dataset.optionId;
        
        // Update selection in UI
        document.querySelectorAll(`.customization-options[data-type="${type}"] .customization-option`).forEach(el => {
          el.classList.remove('selected');
        });
        optionElement.classList.add('selected');
        
        // Check the radio button
        const radioInput = optionElement.querySelector('input[type="radio"]');
        radioInput.checked = true;
        
        // Update current customizations
        const option = item.customizationOptions
          .find(group => group.type === type)
          .options.find(opt => opt.id === optionId);
        
        this.currentCustomizations[type] = {
          id: option.id,
          name: option.name,
          price: option.price
        };
      });
    });
    
    // Show the modal
    this.toggleCustomizationModal(true);
  }
  
  /**
   * Add customized item to cart
   */
  addCustomizedItemToCart() {
    if (!this.currentItem) return;
    
    cartManager.addItem(this.currentItem, 1, this.currentCustomizations);
    showToast(`${this.currentItem.name} added to cart`, 'success');
    this.toggleCustomizationModal(false);
  }
  
  /**
   * Update cart UI with current cart items
   */
  updateCartUI() {
    const items = cartManager.getItems();
    const count = cartManager.getCount();
    const total = cartManager.getTotal();
    
    // Update cart count badge
    this.cartCountElement.textContent = count;
    
    // Update cart items
    this.cartItemsContainer.innerHTML = '';
    
    if (items.length === 0) {
      this.cartEmptyElement.classList.remove('hidden');
      this.placeOrderButton.disabled = true;
    } else {
      this.cartEmptyElement.classList.add('hidden');
      this.placeOrderButton.disabled = false;
      
      items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const customizationText = parseCustomizations(item);
        
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            ${customizationText ? `<div class="cart-item-customization">${customizationText}</div>` : ''}
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn decrease-btn" ${item.quantity <= 1 ? 'disabled' : ''}>
              <i class="fas fa-minus"></i>
            </button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="quantity-btn increase-btn">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        `;
        
        // Add event listeners
        const decreaseBtn = itemElement.querySelector('.decrease-btn');
        const increaseBtn = itemElement.querySelector('.increase-btn');
        
        decreaseBtn.addEventListener('click', () => {
          if (item.quantity <= 1) {
            // Remove item
            cartManager.removeItem(index);
          } else {
            // Decrease quantity
            cartManager.updateQuantity(index, item.quantity - 1);
          }
        });
        
        increaseBtn.addEventListener('click', () => {
          cartManager.updateQuantity(index, item.quantity + 1);
        });
        
        this.cartItemsContainer.appendChild(itemElement);
      });
    }
    
    // Update total
    this.cartTotalElement.textContent = formatPrice(total);
  }
  
  /**
   * Handle placing an order
   */
  handlePlaceOrder() {
    const cartItems = cartManager.getItems();
    const total = cartManager.getTotal();
    
    if (cartItems.length === 0) return;
    
    // Place order
    const newOrder = orderManager.placeOrder(cartItems, total);
    
    // Clear cart
    cartManager.clearCart();
    
    // Show confirmation
    this.showOrderConfirmation(newOrder);
    
    // Close cart
    this.toggleCart(false);
  }
  
  /**
   * Show order confirmation modal
   * @param {object} order - Order object
   */
  showOrderConfirmation(order) {
    this.orderConfirmationDetailsElement.innerHTML = `
      <div class="order-detail">
        <span class="order-detail-label">Order ID:</span>
        <span class="order-detail-value">${order.id}</span>
      </div>
      <div class="order-detail">
        <span class="order-detail-label">Date:</span>
        <span class="order-detail-value">${formatDate(order.date)}</span>
      </div>
      <div class="order-detail">
        <span class="order-detail-label">Items:</span>
        <span class="order-detail-value">${order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
      </div>
      <div class="order-detail">
        <span class="order-detail-label">Total:</span>
        <span class="order-detail-value">${formatPrice(order.total)}</span>
      </div>
    `;
    
    this.toggleOrderConfirmationModal(true);
  }
  
  /**
   * Render orders in My Orders page
   */
  renderOrders() {
    const orders = orderManager.getOrders();
    
    if (orders.length === 0) {
      this.emptyOrdersMessage.classList.remove('hidden');
    } else {
      this.emptyOrdersMessage.classList.add('hidden');
      
      // Clear orders container except for empty message
      const ordersContainer = document.querySelector('.my-orders-container');
      Array.from(ordersContainer.children).forEach(child => {
        if (!child.id.includes('empty-orders-message')) {
          child.remove();
        }
      });
      
      // Render each order
      orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card animate-slide-up';
        
        // Get status text and class
        let statusText = 'Placed';
        let statusClass = 'order-status-placed';
        
        switch (order.status) {
          case 'preparing':
            statusText = 'Preparing';
            statusClass = 'order-status-preparing';
            break;
          case 'ready':
            statusText = 'Ready for Pickup';
            statusClass = 'order-status-ready';
            break;
          case 'completed':
            statusText = 'Completed';
            statusClass = 'order-status-completed';
            break;
        }
        
        orderElement.innerHTML = `
          <div class="order-card-header">
            <div>
              <div class="order-id">${order.id}</div>
              <div class="order-date">${formatDate(order.date)}</div>
            </div>
            <div class="order-status">
              <span class="order-status-badge ${statusClass}">${statusText}</span>
            </div>
          </div>
          <div class="order-items">
            ${order.items.map(item => {
              const customizationText = parseCustomizations(item);
              return `
                <div class="order-item">
                  <span class="order-item-quantity">x${item.quantity}</span>
                  <div class="order-item-info">
                    <div class="order-item-title">${item.name}</div>
                    ${customizationText ? `<div class="order-item-customization">${customizationText}</div>` : ''}
                  </div>
                  <div class="order-item-price">${formatPrice(calculateItemTotal(item))}</div>
                </div>
              `;
            }).join('')}
          </div>
          <div class="order-card-footer">
            <span class="order-total-label">Total:</span>
            <span class="order-total-value">${formatPrice(order.total)}</span>
          </div>
        `;
        
        this.myOrdersContainer.insertBefore(orderElement, this.emptyOrdersMessage);
      });
    }
  }
}
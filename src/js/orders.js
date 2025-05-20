// Orders Management
class OrderManager {
  constructor() {
    this.orders = [];
    this.loadFromLocalStorage();
  }
  
  /**
   * Place a new order
   * @param {Array} cartItems - Items in cart
   * @param {number} total - Order total
   * @returns {object} - New order
   */
  placeOrder(cartItems, total) {
    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const orderDate = new Date();
    
    const newOrder = {
      id: orderId,
      date: orderDate,
      items: JSON.parse(JSON.stringify(cartItems)), // Deep copy
      total: total,
      status: 'placed',
      statusUpdates: [
        {
          status: 'placed',
          timestamp: orderDate
        }
      ]
    };
    
    this.orders.unshift(newOrder); // Add to beginning
    this.saveToLocalStorage();
    
    // Simulate order status updates
    this.simulateOrderProgress(orderId);
    
    return newOrder;
  }
  
  /**
   * Get all orders
   * @returns {Array} - Orders
   */
  getOrders() {
    return this.orders;
  }
  
  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {object|null} - Order object or null
   */
  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId) || null;
  }
  
  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   */
  updateOrderStatus(orderId, status) {
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return;
    
    this.orders[orderIndex].status = status;
    this.orders[orderIndex].statusUpdates.push({
      status: status,
      timestamp: new Date()
    });
    
    this.saveToLocalStorage();
  }
  
  /**
   * Simulate order progress for demonstration
   * @param {string} orderId - Order ID
   */
  simulateOrderProgress(orderId) {
    // Simulate preparing after 1 minute
    setTimeout(() => {
      this.updateOrderStatus(orderId, 'preparing');
      
      // Simulate ready after another 1-2 minutes
      const readyTime = Math.floor(Math.random() * 60000) + 60000; // 1-2 minutes
      setTimeout(() => {
        this.updateOrderStatus(orderId, 'ready');
        
        // Simulate completed after another 5 minutes
        setTimeout(() => {
          this.updateOrderStatus(orderId, 'completed');
        }, 5 * 60000); // 5 minutes
      }, readyTime);
    }, 60000); // 1 minute
  }
  
  /**
   * Save orders to localStorage
   */
  saveToLocalStorage() {
    localStorage.setItem('campusCanteenOrders', JSON.stringify(this.orders));
  }
  
  /**
   * Load orders from localStorage
   */
  loadFromLocalStorage() {
    const savedOrders = localStorage.getItem('campusCanteenOrders');
    if (savedOrders) {
      try {
        this.orders = JSON.parse(savedOrders);
        
        // Convert string dates back to Date objects
        this.orders.forEach(order => {
          order.date = new Date(order.date);
          order.statusUpdates.forEach(update => {
            update.timestamp = new Date(update.timestamp);
          });
        });
      } catch (e) {
        console.error('Error loading orders from localStorage:', e);
        this.orders = [];
      }
    }
  }
}

// Create global order instance
const orderManager = new OrderManager();
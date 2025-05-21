// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Create UI Manager instance
  const ui = new UIManager();
  
  // Initialize UI
  ui.initialize();
  
  // Add a few dummy orders for demonstration if none exist
  if (orderManager.getOrders().length === 0) {
    // Add sample orders for demo purposes
    const demoItems = [
      {
        id: 'item7',
        name: 'Classic Burger',
        price: 150,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 1,
        customizations: {
          'Add-ons': { id: 'addon6', name: 'Cheese', price: 15 },
          'Sides': { id: 'side1', name: 'Fries', price: 40 }
        }
      },
      {
        id: 'item8',
        name: 'Cappuccino',
        price: 80,
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 2,
        customizations: {
          'Size': { id: 'size4', name: 'Medium', price: 15 }
        }
      }
    ];
    
    const total = demoItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    
    // Create a demo order from 2 hours ago
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 2);
    
    const demoOrder = {
      id: `ORD${(Date.now() - 7200000).toString().slice(-6)}`,
      date: pastDate,
      items: demoItems,
      total: total,
      status: 'completed',
      statusUpdates: [
        { status: 'placed', timestamp: new Date(pastDate.getTime()) },
        { status: 'preparing', timestamp: new Date(pastDate.getTime() + 300000) },
        { status: 'ready', timestamp: new Date(pastDate.getTime() + 900000) },
        { status: 'completed', timestamp: new Date(pastDate.getTime() + 1800000) }
      ]
    };
    
    // Add to orders
    orderManager.orders.push(demoOrder);
    orderManager.saveToLocalStorage();
  } 
  // Render orders
  ui.renderOrders();
});
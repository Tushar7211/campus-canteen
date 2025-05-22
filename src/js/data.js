// Menu Categories
const categories = [
  { id: "all", name: "All", icon: "fa-utensils" },
  { id: "breakfast", name: "Breakfast", icon: "fa-mug-hot" },
  { id: "lunch", name: "Lunch", icon: "fa-bowl-food" },
  { id: "snacks", name: "Snacks", icon: "fa-cookie-bite" },
  { id: "beverages", name: "Beverages", icon: "fa-coffee" }
];

// Menu Items Data
const menuItems = [
  {
    id: "item1",
    name: "Breakfast Burrito",
    description: "Scrambled eggs, cheese, potatoes, and your choice Chicken egg or veggies wrapped in a warm tortilla.",
    price: 120,
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "breakfast",
    isVeg: false,
    tags: ["popular", "protein"],
    customizationOptions: [
      {
        type: "Protein",
        options: [
          { id: "protein1", name: "Chicken", price: 30 },
          { id: "protein2", name: "Egg", price: 20 },
          { id: "protein3", name: "No Meat (Vegetarian)", price: 0, default:true }
        ]
      },
      {
        type: "Extras",
        options: [
          { id: "extra1", name: "Extra Cheese", price: 15 },
          { id: "extra3", name: "Mayonnaise dip", price: 20 },
          { id: "extra2", name: "Tandoori dip", price: 25 }
          
        ]
      }
    ]
  },
  {
    id: "item2",
    name: "Avocado Toast",
    description: "Freshly smashed avocado on toasted whole grain bread with cherry tomatoes and microgreens.",
    price: 90,
    image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "breakfast",
    isVeg: true,
    tags: ["healthy", "vegan"],
    customizationOptions: [
      {
        type: "Add-ons",
        options: [
          { id: "addon1", name: "Poached Egg", price: 20 },
          { id: "addon2", name: "Feta Cheese", price: 15 },
          { id: "addon3", name: "Red Pepper Flakes", price: 5 }
        ]
      }
    ]
  },
  {
    id: "item3",
    name: "Chicken Caesar Salad",
    description: "Fresh romaine lettuce, grilled chicken, parmesan cheese, and croutons with Caesar dressing.",
    price: 150,
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "lunch",
    isVeg: false,
    tags: ["healthy", "protein"],
    customizationOptions: [
      {
        type: "Dressing",
        options: [
          { id: "dressing1", name: "Regular Caesar", price: 0, default:true },
          { id: "dressing2", name: "Light Caesar", price: 0 },
          { id: "dressing3", name: "Dressing on Side", price: 0 }
        ]
      },
      {
        type: "Extras",
        options: [
          { id: "extra4", name: "Extra Chicken", price: 15 },
          { id: "extra5", name: "Extra Parmesan", price: 20 },
          { id: "extra6", name: "Avocado", price: 25 }
        ]
      }
    ]
  },
  {
    id: "item4",
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables, herbs, and aromatic spices.",
    price: 130,
    image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "lunch",
    isVeg: true,
    tags: ["spicy", "popular"],
    customizationOptions: [
      {
        type: "Spice Level",
        options: [
          { id: "spice1", name: "Mild", price: 0, default:true },
          { id: "spice2", name: "Medium", price: 0 },
          { id: "spice3", name: "Spicy", price: 0 }
        ]
      },
      {
        type: "Add-ons",
        options: [
          { id: "addon4", name: "Raita", price: 15 },
          { id: "addon5", name: "Papad", price: 10 }
        ]
      }
    ]
  },
  {
    id: "item5",
    name: "Cheese Nachos",
    description: "Crispy tortilla chips topped with melted cheese, jalapeños, and served with salsa and sour cream.",
    price: 100,
    image: "https://images.pexels.com/photos/1108775/pexels-photo-1108775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "snacks",
    isVeg: true,
    tags: ["shareable", "popular"],
    customizationOptions: [
      {
        type: "Toppings",
        options: [
          { id: "topping1", name: "Extra Cheese", price: 20,},
          { id: "topping2", name: "Sour Cream", price: 25 },
          { id: "topping3", name: "Green Onions", price: 15 },
          { id: "topping4", name: "No extra toppings",default:true }
        ]
      }
    ]
  },
  {
    id: "item6",
    name: "French Fries",
    description: "Crispy golden fries sprinkled with salt and served with ketchup.",
    price: 70,
    image: "https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "snacks",
    isVeg: true,
    tags: ["crispy", "shareable"],
    customizationOptions: [
      {
        type: "Size",
        options: [
          { id: "size1", name: "Regular", price: 0,default:true },
          { id: "size2", name: "Large", price: 30 }
        ]
      },
      {
        type: "Seasoning",
        options: [
          { id: "seasoning1", name: "Plain Salt", price: 0,default:true },
          { id: "seasoning2", name: "Peri-Peri", price: 10 },
          { id: "seasoning3", name: "Cheese Dust", price: 15 }
        ]
      },
      {
        type: "Dips",
        options: [
          { id: "dip1", name: "Ketchup", price: 0,default:true },
          { id: "dip2", name: "Mayonnaise", price: 10 },
          { id: "dip3", name: "Chipotle Sauce", price: 15 }
        ]
      }
    ]
  },
  {
    id: "item7",
    name: "Classic Burger",
    description: "Juicy Chicken patty with lettuce, tomato, onion, and our special sauce in a toasted bun.",
    price: 150,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "lunch",
    isVeg: false,
    tags: ["popular", "bestseller"],
    customizationOptions: [
      {
        type: "Add-ons",
        options: [
          { id: "addon6", name: "Cheese", price: 15 },
          { id: "addon7", name: "Extra Sauces", price: 25 },
          { id: "addon8", name: "Extra Patty", price: 40 }
        ]
      },
      {
        type: "Sides",
        options: [
          { id: "side1", name: "Fries", price: 40 },
          { id: "side2", name: "Onion Rings", price: 45 }
        ]
      }
    ]
  },
  {
    id: "item8",
    name: "Cappuccino",
    description: "Espresso with steamed milk and a deep layer of foam.",
    price: 80,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "beverages",
    isVeg: true,
    tags: ["hot", "coffee"],
    customizationOptions: [
      {
        type: "Milk",
        options: [
          { id: "milk1", name: "Regular", price: 0,default:true },
          { id: "milk2", name: "Almond", price: 20 },
          { id: "milk3", name: "Oat", price: 20 }
        ]
      },
      {
        type: "Size",
        options: [
          { id: "size3", name: "Small", price: 0,default:true },
          { id: "size4", name: "Medium", price: 15 },
          { id: "size5", name: "Large", price: 30 }
        ]
      },
      {
        type: "Extras",
        options: [
          { id: "extra7", name: "Maple syrup", price: 15 },
          { id: "extra8", name: "Vanilla Syrup", price: 15 },
          { id: "extra9", name: "Caramel Syrup", price: 15 }
        ]
      }
    ]
  },
  {
    id: "item9",
    name: "Mango Smoothie",
    description: "Fresh mango blended with yogurt and a hint of honey.",
    price: 100,
    image: "https://images.pexels.com/photos/2113915/pexels-photo-2113915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "beverages",
    isVeg: true,
    tags: ["cold", "refreshing"],
    customizationOptions: [
      {
        type: "Base",
        options: [
          { id: "base1", name: "Yogurt", price: 0,default:true },
          { id: "base2", name: "Almond Milk", price: 20 },
          { id: "base3", name: "Coconut Milk", price: 20 }
        ]
      },
      {
        type: "Add-ins",
        options: [
          { id: "addin1", name: "Vanilla Ice Cream", price: 15 },
          { id: "addin2", name: "Choclate Ice Cream", price: 20 },
          { id: "addin3", name: "Mango Ice Cream", price: 20 }
        ]
      }
    ]
  },
  {
    id: "item10",
    name: "Chocolate Chip Cookies",
    description: "Freshly baked cookies with generous chunks of chocolate.",
    price: 60,
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "snacks",
    isVeg: true,
    tags: ["sweet", "dessert"],
    customizationOptions: [
      {
        type: "Quantity",
        options: [
          { id: "quantity1", name: "2 Cookies", price: 0,default:true },
          { id: "quantity2", name: "4 Cookies", price: 60 },
          { id: "quantity3", name: "6 Cookies", price: 120 }
        ]
      },
      {
        type: "Add-ons",
        options: [
          { id: "addon9", name: "Ice Cream Scoop", price: 30 },
          { id: "addon10", name: "Hot Chocolate Dip", price: 25 }
        ]
      }
    ]
  },
  {
    id: "item11",
    name: "Paneer Tikka Sandwich",
    description: "Grilled paneer tikka with onions, peppers, and mint chutney in toasted bread.",
    price: 120,
    image: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "lunch",
    isVeg: true,
    tags: ["spicy", "popular"],
    customizationOptions: [
      {
        type: "Bread",
        options: [
          { id: "bread1", name: "White Bread", price: 0,default:true },
          { id: "bread2", name: "Brown Bread", price: 10 },
          { id: "bread3", name: "Multigrain Bread", price: 15 }
        ]
      },
      {
        type: "Spice Level",
        options: [
          { id: "spice4", name: "Mild", price: 0,default:true },
          { id: "spice5", name: "Medium", price: 0 },
          { id: "spice6", name: "Spicy", price: 0 }
        ]
      }
    ]
  },
  {
    id: "item12",
    name: "Masala Chai",
    description: "Traditional Indian tea brewed with milk and aromatic spices.",
    price: 40,
    image: "https://images.pexels.com/photos/2262832/pexels-photo-2262832.jpeg",
    category: "beverages",
    isVeg: true,
    tags: ["hot", "popular"],
    customizationOptions: [
      {
        type: "Sweetness",
        options: [
          { id: "sweet1", name: "Regular", price: 0,default:true },
          { id: "sweet2", name: "Less Sweet", price: 0 },
          { id: "sweet3", name: "No Sugar", price: 0 }
        ]
      },
      {
        type: "Size",
        options: [
          { id: "size6", name: "Small", price: 0,default:true },
          { id: "size7", name: "Medium", price: 15 },
          { id: "size8", name: "Large", price: 25 }
        ]
      }
    ]
  }
];
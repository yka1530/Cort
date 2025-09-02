import { useState } from 'react'
import './App.css'

// Import images
import deliExterior from './assets/IMG_2346.jpeg'
import deliNight from './assets/IMG_2347.jpeg'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [language, setLanguage] = useState('en')
  const [customization, setCustomization] = useState({
    breadType: 'roll',
    sauces: {},
    vegetables: {},
    cheese: '',
    temperature: 'cold',
    toastBread: false,
    size: 'small',
    creamer: '',
    sugar: '0',
    teaType: '',
    specialInstructions: ''
  })

  // Menu data
  const menuData = {
    "Breakfast": [
      {"item": "Egg & Cheese", "base_price": 3.49, "description": "Fresh eggs with melted cheese", "category": "sandwich"},
      {"item": "Grilled Cheese", "base_price": 1.99, "description": "Classic grilled cheese sandwich", "category": "sandwich"},
      {"item": "Butter Roll / Bagel", "base_price": 1.49, "description": "Fresh roll or bagel with butter", "category": "sandwich"},
      {"item": "Bagel with Cream Cheese", "base_price": 1.99, "description": "Bagel with cream cheese", "category": "sandwich"},
      {"item": "Veggie Cream Cheese", "base_price": 4.99, "description": "Vegetable cream cheese spread", "category": "sandwich"},
      {"item": "Bacon, Egg & Cheese", "base_price": 4.99, "description": "Crispy bacon with egg and cheese", "category": "sandwich"},
      {"item": "Sausage, Egg & Cheese", "base_price": 4.99, "description": "Sausage with egg and cheese", "category": "sandwich"},
      {"item": "Steak Egg & Cheese", "base_price": 7.99, "description": "Grilled steak with egg and cheese", "category": "sandwich"},
      {"item": "Bacon, Lettuce & Tomato", "base_price": 4.99, "description": "Classic BLT sandwich", "category": "sandwich"},
      {"item": "Pancakes (3)", "base_price": 5.99, "description": "Three fluffy pancakes", "category": "plate"},
      {"item": "French Toast (3)", "base_price": 5.99, "description": "Three pieces of French toast", "category": "plate"}
    ],
    "Lunch & Dinner": [
      {"item": "Philly Cheese Steak", "base_price": 8.99, "description": "Classic Philly with peppers and onions", "category": "sandwich"},
      {"item": "Pastrami Sandwich", "base_price": 7.99, "description": "Premium pastrami", "category": "sandwich"},
      {"item": "Turkey Sandwich", "base_price": 6.99, "description": "Fresh sliced turkey", "category": "sandwich"},
      {"item": "Roast Beef Sandwich", "base_price": 7.99, "description": "Tender roast beef", "category": "sandwich"},
      {"item": "Tuna Salad Sandwich", "base_price": 6.99, "description": "Fresh tuna salad", "category": "sandwich"},
      {"item": "Chicken Cutlet", "base_price": 7.99, "description": "Breaded chicken cutlet", "category": "sandwich"},
      {"item": "Grilled Chicken", "base_price": 7.99, "description": "Grilled chicken breast", "category": "sandwich"},
      {"item": "Chicken Caesar Salad", "base_price": 8.99, "description": "Grilled chicken with Caesar dressing", "category": "salad"},
      {"item": "Garden Salad", "base_price": 6.99, "description": "Fresh mixed greens", "category": "salad"}
    ],
    "Beverages": [
      {"item": "Hot Coffee", "base_price": 1.99, "large_price": 2.49, "description": "Fresh brewed coffee", "category": "beverage"},
      {"item": "Iced Coffee", "base_price": 2.49, "large_price": 2.99, "description": "Cold brewed coffee", "category": "beverage"},
      {"item": "Hot Chocolate", "base_price": 2.99, "large_price": 3.49, "description": "Rich hot chocolate", "category": "beverage"},
      {"item": "Tea", "base_price": 1.99, "large_price": 2.49, "description": "Various tea options", "category": "beverage"}
    ],
    "EBT Items": [
      {"item": "Cold Turkey Sandwich", "base_price": 6.99, "description": "Cold turkey sandwich (EBT eligible)", "category": "sandwich"},
      {"item": "Cold Ham Sandwich", "base_price": 6.99, "description": "Cold ham sandwich (EBT eligible)", "category": "sandwich"},
      {"item": "Cold Roast Beef Sandwich", "base_price": 7.99, "description": "Cold roast beef sandwich (EBT eligible)", "category": "sandwich"},
      {"item": "Tuna Salad Sandwich", "base_price": 6.99, "description": "Cold tuna salad sandwich (EBT eligible)", "category": "sandwich"}
    ]
  }

  // Bread types
  const breadTypes = [
    { value: 'roll', label: 'Roll', price: 0.75 },
    { value: 'hero', label: 'Hero', price: 2.00 },
    { value: 'bagel', label: 'Bagel', price: 0 },
    { value: 'wrap', label: 'Wrap', price: 2.00 },
    { value: 'slice', label: 'Slice', price: 0 },
    { value: 'croissant', label: 'Croissant', price: 1.25 },
    { value: 'burger_bun', label: 'Burger Bun', price: 0 }
  ]

  // Sauces
  const sauces = [
    { key: 'hot_sauce', label: 'Hot Sauce' },
    { key: 'ketchup', label: 'Ketchup' },
    { key: 'mayo', label: 'Mayo' },
    { key: 'mustard', label: 'Mustard' },
    { key: 'honey_mustard', label: 'Honey Mustard' },
    { key: 'white_sauce', label: 'White Sauce' },
    { key: 'ranch', label: 'Ranch' },
    { key: 'triple_mayo', label: 'Triple Mayo' },
    { key: 'halal_sauce', label: 'Halal Sauce (Very Hot 🔥)' },
    { key: 'buffalo', label: 'Buffalo' },
    { key: 'bbq', label: 'BBQ' }
  ]

  // Vegetables
  const vegetables = [
    { key: 'tomato', label: 'Tomato', price: 0 },
    { key: 'cucumber', label: 'Cucumber', price: 0 },
    { key: 'green_pepper', label: 'Green Pepper', price: 0 },
    { key: 'lettuce', label: 'Lettuce', price: 0 },
    { key: 'red_onion', label: 'Red Onion', price: 0 },
    { key: 'white_onion', label: 'White Onion', price: 0 },
    { key: 'jalapeno', label: 'Jalapeño', price: 0 },
    { key: 'sweet_pepper', label: 'Sweet Pepper', price: 0 },
    { key: 'avocado', label: 'Avocado', price: 1.00 },
    { key: 'spinach', label: 'Spinach', price: 0 },
    { key: 'pickles', label: 'Pickles', price: 0 },
    { key: 'banana_peppers', label: 'Banana Peppers', price: 0 }
  ]

  // Cheese types
  const cheeseTypes = [
    { value: '', label: 'No Cheese', price: 0 },
    { value: 'american_yellow', label: 'American Yellow', price: 0.20 },
    { value: 'american_white', label: 'American White', price: 0.20 },
    { value: 'mozzarella', label: 'Mozzarella', price: 0.20 },
    { value: 'pepper_jack', label: 'Pepper Jack', price: 0.20 },
    { value: 'cheddar', label: 'Cheddar', price: 0.20 },
    { value: 'swiss', label: 'Swiss', price: 0.20 },
    { value: 'muenster', label: 'Muenster', price: 0.20 },
    { value: 'three_pepper_jack', label: 'Three Pepper Jack', price: 0.20 }
  ]

  const calculateItemPrice = (item, customization) => {
    let price = customization.size === 'large' && item.large_price ? item.large_price : item.base_price
    
    if (item.category === 'sandwich') {
      const bread = breadTypes.find(b => b.value === customization.breadType)
      if (bread) price += bread.price
      
      if (customization.cheese) {
        const cheese = cheeseTypes.find(c => c.value === customization.cheese)
        if (cheese) price += cheese.price
      }
      
      Object.entries(customization.vegetables).forEach(([key, selected]) => {
        if (selected) {
          const veg = vegetables.find(v => v.key === key)
          if (veg && veg.price > 0) price += veg.price
        }
      })
    }
    
    return price
  }

  const addToCart = (item, customization) => {
    const cartItem = {
      id: Date.now(),
      item: item,
      customization: customization,
      price: calculateItemPrice(item, customization)
    }
    setCart([...cart, cartItem])
    setIsCustomizing(false)
    setSelectedItem(null)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0)
  }

  const getTotalPrice = () => {
    const subtotal = getSubtotal()
    if (paymentMethod === 'card') {
      return subtotal + (subtotal * 0.04)
    }
    return subtotal
  }

  const openCustomization = (item) => {
    setSelectedItem(item)
    setCustomization({
      breadType: 'roll',
      sauces: {},
      vegetables: {},
      cheese: '',
      temperature: 'cold',
      toastBread: false,
      size: item.large_price ? 'small' : 'small',
      creamer: '',
      sugar: '0',
      teaType: item.item === 'Tea' ? 'Green Tea' : '',
      specialInstructions: ''
    })
    setIsCustomizing(true)
  }

  const generateOrderText = () => {
    let orderText = "🍽️ New Order - Cortelyou Road Deli\n\n"
    
    cart.forEach((cartItem, index) => {
      orderText += `${index + 1}. ${cartItem.item.item}\n`
      
      if (cartItem.item.category === 'sandwich') {
        const breadType = breadTypes.find(b => b.value === cartItem.customization.breadType)
        orderText += `   Bread: ${breadType?.label}\n`
        
        if (cartItem.customization.temperature) {
          orderText += `   Temperature: ${cartItem.customization.temperature}\n`
        }
        
        if (cartItem.customization.cheese) {
          const cheese = cheeseTypes.find(c => c.value === cartItem.customization.cheese)
          orderText += `   Cheese: ${cheese?.label}\n`
        }
        
        const selectedSauces = Object.entries(cartItem.customization.sauces)
          .filter(([key, value]) => value)
          .map(([key, value]) => sauces.find(s => s.key === key)?.label)
          .filter(Boolean)
        
        if (selectedSauces.length > 0) {
          orderText += `   Sauces: ${selectedSauces.join(', ')}\n`
        }
        
        const selectedVegetables = Object.entries(cartItem.customization.vegetables)
          .filter(([key, value]) => value)
          .map(([key, value]) => vegetables.find(v => v.key === key)?.label)
          .filter(Boolean)
        
        if (selectedVegetables.length > 0) {
          orderText += `   Vegetables: ${selectedVegetables.join(', ')}\n`
        }
      }
      
      if (cartItem.customization.specialInstructions) {
        orderText += `   Special Instructions: ${cartItem.customization.specialInstructions}\n`
      }
      
      orderText += `   Price: $${cartItem.price.toFixed(2)}\n\n`
    })
    
    const subtotal = getSubtotal()
    orderText += `Subtotal: $${subtotal.toFixed(2)}\n`
    
    if (paymentMethod === 'card') {
      const tax = subtotal * 0.04
      orderText += `Tax (4%): $${tax.toFixed(2)}\n`
    }
    
    orderText += `💰 Total: $${getTotalPrice().toFixed(2)}\n`
    orderText += `Payment Method: ${paymentMethod === 'cash' ? 'Cash' : 'Card'}\n`
    orderText += `Customer: ${customerName}\n\n`
    
    orderText += "⚠️ IMPORTANT: In case of order cancellation, please send a message immediately. "
    orderText += "Failure to pick up a ready order may result in being blocked and unable to order again.\n\n"
    
    orderText += "Thank You For Choosing Cortelyou Road Deli! 🙏"
    
    return orderText
  }

  const sendOrder = () => {
    if (!customerName.trim()) {
      alert('Please enter your name before sending the order.')
      return
    }
    
    const orderText = generateOrderText()
    const phoneNumber = "+17184847748"
    const encodedText = encodeURIComponent(orderText)
    const smsUrl = `sms:${phoneNumber}?body=${encodedText}`
    window.open(smsUrl, '_blank')
  }

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={deliExterior} 
          alt="Cortelyou Road Deli Exterior" 
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-2xl">
            <div className="bg-red-600 text-white p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.88-6.88 1.37-1.37z"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cortelyou Road Deli & Grocery Store
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Your neighborhood deli & grocery serving fresh, delicious food daily
            </p>
            <button 
              onClick={() => setCurrentPage('menu')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Breakfast</h3>
              <p className="text-gray-600">Start your day with our delicious breakfast sandwiches, fresh bagels, and hot coffee.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gourmet Sandwiches</h3>
              <p className="text-gray-600">Premium cold cuts, fresh ingredients, and artisan breads make our sandwiches special.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
              <p className="text-gray-600">Friendly staff and quick service make us your go-to neighborhood deli.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <span className="text-lg font-medium">ATM Available</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <span className="text-lg font-medium">EBT Accepted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Location
              </h3>
              <p className="text-gray-600 mb-4">
                1626 Cortelyou Rd<br />
                Brooklyn, NY 11226<br />
                United States
              </p>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8 10v4l4 2.5L16 14v-4l-4-2.5L8 10z"/>
                  </svg>
                  <span>Open Daily: 6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>+1 (718) 484-7748</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>info@cortdeli.com</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={deliNight} 
                alt="Deli at Night" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Menu Page Component
  const MenuPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu</h1>
          <p className="text-gray-600">Fresh ingredients, made to order</p>
        </div>

        <div className="space-y-6">
          {Object.entries(menuData).map(([category, items]) => (
            <div key={category} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white py-4 px-6">
                <h2 className="text-xl font-bold">{category}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.item}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Starting at ${item.base_price.toFixed(2)}
                          {item.large_price && ` - $${item.large_price.toFixed(2)}`}
                        </span>
                      </div>
                      <button 
                        onClick={() => openCustomization(item)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-4 transition-colors"
                      >
                        Customize & Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Cart Page Component
  const CartPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your order before sending</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">Add some delicious items from our menu!</p>
            <button 
              onClick={() => setCurrentPage('menu')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((cartItem) => (
              <div key={cartItem.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{cartItem.item.item}</h3>
                    {cartItem.item.category === 'sandwich' && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">
                          Bread: {breadTypes.find(b => b.value === cartItem.customization.breadType)?.label}
                        </p>
                        {cartItem.customization.cheese && (
                          <p className="text-sm text-gray-600 mb-1">
                            Cheese: {cheeseTypes.find(c => c.value === cartItem.customization.cheese)?.label}
                          </p>
                        )}
                      </>
                    )}
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      ${cartItem.price.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(cartItem.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            
            {/* Customer Info and Payment */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Cash
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Card (+4% tax)
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Payment upon pickup at store</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                {paymentMethod === 'card' && (
                  <div className="flex justify-between text-sm">
                    <span>Tax (4%):</span>
                    <span>${(getSubtotal() * 0.04).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-red-600">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={sendOrder}
              disabled={!customerName.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Send Order via SMS
            </button>
          </div>
        )}
      </div>
    </div>
  )

  // Simple Customization Modal
  const CustomizationModal = () => {
    if (!isCustomizing || !selectedItem) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Customize {selectedItem.item}</h2>
              <button 
                onClick={() => setIsCustomizing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            
            {selectedItem.category === 'sandwich' && (
              <div className="space-y-6">
                {/* Bread Type */}
                <div>
                  <h3 className="font-semibold mb-3">Choose Bread Type</h3>
                  <div className="space-y-2">
                    {breadTypes.map((bread) => (
                      <label key={bread.value} className="flex items-center">
                        <input
                          type="radio"
                          value={bread.value}
                          checked={customization.breadType === bread.value}
                          onChange={(e) => setCustomization({...customization, breadType: e.target.value})}
                          className="mr-2"
                        />
                        {bread.label} {bread.price > 0 && `(+$${bread.price.toFixed(2)})`}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <h3 className="font-semibold mb-3">Temperature</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="cold"
                        checked={customization.temperature === 'cold'}
                        onChange={(e) => setCustomization({...customization, temperature: e.target.value})}
                        className="mr-2"
                      />
                      Cold
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="hot"
                        checked={customization.temperature === 'hot'}
                        onChange={(e) => setCustomization({...customization, temperature: e.target.value})}
                        className="mr-2"
                      />
                      Hot
                    </label>
                  </div>
                </div>

                {/* Cheese */}
                <div>
                  <h3 className="font-semibold mb-3">Cheese</h3>
                  <div className="space-y-2">
                    {cheeseTypes.map((cheese) => (
                      <label key={cheese.value} className="flex items-center">
                        <input
                          type="radio"
                          value={cheese.value}
                          checked={customization.cheese === cheese.value}
                          onChange={(e) => setCustomization({...customization, cheese: e.target.value})}
                          className="mr-2"
                        />
                        {cheese.label} {cheese.price > 0 && `(+$${cheese.price.toFixed(2)})`}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sauces */}
                <div>
                  <h3 className="font-semibold mb-3">Sauces</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sauces.map((sauce) => (
                      <label key={sauce.key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customization.sauces[sauce.key] || false}
                          onChange={(e) => setCustomization({
                            ...customization, 
                            sauces: {
                              ...customization.sauces, 
                              [sauce.key]: e.target.checked
                            }
                          })}
                          className="mr-2"
                        />
                        <span className="text-sm">{sauce.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vegetables */}
                <div>
                  <h3 className="font-semibold mb-3">Vegetables</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vegetables.map((vegetable) => (
                      <label key={vegetable.key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customization.vegetables[vegetable.key] || false}
                          onChange={(e) => setCustomization({
                            ...customization, 
                            vegetables: {
                              ...customization.vegetables, 
                              [vegetable.key]: e.target.checked
                            }
                          })}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {vegetable.label} {vegetable.price > 0 && `(+$${vegetable.price.toFixed(2)})`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Special Instructions</h3>
              <textarea 
                placeholder="Any special requests..."
                value={customization.specialInstructions}
                onChange={(e) => setCustomization({...customization, specialInstructions: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
              />
            </div>

            {/* Price Preview */}
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Price:</span>
                <span className="text-red-600">
                  ${calculateItemPrice(selectedItem, customization).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => setIsCustomizing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => addToCart(selectedItem, customization)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {currentPage !== 'home' && (
        <nav className="bg-white shadow-lg sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="bg-red-600 text-white p-2 rounded-full">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.88-6.88 1.37-1.37z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Cortelyou Road Deli</h1>
                  <p className="text-xs text-gray-600 hidden sm:block">& Grocery Store</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'home' ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'menu' ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Menu
                </button>
                <button
                  onClick={() => setCurrentPage('cart')}
                  className={`px-4 py-2 rounded-lg transition-colors relative ${
                    currentPage === 'cart' ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'menu' && <MenuPage />}
      {currentPage === 'cart' && <CartPage />}

      {/* Customization Modal */}
      <CustomizationModal />
    </div>
  )
}

export default App

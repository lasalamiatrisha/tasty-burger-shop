import { useState, useEffect } from 'react'
import './App.css'

// Import images from assets folder 
import logoImg from './assets/logo.jpg'
import burger1 from './assets/burger1.jpg'
import burger2 from './assets/burger2.jpg'
import burger3 from './assets/burger3.jpg'
import burger4 from './assets/burger4.jpg'

// Promo Slider Component
interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
}

const PROMO_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'SPECIAL WEEKEND DEAL',
    subtitle: 'Buy 1 Crispy Chicken, Get Free Drinks!',
    image: burger1,
  },
  {
    id: 2,
    title: 'NEW ULTIMATE BACON',
    subtitle: 'Loaded with double cheddar and smoky bacon strips.',
    image: burger2,
  },
  {
    id: 3,
    title: 'FRESH & CRAZY FLAVORS',
    subtitle: 'Try our Black Sheep with fresh avocado relish!',
    image: burger3,
  },
]
function ImageSlider({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  return (
    <div className="slider-container">
      <div className="slider-card">
        {/* Blurred Background Image Layer */}
        <div 
          className="slider-bg-blur"
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        />

        {/* Main Clean Burger Image */}
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="slider-img"
        />

        {/* Overlay Banner Text */}
        <div className="slider-overlay">
          <h2>{slides[currentIndex].title}</h2>
          <p>{slides[currentIndex].subtitle}</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="slider-btn prev-btn" onClick={goToPrev}>
        &#10094;
      </button>
      <button className="slider-btn next-btn" onClick={goToNext}>
        &#10095;
      </button>

      {/* Indicator Dots */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Component for Star Rating & Heart Toggle
function StarRating() {
  const [stars, setStars] = useState<string[]>(['☆', '☆', '☆', '☆', '☆'])
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const toggleStar = (index: number): void => {
    setStars((prevStars) =>
      prevStars.map((star, i) => (i === index ? (star === '☆' ? '★' : '☆') : star))
    )
  }

  const toggleHeart = (): void => {
    setIsLiked((prev) => !prev)
  }

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <span key={index} onClick={() => toggleStar(index)} style={{ cursor: 'pointer' }}>
          {star}
        </span>
      ))}
      <span 
        className={`heart ${isLiked ? 'liked' : ''}`} 
        onClick={toggleHeart}
      >
        {isLiked ? '♥' : '♡'}
      </span>
    </div>
  )
}

interface NavModalContent {
  title: string
  content: React.ReactNode
}

interface SelectedBurger {
  id: number
  name: string
  description: string
  price: string
  numericPrice: number
  image: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

function App() {
  // Navigation Modal State
  const [navModal, setNavModal] = useState<NavModalContent | null>(null)

  // Product Modal & Cart State
  const [selectedBurger, setSelectedBurger] = useState<SelectedBurger | null>(null)
  const [modalQty, setModalQty] = useState<number>(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  // Open Product Modal with clicked burger details
  const handleOpenBurgerModal = (burger: SelectedBurger) => {
    setSelectedBurger(burger)
    setModalQty(1)
  }

  // Add Item to Cart
  const handleAddToCart = () => {
    if (!selectedBurger) return

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === selectedBurger.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === selectedBurger.id
            ? { ...item, quantity: item.quantity + modalQty }
            : item
        )
      }
      return [
        ...prevCart,
        {
          id: selectedBurger.id,
          name: selectedBurger.name,
          price: selectedBurger.numericPrice,
          quantity: modalQty,
          image: selectedBurger.image,
        },
      ]
    })

    setSelectedBurger(null)
    setIsCartOpen(true) // Open cart drawer after adding item
  }

  // Update Cart Quantity directly inside Cart Drawer
  const handleUpdateCartQty = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    )
  }

  // Totals
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Original Nav Modal Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, type: string) => {
    e.preventDefault()
    if (type === 'ABOUT') {
      setNavModal({
        title: 'ABOUT US',
        content: (
          <p>
            Tasty Burger is your neighborhood burger destination! Founded with a passion for quality, we grill premium beef, crispy chicken, and plant-based burgers fresh to order daily. Every burger is loaded with farm-fresh vegetables—crisp lettuce, ripe tomatoes, onions, and avocado—and served in a warm, welcoming store atmosphere!
          </p>
        )
      })
    } else if (type === 'MENU') {
      setNavModal({
        title: 'OUR MENU DETAILS',
        content: (
          <div className="menu-modal-details">
            <div className="menu-item-detail">
              <h4>1. Crispy Chicken — ৳99.15</h4>
              <p>Crispy fried chicken breast, spicy chilli sauce, sliced tomatoes, tangy pickles, and crunchy coleslaw on a toasted bun.</p>
            </div>
            <div className="menu-item-detail">
              <h4>2. Ultimate Bacon — ৳99.32</h4>
              <p>Grilled house patty, melted cheddar cheese, smoky bacon strips, sliced onions, and classic yellow mustard.</p>
            </div>
            <div className="menu-item-detail">
              <h4>3. Black Sheep — ৳69.15</h4>
              <p>Special house patty, rich American cheese, zesty tomato relish, fresh avocado, crisp lettuce, and red onion rings.</p>
            </div>
            <div className="menu-item-detail">
              <h4>4. Vegan Burger — ৳99.25</h4>
              <p>100% plant-based patty, vegan cheddar cheese, savory vegan bacon bits, onions, and mustard sauce.</p>
            </div>
          </div>
        )
      })
    } else if (type === 'SHOP') {
      setNavModal({
        title: 'OUR SHOP',
        content: (
          <p>Visit our flagship store or order online for fast, hot delivery right to your doorstep!</p>
        )
      })
    } else if (type === 'CONTACT') {
      setNavModal({
        title: 'CONTACT US',
        content: (
          <div>
            <p><strong>Email:</strong> support@tastyburger.com</p>
            <p><strong>Phone:</strong> +63 917 123 4567 / (02) 8888 1234</p>
            <p><strong>Hours:</strong> Open daily from 10:00 AM to 11:00 PM</p>
          </div>
        )
      })
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <header>
        <div className="logo">
          <img src={logoImg} alt="Tasty Burger Logo" />
        </div>
        <nav>
          <a href="#" onClick={(e) => handleNavClick(e, 'ABOUT')}>ABOUT</a>
          <a href="#" onClick={(e) => handleNavClick(e, 'MENU')}>OUR MENU</a>
          <a href="#" onClick={(e) => handleNavClick(e, 'SHOP')}>SHOP</a>
          <a href="#" onClick={(e) => handleNavClick(e, 'CONTACT')}>CONTACT</a>
          <span 
            className="cart-icon" 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            style={{ cursor: 'pointer' }}
          >
            🛍️ <span className="badge">{totalCartCount}</span>
          </span>
        </nav>
      </header>

      {/* Main Section */}
      <section className="menu-section">
        {/* Banner Image Slider */}
        <ImageSlider slides={PROMO_SLIDES} />

        <h1 className="main-title">OUR CRAZY BURGERS</h1>
        <p className="subtitle">
          Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy
          patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted
          bun. Whether you like it cheesy, or extra meaty, we've got a burger that will blow your mind!
        </p>

        {/* Burger Cards Grid */}
        <div className="burger-grid">

          {/* Card 1 */}
          <div className="card">
            <img 
              src={burger1} 
              alt="Crispy Chicken" 
              className="clickable-img"
              onClick={() => handleOpenBurgerModal({
                id: 1,
                name: 'Crispy Chicken',
                description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw',
                price: '৳99.15',
                numericPrice: 99.15,
                image: burger1
              })} 
            />
            <div className="card-body">
              <StarRating />
              <h3>Crispy Chicken</h3>
              <p>Chicken breast, chilli sauce, tomatoes, pickles, coleslaw</p>
              <span className="price">&#2547;99.15</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <img 
              src={burger2} 
              alt="Ultimate Bacon" 
              className="clickable-img"
              onClick={() => handleOpenBurgerModal({
                id: 2,
                name: 'Ultimate Bacon',
                description: 'House patty, cheddar cheese, bacon, onion, mustard',
                price: '৳99.32',
                numericPrice: 99.32,
                image: burger2
              })} 
            />
            <div className="card-body">
              <StarRating />
              <h3>Ultimate Bacon</h3>
              <p>House patty, cheddar cheese, bacon, onion, mustard</p>
              <span className="price">&#2547;99.32</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <img 
              src={burger3} 
              alt="Black Sheep" 
              className="clickable-img"
              onClick={() => handleOpenBurgerModal({
                id: 3,
                name: 'Black Sheep',
                description: 'American cheese, tomato relish, avocado, lettuce, red onion',
                price: '৳69.15',
                numericPrice: 69.15,
                image: burger3
              })} 
            />
            <div className="card-body">
              <StarRating />
              <h3>Black Sheep</h3>
              <p>American cheese, tomato relish, avocado, lettuce, red onion</p>
              <span className="price">&#2547;69.15</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card">
            <img 
              src={burger4} 
              alt="Vegan Burger" 
              className="clickable-img"
              onClick={() => handleOpenBurgerModal({
                id: 4,
                name: 'Vegan Burger',
                description: 'House patty, cheddar cheese, bacon, onion, mustard',
                price: '৳99.25',
                numericPrice: 99.25,
                image: burger4
              })} 
            />
            <div className="card-body">
              <StarRating />
              <h3>Vegan Burger</h3>
              <p>House patty, cheddar cheese, bacon, onion, mustard</p>
              <span className="price">&#2547;99.25</span>
            </div>
          </div>

        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedBurger && (
        <div className="modal-overlay" onClick={() => setSelectedBurger(null)}>
          <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedBurger(null)}>&times;</span>
            <div className="modal-img-wrapper">
              <img src={selectedBurger.image} alt={selectedBurger.name} />
            </div>
            <h2>{selectedBurger.name}</h2>
            <p className="modal-desc">{selectedBurger.description}</p>
            <span className="modal-price">{selectedBurger.price}</span>

            {/* Quantity Controls & Add to Cart */}
            <div className="modal-action-box">
              <div className="qty-controls">
                <button onClick={() => setModalQty((q) => Math.max(1, q - 1))}>-</button>
                <span>{modalQty}</span>
                <button onClick={() => setModalQty((q) => q + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out / Floating Cart Drawer Panel */}
      {isCartOpen && (
        <div className="cart-drawer-panel">
          <div className="cart-header">
            <h3>Cart ({totalCartCount})</h3>
            <span className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</span>
          </div>

          <div className="cart-body">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <span className="cart-item-name">{item.name}</span>
                  <div className="cart-qty-controls">
                    <button onClick={() => handleUpdateCartQty(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateCartQty(item.id, 1)}>+</button>
                  </div>
                  <span className="cart-item-price">৳{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total-row">
              <strong>Total:</strong>
              <strong className="total-price">৳{totalCartPrice.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn" disabled={cart.length === 0}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Navigation Info Pop-Out Modal */}
      {navModal && (
        <div className="modal-overlay" onClick={() => setNavModal(null)}>
          <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setNavModal(null)}>&times;</span>
            <h2>{navModal.title}</h2>
            <div className="info-modal-body">{navModal.content}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
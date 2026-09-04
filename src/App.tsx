import { useState } from 'react'
import './App.css'

// Import images from assets folder
import logoImg from './assets/logo.jpg'
import burger1 from './assets/burger1.jpg'
import burger2 from './assets/burger2.jpg'
import burger3 from './assets/burger3.jpg'
import burger4 from './assets/burger4.jpg'

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

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [navModal, setNavModal] = useState<NavModalContent | null>(null)

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
          <span className="cart-icon">🛍️ <span className="badge">2</span></span>
        </nav>
      </header>

      {/* Section Title */}
      <section className="menu-section">
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
              onClick={() => setSelectedImage(burger1)} 
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
              onClick={() => setSelectedImage(burger2)} 
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
              onClick={() => setSelectedImage(burger3)} 
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
              onClick={() => setSelectedImage(burger4)} 
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

      {/* Image Pop-Out Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedImage(null)}>&times;</span>
            <img src={selectedImage} alt="Pop-out view" />
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
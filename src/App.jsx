import { useState } from 'react'
import './App.css'

// Import images from assets folder
import logoImg from './assets/logo.jpg'
import burger1 from './assets/burger1.jpg'
import burger2 from './assets/burger2.jpg'
import burger3 from './assets/burger3.jpg'
import burger4 from './assets/burger4.jpg'

// Component for Star Rating
function StarRating() {
  const [stars, setStars] = useState(['☆', '☆', '☆', '☆', '☆'])

  const toggleStar = (index) => {
    setStars(prevStars => 
      prevStars.map((star, i) => (i === index ? (star === '☆' ? '★' : '☆') : star))
    )
  }

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <span key={index} onClick={() => toggleStar(index)} style={{ cursor: 'pointer' }}>
          {star}
        </span>
      ))}
      <span className="heart">♡</span>
    </div>
  )
}

function App() {
  return (
    <>
      {/* Navigation Bar */}
      <header>
        <div className="logo">
          <img src={logoImg} alt="Tasty Burger Logo" />
        </div>
        <nav>
          <a href="#">ABOUT</a>
          <a href="#">OUR MENU</a>
          <a href="#">SHOP</a>
          <a href="#">CONTACT</a>
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
            <img src={burger1} alt="Crispy Chicken" />
            <div className="card-body">
              <StarRating />
              <h3>Crispy Chicken</h3>
              <p>Chicken breast, chilli sauce, tomatoes, pickles, coleslaw</p>
              <span className="price">&#2547;99.15</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <img src={burger2} alt="Ultimate Bacon" />
            <div className="card-body">
              <StarRating />
              <h3>Ultimate Bacon</h3>
              <p>House patty, cheddar cheese, bacon, onion, mustard</p>
              <span className="price">&#2547;99.32</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <img src={burger3} alt="Black Sheep" />
            <div className="card-body">
              <StarRating />
              <h3>Black Sheep</h3>
              <p>American cheese, tomato relish, avocado, lettuce, red onion</p>
              <span className="price">&#2547;69.15</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card">
            <img src={burger4} alt="Vegan Burger" />
            <div className="card-body">
              <StarRating />
              <h3>Vegan Burger</h3>
              <p>House patty, cheddar cheese, bacon, onion, mustard</p>
              <span className="price">&#2547;99.25</span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default App
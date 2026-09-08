import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  CircleUserRound,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { benefitMarquee, categoryCards, products, siteImages, socialTiles, storyStages, testimonials } from './data'
import { buildOrderSummary, googleForms, googleFormEntries } from './googleForms'

type CartItem = {
  id: number
  name: string
  weight: string
  price: number
  quantity: number
  image: string
}

const formatCurrency = (value: number) => `₹${value}`

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<number | null>(products[0]?.id ?? null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gharana-cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('gharana-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setCartOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filteredProducts = useMemo(() => {
    const selected =
      activeCategory === 'All'
        ? products
        : products.filter((product) => product.category === activeCategory)

    return selected.filter((product) => {
      const query = search.trim().toLowerCase()
      if (!query) return true
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    })
  }, [activeCategory, search])

  const selectedProductData = products.find((product) => product.id === selectedProduct) ?? products[0]
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const addToCart = (product: (typeof products)[number], quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          weight: product.weight,
          price: product.price,
          quantity,
          image: product.images[0],
        },
      ]
    })
    setCartOpen(true)
  }

  const changeQty = (id: number, amount: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleOrder = () => {
    if (!cart.length) return
    setShowOrderModal(true)
  }

  const continueToOrderForm = () => {
    const summary = buildOrderSummary(
      cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        weight: item.weight,
        price: item.price,
      })),
    )

    const params = new URLSearchParams({
      [googleFormEntries.orderSummary]: summary,
      [googleFormEntries.customerName]: '',
      [googleFormEntries.phone]: '',
      [googleFormEntries.email]: '',
      [googleFormEntries.address]: '',
    })

    const orderUrl = googleForms.orderUrl.includes('your-order-form')
      ? ''
      : `${googleForms.orderUrl}?${params.toString()}`

    if (!orderUrl) {
      alert('Order form is not configured yet. Add your Google Form URL in src/googleForms.ts.')
      setShowOrderModal(false)
      return
    }

    setShowOrderModal(false)
    window.open(orderUrl, '_blank', 'noopener,noreferrer')
  }

  const navLinks = ['HOME', 'SHOP', 'OUR STORY', 'GIFTING', 'GLOBAL']

  return (
    <div className="page-shell">
      <div className="announcement-bar">
        <div className="marquee-track">
          {[...benefitMarquee, ...benefitMarquee].map((item, index) => (
            <span key={`${item}-${index}`}>
              <span className="dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className="topbar">
        <nav className="nav">
          <div className="nav-brand">
            <img src={siteImages.logo} alt="Gharana Makhana logo" />
          </div>
          <div className="nav-links desktop-only">
            {navLinks.map((link) => (
              <a key={link} href="#" className="nav-link">
                {link}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button type="button" className="icon-btn" aria-label="Search products" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <button type="button" className="icon-btn account" aria-label="Account">
              <CircleUserRound size={18} />
            </button>
            <button type="button" className="cart-pill" aria-label="Open cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={18} />
              <span>{cartCount}</span>
            </button>
            <button type="button" className="menu-btn mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <motion.div className="hero-copy" initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <p className="eyebrow">Premium Indian makhana</p>
            <h1>The crunch of India.</h1>
            <p className="hero-text">Premium makhana, rooted in tradition and crafted for the modern table.</p>
            <div className="cta-row">
              <button type="button" className="primary-btn">
                Shop Makhana <ArrowRight size={16} />
              </button>
              <button type="button" className="secondary-btn">
                Discover our story
              </button>
            </div>
            <div className="hero-meta">
              <div>
                <strong>Premium</strong>
                <span>Roasted in small batches</span>
              </div>
              <div>
                <strong>Rooted</strong>
                <span>Inspired by Indian heritage</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <img src={siteImages.hero} alt="Premium Gharana makhana bowl" />
            <div className="floating-card">
              <span className="tag">Gharana Select</span>
              <h3>Slow roasted. Thoughtfully crafted.</h3>
            </div>
          </motion.div>
        </section>

        <div className="benefit-strip">
          <div className="benefit-track">
            {[...benefitMarquee, ...benefitMarquee].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="story-showcase section-spacer">
          <div className="section-heading small">
            <p>From home-grown roots to modern brand</p>
            <h2>Great products deserve great brands.</h2>
          </div>
          <div className="story-grid">
            <div className="story-card large-image">
              <img src={siteImages.storyFarm} alt="Farm and makhana story" />
            </div>
            <div className="story-card text-card">
              <p className="eyebrow">Our story</p>
              <h3>India has great products. We build the infrastructure to make them global.</h3>
              <p>Gharana begins with makhana and evolves into a digitally enabled, finance-ready, export-minded brand ecosystem.</p>
              <button type="button" className="text-link">
                Read our journey <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="categories section-spacer">
          <div className="section-heading">
            <p>Product range</p>
            <h2>Curated for every snacking moment.</h2>
          </div>
          <div className="category-grid">
            {categoryCards.map((category) => (
              <article key={category.name} className="category-card">
                <img src={category.image} alt={category.name} />
                <div className="category-copy">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="featured section-spacer">
          <div className="section-heading">
            <p>Curated picks</p>
            <h2>Premium makhana, designed to be savoured.</h2>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <motion.article key={product.id} className="product-card" whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
                <div className="product-image-wrap">
                  <img src={product.images[0]} alt={product.name} />
                  <span className="badge">{product.badge}</span>
                </div>
                <div className="product-copy">
                  <div className="product-headline">
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <p className="product-desc">{product.shortDescription}</p>
                  <div className="product-detail-row">
                    <span>{product.weight}</span>
                    <strong>{formatCurrency(product.price)}</strong>
                  </div>
                  <button type="button" className="product-btn" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="shop section-spacer">
          <div className="shop-header section-heading">
            <div>
              <p>Shop the collection</p>
              <h2>Editorial catalogue</h2>
            </div>
            <div className="filter-row">
              {['All', ...new Set(products.map((product) => product.category))].map((category) => (
                <button
                  type="button"
                  key={category}
                  className={category === activeCategory ? 'filter active' : 'filter'}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="catalog-card" onClick={() => setSelectedProduct(product.id)}>
                <img src={product.images[0]} alt={product.name} />
                <div className="catalog-copy">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="catalog-meta">
                    <strong>{formatCurrency(product.price)}</strong>
                    <small>{product.weight}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story-journey section-spacer">
          <div className="section-heading">
            <p>One connected ecosystem</p>
            <h2>From home-grown product to global brand.</h2>
          </div>
          <div className="journey-row">
            {storyStages.map((stage) => (
              <div key={stage.step} className="journey-card">
                <span>{stage.step}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="global-section section-spacer">
          <div className="global-copy">
            <p className="eyebrow">From India to the world</p>
            <h2>Built for a global future.</h2>
            <p>Gharana brings its roots to international conversations through a clean premium identity and a structure ready for export-minded growth.</p>
            <button type="button" className="primary-btn small">Global Enquiry</button>
          </div>
          <div className="global-map">
            <img src={siteImages.global} alt="Global trade map banner" />
          </div>
        </section>

        <section className="testimonials section-spacer">
          <div className="section-heading">
            <p>Featured voices</p>
            <h2>Thoughtful feedback, clearly marked as placeholders.</h2>
          </div>
          <div className="testimonial-slider">
            {testimonials.map((item) => (
              <article key={item.author} className="testimonial-card">
                <p>“{item.quote}”</p>
                <div>
                  <strong>{item.author}</strong>
                  <span>{item.title}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="social-gallery section-spacer">
          <div className="section-heading">
            <p>Gharana table</p>
            <h2>Moments worth sharing.</h2>
          </div>
          <div className="social-grid">
            {socialTiles.map((tile, index) => (
              <div key={tile + index} className="social-tile">
                <img src={tile} alt="Gharana lifestyle moment" />
              </div>
            ))}
          </div>
        </section>

        <section className="newsletter section-spacer">
          <div className="newsletter-card">
            <div>
              <p className="eyebrow">Stay close</p>
              <h2>Join the Gharana table.</h2>
            </div>
            <div className="newsletter-form">
              <input type="email" aria-label="Email" placeholder="Email address" />
              <button type="button" className="primary-btn">Join us</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={siteImages.logo} alt="Gharana Makhana logo" />
            <p>Premium makhana, rooted in tradition and made for modern living.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li>All Products</li>
              <li>Classic</li>
              <li>Flavoured</li>
              <li>Gift Packs</li>
            </ul>
          </div>
          <div>
            <h4>Discover</h4>
            <ul>
              <li>Our Story</li>
              <li>Gifting</li>
              <li>Global</li>
              <li>Journal</li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li>Contact</li>
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {searchOpen && (
          <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="search-panel" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
              <div className="search-header">
                <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products" />
                <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <button key={product.id} type="button" className="result-item" onClick={() => { setSelectedProduct(product.id); setSearchOpen(false) }}>
                    <img src={product.images[0]} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.category}</span>
                    </div>
                    <span className="price-tag">{formatCurrency(product.price)}</span>
                  </button>
                ))}
                {!filteredProducts.length && <p className="empty-state">No products match your search.</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="menu-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.35, ease: 'easeInOut' }}>
              <div className="menu-header">
                <img src={siteImages.logo} alt="Gharana logo" />
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <div className="menu-links">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link}
                    href="#"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3 }}>
            <div className="cart-header">
              <h3>Cart</h3>
              <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cart-items">
              {cart.length ? (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-copy">
                      <strong>{item.name}</strong>
                      <span>{item.weight}</span>
                      <div className="qty-row">
                        <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => changeQty(item.id, -1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => changeQty(item.id, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-price-box">
                      <strong>{formatCurrency(item.price * item.quantity)}</strong>
                      <button type="button" className="remove-link" onClick={() => changeQty(item.id, -999)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">Your cart is empty.</p>
              )}
            </div>

            <div className="cart-footer">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <button type="button" className="primary-btn wide" onClick={handleOrder}>
                ORDER VIA FORM
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOrderModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-card" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}>
              <p className="eyebrow">Order ready</p>
              <h3>Your order is ready.</h3>
              <p>Continue to secure your order through our order form.</p>
              <button type="button" className="primary-btn" onClick={continueToOrderForm}>
                CONTINUE TO ORDER FORM
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedProductData && (
        <section className="product-detail-panel">
          <div className="detail-gallery">
            <img src={selectedProductData.images[0]} alt={selectedProductData.name} />
            <div className="thumb-row">
              {selectedProductData.images.map((image, index) => (
                <button key={image + index} type="button" className="thumb" onClick={() => setSelectedProduct(selectedProductData.id)}>
                  <img src={image} alt={`${selectedProductData.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-copy">
            <p className="eyebrow">{selectedProductData.category}</p>
            <h2>{selectedProductData.name}</h2>
            <div className="rating-row">
              <span>★★★★★</span>
              <small>4.9 / 5</small>
            </div>
            <div className="detail-price-row">
              <strong>{formatCurrency(selectedProductData.price)}</strong>
              <span>{selectedProductData.weight}</span>
            </div>
            <p>{selectedProductData.description}</p>
            <div className="detail-actions">
              <button type="button" className="primary-btn" onClick={() => addToCart(selectedProductData)}>
                Add to Cart
              </button>
              <button type="button" className="secondary-btn" onClick={handleOrder}>
                Order Now
              </button>
            </div>
            <div className="detail-list">
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {selectedProductData.ingredients.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Benefits</h4>
                <ul>
                  {selectedProductData.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default App

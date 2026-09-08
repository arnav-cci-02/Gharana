import { useEffect, useState } from 'react'
import './App.css'
import { CartDrawer } from './components/layout/CartDrawer'
import { Footer } from './components/layout/Footer'
import { MobileMenu } from './components/layout/MobileMenu'
import { Navbar } from './components/layout/Navbar'
import { SearchOverlay } from './components/layout/SearchOverlay'
import { products } from './data'
import { useCart } from './hooks/useCart'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Gifting } from './pages/Gifting'
import { Home } from './pages/Home'
import { International } from './pages/International'
import { Legal } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { Product } from './pages/Product'
import { Shop } from './pages/Shop'
import { Search } from './pages/Search'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, cartCount, subtotal, addToCart, changeQty, clearCart } = useCart()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSearchOpen(false); setMenuOpen(false); setCartOpen(false) }
    }
    const onPopState = () => { setPath(window.location.pathname); window.scrollTo(0, 0) }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', onPopState)
    return () => { window.removeEventListener('keydown', onKeyDown); window.removeEventListener('popstate', onPopState) }
  }, [])

  const navigate = (to: string) => {
    window.history.pushState({}, '', to)
    setPath(to)
    setSearchOpen(false)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }
  const add = (product: (typeof products)[number]) => { addToCart(product); setCartOpen(true) }
  const page = path === '/' ? <Home navigate={navigate} onAdd={add} />
    : path === '/shop' || path.startsWith('/shop/') ? <Shop navigate={navigate} onAdd={add} />
    : path.startsWith('/product/') ? <Product id={path.split('/')[2]} navigate={navigate} onAdd={add} />
    : path === '/about' ? <About navigate={navigate} />
    : path === '/gifting' ? <Gifting />
    : path === '/international' ? <International />
    : path === '/contact' ? <Contact />
    : path === '/search' ? <Search navigate={navigate} onAdd={add} />
    : ['/privacy', '/terms', '/shipping-returns', '/faq'].includes(path) ? <Legal type={path.slice(1)} />
    : path === '/cart' ? <Shop navigate={navigate} onAdd={add} />
    : <NotFound navigate={navigate} />

  return <div className="page-shell">
    <Navbar cartCount={cartCount} onSearch={() => setSearchOpen(true)} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} navigate={navigate} />
    <main>{page}</main>
    <Footer navigate={navigate} />
    <SearchOverlay open={searchOpen} close={() => setSearchOpen(false)} navigate={navigate} />
    <MobileMenu open={menuOpen} close={() => setMenuOpen(false)} navigate={navigate} />
    <CartDrawer open={cartOpen} close={() => setCartOpen(false)} cart={cart} subtotal={subtotal} changeQty={changeQty} clearCart={clearCart} />
  </div>
}

export default App

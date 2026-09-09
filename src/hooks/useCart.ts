import { useEffect, useState } from 'react'
import { products, type Product } from '../data'
export type CartItem = Pick<Product, 'id' | 'name' | 'weight' | 'price'> & { quantity: number; image: string }
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('gharana-cart') || '[]') as CartItem[]
      return stored.map(item => {
        const product = products.find(candidate => candidate.id === item.id)
        return product ? { ...item, name: product.name, weight: product.weight, price: product.price, image: product.images[0] } : item
      })
    } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('gharana-cart', JSON.stringify(cart)) }, [cart])
  const addToCart = (product: Product, quantity = 1) => setCart(items => { const found = items.find(item => item.id === product.id); return found ? items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { id: product.id, name: product.name, weight: product.weight, price: product.price, quantity, image: product.images[0] }] })
  const changeQty = (id: number, amount: number) => setCart(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
  return { cart, cartCount: cart.reduce((sum, item) => sum + item.quantity, 0), subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0), addToCart, changeQty, clearCart: () => setCart([]) }
}

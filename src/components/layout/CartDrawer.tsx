import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "../../hooks/useCart";
import {
  buildOrderSummary,
  googleFormEntries,
  googleForms,
} from "../../googleForms";
type Props = {
  open: boolean;
  close: () => void;
  cart: CartItem[];
  subtotal: number;
  changeQty: (id: number, amount: number) => void;
  clearCart: () => void;
};
export function CartDrawer({
  open,
  close,
  cart,
  subtotal,
  changeQty,
  clearCart,
}: Props) {
  if (!open) return null;
  const order = () => {
    if (!cart.length) return;
    const summary = buildOrderSummary(cart);
    const url = googleForms.orderUrl.includes("your-order-form")
      ? googleForms.orderUrl
      : `${googleForms.orderUrl}?${new URLSearchParams({ [googleFormEntries.orderSummary]: summary }).toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="overlay cart-overlay">
      <aside className="cart-drawer">
        <div className="panel-head">
          <h2>
            Your bag <small>{cart.length} lines</small>
          </h2>
          <button onClick={close} aria-label="Close cart">
            <X />
          </button>
        </div>
        <div className="cart-items">
          {cart.length ? (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <small>
                    {item.weight} / ₹{item.price}
                  </small>
                  <div className="qty">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <b>₹{item.price * item.quantity}</b>
              </div>
            ))
          ) : (
            <p className="empty">Your bag is waiting for something crunchy.</p>
          )}
        </div>
        <div className="cart-bottom" role="region" aria-label="Cart summary">
          <div>
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </div>
          <button className="button button-light" onClick={order}>
            Place order <span>↗</span>
          </button>
          {cart.length > 0 && (
            <button className="clear-button" onClick={clearCart}>
              Clear bag
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

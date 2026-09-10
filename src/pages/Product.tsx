import { ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { buildOrderSummary, googleForms } from "../googleForms";
import { products } from "../data";
import type { Product as ProductType } from "../data";
import { ProductGallery } from "../components/product/ProductGallery";

type Props = {
  id: string;
  navigate: (to: string) => void;
  onAdd: (p: ProductType, quantity?: number) => void;
};

export function Product({ id, navigate, onAdd }: Props) {
  const legacySlugs: Record<string, string> = { "masala-makhana": "cheese-makhana", "raw-makhana": "salted-makhana", "makhana-flour": "chocolate-coated-makhana" };
  const product = products.find((item) => String(item.id) === id || item.slug === id || item.slug === legacySlugs[id]);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product?.variants[0] || "");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setVariant(product?.variants[0] || "");
    setAdded(false);
  }, [id, product?.id]);

  if (!product) {
    return (
      <div className="product-not-found page-content">
        <p className="kicker">Gharana / product</p>
        <h1>Product not found.</h1>
        <button className="button button-dark" onClick={() => navigate("/shop")}>Back to shop <ArrowRight size={16} /></button>
      </div>
    );
  }

  const orderNow = () => {
    const subtotal = product.price * quantity;
    const summary = buildOrderSummary([{ name: product.name, quantity }], subtotal);
    const params = new URLSearchParams({
      usp: "pp_url",
      [googleForms.order.fields.orderDetails]: summary,
      [googleForms.order.fields.orderTotal]: `₹${subtotal.toLocaleString("en-IN")}`,
    });
    const url = `${googleForms.order.prefillBaseUrl}?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const addProduct = () => {
    onAdd(product, quantity);
    setAdded(true);
  };

  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  const productStyle = {
    "--product-bg": product.theme.background,
    "--product-fg": product.theme.foreground,
    "--product-accent": product.theme.accent,
  } as React.CSSProperties;

  return (
    <div className="product-detail-page" style={productStyle}>
      <section className="product-detail-hero">
        <div className="product-detail-inner">
          <div className="product-detail-back"><button onClick={() => navigate("/shop")}>← Back to shop</button></div>
          <ProductGallery product={product} />
          <div className="product-detail-info">
            <p className="kicker">{product.category} / {product.weight}</p>
            <h1>{product.name}</h1>
            <strong className="product-detail-price">₹{product.price}</strong>
            {product.variants.length > 0 && (
              <label className="product-select-label">
                Select pack size
                <select value={variant} onChange={(event) => setVariant(event.target.value)}>
                  {product.variants.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            )}
            <div className="product-quantity">
              <span>Quantity</span>
              <div>
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
                <b>{quantity}</b>
                <button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
              </div>
            </div>
            <div className="product-detail-actions">
              <button className="product-add-button" onClick={addProduct}><ShoppingBag size={17} /> {added ? "Added to bag" : "Add to cart"} <span>₹{product.price * quantity}</span></button>
              <button className="product-order-button" onClick={orderNow}>Order now <ArrowRight size={16} /></button>
            </div>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-detail-sections">
              <section><h3>Ingredients</h3><p>{product.ingredients.join(" / ")}</p></section>
              <section><h3>Why you'll love it</h3><p>{product.benefits.join(" / ")}</p></section>
              {product.nutritionalInfo.length > 0 && <section><h3>Product notes</h3><p>{product.nutritionalInfo.join(" / ")}</p></section>}
            </div>
          </div>
        </div>
      </section>
      <section className="related-products">
        <div className="related-heading"><p className="kicker">Keep exploring</p><h2>More to <em>crunch.</em></h2></div>
        <div className="related-grid">
          {related.map((item) => (
            <article key={item.id} className="related-product">
              <button onClick={() => navigate(`/product/${item.slug}`)}><img src={item.images[0]} alt={item.name} /></button>
              <button className="related-name" onClick={() => navigate(`/product/${item.slug}`)}>{item.name}</button>
              <p>₹{item.price}</p>
              <button className="related-add" onClick={() => onAdd(item)}>Add to cart +</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

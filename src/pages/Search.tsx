import { useState } from "react";
import { products } from "../data";
import { ProductCard } from "../components/shop/ProductCard";
export function Search({
  navigate,
  onAdd,
}: {
  navigate: (to: string) => void;
  onAdd: (p: (typeof products)[number]) => void;
}) {
  const [query, setQuery] = useState("");
  const results = products.filter((p) =>
    `${p.name} ${p.category} ${p.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="page-content search-page">
      <p className="kicker">Gharana / search</p>
      <h1>
        Find your
        <br />
        <em>crunch.</em>
      </h1>
      <input
        className="search-page-input"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search flavours, products, gifts"
        aria-label="Search products"
      />
      <div className="shop-grid">
        {results.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            navigate={navigate}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}

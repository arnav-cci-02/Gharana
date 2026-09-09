import { useState } from "react";
import { products } from "../data";
import { ProductCard } from "../components/shop/ProductCard";
type Props = {
  navigate: (to: string) => void;
  onAdd: (p: (typeof products)[number]) => void;
};
export function Shop({ navigate, onAdd }: Props) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const list = products
    .filter((p) => filter === "All" || p.category === filter)
    .sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
          ? b.price - a.price
          : sort === "Name: A-Z"
            ? a.name.localeCompare(b.name)
            : Number(b.featured) - Number(a.featured),
    );
  return (
    <div className="page-content shop-page">
      <div className="page-title">
        <p className="kicker">The Gharana pantry</p>
        <h1>
          Shop the
          <br />
          <em>range.</em>
        </h1>
        <p>Crunchy, considered, and ready for whatever the day brings.</p>
      </div>
      <div className="shop-toolbar">
        <div>
          {categories.map((c) => (
            <button
              className={filter === c ? "active" : ""}
              key={c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Name: A-Z</option>
        </select>
      </div>
      <div className="shop-grid">
        {list.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAdd}
            navigate={navigate}
            large={i % 5 === 0}
          />
        ))}
      </div>
    </div>
  );
}

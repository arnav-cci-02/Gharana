import { Search, X } from "lucide-react";
import { useState } from "react";
import { products } from "../../data";
type Props = {
  open: boolean;
  close: () => void;
  navigate: (to: string) => void;
};
export function SearchOverlay({ open, close, navigate }: Props) {
  const [query, setQuery] = useState("");
  if (!open) return null;
  const results = products.filter((p) =>
    `${p.name} ${p.category} ${p.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="overlay search-overlay">
      <div className="search-panel">
        <div className="search-input">
          <Search />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the range"
            aria-label="Search products"
          />
          <button onClick={close} aria-label="Close search">
            <X />
          </button>
        </div>
        <div className="search-results">
          {results.map((p) => (
            <button
              className="search-result"
              key={p.id}
              onClick={() => {
                close();
                navigate(`/product/${p.id}`);
              }}
            >
              <img src={p.images[0]} alt="" />
              <span>
                {p.name}
                <small>
                  {p.category} / ₹{p.price}
                </small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

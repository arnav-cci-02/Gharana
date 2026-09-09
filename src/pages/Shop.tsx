import { ArrowDownUp, ChevronDown, Filter, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { products } from "../data";
import { ProductCard } from "../components/shop/ProductCard";
type Props = {
  navigate: (to: string) => void;
  onAdd: (p: (typeof products)[number]) => void;
};
export function Shop({ navigate, onAdd }: Props) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const list = [...products]
    .filter((p) => filter === "All" || p.category === filter)
    .sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
          ? b.price - a.price
          : sort === "Name: A-Z"
            ? a.name.localeCompare(b.name)
            : sort === "Name: Z-A"
              ? b.name.localeCompare(a.name)
            : Number(b.featured) - Number(a.featured),
    );

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setFilterOpen(false);
        setSortOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const chooseFilter = (value: string) => {
    setFilter(value);
    setFilterOpen(false);
  };
  const chooseSort = (value: string) => {
    setSort(value);
    setSortOpen(false);
  };
  return (
    <div className="page-content shop-page">
      <div className="shop-title">
        <p className="kicker">The Gharana pantry / {products.length} products</p>
        <h1>Products</h1>
      </div>
      <div className="shop-toolbar shop-controls" ref={controlsRef}>
        <div className="shop-control-wrap">
          <button className={`shop-control ${filter !== "All" ? "active" : ""}`} onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false); }} aria-expanded={filterOpen} aria-haspopup="menu">
            <Filter size={14} /> Filter {filter !== "All" && <span>· {filter}</span>}
          </button>
          {filterOpen && (
            <div className="shop-popover" role="menu" aria-label="Filter products">
              <div className="shop-popover-head"><b>Filter by</b><button onClick={() => setFilterOpen(false)} aria-label="Close filters"><X size={15} /></button></div>
              {categories.map((category) => (
                <button key={category} className={filter === category ? "selected" : ""} onClick={() => chooseFilter(category)} role="menuitemradio" aria-checked={filter === category}>
                  <span>{category}</span>{filter === category && <span>●</span>}
                </button>
              ))}
              {filter !== "All" && <button className="shop-reset" onClick={() => chooseFilter("All")}><RotateCcw size={13} /> Clear filter</button>}
            </div>
          )}
        </div>
        <span className="shop-count">{list.length} {list.length === 1 ? "PRODUCT" : "PRODUCTS"}</span>
        <div className="shop-control-wrap">
          <button className="shop-control" onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false); }} aria-expanded={sortOpen} aria-haspopup="menu">
            Sort <ArrowDownUp size={14} /> <ChevronDown size={13} />
          </button>
          {sortOpen && (
            <div className="shop-popover shop-sort-popover" role="menu" aria-label="Sort products">
              {["Featured", "Name: A-Z", "Name: Z-A", "Price: Low to High", "Price: High to Low"].map((option) => (
                <button key={option} className={sort === option ? "selected" : ""} onClick={() => chooseSort(option)} role="menuitemradio" aria-checked={sort === option}>
                  <span>{option}</span>{sort === option && <span>●</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {list.length ? <div className="shop-grid shop-catalogue">
        {list.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAdd}
            navigate={navigate}
          />
        ))}
      </div> : <div className="shop-empty"><p>NO PRODUCTS FOUND</p><button className="shop-control" onClick={() => chooseFilter("All")}>Clear filters</button></div>}
    </div>
  );
}

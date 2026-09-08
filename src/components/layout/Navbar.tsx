import { Menu, Search, ShoppingBag } from "lucide-react";
import { siteImages } from "../../data";
type Props = {
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
  onMenu: () => void;
  navigate: (to: string) => void;
};
export function Navbar({
  cartCount,
  onSearch,
  onCart,
  onMenu,
  navigate,
}: Props) {
  return (
    <header className="topbar">
      <nav className="nav">
        <button className="wordmark" onClick={() => navigate("/")}>
          <img src="/public/Gharana Logo.png" alt="Gharana Makhana" />
        </button>
        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/shop")}>Shop</button>
          <button onClick={() => navigate("/about")}>About us</button>
          <button onClick={() => navigate("/gifting")}>Gifting</button>
          <button onClick={() => navigate("/international")}>
            International
          </button>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search" onClick={onSearch}>
            <Search size={18} />
          </button>
          <button className="icon-btn" aria-label="Open cart" onClick={onCart}>
            <ShoppingBag size={18} />
            <b>{cartCount}</b>
          </button>
          <button
            className="mobile-nav-btn"
            aria-label="Open menu"
            onClick={onMenu}
          >
            <Menu />
          </button>
        </div>
      </nav>
    </header>
  );
}

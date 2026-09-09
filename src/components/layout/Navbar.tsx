import { Menu, Search, ShoppingBag } from "lucide-react";
import { images } from "../../data/images";
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
  const goHome = () => {
    navigate("/");
    requestAnimationFrame(() => document.getElementById("home-hero")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <header className="topbar">
      <nav className="nav">
        <button className="wordmark" onClick={goHome} aria-label="Gharana home">
          <img src={images.logo} alt="Gharana Makhana" />
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

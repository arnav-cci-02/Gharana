import { Menu, Search, ShoppingBag } from "lucide-react";
import { images } from "../../data/images";
import { useEffect, useState } from "react";
type Props = {
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
  onMenu: () => void;
  navigate: (to: string) => void;
  currentPath?: string;
};
export function Navbar({
  cartCount,
  onSearch,
  onCart,
  onMenu,
  navigate,
  currentPath = window.location.pathname,
}: Props) {
  const [contrast, setContrast] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const updateContrast = () => {
      const sample = document.elementFromPoint(window.innerWidth / 2, 126);
      const surface = sample?.closest("section, main, footer, .product-detail-page") as HTMLElement | null;
      const className = surface?.className.toString() || "";
      const darkSurface = /hero|journey|voices|newsletter|range-showcase|shop-page|product-detail-page|footer/.test(className);
      const background = surface ? getComputedStyle(surface).backgroundColor : "";
      const rgb = background.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
      const luminance = rgb && rgb.length === 3 ? (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) : 255;
      setContrast(darkSurface || luminance < 138 ? "light" : "dark");
    };
    updateContrast();
    window.addEventListener("scroll", updateContrast, { passive: true });
    window.addEventListener("resize", updateContrast);
    return () => {
      window.removeEventListener("scroll", updateContrast);
      window.removeEventListener("resize", updateContrast);
    };
  }, [currentPath]);

  const goHome = () => {
    navigate("/");
    requestAnimationFrame(() => document.getElementById("home-hero")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <header className="topbar">
      <nav className={`nav nav-${contrast}`}>
        <button className="wordmark" onClick={goHome} aria-label="Gharana home">
          <img src={images.logo} alt="Gharana Makhana" />
        </button>
        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button className={currentPath === "/shop" ? "active" : ""} onClick={() => navigate("/shop")}>Shop</button>
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

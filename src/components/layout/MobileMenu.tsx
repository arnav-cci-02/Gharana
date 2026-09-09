import { X } from "lucide-react";
import { images } from "../../data/images";
type Props = {
  open: boolean;
  close: () => void;
  navigate: (to: string) => void;
};
export function MobileMenu({ open, close, navigate }: Props) {
  if (!open) return null;
  const links = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["About us", "/about"],
    ["Gifting", "/gifting"],
    ["International", "/international"],
    ["Contact", "/contact"],
  ];
  return (
    <div className="overlay menu-overlay">
      <aside className="mobile-panel">
        <div className="panel-head">
          <button className="mobile-wordmark" onClick={() => { close(); navigate("/"); requestAnimationFrame(() => document.getElementById("home-hero")?.scrollIntoView({ behavior: "smooth" })); }} aria-label="Gharana home">
            <img src={images.logo} alt="Gharana Makhana" />
          </button>
          <button aria-label="Close menu" onClick={close}>
            <X />
          </button>
        </div>
        <div className="mobile-links">
          {links.map(([label, path]) => (
            <button
              key={path}
              onClick={() => {
                close();
                navigate(path);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

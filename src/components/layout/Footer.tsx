import { ArrowUpRight, Camera } from "lucide-react";
import { images } from "../../data/images";
import { socialLinks } from "../../data/social";
export function Footer({ navigate }: { navigate: (to: string) => void }) {
  return (
    <footer className="footer">
      <div className="footer-hero">
        <p className="kicker">A better kind of crunch</p>
        <h2>
          Made for the table.
          <br />
          <em>Built for the world.</em>
        </h2>
        <button
          className="button button-outline"
          onClick={() => navigate("/contact")}
        >
          Let's talk <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="footer-grid">
        <div>
          <h1 className="footer-title">GHARANA MAKHANA</h1>
          <img
            className="footer-logo"
            src={images.logo}
            alt="Gharana Makhana"
          />
          <p>Premium makhana, rooted in India and made for modern rituals.</p>
        </div>
        <div>
          <b>Explore</b>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/shop")}>Shop</button>
          <button onClick={() => navigate("/about")}>Our story</button>
          <button onClick={() => navigate("/gifting")}>Gifting</button>
        </div>
        <div>
          <b>Connect</b>
          <button onClick={() => navigate("/international")}>
            International
          </button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/faq")}>FAQ</button>
          <button onClick={() => navigate("/shipping-returns")}>
            Shipping & returns
          </button>
          <a className="footer-social" href={socialLinks.instagram} aria-label="Instagram" onClick={(event) => { if (socialLinks.instagram === "#") event.preventDefault(); }}>
            <Camera size={16} /> Instagram
          </a>
        </div>
      </div>
      <div className="footer-end">
        <span>© 2026 Gharana Makhana</span>
        <span>Privacy / Terms</span>
        <span>Made with intention in India</span>
      </div>
    </footer>
  );
}

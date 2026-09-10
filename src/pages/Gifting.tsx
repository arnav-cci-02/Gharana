import { ArrowRight } from "lucide-react";
import { googleForms } from "../googleForms";
import { images } from "../data/images";
export function Gifting() {
  const enquire = () =>
    window.open(googleForms.giftingUrl, "_blank", "noopener,noreferrer");
  return (
    <div className="campaign-page">
      <section className="campaign-hero">
        <img
          src={images.products.giftPack}
          alt="Thoughtful gift wrapped for sharing"
        />
        <div>
          <p className="kicker">Gharana gifting</p>
          <h1>
            Give something
            <br />
            <em>worth sharing.</em>
          </h1>
          <button className="button button-light" onClick={enquire}>
            Start an enquiry <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="campaign-copy">
        <p className="kicker">For the moments that matter</p>
        <h2>A considered gift has a way of saying more.</h2>
        <div className="campaign-list">
          {[
            "Corporate gifts",
            "Festive gifts",
            "Wedding gifts",
            "Employee gifts",
            "Custom gifting",
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <h3>{x}</h3>
              <ArrowRight size={18} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

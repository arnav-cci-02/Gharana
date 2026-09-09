import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../data";

type Props = { product: Product };

export function ProductGallery({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const hasNavigation = product.images.length > 1;
  const selectImage = (next: number) => {
    setActiveImage((next + product.images.length) % product.images.length);
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery-stage">
        <img src={product.images[activeImage]} alt={product.name} />
        {hasNavigation && (
          <div className="product-gallery-arrows">
            <button onClick={() => selectImage(activeImage - 1)} aria-label="Previous product image"><ArrowLeft size={17} /></button>
            <button onClick={() => selectImage(activeImage + 1)} aria-label="Next product image"><ArrowRight size={17} /></button>
          </div>
        )}
      </div>
      {product.images.length > 0 && (
        <div className="product-gallery-thumbs" aria-label="Product images">
          {product.images.map((image, index) => (
            <button key={`${image}-${index}`} className={index === activeImage ? "active" : ""} onClick={() => selectImage(index)} aria-label={`View ${product.name} image ${index + 1}`}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

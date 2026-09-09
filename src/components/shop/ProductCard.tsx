import { ArrowUpRight, Plus } from "lucide-react";
import type { Product } from "../../data";

type Props = {
	product: Product;
	onAdd: (p: Product) => void;
	navigate: (to: string) => void;
	large?: boolean;
};

export function ProductCard({ product, onAdd, navigate, large = false }: Props) {
	return (
		<article className={`product-card shop-product-card ${large ? "product-card-large" : ""}`}>
			<div className="shop-product-media">
				<button className="product-image" onClick={() => navigate(`/product/${product.id}`)} aria-label={`View ${product.name}`}>
					<img src={product.images[0]} alt={product.name} loading="lazy" />
					{product.badge && <span>{product.badge}</span>}
					<i><ArrowUpRight size={17} /></i>
				</button>
				<button className="shop-quick-add" onClick={() => onAdd(product)}>
					<Plus size={14} /> Quick add
				</button>
			</div>
			<div className="product-card-info">
				<div className="shop-product-copy">
					<button className="shop-product-name" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</button>
					<p>{product.category}</p>
				</div>
				<div className="product-price">
					<strong>₹{product.price}</strong>
					<small>{product.weight}</small>
				</div>
			</div>
		</article>
	);
}

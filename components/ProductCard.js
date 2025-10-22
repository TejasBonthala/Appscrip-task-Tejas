
import Image from "next/image";

export default function ProductCard({ product }) {
  const altText = `${product.title} - ${product.category}`;
  return (
    <article className="productCard">
      <div className="productImage">
        <Image
          src={product.image}
          width={420}
          height={300}
          alt={altText}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div>
        <div className="productTitle">{product.title}</div>
        <div className="productMeta">
          Sign in or Create an account to see pricing
        </div>
      </div>
    </article>
  );
}

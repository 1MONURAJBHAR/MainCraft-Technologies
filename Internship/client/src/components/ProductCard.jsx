import React from "react";

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="productCard">
      <div className="cardTop">
        <h3 className="productTitle">{product.title}</h3>
        <span className="price">₹ {product.price}</span>
      </div>

      <p className="desc">
        {product.description || "No description provided."}
      </p>

      <div className="cardFooter">
        <button className="btn-edit" onClick={() => onEdit(product)}>
          Edit
        </button>

        <button className="btnDanger" onClick={() => onDelete(product._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

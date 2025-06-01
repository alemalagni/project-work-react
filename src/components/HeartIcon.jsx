import React, { useState } from "react";

const HeartIcon = ({ onToggle, manga }) => {

  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation(); // Evita che il click sul cuore si propaghi al Link della card

    const newLiked = !liked;
    setLiked(newLiked);
    if (onToggle) {
      onToggle(newLiked); // Passa lo stato di "liked" al genitore
    }
  };

  return (
    <i
      className={`${liked ? "fas" : "far"} fa-heart text-danger`}
      onClick={toggleLike}
      style={{ cursor: "pointer" }}
      aria-label="Aggiungi/Rimuovi dalla Wishlist"
    ></i>
  );
};

export default HeartIcon;
import React, { useState } from "react";

const HeartIcon = ({ onToggle }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (onToggle) {
      onToggle(newLiked);
    }
  };

  return (
    <i
      className={`${liked ? "fas" : "far"} fa-heart fa-2x text-danger`}
      onClick={toggleLike}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default HeartIcon;

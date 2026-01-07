import React from "react";
import "./WishlistRibbon.css";

interface WishlistRibbonProps {
  size?: number;
  className?: string;
}

const WishlistRibbon: React.FC<WishlistRibbonProps> = ({
  size = 48,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 64"
      width={size}
      height={(size / 48) * 64}
      className={`WishlistRibbon ${className}`}
    >
      {/* Ribbon shape - dark transparent fill with grey stroke */}
      <path
        d="M48 0H0v64l24-17.87L48 64V0Z"
        fill="rgba(0, 0, 0, 0.5)"
        stroke="rgba(128, 128, 128, 0.5)"
        strokeWidth="2"
        className="WishlistRibbon-outline"
      />

      {/* Heart icon - no fill, white stroke only */}
      <path
        d="M35.3 18.08a6.57 6.57 0 0 0-10.44-1.71l-.86.78-.83-.76a6.53 6.53 0 0 0-5.69-1.8a6.45 6.45 0 0 0-3.57 10.95l9.37 9.66a1 1 0 0 0 1.44 0l9.36-9.64a6.4 6.4 0 0 0 1.22-7.48Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        className="WishlistRibbon-heart"
      />
    </svg>
  );
};

export default WishlistRibbon;

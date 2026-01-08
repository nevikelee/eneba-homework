import { useState } from "react";
import type GameOfferBase from "../types/GameOffer";
import { Heart, Plus, ShoppingCart } from "lucide-react";

import type Delivery from "../types/Delivery";
import "./ListingCard.css";

import CashbackIcon from "./icons/CashbackIcon";
import SoldOutIcon from "./icons/SoldOutIcon";
import InfoIcon from "./icons/InfoIcon";

import WishlistRibbon from "./WishlistRibbon";

interface Props {
  offer: GameOfferBase;
  likes: number;
  delivery?: Delivery;
}

const ListingCard: React.FC<Props> = ({ offer, likes, delivery }) => {
  const title = `${offer.title} (${offer.platform}) ${
    delivery?.title.toLowerCase() === "nintendo"
      ? "eShop"
      : `${delivery?.title.toUpperCase()}`
  } Key ${offer.region.toUpperCase()}`;
  const price = Number(offer.price);
  const discount = Number(offer.discount);
  const cashback = Number(offer.cashback);
  const originalPrice = price;
  const finalPrice = discount > 0 ? price * (1 - discount) : price;

  const [hoveringCart, setHoveringCart] = useState(false);
  return (
    <div className={`card ${price === -1 ? "sold" : ""}`}>
      {/* Wishlist */}
      <div className="wishlistRibbonContainer">
        <button
          className="wishlistBtn"
          aria-label={`Add ${title} to wishlist`}
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            console.log("Add to wishlist:", offer.id);
          }}
        >
          <span className="wishlistBtnInner">
            <span className="wishlistIconWrapper">
              <WishlistRibbon size={48} />
            </span>
          </span>
        </button>
      </div>

      {/* Image Section */}
      <div className={price === -1 ? "imageWrapper inactive" : "imageWrapper"}>
        <picture>
          <img
            src={offer.image_url}
            alt={title}
            className={`image ${hoveringCart ? "hovered" : ""}`}
          />
        </picture>

        {/* Platform Banner */}
        <div className="platformBanner">
          <div className="platformContent">
            <img
              src={delivery?.icon_url}
              alt={delivery?.title}
              className="platformIcon"
            />
            <span className="platformText">{delivery?.title}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {cashback > 0 && (
          <div className="cashbackBadge">
            <CashbackIcon />
            <span className="cashbackText" style={{ color: "black" }}>
              CASHBACK
            </span>
          </div>
        )}

        <div className="titleRegion">
          <h3 className={`title ${price === -1 ? "inactive" : ""}`}>{title}</h3>
          <span className={`region ${price === -1 ? "inactive" : ""}`}>
            {offer.region.toUpperCase()}
          </span>
        </div>

        {price === -1 ? (
          <>
            <div className="priceSection soldOut">
              <SoldOutIcon />
              <span className="soldOutText"> Sold out</span>
            </div>
          </>
        ) : (
          <>
            <div className="priceSection">
              <div className="priceTop">
                {discount > 0 ? (
                  <>
                    <span className="fromText">From</span>
                    <span className="originalPrice">
                      €{originalPrice.toFixed(2)}
                    </span>
                    <span className="discountBadge">
                      -{Math.round(discount * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="fromText">From</span>
                )}
              </div>

              <div className="priceBottom">
                <span className="finalPrice">€{finalPrice.toFixed(2)}</span>
                <InfoIcon size={20} className="infoIcon" />
              </div>

              {cashback > 0 && (
                <p className="cashbackText">
                  Cashback: €{(finalPrice * cashback).toFixed(2)}
                </p>
              )}
            </div>
          </>
        )}

        <div className="likesSection">
          <Heart size={20} />
          <span className="likesCount">{likes}</span>
        </div>
      </div>

      {price !== -1 && (
        <div className="hoverButtons">
          <button
            className="addToCartBtn"
            onMouseEnter={() => setHoveringCart(true)}
            onMouseLeave={() => setHoveringCart(false)}
          >
            <span className="cartIcon">
              <Plus color="#fff" size={24} />
              <ShoppingCart color="#fff" size={24} />
            </span>
            <span className="cartText">Add to Cart</span>
          </button>
          <button className="exploreBtn">Explore Options</button>
        </div>
      )}
    </div>
  );
};

export default ListingCard;

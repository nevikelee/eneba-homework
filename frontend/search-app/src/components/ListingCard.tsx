import type GameOffer from '../types/GameOffer';
import { Heart } from 'lucide-react';
import type Delivery from '../types/Delivery';
import './ListingCard.css';

// import CashbackIcon from './icons/CashbackIcon';
// import SoldOutIcon from './icons/SoldOutIcon';

import CashbackIcon from './icons/CashbackIcon';
import SoldOutIcon from './icons/SoldOutIcon';

interface Props {
  offer: GameOffer;
  delivery?: Delivery;
}

const ListingCard: React.FC<Props> = ({ offer, delivery }) => {
  const title = `${offer.title} (${offer.platform}) ${delivery?.title.toLowerCase() === "nintendo" ? "eShop" : `${delivery?.title.toUpperCase()}`} Key ${offer.region.toUpperCase()}`;
  const price = Number(offer.price);
  const discount = Number(offer.discount);
  const cashback = Number(offer.cashback);
  const originalPrice = price;
  const finalPrice = discount > 0 ? price * (1 - discount) : price;
  const likes = Math.round(Math.random() * 1000) || 0;

  return (
    <div className="card">
      {/* Image Section with Cashback Badge */}
      <div className={price === -1 ? "imageWrapper inactive" : "imageWrapper"}>
        <img src={offer.image_url} alt={title} className="image" />
        
        {/* Cashback Badge */}
        {cashback > 0 && (
          <div className="cashbackBadge">

            <CashbackIcon />
            CASHBACK
          </div>
        )}

        {/* Wishlist Heart */}
        <button className="wishlistBtn">
          <Heart size={20} fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth={2} />
        </button>

        {/* Platform Banner - positioned at bottom of image */}
        <div className="platformBanner">
          <div className="platformContent">
            <div className="platformIcon"><img src={delivery?.icon_url} className="platformIcon"/></div>
            <span className="platformText">{delivery?.title}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={price === -1 ? "content inactive" : "content"}>
        {/* Title */}
        <h3 className="title">{title}</h3>
        
        {/* Region */}
        <p className="region">{offer.region.toUpperCase()}</p>

        {/* Price Section */}
        {price === -1 ? (
          <div className="priceSection soldOut">
            <SoldOutIcon /> 
            <span className="soldOutText"> Sold out</span>
          </div>
        ) : (
          <>
            <div className="priceSection">
              <div className="priceTop">
                {discount > 0 ? (
                  <>
                    <span className="fromText">From</span>
                    <span className="originalPrice">€{originalPrice.toFixed(2)}</span>
                    <span className="discountBadge">-{Math.round(discount * 100)}%</span>
                  </>
                ) : (
                  <span className="fromText">From</span>
                )}
              </div>
              
              <div className="priceBottom">
                <span className="finalPrice">€{finalPrice.toFixed(2)}</span>
                <div className="infoIcon">ⓘ</div>
              </div>
            </div>
              
            {/* Cashback Info */}
            {cashback > 0 && (
              <p className="cashbackText">
                Cashback: €{(price * cashback).toFixed(2)}
              </p>
            )}
          </>
        )}


        {/* Likes Counter */}
        <div className="likesSection">
          <Heart size={16} fill="rgba(255,255,255,0.5)" stroke="none" />
          <span className="likesCount">{likes}</span>
        </div>
      </div>
    </div>
  );
};


export default ListingCard;
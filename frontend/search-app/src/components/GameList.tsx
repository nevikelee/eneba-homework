import { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import Pagination from "./Pagination";
import type { GameOffer } from "../types/GameOffer";
import type Delivery from "../types/Delivery";
import "./GameList.css";

interface GameListProps {
  offers: GameOffer[];
  likes: Record<number, number>;
  deliveryMap: Record<string, Delivery>;
}

const ITEMS_PER_PAGE = 12;

const GameList: React.FC<GameListProps> = ({ offers, likes, deliveryMap }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [offers]);

  const totalPages = Math.ceil(offers.length / ITEMS_PER_PAGE);
  const currentOffers = offers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (offers.length === 0) return <p className="results">No results found</p>;

  return (
    <>
      <p className="results">
        Results found: {offers.length} (Page {currentPage} of {totalPages})
      </p>

      <div className="game-grid">
        {currentOffers.map((offer) => (
          <ListingCard
            key={offer.id}
            offer={offer}
            likes={likes[offer.id] ?? 0}
            delivery={deliveryMap[offer.delivery]}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default GameList;

import ListingCard from './ListingCard';
import type GameOffer from '../types/GameOffer';
import type Delivery from '../types/Delivery';
import './GameList.css';


interface GameListProps {
  offers: GameOffer[];
  deliveryMap: Record<string, Delivery>;
}

const GameList: React.FC<GameListProps> = ({ offers, deliveryMap }) => {
  return (
    <>
      <p className="results">Results found: {offers.length}</p>

      <div className="game-grid">
        {offers.map((offer) => (
          <ListingCard key={offer.id} offer={offer} delivery={deliveryMap[offer.delivery]} />
        ))}
      </div>
    </>
  );
};


export default GameList;

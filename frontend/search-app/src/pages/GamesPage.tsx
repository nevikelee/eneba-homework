import { useEffect, useState } from 'react';
import GameList from '../components/GameList';
import type ListingDto from '../types/GameOffer';
import type Delivery from '../types/Delivery';

const GamesPage = () => {
  const [offers, setOffers] = useState<ListingDto[]>([]);
  // Store the full Delivery object indexed by its ID string
  const [deliveryMap, setDeliveryMap] = useState<Record<string, Delivery>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/games').then(res => res.json()),
      fetch('http://localhost:8080/api/deliveries').then(res => res.json())
    ])
      .then(([gamesData, deliveryData]: [ListingDto[], Delivery[]]) => {
        // Create a lookup map: { "1": { id: 1, title: "Xbox Live", icon_url: "..." } }
        const map: Record<string, Delivery> = {};
        
        deliveryData.forEach((item) => {
          map[item.id.toString()] = item;
        });
        
        setDeliveryMap(map);
        setOffers(gamesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading games...</p>;

  return <GameList offers={offers} deliveryMap={deliveryMap} />;
};

export default GamesPage;
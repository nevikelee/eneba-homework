import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import GameList from "../components/GameList";
import type { GameOffer } from "../types/GameOffer";
import type Delivery from "../types/Delivery";

const GamesPage = () => {
  const [offers, setOffers] = useState<GameOffer[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>([]);
  const [deliveryMap, setDeliveryMap] = useState<Record<string, Delivery>>({});
  const [loading, setLoading] = useState(true);

  const fetchGames = async (query: string = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/games${
          query ? `?search=${encodeURIComponent(query)}` : ""
        }`
      );
      const data: GameOffer[] = await res.json();

      const likesById: Record<number, number> = data.reduce((acc, offer) => {
        acc[offer.id] = Math.floor(Math.random() * 500) + 1;
        return acc;
      }, {} as Record<number, number>);

      setLikes(likesById);
      // Sort: available items first, sold out items last
      const sortedData = data.sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);

        // If both sold out or both available, maintain original order
        if (
          (priceA === -1 && priceB === -1) ||
          (priceA !== -1 && priceB !== -1)
        ) {
          return 0;
        }

        // Push sold out (price === -1) to the end
        return priceA === -1 ? 1 : -1;
      });

      setOffers(sortedData);

      // Fetch deliveries if not already done
      if (Object.keys(deliveryMap).length === 0) {
        const deliveryRes = await fetch("http://localhost:8080/api/deliveries");
        const deliveryData: Delivery[] = await deliveryRes.json();
        const map: Record<string, Delivery> = {};
        deliveryData.forEach((item) => (map[item.id.toString()] = item));
        setDeliveryMap(map);
      }
    } catch (err) {
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all games initially
  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearch = (query: string) => {
    fetchGames(query);
  };

  return (
    <>
      <Navigation onSearch={handleSearch} />

      {loading ? (
        <p>Loading games...</p>
      ) : (
        <GameList offers={offers} likes={likes} deliveryMap={deliveryMap} />
      )}
    </>
  );
};

export default GamesPage;

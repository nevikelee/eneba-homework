export default interface GameOffer {
  id: number;
  game_id: number;
  title: string;

  edition?: string;
  platform: string;
  delivery: number;
  region: string;

  price: number;
  discount: number;
  cashback: number;

  image_url: string;
}
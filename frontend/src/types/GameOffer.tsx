export default interface GameOfferBase {
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

export type GameOffer = GameOfferBase & {
  likes: number
}
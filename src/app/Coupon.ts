
export interface Coupon {
  bets: [
    {game: string; odd: number},
    {game: string; odd: number}?,
    {game: string; odd: number}?,
    {game: string; odd: number}?,
  ];
  newpotentialReturn: number;
  stake: number;
  finalOdds: number;
  id?: string;
}

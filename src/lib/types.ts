
export type Donation = {
  id: string;
  amount: number;
  currency: string;
  date: string; // ISO 8601 format
  cause?: string;
};
 

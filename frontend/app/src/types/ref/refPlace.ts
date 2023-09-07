import { refCountry } from "types/ref/refCountry";
import { refGenre } from "types/ref/refGenre";

export type refPlace = {
  id: number;
  name: string;
  // countries: Array<refCountry>;
  // genres: Array<refGenre>;
  imageUrl: string;
  panoramaUrl: string;
}

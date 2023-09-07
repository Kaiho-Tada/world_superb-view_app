import { refCountry } from "types/ref/refCountry";
import { refGenre } from "types/ref/refGenre";

export type Place = {
  id: number;
  countries: Array<refCountry>;
  genres: Array<refGenre>;
  name: string;
  imageUrl: string;
  season: string;
  panoramaUrl: string;
}

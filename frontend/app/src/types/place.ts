import { Country } from "./country";

export type Place = {
  id: number;
  countries: Array<Country>;
  createdAt: string;
  name: string;
  imageUrl: string;
  updatedAt: string;
  panoramaUrl: string | null;
}

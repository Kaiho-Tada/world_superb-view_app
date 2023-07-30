import { Country } from "./country";

export type Places = {
  id: number;
  countries: Array<Country>;
  createdAt: string;
  name: string;
  imageUrl: string;
  updatedAt: string;
  panoramaUrl: string | null;
}

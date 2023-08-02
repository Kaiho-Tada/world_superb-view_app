import { Country } from "./country";

export type Place = {
  id: number;
  countries: Array<Country>;
  createdAt: Date;
  name: string;
  imageUrl: string;
  updatedAt: Date;
  panoramaUrl: string | null;
}

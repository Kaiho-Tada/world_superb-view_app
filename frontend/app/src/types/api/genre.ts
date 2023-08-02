import { Place } from "./place";

export type Genre = {
  category: string;
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
  places: Array<Place>;
}

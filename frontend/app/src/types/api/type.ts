import { Place } from "./place";

export type Type = {
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
  places: Array<Place>;
}

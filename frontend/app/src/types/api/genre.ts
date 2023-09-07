import { refPlace } from "types/ref/refPlace";

export type Genre = {
  category: string;
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
  places: Array<refPlace>;
}

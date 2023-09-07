import { refPlace } from "types/ref/refPlace";

export type Type = {
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
  places: Array<refPlace>;
}

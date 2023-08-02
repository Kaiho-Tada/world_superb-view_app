import { Place } from "./place";
import { State } from "./state";

export type Country = {
  createdAt: Date;
  id: number;
  name: string;
  stateId: number;
  updatedAt: Date;
  places: Array<Place>;
  state: State
}

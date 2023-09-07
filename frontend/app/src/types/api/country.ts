import { refPlace } from "types/ref/refPlace";
import { State } from "./state";

export type Country = {
  // createdAt: Date;
  id: number;
  name: string;
  stateId: number;
  // updatedAt: Date;
  places: Array<refPlace>;
  state: State;
  riskLevel: number;
}

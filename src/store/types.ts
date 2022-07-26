import { Launch, Launchpad, Rocket } from "../model/types";
import { IMap } from "../types";

export interface IState {
  launches: IMap<Launch>;
  rockets: IMap<Rocket>;
  launchpads: IMap<Launchpad>;
  loaded: boolean;
}

import { IBit } from "./ibit";

export interface IBitMap {
  [xkey: number]: { [ykey: number]: IBit };
}

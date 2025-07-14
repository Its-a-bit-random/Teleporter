import { atom } from "@rbxts/charm";
import { Location } from "../Types";
import { UpdateLocations } from "./Signals";

export const displayLocations = atom<Location[]>([]);
export const playerLocations = atom<number[]>([]);

UpdateLocations.Connect((state) => displayLocations(state));

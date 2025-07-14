import { atom } from "@rbxts/charm";
import { Location } from "../Types";
import { UpdateLocations } from "./Signals";

export const displayLocations = atom<Location[]>([]);

UpdateLocations.Connect((state) => displayLocations(state));

import { Dependency, Studio } from "@rbxts/comet";
import SaveSystem from "../Systems/SaveSystem";
import { Location } from "../Types";
import { GetSharedPositionsFolder, LoadLocationFromConfig } from "./Config";
import { UpdateLocations } from "./Signals";

export function SendUpdateLocations(locations: Location[]) {
	GetSharedPositionsFolder()
		.GetChildren()
		.forEach((value) => locations.push(LoadLocationFromConfig(value as Configuration)));

	UpdateLocations.Fire(locations);
}

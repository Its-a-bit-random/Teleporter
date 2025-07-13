import { Dependency, Studio } from "@rbxts/comet";
import SaveSystem from "../Systems/SaveSystem";
import { Location } from "../Types";
import { GetSharedPositionsFolder, LoadLocationFromConfig } from "./Config";

export function GetLocations() {
	const SaveSystemClass = Dependency(SaveSystem);
	const locations = SaveSystemClass.LoadLocations();
	const instances = GetSharedPositionsFolder();

	const sharedLocations: Location[] = [];

	instances.GetChildren().forEach((config) => {
		sharedLocations.push(LoadLocationFromConfig(config as Configuration));
	});

	return $tuple(locations, sharedLocations);
}

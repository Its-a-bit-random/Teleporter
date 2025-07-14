import { Dependency, Studio } from "@rbxts/comet";
import SaveSystem from "../Systems/SaveSystem";
import { Location } from "../Types";
import { GetSharedPositionsFolder, LoadLocationFromConfig } from "./Config";
import { UpdateLocations } from "./Signals";
import { Workspace } from "@rbxts/services";

export function SendUpdateLocations(locations: Location[]) {
	GetSharedPositionsFolder()
		.GetChildren()
		.forEach((value) => locations.push(LoadLocationFromConfig(value as Configuration)));

	UpdateLocations.Fire(locations);
}

export function GetCameraCFrame() {
	const cframe = Workspace.CurrentCamera!.CFrame;
	return cframe;
}

export function TeleportCamera(cframe: CFrame) {
	const Camera = Workspace.CurrentCamera!;
	Camera.CFrame = cframe;
}

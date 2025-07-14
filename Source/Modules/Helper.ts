import { Dependency, Studio } from "@rbxts/comet";
import SaveSystem from "../Systems/SaveSystem";
import { CameraLocation, Location } from "../Types";
import { GetSharedPositionsFolder, LoadLocationFromConfig } from "./Config";
import { UpdateLocations } from "./Signals";
import { Workspace } from "@rbxts/services";

export function SendUpdateLocations(locations: Location[]) {
	GetSharedPositionsFolder()
		.GetChildren()
		.forEach((value) => locations.push(LoadLocationFromConfig(value as Configuration)));

	UpdateLocations.Fire(locations);
}

export function GetCameraCFrame(): CameraLocation {
	const cframe = Workspace.CurrentCamera!.CFrame;
	const focus = Workspace.CurrentCamera!.Focus;

	return { CFrame: cframe, Focus: focus };
}

export function TeleportCamera(location: CameraLocation) {
	const Camera = Workspace.CurrentCamera!;
	Camera.Focus = location.Focus;
	Camera.CFrame = location.CFrame;
}

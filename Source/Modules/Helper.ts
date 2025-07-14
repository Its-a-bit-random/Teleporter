import { Dependency, Studio } from "@rbxts/comet";
import SaveSystem from "../Systems/SaveSystem";
import { CameraLocation, Location } from "../Types";
import { GetPlayerPositionsFolder, GetSharedPositionsFolder, LoadLocationFromConfig } from "./Config";
import { UpdateLocations } from "./Signals";
import { Players, TweenService, Workspace } from "@rbxts/services";
import { playerLocations } from "./State";

export function SendUpdateLocations(locations: Location[]) {
	GetSharedPositionsFolder()
		.GetChildren()
		.forEach((value) => locations.push(LoadLocationFromConfig(value as Configuration)));

	UpdateLocations.Fire(locations);
}

export function SendUpdatePlayerLocations() {
	const userIds: number[] = [];

	GetPlayerPositionsFolder()
		.GetChildren()
		.forEach((value) => {
			const user = tonumber(value.Name)!;
			if (user === Players.LocalPlayer.UserId) return;

			userIds.push(user);
		});

	playerLocations(userIds);
}

export function GetCameraCFrame(): CameraLocation {
	const cframe = Workspace.CurrentCamera!.CFrame;
	const focus = Workspace.CurrentCamera!.Focus;

	return { CFrame: cframe, Focus: focus };
}

export function TeleportCamera(location: CameraLocation) {
	const Camera = Workspace.CurrentCamera!;

	//const tween = TweenService.Create(
	//Camera,
	//new TweenInfo(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, 0, false, 0),
	//{
	//Focus: location.Focus,
	//CFrame: location.CFrame,
	//},
	//).Play();
	//

	Camera.Focus = location.Focus;
	Camera.CFrame = location.CFrame;
}

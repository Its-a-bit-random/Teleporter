import { Workspace } from "@rbxts/services";
import { CONSTANTS, Location, PluginFolder } from "../Types";

export function GetRootFolder() {
	const foundFolder = Workspace.Terrain.FindFirstChild(CONSTANTS.PluginRootFolderName);

	if (foundFolder === undefined) {
		const newFolder = new Instance("Folder");
		newFolder.Name = CONSTANTS.PluginRootFolderName;
		newFolder.Archivable = false;
		newFolder.Parent = Workspace.Terrain;
		return newFolder;
	}

	return foundFolder;
}

export function GetPluginFolder() {
	const root = GetRootFolder();

	const pluginFolder = root.FindFirstChild("Teleporter") as PluginFolder | undefined;

	if (pluginFolder === undefined) {
		const newFolder = new Instance("Folder") as PluginFolder;
		newFolder.Name = CONSTANTS.PluginFolderName;
		newFolder.Archivable = false;
		newFolder.Parent = root;

		GetSharedPositionsFolder(newFolder);
		GetPlayerPositionsFolder(newFolder);

		return newFolder;
	}

	GetSharedPositionsFolder(pluginFolder);
	GetPlayerPositionsFolder(pluginFolder);

	return pluginFolder;
}

export function GetPlayerPositionsFolder(pluginFolder: PluginFolder = GetPluginFolder()) {
	const foundFolder = pluginFolder.FindFirstChild("PlayerPositions") as typeof pluginFolder.PlayerPositions;

	if (foundFolder === undefined) {
		const positionsFolder = new Instance("Folder");
		positionsFolder.Name = "PlayerPositions";
		positionsFolder.Archivable = false;
		positionsFolder.Parent = pluginFolder;
		return positionsFolder;
	}

	return foundFolder;
}

export function GetSharedPositionsFolder(pluginFolder: PluginFolder = GetPluginFolder()) {
	const foundFolder = pluginFolder.FindFirstChild("SharedPositions") as typeof pluginFolder.SharedPositions;

	if (foundFolder === undefined) {
		const positionsFolder = new Instance("Folder");
		positionsFolder.Name = "SharedPositions";
		positionsFolder.Archivable = false;
		positionsFolder.Parent = pluginFolder;
		return positionsFolder;
	}

	return foundFolder;
}

export function LoadLocationFromConfig(config: Configuration): Location {
	return {
		Position: (config.GetAttribute("Position") as CFrame) ?? new CFrame(-1, -1, -1),
		Name: (config.GetAttribute("Name") as string) ?? "Failed to read name",
		CreatedBy: (config.GetAttribute("CreatedBy") as string) ?? "Unknown",
		SharedConfigInstance: config,
	};
}

export function CreateConfigFromLocation(location: Location) {
	print("Saving shared location:", location);

	const config = new Instance("Configuration");
	config.SetAttribute("Position", location.Position);
	config.SetAttribute("Name", location.Name);
	config.SetAttribute("CreatedBy", location.CreatedBy);
	config.Archivable = false;
	config.Parent = GetSharedPositionsFolder();
}

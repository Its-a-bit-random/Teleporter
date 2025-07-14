import { Location, PluginFolder } from "../Types";

const CoreGui = game.GetService("CoreGui");

export function GetRootFolder() {
	const foundFolder = CoreGui.FindFirstChild("Its-a-bit-random-plugins");

	if (foundFolder === undefined) {
		const newFolder = new Instance("Folder");
		newFolder.Name = "Its-a-bit-random-plugins";
		newFolder.Parent = CoreGui;
		return newFolder;
	}

	return foundFolder;
}

export function GetPluginFolder() {
	const root = GetRootFolder();

	const pluginFolder = root.FindFirstChild("Teleporter") as PluginFolder | undefined;

	if (pluginFolder === undefined) {
		const newFolder = new Instance("Folder") as PluginFolder;
		newFolder.Name = "Teleporter";
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
	const config = new Instance("Configuration");
	config.SetAttribute("Position", location.Position);
	config.SetAttribute("Name", location.Name);
	config.SetAttribute("CreatedBy", location.CreatedBy);
	config.Parent = GetSharedPositionsFolder();
}

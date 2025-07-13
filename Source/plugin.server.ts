import { Comet } from "@rbxts/comet";
import { GetPluginFolder, GetRootFolder } from "./Modules/Config";

// Ensure plugin folder is setup correct
GetPluginFolder();

Comet.createApp("Teleporter");
Comet.addPaths(script.Parent!.FindFirstChild("Systems")!, true);
Comet.launch();

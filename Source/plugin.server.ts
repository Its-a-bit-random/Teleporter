import { Comet } from "@rbxts/comet";

Comet.createApp("Teleporter");
Comet.addPaths(script.Parent!.FindFirstChild("Systems")!, true);
Comet.launch();

import { Button, Dependency, GUI, OnStart, Studio, System } from "@rbxts/comet";
import React from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Workspace } from "@rbxts/services";
import App from "../GUI/App";

@System()
export class GuiSystem implements OnStart {
	private GUI = Dependency(GUI);
	private Studio = Dependency(Studio);

	onStart(): void | Promise<void> {
		const widget = this.GUI.createWidget(
			"Teleporter",
			new Vector2(350, 500),
			new Vector2(350, 500),
			Enum.InitialDockState.Float,
		);

		const button = this.GUI.createButton("Toggle", "Toggle the GUI", "", true, false);
		widget.linkButton(button);

		widget.mount((root) => {
			const reactRoot = createRoot(root);
			reactRoot.render(createPortal(React.createElement(App), root));
			return () => reactRoot.unmount();
		});
	}
}

import { Button, Dependency, GUI, OnStart, System } from "@rbxts/comet";
import { Workspace } from "@rbxts/services";

@System()
export class GuiSystem implements OnStart {
	private GUI = Dependency(GUI);

	onStart(): void | Promise<void> {
		const button = this.GUI.createButton("MyButton", "Test", "", false);
		button.onPress(() => {
			const camera = Workspace.CurrentCamera!;
			camera.Focus = new CFrame(0, 0, 0);
			camera.CFrame = new CFrame(0, 1000, 0);
		});
	}
}

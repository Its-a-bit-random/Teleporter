import { Dependency, OnEnd, OnHeartbeat, OnStart, Studio, System, Track } from "@rbxts/comet";
import { Players, Workspace } from "@rbxts/services";
import { GetPlayerPositionsFolder } from "../Modules/Config";

@System()
export default class LocationWatcher implements OnHeartbeat, OnEnd {
	public GetPositionValue(player: Player) {
		const foundPos = GetPlayerPositionsFolder().FindFirstChild(player.UserId) as CFrameValue | undefined;

		if (foundPos === undefined) {
			const newValue = new Instance("CFrameValue");
			newValue.Name = tostring(player.UserId);
			newValue.Parent = GetPlayerPositionsFolder();

			return newValue;
		}

		return foundPos;
	}

	private _SetPositionValue(player: Player, position: CFrame) {
		const value = (this.GetPositionValue(player).Value = position);
	}

	onHeartbeat(): void {
		const player = Players.LocalPlayer;
		if (player === undefined) return;

		const camera = Workspace.CurrentCamera;
		if (camera === undefined) return;

		const cameraCFrame = camera.CFrame;
		this._SetPositionValue(player, cameraCFrame);
	}

	onEnd(): void {
		if (Players.LocalPlayer) this.GetPositionValue(Players.LocalPlayer).Destroy();
	}
}

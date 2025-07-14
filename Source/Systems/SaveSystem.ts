import { Dependency, OnEnd, OnStart, Studio, System, Track } from "@rbxts/comet";
import { HttpService } from "@rbxts/services";
import { Location } from "../Types";
import { GetSharedPositionsFolder } from "../Modules/Config";
import { SendUpdateLocations } from "../Modules/Helper";

@System()
export default class SaveSystem implements OnStart {
	private Studio = Dependency(Studio);

	public LoadLocations() {
		const id = game.PlaceId;
		const loaded = this.Studio.plugin.GetSetting(tostring(id)) as Location[];

		if (loaded) {
			return loaded;
		}

		return [];
	}

	public SaveLocations(locations: Location[]) {
		const id = game.PlaceId;
		this.Studio.plugin.SetSetting(tostring(id), locations);
	}

	private _TrackAttributeChangeAndReload(config: Instance, attrib: string) {
		Track(config.GetAttributeChangedSignal(attrib).Connect(() => SendUpdateLocations(this.LoadLocations())));
	}

	onStart(): void | Promise<void> {
		Track(
			GetSharedPositionsFolder().ChildAdded.Connect((child) => {
				SendUpdateLocations(this.LoadLocations());
				this._TrackAttributeChangeAndReload(child, "Name");
				this._TrackAttributeChangeAndReload(child, "CreatedBy");
				this._TrackAttributeChangeAndReload(child, "Position");
			}),
		);
		Track(
			GetSharedPositionsFolder().ChildRemoved.Connect(() => {
				SendUpdateLocations(this.LoadLocations());
			}),
		);

		GetSharedPositionsFolder()
			.GetChildren()
			.forEach((child) => {
				this._TrackAttributeChangeAndReload(child, "Name");
				this._TrackAttributeChangeAndReload(child, "CreatedBy");
				this._TrackAttributeChangeAndReload(child, "Position");
			});
	}
}

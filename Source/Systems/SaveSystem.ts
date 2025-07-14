import { Dependency, OnEnd, OnStart, Studio, System, Track } from "@rbxts/comet";
import { HttpService } from "@rbxts/services";
import { Location } from "../Types";
import { GetSharedPositionsFolder } from "../Modules/Config";
import { SendUpdateLocations } from "../Modules/Helper";
import { CreatePrivateLocation, DeletePrivateLocation } from "../Modules/Signals";

@System()
export default class SaveSystem implements OnStart {
	private Studio = Dependency(Studio);

	public LoadLocations() {
		const id = game.PlaceId;
		const loaded = this.Studio.plugin.GetSetting(tostring(id) + "-ABC") as string;

		if (loaded) {
			const loadedInfo = HttpService.JSONDecode(loaded) as Location[];

			const locations: Location[] = [];
			print(loadedInfo);
			loadedInfo.forEach((loc) => {
				locations.push({
					...loc,
					Position: new CFrame(loc.Position.X, loc.Position.Y, loc.Position.Z),
				});
			});

			return locations;
		}

		return [];
	}

	public SaveLocations(locations: Location[]) {
		const id = game.PlaceId;
		this.Studio.plugin.SetSetting(tostring(id) + "-ABC", HttpService.JSONEncode(locations));
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

		Track(
			CreatePrivateLocation.Connect((newLocation) => {
				const locations = this.LoadLocations();
				locations.push(newLocation);

				const toSaveLocations: Location[] = [];

				locations.forEach((loc) => {
					toSaveLocations.push({
						...loc,
						Position: {
							X: loc.Position.X,
							Y: loc.Position.Y,
							Z: loc.Position.Z,
						} as unknown as CFrame,
						PrivateSaveId: loc.PrivateSaveId ?? HttpService.GenerateGUID(false),
					});
				});

				this.SaveLocations(toSaveLocations);
				SendUpdateLocations(this.LoadLocations());
			}),
		);

		Track(
			DeletePrivateLocation.Connect((saveId) => {
				const locations = this.LoadLocations();
				const index = locations.findIndex((loc) => loc.PrivateSaveId === saveId);

				if (index === undefined) {
					warn("Couldnt find location from saveId");
					return;
				}

				locations.remove(index);
				this.SaveLocations(locations);
				SendUpdateLocations(locations);
			}),
		);
	}
}

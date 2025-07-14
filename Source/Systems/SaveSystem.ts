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
		const loaded = this.Studio.plugin.GetSetting(tostring(id) + "-DEV2") as string;

		if (loaded) {
			if (typeIs(loaded, "string")) {
				const loadedInfo = HttpService.JSONDecode(loaded) as Location[];

				const locations: Location[] = [];
				loadedInfo.forEach((loc) => {
					locations.push({
						...loc,
						Position: new CFrame(loc.Position.X, loc.Position.Y, loc.Position.Z),
					});
				});

				return locations;
			} else {
				return loaded as Location[];
			}
		}

		return [];
	}

	public SaveLocations(locations: Location[]) {
		const id = game.PlaceId;
		this.Studio.plugin.SetSetting(tostring(id) + "-DEV2", HttpService.JSONEncode(locations));
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

				newLocation = {
					...newLocation,
					Position: {
						X: newLocation.Position.X,
						Y: newLocation.Position.Y,
						Z: newLocation.Position.Z,
					} as unknown as CFrame,
					PrivateSaveId: HttpService.GenerateGUID(false),
				};

				locations.push(newLocation);
				this.SaveLocations(locations);

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

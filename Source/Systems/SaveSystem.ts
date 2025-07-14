import { Dependency, OnEnd, OnStart, Studio, System, Track } from "@rbxts/comet";
import { HttpService } from "@rbxts/services";
import { CameraLocation, Location } from "../Types";
import { GetSharedPositionsFolder } from "../Modules/Config";
import { SendUpdateLocations } from "../Modules/Helper";
import { CreatePrivateLocation, DeletePrivateLocation } from "../Modules/Signals";

@System()
export default class SaveSystem implements OnStart {
	private Studio = Dependency(Studio);

	public LoadLocations() {
		const id = game.PlaceId;
		const loaded = this.Studio.plugin.GetSetting(tostring(id) + "-SavedLocations") as string;

		if (loaded) {
			const loadedInfo = HttpService.JSONDecode(loaded) as Location[];

			const locations: Location[] = [];
			loadedInfo.forEach((loc) => {
				locations.push({
					...loc,
					Camera: {
						CFrame: new CFrame(loc.Camera.CFrame.X, loc.Camera.CFrame.Y, loc.Camera.CFrame.Z),
						Focus: new CFrame(loc.Camera.Focus.X, loc.Camera.Focus.Y, loc.Camera.Focus.Z),
					},
				});
			});

			return locations;
		}

		return [];
	}

	public SaveLocations(locations: Location[]) {
		const id = game.PlaceId;
		this.Studio.plugin.SetSetting(tostring(id) + "-SavedLocations", HttpService.JSONEncode(locations));
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
						Camera: {
							Focus: {
								X: loc.Camera.Focus.X,
								Y: loc.Camera.Focus.Y,
								Z: loc.Camera.Focus.Z,
							},

							CFrame: {
								X: loc.Camera.CFrame.X,
								Y: loc.Camera.CFrame.Y,
								Z: loc.Camera.CFrame.Z,
							},
						} as unknown as CameraLocation,
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

				const toSaveLocations: Location[] = [];
				locations.forEach((loc) => {
					toSaveLocations.push({
						...loc,
						Camera: {
							Focus: {
								X: loc.Camera.Focus.X,
								Y: loc.Camera.Focus.Y,
								Z: loc.Camera.Focus.Z,
							},

							CFrame: {
								X: loc.Camera.CFrame.X,
								Y: loc.Camera.CFrame.Y,
								Z: loc.Camera.CFrame.Z,
							},
						} as unknown as CameraLocation,

						PrivateSaveId: loc.PrivateSaveId ?? HttpService.GenerateGUID(false),
					});
				});

				this.SaveLocations(toSaveLocations);
				SendUpdateLocations(this.LoadLocations());
			}),
		);
	}
}

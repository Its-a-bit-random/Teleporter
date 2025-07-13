import { Dependency, OnStart, Studio, System } from "@rbxts/comet";
import { HttpService } from "@rbxts/services";
import { Location } from "../Types";

@System()
export default class SaveSystem {
	private Studio = Dependency(Studio);

	public LoadLocations() {
		const id = game.PlaceId;
		const loaded = this.Studio.plugin.GetSetting(tostring(id));

		if (loaded) {
			return loaded;
		}

		return [];
	}

	public SaveLocations(locations: Location[]) {
		const id = game.PlaceId;
		this.Studio.plugin.SetSetting(tostring(id), locations);
	}
}

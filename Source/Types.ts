export interface Location {
	Position: CFrame;
	CreatedBy: string;
	Name: string;
	SharedConfigInstance?: Configuration;
	PrivateSaveId?: string;
}

export interface PluginFolder extends Folder {
	PlayerPositions: Folder;
	SharedPositions: Folder;
}

export const enum GuiPage {
	Main,
	Edit,
}

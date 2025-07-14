import Signal from "@rbxutil/signal";
import { CameraLocation, Location } from "../Types";

export const UpdateLocations = new Signal<[Location[]]>();
export const GoToEditPage = new Signal<[CameraLocation]>();
export const GoToMainPage = new Signal<void>();

export const CreatePrivateLocation = new Signal<[Location]>();
export const DeletePrivateLocation = new Signal<[string]>();

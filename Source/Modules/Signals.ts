import Signal from "@rbxutil/signal";
import { Location } from "../Types";

export const UpdateLocations = new Signal<[Location[]]>();
export const GoToEditPage = new Signal<[CFrame]>();
export const GoToMainPage = new Signal<void>();

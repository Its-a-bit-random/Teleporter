import Signal from "@rbxutil/signal";
import { Location } from "../Types";

export const UpdateLocations = new Signal<[Location[]]>();

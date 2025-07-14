import React, { useEffect, useState } from "@rbxts/react";
import { TextButton, TextLabel } from "../Components";
import { Location } from "../../Types";
import { DeletePrivateLocation, GoToEditPage, UpdateLocations } from "../../Modules/Signals";
import { Players, Workspace } from "@rbxts/services";
import { GetCameraCFrame, TeleportCamera } from "../../Modules/Helper";
import { subscribe } from "@rbxts/charm";
import { displayLocations } from "../../Modules/State";
import { GetPlayerPositionsFolder } from "../../Modules/Config";

function Location(props: { name: string; created: string; pos: CFrame; instance?: Configuration; saveId?: string }) {
	if (props.pos === undefined) {
		warn("Invalid position saved");
		return <frame BackgroundTransparency={1} />;
	}

	return (
		<frame Size={new UDim2(1, 0, 0, 75)} BackgroundTransparency={1}>
			<TextButton
				key={"TpButton"}
				Text={"GO"}
				LayoutOrder={1}
				BackgroundColor3={Color3.fromRGB(49, 121, 255)}
				BorderSizePixel={0}
				Size={UDim2.fromOffset(70, 20)}
				AnchorPoint={new Vector2(1, 1)}
				Position={new UDim2(1, -30, 1, 0)}
				Event={{
					MouseButton1Click: () => TeleportCamera(props.pos),
				}}
			/>

			<imagebutton
				key={"DeleteButton"}
				Size={UDim2.fromOffset(25, 25)}
				Position={new UDim2(1, 0, 1, 0)}
				Image={"rbxassetid://15928976491"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(1, 1)}
				BackgroundTransparency={1}
				ImageColor3={Color3.fromRGB(225, 56, 53)}
				Event={{
					MouseButton1Click: () => {
						props.instance?.Destroy();
						if (props.saveId) DeletePrivateLocation.Fire(props.saveId);
					},
				}}
			/>

			<TextLabel
				key={"Name"}
				Size={new UDim2(1, 0, 0, 30)}
				Text={props.name}
				TextSize={25}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Bottom}
			/>

			<TextLabel
				key={"Created"}
				Size={new UDim2(1, 0, 0, 30)}
				Position={UDim2.fromOffset(0, 30)}
				Text={props.saveId ? "[PRIVATE LOCATION]" : props.created}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraLight,
						Enum.FontStyle.Normal,
					)
				}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Top}
			/>

			<TextLabel
				key={"Position"}
				Size={new UDim2(1, 0, 0, 30)}
				Position={UDim2.fromOffset(0, 35)}
				Text={`(${props.pos.Position.X}, ${props.pos.Position.Y}, ${props.pos.Position.Z})`}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraLight,
						Enum.FontStyle.Normal,
					)
				}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Bottom}
			/>
		</frame>
	);
}

function Locations(props: { locations: Location[] }) {
	return (
		<>
			{props.locations.map((loc, index) => {
				if (loc.Position === undefined) {
					warn("Invalid position saved");
					return <frame BackgroundTransparency={1} />;
				}

				return (
					<Location
						name={loc.Name}
						created={loc.CreatedBy}
						pos={loc.Position}
						instance={loc.SharedConfigInstance}
						saveId={loc.PrivateSaveId}
					/>
				);
			})}
		</>
	);
}

export default () => {
	const [locations, setLocations] = useState<Location[]>(() => displayLocations());

	useEffect(() => {
		const cleanup = subscribe(displayLocations, (state) => setLocations(state));
		return () => cleanup();
	}, [setLocations]);

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<frame
				key={"Players"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(0, 10)}
				Size={new UDim2(1, 0, 0, 60)}
			>
				<uilistlayout
					key={"Layout"}
					SortOrder={Enum.SortOrder.LayoutOrder}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalFlex={Enum.UIFlexAlignment.SpaceEvenly}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				{GetPlayerPositionsFolder().GetChildren().size() <= 1 ? (
					<TextLabel
						Size={UDim2.fromScale(1, 1)}
						Text={
							"No players to teleport to :( (To teleport to a player they must have this plugin installed too!)"
						}
						TextWrapped={true}
						FontFace={
							new Font(
								"rbxasset://fonts/families/GothamSSm.json",
								Enum.FontWeight.Light,
								Enum.FontStyle.Normal,
							)
						}
					/>
				) : undefined}

				{GetPlayerPositionsFolder()
					.GetChildren()
					.map((instance) => {
						const userId = tonumber(instance.Name) as number;

						if (userId === Players.LocalPlayer.UserId) return;

						return (
							<imagebutton
								Size={UDim2.fromOffset(48, 48)}
								BackgroundTransparency={1}
								ScaleType={Enum.ScaleType.Fit}
								Image={
									Players.GetUserThumbnailAsync(
										userId,
										Enum.ThumbnailType.HeadShot,
										Enum.ThumbnailSize.Size48x48,
									)[0]
								}
								Event={{
									MouseButton1Click: () => TeleportCamera((instance as CFrameValue).Value),
								}}
							/>
						);
					})}
			</frame>

			<scrollingframe
				key={"Locations"}
				Size={new UDim2(1, 0, 1, -120)}
				Position={UDim2.fromOffset(0, 70)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarThickness={5}
				ScrollBarImageColor3={new Color3(1, 1, 1)}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				CanvasSize={new UDim2(0, 0, 1, -120)}
			>
				<uipadding
					key={"Padding"}
					PaddingTop={new UDim(0, 10)}
					PaddingBottom={new UDim(0, 10)}
					PaddingLeft={new UDim(0, 10)}
					PaddingRight={new UDim(0, 10)}
				/>

				<uilistlayout
					key={"Layout"}
					SortOrder={Enum.SortOrder.LayoutOrder}
					FillDirection={Enum.FillDirection.Vertical}
				/>

				<Locations locations={locations} />
			</scrollingframe>

			<TextButton
				key={"NewButton"}
				Text={"+ Save Location"}
				BackgroundColor3={Color3.fromRGB(225, 56, 53)}
				BorderSizePixel={0}
				Size={new UDim2(1, -20, 0, 20)}
				Position={new UDim2(0.5, 0, 1, -10)}
				AnchorPoint={new Vector2(0.5, 1)}
				Event={{
					MouseButton1Click: () => GoToEditPage.Fire(GetCameraCFrame()),
				}}
			/>
		</frame>
	);
};

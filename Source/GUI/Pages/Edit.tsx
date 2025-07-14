import React, { useRef, useState } from "@rbxts/react";
import { TextButton, TextLabel } from "../Components";
import { CreatePrivateLocation, GoToMainPage } from "../../Modules/Signals";
import { CreateConfigFromLocation } from "../../Modules/Config";
import { Players } from "@rbxts/services";
import { CameraLocation } from "../../Types";

export default (props: { editLocation: CameraLocation }) => {
	const [locName, setLocName] = useState("Unnamed Location");

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<uilistlayout
				key={"Layout"}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>

			<frame key={"LocationNote"} BackgroundTransparency={1} Size={new UDim2(1, -20, 0, 50)} LayoutOrder={0}>
				<TextLabel
					key={"Text"}
					Size={UDim2.fromScale(1, 1)}
					BackgroundTransparency={1}
					TextSize={16}
					FontFace={
						new Font(
							"rbxasset://fonts/families/GothamSSm.json",
							Enum.FontWeight.Light,
							Enum.FontStyle.Normal,
						)
					}
					Text={`Saving location: (${math.round(props.editLocation.CFrame.X)}, ${math.round(props.editLocation.CFrame.Y)}, ${math.round(props.editLocation.CFrame.Z)})`}
					TextYAlignment={Enum.TextYAlignment.Bottom}
				/>
			</frame>

			<textbox
				key={"NameInput"}
				BackgroundTransparency={1}
				LayoutOrder={1}
				Size={new UDim2(1, -20, 0, 30)}
				FontFace={
					new Font("rbxasset://fonts/families/GothamSSm.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
				}
				PlaceholderText={"Location Name"}
				Text={""}
				TextColor3={new Color3(1, 1, 1)}
				TextSize={25}
				TextWrapped={true}
				ClearTextOnFocus={false}
				Event={{
					FocusLost: (rbx) => {
						setLocName(rbx.Text);
					},
				}}
			>
				<uicorner key={"Corners"} CornerRadius={new UDim(0, 10)} />
				<uistroke
					key={"Stroke"}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					Color={Color3.fromRGB(100, 100, 100)}
				/>
			</textbox>

			<frame
				key={"Actions"}
				Size={new UDim2(1, -20, 0, 90)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				LayoutOrder={2}
			>
				<uilistlayout
					key={"Layout"}
					Padding={new UDim(0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<TextButton
					key={"Create"}
					LayoutOrder={2}
					Size={new UDim2(1, 0, 0, 34)}
					BackgroundColor3={Color3.fromRGB(255, 56, 53)}
					BorderSizePixel={0}
					Text={"Create"}
					TextSize={18}
					Event={{
						MouseButton1Click: () => {
							GoToMainPage.Fire();
							const location = {
								Name: locName,
								Camera: props.editLocation,
								CreatedBy: `By @${Players.LocalPlayer.Name} (${DateTime.now().ToIsoDate()})`,
							};
							CreatePrivateLocation.Fire(location);
						},
					}}
				/>

				<TextButton
					key={"CreateShared"}
					LayoutOrder={2}
					Size={UDim2.fromOffset(150, 34)}
					BackgroundColor3={Color3.fromRGB(49, 121, 255)}
					BorderSizePixel={0}
					Text={"Create Shared"}
					TextSize={18}
					Event={{
						MouseButton1Click: () => {
							GoToMainPage.Fire();
							CreateConfigFromLocation({
								Name: locName,
								Camera: props.editLocation,
								CreatedBy: `By @${Players.LocalPlayer.Name}`,
							});
						},
					}}
				/>
			</frame>

			<frame
				key={"Shared warning note"}
				BackgroundTransparency={1}
				Size={new UDim2(1, -20, 0, 50)}
				LayoutOrder={3}
			>
				<TextLabel
					key={"Text"}
					Size={UDim2.fromScale(1, 1)}
					BackgroundTransparency={1}
					TextSize={16}
					FontFace={
						new Font(
							"rbxasset://fonts/families/GothamSSm.json",
							Enum.FontWeight.Light,
							Enum.FontStyle.Normal,
						)
					}
					Text={"A shared location shows up for everyone using the plugin in this place!"}
					TextWrapped={true}
					TextYAlignment={Enum.TextYAlignment.Top}
				/>
			</frame>
		</frame>
	);
};

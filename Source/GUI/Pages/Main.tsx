import React, { useState } from "@rbxts/react";
import { TextButton, TextLabel } from "../Components";
import { Location } from "../../Types";

function Location(props: { name: string; created: string; pos: string }) {
	return (
		<frame Size={new UDim2(1, 0, 0, 75)} BackgroundTransparency={1}>
			<TextButton
				key={"TpButton"}
				Text={"GO"}
				LayoutOrder={1}
				BackgroundTransparency={1}
				BackgroundColor3={Color3.fromRGB(225, 56, 53)}
				Size={UDim2.fromOffset(70, 25)}
				AnchorPoint={new Vector2(1, 1)}
				Position={UDim2.fromScale(1, 1)}
			>
				<uistroke
					key={"Stroke"}
					Thickness={1}
					Color={Color3.fromRGB(100, 100, 100)}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				/>
			</TextButton>

			<imagebutton
				key={"DeleteButton"}
				Size={UDim2.fromOffset(25, 25)}
				Position={new UDim2(1, -75, 1, 0)}
				Image={"rbxassetid://15928976491"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(1, 1)}
				BackgroundTransparency={1}
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
				Text={props.created}
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
				Text={props.pos}
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
				return (
					<Location
						name="My awesome location"
						created="Created: 13th July 2025"
						pos={`(${loc.CFrame.X}, ${loc.CFrame.Y}, ${loc.CFrame.Z})`}
					/>
				);
			})}
		</>
	);
}

export default () => {
	const [peopleToggle, setPeopleToggle] = useState(true);
	const [locationsToggle, setLocationsToggle] = useState(true);

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<frame
				key={"Players"}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(0, 10)}
				Size={new UDim2(1, 0, 0, 30)}
			>
				<uilistlayout
					key={"Layout"}
					SortOrder={Enum.SortOrder.LayoutOrder}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalFlex={Enum.UIFlexAlignment.SpaceEvenly}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<imagebutton
					Size={UDim2.fromOffset(48, 48)}
					BackgroundTransparency={1}
					ScaleType={Enum.ScaleType.Fit}
				/>
			</frame>

			<scrollingframe
				key={"Locations"}
				Size={new UDim2(1, 0, 1, -100)}
				Position={UDim2.fromOffset(0, 50)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarThickness={5}
				ScrollBarImageColor3={new Color3(1, 1, 1)}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				CanvasSize={new UDim2(0, 0, 1, -100)}
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

				<Locations locations={[{ CFrame: new CFrame(0, 0, 0) }]} />
			</scrollingframe>

			<TextButton
				key={"NewButton"}
				Text={"+ Save Location"}
				BackgroundColor3={Color3.fromRGB(225, 56, 53)}
				BorderSizePixel={0}
				Size={new UDim2(1, -20, 0, 30)}
				Position={new UDim2(0.5, 0, 1, -10)}
				AnchorPoint={new Vector2(0.5, 1)}
			/>
		</frame>
	);
};

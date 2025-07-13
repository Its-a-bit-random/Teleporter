import React from "@rbxts/react";

interface TextButtonProps extends Partial<React.InstanceProps<TextButton>> {}
export function TextButton(props: TextButtonProps) {
	return (
		<textbutton
			FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
			BorderSizePixel={0}
			TextColor3={new Color3(1, 1, 1)}
			TextSize={18}
			{...props}
		>
			{props.children}
			<uicorner key={"Corners"} CornerRadius={new UDim(0, 7)} />
		</textbutton>
	);
}

interface TextLabelProps extends Partial<React.InstanceProps<TextLabel>> {}
export function TextLabel(props: TextLabelProps) {
	return (
		<textlabel
			FontFace={Font.fromEnum(Enum.Font.GothamMedium)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			TextColor3={new Color3(1, 1, 1)}
			TextSize={18}
			{...props}
		>
			{props.children}
			<uicorner key={"Corners"} CornerRadius={new UDim(0, 7)} />
		</textlabel>
	);
}

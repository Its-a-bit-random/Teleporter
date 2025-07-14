import React, { useEffect, useState } from "@rbxts/react";
import { CameraLocation, GuiPage } from "../Types";
import Main from "./Pages/Main";
import Edit from "./Pages/Edit";
import { GoToEditPage, GoToMainPage } from "../Modules/Signals";

export default () => {
	const [page, SetPage] = useState(GuiPage.Main);
	const [editCFrame, setEditCFrame] = useState<CameraLocation>({ CFrame: new CFrame(), Focus: new CFrame() });

	useEffect(() => {
		const editConn = GoToEditPage.Connect((cameraLocation) => {
			setEditCFrame(cameraLocation);
			SetPage(GuiPage.Edit);
		});

		const mainConn = GoToMainPage.Connect(() => {
			SetPage(GuiPage.Main);
		});

		return () => {
			mainConn.Disconnect();
			editConn.Disconnect();
		};
	}, [SetPage]);

	return page === GuiPage.Main ? (
		<>
			<Main />
		</>
	) : (
		<>
			<Edit editLocation={editCFrame} />
		</>
	);
};

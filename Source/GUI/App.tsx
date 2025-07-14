import React, { useEffect, useState } from "@rbxts/react";
import { GuiPage } from "../Types";
import Main from "./Pages/Main";
import Edit from "./Pages/Edit";
import { GoToEditPage, GoToMainPage } from "../Modules/Signals";

export default () => {
	const [page, SetPage] = useState(GuiPage.Main);
	const [editCFrame, setEditCFrame] = useState(new CFrame());

	useEffect(() => {
		const editConn = GoToEditPage.Connect((cf) => {
			setEditCFrame(cf);
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
			<Edit editCFrame={editCFrame} />
		</>
	);
};

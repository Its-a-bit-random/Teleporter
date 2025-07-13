import React, { useState } from "@rbxts/react";
import { GuiPage } from "../Types";
import Main from "./Pages/Main";

export default () => {
	const [page, SetPage] = useState(GuiPage.Main);

	return page === GuiPage.Main ? (
		<>
			<Main />
		</>
	) : (
		<></>
	);
};

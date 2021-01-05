import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";

function App() {
	const user = useSelector(selectUser);

	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(
					login({
						email: user.email,
						uid: user.uid,
						displayName: user.displayName,
						photoUrl: user.photoUrl,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="app">
			<Header />

			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<Sidebar />
					<Feed />
				</div>
			)}
		</div>
	);
}

export default App;

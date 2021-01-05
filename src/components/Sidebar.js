import React from "react";
import "../assets/css/Sidebar.css";
import { Avatar } from "@material-ui/core";
import { selectUser, logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";

function Sidebar() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const recentItem = (topic) => {
		return (
			<div className="sidebar__recentItem">
				<span className="sidebar__hash">#</span>
				<p>{topic}</p>
			</div>
		);
	};

	const handleLogout = () => {
		auth.signOut().then(() => {
			dispatch(logout());
		});
	};

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<img
					src="https://images.unsplash.com/photo-1609601470014-5754ed429f30?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
					alt=""
				/>
				<Avatar className="sidebar__avatar" />
				<h2>{user.displayName}</h2>
				<h4>{user.email}</h4>
			</div>

			<div className="sidebar__stats">
				<div className="sidebar__stat">
					<p>Who viewed you</p>
					<p className="sidebar__statNumber">1,530</p>
				</div>
				<div className="sidebar__stat">
					<p>View on post</p>
					<p className="sidebar__statNumber">3,333</p>
				</div>
				<button onClick={handleLogout} className="sidebar__logoutBtn">
					Logout
				</button>
			</div>

			<div className="sidebar__bottom">
				<p>Recent</p>
				{recentItem("React Js")}
				{recentItem("Node Js")}
				{recentItem("Laravel")}
			</div>
		</div>
	);
}

export default Sidebar;

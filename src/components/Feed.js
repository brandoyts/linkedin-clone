import React, { useState } from "react";
import "../assets/css/Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";

function Feed() {
	const [posts, setPosts] = useState([
		{
			name: "Brando Endona",
			description: "test",
			message: "this is my first post ",
		},
	]);

	const renderPosts = () => {
		return (
			posts.length > 0 &&
			posts.map((post, index) => (
				<Post
					key={index}
					name={post.name}
					description={post.description}
					message={post.message}
				/>
			))
		);
	};

	const sendPost = (e) => {
		e.preventDefault();
		console.log("object");
	};

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<CreateIcon />
					<form onSubmit={sendPost}>
						<input type="text" />
						<button type="submit">Send</button>
					</form>
				</div>

				<div className="feed__inputOptions">
					<InputOption
						Icon={ImageIcon}
						title="Photo"
						color="#70b5f9"
					/>
					<InputOption
						Icon={SubscriptionsIcon}
						title="Video"
						color="#e7a33e"
					/>
					<InputOption
						Icon={EventNoteIcon}
						title="Event"
						color="#c0cbcd"
					/>
					<InputOption
						Icon={CalendarViewDayIcon}
						title="Write article"
						color="#7fc15e"
					/>
				</div>
			</div>

			{renderPosts()}
		</div>
	);
}

export default Feed;

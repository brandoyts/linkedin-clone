import React, { useState, useEffect, useRef } from "react";
import "../assets/css/Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import { db } from "../firebase";
import firebase from "firebase";

function Feed() {
	const [posts, setPosts] = useState([]);
	const inputRef = useRef("");

	const renderPosts = () => {
		return (
			posts.length > 0 &&
			posts.map(
				({ id, data: { name, description, message, photoUrl } }) => (
					<Post
						key={id}
						name={name}
						description={description}
						message={message}
						photoUrl={photoUrl}
					/>
				)
			)
		);
	};

	const sendPost = (e) => {
		e.preventDefault();

		db.collection("posts").add({
			name: "Brando Endona",
			description: "test",
			message: inputRef.current.value,
			photoUrl: "",
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		inputRef.current.value = "";
	};

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
	}, []);

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<CreateIcon />
					<form onSubmit={sendPost}>
						<input type="text" ref={inputRef} />
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

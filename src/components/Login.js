import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../assets/css/Login.css";
import { login } from "../features/userSlice";
import { auth } from "../firebase";

function Login() {
	const [inputValues, setInputValues] = useState({
		fullName: "",
		email: "",
		profilePic: "",
		password: "",
	});

	const dispatch = useDispatch();

	const validateInputFields = (inputs) => {
		for (let input in inputs) {
			const value = inputValues[input];

			if (input === "profilePic") {
				continue;
			} else if (value.length === 0) {
				return false;
			}
		}

		return true;
	};

	const handleLogin = (e) => {
		e.preventDefault();

		const fields = {
			email: inputValues.email,
			password: inputValues.password,
		};

		if (!validateInputFields(fields)) return;

		auth.signInWithEmailAndPassword(fields.email, fields.password)
			.then((userAuth) => {
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.user.displayName,
						photoUrl: userAuth.user.photoUrl,
					})
				);
			})
			.catch((error) => alert(error.message));
	};

	const handleRegister = (e) => {
		e.preventDefault();
		if (!validateInputFields()) return;

		const { fullName, profilePic, email, password } = inputValues;

		auth.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: fullName,
						photoUrl: profilePic,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: fullName,
								photoUrl: profilePic,
							})
						);
					});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const handleInputChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setInputValues({
			...inputValues,
			[key]: value,
		});
	};

	return (
		<div className="login">
			<img
				src="https://download.logo.wine/logo/LinkedIn/LinkedIn-Logo.wine.png"
				alt=""
			/>

			<form onSubmit={handleLogin}>
				<input
					type="text"
					name="fullName"
					placeholder="Full name"
					autoFocus
					onChange={handleInputChange}
					value={inputValues.fullName}
				/>

				<input
					type="text"
					name="profilePic"
					placeholder="Profile pic URL (optional)"
					onChange={handleInputChange}
					value={inputValues.profilePic}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleInputChange}
					value={inputValues.email}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleInputChange}
					value={inputValues.password}
				/>
				<button type="submit">Sign in</button>
			</form>

			<p>
				Don't have an account?{" "}
				<span className="login__register" onClick={handleRegister}>
					Sign up here
				</span>
			</p>
		</div>
	);
}

export default Login;

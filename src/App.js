import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Searchbar from "./components/Searchbar";
import { ShowsContext } from "./Context/ShowsContext";
import ShowDetail from "./screens/ShowDetail";
import Shows from "./screens/Shows";

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Nav = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 2;
	background-color: #fff;
	color: #000;
	padding: 10px;
	font-size: 25px;
	font-weight: bold;
	box-shadow: 0 3px 6px 0 #eee;
	@media only screen and (max-width: 455px) {
		flex-direction: column;
	}
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
`;

const LogoImage = styled.img`
	width: 48px;
	height: 48px;
	margin: 15px;
`;

function App() {
	const [shows, setShows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedShow, setSelectedShow] = useState({});

	const fetchShows = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get("https://api.tvmaze.com/shows");

			setShows(data.slice(0, 20));
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchShows();
	}, []);

	return (
		<Container>
			<ToastContainer />
			<Link to='/'>
				<Nav>
					<Logo>
						<LogoImage src='/logo.png' />
						TV SHOWS
					</Logo>
					<Searchbar />
				</Nav>
			</Link>
			<ShowsContext.Provider
				value={{
					shows,
					setShows,
					loading,
					setLoading,
					error,
					setError,
					selectedShow,
					setSelectedShow,
				}}>
				<Routes>
					<Route path='/' element={<Shows />} />
					<Route path='/:id' element={<ShowDetail />} />
				</Routes>
			</ShowsContext.Provider>
		</Container>
	);
}

export default App;

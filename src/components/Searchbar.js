import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import styled from "styled-components";
import Modal from "./Modal";

const Shows = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 30px;
	overflow-y: auto;
`;

const Searchbar = () => {
	const [shows, setShows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState("");
	const [timeOut, setTimeOut] = useState();
	const [openModal, setOpenModal] = useState(false);

	const getData = async search => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`https://api.tvmaze.com/search/shows?q=${search}`,
			);
			setShows(data);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	const onTextChange = e => {
		clearTimeout(timeOut);
		setQuery(e.target.value);
		const timeout = setTimeout(() => getData(query), 500);
		setTimeOut(timeout);
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	return (
		<div>
			<div className='search-bar' onClick={() => setOpenModal(true)}>
				<i className='uil uil-search'></i>
				<input type='search' placeholder='Search...' readOnly />
			</div>
			{openModal && (
				<Modal>
					<div className='search-bar'>
						<i className='uil uil-search'></i>
						<input
							type='search'
							placeholder='Search...'
							value={query}
							onChange={onTextChange}
						/>
					</div>
					{loading ? (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<LineWave
								color='blue'
								height={110}
								width={110}
								ariaLabel='three-circles-rotating'
							/>
						</div>
					) : (
						<Shows>
							{shows?.map((show, i) => (
								<div
									className='search-show-content'
									key={i}
									onClick={() => {
										window.location.href = `${show?.show?.id}`;
									}}>
									<img src={show?.show?.image?.medium} alt='show' />
									<h5>{show.show?.name}</h5>
								</div>
							))}
						</Shows>
					)}
					<button
						style={{ width: "100%" }}
						onClick={() => {
							setOpenModal(false);
						}}
						id='cancelBtn'>
						Close
					</button>
				</Modal>
			)}
		</div>
	);
};

export default Searchbar;

import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ShowsContext } from "../Context/ShowsContext";
import Modal from "./Modal";

const Container = styled.div`
	display: flex;
	padding: 20px 30px;
	justify-content: center;
	border-bottom: 1px solid lightgray;
	margin-top: 100px;
	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const Image = styled.img`
	object-fit: cover;
	height: 352px;
	@media only screen and (max-width: 768px) {
		height: 300px;
		object-fit: contain;
	}
	@media only screen and (max-width: 454px) {
		margin-top: 40px;
	}
`;

const InfoColumn = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 20px;
`;

const Name = styled.span`
	font-size: 22px;
	font-weight: bold;
	color: #000;
	text-transform: capitalize;
`;

const Desc = styled.span`
	font-size: 16px;
	font-weight: 500;
	color: #000;
	margin: 4px 0;
	text-transform: capitalize;
`;

const BookButton = styled.button`
	outline: none;
	border: none;
	border-radius: 20px;
	padding: 10px 20px;
	background-color: crimson;
	color: #fff;
	width: 200px;
	cursor: pointer;
	margin-top: 10px;
`;

const ShowInfo = () => {
	const { selectedShow: show } = useContext(ShowsContext);

	const [name, setName] = useState(
		localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user")).name
			: "",
	);
	const [phone, setPhone] = useState(
		localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user")).phone
			: "",
	);
	const [openModal, setOpenModal] = useState(false);
	const [booked, setBooked] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		const reg = /^\d+$/;
		if (name.trim().length === 0) return;
		if (phone.trim().length > 10 || phone.trim().length < 10)
			return alert("Enter valid phone");

		if (!reg.test(phone)) return alert("Enter valid phone");

		localStorage.setItem("user", JSON.stringify({ name, phone }));

		setLoading(true);

		setTimeout(() => {
			setBooked(true);
			setLoading(false);
		}, 3000);
	};

	return (
		<Container>
			<Image src={show?.image?.medium} />
			<InfoColumn>
				<Name>Show Name : {show?.name}</Name>
				<Desc>
					<b>Language</b> : {show?.language}
				</Desc>
				<Desc>
					<b>Rating</b> : {show?.rating?.average}
				</Desc>
				<Desc>
					<b>Summary</b> : {show?.summary}
				</Desc>
				<Desc>
					<b>Official Site</b> :{" "}
					<a href={show?.officialSite} target='_blank' rel='noreferrer'>
						{show?.officialSite}
					</a>
				</Desc>
				<BookButton onClick={() => setOpenModal(true)}>Book Premier</BookButton>
			</InfoColumn>
			{openModal && (
				<Modal>
					{booked ? (
						<div className='successful'>
							<h3>Booking Successful</h3>
							<button
								onClick={() => {
									setOpenModal(false);
								}}
								id='cancelBtn'>
								Close
							</button>
						</div>
					) : (
						<>
							<div className='titleCloseBtn'>
								<span
									onClick={() => {
										setOpenModal(false);
									}}>
									X
								</span>
							</div>
							<div className='title'>
								<h1>Book Show Premier</h1>
							</div>
							<form onSubmit={handleSubmit}>
								<div className='body'>
									<p>Show Name : {show.name}</p>
									<p>Date : {show.premiered}</p>
									<input
										type='text'
										placeholder='Your Name'
										required
										value={name}
										onChange={e => setName(e.target.value)}
									/>
									<input
										type='phone'
										placeholder='Your Mobile'
										required
										value={phone}
										onChange={e => setPhone(e.target.value)}
									/>
								</div>
								<div className='footer'>
									<button
										onClick={() => {
											setOpenModal(false);
										}}
										id='cancelBtn'>
										Cancel
									</button>
									<button type='submit' disabled={loading}>
										{loading ? "Booking..." : "Book"}
									</button>
								</div>
							</form>
						</>
					)}
				</Modal>
			)}
		</Container>
	);
};

export default ShowInfo;

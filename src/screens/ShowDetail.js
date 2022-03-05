import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import ShowCard from "../components/ShowCard";
import ShowInfo from "../components/ShowInfo";
import { ShowsContext } from "../Context/ShowsContext";

const ShowDetail = () => {
	const { shows, setSelectedShow } = useContext(ShowsContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 5000,
		autoplaySpeed: 1000,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 870,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const { id } = useParams();

	const setShow = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);
			setSelectedShow(data);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		setShow();
	}, [id]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	return (
		<div>
			{loading ? (
				<div
					style={{
						marginTop: "300px",
						display: "flex",
						justifyContent: "center",
					}}>
					<LineWave
						color='blue'
						height={110}
						width={110}
						ariaLabel='three-circles-rotating'
					/>
				</div>
			) : (
				<div>
					<ShowInfo />
					<Slider
						style={{
							overflow: "hidden",
							display: "flex",
							justifyContent: "center",
						}}
						{...settings}>
						{shows.map((show, i) => (
							<ShowCard key={i} show={show} />
						))}
					</Slider>
				</div>
			)}
		</div>
	);
};

export default ShowDetail;

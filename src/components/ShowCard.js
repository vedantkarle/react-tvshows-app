import React from "react";
import { useNavigate } from "react-router-dom";

const ShowCard = ({ show }) => {
	const navigate = useNavigate();

	return (
		<div
			className='card'
			onClick={() => {
				navigate(`/${show.id}`);
			}}>
			<div className='card-item'>
				<div className='card-image'>
					<img src={show.image.medium} alt='show' />
				</div>
				<div className='card-info'>
					<h2 className='card-title'>{show?.name}</h2>
					<div className='card-info-column'>
						<span>Year : {show?.premiered.split("-")[0]}</span>
						<span>Type : {show?.type}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowCard;

import React, { useContext } from "react";
import { LineWave } from "react-loader-spinner";
import styled from "styled-components";
import ShowCard from "../components/ShowCard";
import { ShowsContext } from "../Context/ShowsContext";

const ShowsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	padding: 30px;
	margin-top: 100px;
	@media only screen and (max-width: 455px) {
		margin-top: 120px;
	}
`;

const Shows = () => {
	const { shows, loading } = useContext(ShowsContext);

	return (
		<ShowsContainer>
			{loading ? (
				<LineWave
					color='blue'
					height={110}
					width={110}
					ariaLabel='three-circles-rotating'
				/>
			) : (
				shows.map((show, i) => <ShowCard key={i} show={show} />)
			)}
		</ShowsContainer>
	);
};

export default Shows;

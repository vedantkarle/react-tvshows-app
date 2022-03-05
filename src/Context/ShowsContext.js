import { createContext } from "react";

export const ShowsContext = createContext({
	shows: [],
	setShows: () => {},
	loading: false,
	setLoading: () => {},
	error: null,
	setError: () => {},
	selectedShow: {},
	setSelectedShow: () => {},
});

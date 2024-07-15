export interface Show {
	id: number;
	name: string;
	cover_image_path: string | null;
	type: ShowType | null;
	rating: number;
	more_details_redirect: string | null;
}

export enum ShowType {
	ANIME = 'ANIME',
	TV_SHOW = 'TV SHOW',
	MOVIE = 'MOVIE',
}

export interface DialogWindow {
	title: string;
	message: string;
	isDialogWindowOpened: boolean
}

export interface GameState {
	selectedWord: string | null;
	rightGuesses: string[];
	wrongGuesses: string[];
	incorrectGuesses: number;
	maxIncorrectGuesses: number;
	gameWon: boolean;
	gameLost: boolean;
}
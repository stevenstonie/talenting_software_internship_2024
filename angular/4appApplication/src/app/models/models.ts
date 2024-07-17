export interface Show {
	id: number;
	name: string;
	cover_image_path: string | null;
	type: ShowType | null;
	rating: number;
	numberOfTotalRatings: number;
	more_details_redirect: string | null;
}

export enum ShowType {
	TV_SHOW = 'TV SHOW',
	MOVIE = 'MOVIE',
	DOCUMENTARY = 'DOCUMENTARY',
	SHORT_FILM = 'SHORT FILM',
	ANIME_SERIES = 'ANIME SERIES',
	ANIME_MOVIE = 'ANIME MOVIE',
}

export interface DialogWindow {
	title: string;
	message: string;
	isOpened: boolean
}

export interface TicTacToeGameState {
	winner: 'X' | 'O' | null | 'DRAW';
	winningSquares: number[];
	nextPlayer: 'X' | 'O';
	gridSelections: ('X' | 'O' | null)[];
}

export interface HangmanGameState {
	selectedWord: string | null;
	rightGuesses: string[];
	wrongGuesses: string[];
	incorrectGuesses: number;
	maxIncorrectGuesses: number;
	gameWon: boolean;
	gameLost: boolean;
}
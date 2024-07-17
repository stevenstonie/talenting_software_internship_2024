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
	ANIME = 'ANIME',
	TV_SHOW = 'TV SHOW',
	MOVIE = 'MOVIE',
	DOCUMENTARY = 'DOCUMENTARY',
	SHORT_FILM = 'SHORT FILM',
}

export interface DialogWindow {
	title: string;
	message: string;
	isDialogWindowOpened: boolean
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
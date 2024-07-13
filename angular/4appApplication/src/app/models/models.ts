export interface TvProduct {
	id: number;
	background_image_path: string;
	name: string;
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
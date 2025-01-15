export interface Note {
	id: number;
	handle: string;
	title: string;
	timestamp: Date;
	content?: string;
}

export type Notes = { [key: number]: Note };

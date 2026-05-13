export type WinId = 'about' | 'skills' | 'projects' | 'publications' | 'contact';

export interface WinState {
	open: boolean;
	z: number;
	x: number;
	y: number;
}

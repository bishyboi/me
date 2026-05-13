export type WinId = 'about' | 'skills' | 'projects' | 'publications' | 'contact';

export interface WinState {
	open: boolean;
	z: number;
	x: number;
	y: number;
}

export interface Project {
	id: string;
	name: string;
	stack: string;
	desc: string;
	category: string;
	status: string;
	date: string;
	longDesc: string;
	outcomes: string[];
	links: { label: string; url: string }[];
	images?: { src: string; caption?: string }[];
}

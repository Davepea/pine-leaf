export interface Property {
	id: string;
	name: string;
	estate: string;
	description: string;
	images: string[];
	landmarks: {
		location: string;
		proximities: string[];
	};
	overview: {
		size: string;
		landCondition: string;
		titleDocument: string;
	};
	features: {
		name: string;
	}[];
}

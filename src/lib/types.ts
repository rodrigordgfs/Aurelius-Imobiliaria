export type ListingStatus = "Exclusivo" | "Novo" | "Em contrato" | "Reservado";

export type PublicProperty = {
  id: string;
  title: string;
  location: string;
  region: string;
  price: string;
  currency: string;
  beds: number;
  baths: number;
  sqm: number;
  lot: string;
  year: number;
  status: ListingStatus;
  imageUrl: string;
  gallery: string[];
  agentId: string;
  neighborhoodSlug: string;
  description: string;
  features: string[];
  lat: number;
  lng: number;
};

export type PublicAgent = {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  languages: string[];
  closed: string;
  listings: number;
  cities: string[];
  phone: string;
  email: string;
};

export type PublicNeighborhood = {
  slug: string;
  name: string;
  region: string;
  imageUrl: string;
  blurb: string;
  stats: Record<string, string | number>;
  highlights: string[];
};

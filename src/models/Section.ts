export interface Section {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subsections: SubSection[];
}

export interface SubSection {
  id: number;
  sectionId: number;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

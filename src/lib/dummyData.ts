
export interface User {
  id: string;
  name: string;
  email: string;
  sex: string;
  family?: string;
  benefekCode: string;
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

export const BENEFEK_CODE = "RSRC123";

export const dummyUser: User = {
  id: "user-123",
  name: "Jane Researcher",
  email: "jane@research.org",
  sex: "Female",
  family: "Smith",
  benefekCode: BENEFEK_CODE
};

export const supplements: Supplement[] = [
  {
    id: "sup-1",
    name: "Vitamin D3",
    description: "Essential vitamin for immune function",
    category: "Researcher",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=D3"
  },
  {
    id: "sup-2",
    name: "Omega-3",
    description: "Essential fatty acids for brain health",
    category: "Prof",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Omega-3"
  },
  {
    id: "sup-3",
    name: "Magnesium",
    description: "Essential mineral for energy production",
    category: "Dr",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Mg"
  },
  {
    id: "sup-4",
    name: "Probiotics",
    description: "Good bacteria for gut health",
    category: "HLS",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Pro"
  },
  {
    id: "sup-5",
    name: "Zinc",
    description: "Essential mineral for immune function",
    category: "Researcher",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Zn"
  },
  {
    id: "sup-6",
    name: "Iron",
    description: "Essential mineral for blood health",
    category: "Prof",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Fe"
  },
  {
    id: "sup-7",
    name: "Vitamin C",
    description: "Essential vitamin for immune support",
    category: "Dr",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Vit+C"
  },
  {
    id: "sup-8",
    name: "CoQ10",
    description: "Coenzyme for energy production",
    category: "HLS",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=CoQ10"
  },
  {
    id: "sup-9",
    name: "B Complex",
    description: "Group of essential B vitamins",
    category: "Researcher",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Vit+B"
  },
  {
    id: "sup-10",
    name: "Vitamin A",
    description: "Essential vitamin for vision",
    category: "Prof",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Vit+A"
  },
  {
    id: "sup-11",
    name: "Selenium",
    description: "Essential trace mineral",
    category: "Dr",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Se"
  },
  {
    id: "sup-12",
    name: "Fiber",
    description: "Dietary fiber for gut health",
    category: "HLS",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Fiber"
  }
];

export const getSupplementsByCategory = (category: string) => {
  return supplements.filter(supplement => supplement.category === category);
};

export const packCategories = [
  { id: "researcher", name: "Researcher Packs" },
  { id: "prof", name: "Prof Packs" },
  { id: "dr", name: "Dr's Packs" },
  { id: "hls", name: "HLS Packs" }
];

export interface SelectedSupplement {
  packId: string;
  supplementId: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  sex: string;
  family?: string;
  benefekCode: string;
  budget?: {
    min: number;
    max: number;
  };
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
}

export const BENEFEK_CODE = "RSRC123";

export const dummyUser: User = {
  id: "user-123",
  name: "Folajimi Aluko",
  email: "folajimi@research.org",
  sex: "Male",
  family: "Aluko",
  benefekCode: BENEFEK_CODE,
  budget: {
    min: 5000,
    max: 15000
  }
};

export const supplements: Supplement[] = [
  {
    id: "sup-1",
    name: "Vitamin D3",
    description: "Essential vitamin for immune function",
    category: "Researcher",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=D3",
    price: 2500
  },
  {
    id: "sup-2",
    name: "Omega-3",
    description: "Essential fatty acids for brain health",
    category: "Prof",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Omega-3",
    price: 3200
  },
  {
    id: "sup-3",
    name: "Magnesium",
    description: "Essential mineral for energy production",
    category: "Dr",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Mg",
    price: 1800
  },
  {
    id: "sup-4",
    name: "Probiotics",
    description: "Good bacteria for gut health",
    category: "HLS",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Pro",
    price: 4500
  },
  {
    id: "sup-5",
    name: "Zinc",
    description: "Essential mineral for immune function",
    category: "Researcher",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Zn",
    price: 1200
  },
  {
    id: "sup-6",
    name: "Iron",
    description: "Essential mineral for blood health",
    category: "Prof",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Fe",
    price: 1500
  },
  {
    id: "sup-7",
    name: "Vitamin C",
    description: "Essential vitamin for immune support",
    category: "Dr",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Vit+C",
    price: 2000
  },
  {
    id: "sup-8",
    name: "CoQ10",
    description: "Coenzyme for energy production",
    category: "HLS",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=CoQ10",
    price: 6000
  },
  {
    id: "sup-9",
    name: "B Complex",
    description: "Group of essential B vitamins",
    category: "Researcher",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Vit+B",
    price: 2800
  },
  {
    id: "sup-10",
    name: "Vitamin A",
    description: "Essential vitamin for vision",
    category: "Prof",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Vit+A",
    price: 1700
  },
  {
    id: "sup-11",
    name: "Selenium",
    description: "Essential trace mineral",
    category: "Dr",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Se",
    price: 2300
  },
  {
    id: "sup-12",
    name: "Fiber",
    description: "Dietary fiber for gut health",
    category: "HLS",
    imageUrl: "https://placehold.co/100x100/6E59A5/FFFFFF?text=Fiber",
    price: 3000
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

// Function to calculate budget limits for each pack
export const calculatePackBudget = (userBudget: { min: number; max: number }) => {
  if (!userBudget) return null;
  
  return {
    researcher: {
      max: userBudget.max + (userBudget.max * 0.15),
      min: 0
    },
    prof: {
      max: userBudget.max,
      min: 0
    },
    dr: {
      max: userBudget.max,
      min: userBudget.max * 0.9
    },
    hls: {
      max: userBudget.max,
      min: userBudget.min
    }
  };
};

// Function to calculate total price of supplements
export const calculateTotalPrice = (supplements: Supplement[]) => {
  return supplements.reduce((total, supplement) => total + supplement.price, 0);
};

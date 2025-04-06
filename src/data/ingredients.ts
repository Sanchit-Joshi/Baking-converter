export interface Ingredient {
  name: string;
  density: number;
  conversions: {
    cup: number;
    tablespoon: number;
    teaspoon: number;
  };
}

export const ingredientDatabase: Record<string, Ingredient> = {
  all_purpose_flour: {
    name: "All-Purpose Flour",
    density: 125,
    conversions: {
      cup: 125,
      tablespoon: 8,
      teaspoon: 2.6
    }
  },
  granulated_sugar: {
    name: "Granulated Sugar",
    density: 200,
    conversions: {
      cup: 200,
      tablespoon: 12.5,
      teaspoon: 4.2
    }
  },
  brown_sugar: {
    name: "Brown Sugar",
    density: 220,
    conversions: {
      cup: 220,
      tablespoon: 13.75,
      teaspoon: 4.6
    }
  },
  butter: {
    name: "Butter",
    density: 227,
    conversions: {
      cup: 227,
      tablespoon: 14.2,
      teaspoon: 4.7
    }
  },
  cocoa_powder: {
    name: "Cocoa Powder",
    density: 100,
    conversions: {
      cup: 100,
      tablespoon: 6.25,
      teaspoon: 2.1
    }
  },
  powdered_sugar: {
    name: "Powdered Sugar",
    density: 120,
    conversions: {
      cup: 120,
      tablespoon: 7.5,
      teaspoon: 2.5
    }
  },
  cornstarch: {
    name: "Cornstarch",
    density: 120,
    conversions: {
      cup: 120,
      tablespoon: 7.5,
      teaspoon: 2.5
    }
  },
  honey: {
    name: "Honey",
    density: 340,
    conversions: {
      cup: 340,
      tablespoon: 21.25,
      teaspoon: 7.1
    }
  },
  milk: {
    name: "Milk",
    density: 240,
    conversions: {
      cup: 240,
      tablespoon: 15,
      teaspoon: 5
    }
  },
  vegetable_oil: {
    name: "Vegetable Oil",
    density: 224,
    conversions: {
      cup: 224,
      tablespoon: 14,
      teaspoon: 4.7
    }
  }
};
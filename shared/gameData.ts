/**
 * Generated from the approved Color Me Lucky Question Bank v2.
 * Inventory: 3 demo, 65 primary, 30 reserve (six per player), and 5 tiebreakers.
 * Do not edit by hand; run scripts/build-game-data.mjs after source-content changes.
 */

export const PLAYERS = [
  "Stephanny",
  "Giann",
  "Francisco",
  "Lyka",
  "Jenny"
] as const;
export type PlayerName = (typeof PLAYERS)[number];
export type AnswerColor = "red" | "blue" | "green" | "yellow";
export type GameQuestion = {
  id: string;
  category: string;
  prompt: string;
  options: Array<{ color: AnswerColor; label: string }>;
  correctColor: AnswerColor;
  correctLabel: string;
  colorTrap: boolean;
};

export const QUESTION_BANK_VERSION = "v2";
export const QUESTION_BANK_COUNTS = { demo: 3, primary: 65, reserve: 30, tiebreaker: 5, total: 103 } as const;

export const DEMO_QUESTIONS: GameQuestion[] = [
  {
    "id": "D1",
    "category": "Demo",
    "prompt": "What color is grass?",
    "options": [
      {
        "color": "red",
        "label": "Blue"
      },
      {
        "color": "blue",
        "label": "Red"
      },
      {
        "color": "green",
        "label": "Green"
      },
      {
        "color": "yellow",
        "label": "Purple"
      }
    ],
    "correctColor": "green",
    "correctLabel": "Green",
    "colorTrap": false
  },
  {
    "id": "D2",
    "category": "Demo",
    "prompt": "How many days are in a week?",
    "options": [
      {
        "color": "red",
        "label": "5"
      },
      {
        "color": "blue",
        "label": "6"
      },
      {
        "color": "green",
        "label": "8"
      },
      {
        "color": "yellow",
        "label": "7"
      }
    ],
    "correctColor": "yellow",
    "correctLabel": "7",
    "colorTrap": false
  },
  {
    "id": "D3",
    "category": "Demo",
    "prompt": "What shape has three sides?",
    "options": [
      {
        "color": "red",
        "label": "Square"
      },
      {
        "color": "blue",
        "label": "Circle"
      },
      {
        "color": "green",
        "label": "Triangle"
      },
      {
        "color": "yellow",
        "label": "Hexagon"
      }
    ],
    "correctColor": "green",
    "correctLabel": "Triangle",
    "colorTrap": false
  }
];

export const PRIMARY_QUESTIONS: Record<PlayerName, GameQuestion[]> = {
  "Stephanny": [
    {
      "id": "Q1",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the largest ocean on Earth?",
      "options": [
        {
          "color": "red",
          "label": "Atlantic"
        },
        {
          "color": "blue",
          "label": "Indian"
        },
        {
          "color": "green",
          "label": "Arctic"
        },
        {
          "color": "yellow",
          "label": "Pacific"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Pacific",
      "colorTrap": false
    },
    {
      "id": "Q2",
      "category": "POP CULTURE",
      "prompt": "Which streaming service produced \"Stranger Things\"?",
      "options": [
        {
          "color": "red",
          "label": "Hulu"
        },
        {
          "color": "blue",
          "label": "Netflix"
        },
        {
          "color": "green",
          "label": "Disney+"
        },
        {
          "color": "yellow",
          "label": "Peacock"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Netflix",
      "colorTrap": false
    },
    {
      "id": "Q3",
      "category": "GEOGRAPHY",
      "prompt": "What is the official language spoken in Puerto Rico alongside English?",
      "options": [
        {
          "color": "red",
          "label": "French"
        },
        {
          "color": "blue",
          "label": "Portuguese"
        },
        {
          "color": "green",
          "label": "Spanish"
        },
        {
          "color": "yellow",
          "label": "Italian"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Spanish",
      "colorTrap": false
    },
    {
      "id": "Q4",
      "category": "BRAIN TEASER",
      "prompt": "What has hands but cannot clap?",
      "options": [
        {
          "color": "red",
          "label": "A glove"
        },
        {
          "color": "blue",
          "label": "A clock"
        },
        {
          "color": "green",
          "label": "A robot"
        },
        {
          "color": "yellow",
          "label": "A statue"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A clock",
      "colorTrap": false
    },
    {
      "id": "Q5",
      "category": "FOOD & CUISINE",
      "prompt": "Mofongo, a popular Puerto Rican dish, is primarily made from what ingredient?",
      "options": [
        {
          "color": "red",
          "label": "Rice"
        },
        {
          "color": "blue",
          "label": "Plantains"
        },
        {
          "color": "green",
          "label": "Potatoes"
        },
        {
          "color": "yellow",
          "label": "Yuca"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Plantains",
      "colorTrap": false
    },
    {
      "id": "Q6",
      "category": "SCIENCE & NATURE",
      "prompt": "**[COLOR TRAP]** What color is a lobster's blood?",
      "options": [
        {
          "color": "red",
          "label": "Red"
        },
        {
          "color": "blue",
          "label": "Green"
        },
        {
          "color": "green",
          "label": "Blue"
        },
        {
          "color": "yellow",
          "label": "Clear"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Blue",
      "colorTrap": true
    },
    {
      "id": "Q7",
      "category": "CULTURE",
      "prompt": "What is the Filipino term for a whole roasted pig, often the centerpiece of a fiesta feast?",
      "options": [
        {
          "color": "red",
          "label": "Adobo"
        },
        {
          "color": "blue",
          "label": "Lechon"
        },
        {
          "color": "green",
          "label": "Sinigang"
        },
        {
          "color": "yellow",
          "label": "Halo-halo"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Lechon",
      "colorTrap": false
    },
    {
      "id": "Q8",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "How many bones are in the adult human body?",
      "options": [
        {
          "color": "red",
          "label": "186"
        },
        {
          "color": "blue",
          "label": "206"
        },
        {
          "color": "green",
          "label": "226"
        },
        {
          "color": "yellow",
          "label": "246"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "206",
      "colorTrap": false
    },
    {
      "id": "Q9",
      "category": "TEAM PERSONALIZED",
      "prompt": "Which two team members are based in the Philippines?",
      "options": [
        {
          "color": "red",
          "label": "Giann & Stephanny"
        },
        {
          "color": "blue",
          "label": "Lyka & Jenny"
        },
        {
          "color": "green",
          "label": "Francisco & Giann"
        },
        {
          "color": "yellow",
          "label": "Stephanny & Francisco"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Lyka & Jenny",
      "colorTrap": false
    },
    {
      "id": "Q10",
      "category": "BRAIN TEASER",
      "prompt": "The more you take, the more you leave behind. What am I?",
      "options": [
        {
          "color": "red",
          "label": "Money"
        },
        {
          "color": "blue",
          "label": "Time"
        },
        {
          "color": "green",
          "label": "Footsteps"
        },
        {
          "color": "yellow",
          "label": "Memories"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Footsteps",
      "colorTrap": false
    },
    {
      "id": "Q11",
      "category": "POP CULTURE",
      "prompt": "What is the name of the coffee shop in the sitcom \"Friends\"?",
      "options": [
        {
          "color": "red",
          "label": "Central Perk"
        },
        {
          "color": "blue",
          "label": "The Grind"
        },
        {
          "color": "green",
          "label": "Java Joe's"
        },
        {
          "color": "yellow",
          "label": "Perk Place"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Central Perk",
      "colorTrap": false
    },
    {
      "id": "Q12",
      "category": "GEOGRAPHY",
      "prompt": "Which U.S. state is nicknamed the \"Sunshine State\"?",
      "options": [
        {
          "color": "red",
          "label": "California"
        },
        {
          "color": "blue",
          "label": "Florida"
        },
        {
          "color": "green",
          "label": "Arizona"
        },
        {
          "color": "yellow",
          "label": "Hawaii"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Florida",
      "colorTrap": false
    },
    {
      "id": "Q13",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the only mammal capable of true, sustained flight?",
      "options": [
        {
          "color": "red",
          "label": "Flying squirrel"
        },
        {
          "color": "blue",
          "label": "Bat"
        },
        {
          "color": "green",
          "label": "Colugo"
        },
        {
          "color": "yellow",
          "label": "Sugar glider"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Bat",
      "colorTrap": false
    }
  ],
  "Giann": [
    {
      "id": "Q14",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the hardest natural substance on Earth?",
      "options": [
        {
          "color": "red",
          "label": "Gold"
        },
        {
          "color": "blue",
          "label": "Quartz"
        },
        {
          "color": "green",
          "label": "Diamond"
        },
        {
          "color": "yellow",
          "label": "Titanium"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Diamond",
      "colorTrap": false
    },
    {
      "id": "Q15",
      "category": "POP CULTURE",
      "prompt": "Which artist released the album \"Fine Line\"?",
      "options": [
        {
          "color": "red",
          "label": "Shawn Mendes"
        },
        {
          "color": "blue",
          "label": "Harry Styles"
        },
        {
          "color": "green",
          "label": "Niall Horan"
        },
        {
          "color": "yellow",
          "label": "Louis Tomlinson"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Harry Styles",
      "colorTrap": false
    },
    {
      "id": "Q16",
      "category": "GEOGRAPHY",
      "prompt": "**[COLOR TRAP]** What color are the stars on the Philippine flag?",
      "options": [
        {
          "color": "red",
          "label": "Red"
        },
        {
          "color": "blue",
          "label": "Gold"
        },
        {
          "color": "green",
          "label": "White"
        },
        {
          "color": "yellow",
          "label": "Blue"
        }
      ],
      "correctColor": "green",
      "correctLabel": "White",
      "colorTrap": true
    },
    {
      "id": "Q17",
      "category": "FOOD & CUISINE",
      "prompt": "Adobo, one of the most iconic Filipino dishes, is traditionally cooked with soy sauce, garlic, and what other key ingredient?",
      "options": [
        {
          "color": "red",
          "label": "Coconut milk"
        },
        {
          "color": "blue",
          "label": "Vinegar"
        },
        {
          "color": "green",
          "label": "Fish sauce"
        },
        {
          "color": "yellow",
          "label": "Tamarind"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Vinegar",
      "colorTrap": false
    },
    {
      "id": "Q18",
      "category": "BRAIN TEASER",
      "prompt": "What can travel around the world while staying in a corner?",
      "options": [
        {
          "color": "red",
          "label": "A shadow"
        },
        {
          "color": "blue",
          "label": "A stamp"
        },
        {
          "color": "green",
          "label": "The wind"
        },
        {
          "color": "yellow",
          "label": "A letter"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A stamp",
      "colorTrap": false
    },
    {
      "id": "Q19",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "Which planet has the most moons confirmed as of recent counts?",
      "options": [
        {
          "color": "red",
          "label": "Jupiter"
        },
        {
          "color": "blue",
          "label": "Saturn"
        },
        {
          "color": "green",
          "label": "Neptune"
        },
        {
          "color": "yellow",
          "label": "Uranus"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Saturn",
      "colorTrap": false
    },
    {
      "id": "Q20",
      "category": "CULTURE",
      "prompt": "What is the name of the annual Puerto Rican festival held in mid-January honoring the patron saint of San Juan?",
      "options": [
        {
          "color": "red",
          "label": "Fiestas de la Calle San Sebastián"
        },
        {
          "color": "blue",
          "label": "Carnaval de Ponce"
        },
        {
          "color": "green",
          "label": "Día de Reyes"
        },
        {
          "color": "yellow",
          "label": "Las Fiestas Patronales"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Fiestas de la Calle San Sebastián",
      "colorTrap": false
    },
    {
      "id": "Q21",
      "category": "SCIENCE & NATURE",
      "prompt": "How many hearts does an octopus have?",
      "options": [
        {
          "color": "red",
          "label": "1"
        },
        {
          "color": "blue",
          "label": "2"
        },
        {
          "color": "green",
          "label": "3"
        },
        {
          "color": "yellow",
          "label": "4"
        }
      ],
      "correctColor": "green",
      "correctLabel": "3",
      "colorTrap": false
    },
    {
      "id": "Q22",
      "category": "TEAM PERSONALIZED",
      "prompt": "True or false vibe question: on a company Jeopardy-style trivia night, which team got every single accounting question wrong?",
      "options": [
        {
          "color": "red",
          "label": "Ops team"
        },
        {
          "color": "blue",
          "label": "Sales team"
        },
        {
          "color": "green",
          "label": "The accounting team"
        },
        {
          "color": "yellow",
          "label": "Nobody, they swept it"
        }
      ],
      "correctColor": "green",
      "correctLabel": "The accounting team",
      "colorTrap": false
    },
    {
      "id": "Q23",
      "category": "POP CULTURE",
      "prompt": "What was the highest-grossing film of all time before \"Avatar\" took the title?",
      "options": [
        {
          "color": "red",
          "label": "Titanic"
        },
        {
          "color": "blue",
          "label": "Jurassic Park"
        },
        {
          "color": "green",
          "label": "Star Wars"
        },
        {
          "color": "yellow",
          "label": "E.T."
        }
      ],
      "correctColor": "red",
      "correctLabel": "Titanic",
      "colorTrap": false
    },
    {
      "id": "Q24",
      "category": "GEOGRAPHY",
      "prompt": "What ocean borders Florida's Atlantic coastline?",
      "options": [
        {
          "color": "red",
          "label": "Pacific"
        },
        {
          "color": "blue",
          "label": "Atlantic"
        },
        {
          "color": "green",
          "label": "Indian"
        },
        {
          "color": "yellow",
          "label": "Arctic"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Atlantic",
      "colorTrap": false
    },
    {
      "id": "Q25",
      "category": "BRAIN TEASER",
      "prompt": "What gets bigger the more you remove from it?",
      "options": [
        {
          "color": "red",
          "label": "A balloon"
        },
        {
          "color": "blue",
          "label": "A hole"
        },
        {
          "color": "green",
          "label": "A shadow"
        },
        {
          "color": "yellow",
          "label": "A debt"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A hole",
      "colorTrap": false
    },
    {
      "id": "Q26",
      "category": "FOOD & CUISINE",
      "prompt": "**[COLOR TRAP]** Halo-halo, a beloved Filipino dessert, is famous for its colorful layers, but what color is the ube (purple yam) ice cream typically scooped on top?",
      "options": [
        {
          "color": "red",
          "label": "Pink"
        },
        {
          "color": "blue",
          "label": "Green"
        },
        {
          "color": "green",
          "label": "Purple"
        },
        {
          "color": "yellow",
          "label": "Orange"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Purple",
      "colorTrap": true
    }
  ],
  "Francisco": [
    {
      "id": "Q27",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the currency used in Puerto Rico?",
      "options": [
        {
          "color": "red",
          "label": "Peso"
        },
        {
          "color": "blue",
          "label": "US Dollar"
        },
        {
          "color": "green",
          "label": "Euro"
        },
        {
          "color": "yellow",
          "label": "Puerto Rican Real"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "US Dollar",
      "colorTrap": false
    },
    {
      "id": "Q28",
      "category": "POP CULTURE",
      "prompt": "In \"The Office,\" what company does Dunder Mifflin sell?",
      "options": [
        {
          "color": "red",
          "label": "Office furniture"
        },
        {
          "color": "blue",
          "label": "Paper"
        },
        {
          "color": "green",
          "label": "Computers"
        },
        {
          "color": "yellow",
          "label": "Insurance"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Paper",
      "colorTrap": false
    },
    {
      "id": "Q29",
      "category": "GEOGRAPHY",
      "prompt": "What is the smallest U.S. state by land area?",
      "options": [
        {
          "color": "red",
          "label": "Delaware"
        },
        {
          "color": "blue",
          "label": "Connecticut"
        },
        {
          "color": "green",
          "label": "Rhode Island"
        },
        {
          "color": "yellow",
          "label": "Vermont"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Rhode Island",
      "colorTrap": false
    },
    {
      "id": "Q30",
      "category": "BRAIN TEASER",
      "prompt": "What word becomes shorter when you add two letters to it?",
      "options": [
        {
          "color": "red",
          "label": "Long"
        },
        {
          "color": "blue",
          "label": "Short"
        },
        {
          "color": "green",
          "label": "Big"
        },
        {
          "color": "yellow",
          "label": "Small"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Short",
      "colorTrap": false
    },
    {
      "id": "Q31",
      "category": "FOOD & CUISINE",
      "prompt": "What Florida citrus fruit is the official state fruit?",
      "options": [
        {
          "color": "red",
          "label": "Lemon"
        },
        {
          "color": "blue",
          "label": "Orange"
        },
        {
          "color": "green",
          "label": "Grapefruit"
        },
        {
          "color": "yellow",
          "label": "Tangerine"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Orange",
      "colorTrap": false
    },
    {
      "id": "Q32",
      "category": "SCIENCE & NATURE",
      "prompt": "**[COLOR TRAP]** What color is a polar bear's skin underneath its fur?",
      "options": [
        {
          "color": "red",
          "label": "White"
        },
        {
          "color": "blue",
          "label": "Pink"
        },
        {
          "color": "green",
          "label": "Gray"
        },
        {
          "color": "yellow",
          "label": "Black"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Black",
      "colorTrap": true
    },
    {
      "id": "Q33",
      "category": "CULTURE",
      "prompt": "Sinigang, a Filipino comfort food staple, is best described as what type of dish?",
      "options": [
        {
          "color": "red",
          "label": "A sour tamarind-based soup"
        },
        {
          "color": "blue",
          "label": "A sweet rice cake"
        },
        {
          "color": "green",
          "label": "A grilled skewer"
        },
        {
          "color": "yellow",
          "label": "A stir-fried noodle dish"
        }
      ],
      "correctColor": "red",
      "correctLabel": "A sour tamarind-based soup",
      "colorTrap": false
    },
    {
      "id": "Q34",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "Which U.S. president appears on the $100 bill?",
      "options": [
        {
          "color": "red",
          "label": "Abraham Lincoln"
        },
        {
          "color": "blue",
          "label": "Alexander Hamilton"
        },
        {
          "color": "green",
          "label": "Benjamin Franklin"
        },
        {
          "color": "yellow",
          "label": "George Washington"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Benjamin Franklin",
      "colorTrap": false
    },
    {
      "id": "Q35",
      "category": "TEAM PERSONALIZED",
      "prompt": "What time zone is Puerto Rico in, home to three of this team's five players?",
      "options": [
        {
          "color": "red",
          "label": "Eastern"
        },
        {
          "color": "blue",
          "label": "Atlantic"
        },
        {
          "color": "green",
          "label": "Central"
        },
        {
          "color": "yellow",
          "label": "Pacific"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Atlantic",
      "colorTrap": false
    },
    {
      "id": "Q36",
      "category": "BRAIN TEASER",
      "prompt": "What kind of room has no doors or windows?",
      "options": [
        {
          "color": "red",
          "label": "A closet"
        },
        {
          "color": "blue",
          "label": "A mushroom"
        },
        {
          "color": "green",
          "label": "A tent"
        },
        {
          "color": "yellow",
          "label": "A cave"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A mushroom",
      "colorTrap": false
    },
    {
      "id": "Q37",
      "category": "POP CULTURE",
      "prompt": "What is the fictional African country in \"Black Panther\"?",
      "options": [
        {
          "color": "red",
          "label": "Zamunda"
        },
        {
          "color": "blue",
          "label": "Wakanda"
        },
        {
          "color": "green",
          "label": "Genovia"
        },
        {
          "color": "yellow",
          "label": "Latveria"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Wakanda",
      "colorTrap": false
    },
    {
      "id": "Q38",
      "category": "GEOGRAPHY",
      "prompt": "What body of water separates Florida from the Bahamas?",
      "options": [
        {
          "color": "red",
          "label": "Gulf of Mexico"
        },
        {
          "color": "blue",
          "label": "Straits of Florida"
        },
        {
          "color": "green",
          "label": "Caribbean Sea"
        },
        {
          "color": "yellow",
          "label": "Atlantic Trench"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Straits of Florida",
      "colorTrap": false
    },
    {
      "id": "Q39",
      "category": "SCIENCE & NATURE",
      "prompt": "How many chambers does a human heart have?",
      "options": [
        {
          "color": "red",
          "label": "2"
        },
        {
          "color": "blue",
          "label": "3"
        },
        {
          "color": "green",
          "label": "4"
        },
        {
          "color": "yellow",
          "label": "5"
        }
      ],
      "correctColor": "green",
      "correctLabel": "4",
      "colorTrap": false
    }
  ],
  "Lyka": [
    {
      "id": "Q40",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the longest river in the world?",
      "options": [
        {
          "color": "red",
          "label": "Amazon"
        },
        {
          "color": "blue",
          "label": "Nile"
        },
        {
          "color": "green",
          "label": "Yangtze"
        },
        {
          "color": "yellow",
          "label": "Mississippi"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Nile",
      "colorTrap": false
    },
    {
      "id": "Q41",
      "category": "POP CULTURE",
      "prompt": "What is the name of the wizarding school in Harry Potter?",
      "options": [
        {
          "color": "red",
          "label": "Beauxbatons"
        },
        {
          "color": "blue",
          "label": "Durmstrang"
        },
        {
          "color": "green",
          "label": "Hogwarts"
        },
        {
          "color": "yellow",
          "label": "Ilvermorny"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Hogwarts",
      "colorTrap": false
    },
    {
      "id": "Q42",
      "category": "GEOGRAPHY",
      "prompt": "**[COLOR TRAP]** What color is the \"black box\" flight recorder on airplanes?",
      "options": [
        {
          "color": "red",
          "label": "Black"
        },
        {
          "color": "blue",
          "label": "Gray"
        },
        {
          "color": "green",
          "label": "Orange"
        },
        {
          "color": "yellow",
          "label": "Silver"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Orange",
      "colorTrap": true
    },
    {
      "id": "Q43",
      "category": "FOOD & CUISINE",
      "prompt": "What tropical fruit is the key ingredient in a traditional Puerto Rican tembleque?",
      "options": [
        {
          "color": "red",
          "label": "Mango"
        },
        {
          "color": "blue",
          "label": "Coconut"
        },
        {
          "color": "green",
          "label": "Papaya"
        },
        {
          "color": "yellow",
          "label": "Guava"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Coconut",
      "colorTrap": false
    },
    {
      "id": "Q44",
      "category": "BRAIN TEASER",
      "prompt": "What has one eye but cannot see?",
      "options": [
        {
          "color": "red",
          "label": "A cyclops"
        },
        {
          "color": "blue",
          "label": "A needle"
        },
        {
          "color": "green",
          "label": "A storm"
        },
        {
          "color": "yellow",
          "label": "A camera"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A needle",
      "colorTrap": false
    },
    {
      "id": "Q45",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the smallest planet in our solar system?",
      "options": [
        {
          "color": "red",
          "label": "Mars"
        },
        {
          "color": "blue",
          "label": "Mercury"
        },
        {
          "color": "green",
          "label": "Venus"
        },
        {
          "color": "yellow",
          "label": "Pluto"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Mercury",
      "colorTrap": false
    },
    {
      "id": "Q46",
      "category": "CULTURE",
      "prompt": "What is the name of the traditional Puerto Rican folk music and dance style associated with African heritage and drumming?",
      "options": [
        {
          "color": "red",
          "label": "Salsa"
        },
        {
          "color": "blue",
          "label": "Bomba"
        },
        {
          "color": "green",
          "label": "Reggaeton"
        },
        {
          "color": "yellow",
          "label": "Plena"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Bomba",
      "colorTrap": false
    },
    {
      "id": "Q47",
      "category": "SCIENCE & NATURE",
      "prompt": "Which sense is most closely linked to memory and emotion in the human brain?",
      "options": [
        {
          "color": "red",
          "label": "Sight"
        },
        {
          "color": "blue",
          "label": "Hearing"
        },
        {
          "color": "green",
          "label": "Smell"
        },
        {
          "color": "yellow",
          "label": "Touch"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Smell",
      "colorTrap": false
    },
    {
      "id": "Q48",
      "category": "TEAM PERSONALIZED",
      "prompt": "Which team member is Susie's direct report on Secure Net Capital operations, based in Puerto Rico?",
      "options": [
        {
          "color": "red",
          "label": "Giann"
        },
        {
          "color": "blue",
          "label": "Francisco"
        },
        {
          "color": "green",
          "label": "Stephanny"
        },
        {
          "color": "yellow",
          "label": "Lyka"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Francisco",
      "colorTrap": false
    },
    {
      "id": "Q49",
      "category": "POP CULTURE",
      "prompt": "What is the highest-grossing animated film of all time (as of recent box office records)?",
      "options": [
        {
          "color": "red",
          "label": "Frozen II"
        },
        {
          "color": "blue",
          "label": "Inside Out 2"
        },
        {
          "color": "green",
          "label": "The Lion King (2019)"
        },
        {
          "color": "yellow",
          "label": "Minions: The Rise of Gru"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Inside Out 2",
      "colorTrap": false
    },
    {
      "id": "Q50",
      "category": "GEOGRAPHY",
      "prompt": "What is the capital city of the Philippines?",
      "options": [
        {
          "color": "red",
          "label": "Cebu City"
        },
        {
          "color": "blue",
          "label": "Davao City"
        },
        {
          "color": "green",
          "label": "Manila"
        },
        {
          "color": "yellow",
          "label": "Quezon City"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Manila",
      "colorTrap": false
    },
    {
      "id": "Q51",
      "category": "BRAIN TEASER",
      "prompt": "What building has the most stories, yet no floors?",
      "options": [
        {
          "color": "red",
          "label": "A school"
        },
        {
          "color": "blue",
          "label": "A library"
        },
        {
          "color": "green",
          "label": "A hospital"
        },
        {
          "color": "yellow",
          "label": "A skyscraper"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A library",
      "colorTrap": false
    },
    {
      "id": "Q52",
      "category": "SCIENCE & NATURE",
      "prompt": "What gas makes up the majority of Earth's atmosphere?",
      "options": [
        {
          "color": "red",
          "label": "Oxygen"
        },
        {
          "color": "blue",
          "label": "Carbon Dioxide"
        },
        {
          "color": "green",
          "label": "Hydrogen"
        },
        {
          "color": "yellow",
          "label": "Nitrogen"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Nitrogen",
      "colorTrap": false
    }
  ],
  "Jenny": [
    {
      "id": "Q53",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What year did Puerto Rico become a U.S. territory?",
      "options": [
        {
          "color": "red",
          "label": "1898"
        },
        {
          "color": "blue",
          "label": "1917"
        },
        {
          "color": "green",
          "label": "1952"
        },
        {
          "color": "yellow",
          "label": "1959"
        }
      ],
      "correctColor": "red",
      "correctLabel": "1898",
      "colorTrap": false
    },
    {
      "id": "Q54",
      "category": "POP CULTURE",
      "prompt": "Which superhero is known as the \"Man of Steel\"?",
      "options": [
        {
          "color": "red",
          "label": "Batman"
        },
        {
          "color": "blue",
          "label": "Superman"
        },
        {
          "color": "green",
          "label": "The Flash"
        },
        {
          "color": "yellow",
          "label": "Green Lantern"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Superman",
      "colorTrap": false
    },
    {
      "id": "Q55",
      "category": "GEOGRAPHY",
      "prompt": "What is the largest island in the Philippines?",
      "options": [
        {
          "color": "red",
          "label": "Cebu"
        },
        {
          "color": "blue",
          "label": "Mindanao"
        },
        {
          "color": "green",
          "label": "Luzon"
        },
        {
          "color": "yellow",
          "label": "Palawan"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Luzon",
      "colorTrap": false
    },
    {
      "id": "Q56",
      "category": "FOOD & CUISINE",
      "prompt": "**[COLOR TRAP]** Key lime pie, a Florida staple, is traditionally what color inside despite common misconceptions?",
      "options": [
        {
          "color": "red",
          "label": "Green"
        },
        {
          "color": "blue",
          "label": "Pale yellow"
        },
        {
          "color": "green",
          "label": "White"
        },
        {
          "color": "yellow",
          "label": "Yellow"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Pale yellow",
      "colorTrap": true
    },
    {
      "id": "Q57",
      "category": "BRAIN TEASER",
      "prompt": "What comes once in a minute, twice in a moment, but never in a thousand years?",
      "options": [
        {
          "color": "red",
          "label": "The letter M"
        },
        {
          "color": "blue",
          "label": "A second"
        },
        {
          "color": "green",
          "label": "A heartbeat"
        },
        {
          "color": "yellow",
          "label": "A blink"
        }
      ],
      "correctColor": "red",
      "correctLabel": "The letter M",
      "colorTrap": false
    },
    {
      "id": "Q58",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the tallest mountain in the world, measured from sea level?",
      "options": [
        {
          "color": "red",
          "label": "K2"
        },
        {
          "color": "blue",
          "label": "Mount Everest"
        },
        {
          "color": "green",
          "label": "Denali"
        },
        {
          "color": "yellow",
          "label": "Kilimanjaro"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Mount Everest",
      "colorTrap": false
    },
    {
      "id": "Q59",
      "category": "CULTURE",
      "prompt": "What is the name of the giant, multi-day Puerto Rican festival held in Ponce, famous for its elaborate masked \"vejigante\" costumes?",
      "options": [
        {
          "color": "red",
          "label": "Fiestas de la Calle San Sebastián"
        },
        {
          "color": "blue",
          "label": "Carnaval Ponceño"
        },
        {
          "color": "green",
          "label": "Día de Reyes"
        },
        {
          "color": "yellow",
          "label": "Las Navidades"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Carnaval Ponceño",
      "colorTrap": false
    },
    {
      "id": "Q60",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the largest organ in the human body?",
      "options": [
        {
          "color": "red",
          "label": "Liver"
        },
        {
          "color": "blue",
          "label": "Brain"
        },
        {
          "color": "green",
          "label": "Skin"
        },
        {
          "color": "yellow",
          "label": "Lungs"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Skin",
      "colorTrap": false
    },
    {
      "id": "Q61",
      "category": "TEAM PERSONALIZED",
      "prompt": "Susie's team spans three locations. Which one is NOT one of them?",
      "options": [
        {
          "color": "red",
          "label": "Florida"
        },
        {
          "color": "blue",
          "label": "Puerto Rico"
        },
        {
          "color": "green",
          "label": "Philippines"
        },
        {
          "color": "yellow",
          "label": "Mexico"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Mexico",
      "colorTrap": false
    },
    {
      "id": "Q62",
      "category": "POP CULTURE",
      "prompt": "What was the first feature-length animated film ever released by Disney?",
      "options": [
        {
          "color": "red",
          "label": "Pinocchio"
        },
        {
          "color": "blue",
          "label": "Snow White and the Seven Dwarfs"
        },
        {
          "color": "green",
          "label": "Fantasia"
        },
        {
          "color": "yellow",
          "label": "Bambi"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Snow White and the Seven Dwarfs",
      "colorTrap": false
    },
    {
      "id": "Q63",
      "category": "GEOGRAPHY",
      "prompt": "Which of these Florida cities is furthest south?",
      "options": [
        {
          "color": "red",
          "label": "Tampa"
        },
        {
          "color": "blue",
          "label": "Orlando"
        },
        {
          "color": "green",
          "label": "Key West"
        },
        {
          "color": "yellow",
          "label": "Jacksonville"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Key West",
      "colorTrap": false
    },
    {
      "id": "Q64",
      "category": "BRAIN TEASER",
      "prompt": "What has a neck but no head?",
      "options": [
        {
          "color": "red",
          "label": "A guitar"
        },
        {
          "color": "blue",
          "label": "A bottle"
        },
        {
          "color": "green",
          "label": "A shirt"
        },
        {
          "color": "yellow",
          "label": "A giraffe"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A bottle",
      "colorTrap": false
    },
    {
      "id": "Q65",
      "category": "FOOD & CUISINE",
      "prompt": "What spice, central to Filipino adobo and many Caribbean dishes, comes from dried tree bark?",
      "options": [
        {
          "color": "red",
          "label": "Nutmeg"
        },
        {
          "color": "blue",
          "label": "Cinnamon"
        },
        {
          "color": "green",
          "label": "Clove"
        },
        {
          "color": "yellow",
          "label": "Bay leaf"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Cinnamon",
      "colorTrap": false
    }
  ]
};

export const RESERVE_QUESTIONS: Record<PlayerName, GameQuestion[]> = {
  "Stephanny": [
    {
      "id": "R66",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the chemical symbol for gold?",
      "options": [
        {
          "color": "red",
          "label": "Go"
        },
        {
          "color": "blue",
          "label": "Gd"
        },
        {
          "color": "green",
          "label": "Au"
        },
        {
          "color": "yellow",
          "label": "Ag"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Au",
      "colorTrap": false
    },
    {
      "id": "R67",
      "category": "POP CULTURE",
      "prompt": "Who directed \"Jaws,\" \"E.T.,\" and \"Jurassic Park\"?",
      "options": [
        {
          "color": "red",
          "label": "George Lucas"
        },
        {
          "color": "blue",
          "label": "Steven Spielberg"
        },
        {
          "color": "green",
          "label": "James Cameron"
        },
        {
          "color": "yellow",
          "label": "Ron Howard"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Steven Spielberg",
      "colorTrap": false
    },
    {
      "id": "R68",
      "category": "GEOGRAPHY",
      "prompt": "What is the second-largest country in the world by land area?",
      "options": [
        {
          "color": "red",
          "label": "China"
        },
        {
          "color": "blue",
          "label": "United States"
        },
        {
          "color": "green",
          "label": "Canada"
        },
        {
          "color": "yellow",
          "label": "Russia"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Canada",
      "colorTrap": false
    },
    {
      "id": "R69",
      "category": "BRAIN TEASER",
      "prompt": "What has a bank but no money?",
      "options": [
        {
          "color": "red",
          "label": "A safe"
        },
        {
          "color": "blue",
          "label": "A river"
        },
        {
          "color": "green",
          "label": "A vault"
        },
        {
          "color": "yellow",
          "label": "An ATM"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A river",
      "colorTrap": false
    },
    {
      "id": "R70",
      "category": "FOOD & CUISINE",
      "prompt": "What Puerto Rican dish consists of green plantains fried, mashed, and formed into a bowl, often filled with meat or seafood?",
      "options": [
        {
          "color": "red",
          "label": "Alcapurria"
        },
        {
          "color": "blue",
          "label": "Piononos"
        },
        {
          "color": "green",
          "label": "Mofongo relleno"
        },
        {
          "color": "yellow",
          "label": "Arroz con gandules"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Mofongo relleno",
      "colorTrap": false
    },
    {
      "id": "R91",
      "category": "COLOR TRAP",
      "prompt": "What color is a giraffe's tongue?",
      "options": [
        {
          "color": "red",
          "label": "Blue-black"
        },
        {
          "color": "blue",
          "label": "Pink"
        },
        {
          "color": "green",
          "label": "Brown"
        },
        {
          "color": "yellow",
          "label": "Purple"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Blue-black",
      "colorTrap": true
    }
  ],
  "Giann": [
    {
      "id": "R71",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the fastest land animal in the world?",
      "options": [
        {
          "color": "red",
          "label": "Lion"
        },
        {
          "color": "blue",
          "label": "Cheetah"
        },
        {
          "color": "green",
          "label": "Pronghorn Antelope"
        },
        {
          "color": "yellow",
          "label": "Greyhound"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Cheetah",
      "colorTrap": false
    },
    {
      "id": "R72",
      "category": "CULTURE",
      "prompt": "What is the traditional Filipino greeting gesture where a younger person presses an elder's hand to their forehead as a sign of respect?",
      "options": [
        {
          "color": "red",
          "label": "Mano"
        },
        {
          "color": "blue",
          "label": "Bayanihan"
        },
        {
          "color": "green",
          "label": "Kumustahan"
        },
        {
          "color": "yellow",
          "label": "Pagmamano"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Pagmamano",
      "colorTrap": false
    },
    {
      "id": "R73",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "How many time zones does the continental United States span?",
      "options": [
        {
          "color": "red",
          "label": "3"
        },
        {
          "color": "blue",
          "label": "4"
        },
        {
          "color": "green",
          "label": "5"
        },
        {
          "color": "yellow",
          "label": "6"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "4",
      "colorTrap": false
    },
    {
      "id": "R74",
      "category": "POP CULTURE",
      "prompt": "What board game features characters like Colonel Mustard and Professor Plum?",
      "options": [
        {
          "color": "red",
          "label": "Monopoly"
        },
        {
          "color": "blue",
          "label": "Clue"
        },
        {
          "color": "green",
          "label": "Risk"
        },
        {
          "color": "yellow",
          "label": "Life"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Clue",
      "colorTrap": false
    },
    {
      "id": "R75",
      "category": "BRAIN TEASER",
      "prompt": "What can you catch but never throw?",
      "options": [
        {
          "color": "red",
          "label": "A ball"
        },
        {
          "color": "blue",
          "label": "A cold"
        },
        {
          "color": "green",
          "label": "A fish"
        },
        {
          "color": "yellow",
          "label": "A break"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A cold",
      "colorTrap": false
    },
    {
      "id": "R92",
      "category": "COLOR TRAP",
      "prompt": "What color is the flesh of a dragon fruit, the most common variety sold in stores?",
      "options": [
        {
          "color": "red",
          "label": "Purple"
        },
        {
          "color": "blue",
          "label": "Pink"
        },
        {
          "color": "green",
          "label": "Red"
        },
        {
          "color": "yellow",
          "label": "White"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "White",
      "colorTrap": true
    }
  ],
  "Francisco": [
    {
      "id": "R76",
      "category": "GEOGRAPHY",
      "prompt": "What is the only U.S. state that grows coffee commercially?",
      "options": [
        {
          "color": "red",
          "label": "Florida"
        },
        {
          "color": "blue",
          "label": "California"
        },
        {
          "color": "green",
          "label": "Hawaii"
        },
        {
          "color": "yellow",
          "label": "Puerto Rico is a territory, so continental U.S. only"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Hawaii",
      "colorTrap": false
    },
    {
      "id": "R77",
      "category": "FOOD & CUISINE",
      "prompt": "What Florida seafood dish is traditionally made with conch pounded thin, breaded, and fried?",
      "options": [
        {
          "color": "red",
          "label": "Conch fritters"
        },
        {
          "color": "blue",
          "label": "Conch chowder"
        },
        {
          "color": "green",
          "label": "Cracked conch"
        },
        {
          "color": "yellow",
          "label": "Conch ceviche"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Cracked conch",
      "colorTrap": false
    },
    {
      "id": "R78",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the name for a group of flamingos?",
      "options": [
        {
          "color": "red",
          "label": "A flock"
        },
        {
          "color": "blue",
          "label": "A flamboyance"
        },
        {
          "color": "green",
          "label": "A colony"
        },
        {
          "color": "yellow",
          "label": "A pack"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A flamboyance",
      "colorTrap": false
    },
    {
      "id": "R79",
      "category": "TEAM PERSONALIZED",
      "prompt": "What ADP module does Susie always end up muttering about under her breath?",
      "options": [
        {
          "color": "red",
          "label": "Payroll"
        },
        {
          "color": "blue",
          "label": "Pay Statements"
        },
        {
          "color": "green",
          "label": "Time & Attendance"
        },
        {
          "color": "yellow",
          "label": "All of it, honestly"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "All of it, honestly",
      "colorTrap": false
    },
    {
      "id": "R80",
      "category": "POP CULTURE",
      "prompt": "What was the first video game character to become a global pop culture icon, debuting in 1981?",
      "options": [
        {
          "color": "red",
          "label": "Sonic"
        },
        {
          "color": "blue",
          "label": "Mario"
        },
        {
          "color": "green",
          "label": "Pac-Man"
        },
        {
          "color": "yellow",
          "label": "Link"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Mario",
      "colorTrap": false
    },
    {
      "id": "R93",
      "category": "COLOR TRAP",
      "prompt": "What color is the center of a Florida key lime, before it's juiced?",
      "options": [
        {
          "color": "red",
          "label": "Yellow"
        },
        {
          "color": "blue",
          "label": "Green"
        },
        {
          "color": "green",
          "label": "White"
        },
        {
          "color": "yellow",
          "label": "Orange"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Yellow",
      "colorTrap": true
    }
  ],
  "Lyka": [
    {
      "id": "R81",
      "category": "GEOGRAPHY",
      "prompt": "Which Philippine island group is home to the Chocolate Hills, a famous natural rock formation?",
      "options": [
        {
          "color": "red",
          "label": "Luzon"
        },
        {
          "color": "blue",
          "label": "Bohol"
        },
        {
          "color": "green",
          "label": "Palawan"
        },
        {
          "color": "yellow",
          "label": "Cebu"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Bohol",
      "colorTrap": false
    },
    {
      "id": "R82",
      "category": "BRAIN TEASER",
      "prompt": "I am not alive, but I grow. I don't have lungs, but I need air. What am I?",
      "options": [
        {
          "color": "red",
          "label": "A tree"
        },
        {
          "color": "blue",
          "label": "A crystal"
        },
        {
          "color": "green",
          "label": "Fire"
        },
        {
          "color": "yellow",
          "label": "A shadow"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Fire",
      "colorTrap": false
    },
    {
      "id": "R83",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the world's most spoken native language?",
      "options": [
        {
          "color": "red",
          "label": "English"
        },
        {
          "color": "blue",
          "label": "Spanish"
        },
        {
          "color": "green",
          "label": "Mandarin Chinese"
        },
        {
          "color": "yellow",
          "label": "Hindi"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Mandarin Chinese",
      "colorTrap": false
    },
    {
      "id": "R84",
      "category": "SCIENCE & NATURE",
      "prompt": "What part of the plant conducts photosynthesis?",
      "options": [
        {
          "color": "red",
          "label": "Roots"
        },
        {
          "color": "blue",
          "label": "Stem"
        },
        {
          "color": "green",
          "label": "Leaves"
        },
        {
          "color": "yellow",
          "label": "Flowers"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Leaves",
      "colorTrap": false
    },
    {
      "id": "R85",
      "category": "FOOD & CUISINE",
      "prompt": "What Filipino noodle dish is traditionally served at birthdays to symbolize long life?",
      "options": [
        {
          "color": "red",
          "label": "Pancit"
        },
        {
          "color": "blue",
          "label": "Lumpia"
        },
        {
          "color": "green",
          "label": "Bihon"
        },
        {
          "color": "yellow",
          "label": "Sotanghon"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Pancit",
      "colorTrap": false
    },
    {
      "id": "R94",
      "category": "COLOR TRAP",
      "prompt": "The word \"BLUE\" is displayed in yellow text. What color is the text?",
      "options": [
        {
          "color": "red",
          "label": "Yellow"
        },
        {
          "color": "blue",
          "label": "Green"
        },
        {
          "color": "green",
          "label": "Purple"
        },
        {
          "color": "yellow",
          "label": "Blue"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Yellow",
      "colorTrap": true
    }
  ],
  "Jenny": [
    {
      "id": "R86",
      "category": "CULTURE",
      "prompt": "What is the Spanish word for the small, historic plazas found at the center of most Puerto Rican towns?",
      "options": [
        {
          "color": "red",
          "label": "Barrio"
        },
        {
          "color": "blue",
          "label": "Plaza"
        },
        {
          "color": "green",
          "label": "Casco"
        },
        {
          "color": "yellow",
          "label": "Centro"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Plaza",
      "colorTrap": false
    },
    {
      "id": "R87",
      "category": "POP CULTURE",
      "prompt": "Which fast food chain's mascot is a purple, blob-like creature named Grimace?",
      "options": [
        {
          "color": "red",
          "label": "Wendy's"
        },
        {
          "color": "blue",
          "label": "Burger King"
        },
        {
          "color": "green",
          "label": "McDonald's"
        },
        {
          "color": "yellow",
          "label": "Jack in the Box"
        }
      ],
      "correctColor": "green",
      "correctLabel": "McDonald's",
      "colorTrap": false
    },
    {
      "id": "R88",
      "category": "GEOGRAPHY",
      "prompt": "What is the northernmost major city in Florida?",
      "options": [
        {
          "color": "red",
          "label": "Miami"
        },
        {
          "color": "blue",
          "label": "Tampa"
        },
        {
          "color": "green",
          "label": "Orlando"
        },
        {
          "color": "yellow",
          "label": "Jacksonville"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Jacksonville",
      "colorTrap": false
    },
    {
      "id": "R89",
      "category": "BRAIN TEASER",
      "prompt": "What five-letter word becomes shorter when you add two letters to it?",
      "options": [
        {
          "color": "red",
          "label": "Small"
        },
        {
          "color": "blue",
          "label": "Short"
        },
        {
          "color": "green",
          "label": "Brief"
        },
        {
          "color": "yellow",
          "label": "Tiny"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Short",
      "colorTrap": false
    },
    {
      "id": "R90",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the term for an animal that is active primarily at night?",
      "options": [
        {
          "color": "red",
          "label": "Diurnal"
        },
        {
          "color": "blue",
          "label": "Nocturnal"
        },
        {
          "color": "green",
          "label": "Crepuscular"
        },
        {
          "color": "yellow",
          "label": "Dormant"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Nocturnal",
      "colorTrap": false
    },
    {
      "id": "R95",
      "category": "COLOR TRAP",
      "prompt": "What color is a traditional Puerto Rican flamboyán (flame tree) in full bloom?",
      "options": [
        {
          "color": "red",
          "label": "Yellow"
        },
        {
          "color": "blue",
          "label": "Orange"
        },
        {
          "color": "green",
          "label": "Purple"
        },
        {
          "color": "yellow",
          "label": "Red"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Red",
      "colorTrap": true
    }
  ]
};

export const TIEBREAKER_QUESTIONS: GameQuestion[] = [
  {
    "id": "TB1",
    "category": "Tiebreaker",
    "prompt": "What year did the first iPhone launch?",
    "options": [
      {
        "color": "red",
        "label": "2005"
      },
      {
        "color": "blue",
        "label": "2006"
      },
      {
        "color": "green",
        "label": "2007"
      },
      {
        "color": "yellow",
        "label": "2008"
      }
    ],
    "correctColor": "green",
    "correctLabel": "2007",
    "colorTrap": false
  },
  {
    "id": "TB2",
    "category": "Tiebreaker",
    "prompt": "How many stars are on the U.S. flag?",
    "options": [
      {
        "color": "red",
        "label": "48"
      },
      {
        "color": "blue",
        "label": "49"
      },
      {
        "color": "green",
        "label": "50"
      },
      {
        "color": "yellow",
        "label": "51"
      }
    ],
    "correctColor": "green",
    "correctLabel": "50",
    "colorTrap": false
  },
  {
    "id": "TB3",
    "category": "Tiebreaker",
    "prompt": "What is the boiling point of water in Fahrenheit at sea level?",
    "options": [
      {
        "color": "red",
        "label": "200°F"
      },
      {
        "color": "blue",
        "label": "212°F"
      },
      {
        "color": "green",
        "label": "220°F"
      },
      {
        "color": "yellow",
        "label": "180°F"
      }
    ],
    "correctColor": "blue",
    "correctLabel": "212°F",
    "colorTrap": false
  },
  {
    "id": "TB4",
    "category": "Tiebreaker",
    "prompt": "How many keys does a standard piano have?",
    "options": [
      {
        "color": "red",
        "label": "76"
      },
      {
        "color": "blue",
        "label": "88"
      },
      {
        "color": "green",
        "label": "96"
      },
      {
        "color": "yellow",
        "label": "108"
      }
    ],
    "correctColor": "blue",
    "correctLabel": "88",
    "colorTrap": false
  },
  {
    "id": "TB5",
    "category": "Tiebreaker",
    "prompt": "What is the smallest prime number?",
    "options": [
      {
        "color": "red",
        "label": "0"
      },
      {
        "color": "blue",
        "label": "1"
      },
      {
        "color": "green",
        "label": "2"
      },
      {
        "color": "yellow",
        "label": "3"
      }
    ],
    "correctColor": "green",
    "correctLabel": "2",
    "colorTrap": false
  }
];

export const PRIZES: Record<number, number> = { 1: 50, 2: 35, 3: 30, 4: 20, 5: 15 };

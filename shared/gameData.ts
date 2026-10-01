/**
 * Generated from the approved Color Me Lucky Question Bank v3.
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

export const QUESTION_BANK_VERSION = "v3";
export const QUESTION_BANK_COUNTS = { demo: 3, primary: 65, reserve: 30, tiebreaker: 5, total: 103 } as const;

export const DEMO_QUESTIONS: GameQuestion[] = [
  {
    "id": "D1",
    "category": "DISNEY CHARACTERS",
    "prompt": "What is the name of Mickey Mouse's dog?",
    "options": [
      {
        "color": "red",
        "label": "Goofy"
      },
      {
        "color": "blue",
        "label": "Pluto"
      },
      {
        "color": "green",
        "label": "Donald"
      },
      {
        "color": "yellow",
        "label": "Figaro"
      }
    ],
    "correctColor": "blue",
    "correctLabel": "Pluto",
    "colorTrap": false
  },
  {
    "id": "D2",
    "category": "GENERAL KNOWLEDGE",
    "prompt": "How many continents are there?",
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
        "label": "7"
      },
      {
        "color": "yellow",
        "label": "8"
      }
    ],
    "correctColor": "green",
    "correctLabel": "7",
    "colorTrap": false
  },
  {
    "id": "D3",
    "category": "BRAIN TEASER",
    "prompt": "What goes up but never comes down?",
    "options": [
      {
        "color": "red",
        "label": "A balloon"
      },
      {
        "color": "blue",
        "label": "Your age"
      },
      {
        "color": "green",
        "label": "Smoke"
      },
      {
        "color": "yellow",
        "label": "A kite"
      }
    ],
    "correctColor": "blue",
    "correctLabel": "Your age",
    "colorTrap": false
  }
];

export const PRIMARY_QUESTIONS: Record<PlayerName, GameQuestion[]> = {
  "Stephanny": [
    {
      "id": "Q1",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of the evil queen's enchanted object in \"Snow White\"?",
      "options": [
        {
          "color": "red",
          "label": "A crystal ball"
        },
        {
          "color": "blue",
          "label": "A magic mirror"
        },
        {
          "color": "green",
          "label": "A spinning wheel"
        },
        {
          "color": "yellow",
          "label": "A poisoned apple"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A magic mirror",
      "colorTrap": false
    },
    {
      "id": "Q2",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the capital of Japan?",
      "options": [
        {
          "color": "red",
          "label": "Seoul"
        },
        {
          "color": "blue",
          "label": "Beijing"
        },
        {
          "color": "green",
          "label": "Tokyo"
        },
        {
          "color": "yellow",
          "label": "Bangkok"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Tokyo",
      "colorTrap": false
    },
    {
      "id": "Q3",
      "category": "POP CULTURE",
      "prompt": "Which band performed \"Bohemian Rhapsody\"?",
      "options": [
        {
          "color": "red",
          "label": "The Beatles"
        },
        {
          "color": "blue",
          "label": "Queen"
        },
        {
          "color": "green",
          "label": "Led Zeppelin"
        },
        {
          "color": "yellow",
          "label": "Pink Floyd"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Queen",
      "colorTrap": false
    },
    {
      "id": "Q4",
      "category": "GEOGRAPHY",
      "prompt": "What is the longest mountain range in the world?",
      "options": [
        {
          "color": "red",
          "label": "Rockies"
        },
        {
          "color": "blue",
          "label": "Andes"
        },
        {
          "color": "green",
          "label": "Himalayas"
        },
        {
          "color": "yellow",
          "label": "Alps"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Andes",
      "colorTrap": false
    },
    {
      "id": "Q5",
      "category": "BRAIN TEASER",
      "prompt": "What question can you never honestly answer yes to?",
      "options": [
        {
          "color": "red",
          "label": "Are you asleep?"
        },
        {
          "color": "blue",
          "label": "Are you lying?"
        },
        {
          "color": "green",
          "label": "Are you hungry?"
        },
        {
          "color": "yellow",
          "label": "Are you lost?"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Are you asleep?",
      "colorTrap": false
    },
    {
      "id": "Q6",
      "category": "FOOD & CUISINE",
      "prompt": "**[COLOR TRAP]** What color is the inside pulp of a passion fruit?",
      "options": [
        {
          "color": "red",
          "label": "Purple"
        },
        {
          "color": "blue",
          "label": "Yellow"
        },
        {
          "color": "green",
          "label": "Orange"
        },
        {
          "color": "yellow",
          "label": "Green"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Orange",
      "colorTrap": true
    },
    {
      "id": "Q7",
      "category": "DISNEY CHARACTERS",
      "prompt": "Who is Ariel's father in \"The Little Mermaid\"?",
      "options": [
        {
          "color": "red",
          "label": "King Triton"
        },
        {
          "color": "blue",
          "label": "King Neptune"
        },
        {
          "color": "green",
          "label": "King Poseidon"
        },
        {
          "color": "yellow",
          "label": "King Francis"
        }
      ],
      "correctColor": "red",
      "correctLabel": "King Triton",
      "colorTrap": false
    },
    {
      "id": "Q8",
      "category": "CULTURE",
      "prompt": "What is the name of the traditional Filipino bamboo dance where dancers hop between clapping poles?",
      "options": [
        {
          "color": "red",
          "label": "Tinikling"
        },
        {
          "color": "blue",
          "label": "Itik-Itik"
        },
        {
          "color": "green",
          "label": "Pandanggo"
        },
        {
          "color": "yellow",
          "label": "Subli"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Tinikling",
      "colorTrap": false
    },
    {
      "id": "Q9",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the largest species of big cat?",
      "options": [
        {
          "color": "red",
          "label": "Lion"
        },
        {
          "color": "blue",
          "label": "Tiger"
        },
        {
          "color": "green",
          "label": "Jaguar"
        },
        {
          "color": "yellow",
          "label": "Leopard"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Tiger",
      "colorTrap": false
    },
    {
      "id": "Q10",
      "category": "TEAM PERSONALIZED",
      "prompt": "Which team member works ops out of Puerto Rico alongside Giann and Stephanny?",
      "options": [
        {
          "color": "red",
          "label": "Lyka"
        },
        {
          "color": "blue",
          "label": "Jenny"
        },
        {
          "color": "green",
          "label": "Francisco"
        },
        {
          "color": "yellow",
          "label": "Susie"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Francisco",
      "colorTrap": false
    },
    {
      "id": "Q11",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the smallest country in the world by land area?",
      "options": [
        {
          "color": "red",
          "label": "Monaco"
        },
        {
          "color": "blue",
          "label": "San Marino"
        },
        {
          "color": "green",
          "label": "Vatican City"
        },
        {
          "color": "yellow",
          "label": "Liechtenstein"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Vatican City",
      "colorTrap": false
    },
    {
      "id": "Q12",
      "category": "DISNEY CHARACTERS",
      "prompt": "Who is the villain in \"Sleeping Beauty\"?",
      "options": [
        {
          "color": "red",
          "label": "Ursula"
        },
        {
          "color": "blue",
          "label": "Maleficent"
        },
        {
          "color": "green",
          "label": "Cruella de Vil"
        },
        {
          "color": "yellow",
          "label": "Gaston"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Maleficent",
      "colorTrap": false
    },
    {
      "id": "Q13",
      "category": "BRAIN TEASER",
      "prompt": "What has a face and two hands but no arms or legs?",
      "options": [
        {
          "color": "red",
          "label": "A doll"
        },
        {
          "color": "blue",
          "label": "A clock"
        },
        {
          "color": "green",
          "label": "A mannequin"
        },
        {
          "color": "yellow",
          "label": "A statue"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A clock",
      "colorTrap": false
    }
  ],
  "Giann": [
    {
      "id": "Q14",
      "category": "DISNEY CHARACTERS",
      "prompt": "In \"Beauty and the Beast,\" what household object is Lumiere?",
      "options": [
        {
          "color": "red",
          "label": "A clock"
        },
        {
          "color": "blue",
          "label": "A candelabra"
        },
        {
          "color": "green",
          "label": "A teapot"
        },
        {
          "color": "yellow",
          "label": "A wardrobe"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A candelabra",
      "colorTrap": false
    },
    {
      "id": "Q15",
      "category": "POP CULTURE",
      "prompt": "What is the best selling video game console of all time?",
      "options": [
        {
          "color": "red",
          "label": "PlayStation 2"
        },
        {
          "color": "blue",
          "label": "Nintendo Switch"
        },
        {
          "color": "green",
          "label": "Xbox 360"
        },
        {
          "color": "yellow",
          "label": "Wii"
        }
      ],
      "correctColor": "red",
      "correctLabel": "PlayStation 2",
      "colorTrap": false
    },
    {
      "id": "Q16",
      "category": "GEOGRAPHY",
      "prompt": "**[COLOR TRAP]** What color are most of the feathers on Florida's state bird, the mockingbird?",
      "options": [
        {
          "color": "red",
          "label": "Blue"
        },
        {
          "color": "blue",
          "label": "Brown"
        },
        {
          "color": "green",
          "label": "White"
        },
        {
          "color": "yellow",
          "label": "Gray"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Gray",
      "colorTrap": true
    },
    {
      "id": "Q17",
      "category": "FOOD & CUISINE",
      "prompt": "Pastelillos, a popular Puerto Rican snack, are best described as what?",
      "options": [
        {
          "color": "red",
          "label": "Fried empanada style turnovers"
        },
        {
          "color": "blue",
          "label": "Sweet rice pudding"
        },
        {
          "color": "green",
          "label": "Grilled corn cakes"
        },
        {
          "color": "yellow",
          "label": "Stuffed plantain balls"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Fried empanada style turnovers",
      "colorTrap": false
    },
    {
      "id": "Q18",
      "category": "BRAIN TEASER",
      "prompt": "What invention lets you look right through a wall?",
      "options": [
        {
          "color": "red",
          "label": "A telescope"
        },
        {
          "color": "blue",
          "label": "A window"
        },
        {
          "color": "green",
          "label": "A mirror"
        },
        {
          "color": "yellow",
          "label": "A periscope"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A window",
      "colorTrap": false
    },
    {
      "id": "Q19",
      "category": "DISNEY CHARACTERS",
      "prompt": "Who is the main villain in \"The Lion King\"?",
      "options": [
        {
          "color": "red",
          "label": "Zira"
        },
        {
          "color": "blue",
          "label": "Shenzi"
        },
        {
          "color": "green",
          "label": "Scar"
        },
        {
          "color": "yellow",
          "label": "Banzai"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Scar",
      "colorTrap": false
    },
    {
      "id": "Q20",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "Which element has the chemical symbol \"Fe\"?",
      "options": [
        {
          "color": "red",
          "label": "Fluorine"
        },
        {
          "color": "blue",
          "label": "Iron"
        },
        {
          "color": "green",
          "label": "Francium"
        },
        {
          "color": "yellow",
          "label": "Lead"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Iron",
      "colorTrap": false
    },
    {
      "id": "Q21",
      "category": "CULTURE",
      "prompt": "What is the Puerto Rican term for a roadside food stand, often selling fritters and fresh juice?",
      "options": [
        {
          "color": "red",
          "label": "Chinchorro"
        },
        {
          "color": "blue",
          "label": "Kiosko"
        },
        {
          "color": "green",
          "label": "Fonda"
        },
        {
          "color": "yellow",
          "label": "Bodega"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Kiosko",
      "colorTrap": false
    },
    {
      "id": "Q22",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the term for a baby kangaroo?",
      "options": [
        {
          "color": "red",
          "label": "Cub"
        },
        {
          "color": "blue",
          "label": "Joey"
        },
        {
          "color": "green",
          "label": "Kid"
        },
        {
          "color": "yellow",
          "label": "Pup"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Joey",
      "colorTrap": false
    },
    {
      "id": "Q23",
      "category": "TEAM PERSONALIZED",
      "prompt": "What nickname does Susie use for her sons, borrowed from Winnie the Pooh?",
      "options": [
        {
          "color": "red",
          "label": "Piglet"
        },
        {
          "color": "blue",
          "label": "Tigger"
        },
        {
          "color": "green",
          "label": "Roo"
        },
        {
          "color": "yellow",
          "label": "Eeyore"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Roo",
      "colorTrap": false
    },
    {
      "id": "Q24",
      "category": "POP CULTURE",
      "prompt": "What was the first Pixar film ever released?",
      "options": [
        {
          "color": "red",
          "label": "A Bug's Life"
        },
        {
          "color": "blue",
          "label": "Toy Story"
        },
        {
          "color": "green",
          "label": "Monsters, Inc."
        },
        {
          "color": "yellow",
          "label": "Finding Nemo"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Toy Story",
      "colorTrap": false
    },
    {
      "id": "Q25",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of Aladdin's pet monkey?",
      "options": [
        {
          "color": "red",
          "label": "Rajah"
        },
        {
          "color": "blue",
          "label": "Iago"
        },
        {
          "color": "green",
          "label": "Abu"
        },
        {
          "color": "yellow",
          "label": "Zazu"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Abu",
      "colorTrap": false
    },
    {
      "id": "Q26",
      "category": "GEOGRAPHY",
      "prompt": "What island group does the Philippine capital, Manila, belong to?",
      "options": [
        {
          "color": "red",
          "label": "Visayas"
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
    }
  ],
  "Francisco": [
    {
      "id": "Q27",
      "category": "DISNEY CHARACTERS",
      "prompt": "In \"Cinderella,\" what time does the magic spell break?",
      "options": [
        {
          "color": "red",
          "label": "10 PM"
        },
        {
          "color": "blue",
          "label": "Midnight"
        },
        {
          "color": "green",
          "label": "11 PM"
        },
        {
          "color": "yellow",
          "label": "Dawn"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Midnight",
      "colorTrap": false
    },
    {
      "id": "Q28",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "Who painted the Mona Lisa?",
      "options": [
        {
          "color": "red",
          "label": "Michelangelo"
        },
        {
          "color": "blue",
          "label": "Leonardo da Vinci"
        },
        {
          "color": "green",
          "label": "Raphael"
        },
        {
          "color": "yellow",
          "label": "Donatello"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Leonardo da Vinci",
      "colorTrap": false
    },
    {
      "id": "Q29",
      "category": "BRAIN TEASER",
      "prompt": "What has many keys but can't open a single lock?",
      "options": [
        {
          "color": "red",
          "label": "A keychain"
        },
        {
          "color": "blue",
          "label": "A piano"
        },
        {
          "color": "green",
          "label": "A map"
        },
        {
          "color": "yellow",
          "label": "A safe"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A piano",
      "colorTrap": false
    },
    {
      "id": "Q30",
      "category": "FOOD & CUISINE",
      "prompt": "**[COLOR TRAP]** What color is traditional Puerto Rican sofrito, the base used in many dishes?",
      "options": [
        {
          "color": "red",
          "label": "Red"
        },
        {
          "color": "blue",
          "label": "Orange"
        },
        {
          "color": "green",
          "label": "Yellow"
        },
        {
          "color": "yellow",
          "label": "Green"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Green",
      "colorTrap": true
    },
    {
      "id": "Q31",
      "category": "CULTURE",
      "prompt": "What is the name for a traditional Filipino nipa hut, often built on stilts?",
      "options": [
        {
          "color": "red",
          "label": "Bahay na bato"
        },
        {
          "color": "blue",
          "label": "Bahay kubo"
        },
        {
          "color": "green",
          "label": "Sari-sari"
        },
        {
          "color": "yellow",
          "label": "Balangay"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Bahay kubo",
      "colorTrap": false
    },
    {
      "id": "Q32",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the only continent with no native reptiles or snakes?",
      "options": [
        {
          "color": "red",
          "label": "Australia"
        },
        {
          "color": "blue",
          "label": "Antarctica"
        },
        {
          "color": "green",
          "label": "Europe"
        },
        {
          "color": "yellow",
          "label": "Asia"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Antarctica",
      "colorTrap": false
    },
    {
      "id": "Q33",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of Belle's father in \"Beauty and the Beast\"?",
      "options": [
        {
          "color": "red",
          "label": "Maurice"
        },
        {
          "color": "blue",
          "label": "Gaston"
        },
        {
          "color": "green",
          "label": "Lumiere"
        },
        {
          "color": "yellow",
          "label": "Phillipe"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Maurice",
      "colorTrap": false
    },
    {
      "id": "Q34",
      "category": "TEAM PERSONALIZED",
      "prompt": "Besides the US territory of Puerto Rico, what other country does this team's footprint span, along with the mainland US?",
      "options": [
        {
          "color": "red",
          "label": "Mexico"
        },
        {
          "color": "blue",
          "label": "Philippines"
        },
        {
          "color": "green",
          "label": "Canada"
        },
        {
          "color": "yellow",
          "label": "Dominican Republic"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Philippines",
      "colorTrap": false
    },
    {
      "id": "Q35",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the tallest building in the world as of recent record?",
      "options": [
        {
          "color": "red",
          "label": "Shanghai Tower"
        },
        {
          "color": "blue",
          "label": "Burj Khalifa"
        },
        {
          "color": "green",
          "label": "One World Trade Center"
        },
        {
          "color": "yellow",
          "label": "Petronas Towers"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Burj Khalifa",
      "colorTrap": false
    },
    {
      "id": "Q36",
      "category": "POP CULTURE",
      "prompt": "Which classic board game involves buying and trading properties like Boardwalk and Park Place?",
      "options": [
        {
          "color": "red",
          "label": "Clue"
        },
        {
          "color": "blue",
          "label": "Monopoly"
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
      "correctLabel": "Monopoly",
      "colorTrap": false
    },
    {
      "id": "Q37",
      "category": "GEOGRAPHY",
      "prompt": "What is the largest country in South America?",
      "options": [
        {
          "color": "red",
          "label": "Argentina"
        },
        {
          "color": "blue",
          "label": "Brazil"
        },
        {
          "color": "green",
          "label": "Peru"
        },
        {
          "color": "yellow",
          "label": "Colombia"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Brazil",
      "colorTrap": false
    },
    {
      "id": "Q38",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of the genie in \"Aladdin\"?",
      "options": [
        {
          "color": "red",
          "label": "Jafar"
        },
        {
          "color": "blue",
          "label": "Genie"
        },
        {
          "color": "green",
          "label": "Sultan"
        },
        {
          "color": "yellow",
          "label": "Iago"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Genie",
      "colorTrap": false
    },
    {
      "id": "Q39",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the process by which plants lose water through their leaves called?",
      "options": [
        {
          "color": "red",
          "label": "Respiration"
        },
        {
          "color": "blue",
          "label": "Transpiration"
        },
        {
          "color": "green",
          "label": "Photosynthesis"
        },
        {
          "color": "yellow",
          "label": "Germination"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Transpiration",
      "colorTrap": false
    }
  ],
  "Lyka": [
    {
      "id": "Q40",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of Simba's best friend, a warthog, in \"The Lion King\"?",
      "options": [
        {
          "color": "red",
          "label": "Timon"
        },
        {
          "color": "blue",
          "label": "Pumbaa"
        },
        {
          "color": "green",
          "label": "Zazu"
        },
        {
          "color": "yellow",
          "label": "Rafiki"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Pumbaa",
      "colorTrap": false
    },
    {
      "id": "Q41",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "How many sides does a hexagon have?",
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
          "label": "7"
        },
        {
          "color": "yellow",
          "label": "8"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "6",
      "colorTrap": false
    },
    {
      "id": "Q42",
      "category": "POP CULTURE",
      "prompt": "Which artist is known as the \"King of Pop\"?",
      "options": [
        {
          "color": "red",
          "label": "Elvis Presley"
        },
        {
          "color": "blue",
          "label": "Prince"
        },
        {
          "color": "green",
          "label": "Michael Jackson"
        },
        {
          "color": "yellow",
          "label": "James Brown"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Michael Jackson",
      "colorTrap": false
    },
    {
      "id": "Q43",
      "category": "GEOGRAPHY",
      "prompt": "**[COLOR TRAP]** What color is the sand on many of Florida's Gulf Coast beaches, famously fine and powdery?",
      "options": [
        {
          "color": "red",
          "label": "Tan"
        },
        {
          "color": "blue",
          "label": "Beige"
        },
        {
          "color": "green",
          "label": "Gold"
        },
        {
          "color": "yellow",
          "label": "White"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "White",
      "colorTrap": true
    },
    {
      "id": "Q44",
      "category": "FOOD & CUISINE",
      "prompt": "What fruit is the main ingredient in a traditional Filipino buko pie?",
      "options": [
        {
          "color": "red",
          "label": "Mango"
        },
        {
          "color": "blue",
          "label": "Young coconut"
        },
        {
          "color": "green",
          "label": "Pineapple"
        },
        {
          "color": "yellow",
          "label": "Banana"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Young coconut",
      "colorTrap": false
    },
    {
      "id": "Q45",
      "category": "BRAIN TEASER",
      "prompt": "What word begins with an \"e,\" ends with an \"e,\" but contains only one letter?",
      "options": [
        {
          "color": "red",
          "label": "Envelope"
        },
        {
          "color": "blue",
          "label": "Eye"
        },
        {
          "color": "green",
          "label": "Elephant"
        },
        {
          "color": "yellow",
          "label": "Eagle"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Eye",
      "colorTrap": false
    },
    {
      "id": "Q46",
      "category": "DISNEY CHARACTERS",
      "prompt": "In \"Frozen,\" what is the name of the living snowman?",
      "options": [
        {
          "color": "red",
          "label": "Sven"
        },
        {
          "color": "blue",
          "label": "Olaf"
        },
        {
          "color": "green",
          "label": "Kristoff"
        },
        {
          "color": "yellow",
          "label": "Marshmallow"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Olaf",
      "colorTrap": false
    },
    {
      "id": "Q47",
      "category": "CULTURE",
      "prompt": "What is the name of the Puerto Rican tradition of neighbors singing door to door during the Christmas season?",
      "options": [
        {
          "color": "red",
          "label": "Parranda"
        },
        {
          "color": "blue",
          "label": "Aguinaldo"
        },
        {
          "color": "green",
          "label": "Posada"
        },
        {
          "color": "yellow",
          "label": "Villancico"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Parranda",
      "colorTrap": false
    },
    {
      "id": "Q48",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the only bird that can fly backwards?",
      "options": [
        {
          "color": "red",
          "label": "Sparrow"
        },
        {
          "color": "blue",
          "label": "Hummingbird"
        },
        {
          "color": "green",
          "label": "Swallow"
        },
        {
          "color": "yellow",
          "label": "Falcon"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Hummingbird",
      "colorTrap": false
    },
    {
      "id": "Q49",
      "category": "TEAM PERSONALIZED",
      "prompt": "What system does Susie complain about most when trying to pull a simple paystub?",
      "options": [
        {
          "color": "red",
          "label": "QuickBooks"
        },
        {
          "color": "blue",
          "label": "ADP"
        },
        {
          "color": "green",
          "label": "Notion"
        },
        {
          "color": "yellow",
          "label": "Excel"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "ADP",
      "colorTrap": false
    },
    {
      "id": "Q50",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the capital city of Canada?",
      "options": [
        {
          "color": "red",
          "label": "Toronto"
        },
        {
          "color": "blue",
          "label": "Vancouver"
        },
        {
          "color": "green",
          "label": "Ottawa"
        },
        {
          "color": "yellow",
          "label": "Montreal"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Ottawa",
      "colorTrap": false
    },
    {
      "id": "Q51",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of the sea witch in \"The Little Mermaid\"?",
      "options": [
        {
          "color": "red",
          "label": "Morgana"
        },
        {
          "color": "blue",
          "label": "Ursula"
        },
        {
          "color": "green",
          "label": "Vanessa"
        },
        {
          "color": "yellow",
          "label": "Marina"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Ursula",
      "colorTrap": false
    },
    {
      "id": "Q52",
      "category": "POP CULTURE",
      "prompt": "What was the first social media platform to reach 1 billion users?",
      "options": [
        {
          "color": "red",
          "label": "Twitter"
        },
        {
          "color": "blue",
          "label": "Instagram"
        },
        {
          "color": "green",
          "label": "Facebook"
        },
        {
          "color": "yellow",
          "label": "YouTube"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Facebook",
      "colorTrap": false
    }
  ],
  "Jenny": [
    {
      "id": "Q53",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of Pinocchio's conscience, depicted as a cricket?",
      "options": [
        {
          "color": "red",
          "label": "Figaro"
        },
        {
          "color": "blue",
          "label": "Jiminy Cricket"
        },
        {
          "color": "green",
          "label": "Geppetto"
        },
        {
          "color": "yellow",
          "label": "Honest John"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Jiminy Cricket",
      "colorTrap": false
    },
    {
      "id": "Q54",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the freezing point of water in Celsius?",
      "options": [
        {
          "color": "red",
          "label": "32"
        },
        {
          "color": "blue",
          "label": "0"
        },
        {
          "color": "green",
          "label": "100"
        },
        {
          "color": "yellow",
          "label": "-1"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "0",
      "colorTrap": false
    },
    {
      "id": "Q55",
      "category": "GEOGRAPHY",
      "prompt": "What is the largest desert in the world, counting polar deserts?",
      "options": [
        {
          "color": "red",
          "label": "Sahara"
        },
        {
          "color": "blue",
          "label": "Gobi"
        },
        {
          "color": "green",
          "label": "Antarctic Desert"
        },
        {
          "color": "yellow",
          "label": "Arabian Desert"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Antarctic Desert",
      "colorTrap": false
    },
    {
      "id": "Q56",
      "category": "FOOD & CUISINE",
      "prompt": "**[COLOR TRAP]** What color is a plantain's skin when it is ripe enough for sweet maduros?",
      "options": [
        {
          "color": "red",
          "label": "Green"
        },
        {
          "color": "blue",
          "label": "Yellow"
        },
        {
          "color": "green",
          "label": "Brown"
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
      "id": "Q57",
      "category": "BRAIN TEASER",
      "prompt": "What can fill a room but takes up no space?",
      "options": [
        {
          "color": "red",
          "label": "Smoke"
        },
        {
          "color": "blue",
          "label": "Light"
        },
        {
          "color": "green",
          "label": "Sound"
        },
        {
          "color": "yellow",
          "label": "Air"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Light",
      "colorTrap": false
    },
    {
      "id": "Q58",
      "category": "DISNEY CHARACTERS",
      "prompt": "In \"Mulan,\" what is the name of Mulan's small dragon companion?",
      "options": [
        {
          "color": "red",
          "label": "Mushu"
        },
        {
          "color": "blue",
          "label": "Cri-Kee"
        },
        {
          "color": "green",
          "label": "Khan"
        },
        {
          "color": "yellow",
          "label": "Shan Yu"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Mushu",
      "colorTrap": false
    },
    {
      "id": "Q59",
      "category": "CULTURE",
      "prompt": "What is the term for the traditional Filipino practice of neighbors helping move an entire house together?",
      "options": [
        {
          "color": "red",
          "label": "Bayanihan"
        },
        {
          "color": "blue",
          "label": "Kapwa"
        },
        {
          "color": "green",
          "label": "Damayan"
        },
        {
          "color": "yellow",
          "label": "Pakikisama"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Bayanihan",
      "colorTrap": false
    },
    {
      "id": "Q60",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "Which country has the most natural lakes in the world?",
      "options": [
        {
          "color": "red",
          "label": "United States"
        },
        {
          "color": "blue",
          "label": "Russia"
        },
        {
          "color": "green",
          "label": "Canada"
        },
        {
          "color": "yellow",
          "label": "Finland"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Canada",
      "colorTrap": false
    },
    {
      "id": "Q61",
      "category": "TEAM PERSONALIZED",
      "prompt": "What is the name of Susie's Shorkie Poo, whose breed stumped the team on game night?",
      "options": [
        {
          "color": "red",
          "label": "Morticia"
        },
        {
          "color": "blue",
          "label": "Roo"
        },
        {
          "color": "green",
          "label": "Rex"
        },
        {
          "color": "yellow",
          "label": "Bear"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Roo",
      "colorTrap": false
    },
    {
      "id": "Q62",
      "category": "POP CULTURE",
      "prompt": "Which classic handheld game system, released in 1989, introduced the world to Tetris on the go?",
      "options": [
        {
          "color": "red",
          "label": "Sega Game Gear"
        },
        {
          "color": "blue",
          "label": "Game Boy"
        },
        {
          "color": "green",
          "label": "Atari Lynx"
        },
        {
          "color": "yellow",
          "label": "TurboExpress"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Game Boy",
      "colorTrap": false
    },
    {
      "id": "Q63",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of the evil stepmother in \"Cinderella\"?",
      "options": [
        {
          "color": "red",
          "label": "Lady Tremaine"
        },
        {
          "color": "blue",
          "label": "Madame Medusa"
        },
        {
          "color": "green",
          "label": "Yzma"
        },
        {
          "color": "yellow",
          "label": "Mother Gothel"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Lady Tremaine",
      "colorTrap": false
    },
    {
      "id": "Q64",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the hardest working muscle in the human body, beating roughly 100,000 times a day?",
      "options": [
        {
          "color": "red",
          "label": "Diaphragm"
        },
        {
          "color": "blue",
          "label": "Heart"
        },
        {
          "color": "green",
          "label": "Jaw muscle"
        },
        {
          "color": "yellow",
          "label": "Bicep"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Heart",
      "colorTrap": false
    },
    {
      "id": "Q65",
      "category": "GEOGRAPHY",
      "prompt": "What is the name of the mountain range running through much of Puerto Rico's interior?",
      "options": [
        {
          "color": "red",
          "label": "Cordillera Central"
        },
        {
          "color": "blue",
          "label": "Sierra Maestra"
        },
        {
          "color": "green",
          "label": "Sierra Madre"
        },
        {
          "color": "yellow",
          "label": "Cordillera Oriental"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Cordillera Central",
      "colorTrap": false
    }
  ]
};

export const RESERVE_QUESTIONS: Record<PlayerName, GameQuestion[]> = {
  "Stephanny": [
    {
      "id": "R66",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the largest internal organ in the human body?",
      "options": [
        {
          "color": "red",
          "label": "Skin"
        },
        {
          "color": "blue",
          "label": "Liver"
        },
        {
          "color": "green",
          "label": "Lungs"
        },
        {
          "color": "yellow",
          "label": "Brain"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Liver",
      "colorTrap": false
    },
    {
      "id": "R67",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of Rapunzel's chameleon companion in \"Tangled\"?",
      "options": [
        {
          "color": "red",
          "label": "Flounder"
        },
        {
          "color": "blue",
          "label": "Pascal"
        },
        {
          "color": "green",
          "label": "Mushu"
        },
        {
          "color": "yellow",
          "label": "Iago"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Pascal",
      "colorTrap": false
    },
    {
      "id": "R68",
      "category": "POP CULTURE",
      "prompt": "What was the first video game to sell over 100 million copies?",
      "options": [
        {
          "color": "red",
          "label": "Minecraft"
        },
        {
          "color": "blue",
          "label": "Tetris"
        },
        {
          "color": "green",
          "label": "Grand Theft Auto V"
        },
        {
          "color": "yellow",
          "label": "Wii Sports"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Tetris",
      "colorTrap": false
    },
    {
      "id": "R69",
      "category": "GEOGRAPHY",
      "prompt": "What is the smallest continent by land area?",
      "options": [
        {
          "color": "red",
          "label": "Europe"
        },
        {
          "color": "blue",
          "label": "Antarctica"
        },
        {
          "color": "green",
          "label": "Australia"
        },
        {
          "color": "yellow",
          "label": "South America"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Australia",
      "colorTrap": false
    },
    {
      "id": "R70",
      "category": "BRAIN TEASER",
      "prompt": "What is full of holes but still holds water?",
      "options": [
        {
          "color": "red",
          "label": "A net"
        },
        {
          "color": "blue",
          "label": "A sponge"
        },
        {
          "color": "green",
          "label": "A bucket"
        },
        {
          "color": "yellow",
          "label": "A sieve"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A sponge",
      "colorTrap": false
    },
    {
      "id": "R91",
      "category": "COLOR TRAP",
      "prompt": "What color are Mickey Mouse's classic shorts?",
      "options": [
        {
          "color": "red",
          "label": "Black"
        },
        {
          "color": "blue",
          "label": "Yellow"
        },
        {
          "color": "green",
          "label": "Red"
        },
        {
          "color": "yellow",
          "label": "Blue"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Red",
      "colorTrap": true
    }
  ],
  "Giann": [
    {
      "id": "R71",
      "category": "FOOD & CUISINE",
      "prompt": "What Filipino street food consists of marinated, grilled meat on a skewer?",
      "options": [
        {
          "color": "red",
          "label": "Lumpia"
        },
        {
          "color": "blue",
          "label": "Isaw"
        },
        {
          "color": "green",
          "label": "Inasal"
        },
        {
          "color": "yellow",
          "label": "Barbecue stick"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Barbecue stick",
      "colorTrap": false
    },
    {
      "id": "R72",
      "category": "SCIENCE & NATURE",
      "prompt": "What is the name for an animal that eats both plants and meat?",
      "options": [
        {
          "color": "red",
          "label": "Herbivore"
        },
        {
          "color": "blue",
          "label": "Carnivore"
        },
        {
          "color": "green",
          "label": "Omnivore"
        },
        {
          "color": "yellow",
          "label": "Insectivore"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Omnivore",
      "colorTrap": false
    },
    {
      "id": "R73",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of the magic carpet in \"Aladdin\"?",
      "options": [
        {
          "color": "red",
          "label": "Rajah"
        },
        {
          "color": "blue",
          "label": "Carpet"
        },
        {
          "color": "green",
          "label": "Abu"
        },
        {
          "color": "yellow",
          "label": "It has no name, just \"Magic Carpet\""
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "It has no name, just \"Magic Carpet\"",
      "colorTrap": false
    },
    {
      "id": "R74",
      "category": "CULTURE",
      "prompt": "The Puerto Rican coqui, famous for its nighttime call, is what kind of creature?",
      "options": [
        {
          "color": "red",
          "label": "A bird"
        },
        {
          "color": "blue",
          "label": "A frog"
        },
        {
          "color": "green",
          "label": "A lizard"
        },
        {
          "color": "yellow",
          "label": "A cricket"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A frog",
      "colorTrap": false
    },
    {
      "id": "R75",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the most commonly spoken language in the world, counting first and second language speakers combined?",
      "options": [
        {
          "color": "red",
          "label": "Mandarin"
        },
        {
          "color": "blue",
          "label": "English"
        },
        {
          "color": "green",
          "label": "Spanish"
        },
        {
          "color": "yellow",
          "label": "Hindi"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "English",
      "colorTrap": false
    },
    {
      "id": "R92",
      "category": "COLOR TRAP",
      "prompt": "What color is Elsa's iconic gown in \"Frozen,\" best described?",
      "options": [
        {
          "color": "red",
          "label": "Ice blue"
        },
        {
          "color": "blue",
          "label": "Purple"
        },
        {
          "color": "green",
          "label": "White"
        },
        {
          "color": "yellow",
          "label": "Silver"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Ice blue",
      "colorTrap": true
    }
  ],
  "Francisco": [
    {
      "id": "R76",
      "category": "POP CULTURE",
      "prompt": "What was the first feature film to win the Academy Award for Best Picture?",
      "options": [
        {
          "color": "red",
          "label": "Gone with the Wind"
        },
        {
          "color": "blue",
          "label": "Wings"
        },
        {
          "color": "green",
          "label": "Casablanca"
        },
        {
          "color": "yellow",
          "label": "It Happened One Night"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Wings",
      "colorTrap": false
    },
    {
      "id": "R77",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of the clownfish searching for his son in \"Finding Nemo\"?",
      "options": [
        {
          "color": "red",
          "label": "Dory"
        },
        {
          "color": "blue",
          "label": "Marlin"
        },
        {
          "color": "green",
          "label": "Gill"
        },
        {
          "color": "yellow",
          "label": "Crush"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Marlin",
      "colorTrap": false
    },
    {
      "id": "R78",
      "category": "GEOGRAPHY",
      "prompt": "What is the predominantly Muslim region of the Philippines, located in Mindanao?",
      "options": [
        {
          "color": "red",
          "label": "Visayas"
        },
        {
          "color": "blue",
          "label": "Bicol"
        },
        {
          "color": "green",
          "label": "Bangsamoro"
        },
        {
          "color": "yellow",
          "label": "Cordillera"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Bangsamoro",
      "colorTrap": false
    },
    {
      "id": "R79",
      "category": "BRAIN TEASER",
      "prompt": "What has keys but no locks, space but no room, and you can enter but never go inside?",
      "options": [
        {
          "color": "red",
          "label": "A house"
        },
        {
          "color": "blue",
          "label": "A keyboard"
        },
        {
          "color": "green",
          "label": "A piano"
        },
        {
          "color": "yellow",
          "label": "A safe"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "A keyboard",
      "colorTrap": false
    },
    {
      "id": "R80",
      "category": "FOOD & CUISINE",
      "prompt": "What classic Florida dessert is made with graham cracker crust, condensed milk, and key lime juice?",
      "options": [
        {
          "color": "red",
          "label": "Key lime pie"
        },
        {
          "color": "blue",
          "label": "Conch fritters"
        },
        {
          "color": "green",
          "label": "Flan"
        },
        {
          "color": "yellow",
          "label": "Cuban pastelito"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Key lime pie",
      "colorTrap": false
    },
    {
      "id": "R93",
      "category": "COLOR TRAP",
      "prompt": "What color is Shrek's skin?",
      "options": [
        {
          "color": "red",
          "label": "Purple"
        },
        {
          "color": "blue",
          "label": "Green"
        },
        {
          "color": "green",
          "label": "Yellow"
        },
        {
          "color": "yellow",
          "label": "Blue"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Green",
      "colorTrap": true
    }
  ],
  "Lyka": [
    {
      "id": "R81",
      "category": "SCIENCE & NATURE",
      "prompt": "What force keeps planets in orbit around the sun?",
      "options": [
        {
          "color": "red",
          "label": "Magnetism"
        },
        {
          "color": "blue",
          "label": "Gravity"
        },
        {
          "color": "green",
          "label": "Friction"
        },
        {
          "color": "yellow",
          "label": "Momentum"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Gravity",
      "colorTrap": false
    },
    {
      "id": "R82",
      "category": "DISNEY CHARACTERS",
      "prompt": "What is the name of Woody's rival turned friend space ranger toy in \"Toy Story\"?",
      "options": [
        {
          "color": "red",
          "label": "Rex"
        },
        {
          "color": "blue",
          "label": "Buzz Lightyear"
        },
        {
          "color": "green",
          "label": "Mr. Potato Head"
        },
        {
          "color": "yellow",
          "label": "Hamm"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Buzz Lightyear",
      "colorTrap": false
    },
    {
      "id": "R83",
      "category": "TEAM PERSONALIZED",
      "prompt": "What game show format did Susie's accounting team famously bomb every single question in, on trivia night?",
      "options": [
        {
          "color": "red",
          "label": "Family Feud style"
        },
        {
          "color": "blue",
          "label": "Wheel of Fortune style"
        },
        {
          "color": "green",
          "label": "Jeopardy style"
        },
        {
          "color": "yellow",
          "label": "Trivial Pursuit style"
        }
      ],
      "correctColor": "green",
      "correctLabel": "Jeopardy style",
      "colorTrap": false
    },
    {
      "id": "R84",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the term for a word that reads the same forwards and backwards?",
      "options": [
        {
          "color": "red",
          "label": "Anagram"
        },
        {
          "color": "blue",
          "label": "Palindrome"
        },
        {
          "color": "green",
          "label": "Acronym"
        },
        {
          "color": "yellow",
          "label": "Homophone"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Palindrome",
      "colorTrap": false
    },
    {
      "id": "R85",
      "category": "POP CULTURE",
      "prompt": "What was the first Disney animated feature film ever released, in 1937?",
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
      "id": "R94",
      "category": "COLOR TRAP",
      "prompt": "The ruby slippers in \"The Wizard of Oz\" are best described as what color?",
      "options": [
        {
          "color": "red",
          "label": "Pink"
        },
        {
          "color": "blue",
          "label": "Silver"
        },
        {
          "color": "green",
          "label": "Gold"
        },
        {
          "color": "yellow",
          "label": "Ruby red"
        }
      ],
      "correctColor": "yellow",
      "correctLabel": "Ruby red",
      "colorTrap": true
    }
  ],
  "Jenny": [
    {
      "id": "R86",
      "category": "DISNEY CHARACTERS",
      "prompt": "Who is Ariel's human love interest in \"The Little Mermaid\"?",
      "options": [
        {
          "color": "red",
          "label": "Prince Charming"
        },
        {
          "color": "blue",
          "label": "Prince Eric"
        },
        {
          "color": "green",
          "label": "Prince Philip"
        },
        {
          "color": "yellow",
          "label": "Prince Adam"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "Prince Eric",
      "colorTrap": false
    },
    {
      "id": "R87",
      "category": "GENERAL KNOWLEDGE",
      "prompt": "What is the capital of Puerto Rico?",
      "options": [
        {
          "color": "red",
          "label": "Ponce"
        },
        {
          "color": "blue",
          "label": "San Juan"
        },
        {
          "color": "green",
          "label": "Bayamón"
        },
        {
          "color": "yellow",
          "label": "Caguas"
        }
      ],
      "correctColor": "blue",
      "correctLabel": "San Juan",
      "colorTrap": false
    },
    {
      "id": "R88",
      "category": "POP CULTURE",
      "prompt": "What was the first fully computer animated film to earn a Best Picture Oscar nomination?",
      "options": [
        {
          "color": "red",
          "label": "Up"
        },
        {
          "color": "blue",
          "label": "Toy Story 3"
        },
        {
          "color": "green",
          "label": "Shrek"
        },
        {
          "color": "yellow",
          "label": "Wall-E"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Up",
      "colorTrap": false
    },
    {
      "id": "R89",
      "category": "SCIENCE & NATURE",
      "prompt": "Roughly how many taste buds does the average human tongue have?",
      "options": [
        {
          "color": "red",
          "label": "200"
        },
        {
          "color": "blue",
          "label": "2,000"
        },
        {
          "color": "green",
          "label": "10,000"
        },
        {
          "color": "yellow",
          "label": "50,000"
        }
      ],
      "correctColor": "green",
      "correctLabel": "10,000",
      "colorTrap": false
    },
    {
      "id": "R90",
      "category": "CULTURE",
      "prompt": "What is the term for the Puerto Rican diaspora community based mainly in the northeastern United States, especially New York?",
      "options": [
        {
          "color": "red",
          "label": "Nuyorican"
        },
        {
          "color": "blue",
          "label": "Boricua"
        },
        {
          "color": "green",
          "label": "Taino"
        },
        {
          "color": "yellow",
          "label": "Jíbaro"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Nuyorican",
      "colorTrap": false
    },
    {
      "id": "R95",
      "category": "COLOR TRAP",
      "prompt": "What color is the Genie in \"Aladdin\" most commonly depicted as?",
      "options": [
        {
          "color": "red",
          "label": "Blue"
        },
        {
          "color": "blue",
          "label": "Green"
        },
        {
          "color": "green",
          "label": "Gold"
        },
        {
          "color": "yellow",
          "label": "Red"
        }
      ],
      "correctColor": "red",
      "correctLabel": "Blue",
      "colorTrap": true
    }
  ]
};

export const TIEBREAKER_QUESTIONS: GameQuestion[] = [
  {
    "id": "TB1",
    "category": "Tiebreaker",
    "prompt": "What is the national flower of the Philippines?",
    "options": [
      {
        "color": "red",
        "label": "Rose"
      },
      {
        "color": "blue",
        "label": "Sampaguita"
      },
      {
        "color": "green",
        "label": "Orchid"
      },
      {
        "color": "yellow",
        "label": "Lotus"
      }
    ],
    "correctColor": "blue",
    "correctLabel": "Sampaguita",
    "colorTrap": false
  },
  {
    "id": "TB2",
    "category": "Tiebreaker",
    "prompt": "What year did Walt Disney World open in Florida?",
    "options": [
      {
        "color": "red",
        "label": "1965"
      },
      {
        "color": "blue",
        "label": "1971"
      },
      {
        "color": "green",
        "label": "1975"
      },
      {
        "color": "yellow",
        "label": "1980"
      }
    ],
    "correctColor": "blue",
    "correctLabel": "1971",
    "colorTrap": false
  },
  {
    "id": "TB3",
    "category": "Tiebreaker",
    "prompt": "How many degrees are in a circle?",
    "options": [
      {
        "color": "red",
        "label": "180"
      },
      {
        "color": "blue",
        "label": "270"
      },
      {
        "color": "green",
        "label": "360"
      },
      {
        "color": "yellow",
        "label": "90"
      }
    ],
    "correctColor": "green",
    "correctLabel": "360",
    "colorTrap": false
  },
  {
    "id": "TB4",
    "category": "Tiebreaker",
    "prompt": "What is the speed of light, approximately, in miles per second?",
    "options": [
      {
        "color": "red",
        "label": "186,000"
      },
      {
        "color": "blue",
        "label": "86,000"
      },
      {
        "color": "green",
        "label": "286,000"
      },
      {
        "color": "yellow",
        "label": "18,600"
      }
    ],
    "correctColor": "red",
    "correctLabel": "186,000",
    "colorTrap": false
  },
  {
    "id": "TB5",
    "category": "Tiebreaker",
    "prompt": "How many squares are on a standard chessboard?",
    "options": [
      {
        "color": "red",
        "label": "32"
      },
      {
        "color": "blue",
        "label": "48"
      },
      {
        "color": "green",
        "label": "64"
      },
      {
        "color": "yellow",
        "label": "100"
      }
    ],
    "correctColor": "green",
    "correctLabel": "64",
    "colorTrap": false
  }
];

export const PRIZES: Record<number, number> = { 1: 50, 2: 35, 3: 30, 4: 20, 5: 15 };

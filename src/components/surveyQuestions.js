// Helper to convert Poste display name to the base filename key (for street JSONs)
export const posteNameToFilenameKey = (posteDisplayName) => {
  console.log(`[posteNameToFilenameKey] Received: '${posteDisplayName}'`); // Diagnostic log
  const nameMap = {
    "P1 Guichen – Bourg des Comptes": "Guichen",
    "P2 Ker Lann": "Bruz", 
    "P3 Pontchaillou": "Rennes",
    "P4 Montreuil-sur-Ille": "Montreuil-sur-Ille",
    "P5 Betton": "Betton",
    "P6 Saint-Germain-sur-Ille": "Saint-Germain-sur-Ille",
    "P7 Chevaigné": "Chevaigné",
    "P8 Saint-Médard-sur-Ille": "Saint-Medard-sur-Ille",
    "P9 Châteaubourg": "Châteaubourg",
    "P10 Noyal-Acigné": "Noyal-sur-Vilaine", 
    "P11 Servon-sur-Vilaine": "Servon-sur-Vilaine",
    "P12 Cesson-Sévigné": "Cesson_Sévigne",
    "P13 Montfort-sur-Meu": "Montfort-sur-Meu",
    "P14 Breteil": "Breteil",
    "P15 L'Hermitage-Mordelles": "Hermitage", 
    "P16 Janzé": "Janze",
    "P17 La Poterie": "Rennes",
  };
  const mappedValue = nameMap[posteDisplayName];
  console.log(`[posteNameToFilenameKey] Mapped value: '${mappedValue}'`); // Diagnostic log
  
  if (mappedValue) {
    console.log(`[posteNameToFilenameKey] Returning mapped value: '${mappedValue}'`);
    return mappedValue;
  } else {
    const fallbackValue = posteDisplayName.replace(/'/g, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    console.log(`[posteNameToFilenameKey] Map lookup failed. Returning fallback: '${fallbackValue}'`);
    return fallbackValue;
  }
};

// Define parking options for each city, using NEW DISPLAY NAMES as keys
const parkingOptionsByCity = {
  "P15 L'Hermitage-Mordelles": [ 
    { "id": 1, "text": "Sur le parking de la gare (50 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking rue du Lavoir au Nord (100-150 pl)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une autre place en voirie ou parking au Nord", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une autre place en voirie ou parking au Sud", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P8 Saint-Médard-sur-Ille": [ 
    { "id": 1, "text": "Sur le parking de la gare aménagé à l'Est (50 places)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking de la gare non-aménagé à l'Ouest (10 places)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur un autre parking : préciser", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P6 Saint-Germain-sur-Ille": [ 
    { "id": 1, "text": "Sur le parking de la gare (45 places)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur un autre parking : préciser", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P17 La Poterie": [
    { "id": 1, "text": "Sur le parking (1)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking (2)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur le parking (3)", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un autre parking d'entreprise à proximité", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P3 Pontchaillou": [
    { "id": 1, "text": "Sur le parking 4 du CHU au Nord-Ouest de la gare", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur un autre parking à l'ouest de la gare (côté CHU)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur un parking de résidence à l'est de la gare", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P10 Noyal-Acigné": [ 
    { "id": 1, "text": "Sur le parking Est de la gare (62 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking Ouest de la gare (46 pl)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une place le long de la rue de la gare", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une place rue de la Planche Grégoire", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur une place en voirie ou un autre parking au Nord", "next": "Q3a_prime" },
    { "id": 6, "text": "Sur une place en voirie ou un autre parking au Sud", "next": "Q3a_prime" },
    { "id": 7, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P4 Montreuil-sur-Ille": [ 
    { "id": 1, "text": "Sur le parking de la gare (140 places)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur une place en voirie ou un autre parking à l'est de la gare", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une place en voirie ou un autre parking à l'ouest de la gare", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P13 Montfort-sur-Meu": [ 
    { "id": 1, "text": "Sur le parking au nord de la gare (130 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur la rue des Tardivières au Nord", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur un des 3 parkings de la gare côté Sud (150 pl)", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur la rue ou la place de la gare au Sud (70 pl)", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur une autre place en voirie ou parking au Nord", "next": "Q3a_prime" },
    { "id": 6, "text": "Sur une autre place en voirie ou parking au Sud", "next": "Q3a_prime" },
    { "id": 7, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P16 Janzé": [ 
    { "id": 1, "text": "Sur le parvis de la gare (20 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking de la gare (52 pl)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une autre place en voirie ou parking au Nord", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une autre place en voirie ou parking au Sud", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P1 Guichen – Bourg des Comptes": [ 
    { "id": 1, "text": "Sur le parking de la gare (320 places)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur une place dans une rue à proximité de la gare", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P9 Châteaubourg": [ 
    { "id": 1, "text": "Sur le parvis ou la rue de la Gare au nord (30 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking de la médiathèque au nord-ouest de la gare (132 pl)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur le parking au sud de la gare (217 pl)", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une place en voirie ou un autre parking au Nord", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur une place en voirie ou un autre parking au Sud", "next": "Q3a_prime" },
    { "id": 6, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P7 Chevaigné": [ 
    { "id": 1, "text": "Sur le parking Nord de la gare (côté commerces)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking Sud de la gare", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur le parking du cimetière à 5 minutes à pied au Nord", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une place en voirie ou un autre parking au Nord", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur une place en voirie ou un autre parking au Sud", "next": "Q3a_prime" },
    { "id": 6, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P12 Cesson-Sévigné": [ 
    { "id": 1, "text": "Sur le parking au sud de la gare (71 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur l'impasse de la gare au Nord", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur l'avenue des Peupliers au Nord", "next": "Q3a_prime" },
    { "id": 4, "text": "Dans un des parkings d'entreprise à proximité de la gare", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur une place en voirie ou parking au Nord", "next": "Q3a_prime" },
    { "id": 6, "text": "Sur une place en voirie ou parking au Sud", "next": "Q3a_prime" },
    { "id": 7, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P2 Ker Lann": [ 
    { "id": 1, "text": "Sur le parking du campus Ker Lann", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking Espacil Habitat", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur un autre parking à proximité", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P14 Breteil": [ 
    { "id": 1, "text": "Sur le parking de la gare (58 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur une autre place en voirie ou parking au Nord", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une autre place en voirie ou parking au Sud", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P5 Betton": [ 
    { "id": 1, "text": "Sur le parking de la gare aménagé côté Ouest", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking de la gare non aménagé côté Est", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une place en voirie ou un autre parking côté Ouest", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une place en voirie ou un autre parking côté Est", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "P11 Servon-sur-Vilaine": [ 
    { "id": 1, "text": "Sur le parking au sud de la gare (100 pl)", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur le parking au nord de la gare (20 pl)", "next": "Q3a_prime" },
    { "id": 3, "text": "Sur une place en voirie ou un autre parking au Nord", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur une place en voirie ou un autre parking au Sud", "next": "Q3a_prime" },
    { "id": 5, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
  ],
  "DefaultParking": [
    { "id": 1, "text": "Sur le parking de la gare", "next": "Q3a_prime" },
    { "id": 2, "text": "Sur un autre parking à proximité", "next": "Q3a_prime" },
    { "id": 3, "text": "En voirie (dans la rue)", "next": "Q3a_prime" },
    { "id": 4, "text": "Sur un stationnement privé", "next": "Q3a_prime" },
    { "id": 5, "text": "Autre", "next": "Q3a_prime" }
  ]
};

// Populate placeholders with default options
// Object.keys(parkingOptionsByCity).forEach(cityKey => {
//   if (cityKey !== "DefaultParking" && parkingOptionsByCity[cityKey].length === 0) {
//     parkingOptionsByCity[cityKey] = JSON.parse(JSON.stringify(parkingOptionsByCity.DefaultParking));
//   }
// });

export const questions = [
  {
    id: "Poste",
    text: "Zone de l'enquête",
    options: [
      { id: 1, text: "P1 Guichen – Bourg des Comptes", next: "Q1" },
      { id: 2, text: "P2 Ker Lann", next: "Q1" },                  
      { id: 3, text: "P3 Pontchaillou", next: "Q1" },              
      { id: 4,  text: "P4 Montreuil-sur-Ille", next: "Q1" },
      { id: 5, text: "P5 Betton", next: "Q1" },
      { id: 6,  text: "P6 Saint-Germain-sur-Ille", next: "Q1" },
      { id: 7, text: "P7 Chevaigné", next: "Q1" },
      { id: 8,  text: "P8 Saint-Médard-sur-Ille", next: "Q1" },
      { id: 9, text: "P9 Châteaubourg", next: "Q1" },
      { id: 10,  text: "P10 Noyal-Acigné", next: "Q1" },             
      { id: 11,  text: "P11 Servon-sur-Vilaine", next: "Q1" },
      { id: 12, text: "P12 Cesson-Sévigné", next: "Q1" },
      { id: 13,  text: "P13 Montfort-sur-Meu", next: "Q1" },
      { id: 14, text: "P14 Breteil", next: "Q1" },
      { id: 15,  text: "P15 L'Hermitage-Mordelles", next: "Q1" }, 
      { id: 16,  text: "P16 Janzé", next: "Q1" },
      { id: 17, text: "P17 La Poterie", next: "Q1" }                
    ].sort((a, b) => {
      // Custom sort for P_X_ names: extract number after P and sort numerically
      const numA = parseInt(a.text.substring(1, a.text.indexOf(' ')));
      const numB = parseInt(b.text.substring(1, b.text.indexOf(' ')));
      return numA - numB;
    })
  },
  {
    "id": "Q1",
    "text": "Êtes-vous venu pour prendre un train ?",
    "options": [
      { "id": 1, "text": "Oui", "next": "Q2" },
      { "id": 2, "text": "Non", "next": "end" }
    ]
  },
  {
    "id": "Q2",
    "text": "Quelle est l'origine de votre déplacement ? D'où êtes-vous parti pour arriver à la gare ?",
    "options": [
      { 
        "id": 1, 
        "text": (answers) => {
          const posteFilenameKey = posteNameToFilenameKey(answers.PosteText);
          return posteFilenameKey || 'Selected Poste';
        },
        "next": "Q2a" 
      },
      { "id": 2, "text": "Autre commune : préciser nom de la commune", "next": "Q2c" }
    ]
  },
  {
    "id": "Q2a",
    "text": (answers) => {
      const posteFilenameKey = posteNameToFilenameKey(answers.PosteText);
      return `De quelle rue de ${posteFilenameKey || 'la commune sélectionnée'} venez-vous ?`;
    },
    "usesStreetSelector": true,
    "freeText": true,
    "next": "Q3"
  },
  {
    "id": "Q2c",
    "text": "Pouvez-vous nous préciser de quel village, lieu-dit ou quartier ?",
    "usesCommuneSelector": true,
    "freeText": true,
    "next": "Q3"
  },
  {
    "id": "Q3",
    "text": "Quel mode de transport avez-vous utilisé pour vous rendre à la gare ?",
    "options": [
      { "id": 1, "text": "A pied", "next": "Q4" },
      { "id": 2, "text": "En voiture – en tant que conducteur", "next": "Q3a" },
      { "id": 3, "text": "En voiture – en tant que passager", "next": "Q4" },
      { "id": 4, "text": "En covoiturage avec un autre usager du train", "next": "Q4" },
      { "id": 5, "text": "En bus/car", "next": "Q3b" },
      { "id": 6, "text": "A vélo", "next": "Q3c" },
      { "id": 7, "text": "En trottinette", "next": "Q3c" },
      { "id": 8, "text": "En Taxi/VTC", "next": "Q4" },
      { "id": 9, "text": "En 2 roues Motorisé (Moto, scooter…)", "next": "Q3a" },
      { "id": 10, "text": "En train - je fais une correspondance", "next": "Q4" },
      { "id": 11, "text": "Autre", "next": "Q3_autre" }
    ]
  },
  {
    "id": "Q3_autre",
    "text": "Précisez",
    "freeText": true,
    "next": "Q4"
  },
  {
    "id": "Q3a",
    "text": "Où avez-vous stationné votre véhicule ?",
    "options": (answers) => {
      const posteDisplayName = answers.PosteText;
      return parkingOptionsByCity[posteDisplayName] || parkingOptionsByCity.DefaultParking;
    }
  },
  {
    "id": "Q3a_prime",
    "text": "Combien de temps allez-vous laisser votre voiture stationnée ?",
    "options": [
      { "id": 1, "text": "Moins de 2 heures", "next": "Q4" },
      { "id": 2, "text": "Une demi-journée (entre 2 et 4 heures)", "next": "Q4" },
      { "id": 3, "text": "Une journée entière (entre 4h et 12h)", "next": "Q4" },
      { "id": 4, "text": "2 à 3 jours", "next": "Q4" },
      { "id": 5, "text": "3 à 6 jours", "next": "Q4" },
      { "id": 6, "text": "1 semaine ou plus", "next": "Q4" }
    ]
  },
  {
    "id": "Q3b",
    "text": "Quelle ligne de bus/car avez-vous emprunté ?",
    "freeText": true,
    "next": "Q4"
  },
  {
    "id": "Q3c",
    "text": "Où avez-vous stationné votre vélo/trottinette ?",
    "options": [
      { "id": 1, "text": "Sur une place en arceau en libre-service", "next": "Q4" },
      { "id": 2, "text": "Dans une consigne sécurisée", "next": "Q4" },
      { "id": 3, "text": "Je le transporte avec moi dans le train", "next": "Q4" },
      { "id": 4, "text": "Autre", "next": "Q3c_autre" }
    ]
  },
  {
    "id": "Q3c_autre",
    "text": "Précisez",
    "freeText": true,
    "next": "Q4"
  },
  {
    "id": "Q4",
    "text": "Possédez-vous un abonnement TER ?",
    "options": [
      { "id": 1, "text": "Oui", "next": "Q5" },
      { "id": 2, "text": "Non", "next": "Q5" }
    ]
  },
  {
    "id": "Q5",
    "text": "Quelle sera votre gare de destination finale ?",
    "options": [
      { "id": 1, "text": "Rennes", "next": "Q6" },
      { "id": 2, "text": "La Brohinière", "next": "Q6" },
      { "id": 3, "text": "Lamballe", "next": "Q6" },
      { "id": 4, "text": "Saint-Brieuc", "next": "Q6" },
      { "id": 5, "text": "Paris Montparnasse", "next": "Q6" },
      { "id": 6, "text": "Rétiers", "next": "Q6" },
      { "id": 7, "text": "Châteaubriant", "next": "Q6" },
      { "id": 8, "text": "La Poterie", "next": "Q6" },
      { "id": 9, "text": "Vitré", "next": "Q6" },
      { "id": 10, "text": "Laval", "next": "Q6" },
      { "id": 11, "text": "Le Mans", "next": "Q6" },
      { "id": 12, "text": "Angers", "next": "Q6" },
      { "id": 13, "text": "Nantes", "next": "Q6" },
      { "id": 14, "text": "Châteaubourg", "next": "Q6" },
      { "id": 15, "text": "Betton", "next": "Q6" },
      { "id": 16, "text": "Montreuil-sur-Ille", "next": "Q6" },
      { "id": 17, "text": "Dol-de-Bretagne", "next": "Q6" },
      { "id": 18, "text": "Saint-Malo", "next": "Q6" },
      { "id": 19, "text": "Messac-Guipry", "next": "Q6" },
      { "id": 20, "text": "Redon", "next": "Q6" },
      { "id": 21, "text": "Vannes", "next": "Q6" },
      { "id": 22, "text": "Autre", "next": "Q5_autre" }
    ]
  },
  {
    "id": "Q5_autre",
    "text": "Précisez",
    "freeText": true,
    "next": "Q6"
  },
  {
    "id": "Q6",
    "text": "Quel est le motif de votre déplacement en train ?",
    "options": [
      { "id": 1, "text": "Je me rends sur mon lieu de travail", "next": "Q7" },
      { "id": 2, "text": "Je me rends sur mon lieu d'études", "next": "Q7" },
      { "id": 3, "text": "Je rentre à mon domicile principal", "next": "Q6a" },
      { "id": 4, "text": "Déplacement professionnel", "next": "Q7" },
      { "id": 5, "text": "Loisirs, tourisme", "next": "Q7" },
      { "id": 6, "text": "Autres", "next": "Q6_autre" }
    ]
  },
  {
    "id": "Q6_autre",
    "text": "Précisez (Achats, démarches administratives, RDV médical…)",
    "freeText": true,
    "next": "Q7"
  },
  {
    "id": "Q6a",
    "text": "Quel était la raison de votre venue dans cette gare ?",
    "options": [
      { "id": 1, "text": "Travail", "next": "Q7" },
      { "id": 2, "text": "Etudes", "next": "Q7" },
      { "id": 3, "text": "Déplacement professionnel", "next": "Q7" },
      { "id": 4, "text": "Loisirs, tourisme", "next": "Q7" },
      { "id": 5, "text": "Autres (Achats, démarches administratives, RDV médical, visite…)", "next": "Q7" }
    ]
  },
  {
    "id": "Q7",
    "text": "A quelle fréquence réalisez-vous ce déplacement en train ?",
    "options": [
      { "id": 1, "text": "Tous les jours de la semaine ou presque (au moins 3 fois par semaine)", "next": "Q8" },
      { "id": 2, "text": "Régulièrement (au moins une fois par mois)", "next": "Q8" },
      { "id": 3, "text": "Occasionnellement (moins d'une fois par mois)", "next": "Q8" }
    ]
  },
  {
    "id": "Q8",
    "text": "Selon vous, que faudrait-il faire en priorité pour améliorer les conditions d'accès à cette gare ?",
    "freeText": true,
    "next": "end"
  }
]
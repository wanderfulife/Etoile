export const questions = [
  {
    id: "Poste",
    text: "Zone de l'enquête",
    options: [
      { id: 1, text: "Servon-sur-Vilaine", next: "Q1" },
      { id: 2, text: "Saint-Médard-sur-Ille", next: "Q1" },
      { id: 3, text: "Saint-Germain-sur-Ille", next: "Q1" },
      { id: 4, text: "Rennes", next: "Q1" },
      { id: 5, text: "Noyal-sur-Vilaine", next: "Q1" },
      { id: 6, text: "Montreuil-sur-Ille", next: "Q1" },
      { id: 7, text: "Montfort-sur-Meu", next: "Q1" },
      { id: 8, text: "L'Hermitage", next: "Q1" },
      { id: 9, text: "Janzé", next: "Q1" },
      { id: 10, text: "Guichen", next: "Q1" },
      { id: 11, text: "Châteaubourg", next: "Q1" },
      { id: 12, text: "Chevaigné", next: "Q1" },
      { id: 13, text: "Cesson-Sévigné", next: "Q1" },
      { id: 14, text: "Bruz", next: "Q1" },
      { id: 15, text: "Breteil", next: "Q1" },
      { id: 16, text: "Betton", next: "Q1" }
    ]
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
      { "id": 1, "text": "L'Hermitage", "next": "Q2a" },
      { "id": 2, "text": "Autre commune : préciser nom de la commune", "next": "Q2c" }
    ]
  },
  {
    "id": "Q2a",
    "text": "De quelle rue de L'Hermitage venez-vous ?",
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
    "options": [
      { "id": 1, "text": "Sur le parking de la gare (50 pl)", "next": "Q3a_prime" },
      { "id": 2, "text": "Sur le parking rue du Lavoir au Nord (100-150 pl)", "next": "Q3a_prime" },
      { "id": 3, "text": "Sur une autre place en voirie ou parking au Nord", "next": "Q3a_prime" },
      { "id": 4, "text": "Sur une autre place en voirie ou parking au Sud", "next": "Q3a_prime" },
      { "id": 5, "text": "Sur un stationnement privé (box ou place de parking privée)", "next": "Q3a_prime" }
    ]
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
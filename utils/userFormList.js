const activityOptions = [
  {
    theme: "Activités créatrices",
    categorie: ["Artistique", "Manuel", "Musique"],
  },
  {
    theme: "Sport",
    categorie: [
      "Pratiquer en extérieur (terre)",
      "Pratiquer en extérieur (mer)",
      "Pratiquer en intérieur",
      "Supporter",
    ],
  },
  {
    theme: "Art & Culture",
    categorie: [
      "Cinéma",
      "Concert",
      "Musées",
      "Lecture",
      "Musique (pratiquer)",
    ],
  },
  {
    theme: "Boire & Manger",
    categorie: ["Bars", "Restaurant", "Cuisiner"],
  },
  {
    theme: "Entraide",
    categorie: [
      "Petsitter",
      "Aide à la personne",
      "Services",
      "SOS",
      "Acte citoyen",
    ],
  },
  {
    theme: "Spiritualité",
    categorie: ["Relaxation", "Mysticisme"],
  },
  {
    theme: "Apprentissage",
    categorie: ["Langues", "Musique", "Bricolage"],
  },
  {
    theme: "Plaisir coupable",
    categorie: ["Divertissement", "Jeux", "Rire"],
  },
];

const motivationOptions = [
  { label: "Faire des rencontres", value: "faire_des_rencontres" },
  {
    label: "Apprendre de nouvelles choses",
    value: "apprendre_nouvelles_choses",
  },
  { label: "Passer du bon temps", value: "passer_du_bon_temps" },
  { label: "Développer vos compétences", value: "developper_competences" },
  {
    label: "Se sentir utile ou s'engager dans une cause",
    value: "s_engager_dans_une_cause",
  },
];

const groupOptions = [
  { label: "Petit groupe (2-5 personnes)", value: "petit_groupe" },
  { label: "Groupe moyen (6-10 personnes)", value: "groupe_moyen" },
  { label: "Grand groupe (10+ personnes)", value: "grand_groupe" },
];

const interestOptions = [
  { label: "Similaires", value: "similaires" },
  { label: "Divers", value: "divers" },
];

const ageOptions = [
  { label: "Intergénérationnelles", value: "intergenerationnelles" },
  { label: "Proche de mon âge", value: "proche_de_mon_age" },
  { label: "Peu importe", value: "peu_importe" },
];

const availabilityOptions = [
  { label: "En semaine", value: "en_semaine" },
  { label: "En soirée", value: "en_soiree" },
  { label: "Le week-end", value: "weekend" },
  { label: "Journée", value: "journee" },
];

const placeOptions = [
  { label: "En intérieur", value: "interieur" },
  { label: "En extérieur", value: "exterieur" },
  { label: "Peu importe", value: "noMatter" },
];

const preferencesOptions = [
  { label: "Centré sur les mêmes passions", value: "memes_passions" },
  { label: "Ouvert à la découverte", value: "decouverte" },
];

const valuesOptions = [
  { label: "Bienveillance", value: "bienveillance" },
  { label: "Authenticité", value: "authenticite" },
  { label: "Solidarité", value: "solidarite" },
  { label: "Créativité", value: "creativite" },
];

const projectOptions = [
  { label: "Écologie", value: "ecologie" },
  { label: "Aide sociale", value: "aide_sociale" },
];

const suggestionsOptions = [
  { label: "En fonction de mes centres d’intérêt", value: "interet" },
  { label: "En fonction de mes compétences", value: "competences" },
  { label: "En fonction de mes disponibilités", value: "disponibilites" },
  { label: "En fonction de mes valeurs", value: "valeurs" },
];

const genderOptions = [
  { label: "Mixte", value: "mixte" },
  { label: "Non-mixité (uniquement des femmes)", value: "non_mixte_femmes" },
  { label: "Non-mixité (uniquement des hommes)", value: "non_mixte_hommes" },
];

const ageOptionsCreateEvent = [
  { label: "18-24 ans", value: "18-24" },
  { label: "25-29 ans", value: "25-29" },
  { label: "30-34 ans", value: "30-34" },
  { label: "35-39 ans", value: "35-39" },
  { label: "40-49 ans", value: "40-49" },
  { label: "50-59 ans", value: "50-59" },
  { label: "60 ans +", value: "60+" },
];

module.exports = {
  activityOptions,
  motivationOptions,
  groupOptions,
  interestOptions,
  ageOptions,
  availabilityOptions,
  placeOptions,
  preferencesOptions,
  valuesOptions,
  projectOptions,
  suggestionsOptions,
  genderOptions,
  ageOptionsCreateEvent,
};

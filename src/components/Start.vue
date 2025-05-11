<template>
  <div class="app-container">
    <!-- Progress Bar -->
    <div v-if="currentStep === 'survey'" class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="content-container">
      <!-- Enqueteur Input Step -->
      <div v-if="currentStep === 'enqueteur'">
        <h2>Prénom enqueteur :</h2>
        <input class="form-control" type="text" v-model="enqueteur" />
        <button
          v-if="enqueteur && !isEnqueteurSaved"
          @click="setEnqueteur"
          class="btn-next"
        >
          Suivant
        </button>
      </div>

      <div v-if="currentStep === 'poste'">
        <h2>Zone de l'enquête</h2>
        <button
          v-for="(option, index) in firstQuestion.options"
          :key="index"
          @click="selectPoste(option)"
          class="btn-option"
        >
          {{ option.text }}
        </button>
      </div>
								
      <!-- Start Survey Step -->
      <div v-else-if="currentStep === 'start'" class="start-survey-container">
        <h2>
          Bonjour,<br />
          pour mieux connaître les usagers de la gare,<br />
          la Région Bretagne et la SNCF souhaiteraient en savoir plus sur votre déplacement
          en cours. Auriez-vous 2 minutes à nous accorder<br />
          Acceptez-vous de répondre à quelques questions ?»
        </h2>
        <h2></h2>
        <button @click="startSurvey" class="btn-next">
          COMMENCER QUESTIONNAIRE
        </button>
      </div>

      <!-- Survey Questions Step -->
      <div v-else-if="currentStep === 'survey' && !isSurveyComplete">
        <div class="question-container" v-if="currentQuestion">
          <h2>{{ currentQuestion.text }}</h2>

          <!-- PDF Button for Q1_quartier, Q3_quartier, and Q3a -->
          <button
            v-if="(['Q1_quartier', 'Q3_quartier'].includes(currentQuestion.id)) || (currentQuestion.id === 'Q3a' && isPlanAvailableForQ3a)"
            @click="showPdf = true"
            class="btn-pdf"
          >
            Voir le plan
          </button>
          <!-- Standard options -->
          <div
            v-if="
              !currentQuestion.freeText && !currentQuestion.usesCommuneSelector && !currentQuestion.usesStreetSelector && !currentQuestion.usesGareSelector
            "
          >
            <div v-for="(option, index) in currentQuestionOptions" :key="index">
              <button
                v-if="!option.hidden"
                @click="selectAnswer(option)"
                class="btn-option"
              >
                {{ typeof option.text === 'function' ? option.text(answers) : option.text }}
              </button>
            </div>
          </div>

          <!-- Commune Selector -->
          <div v-if="currentQuestion.usesCommuneSelector">
            <CommuneSelector
              v-model="communeSelections[currentQuestion.id]"
              v-model:postalCodePrefix="postalCodePrefixes[currentQuestion.id]"
            />
            <p>
              Commune sélectionnée ou saisie:
              {{ communeSelections[currentQuestion.id] }}
            </p>
            <button
              @click="handleCommuneSelection"
              class="btn-next"
              :disabled="!communeSelections[currentQuestion.id]?.trim()"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <!-- Street Selector (new) -->
          <div v-if="currentQuestion.usesStreetSelector">
            <StreetSelector 
              v-model="streetSelections[currentQuestion.id]" 
              :poste="posteNameForStreetFile" 
            />
            <p>
              Rue sélectionnée ou saisie:
              {{ streetSelections[currentQuestion.id] }}
            </p>
            <button
              @click="handleStreetSelection"
              class="btn-next"
              :disabled="!streetSelections[currentQuestion.id]?.trim()"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <div v-if="currentQuestion.usesGareSelector">
            <GareSelector v-model="gareSelections[currentQuestion.id]" />
            <button
              @click="handleGareSelection"
              class="btn-next"
              :disabled="!gareSelections[currentQuestion.id]"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <!-- Free Text Questions -->
          <div v-if="currentQuestion.freeText && !currentQuestion.usesStreetSelector && !currentQuestion.usesCommuneSelector && !currentQuestion.usesGareSelector">
            <div class="input-container">
              <input
                v-if="['Q11', 'Q12b'].includes(currentQuestion.id)"
                v-model="freeTextAnswer"
                class="form-control"
                type="number"
                :placeholder="
                  currentQuestion.freeTextPlaceholder ||
                  'Votre réponse (nombres uniquement)'
                "
              />
              <input
                v-else
                v-model="freeTextAnswer"
                class="form-control"
                type="text"
                :placeholder="
                  currentQuestion.freeTextPlaceholder || 'Votre réponse'
                "
              />
            </div>
            <button
              @click="handleFreeTextAnswer"
              class="btn-next"
              :disabled="!freeTextAnswer"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>

          <!-- Back Button -->
          <button @click="previousQuestion" class="btn-return" v-if="canGoBack">
            Retour
          </button>
        </div>
      </div>

      <!-- Survey Complete Step -->
      <div v-else-if="isSurveyComplete" class="survey-complete">
        <h2>Merci pour votre réponse et bonne journée.</h2>
        <button @click="resetSurvey" class="btn-next">
          Nouveau questionnaire
        </button>
      </div>

      <!-- Logo -->
      <img class="logo" src="../assets/Alycelogo.webp" alt="Logo Alyce" />
    </div>

    <!-- Footer -->
    <div class="footer">
      <AdminDashboard :questions="questions" />
    </div>

    <div v-if="showPdf" class="modal">
      <div class="modal-content pdf-content">
        <span class="close" @click="showPdf = false">&times;</span>
        <iframe
          :src="pdfUrl"
          width="100%"
          height="500px"
          type="application/pdf"
        >
          This browser does not support PDFs. Please download the PDF to view
          it.
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { questions, posteNameToFilenameKey } from "./surveyQuestions.js";
import CommuneSelector from "./CommuneSelector.vue";
import AdminDashboard from "./AdminDashboard.vue";
import StreetSelector from "./StreetSelector.vue";
import GareSelector from "./GareSelector.vue";

// Refs
const persistentQ1 = ref(null);
const docCount = ref(0);
const currentStep = ref("enqueteur");
const startDate = ref("");
const enqueteur = ref("");
const currentQuestionIndex = ref(0);
const answers = ref({});
const freeTextAnswer = ref("");
const questionPath = ref(["Q1"]);
const isEnqueteurSaved = ref(false);
const isSurveyComplete = ref(false);
const selectedCommune = ref("");
const stationInput = ref("");
const filteredStations = ref([]);
const showPdf = ref(false);
const streetSelections = ref({});
const communeSelections = ref({});
const postalCodePrefixes = ref({});
const pdfUrl = ref("/Plan.pdf");
// Firestore refs
const surveyCollectionRef = collection(db, "EtoileRennaise");
const counterDocRef = doc(db, "counterEtoileRennaise", "surveyCounter");
const gareSelections = ref({});
const savedPoste = ref(null);
const firstQuestion = questions.find((q) => q.id === "Poste");

// Computed property for StreetSelector poste prop
const posteNameForStreetFile = computed(() => {
  // For Q2a, check if Q2's selected option has posteOverride
  if (currentQuestion.value?.id === 'Q2a') {
    // Find the selected Q2 option
    const q2Options = questions.find(q => q.id === 'Q2').options(answers.value);
    const selectedQ2Id = answers.value.Q2;
    const selectedQ2Option = q2Options && q2Options.find(opt => opt.id === selectedQ2Id);
    if (selectedQ2Option && selectedQ2Option.posteOverride) {
      // If Bourg-des-Comptes, use Guichen's street list
      if (selectedQ2Option.posteOverride === 'Bourg-des-Comptes') {
        return 'Guichen';
      }
      return selectedQ2Option.posteOverride;
    }
  }
  if (answers.value.PosteText) {
    return posteNameToFilenameKey(answers.value.PosteText);
  }
  return null; 
});

const isPlanAvailableForQ3a = computed(() => {
  if (currentQuestion.value?.id === 'Q3a' && answers.value.PosteText) {
    return !!getPlanFilenameKey(answers.value.PosteText); 
  }
  return false;
});

// Function to get the filename key for plans
const getPlanFilenameKey = (posteDisplayName) => {
  const nameMap = {
    "P2 Ker Lann": "Bruz",
    "P3 Pontchaillou": "Pontchaillou",
    "P5 Betton": "Betton",
    "P7 Chevaigné": "Chevaigne",
    "P8 Saint-Médard-sur-Ille": "St_Medard",
    "P9 Châteaubourg": "Chateaubourg",
    "P10 Noyal-Acigné": "Noyal",
    "P11 Servon-sur-Vilaine": "Servon",
    "P12 Cesson-Sévigné": "Cesson",
    "P13 Montfort-sur-Meu": "Montfort",
    "P15 L'Hermitage-Mordelles": "Hermitage",
    "P16 Janzé": "Janze",
    "P17 La Poterie": "La_Poterie",
  };
  return nameMap[posteDisplayName]; 
};

const handleGareSelection = () => {
  if (currentQuestion.value.usesGareSelector) {
    const questionId = currentQuestion.value.id;
    const selectedValue = gareSelections.value[questionId];

    if (selectedValue && selectedValue.trim() !== "") {
      answers.value[questionId] = selectedValue;
      nextQuestion();
      gareSelections.value[questionId] = "";
    }
  }
};

const handleStreetSelection = () => {
  if (currentQuestion.value.usesStreetSelector) {
    const questionId = currentQuestion.value.id;
    const selectedValue = streetSelections.value[questionId];

    if (selectedValue && selectedValue.trim() !== "") {
      answers.value[`${questionId}_RUE`] = selectedValue;
      nextQuestion();
      streetSelections.value[questionId] = "";
    }
  }
};

const currentQuestion = computed(() => {
  if (
    currentQuestionIndex.value >= 0 &&
    currentQuestionIndex.value < questions.length
  ) {
    const question = questions[currentQuestionIndex.value];

    // Handle dynamic text
    const text =
      typeof question.text === "function"
        ? question.text(answers.value)
        : question.text;

    // Handle dynamic options
    const options =
      typeof question.options === "function"
        ? question.options(answers.value)
        : question.options;

    // Dynamically set PDF URL for Q3a and other specified questions
    if (question.id === 'Q3a' && answers.value.PosteText) {
      const planKey = getPlanFilenameKey(answers.value.PosteText);
      if (planKey) {
        pdfUrl.value = `/Plan_${planKey}.pdf`;
      } else {
        pdfUrl.value = '';
      }
    } else if (['Q1_quartier', 'Q3_quartier'].includes(question.id)) {
        pdfUrl.value = "/Plan.pdf";
    } else if (!['Q1_quartier', 'Q3_quartier', 'Q3a'].includes(question.id)) {
    }

    return {
      ...question,
      text,
      options,
    };
  }
  return null;
});

// Methods

const currentQuestionOptions = computed(() => {
  if (
    currentQuestion.value &&
    typeof currentQuestion.value.options === "function"
  ) {
    return currentQuestion.value.options(answers.value);
  }
  return currentQuestion.value?.options || [];
});

const showFilteredStations = computed(
  () => stationInput.value.length > 0 && filteredStations.value.length > 0
);

const canGoBack = computed(() => questionPath.value.length > 1);

const isLastQuestion = computed(
  () => currentQuestionIndex.value === questions.length - 1
);

const progress = computed(() => {
  if (currentStep.value !== "survey") return 0;
  if (isSurveyComplete.value) return 100;
  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex.value + 1;
  const isLastOrEnding =
    isLastQuestion.value ||
    currentQuestion.value?.options?.some((option) => option.next === "end");
  return isLastOrEnding
    ? 100
    : Math.min(Math.round((currentQuestionNumber / totalQuestions) * 100), 99);
});

// Methods
const setEnqueteur = () => {
  if (enqueteur.value.trim() !== "") {
    currentStep.value = "poste"; // instead of "start"
    currentQuestionIndex.value = persistentQ1.value ? 1 : 0;
    isEnqueteurSaved.value = true;
  }
};

const selectPoste = (option) => {
  savedPoste.value = option.text;
  answers.value["Poste"] = option.id;
  answers.value["PosteText"] = option.text;
  currentStep.value = "start";
};

const startSurvey = () => {
  startDate.value = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  currentStep.value = "survey";
  currentQuestionIndex.value = 1; // Start from Q2 after the start message
  isSurveyComplete.value = false;
};

const selectAnswer = (option) => {
  if (currentQuestion.value) {
    const questionId = currentQuestion.value.id;
    answers.value[questionId] = option.id;

    if (questionId === "Q1") {
      nextQuestion(option.next);
    } else if (option.next === "end") {
      finishSurvey();
    } else {
      nextQuestion(option.next);
    }
  }
};

const handleFreeTextAnswer = () => {
  if (currentQuestion.value) {
    const questionId = currentQuestion.value.id;
    answers.value[questionId] = freeTextAnswer.value;

    if (currentQuestion.value.next === "end") {
      finishSurvey();
    } else {
      nextQuestion();
    }
    freeTextAnswer.value = ""; // Reset the free text answer
  }
};

const handleCommuneSelection = () => {
  if (currentQuestion.value.usesCommuneSelector) {
    const questionId = currentQuestion.value.id;
    const selectedValue = communeSelections.value[questionId];

    if (selectedValue && selectedValue.trim() !== "") {
      const parts = selectedValue.split(" - ");

      if (parts.length === 2) {
        // A commune was selected from the list
        const [commune, codeInsee] = parts;
        answers.value[`${questionId}_COMMUNE`] = commune;
        answers.value[`${questionId}_CODE_INSEE`] = codeInsee;
        answers.value[`${questionId}_COMMUNE_LIBRE`] = "";
      } else {
        // Free input was used
        answers.value[`${questionId}_COMMUNE`] = "";
        answers.value[`${questionId}_CODE_INSEE`] = "";
        answers.value[`${questionId}_COMMUNE_LIBRE`] = selectedValue.trim();
      }

      nextQuestion();
      communeSelections.value[questionId] = "";
    }
  }
};

const nextQuestion = (forcedNextId = null) => {
  let nextQuestionId = forcedNextId;
  if (!nextQuestionId && currentQuestion.value) {
    if (typeof currentQuestion.value.next === "function") {
      nextQuestionId = currentQuestion.value.next(answers.value);
    } else {
      nextQuestionId = currentQuestion.value.next;
    }
  }

  if (nextQuestionId === "end") {
    finishSurvey();
  } else if (nextQuestionId) {
    const nextIndex = questions.findIndex((q) => q.id === nextQuestionId);
    if (nextIndex !== -1) {
      currentQuestionIndex.value = nextIndex;
      questionPath.value.push(nextQuestionId);
      freeTextAnswer.value = "";

      // Execute onEnter function if it exists
      const nextQuestion = questions[nextIndex];
      if (typeof nextQuestion.onEnter === "function") {
        nextQuestion.onEnter(answers.value);
      }
    }
  }
};

const previousQuestion = () => {
  if (canGoBack.value) {
    questionPath.value.pop();
    const previousQuestionId =
      questionPath.value[questionPath.value.length - 1];
    const previousIndex = questions.findIndex(
      (q) => q.id === previousQuestionId
    );
    if (previousIndex !== -1) {
      currentQuestionIndex.value = previousIndex;
      delete answers.value[questions[currentQuestionIndex.value].id];
      freeTextAnswer.value = "";
    }
  }
};
// Update the finishSurvey function
const finishSurvey = async () => {
  isSurveyComplete.value = true;
  const now = new Date();

  const uniqueId = await getNextId();

  let surveyData = {
    ID_questionnaire: uniqueId,
    HEURE_DEBUT: startDate.value,
    DATE: now.toLocaleDateString("fr-FR").replace(/\//g, "-"),
    JOUR: now.toLocaleDateString("fr-FR", { weekday: "long" }),
    ENQUETEUR: enqueteur.value,
    HEURE_FIN: now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    Poste: savedPoste.value,
    PORT_ID_ORIGIN: answers.value.PORT_ID_ORIGIN || "",
    PORT_ID_DESTINATION: answers.value.PORT_ID_DESTINATION || "",
  };

  // Include all answers in the survey data
  Object.keys(answers.value).forEach((key) => {
    surveyData[key] = answers.value[key];
  });

  try {
    await addDoc(surveyCollectionRef, surveyData);
  } catch (error) {
  }
};

// Update the resetSurvey function
const resetSurvey = () => {
  currentStep.value = "start";
  startDate.value = "";
  const preservedEnqueteur = enqueteur.value;
  const preservedPosteId = answers.value["Poste"];
  const preservedPosteText = answers.value["PosteText"];

  answers.value = {};
  if (preservedPosteId) {
    answers.value["Poste"] = preservedPosteId;
    answers.value["PosteText"] = preservedPosteText;
  }
  enqueteur.value = preservedEnqueteur;
  
  currentStep.value = 'start';

  currentQuestionIndex.value = 1;
  questionPath.value = [questions[1].id];
  isSurveyComplete.value = false;
  streetSelections.value = {};
  communeSelections.value = {};
  gareSelections.value = {};
  postalCodePrefixes.value = {};
  freeTextAnswer.value = '';
};

const getDocCount = async () => {
  try {
    const querySnapshot = await getDocs(surveyCollectionRef);
    docCount.value = querySnapshot.size;
  } catch (error) {
  }
};

const getNextId = async () => {
  const counterDoc = await getDoc(counterDocRef);
  let counter = 1;

  if (counterDoc.exists()) {
    counter = counterDoc.data().value + 1;
  }

  await setDoc(counterDocRef, { value: counter });

  return `EtoileRennaise-${counter.toString().padStart(6, "0")}`;
};
</script>


<style>
/* Base styles */
body {
  background-color: #2a3b63;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #2a3b63;
  color: white;
}

/* Center the Start Survey button horizontally and vertically */
.start-survey-container {
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
  height: 50vh;
  /* Full viewport height */
  width: 100%;
  /* Full width */
  margin-bottom: 5%;
}

.content-container {
  flex-grow: 1;
  /* This allows the content to take up available space */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  /* Allow scrolling if content overflows */
}

.question-container {
  width: 100%;
  margin-bottom: 30px;
}

.input-container {
  display: flex;
  justify-content: center;
  /* Center horizontally */
  width: 100%;
  /* Take full width of the parent */
}

h2 {
  text-align: center;
  width: 100%;
}

.form-control {
  width: 100%;
  max-width: 400px;
  /* Maximum width of the input */
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
  background-color: #333;
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
  box-sizing: border-box;
  outline: none;
}

.btn-next,
.btn-return,
.btn-option {
  width: 100%;
  max-width: 400px;
  color: white;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-next {
  background-color: green;
}

.btn-return {
  background-color: grey;
  margin-top: 30px;
}

.btn-option {
  background-color: #4a5a83;
  text-align: left;
}

.logo {
  max-width: 25%;
  height: auto;
  margin-top: 40px;
  margin-bottom: 20px;
}

.footer {
  background: linear-gradient(to right, #4c4faf, #3f51b5);
  padding: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  /* Keep the footer relative to its parent */
}

.btn-download {
  background-color: #ffffff;
  color: #4c4faf;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.doc-count {
  font-size: 14px;
  opacity: 0.9;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}

.commune-dropdown {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

.commune-option {
  padding: 5px;
  cursor: pointer;
}

.commune-option:hover {
  background-color: #f0f0f0;
}

@media screen and (max-width: 768px) {
  .question-container {
    margin-bottom: 20px;
  }

  .btn-return {
    margin-top: 20px;
  }

  .logo {
    margin-top: 30px;
  }
}

/* Ensure responsive centering */
@media screen and (max-width: 480px) {
  .form-control {
    max-width: 100%;
    /* Ensure full width on small screens */
  }
}
.btn-pdf {
  background-color: #ff9800;
  /* Orange color to make it distinct */
  color: white;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: background-color 0.3s;
}

.btn-pdf:hover {
  background-color: #f57c00;
  /* Darker orange on hover */
}

.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 800px;
  position: relative;
}

.pdf-content {
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Ensure the PDF fits within the modal */
.pdf-content iframe {
  flex-grow: 1;
  border: none;
  margin-top: 20px;
}

/* Add these new styles */
.precision-input {
  margin-top: 15px;
}

.precision-input h3 {
  font-size: 1.1em;
  margin-bottom: 10px;
}
</style>
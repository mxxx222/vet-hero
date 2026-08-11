const STORAGE_KEYS = {
  legacy: {
    stars: "vetStars",
    cured: "vetCured",
    photos: "vetPhotos",
    decos: "vetDecos",
    dailyGift: "vetDailyGift"
  },
  version: "vetHeroSchemaVersion",
  stickerIds: "vetHeroStickerIds",
  photoAlbum: "vetHeroPhotoAlbum",
  clinicTier: "vetHeroClinicTier",
  queue: "vetHeroQueue",
  lastArea: "vetHeroLastActiveArea"
};

const SCHEMA_VERSION = 2;

const ANIMALS = [
  {
    id: "bunny",
    name: "🐰 Bella Bunny",
    description: "Bella has a sore paw and wants gentle care.",
    symptoms: [
      { id: "paw", title: "Warm Paw", detail: "Her paw feels warm and slow. A bandage will help." },
      { id: "ears", title: "Floppy Ears", detail: "Her ears feel heavy. Gentle cleaning can make her smile." },
      { id: "nose", title: "Dry Nose", detail: "A little drink will help Bella feel cozy again." }
    ],
    tools: [
      { id: "bandage", title: "Bandage", note: "Wrap gently." },
      { id: "spray", title: "Magic Spray", note: "Calms and cleans." },
      { id: "cuddle", title: "Cuddle", note: "Soft hugs help recovery." }
    ],
    solution: { paw: "bandage", ears: "spray", nose: "cuddle" }
  },
  {
    id: "puppy",
    name: "🐶 Penny Puppy",
    description: "Penny loves play, but her paw is a little ouchie.",
    symptoms: [
      { id: "paw", title: "Warm Paw", detail: "Penny's paw feels warm. A gentle bandage is the right choice." },
      { id: "thirst", title: "Thirsty", detail: "She needs a drink and rest to wag again." },
      { id: "toy", title: "Missing Toy", detail: "A soft toy brings joy and comfort." }
    ],
    tools: [
      { id: "bandage", title: "Bandage", note: "Protect the paw." },
      { id: "water", title: "Fresh Water", note: "A cool drink helps." },
      { id: "treat", title: "Treat", note: "A happy reward." }
    ],
    solution: { paw: "bandage", thirst: "water", toy: "treat" }
  },
  {
    id: "kitten",
    name: "🐱 Kai Kitten",
    description: "Kai is shy and needs calming care.",
    symptoms: [
      { id: "fur", title: "Fluffy Fur", detail: "Kai's fur feels tangled. A brush will help." },
      { id: "purr", title: "Quiet Purr", detail: "A calm pet helps Kai relax." },
      { id: "paw", title: "Small Paw", detail: "A warm paw needs a soft bandage." }
    ],
    tools: [
      { id: "brush", title: "Brush", note: "Gentle strokes." },
      { id: "bandage", title: "Bandage", note: "Wrap with care." },
      { id: "pet", title: "Pet", note: "Kind pats help a lot." }
    ],
    solution: { fur: "brush", purr: "pet", paw: "bandage" }
  },
  {
    id: "duckling",
    name: "🦆 Dax Duckling",
    description: "Dax has a splashy tummy and needs warm care.",
    symptoms: [
      { id: "cold", title: "Cold Feathers", detail: "His feathers look chilly. Warmth helps." },
      { id: "splash", title: "Wet Belly", detail: "A dry towel and rest feel nice." },
      { id: "quack", title: "Soft Quack", detail: "A gentle song soothes him." }
    ],
    tools: [
      { id: "blanket", title: "Blanket", note: "Wrap him warm." },
      { id: "towel", title: "Towel", note: "Dry and cozy." },
      { id: "song", title: "Song", note: "Hum a soft tune." }
    ],
    solution: { cold: "blanket", splash: "towel", quack: "song" }
  },
  {
    id: "hedgehog",
    name: "🦔 Hazel Hedgehog",
    description: "Hazel needs gentle help with prickly paws.",
    symptoms: [
      { id: "paw", title: "Prickly Paw", detail: "A soft bandage soothes Hazel's foot." },
      { id: "sniffle", title: "Little Sniffle", detail: "A warm tea cup helps her feel cozy." },
      { id: "shell", title: "Quiet Shell", detail: "A calm cuddle makes her smile." }
    ],
    tools: [
      { id: "bandage", title: "Bandage", note: "Wrap softly." },
      { id: "tea", title: "Warm Tea", note: "Sip with care." },
      { id: "cuddle", title: "Cuddle", note: "A calm hug." }
    ],
    solution: { paw: "bandage", sniffle: "tea", shell: "cuddle" }
  },
  {
    id: "fox",
    name: "🦊 Fiona Fox",
    description: "Fiona is curious and needs careful checkups.",
    symptoms: [
      { id: "ear", title: "Ticklish Ear", detail: "Her ear needs a gentle clean." },
      { id: "tail", title: "Tired Tail", detail: "A soft brush helps her relax." },
      { id: "eyes", title: "Bright Eyes", detail: "A warm rest makes her sparkle." }
    ],
    tools: [
      { id: "cleaner", title: "Ear Cleaner", note: "Check gently." },
      { id: "brush", title: "Brush", note: "Smooth her tail." },
      { id: "rest", title: "Rest", note: "Cozy rest time." }
    ],
    solution: { ear: "cleaner", tail: "brush", eyes: "rest" }
  }
];

const STICKERS = [
  { id: "heart", emoji: "❤️", title: "Caring Heart" },
  { id: "sparkle", emoji: "✨", title: "Sparkle Badge" },
  { id: "star", emoji: "🌟", title: "Star Helper" },
  { id: "paw", emoji: "🐾", title: "Paw Friend" },
  { id: "sun", emoji: "☀️", title: "Sunny Smile" }
];

const TIER_LABELS = {
  cozy: "Cozy Clinic",
  caring: "Caring Clinic",
  heroic: "Heroic Clinic",
  champion: "Champion Clinic"
};

const state = {
  area: "reception",
  currentAnimalId: null,
  diagnosisId: null,
  diagnosisMode: null,
  miniGameComplete: false,
  miniGameState: null,
  miniGameTimer: null,
  miniGameCleanup: null,
  assistantTimer: null,
  treatmentChoice: null,
  treatmentComplete: false,
  bannerText: "Welcome to the clinic! Tap a room to begin.",
  lastAction: null
};

const saved = {
  stars: 0,
  cured: 0,
  photos: 0,
  decos: 0,
  dailyGift: "never",
  stickerIds: [],
  photoAlbum: [],
  clinicTier: "cozy",
  queue: [],
  lastArea: "reception"
};

const elements = {
  screenRoot: document.getElementById("screen-root"),
  offlineIndicator: document.getElementById("offline-indicator"),
  assistantBanner: document.getElementById("assistant-banner"),
  statStars: document.getElementById("stat-stars"),
  statCured: document.getElementById("stat-cured"),
  statPhotos: document.getElementById("stat-photos"),
  statDecos: document.getElementById("stat-decos"),
  statGift: document.getElementById("stat-gift"),
  navButtons: Array.from(document.querySelectorAll(".nav-button"))
};

function parseDateKey(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(normalized);
  if (!m) return null;

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return normalized;
}

function todayString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function parseJSON(value) {
  if (typeof value !== "string") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function loadSaved() {
  const parseInteger = (value) => {
    const numeric = parseInt(value, 10);
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const legacyStars = localStorage.getItem(STORAGE_KEYS.legacy.stars);
  const legacyCured = localStorage.getItem(STORAGE_KEYS.legacy.cured);
  const legacyPhotos = localStorage.getItem(STORAGE_KEYS.legacy.photos);
  const legacyDecos = localStorage.getItem(STORAGE_KEYS.legacy.decos);
  const legacyGift = localStorage.getItem(STORAGE_KEYS.legacy.dailyGift);

  saved.stars = parseInteger(localStorage.getItem("vetHeroStars")) || parseInteger(legacyStars);
  saved.cured = parseInteger(localStorage.getItem("vetHeroCured")) || parseInteger(legacyCured);
  saved.photos = parseInteger(localStorage.getItem("vetHeroPhotos")) || parseInteger(legacyPhotos);
  saved.decos = parseInteger(localStorage.getItem("vetHeroDecos")) || parseInteger(legacyDecos);
  saved.dailyGift = parseDateKey(localStorage.getItem("vetHeroDailyGift")) || parseDateKey(legacyGift) || "never";
  saved.stickerIds = parseJSON(localStorage.getItem(STORAGE_KEYS.stickerIds)) || [];
  saved.photoAlbum = parseJSON(localStorage.getItem(STORAGE_KEYS.photoAlbum)) || [];
  saved.clinicTier = localStorage.getItem(STORAGE_KEYS.clinicTier) || "cozy";
  saved.queue = parseJSON(localStorage.getItem(STORAGE_KEYS.queue)) || [];
  saved.lastArea = localStorage.getItem(STORAGE_KEYS.lastArea) || "reception";

  if (!Array.isArray(saved.stickerIds)) saved.stickerIds = [];
  if (!Array.isArray(saved.photoAlbum)) saved.photoAlbum = [];
  if (!Array.isArray(saved.queue) || saved.queue.length === 0) {
    saved.queue = shuffle(ANIMALS.map((animal) => animal.id));
  }

  state.area = saved.lastArea || "reception";
}

function saveAll() {
  localStorage.setItem(STORAGE_KEYS.legacy.stars, String(saved.stars));
  localStorage.setItem(STORAGE_KEYS.legacy.cured, String(saved.cured));
  localStorage.setItem(STORAGE_KEYS.legacy.photos, String(saved.photos));
  localStorage.setItem(STORAGE_KEYS.legacy.decos, String(saved.decos));
  localStorage.setItem(STORAGE_KEYS.legacy.dailyGift, saved.dailyGift);

  localStorage.setItem("vetHeroStars", String(saved.stars));
  localStorage.setItem("vetHeroCured", String(saved.cured));
  localStorage.setItem("vetHeroPhotos", String(saved.photos));
  localStorage.setItem("vetHeroDecos", String(saved.decos));
  localStorage.setItem("vetHeroDailyGift", saved.dailyGift);
  localStorage.setItem(STORAGE_KEYS.version, String(SCHEMA_VERSION));
  localStorage.setItem(STORAGE_KEYS.stickerIds, JSON.stringify(saved.stickerIds));
  localStorage.setItem(STORAGE_KEYS.photoAlbum, JSON.stringify(saved.photoAlbum));
  localStorage.setItem(STORAGE_KEYS.clinicTier, saved.clinicTier);
  localStorage.setItem(STORAGE_KEYS.queue, JSON.stringify(saved.queue));
  localStorage.setItem(STORAGE_KEYS.lastArea, state.area);
}

function getAnimal(id) {
  return ANIMALS.find((animal) => animal.id === id) || null;
}

function getCurrentAnimal() {
  const id = state.currentAnimalId || saved.queue[0];
  return getAnimal(id);
}

const DIAGNOSIS_GAMES = ["spot-check", "tool-match", "care-quiz"];

function pickDiagnosisMode() {
  return DIAGNOSIS_GAMES[Math.floor(Math.random() * DIAGNOSIS_GAMES.length)];
}

function initializeDiagnosisMiniGame(symptomId) {
  const animal = getCurrentAnimal();
  state.diagnosisId = symptomId;
  state.diagnosisMode = pickDiagnosisMode();
  state.miniGameComplete = false;
  state.miniGameState = null;

  if (!animal) {
    return;
  }

  const symptom = animal.symptoms.find((entry) => entry.id === symptomId) || animal.symptoms[0];
  const correctTool = animal.solution[symptomId];
  const toolOptions = shuffle(animal.tools.slice(0));
  const chosenTools = toolOptions.slice(0, 3);
  if (!chosenTools.some((tool) => tool.id === correctTool)) {
    chosenTools[0] = animal.tools.find((tool) => tool.id === correctTool) || chosenTools[0];
  }

  let choices = [];
  if (state.diagnosisMode === "spot-check") {
    const question = `Which detail best matches ${symptom.title.toLowerCase()}?`;
    const options = shuffle(animal.symptoms.map((entry) => ({
      id: entry.id,
      label: entry.detail
    }))).slice(0, 3);
    if (!options.some((option) => option.id === symptomId)) {
      options[0] = { id: symptomId, label: symptom.detail };
    }
    choices = shuffle(options);
    state.miniGameState = {
      mode: "spot-check",
      question,
      correctChoice: symptomId,
      choices
    };
  } else if (state.diagnosisMode === "tool-match") {
    const question = `Which tool helps with ${symptom.title.toLowerCase()}?`;
    choices = shuffle(chosenTools.map((tool) => ({ id: tool.id, label: tool.title })));
    state.miniGameState = {
      mode: "tool-match",
      question,
      correctChoice: correctTool,
      choices
    };
  } else {
    const question = `How should you comfort ${animal.name}?`;
    choices = shuffle([
      { id: correctTool, label: animal.tools.find((tool) => tool.id === correctTool)?.title || "The right care" },
      ...shuffle(animal.tools.filter((tool) => tool.id !== correctTool).map((tool) => ({ id: tool.id, label: tool.title }))).slice(0, 2)
    ]);
    state.miniGameState = {
      mode: "care-quiz",
      question,
      correctChoice: correctTool,
      choices
    };
  }

  showAssistant("Bella wants you to complete the diagnosis challenge before treatment.");
}

function evaluateDiagnosisChoice(choiceId) {
  if (!state.miniGameState) return;
  const correctChoice = state.miniGameState.correctChoice;
  if (choiceId === correctChoice) {
    state.miniGameComplete = true;
    showAssistant("Nice work! The diagnosis challenge is solved. Proceed to treatment.");
  } else {
    showAssistant("Not quite. Try again and pay attention to the clue.");
  }
}

function updateStats() {
  elements.statStars.textContent = String(saved.stars);
  elements.statCured.textContent = String(saved.cured);
  elements.statPhotos.textContent = String(saved.photos);
  elements.statDecos.textContent = String(saved.decos);
  elements.statGift.textContent = saved.dailyGift === todayString() ? "Today" : saved.dailyGift;
}

function updateOfflineStatus() {
  const online = navigator.onLine;
  elements.offlineIndicator.textContent = online ? "Online" : "Offline-ready play";
}

function setAssistantMessage(message, duration = 5000) {
  if (state.assistantTimer) {
    window.clearTimeout(state.assistantTimer);
  }

  state.bannerText = message;
  elements.assistantBanner.textContent = `Bella says: ${message}`;

  if (duration > 0) {
    state.assistantTimer = window.setTimeout(() => {
      const fallback = state.area === "garden"
        ? "Check your daily gift in the garden."
        : state.area === "gallery"
        ? "Your photo gallery saves precious care moments."
        : state.area === "stickers"
        ? "Collect more stickers with every healing."
        : state.area === "treatment"
        ? "Pick the tool that matches your diagnosis."
        : state.area === "examination"
        ? "Inspect symptoms and solve the diagnosis challenge."
        : "Tap a room to visit your clinic.";

      state.bannerText = fallback;
      elements.assistantBanner.textContent = `Bella says: ${fallback}`;
    }, duration);
  }
}

function showAssistant(message, duration = 5000) {
  setAssistantMessage(message, duration);
}

function setArea(area) {
  state.area = area;
  saveAll();
  render();
}

function completeTreatment(toolId) {
  const animal = getCurrentAnimal();
  if (!animal || !state.diagnosisId) return;

  const correctTool = animal.solution[state.diagnosisId];
  state.treatmentChoice = toolId;

  if (toolId !== correctTool) {
    showAssistant("Try a different tool. Look closely at the symptoms.");
    render();
    return;
  }

  saved.cured += 1;
  saved.stars += 1;
  if (saved.cured % 2 === 0) {
    saved.decos += 1;
  }

  const patient = getCurrentAnimal();
  if (patient && saved.queue[0] === patient.id) {
    saved.queue.shift();
  }

  if (saved.queue.length === 0) {
    saved.queue = shuffle(ANIMALS.map((animal) => animal.id));
  }

  saved.clinicTier = saved.cured >= 10 ? "champion" : saved.cured >= 6 ? "heroic" : saved.cured >= 3 ? "caring" : "cozy";
  saveAll();

  state.treatmentComplete = true;
  state.diagnosisMode = null;
  state.miniGameComplete = false;
  state.miniGameState = null;
  setArea("celebration");
  showAssistant("Great job! Your care helped the patient recover.");
}

function claimDailyGift() {
  const today = todayString();
  if (saved.dailyGift === today) {
    showAssistant("You already claimed today's gift.");
    return;
  }

  saved.dailyGift = today;
  saved.decos += 1;
  saved.stars += 1;
  saveAll();
  showAssistant("Daily gift claimed! A new decoration and star were added.");
  render();
}

function takePhoto() {
  const animal = getCurrentAnimal();
  if (!animal) return;

  saved.photos += 1;
  saved.photoAlbum.push({ id: animal.id, name: animal.name, takenAt: new Date().toISOString() });
  saveAll();
  updateStats();
  showAssistant("A happy moment was saved to the photo gallery.");
  render();
}

function collectSticker() {
  const nextSticker = STICKERS.find((sticker) => !saved.stickerIds.includes(sticker.id));
  if (!nextSticker) {
    showAssistant("You already collected every sticker! Great job.");
    return;
  }

  saved.stickerIds.push(nextSticker.id);
  saved.stars += 1;
  saveAll();
  showAssistant(`Sticker earned: ${nextSticker.title}!`);
  render();
}

function startNewPatient() {
  if (saved.queue.length === 0) {
    saved.queue = shuffle(ANIMALS.map((animal) => animal.id));
  }

  state.currentAnimalId = saved.queue[0];
  state.diagnosisId = null;
  state.diagnosisMode = null;
  state.miniGameComplete = false;
  state.miniGameState = null;
  state.treatmentChoice = null;
  state.treatmentComplete = false;
  saveAll();
  setArea("examination");
  showAssistant("A new patient is waiting in reception.");
}

function getRoomHeader() {
  if (state.area === "reception") return "Reception";
  if (state.area === "examination") return "Examination";
  if (state.area === "treatment") return "Treatment";
  if (state.area === "celebration") return "Recovery";
  if (state.area === "gallery") return "Photo Gallery";
  if (state.area === "stickers") return "Stickers";
  if (state.area === "garden") return "Garden";
  return "Vet Hero";
}

function render() {
  updateStats();
  updateOfflineStatus();
  updateNavHighlights();
  elements.assistantBanner.textContent = `Bella says: ${state.bannerText}`;
  elements.screenRoot.innerHTML = "";

  const screen = document.createElement("div");
  screen.className = "card";
  const title = document.createElement("h2");
  title.textContent = getRoomHeader();
  screen.appendChild(title);

  if (state.area === "reception") {
    renderReception(screen);
  } else if (state.area === "examination") {
    renderExamination(screen);
  } else if (state.area === "treatment") {
    renderTreatment(screen);
  } else if (state.area === "celebration") {
    renderCelebration(screen);
  } else if (state.area === "gallery") {
    renderGallery(screen);
  } else if (state.area === "stickers") {
    renderStickers(screen);
  } else if (state.area === "garden") {
    renderGarden(screen);
  }

  elements.screenRoot.appendChild(screen);
}

function renderReception(container) {
  const next = getCurrentAnimal();
  const message = document.createElement("p");
  message.textContent = next
    ? `Today's first patient is ${next.name}. Tap the button to begin caring for them.`
    : "No patients are waiting yet. Start a fresh clinic queue.";
  container.appendChild(message);

  const buttonRow = document.createElement("div");
  buttonRow.className = "tile-row";

  const beginButton = document.createElement("button");
  beginButton.type = "button";
  beginButton.className = "action-button primary";
  beginButton.textContent = next ? "Start examination" : "Prepare clinic";
  beginButton.dataset.action = "begin-patient";
  buttonRow.appendChild(beginButton);

  const shuffleButton = document.createElement("button");
  shuffleButton.type = "button";
  shuffleButton.className = "action-button secondary";
  shuffleButton.textContent = "Refresh waiting list";
  shuffleButton.dataset.action = "shuffle-queue";
  buttonRow.appendChild(shuffleButton);

  container.appendChild(buttonRow);

  const queueList = document.createElement("div");
  queueList.className = "tile-grid two";
  const upcoming = saved.queue.slice(0, 4);

  upcoming.forEach((animalId, index) => {
    const animal = getAnimal(animalId);
    if (!animal) return;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tile-button";
    card.dataset.action = "preview-patient";
    card.dataset.animal = animal.id;
    card.dataset.selected = animal.id === next?.id ? "true" : "false";
    card.innerHTML = `<span class="tile-title">${index === 0 ? "Next" : `#${index + 1}`} ${animal.name}</span><span class="tile-note">${animal.description}</span>`;
    queueList.appendChild(card);
  });

  container.appendChild(queueList);
}

function renderExamination(container) {
  const animal = getCurrentAnimal();
  if (!animal) {
    setArea("reception");
    return;
  }

  const info = document.createElement("p");
  info.textContent = animal.description;
  container.appendChild(info);

  const instruction = document.createElement("p");
  instruction.className = "feature-note";
  instruction.textContent = "Tap a symptom to inspect and learn how to help.";
  container.appendChild(instruction);

  const symptomGrid = document.createElement("div");
  symptomGrid.className = "tile-grid two";
  animal.symptoms.forEach((symptom) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile-button";
    tile.dataset.action = "choose-symptom";
    tile.dataset.symptom = symptom.id;
    tile.dataset.selected = symptom.id === state.diagnosisId ? "true" : "false";
    tile.innerHTML = `<span class="tile-title">${symptom.title}</span><span class="tile-note">${state.diagnosisId === symptom.id ? symptom.detail : "Tap to inspect."}</span>`;
    symptomGrid.appendChild(tile);
  });
  container.appendChild(symptomGrid);

  if (state.diagnosisId) {
    const diagnosisCard = document.createElement("div");
    diagnosisCard.className = "card mini-game-card";

    const challengeTitle = document.createElement("h3");
    challengeTitle.textContent = "Diagnosis mini-game";
    diagnosisCard.appendChild(challengeTitle);

    const challengePrompt = document.createElement("p");
    challengePrompt.className = "mini-game-prompt";
    challengePrompt.textContent = state.miniGameState?.question || "Solve the diagnosis challenge to unlock treatment.";
    diagnosisCard.appendChild(challengePrompt);

    if (!state.miniGameComplete && state.miniGameState?.choices) {
      const choiceGrid = document.createElement("div");
      choiceGrid.className = "tile-grid two";
      state.miniGameState.choices.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.type = "button";
        choiceButton.className = "tile-button choice-button";
        choiceButton.dataset.action = "diagnosis-choice";
        choiceButton.dataset.choice = choice.id;
        choiceButton.innerHTML = `<span class="tile-title">${choice.label}</span>`;
        choiceGrid.appendChild(choiceButton);
      });
      diagnosisCard.appendChild(choiceGrid);
    } else if (state.miniGameComplete) {
      const completeText = document.createElement("p");
      completeText.className = "feature-note";
      completeText.textContent = "Diagnosis challenge complete. Proceed to treatment when ready.";
      diagnosisCard.appendChild(completeText);
    }

    container.appendChild(diagnosisCard);
  }

  const proceedButton = document.createElement("button");
  proceedButton.type = "button";
  proceedButton.className = "action-button primary";
  proceedButton.textContent = state.miniGameComplete ? "Proceed to treatment" : "Solve diagnosis challenge";
  proceedButton.disabled = !state.miniGameComplete;
  proceedButton.dataset.action = "go-to-treatment";
  container.appendChild(proceedButton);
}

function renderTreatment(container) {
  const animal = getCurrentAnimal();
  if (!animal) {
    setArea("reception");
    return;
  }

  if (!state.diagnosisId) {
    setArea("examination");
    return;
  }

  const selectedSymptom = animal.symptoms.find((entry) => entry.id === state.diagnosisId);
  const prompt = document.createElement("p");
  prompt.textContent = selectedSymptom
    ? `Diagnosis: ${selectedSymptom.title}. Choose the tool that matches.`
    : "Choose the tool that matches the symptom you found.";
  container.appendChild(prompt);

  if (state.miniGameState?.mode) {
    const miniNote = document.createElement("p");
    miniNote.className = "feature-note";
    miniNote.textContent = `You solved the ${state.miniGameState.mode.replace("-", " ")} challenge.`;
    container.appendChild(miniNote);
  }

  const toolGrid = document.createElement("div");
  toolGrid.className = "tile-grid two";
  animal.tools.forEach((tool) => {
    const toolButton = document.createElement("button");
    toolButton.type = "button";
    toolButton.className = "tile-button";
    toolButton.dataset.action = "choose-tool";
    toolButton.dataset.tool = tool.id;
    toolButton.innerHTML = `<span class="tile-title">${tool.title}</span><span class="tile-note">${tool.note}</span>`;
    toolGrid.appendChild(toolButton);
  });
  container.appendChild(toolGrid);

  const helpText = document.createElement("p");
  helpText.className = "feature-note";
  helpText.textContent = "If the first tool doesn't work, try another one that fits the symptom.";
  container.appendChild(helpText);
}

function renderCelebration(container) {
  const animal = getCurrentAnimal();
  const message = document.createElement("p");
  message.textContent = animal
    ? `${animal.name} is feeling much better thanks to you!`
    : "Your patient recovered in the clinic.";
  container.appendChild(message);

  const summaryGrid = document.createElement("div");
  summaryGrid.className = "tile-grid two";

  const starsCard = document.createElement("div");
  starsCard.className = "status-box";
  starsCard.innerHTML = `<span class="status-label">Stars</span><strong>${saved.stars}</strong>`;
  summaryGrid.appendChild(starsCard);

  const curedCard = document.createElement("div");
  curedCard.className = "status-box";
  curedCard.innerHTML = `<span class="status-label">Pets helped</span><strong>${saved.cured}</strong>`;
  summaryGrid.appendChild(curedCard);

  container.appendChild(summaryGrid);

  const actionRow = document.createElement("div");
  actionRow.className = "tile-row";

  const photoButton = document.createElement("button");
  photoButton.type = "button";
  photoButton.className = "action-button secondary";
  photoButton.textContent = "Take a happy photo";
  photoButton.dataset.action = "take-photo";
  actionRow.appendChild(photoButton);

  const stickerButton = document.createElement("button");
  stickerButton.type = "button";
  stickerButton.className = "action-button secondary";
  stickerButton.textContent = "Earn a sticker";
  stickerButton.dataset.action = "collect-sticker";
  actionRow.appendChild(stickerButton);

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "action-button primary";
  nextButton.textContent = "Next patient";
  nextButton.dataset.action = "next-patient";
  actionRow.appendChild(nextButton);

  container.appendChild(actionRow);
}

function renderGallery(container) {
  const message = document.createElement("p");
  message.textContent = "Your photo gallery saves happy recovery moments.";
  container.appendChild(message);

  if (!saved.photoAlbum.length) {
    const empty = document.createElement("p");
    empty.className = "feature-note";
    empty.textContent = "No photos yet. Help a patient and take a photo after recovery.";
    container.appendChild(empty);
    return;
  }

  const galleryGrid = document.createElement("div");
  galleryGrid.className = "card-grid";
  saved.photoAlbum.slice(-6).reverse().forEach((photo) => {
    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";
    const animal = getAnimal(photo.id);
    photoCard.innerHTML = `\n      <span class="photo-emoji">${animal?.name || "📸"}</span>\n      <p class="photo-title">${animal?.name || "Happy photo"}</p>\n      <p class="photo-meta">Taken on ${new Date(photo.takenAt).toLocaleDateString()}</p>\n    `;
    galleryGrid.appendChild(photoCard);
  });

  container.appendChild(galleryGrid);
}

function renderStickers(container) {
  const message = document.createElement("p");
  message.textContent = "Collect stickers as you care for patients.";
  container.appendChild(message);

  if (!saved.stickerIds.length) {
    const empty = document.createElement("p");
    empty.className = "feature-note";
    empty.textContent = "No stickers yet. Earn one by celebrating a recovery.";
    container.appendChild(empty);
    return;
  }

  const stickerGrid = document.createElement("div");
  stickerGrid.className = "card-grid";
  STICKERS.filter((sticker) => saved.stickerIds.includes(sticker.id)).forEach((sticker) => {
    const stickerCard = document.createElement("div");
    stickerCard.className = "sticker-card";
    stickerCard.innerHTML = `\n      <span class="sticker-emoji">${sticker.emoji}</span>\n      <p class="sticker-title">${sticker.title}</p>\n      <p class="sticker-meta">Collected</p>\n    `;
    stickerGrid.appendChild(stickerCard);
  });

  container.appendChild(stickerGrid);
}

function renderGarden(container) {
  const message = document.createElement("p");
  message.textContent = `Your clinic is ${TIER_LABELS[saved.clinicTier]}. Keep caring to grow.`;
  container.appendChild(message);

  const giftBox = document.createElement("div");
  giftBox.className = "status-box";
  giftBox.innerHTML = `<p class="cheer-label">Daily gift status</p><strong>${saved.dailyGift === todayString() ? "Claimed" : "Ready to claim"}</strong>`;
  container.appendChild(giftBox);

  const dailyButton = document.createElement("button");
  dailyButton.type = "button";
  dailyButton.className = "action-button primary";
  dailyButton.textContent = saved.dailyGift === todayString() ? "Already claimed" : "Claim daily gift";
  dailyButton.disabled = saved.dailyGift === todayString();
  dailyButton.dataset.action = "claim-daily-gift";
  container.appendChild(dailyButton);

  const advice = document.createElement("p");
  advice.className = "feature-note";
  advice.textContent = "A daily gift gives decorations and a star to help your clinic glow.";
  container.appendChild(advice);
}

function updateNavHighlights() {
  elements.navButtons.forEach((button) => {
    const pressed = button.dataset.area === state.area ? "true" : "false";
    button.setAttribute("aria-pressed", pressed);
  });
}

function handleRootClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const action = button.dataset.action;

  if (action === "begin-patient") {
    startNewPatient();
  } else if (action === "shuffle-queue") {
    saved.queue = shuffle(saved.queue);
    saveAll();
    showAssistant("The waiting list has been refreshed.");
    render();
  } else if (action === "preview-patient") {
    state.currentAnimalId = button.dataset.animal;
    state.diagnosisId = null;
    state.diagnosisMode = null;
    state.miniGameComplete = false;
    state.miniGameState = null;
    state.treatmentChoice = null;
    state.treatmentComplete = false;
    showAssistant("Previewing a different patient. Start the examination when ready.");
    render();
  } else if (action === "choose-symptom") {
    initializeDiagnosisMiniGame(button.dataset.symptom);
    render();
  } else if (action === "diagnosis-choice") {
    evaluateDiagnosisChoice(button.dataset.choice);
    render();
  } else if (action === "go-to-treatment") {
    if (!state.diagnosisId) {
      showAssistant("Choose a symptom first.");
      return;
    }
    if (!state.miniGameComplete) {
      showAssistant("Finish the diagnosis challenge before treatment.");
      return;
    }
    setArea("treatment");
    showAssistant("Choose the tool that matches the symptom.");
  } else if (action === "choose-tool") {
    completeTreatment(button.dataset.tool);
  } else if (action === "take-photo") {
    takePhoto();
  } else if (action === "collect-sticker") {
    collectSticker();
  } else if (action === "next-patient") {
    state.currentAnimalId = null;
    state.diagnosisId = null;
    state.treatmentChoice = null;
    state.treatmentComplete = false;
    setArea("reception");
    showAssistant("A new patient is waiting in reception.");
  } else if (action === "claim-daily-gift") {
    claimDailyGift();
  }
}

function handleNavClick(event) {
  const button = event.target.closest("button[data-area]");
  if (!button) return;
  const targetArea = button.dataset.area;

  if (targetArea === "treatment" && state.diagnosisId && !state.miniGameComplete) {
    showAssistant("Finish the diagnosis challenge in examination first.");
    setArea("examination");
    return;
  }

  setArea(targetArea);
  showAssistant(`You are now in the ${button.textContent} room.`);
}

function init() {
  loadSaved();
  updateStats();
  render();
  document.body.addEventListener("click", handleRootClick);
  document.querySelector(".clinic-map").addEventListener("click", handleNavClick);
  window.addEventListener("online", updateOfflineStatus);
  window.addEventListener("offline", updateOfflineStatus);
  updateOfflineStatus();
}

init();

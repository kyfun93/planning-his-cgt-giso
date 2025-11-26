// Planning HIS avec Supabase backend

// === Configuration Supabase ===
// ⚠️ REMPLACEZ CES VALEURS PAR VOS CRÉDENTIALS SUPABASE
const SUPABASE_URL = "https://xierjvlyymyfmhojtseh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXJqdmx5eW15Zm1ob2p0c2VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDUxODUsImV4cCI6MjA3ODcyMTE4NX0.ZvX_9vKBhy8Bjl6Z-ocLS641r1I5jB7hCC6KC0kox38";

// Initialisation du client Supabase
// Le script Supabase doit être chargé avant app.js (voir index.html)
let supabase = null;

function initSupabase() {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== "VOTRE_SUPABASE_URL") {
    try {
      // Supabase est disponible globalement via le CDN
      // La variable peut être supabaseJs, supabase, ou window.supabaseJs selon la version
      const supabaseLib = window.supabaseJs || window.supabase || (typeof supabaseJs !== "undefined" ? supabaseJs : null);
      
      if (supabaseLib && supabaseLib.createClient) {
        supabase = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("✅ Client Supabase initialisé");
        return true;
      } else {
        console.warn("⚠️ Supabase JS non chargé. Vérifiez que le script est bien inclus dans index.html");
        return false;
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation de Supabase:", error);
      return false;
    }
  } else {
    console.warn("⚠️ Supabase non configuré. Veuillez remplir SUPABASE_URL et SUPABASE_ANON_KEY dans app.js");
    return false;
  }
}

// Initialiser Supabase au chargement
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSupabase);
} else {
  initSupabase();
}

// === Année de démo = année actuelle ===
const DEMO_YEAR = new Date().getFullYear();
const DEMO_YEAR_STR = String(DEMO_YEAR);

// --- Données ---

const COLLEAGUES = [
    { id: "pascal_akriche", name: "Pascal AKRICHE" },
    { id: "tarris_andet", name: "Tarris ANDET" },
    { id: "andre_bazin", name: "André BAZIN" },
    { id: "stephane_bonnenfant", name: "Stéphane BONNENFANT" },
    { id: "yves_boileau", name: "Yves BOILEAU" },
    { id: "benjamin_brouchet", name: "Benjamin BROUCHET" },
    { id: "michael_bureau", name: "Michael BUREAU" },
    { id: "maxime_de_aguiar", name: "Maxime DE AGUIAR" },
    { id: "mamadou_diallo", name: "Mamadou DIALLO" },
    { id: "jerome_godefroy", name: "Jérôme GODEFROY" },
    { id: "samir_jablaoui", name: "Samir JABLAOUI" },
    { id: "fabrice_keller", name: "Fabrice KELLER" },
    { id: "david_lecler", name: "David LECLER" },
    { id: "valentin_lerendu", name: "Valentin LERENDU" },
    { id: "sebastien_lesgent", name: "Sébastien LESGENT" },
    { id: "lamini_magassa", name: "Lamini MAGASSA" },
    { id: "jeanrene_morvan", name: "Jean-René MORVAN" },
    { id: "demba_semega", name: "Demba SEMEGA" },
    { id: "stephane_tondut", name: "Stéphane TONDUT" },
    { id: "yannick_trebouta", name: "Yannick TREBOUTA" },
    { id: "eric_turban", name: "Éric TURBAN" },
    { id: "wilfried_van_niel", name: "Wilfried VAN NIEL" }
  ];
  
// Structure hiérarchique des attachements
// Format: { mainId, mainLabel, subId, subLabel, slotType }
const ATTACHMENT_HIERARCHY = [
  // A. VOIE
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_massy", subLabel: "Massy", slotType: "Jour" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_massy", subLabel: "Massy", slotType: "Nuit" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_nanterre", subLabel: "Nanterre", slotType: "Jour" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_nanterre", subLabel: "Nanterre", slotType: "Nuit" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_nogent", subLabel: "Nogent", slotType: "Jour" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_nogent", subLabel: "Nogent", slotType: "Nuit" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_republique", subLabel: "République", slotType: "Jour" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_evs", subLabel: "EVS", slotType: "Nuit" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_villette", subLabel: "Villette", slotType: "Jour" },
  { mainId: "voie", mainLabel: "VOIE", subId: "voie_villette", subLabel: "Villette", slotType: "Nuit" },
  
  // B. MCBT
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_blr", subLabel: "BLR", slotType: "Équipe nuit" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_blr", subLabel: "BLR", slotType: "Équipe A" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_blr", subLabel: "BLR", slotType: "Équipe B" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_blr", subLabel: "BLR", slotType: "Équipe C" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_vdf", subLabel: "VDF", slotType: "Matin" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_vdf", subLabel: "VDF", slotType: "Après-Midi" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_ntr4", subLabel: "NTR4", slotType: "Équipe nuit" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_ntr4", subLabel: "NTR4", slotType: "Équipe A" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_ntr4", subLabel: "NTR4", slotType: "Équipe B" },
  { mainId: "mcbt", mainLabel: "MCBT", subId: "mcbt_ntr4", subLabel: "NTR4", slotType: "Équipe C" },
  
  // C. EMHT
  { mainId: "emht", mainLabel: "EMHT", subId: "emht_toul", subLabel: "Toul", slotType: "EMI" },
  { mainId: "emht", mainLabel: "EMHT", subId: "emht_toul", subLabel: "Toul", slotType: "PEF Câbles" },
  { mainId: "emht", mainLabel: "EMHT", subId: "emht_toul", subLabel: "Toul", slotType: "Lachaise" },
  { mainId: "emht", mainLabel: "EMHT", subId: "emht_toul", subLabel: "Toul", slotType: "Denfert" },
  { mainId: "emht", mainLabel: "EMHT", subId: "emht_toul", subLabel: "Toul", slotType: "SITE" },
  { mainId: "emht", mainLabel: "EMHT", subId: "emht_toul", subLabel: "Toul", slotType: "Traction M" },
  
  // D. CT
  { mainId: "ct", mainLabel: "CT", subId: "ct_bourdon_sig_3x8", subLabel: "Bourdon SIG 3×8", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_bourdon_sig", subLabel: "Bourdon SIG", slotType: "Nuit" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_ims_schematheque", subLabel: "IMS schémathèque", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_ims_vas", subLabel: "IMS VAS", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_ims_pst", subLabel: "IMS PST", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_denfert", subLabel: "Denfert", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_bourdon_mc", subLabel: "Bourdon MC", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_bourdon_mc", subLabel: "Bourdon MC", slotType: "Nuit" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_bourdon_log", subLabel: "Bourdon LOG", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_bourdon_esae_m", subLabel: "Bourdon ESAE M", slotType: "Jour" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_nanterre", subLabel: "Nanterre", slotType: "Après-Midi" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_nanterre", subLabel: "Nanterre", slotType: "Nuit" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_nanterre", subLabel: "Nanterre", slotType: "Log" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_joinville", subLabel: "Joinville", slotType: "Après-Midi" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_joinville", subLabel: "Joinville", slotType: "Nuit" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_blr", subLabel: "BLR", slotType: "Après-Midi" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_blr", subLabel: "BLR", slotType: "Matin" },
  { mainId: "ct", mainLabel: "CT", subId: "ct_blr", subLabel: "BLR", slotType: "Nuit" },
  
  // E. ESO
  { mainId: "eso", mainLabel: "ESO", subId: "eso_barbes", subLabel: "Barbès", slotType: "Matin" },
  { mainId: "eso", mainLabel: "ESO", subId: "eso_barbes", subLabel: "Barbès", slotType: "Après-Midi" },
  { mainId: "eso", mainLabel: "ESO", subId: "eso_csa", subLabel: "CSA", slotType: "" },
  { mainId: "eso", mainLabel: "ESO", subId: "eso_cpmo", subLabel: "CPMO", slotType: "Jour VDF" },
  { mainId: "eso", mainLabel: "ESO", subId: "eso_cpmo", subLabel: "CPMO", slotType: "Nuit Chanzy" },
  { mainId: "eso", mainLabel: "ESO", subId: "eso_barbes", subLabel: "Barbès", slotType: "Nuit" },
  { mainId: "eso", mainLabel: "ESO", subId: "eso_chanzy", subLabel: "Chanzy", slotType: "Nuit" },
  
  // F. LEM
  { mainId: "lem", mainLabel: "LEM", subId: "lem_boissy", subLabel: "Boissy", slotType: "Jour" }
];

// Fonction pour obtenir les attachements principaux uniques
function getMainAttachments() {
  const unique = new Map();
  ATTACHMENT_HIERARCHY.forEach(item => {
    if (!unique.has(item.mainId)) {
      unique.set(item.mainId, { id: item.mainId, label: item.mainLabel });
    }
  });
  return Array.from(unique.values());
}

// Fonction pour obtenir les sous-attachements selon l'attachement principal
function getSubAttachments(mainId) {
  if (!mainId) return [];
  const unique = new Map();
  ATTACHMENT_HIERARCHY
    .filter(item => item.mainId === mainId)
    .forEach(item => {
      if (!unique.has(item.subId)) {
        unique.set(item.subId, { 
          id: item.subId, 
          label: item.subLabel || item.subId 
        });
      }
    });
  return Array.from(unique.values());
}

// Fonction pour obtenir les types de slots selon mainId et subId
function getSlotTypes(mainId, subId) {
  if (!mainId) return [];
  return ATTACHMENT_HIERARCHY
    .filter(item => item.mainId === mainId && item.subId === subId)
    .map(item => item.slotType)
    .filter((type, index, arr) => arr.indexOf(type) === index); // unique
}
  
  // --- État ---
  
  const state = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(), // 0-11
  selectedMainId: "all",      // "all" pour tous les sites, ou un mainId spécifique
  selectedSubId: "all",        // "all" pour tous les sous-sites, ou un subId spécifique
  selectedSlotType: "all",     // "all" pour tous les types, ou un slotType spécifique
  selectedColleagueId: "",
  step: "A",                 // étape actuelle : A, B, ou C
  slots: [],                 // slots chargés depuis Supabase
  registrations: []          // inscriptions chargées depuis Supabase
  };
  
  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ];

// === Fonctions Supabase ===

// Charger les slots pour un mois donné
async function loadSlotsForMonth(year, month) {
  if (!supabase) {
    console.warn("⚠️ Supabase non configuré, utilisation de données vides");
    return [];
  }

  try {
    // Calculer le premier et dernier jour du mois
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = formatDateForDB(firstDay);
    const endDate = formatDateForDB(lastDay);

    const { data, error } = await supabase
      .from("his_slots")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true });

    if (error) {
      console.error("❌ Erreur lors du chargement des slots:", error);
      return [];
    }

    console.log(`✅ ${data.length} slot(s) chargé(s) pour ${monthNames[month]} ${year}`);
    return data || [];
  } catch (error) {
    console.error("❌ Erreur lors du chargement des slots:", error);
    return [];
  }
}

// Charger toutes les inscriptions
async function loadRegistrations() {
  if (!supabase) {
    console.warn("⚠️ Supabase non configuré, utilisation de données vides");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("his_registrations")
      .select("*");

    if (error) {
      console.error("❌ Erreur lors du chargement des inscriptions:", error);
      return [];
    }

    console.log(`✅ ${data.length} inscription(s) chargée(s)`);
    return data || [];
  } catch (error) {
    console.error("❌ Erreur lors du chargement des inscriptions:", error);
    return [];
  }
}

// Charger l'historique des créneaux passés
async function loadHistorySlots() {
  if (!supabase) {
    console.warn("⚠️ Supabase non configuré, utilisation de données vides");
    return [];
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = formatDateForDB(today);

    const { data, error } = await supabase
      .from("his_slots")
      .select("*")
      .lt("date", todayStr)
      .order("date", { ascending: false });

    if (error) {
      console.error("❌ Erreur lors du chargement de l'historique:", error);
      return [];
    }

    console.log(`✅ ${data.length} créneau(x) historique(s) chargé(s)`);
    return data || [];
  } catch (error) {
    console.error("❌ Erreur lors du chargement de l'historique:", error);
    return [];
  }
}

// Créer un nouveau slot
async function createSlot(slotData) {
  if (!supabase) {
    console.error("❌ Supabase non configuré");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("his_slots")
      .insert([slotData])
      .select()
      .single();

    if (error) {
      console.error("❌ Erreur lors de la création du slot:", error);
      throw error;
    }

    console.log("✅ Slot créé:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur lors de la création du slot:", error);
    throw error;
  }
}

// S'inscrire à un slot
async function registerToSlot(slotId, colleagueId) {
  if (!supabase) {
    console.error("❌ Supabase non configuré");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("his_registrations")
      .insert([{ slot_id: slotId, colleague_id: colleagueId }])
      .select()
      .single();

    if (error) {
      console.error("❌ Erreur lors de l'inscription:", error);
      throw error;
    }

    console.log("✅ Inscription créée:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur lors de l'inscription:", error);
    throw error;
  }
}

// Se désinscrire d'un slot
async function unregisterFromSlot(slotId, colleagueId) {
  if (!supabase) {
    console.error("❌ Supabase non configuré");
    return false;
  }

  try {
    const { error } = await supabase
      .from("his_registrations")
      .delete()
      .eq("slot_id", slotId)
      .eq("colleague_id", colleagueId);

    if (error) {
      console.error("❌ Erreur lors de la désinscription:", error);
      throw error;
    }

    console.log("✅ Désinscription réussie");
    return true;
  } catch (error) {
    console.error("❌ Erreur lors de la désinscription:", error);
    throw error;
  }
}

// Supprimer un slot (et toutes ses inscriptions via CASCADE)
async function deleteSlot(slotId) {
  if (!supabase) {
    console.error("❌ Supabase non configuré");
    throw new Error("Supabase n'est pas initialisé");
  }

  console.log("🔍 Suppression du slot avec ID:", slotId);
  console.log("🔍 Type de slotId:", typeof slotId);

  try {
    // D'abord, supprimer toutes les inscriptions associées manuellement
    // (CASCADE devrait le faire automatiquement, mais on le fait explicitement pour être sûr)
    const { error: deleteRegsError, count: regsCount } = await supabase
      .from("his_registrations")
      .delete({ count: "exact" })
      .eq("slot_id", slotId);

    if (deleteRegsError) {
      console.warn("⚠️ Erreur lors de la suppression des inscriptions:", deleteRegsError);
      // On continue quand même, CASCADE devrait gérer
    } else {
      console.log(`✅ ${regsCount || 0} inscription(s) supprimée(s) pour le slot:`, slotId);
    }

    // Ensuite, supprimer le slot
    const { data, error, count } = await supabase
      .from("his_slots")
      .delete({ count: "exact" })
      .eq("id", slotId);

    if (error) {
      console.error("❌ Erreur Supabase lors de la suppression:", error);
      console.error("❌ Code d'erreur:", error.code);
      console.error("❌ Message d'erreur:", error.message);
      console.error("❌ Détails:", error.details);
      console.error("❌ Hint:", error.hint);
      throw new Error(`Erreur Supabase: ${error.message || error.code || "Erreur inconnue"}`);
    }

    if (count === 0) {
      console.warn("⚠️ Aucun slot supprimé. Le slot avec cet ID existe-t-il ?", slotId);
      throw new Error("Aucun slot trouvé avec cet ID");
    }

    console.log("✅ Slot supprimé avec succès:", slotId);
    console.log("✅ Nombre de lignes supprimées:", count);
    console.log("✅ Données retournées:", data);
    return true;
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du slot:", error);
    throw error;
  }
}

// Utilitaires pour les dates
function formatDateForDB(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDate(year, monthIndex, day) {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}
  
  // --- Initialisation ---
  
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Initialisation de l'application");
  
  // S'assurer que Supabase est initialisé
  if (!supabase) {
    initSupabase();
  }
  
  initSteps();
  initColleagueSelect();
    initMonthNav();
    initModal();
  initAddSlotModal();
  initInactiveSlotsModal();
  initHistoryModal();
  
  // Charger les données depuis Supabase
  await refreshData();
  
  
    renderCalendar();
  console.log("✅ Initialisation terminée");
});

// Fonction pour rafraîchir les données depuis Supabase
async function refreshData() {
  // Charger les slots du mois courant
  state.slots = await loadSlotsForMonth(state.currentYear, state.currentMonth);
  
  // Charger toutes les inscriptions
  state.registrations = await loadRegistrations();
}

// --- Menu déroulant hiérarchique compact ---

function initSteps() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  
  if (!dropdownMenu) return;

  dropdownMenu.innerHTML = "";
  // Le menu reste caché par défaut

  // Créer le menu hiérarchique
  getMainAttachments().forEach(main => {
    const mainItem = document.createElement("div");
    mainItem.className = "pk-dropdown-item pk-dropdown-main";
    
    const mainLink = document.createElement("a");
    mainLink.href = "#";
    mainLink.textContent = main.label;
    mainLink.className = "pk-dropdown-link";
    mainLink.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSubmenu(mainItem, main.id);
    });
    
    const subMenu = document.createElement("div");
    subMenu.className = "pk-dropdown-submenu pk-dropdown-hidden";
    subMenu.dataset.mainId = main.id;
    
    // Créer les sous-éléments (B)
    const subAttachments = getSubAttachments(main.id);
    subAttachments.forEach(sub => {
      const subItem = document.createElement("div");
      subItem.className = "pk-dropdown-item pk-dropdown-sub";
      
      const subLink = document.createElement("a");
      subLink.href = "#";
      subLink.textContent = sub.label;
      subLink.className = "pk-dropdown-link";
      subLink.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSlotMenu(subItem, main.id, sub.id);
      });
      
      const slotMenu = document.createElement("div");
      slotMenu.className = "pk-dropdown-submenu pk-dropdown-hidden";
      slotMenu.dataset.mainId = main.id;
      slotMenu.dataset.subId = sub.id;
      
      // Créer les types de slots (C)
      const slotTypes = getSlotTypes(main.id, sub.id);
      slotTypes.forEach(slotType => {
        const slotItem = document.createElement("div");
        slotItem.className = "pk-dropdown-item pk-dropdown-slot";
        
        const slotLink = document.createElement("a");
        slotLink.href = "#";
        slotLink.textContent = slotType || "(sans type)";
        slotLink.className = "pk-dropdown-link";
        slotLink.addEventListener("click", async (e) => {
          e.preventDefault();
          // Valider la sélection
          state.selectedMainId = main.id;
          state.selectedSubId = sub.id;
          state.selectedSlotType = slotType;
          
          // Fermer le menu
          closeDropdown();
          
          // Recharger les données et afficher le calendrier
          await refreshData();
      renderCalendar();
    });
  
        slotItem.appendChild(slotLink);
        slotMenu.appendChild(slotItem);
      });
      
      subItem.appendChild(subLink);
      subItem.appendChild(slotMenu);
      subMenu.appendChild(subItem);
    });
    
    mainItem.appendChild(mainLink);
    mainItem.appendChild(subMenu);
    dropdownMenu.appendChild(mainItem);
  });

  // Fermer le menu si on clique ailleurs
  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target)) {
      closeDropdown();
    }
  });
}

function toggleDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (dropdownMenu) {
    const isHidden = dropdownMenu.classList.contains("pk-dropdown-hidden");
    dropdownMenu.classList.toggle("pk-dropdown-hidden");
  }
}

function closeDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (dropdownMenu) {
    dropdownMenu.classList.add("pk-dropdown-hidden");
    // Fermer tous les sous-menus
    document.querySelectorAll(".pk-dropdown-submenu").forEach(menu => {
      menu.classList.add("pk-dropdown-hidden");
    });
  }
}

function toggleSubmenu(mainItem, mainId) {
  const subMenu = mainItem.querySelector(".pk-dropdown-submenu");
  if (!subMenu) return;
  
  // Fermer tous les autres sous-menus de niveau principal
  document.querySelectorAll(".pk-dropdown-submenu[data-main-id]").forEach(menu => {
    if (menu !== subMenu) {
      menu.classList.add("pk-dropdown-hidden");
    }
  });
  
  // Toggle le sous-menu
  subMenu.classList.toggle("pk-dropdown-hidden");
}

function toggleSlotMenu(subItem, mainId, subId) {
  const slotMenu = subItem.querySelector(".pk-dropdown-submenu");
  if (!slotMenu) return;
  
  // Fermer tous les autres sous-menus de slots
  document.querySelectorAll(".pk-dropdown-submenu[data-sub-id]").forEach(menu => {
    if (menu !== slotMenu) {
      menu.classList.add("pk-dropdown-hidden");
    }
  });
  
  // Toggle le menu de slots
  slotMenu.classList.toggle("pk-dropdown-hidden");
}

// --- Sélecteur collègues ---

function initColleagueSelect() {
  const collSelect = document.getElementById("colleagueSelect");
  if (!collSelect) return;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Je suis…";
    collSelect.appendChild(placeholder);
  
    COLLEAGUES.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.name;
      collSelect.appendChild(opt);
    });
  
    collSelect.addEventListener("change", () => {
      state.selectedColleagueId = collSelect.value;
      const modal = document.getElementById("dayModal");
    if (modal && !modal.classList.contains("pk-modal-hidden") && modal.dataset.date) {
        openDayModal(modal.dataset.date);
      }
    });
  }
  
  // --- Navigation mois ---
  
  function initMonthNav() {
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
  
  prevBtn.addEventListener("click", async () => {
      state.currentMonth--;
      if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentYear--;
      }
    await refreshData();
      renderCalendar();
    });
  
  nextBtn.addEventListener("click", async () => {
      state.currentMonth++;
      if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentYear++;
      }
    await refreshData();
      renderCalendar();
    });
  }
  
  // --- Rendu calendrier ---
  
  function renderCalendar() {
  // Si "Tous les sites" est sélectionné, on peut afficher directement
  // Sinon, vérifier que toutes les étapes sont validées
  if (state.selectedMainId !== "all" && (!state.selectedMainId || !state.selectedSubId || !state.selectedSlotType)) {
    const cal = document.getElementById("calendar");
    if (cal) {
      cal.innerHTML = "<p style='text-align: center; padding: 2rem; color: var(--text-muted);'>Veuillez compléter les étapes A, B et C pour afficher le calendrier, ou sélectionnez 'Tous les sites' pour une vue globale.</p>";
    }
    return;
  }

    const cal = document.getElementById("calendar");
    const monthLabel = document.getElementById("currentMonthLabel");
  if (!cal || !monthLabel) {
    console.error("❌ Éléments calendrier non trouvés");
    return;
  }
  
    cal.innerHTML = "";
  
    monthLabel.textContent =
      monthNames[state.currentMonth] + " " + state.currentYear;
  
    const year = state.currentYear;
    const month = state.currentMonth;
  
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const today = new Date();
    const todayY = today.getFullYear();
    const todayM = today.getMonth();
    const todayD = today.getDate();
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day);
  
      const dayDiv = document.createElement("div");
      dayDiv.className = "pk-day";
      dayDiv.dataset.date = dateStr;
  
      const num = document.createElement("div");
      num.className = "pk-day-number";
      num.textContent = day;
      dayDiv.appendChild(num);
  
    // Filtrage selon mainId, subId et slotType (ou "all" pour tout afficher)
    const daySlots = state.slots.filter(s => {
      if (s.date !== dateStr) return false;
      if (state.selectedMainId !== "all" && s.main_id !== state.selectedMainId) return false;
      if (state.selectedSubId !== "all" && s.sub_id !== state.selectedSubId) return false;
      if (state.selectedSlotType !== "all" && s.slot_type !== state.selectedSlotType) return false;
      return true;
    });
  
      const summary = document.createElement("div");
      summary.className = "pk-day-slots-summary";
  
      if (daySlots.length === 0) {
        summary.textContent = "Aucun HIS";
      } else {
        // Couleurs différentes pour chaque créneau si plusieurs
        const slotColors = [
          "#00e5ff", // Cyan (couleur principale)
          "#ff4df0", // Rose/Magenta (accent)
          "#00ff88", // Vert
          "#ffaa00", // Orange
          "#ff0066", // Rose foncé
          "#00d4ff", // Bleu clair
        ];
        
        summary.innerHTML = daySlots
          .map((slot, index) => {
            const count = state.registrations.filter(r => r.slot_id === slot.id).length;
            // Si vue globale, afficher le site complet, sinon juste le label
            let displayText;
            if (state.selectedMainId === "all") {
              const mainLabel = getMainAttachmentLabel(slot.main_id);
              const subLabel = getSubAttachmentLabel(slot.sub_id);
              displayText = `${mainLabel} → ${subLabel} → ${slot.slot_type} : ${count}/${slot.max_places}`;
            } else {
              const mainLabel = getMainAttachmentLabel(slot.main_id);
              const subLabel = getSubAttachmentLabel(slot.sub_id);
              const displayLabel = subLabel ? `${subLabel} – ${slot.label || slot.slot_type}` : `${mainLabel} – ${slot.label || slot.slot_type}`;
              displayText = `${displayLabel} : ${count}/${slot.max_places}`;
            }
            
            // Si plusieurs créneaux, utiliser une couleur différente pour chacun
            let colorStyle = "";
            if (daySlots.length > 1) {
              const color = slotColors[index % slotColors.length];
              colorStyle = ` style="color: ${color};"`;
            }
            
            // Mettre en gras avec couleur si plusieurs créneaux
            return `<strong${colorStyle}>${displayText}</strong>`;
          })
          .join("<br>");
      }
  
      dayDiv.appendChild(summary);
  
      // style past / today
      if (year === todayY && month === todayM && day === todayD) {
        dayDiv.classList.add("pk-day--today");
      } else {
        const cellDate = new Date(year, month, day);
        if (cellDate < new Date(todayY, todayM, todayD)) {
          dayDiv.classList.add("pk-day--past");
        }
      }
  
      if (daySlots.length > 0) {
      dayDiv.style.cursor = "pointer";
        dayDiv.addEventListener("click", () => openDayModal(dateStr));
      } else {
        dayDiv.style.cursor = "default";
      }
  
      cal.appendChild(dayDiv);
    }
  }
  
  // --- Modale ---
  
  function initModal() {
    const closeBtn = document.getElementById("closeDayModal");
    const modal = document.getElementById("dayModal");

  if (!closeBtn || !modal) {
    console.error("❌ Éléments modale non trouvés");
    return;
  }
  
    closeBtn.addEventListener("click", closeDayModal);
  
    modal.addEventListener("click", e => {
      if (e.target === modal) closeDayModal();
    });
  }

// === Inactifs 2 mois ===

// Charge les combinaisons (main_id, sub_id, slot_type) dont le dernier HIS < J-60
async function loadInactiveCombinationsLast2Months() {
  if (!supabase) {
    console.warn("⚠️ Supabase non configuré pour loadInactiveCombinationsLast2Months");
    return [];
  }
  try {
    // Baseline remise à aujourd'hui : on considère qu'aucune combinaison n'est en retard
    console.log("⏱️ Baseline activité réinitialisée à aujourd'hui: aucune combinaison inactive retournée.");
    return [];
    
    const today = new Date();
    const threshold = new Date(today);
    threshold.setDate(threshold.getDate() - 60);
    const thresholdStr = formatDateForDB(threshold);
    
    // Récupérer toutes les dates, triées décroissant, puis réduire côté JS
    const { data, error } = await supabase
      .from("his_slots")
      .select("main_id, sub_id, slot_type, date")
      .order("date", { ascending: false });
    
    if (error) {
      console.error("❌ Erreur agrégat inactifs:", error);
      return [];
    }

    // Réduire pour obtenir la dernière date par combinaison
    const lastByCombo = new Map();
    (data || []).forEach(row => {
      const key = `${row.main_id}||${row.sub_id}||${row.slot_type}`;
      if (!lastByCombo.has(key)) {
        lastByCombo.set(key, row.date);
      }
    });

    const inactive = Array.from(lastByCombo.entries())
      .filter(([, lastDate]) => {
        const last = new Date(lastDate);
        return isFinite(last.getTime()) && last < threshold;
      })
      .map(([key, lastDate]) => {
        const [mainId, subId, slotType] = key.split("||");
        return { mainId, subId, slotType, lastDate };
      });
    
    // Optionnel: détecter les combinaisons jamais planifiées à partir de la config
    try {
      const existingKeySet = new Set(Array.from(lastByCombo.keys()));
      ATTACHMENT_HIERARCHY.forEach(item => {
        const key = `${item.mainId}||${item.subId}||${item.slotType}`;
        if (!existingKeySet.has(key)) {
          inactive.push({
            mainId: item.mainId,
            subId: item.subId,
            slotType: item.slotType,
            lastDate: null // jamais planifié
          });
        }
      });
    } catch (e) {
      console.warn("⚠️ Détection 'jamais planifié' ignorée:", e);
    }
    
    console.log(`📊 Inactifs (2 mois) – total: ${inactive.length}`);
    return inactive;
  } catch (e) {
    console.error("❌ Exception inactifs:", e);
    return [];
  }
}

function formatDateFr(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (!isFinite(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = monthNames[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd} ${mm} ${yyyy}`;
}

function formatMainSubSlot(mainId, subId, slotType) {
  const main = getMainAttachmentLabel(mainId);
  const sub = getSubAttachmentLabel(subId);
  const type = slotType || "";
  return `${main}${sub ? " / " + sub : ""} – ${type}`;
}

function initInactiveSlotsModal() {
  const btn = document.getElementById("showInactiveSlotsBtn");
  const modal = document.getElementById("inactiveSlotsModal");
  const closeBtn = document.getElementById("closeInactiveSlotsModal");
  if (!btn || !modal || !closeBtn) return;
  
  btn.addEventListener("click", openInactiveSlotsModal);
  closeBtn.addEventListener("click", closeInactiveSlotsModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeInactiveSlotsModal();
  });
}

async function openInactiveSlotsModal() {
  const modal = document.getElementById("inactiveSlotsModal");
  const container = document.getElementById("inactiveSlotsContainer");
  if (!modal || !container) return;
  
  container.innerHTML = "";
  let list = await loadInactiveCombinationsLast2Months();
  console.log("🪟 Ouverture modale inactifs. Combinaisons à afficher:", list ? list.length : 0);
  
  if (!list || list.length === 0) {
    const p = document.createElement("p");
    p.className = "pk-inactive-ok";
    p.textContent = "✅ Toutes les combinaisons ont au moins un HIS sur les 2 derniers mois.";
    container.appendChild(p);
  } else {
    list.forEach(entry => {
      const item = document.createElement("div");
      item.className = "pk-inactive-slots-item";
      
      const text = document.createElement("div");
      text.style.marginBottom = "0.4rem";
      if (entry.lastDate) {
        text.textContent = `${formatMainSubSlot(entry.mainId, entry.subId, entry.slotType)} (dernier HIS le ${formatDateFr(entry.lastDate)})`;
      } else {
        text.textContent = `${formatMainSubSlot(entry.mainId, entry.subId, entry.slotType)} (aucun HIS jamais planifié)`;
      }
      
      const actions = document.createElement("div");
      const createBtn = document.createElement("button");
      createBtn.className = "pk-btn";
      createBtn.textContent = "Créer un créneau";
      createBtn.addEventListener("click", () => {
        console.log("🧩 Pré-remplissage création depuis inactifs:", {
          mainId: entry.mainId, subId: entry.subId, slotType: entry.slotType
        });
        openAddSlotPrefilled(entry.mainId, entry.subId, entry.slotType);
      });
      actions.appendChild(createBtn);
      
      item.appendChild(text);
      item.appendChild(actions);
      container.appendChild(item);
    });
  }
  
  modal.classList.remove("pk-modal-hidden");
}

function closeInactiveSlotsModal() {
  const modal = document.getElementById("inactiveSlotsModal");
  if (modal) modal.classList.add("pk-modal-hidden");
}

// === Historique des créneaux ===

function initHistoryModal() {
  const btn = document.getElementById("showHistoryBtn");
  const modal = document.getElementById("historyModal");
  const closeBtn = document.getElementById("closeHistoryModal");
  if (!btn || !modal || !closeBtn) return;
  
  btn.addEventListener("click", openHistoryModal);
  closeBtn.addEventListener("click", closeHistoryModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeHistoryModal();
  });
}

async function openHistoryModal() {
  const modal = document.getElementById("historyModal");
  const container = document.getElementById("historyContainer");
  if (!modal || !container) return;
  
  container.innerHTML = "<p style='text-align: center; padding: 2rem;'>Chargement de l'historique...</p>";
  modal.classList.remove("pk-modal-hidden");
  
  try {
    // Charger les créneaux passés
    const historySlots = await loadHistorySlots();
    
    // Charger toutes les inscriptions pour avoir les participants
    const allRegistrations = await loadRegistrations();
    
    container.innerHTML = "";
    
    if (!historySlots || historySlots.length === 0) {
      const p = document.createElement("p");
      p.className = "pk-inactive-ok";
      p.textContent = "Aucun créneau historique trouvé.";
      container.appendChild(p);
      return;
    }
    
    // Grouper les créneaux par date
    const slotsByDate = new Map();
    historySlots.forEach(slot => {
      if (!slotsByDate.has(slot.date)) {
        slotsByDate.set(slot.date, []);
      }
      slotsByDate.get(slot.date).push(slot);
    });
    
    // Afficher les créneaux groupés par date (du plus récent au plus ancien)
    const sortedDates = Array.from(slotsByDate.keys()).sort((a, b) => {
      return new Date(b) - new Date(a);
    });
    
    sortedDates.forEach(dateStr => {
      const dateSlots = slotsByDate.get(dateStr);
      
      // En-tête de date
      const dateHeader = document.createElement("div");
      dateHeader.className = "pk-history-date-header";
      const [y, m, d] = dateStr.split("-");
      const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
      const dateLabel = `${String(d).padStart(2, "0")} ${monthNames[dateObj.getMonth()]} ${y}`;
      dateHeader.textContent = dateLabel;
      container.appendChild(dateHeader);
      
      // Créneaux de cette date
      dateSlots.forEach(slot => {
        const regs = allRegistrations.filter(r => r.slot_id === slot.id);
        const card = document.createElement("div");
        card.className = "pk-slot-card pk-history-card";
        
        const header = document.createElement("div");
        header.className = "pk-slot-header";
        
        const titleEl = document.createElement("div");
        titleEl.className = "pk-slot-title";
        const mainLabelSlot = getMainAttachmentLabel(slot.main_id);
        const subLabelSlot = getSubAttachmentLabel(slot.sub_id);
        titleEl.textContent = `${mainLabelSlot}${subLabelSlot ? " – " + subLabelSlot : ""} – ${slot.label || slot.slot_type}`;
        
        const badge = document.createElement("span");
        badge.className = "pk-slot-badge";
        const count = regs.length;
        const max = slot.max_places;
        badge.textContent = `${count}/${max}`;
        if (count >= max) {
          badge.classList.add("pk-slot-badge--full");
        } else if (count === max - 1) {
          badge.classList.add("pk-slot-badge--warn");
        } else {
          badge.classList.add("pk-slot-badge--ok");
        }
        
        header.appendChild(titleEl);
        header.appendChild(badge);
        card.appendChild(header);
        
        const participants = document.createElement("div");
        participants.className = "pk-slot-participants";
        if (regs.length === 0) {
          participants.textContent = "Aucun inscrit.";
        } else {
          const names = regs
            .map(r => getColleagueName(r.colleague_id))
            .join(", ");
          participants.textContent = "Inscrits : " + names;
        }
        card.appendChild(participants);
        
        // Afficher le commentaire s'il existe
        if (slot.comment) {
          const commentEl = document.createElement("div");
          commentEl.className = "pk-slot-comment";
          commentEl.textContent = `💬 ${slot.comment}`;
          card.appendChild(commentEl);
        }
        
        container.appendChild(card);
      });
    });
  } catch (error) {
    console.error("❌ Erreur lors du chargement de l'historique:", error);
    container.innerHTML = "<p style='color: var(--text-danger); padding: 2rem;'>Erreur lors du chargement de l'historique. Vérifiez la console pour plus de détails.</p>";
  }
}

function closeHistoryModal() {
  const modal = document.getElementById("historyModal");
  if (modal) modal.classList.add("pk-modal-hidden");
}

// Ouvre la modale "Ajouter un créneau" pré-remplie avec mainId/subId/slotType
function openAddSlotPrefilled(mainId, subId, slotType) {
  const addSlotModal = document.getElementById("addSlotModal");
  const newSlotDate = document.getElementById("newSlotDate");
  const newSlotMainId = document.getElementById("newSlotMainId");
  const newSlotSubId = document.getElementById("newSlotSubId");
  const newSlotType = document.getElementById("newSlotType");
  const maxPlacesEl = document.getElementById("newSlotMaxPlaces");
  const newSlotComment = document.getElementById("newSlotComment");
  const miniCalendar = document.getElementById("miniCalendar");
  if (!addSlotModal || !newSlotDate || !newSlotMainId || !newSlotSubId || !newSlotType || !maxPlacesEl) return;
  
  console.log("🪟 Ouverture formulaire 'Ajouter' pré-rempli (avant sélection):", { mainId, subId, slotType });
  // Réinitialiser / Pré-remplir
  newSlotDate.value = "";
  maxPlacesEl.value = "3";
  if (newSlotComment) newSlotComment.value = "";
  if (miniCalendar) miniCalendar.classList.add("pk-mini-calendar-hidden");
  
  // Sélectionner mainId et déclencher le remplissage des sous-sites
  newSlotMainId.value = mainId || "";
  const changeEvent = new Event("change", { bubbles: true });
  newSlotMainId.dispatchEvent(changeEvent);
  
  // Sélectionner subId puis remplir les types
  if (subId) {
    newSlotSubId.value = subId;
    newSlotSubId.dispatchEvent(changeEvent);
  }
  
  // Sélectionner le type si disponible
  if (slotType) {
    // Tente une correspondance stricte
    const found = Array.from(newSlotType.options).some(opt => opt.value === slotType);
    if (found) {
      newSlotType.value = slotType;
    } else if (newSlotType.options.length > 0) {
      // fallback: première option disponible
      newSlotType.selectedIndex = 0;
    }
  }
  console.log("✅ Pré-rempli (après sélection):", {
    mainId: newSlotMainId.value,
    subId: newSlotSubId.value,
    slotType: newSlotType.value
  });
  
  // Afficher la modale d'ajout
  addSlotModal.classList.remove("pk-modal-hidden");
  document.body.classList.add("pk-modal-open");
}
// --- Modale ajouter un créneau ---

function initAddSlotModal() {
  const addSlotBtn = document.getElementById("addSlotBtn");
  const addSlotInDayModal = document.getElementById("addSlotInDayModal");
  const addSlotModal = document.getElementById("addSlotModal");
  const closeAddSlotModal = document.getElementById("closeAddSlotModal");
  const cancelAddSlot = document.getElementById("cancelAddSlot");
  const saveSlot = document.getElementById("saveSlot");
  const newSlotMainId = document.getElementById("newSlotMainId");
  const newSlotSubId = document.getElementById("newSlotSubId");
  const newSlotType = document.getElementById("newSlotType");

  if (!addSlotBtn || !addSlotModal) return;

  // Remplir les sélecteurs
  getMainAttachments().forEach(main => {
    const opt = document.createElement("option");
    opt.value = main.id;
    opt.textContent = main.label;
    newSlotMainId.appendChild(opt);
  });

  newSlotMainId.addEventListener("change", () => {
    newSlotSubId.innerHTML = "";
    const subAttachments = getSubAttachments(newSlotMainId.value);
    subAttachments.forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub.id;
      opt.textContent = sub.label;
      newSlotSubId.appendChild(opt);
    });
    updateSlotTypeSelect();
  });

  function updateSlotTypeSelect() {
    newSlotType.innerHTML = "";
    if (newSlotMainId.value && newSlotSubId.value) {
      const slotTypes = getSlotTypes(newSlotMainId.value, newSlotSubId.value);
      slotTypes.forEach(slotType => {
        const opt = document.createElement("option");
        opt.value = slotType;
        opt.textContent = slotType || "(sans type)";
        newSlotType.appendChild(opt);
      });
    }
  }

  newSlotSubId.addEventListener("change", updateSlotTypeSelect);

  // Mini calendrier pour la sélection de date
  const newSlotDate = document.getElementById("newSlotDate");
  const miniCalendar = document.getElementById("miniCalendar");
  let miniCalendarYear = new Date().getFullYear();
  let miniCalendarMonth = new Date().getMonth();

  function renderMiniCalendar() {
    if (!miniCalendar) return;
    
    const year = miniCalendarYear;
    const month = miniCalendarMonth;
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7; // Lundi = 0
    
    const monthNamesShort = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const dayNamesShort = ["L", "M", "M", "J", "V", "S", "D"];
    
    let html = `
      <div class="pk-mini-calendar-header">
        <button type="button" class="pk-mini-calendar-nav" data-action="prev">◀</button>
        <span class="pk-mini-calendar-month">${monthNamesShort[month]} ${year}</span>
        <button type="button" class="pk-mini-calendar-nav" data-action="next">▶</button>
      </div>
      <div class="pk-mini-calendar-days">
        ${dayNamesShort.map(d => `<div class="pk-mini-calendar-day-name">${d}</div>`).join("")}
    `;
    
    // Cases vides avant le 1er
    for (let i = 0; i < startOffset; i++) {
      html += `<div class="pk-mini-calendar-day pk-mini-calendar-day--empty"></div>`;
    }
    
    // Jours du mois
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day);
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
      const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const classes = `pk-mini-calendar-day ${isToday ? "pk-mini-calendar-day--today" : ""} ${isPast ? "pk-mini-calendar-day--past" : ""}`;
      html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }
    
    html += `</div>`;
    miniCalendar.innerHTML = html;
    
    // Event listeners pour navigation
    miniCalendar.querySelectorAll(".pk-mini-calendar-nav").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (btn.dataset.action === "prev") {
          miniCalendarMonth--;
          if (miniCalendarMonth < 0) {
            miniCalendarMonth = 11;
            miniCalendarYear--;
          }
        } else {
          miniCalendarMonth++;
          if (miniCalendarMonth > 11) {
            miniCalendarMonth = 0;
            miniCalendarYear++;
          }
        }
        renderMiniCalendar();
      });
    });
    
    // Event listeners pour sélection de date
    miniCalendar.querySelectorAll(".pk-mini-calendar-day[data-date]").forEach(dayEl => {
      dayEl.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedDate = dayEl.dataset.date;
        newSlotDate.value = selectedDate;
        miniCalendar.classList.add("pk-mini-calendar-hidden");
        console.log("📅 Date sélectionnée:", selectedDate);
        
        // Sur mobile, fermer immédiatement et permettre l'accès aux autres champs
        // Enlever le focus du champ date pour permettre de cliquer sur les autres champs
        newSlotDate.blur();
      });
    });
  }

  // Afficher/masquer le mini calendrier au clic sur le champ date
  if (newSlotDate && miniCalendar) {
    // Détecter si on est sur mobile
    const isMobile = () => window.innerWidth <= 480;
    
    // Sur mobile, toujours masquer le mini-calendrier et utiliser le sélecteur natif
    const checkMobile = () => {
      if (isMobile()) {
        miniCalendar.classList.add("pk-mini-calendar-hidden");
      }
    };
    
    // Vérifier au chargement et au redimensionnement
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    newSlotDate.addEventListener("focus", (e) => {
      // Sur mobile, utiliser le sélecteur natif (ne pas afficher le mini-calendrier)
      if (isMobile()) {
        // Laisser le comportement natif du champ date sur mobile
        return;
      }
      
      // Sur desktop, afficher le mini-calendrier
      e.preventDefault();
      miniCalendarYear = new Date().getFullYear();
      miniCalendarMonth = new Date().getMonth();
      renderMiniCalendar();
      miniCalendar.classList.remove("pk-mini-calendar-hidden");
    });
    
    // Fermer le calendrier si on clique ailleurs ou sur un autre champ
    document.addEventListener("click", (e) => {
      if (isMobile()) return; // Sur mobile, ne rien faire
      
      const isClickOnOtherField = e.target.id === "newSlotMainId" || 
                                   e.target.id === "newSlotSubId" || 
                                   e.target.id === "newSlotType" || 
                                   e.target.id === "newSlotMaxPlaces";
      
      if (!miniCalendar.contains(e.target) && e.target !== newSlotDate) {
        miniCalendar.classList.add("pk-mini-calendar-hidden");
      }
      
      // Fermer le calendrier si on clique sur un autre champ du formulaire
      if (isClickOnOtherField) {
        miniCalendar.classList.add("pk-mini-calendar-hidden");
      }
    });
    
    // Fermer le calendrier quand on change de champ (focus sur autre élément)
    document.addEventListener("focusin", (e) => {
      if (isMobile()) return; // Sur mobile, ne rien faire
      
      if (e.target !== newSlotDate && !miniCalendar.contains(e.target)) {
        miniCalendar.classList.add("pk-mini-calendar-hidden");
      }
    });
  }

  // Ouvrir la modale depuis le bouton principal
  addSlotBtn.addEventListener("click", () => {
    addSlotModal.classList.remove("pk-modal-hidden");
    document.body.classList.add("pk-modal-open");
    document.getElementById("newSlotDate").value = "";
    newSlotMainId.value = "";
    newSlotSubId.innerHTML = "";
    newSlotType.innerHTML = "";
    document.getElementById("newSlotMaxPlaces").value = "3";
    document.getElementById("newSlotComment").value = "";
    if (miniCalendar) {
      miniCalendar.classList.add("pk-mini-calendar-hidden");
    }
  });

  // Ouvrir la modale depuis la modale du jour (avec la date pré-remplie)
  if (addSlotInDayModal) {
    addSlotInDayModal.addEventListener("click", () => {
      const dayModal = document.getElementById("dayModal");
      const dateStr = dayModal ? dayModal.dataset.date : "";
      
      addSlotModal.classList.remove("pk-modal-hidden");
      document.body.classList.add("pk-modal-open");
      document.getElementById("newSlotDate").value = dateStr || "";
      newSlotMainId.value = "";
      newSlotSubId.innerHTML = "";
      newSlotType.innerHTML = "";
      document.getElementById("newSlotMaxPlaces").value = "3";
      document.getElementById("newSlotComment").value = "";
      
      // Fermer la modale du jour
      closeDayModal();
    });
  }
  
  // Fermer la modale
  const closeModal = () => {
    addSlotModal.classList.add("pk-modal-hidden");
    document.body.classList.remove("pk-modal-open");
    // Réinitialiser le formulaire
    document.getElementById("newSlotDate").value = "";
    newSlotMainId.value = "";
    newSlotSubId.innerHTML = "";
    newSlotType.innerHTML = "";
    document.getElementById("newSlotMaxPlaces").value = "3";
    document.getElementById("newSlotComment").value = "";
    if (miniCalendar) {
      miniCalendar.classList.add("pk-mini-calendar-hidden");
    }
  };

  closeAddSlotModal.addEventListener("click", closeModal);
  cancelAddSlot.addEventListener("click", closeModal);
  addSlotModal.addEventListener("click", e => {
    if (e.target === addSlotModal) closeModal();
  });

  // Sauvegarder le nouveau slot
  saveSlot.addEventListener("click", async () => {
    const date = document.getElementById("newSlotDate").value;
    const mainId = newSlotMainId.value;
    const subId = newSlotSubId.value;
    const slotType = newSlotType.value;
    const maxPlaces = parseInt(document.getElementById("newSlotMaxPlaces").value);
    const commentEl = document.getElementById("newSlotComment");
    const comment = commentEl ? commentEl.value.trim() : "";

    if (!date || !mainId || !subId || !slotType || !maxPlaces) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      // Créer le nouveau slot dans Supabase
      const slotId = `slot_${date}_${subId}_${slotType.replace(/\s+/g, "_")}`;
      const newSlot = {
        id: slotId,
        date: date,
        main_id: mainId,
        sub_id: subId,
        slot_type: slotType,
        label: slotType,
        max_places: maxPlaces
      };
      
      // Ajouter le commentaire seulement s'il n'est pas vide
      if (comment) {
        newSlot.comment = comment;
      }

      try {
        await createSlot(newSlot);
      } catch (commentError) {
        // Si l'erreur indique que la colonne comment n'existe pas, réessayer sans le commentaire
        const errorMsg = commentError.message || JSON.stringify(commentError);
        if (comment && (errorMsg.includes("comment") || errorMsg.includes("column") || errorMsg.includes("does not exist"))) {
          console.warn("⚠️ Colonne 'comment' non trouvée, création du créneau sans commentaire");
          delete newSlot.comment;
          await createSlot(newSlot);
        } else {
          throw commentError;
        }
      }

      // Fermer la modale et rafraîchir
      closeModal();
      await refreshData();
      renderCalendar();
      
      console.log("✅ Créneau ajouté:", newSlot);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout du créneau:", error);
      let errorMessage = "Erreur lors de l'ajout du créneau.";
      if (error.message) {
        errorMessage += "\n\n" + error.message;
      }
      if (error.details) {
        errorMessage += "\n\nDétails: " + error.details;
      }
      alert(errorMessage);
    }
    });
  }
  
  function openDayModal(dateStr) {
    const modal = document.getElementById("dayModal");
    const title = document.getElementById("dayModalTitle");
    const container = document.getElementById("daySlotsContainer");

  if (!modal || !title || !container) {
    console.error("❌ Éléments modale non trouvés");
    return;
  }
  
    modal.dataset.date = dateStr;
    container.innerHTML = "";
  
    const [y, m, d] = dateStr.split("-");
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    const dateLabel =
    String(d).padStart(2, "0") +
      " " +
      monthNames[dateObj.getMonth()] +
      " " +
      dateObj.getFullYear();
  
  // Filtrage des slots pour ce jour selon mainId, subId et slotType (ou "all" pour tout afficher)
  let daySlots = state.slots.filter(s => {
    if (s.date !== dateStr) return false;
    if (state.selectedMainId !== "all" && s.main_id !== state.selectedMainId) return false;
    if (state.selectedSubId !== "all" && s.sub_id !== state.selectedSubId) return false;
    if (state.selectedSlotType !== "all" && s.slot_type !== state.selectedSlotType) return false;
    return true;
  });

  // Titre de la modale
  if (state.selectedMainId === "all") {
    title.textContent = `${dateLabel} – Tous les sites (vue globale)`;
  } else {
    const mainLabel = getMainAttachmentLabel(state.selectedMainId);
    const subLabel = getSubAttachmentLabel(state.selectedSubId);
    const slotTypeLabel = state.selectedSlotType !== "all" ? state.selectedSlotType : "";
    title.textContent = `${dateLabel} – ${subLabel || mainLabel}${slotTypeLabel ? " – " + slotTypeLabel : ""}`;
  }
  
    if (daySlots.length === 0) {
      const p = document.createElement("p");
      p.textContent = "Aucun créneau HIS pour ce jour.";
      container.appendChild(p);
    } else {
      daySlots.forEach(slot => {
      const regs = state.registrations.filter(r => r.slot_id === slot.id);
        const card = document.createElement("div");
        card.className = "pk-slot-card";
  
        const header = document.createElement("div");
        header.className = "pk-slot-header";
  
        const titleEl = document.createElement("div");
        titleEl.className = "pk-slot-title";
      const mainLabelSlot = getMainAttachmentLabel(slot.main_id);
      const subLabelSlot = getSubAttachmentLabel(slot.sub_id);
      titleEl.textContent = `${mainLabelSlot}${subLabelSlot ? " – " + subLabelSlot : ""} – ${slot.label || slot.slot_type}`;
  
        const badge = document.createElement("span");
        badge.className = "pk-slot-badge";
        const count = regs.length;
      const max = slot.max_places;
        badge.textContent = `${count}/${max}`;
        if (count >= max) {
          badge.classList.add("pk-slot-badge--full");
        } else if (count === max - 1) {
          badge.classList.add("pk-slot-badge--warn");
        } else {
          badge.classList.add("pk-slot-badge--ok");
        }
  
        header.appendChild(titleEl);
        header.appendChild(badge);
        card.appendChild(header);
  
        const participants = document.createElement("div");
        participants.className = "pk-slot-participants";
        if (regs.length === 0) {
          participants.textContent = "Aucun inscrit pour le moment.";
        } else {
          const names = regs
          .map(r => getColleagueName(r.colleague_id))
            .join(", ");
          participants.textContent = "Inscrits : " + names;
        }
        card.appendChild(participants);
        
        // Afficher le commentaire s'il existe
        if (slot.comment) {
          const commentEl = document.createElement("div");
          commentEl.className = "pk-slot-comment";
          commentEl.textContent = `💬 ${slot.comment}`;
          card.appendChild(commentEl);
        }
  
        const actions = document.createElement("div");
        actions.className = "pk-slot-actions";
  
        if (!state.selectedColleagueId) {
          const info = document.createElement("span");
          info.style.fontSize = "0.75rem";
          info.style.color = "var(--text-muted)";
        info.textContent = "Sélectionne ton nom en haut pour t'inscrire.";
          actions.appendChild(info);
        } else {
          const already = regs.some(
          r => r.colleague_id === state.selectedColleagueId
          );
  
          if (!already && count < max) {
            const btnIn = document.createElement("button");
            btnIn.className = "pk-btn";
          btnIn.textContent = "M'inscrire";
          btnIn.addEventListener("click", async () => {
            try {
              await registerToSlot(slot.id, state.selectedColleagueId);
              await refreshData();
              renderCalendar();
              openDayModal(dateStr);
            } catch (error) {
              alert("Erreur lors de l'inscription. Vérifiez la console pour plus de détails.");
              console.error("❌ Erreur:", error);
            }
            });
            actions.appendChild(btnIn);
          }
  
          if (already) {
            const btnOut = document.createElement("button");
            btnOut.className = "pk-btn pk-btn-ghost";
            btnOut.textContent = "Me retirer";
          btnOut.addEventListener("click", async () => {
            try {
              await unregisterFromSlot(slot.id, state.selectedColleagueId);
              await refreshData();
              renderCalendar();
              openDayModal(dateStr);
            } catch (error) {
              alert("Erreur lors de la désinscription. Vérifiez la console pour plus de détails.");
              console.error("❌ Erreur:", error);
            }
            });
            actions.appendChild(btnOut);
          }
        }
  
      // Bouton supprimer le créneau (toujours visible pour tous les créneaux)
      const deleteContainer = document.createElement("div");
      deleteContainer.style.marginTop = "0.8rem";
      deleteContainer.style.paddingTop = "0.8rem";
      deleteContainer.style.borderTop = "1px solid rgba(220, 53, 69, 0.4)";
      
      const btnDelete = document.createElement("button");
      btnDelete.className = "pk-btn pk-btn-danger";
      btnDelete.textContent = "🗑️ Supprimer ce créneau";
      btnDelete.style.width = "100%";
      console.log("✅ Bouton supprimer créé pour le slot:", slot.id);
      
      btnDelete.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("🖱️ Suppression directe du slot:", slot.id);
        
        // Désactiver le bouton pendant la suppression
        btnDelete.disabled = true;
        btnDelete.textContent = "⏳ Suppression...";
        
        try {
          console.log("📞 Appel de deleteSlot avec ID:", slot.id);
          const result = await deleteSlot(slot.id);
          console.log("✅ Résultat de la suppression:", result);
          
          if (result) {
            // Attendre un peu pour que Supabase traite la suppression
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Rafraîchir les données depuis Supabase
            console.log("🔄 Rafraîchissement des données...");
            await refreshData();
            console.log("✅ Données rafraîchies. Slots restants:", state.slots.length);
            
            // Mettre à jour le calendrier
            renderCalendar();
            
            // Si plus de slots pour ce jour, fermer la modale
            const remainingSlots = state.slots.filter(s => s.date === dateStr);
            console.log("📅 Slots restants pour ce jour:", remainingSlots.length);
            
            if (remainingSlots.length === 0) {
              console.log("✅ Fermeture de la modale (plus de slots)");
              closeDayModal();
            } else {
              console.log("✅ Réouverture de la modale avec les slots restants");
              openDayModal(dateStr);
            }
          } else {
            alert("La suppression a échoué. Vérifiez la console pour plus de détails.");
            btnDelete.disabled = false;
            btnDelete.textContent = "🗑️ Supprimer ce créneau";
          }
        } catch (error) {
          console.error("❌ Erreur complète lors de la suppression:", error);
          console.error("❌ Stack trace:", error.stack);
          alert(`Erreur lors de la suppression du créneau:\n\n${error.message || error}\n\nVérifiez la console pour plus de détails.`);
          btnDelete.disabled = false;
          btnDelete.textContent = "🗑️ Supprimer ce créneau";
        }
      });
      
      deleteContainer.appendChild(btnDelete);
      actions.appendChild(deleteContainer);
  
        card.appendChild(actions);
        container.appendChild(card);
      });
    }
  
    modal.classList.remove("pk-modal-hidden");
  }
  
  function closeDayModal() {
    const modal = document.getElementById("dayModal");
  if (modal) {
    modal.classList.add("pk-modal-hidden");
    delete modal.dataset.date;
  }
  }

  // --- Modale de confirmation de suppression ---
  
  function showConfirmDeleteModal(title, message) {
    return new Promise((resolve) => {
      const modal = document.getElementById("confirmDeleteModal");
      const messageEl = document.getElementById("confirmDeleteMessage");
      const confirmBtn = document.getElementById("confirmDeleteBtn");
      const cancelBtn = document.getElementById("cancelDeleteBtn");
      const closeBtn = document.getElementById("closeConfirmDeleteModal");
      
      if (!modal || !messageEl || !confirmBtn || !cancelBtn) {
        console.error("❌ Éléments de la modale de confirmation non trouvés");
        resolve(false);
        return;
      }
      
      // Mettre à jour le message
      messageEl.innerHTML = `<strong>${title}</strong><br><br>${message}`;
      
      // Nettoyer les anciens event listeners
      const newConfirmBtn = confirmBtn.cloneNode(true);
      const newCancelBtn = cancelBtn.cloneNode(true);
      const newCloseBtn = closeBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
      cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
      
      // Fonction pour fermer la modale
      const closeModal = (result) => {
        modal.classList.add("pk-modal-hidden");
        resolve(result);
      };
      
      // Event listeners
      newConfirmBtn.addEventListener("click", () => {
        console.log("✅ Bouton 'Supprimer' cliqué dans la modale");
        closeModal(true);
      });
      
      newCancelBtn.addEventListener("click", () => {
        console.log("❌ Bouton 'Annuler' cliqué dans la modale");
        closeModal(false);
      });
      
      newCloseBtn.addEventListener("click", () => {
        console.log("❌ Bouton fermer cliqué dans la modale");
        closeModal(false);
      });
      
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          console.log("❌ Clic en dehors de la modale");
          closeModal(false);
        }
      });
      
      // Afficher la modale
      console.log("📋 Affichage de la modale de confirmation");
      modal.classList.remove("pk-modal-hidden");
    });
  }
  
  // --- Utilitaires ---
  
  function getColleagueName(id) {
    const c = COLLEAGUES.find(c => c.id === id);
    return c ? c.name : id;
  }
  
function getMainAttachmentLabel(id) {
  if (id === "all") return "Tous les sites";
  const main = getMainAttachments().find(m => m.id === id);
  return main ? main.label : id;
}

function getSubAttachmentLabel(id) {
  if (id === "all") return "";
  const sub = ATTACHMENT_HIERARCHY.find(item => item.subId === id);
  return sub ? sub.subLabel : id;
}
  
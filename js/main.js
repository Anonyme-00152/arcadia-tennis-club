/* ==========================================================================
   Arcadia Tennis Club — interactions
   ========================================================================== */
(() => {
"use strict";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
root.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Language                                                            */
/* ------------------------------------------------------------------ */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
let lang = store.get("arcadia-lang") || ((navigator.language || "fr").startsWith("fr") ? "fr" : "en");
const L = o => (o && typeof o === "object" && "fr" in o ? o[lang] : o);
const locale = () => (lang === "fr" ? "fr-FR" : "en-GB");
const money = n => new Intl.NumberFormat(locale(), { style: "currency", currency: "EUR", maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);

const UI = {
  places: { fr: "places", en: "spots" },
  left: { fr: "restantes", en: "left" },
  full: { fr: "Complet", en: "Full" },
  courtsFree: { fr: n => `${n} court${n > 1 ? "s" : ""}`, en: n => `${n} court${n > 1 ? "s" : ""}` },
  noSlots: { fr: "Aucun créneau disponible ce jour-là. Essayez une autre date ou une autre surface.", en: "No slots left on this day. Try another date or surface." },
  today: { fr: "Auj.", en: "Today" },
  tomorrowAvail: { fr: "Disponible demain", en: "Available tomorrow" },
  todayAvail: { fr: "Disponible aujourd'hui", en: "Available today" },
  all: { fr: "Toutes", en: "All" },
  perMonth: { fr: "/mois", en: "/month" },
  billedYear: { fr: v => `soit ${v} facturés à l'année`, en: v => `${v} billed yearly` },
  noCommit: { fr: "Sans engagement", en: "No commitment" },
  popular: { fr: "Le plus choisi", en: "Most popular" },
  from: { fr: "à partir de", en: "from" },
  details: { fr: "S'inscrire", en: "Sign up" },
  openNow: { fr: c => `Ouvert · ferme à ${c}h`, en: c => `Open now · closes ${c}:00` },
  closedNow: { fr: o => `Fermé · ouvre à ${o}h`, en: o => `Closed · opens ${o}:00` },
  close: { fr: "Fermer", en: "Close" },
  confirm: { fr: "Confirmer la réservation", en: "Confirm booking" },
  bookTitle: { fr: "Finalisez <em>votre réservation.</em>", en: "Complete <em>your booking.</em>" },
  bookSub: { fr: "Paiement sur place ou via l'appli. Annulation gratuite jusqu'à 24 h avant.", en: "Pay at the desk or in the app. Free cancellation up to 24h before." },
  bookedTitle: { fr: "C'est <em>réservé !</em>", en: "You're <em>booked!</em>" },
  bookedSub: { fr: (d, h) => `Rendez-vous le ${d} à ${h}. Une confirmation vous a été envoyée par e-mail.`, en: (d, h) => `See you on ${d} at ${h}. A confirmation has been sent to your inbox.` },
  trialEyebrow: { fr: "Cours d'essai", en: "Trial lesson" },
  trialTitle: { fr: "Votre premier cours, <em>offert.</em>", en: "Your first lesson, <em>on us.</em>" },
  trialSub: { fr: "45 minutes avec un coach diplômé, raquette prêtée. Nous vous rappelons sous 24 h pour fixer le créneau.", en: "45 minutes with a certified coach, racket provided. We'll call you back within 24h to set a time." },
  trialDoneT: { fr: "Demande <em>envoyée.</em>", en: "Request <em>sent.</em>" },
  trialDoneD: { fr: n => `Merci ${n} ! Un coach vous appelle sous 24 h pour planifier votre cours.`, en: n => `Thanks ${n}! A coach will call you within 24h to schedule your lesson.` },
  evEyebrow: { fr: "Inscription", en: "Registration" },
  evDoneT: { fr: "Inscription <em>confirmée.</em>", en: "You're <em>registered.</em>" },
  evDoneD: { fr: e => `Vous êtes inscrit·e à « ${e} ». Le programme détaillé arrive par e-mail.`, en: e => `You're registered for “${e}”. The full schedule is on its way by email.` },
  planEyebrow: { fr: "Adhésion", en: "Membership" },
  planDoneT: { fr: "Bienvenue <em>au club.</em>", en: "Welcome <em>to the club.</em>" },
  planDoneD: { fr: p => `Votre demande d'adhésion « ${p} » est enregistrée. L'accueil vous contacte pour finaliser votre dossier.`, en: p => `Your “${p}” membership request is in. The front desk will contact you to finalise it.` },
  progEyebrow: { fr: "Programme", en: "Program" },
  name: { fr: "Nom complet", en: "Full name" },
  email: { fr: "E-mail", en: "Email" },
  phone: { fr: "Téléphone", en: "Phone" },
  level: { fr: "Votre niveau", en: "Your level" },
  levels: { fr: ["Débutant", "Intermédiaire", "Confirmé", "Compétiteur classé"], en: ["Beginner", "Intermediate", "Advanced", "Ranked competitor"] },
  forWho: { fr: "Pour qui ?", en: "Who is it for?" },
  forWhoOpts: { fr: ["Moi", "Mon enfant", "Moi et un proche"], en: ["Myself", "My child", "Me and a friend"] },
  send: { fr: "Envoyer la demande", en: "Send request" },
  register: { fr: "Je m'inscris", en: "Register" },
  join: { fr: "Envoyer ma demande", en: "Send my request" },
  done: { fr: "Parfait", en: "Done" },
  req: { fr: "Champ requis", en: "Required field" },
  badEmail: { fr: "E-mail invalide", en: "Invalid email" },
  badPhone: { fr: "Numéro invalide", en: "Invalid number" },
  newsOk: { fr: "Merci ! Vous êtes inscrit·e à la newsletter.", en: "Thanks! You're subscribed." },
  newsBad: { fr: "Merci d'indiquer un e-mail valide.", en: "Please enter a valid email." },
  langLabel: { fr: "Switch to English", en: "Passer en français" },
  menuOpen: { fr: "Ouvrir le menu", en: "Open menu" },
  menuClose: { fr: "Fermer le menu", en: "Close menu" },
  ref: { fr: "Référence", en: "Reference" },
  sendErr: { fr: "L'envoi a échoué. Réessayez ou appelez-nous au 01 99 00 42 18.", en: "Sending failed. Please try again or call us on +33 1 99 00 42 18." },
  hour: { fr: "h", en: "h" },
};
const U = (k, ...a) => { const v = L(UI[k]); return typeof v === "function" ? v(...a) : v; };

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const MARQUEE = {
  fr: ["Terre battue", "Jeu de jambes", "Dur Greenset", "Analyse vidéo", "Coaching d'élite", "Club-house", "Stages vacances", "Compétition", "Esprit de club"],
  en: ["Clay courts", "Footwork", "Greenset hard", "Video analysis", "Elite coaching", "Clubhouse", "Holiday camps", "Competition", "Club spirit"],
};

const PROGRAMS = [
  {
    img: "assets/1.webp", pos: "50% 30%",
    name: { fr: "École de tennis", en: "Tennis school" },
    meta: { fr: "4 – 17 ans", en: "Ages 4 – 17" },
    title: { fr: "École de tennis", en: "Tennis school" },
    desc: { fr: "Du mini-tennis à la passerelle compétition : une progression claire, des groupes par niveau et des coachs qui font aimer le jeu.", en: "From mini-tennis to the competition pathway: a clear progression, groups by level and coaches who make kids love the game." },
    facts: [["i-users", { fr: "Groupe", en: "Group" }, { fr: "6 max", en: "6 max" }], ["i-cal", { fr: "Séances", en: "Sessions" }, { fr: "1 à 3 / sem.", en: "1–3 / week" }], ["i-clock", { fr: "Durée", en: "Length" }, "1h – 1h30"]],
    list: { fr: ["Mini-tennis dès 4 ans, balles adaptées", "Passerelle compétition dès 8 ans", "Stages pendant toutes les vacances scolaires", "Suivi parent dans l'appli Arcadia"], en: ["Mini-tennis from age 4 with adapted balls", "Competition pathway from age 8", "Camps during every school holiday", "Parent tracking in the Arcadia app"] },
    price: 590, unit: { fr: "/an", en: "/year" },
  },
  {
    img: "assets/2.webp", pos: "60% 50%",
    name: { fr: "Centre de compétition", en: "Competition centre" },
    meta: { fr: "Sur sélection", en: "By selection" },
    title: { fr: "Centre de compétition", en: "Competition centre" },
    desc: { fr: "Un programme haute intensité pour les joueurs classés qui visent les championnats régionaux et nationaux.", en: "A high-intensity program for ranked players targeting regional and national championships." },
    facts: [["i-users", { fr: "Groupe", en: "Group" }, { fr: "4 max", en: "4 max" }], ["i-cal", { fr: "Volume", en: "Volume" }, { fr: "4 à 10 h / sem.", en: "4–10 h / week" }], ["i-clock", { fr: "Âge", en: "Age" }, { fr: "Dès 8 ans", en: "8+" }]],
    list: { fr: ["Planification annuelle & calendrier de tournois", "Préparation physique et mentale intégrée", "Analyse vidéo hebdomadaire", "Coach présent sur les tournois clés"], en: ["Annual planning & tournament calendar", "Integrated physical and mental prep", "Weekly video analysis", "Coach on site at key tournaments"] },
    price: 1890, unit: { fr: "/an", en: "/year" },
  },
  {
    img: "assets/3.webp", pos: "55% 45%",
    name: { fr: "Adultes", en: "Adults" },
    meta: { fr: "Tous niveaux", en: "All levels" },
    title: { fr: "Cours adultes", en: "Adult clinics" },
    desc: { fr: "Reprendre, progresser ou préparer vos matchs par équipe : des groupes homogènes sur des créneaux qui s'adaptent à votre agenda.", en: "Getting back into it, improving or preparing for team matches: balanced groups at times that fit your schedule." },
    facts: [["i-users", { fr: "Groupe", en: "Group" }, { fr: "6 max", en: "6 max" }], ["i-cal", { fr: "Séances", en: "Sessions" }, { fr: "1 à 2 / sem.", en: "1–2 / week" }], ["i-clock", { fr: "Créneaux", en: "Times" }, "7h – 22h"]],
    list: { fr: ["Du grand débutant au joueur classé 15/1", "Créneaux tôt le matin, midi et soir", "Cardio-tennis et ateliers double tactique", "Matchs libres organisés le week-end"], en: ["From complete beginner to advanced ranked", "Early morning, lunchtime and evening slots", "Cardio tennis and tactical doubles clinics", "Organised friendly matches at weekends"] },
    price: 420, unit: { fr: "/an", en: "/year" },
  },
  {
    img: "assets/4.webp", pos: "50% 25%",
    name: { fr: "Cours particuliers", en: "Private lessons" },
    meta: { fr: "À la carte", en: "Pay as you go" },
    title: { fr: "Cours particuliers", en: "Private coaching" },
    desc: { fr: "Une séance entièrement construite autour de votre jeu, avec le coach de votre choix et un objectif précis.", en: "A session built entirely around your game, with the coach of your choice and a clear goal." },
    facts: [["i-users", { fr: "Format", en: "Format" }, { fr: "1 – 2 joueurs", en: "1 – 2 players" }], ["i-cal", { fr: "Planning", en: "Schedule" }, { fr: "À la carte", en: "Flexible" }], ["i-clock", { fr: "Durée", en: "Length" }, "1h"]],
    list: { fr: ["Coach au choix selon vos objectifs", "Analyse vidéo incluse", "Carnet de 10 heures : –15 %", "Réservation et paiement dans l'appli"], en: ["Choose your coach to match your goals", "Video analysis included", "10-hour pack: –15%", "Book and pay in the app"] },
    price: 65, unit: { fr: "/h", en: "/h" },
  },
];

const COACHES = [
  { img: "assets/5.webp", pos: "50% 30%", name: "Marco Vidal", role: { fr: "Directeur sportif", en: "Head of tennis" }, tag: { fr: "18 ans d'expérience", en: "18 yrs experience" }, bio: { fr: "Ancien 180e mondial, Marco a construit la méthode Arcadia : exigence technique, intelligence de jeu, plaisir.", en: "Former world No. 180, Marco built the Arcadia method: technical rigour, game intelligence, enjoyment." }, meta: ["DESJEPS", "Ex-ATP", "FR · ES · EN"] },
  { img: "assets/2.webp", pos: "62% 40%", name: "Hugo Lambert", role: { fr: "Entraîneur compétition", en: "Performance coach" }, tag: { fr: "Centre de compétition", en: "Competition centre" }, bio: { fr: "Spécialiste du jeu de fond de court, il accompagne nos juniors classés sur le circuit national.", en: "A baseline specialist, he guides our ranked juniors on the national circuit." }, meta: ["DEJEPS", { fr: "Analyse vidéo", en: "Video analysis" }] },
  { img: "assets/1.webp", pos: "50% 25%", name: "James Okoro", role: { fr: "Responsable école de tennis", en: "Tennis school lead" }, tag: { fr: "Juniors", en: "Juniors" }, bio: { fr: "Pédagogue reconnu, James a fait de l'école de tennis l'une des plus dynamiques de l'ouest parisien.", en: "A renowned teacher, James made our tennis school one of the liveliest in west Paris." }, meta: ["DEJEPS", "Mini-tennis", "FR · EN"] },
  { img: "assets/3.webp", pos: "58% 40%", name: "Julien Morel", role: { fr: "Préparateur physique", en: "Strength & conditioning" }, tag: { fr: "Performance", en: "Performance" }, bio: { fr: "Vitesse, explosivité, prévention des blessures : Julien prépare les corps à tenir trois sets.", en: "Speed, power, injury prevention: Julien gets bodies ready to last three sets." }, meta: ["STAPS", { fr: "Prévention", en: "Injury prevention" }] },
  { img: "assets/4.webp", pos: "50% 25%", name: "Théo Garnier", role: { fr: "Coach adultes", en: "Adult coach" }, tag: { fr: "Adultes & double", en: "Adults & doubles" }, bio: { fr: "Le roi du double tactique. Ses cours du soir affichent complet chaque saison.", en: "The king of tactical doubles. His evening clinics sell out every season." }, meta: ["DE", "Cardio-tennis"] },
];

const COURTS = [
  ...[1, 2, 3, 4].map(n => ({ id: `H${n}`, surf: "hard", name: `Harbor ${n}` })),
  ...[5, 6].map(n => ({ id: `H${n}`, surf: "hard", name: `Harbor ${n}`, covered: true })),
  ...[1, 2, 3, 4].map(n => ({ id: `R${n}`, surf: "clay", name: `Redline ${n}` })),
  ...[1, 2].map(n => ({ id: `D${n}`, surf: "indoor", name: lang === "fr" ? `Dôme ${n}` : `Dome ${n}`, n })),
];
const SURFACES = [
  { id: "all", label: () => U("all") },
  { id: "hard", label: () => L({ fr: "Dur", en: "Hard" }) },
  { id: "clay", label: () => L({ fr: "Terre battue", en: "Clay" }) },
  { id: "indoor", label: () => L({ fr: "Couvert", en: "Indoor" }) },
];
const DURATIONS = [{ v: 1, l: "1h" }, { v: 1.5, l: "1h30" }, { v: 2, l: "2h" }];

const PLANS = [
  {
    id: "loisir", name: { fr: "Loisir", en: "Social" }, m: 49,
    desc: { fr: "Pour jouer librement, à votre rythme.", en: "Play freely, at your own pace." },
    feats: { fr: ["Réservation 7 jours à l'avance", "Accès courts extérieurs 7h–17h en semaine", "Club-house & vestiaires", "–10 % au pro shop"], en: ["Book 7 days ahead", "Outdoor courts 7am–5pm on weekdays", "Clubhouse & locker rooms", "10% off at the pro shop"] },
  },
  {
    id: "competiteur", name: { fr: "Compétiteur", en: "Competitor" }, m: 79, featured: true,
    desc: { fr: "Accès illimité et un cours collectif chaque semaine.", en: "Unlimited access plus a weekly group clinic." },
    feats: { fr: ["Réservation illimitée, tous les courts", "1 cours collectif / semaine inclus", "Accès salle de préparation & sauna", "Analyse vidéo 1 fois / mois", "Invitations aux tournois internes"], en: ["Unlimited booking, every court", "1 group clinic / week included", "Gym & sauna access", "Monthly video analysis", "Invitations to internal tournaments"] },
  },
  {
    id: "famille", name: { fr: "Famille", en: "Family" }, m: 129,
    desc: { fr: "Jusqu'à 4 personnes sous le même toit.", en: "Up to 4 people in the same household." },
    feats: { fr: ["Avantages Compétiteur pour 2 adultes", "École de tennis –30 % pour les enfants", "Réservation illimitée partagée", "Stages vacances prioritaires"], en: ["Competitor benefits for 2 adults", "Tennis school –30% for children", "Shared unlimited booking", "Priority on holiday camps"] },
  },
];

const REVIEWS = [
  { q: { fr: "J'ai gagné un classement en une saison. Le coaching est précis, et surtout, ça reste.", en: "I moved up a ranking level in one season. The coaching is precise — and it sticks." }, n: "Priya Anand", r: { fr: "Centre de compétition", en: "Competition centre" }, c: "#2563c9", big: true },
  { q: { fr: "Les plus beaux courts de Paris et une équipe qui traite chaque membre comme un compétiteur.", en: "The best courts in Paris and a team that treats every member like a competitor." }, n: "Lukas Brenner", r: { fr: "Membre Compétiteur", en: "Competitor member" }, c: "#1b3a78" },
  { q: { fr: "Ma fille est passée de débutante timide à championne du club. Chaque minute en valait la peine.", en: "My daughter went from shy beginner to club champion. Worth every minute." }, n: "Dana Okafor", r: { fr: "Parent, école de tennis", en: "Parent, tennis school" }, c: "#0b6e97", hl: true },
  { q: { fr: "Réserver prend dix secondes, les courts sont impeccables même en novembre. Rien à redire.", en: "Booking takes ten seconds and the courts are spotless even in November. Faultless." }, n: "Camille Roux", r: { fr: "Membre Loisir", en: "Social member" }, c: "#b06a32" },
  { q: { fr: "Les cours du soir de Théo sont devenus le meilleur moment de ma semaine.", en: "Théo's evening clinics have become the best part of my week." }, n: "Antoine Petit", r: { fr: "Cours adultes", en: "Adult clinics" }, c: "#3d6b4f" },
  { q: { fr: "Accueil chaleureux, coachs passionnés, club-house génial. On y vient pour jouer, on reste pour l'ambiance.", en: "Warm welcome, passionate coaches, great clubhouse. You come to play and stay for the atmosphere." }, n: "Sofia Martins", r: { fr: "Membre Famille", en: "Family member" }, c: "#5b4b8a" },
];

const EVENTS = [
  { d: "2026-10-18", cat: "t", title: { fr: "Open d'automne Arcadia", en: "Arcadia Autumn Open" }, sub: { fr: "Tournoi homologué · Seniors & +35", en: "Sanctioned tournament · Seniors & 35+" }, spots: 64, left: 12 },
  { d: "2026-10-26", cat: "s", title: { fr: "Stage de la Toussaint", en: "Half-term camp" }, sub: { fr: "26 – 30 octobre · Juniors 6 – 16 ans", en: "26 – 30 October · Juniors 6 – 16" }, spots: 40, left: 9 },
  { d: "2026-11-14", cat: "e", title: { fr: "Nuit du double mixte", en: "Mixed doubles night" }, sub: { fr: "19h – minuit · Tous niveaux · Buffet", en: "7pm – midnight · All levels · Buffet" }, spots: 32, left: 6 },
  { d: "2026-12-06", cat: "t", title: { fr: "Tournoi jeunes Galaxie", en: "Junior Galaxy tournament" }, sub: { fr: "8 – 12 ans · Balles orange et vertes", en: "Ages 8 – 12 · Orange & green balls" }, spots: 48, left: 0 },
  { d: "2026-12-19", cat: "e", title: { fr: "Masters de fin d'année", en: "End-of-year Masters" }, sub: { fr: "Finales internes & soirée du club", en: "Club finals & end-of-year party" }, spots: 16, left: 4 },
];
const EV_CAT = {
  t: { cls: "tag-blue", l: { fr: "Tournoi", en: "Tournament" } },
  s: { cls: "tag-clay", l: { fr: "Stage", en: "Camp" } },
  e: { cls: "tag-ball", l: { fr: "Soirée", en: "Social" } },
};

const FAQ = [
  { q: { fr: "Faut-il être membre pour réserver un court ?", en: "Do I need to be a member to book a court?" }, a: { fr: "Non. Les non-membres peuvent réserver en ligne jusqu'à 3 jours à l'avance au tarif horaire. Les membres réservent jusqu'à 7 jours à l'avance, et c'est inclus dans les formules Compétiteur et Famille.", en: "No. Non-members can book online up to 3 days ahead at the hourly rate. Members can book up to 7 days ahead, and it's included in the Competitor and Family plans." } },
  { q: { fr: "Comment se déroule le cours d'essai offert ?", en: "How does the free trial lesson work?" }, a: { fr: "45 minutes avec un coach diplômé pour évaluer votre niveau et vos objectifs. Raquette et balles fournies. À l'issue, le coach vous recommande le programme le plus adapté.", en: "45 minutes with a certified coach to assess your level and goals. Racket and balls provided. Afterwards, the coach recommends the best-suited program." } },
  { q: { fr: "À partir de quel âge les enfants peuvent-ils commencer ?", en: "From what age can children start?" }, a: { fr: "Dès 4 ans avec le mini-tennis (balles en mousse, terrain réduit). Les groupes sont ensuite constitués par âge et par niveau jusqu'à 17 ans.", en: "From age 4 with mini-tennis (foam balls, smaller court). Groups are then organised by age and level up to 17." } },
  { q: { fr: "Puis-je annuler ou déplacer une réservation ?", en: "Can I cancel or move a booking?" }, a: { fr: "Oui, gratuitement jusqu'à 24 h avant le créneau, depuis l'appli ou le lien reçu par e-mail. En deçà, la réservation reste due sauf intempéries sur court extérieur.", en: "Yes, free of charge up to 24h before, from the app or the link in your email. After that, the booking is charged unless weather closes an outdoor court." } },
  { q: { fr: "Prêtez-vous du matériel ?", en: "Do you lend equipment?" }, a: { fr: "Notre pro shop prête gratuitement des raquettes de test et vend des tubes de balles. Le cordage est réalisé en 24 h.", en: "Our pro shop lends demo rackets for free and sells balls. Stringing is done within 24h." } },
  { q: { fr: "Existe-t-il des tarifs réduits ?", en: "Are there discounted rates?" }, a: { fr: "Oui : –25 % pour les étudiants, formule Famille dégressive, et –15 % en payant à l'année. Les comités d'entreprise peuvent nous contacter pour un partenariat.", en: "Yes: –25% for students, a discounted Family plan, and –15% when paying yearly. Works councils can contact us for a partnership." } },
];

/* ------------------------------------------------------------------ */
/* Static i18n                                                         */
/* ------------------------------------------------------------------ */
const frCache = new Map();
function applyStatic() {
  const en = window.I18N_EN || {};
  $$("[data-i18n]").forEach(el => {
    if (!frCache.has(el)) frCache.set(el, el.textContent);
    const k = el.dataset.i18n;
    el.textContent = lang === "en" && en[k] ? en[k].replace(/&amp;/g, "&") : frCache.get(el);
  });
  $$("[data-i18n-html]").forEach(el => {
    if (!frCache.has(el)) frCache.set(el, el.dataset.src || el.innerHTML);
    const k = el.dataset.i18nHtml;
    el.innerHTML = lang === "en" && en[k] ? en[k] : frCache.get(el);
  });
  root.lang = lang;
  $("#lang-toggle").setAttribute("aria-label", U("langLabel"));
  const burger = $("#burger");
  burger.setAttribute("aria-label", burger.getAttribute("aria-expanded") === "true" ? U("menuClose") : U("menuOpen"));
  $$("[data-close][aria-label]").forEach(b => b.setAttribute("aria-label", U("close")));
}

/* Split headings into masked words */
function splitAll() {
  $$(".split").forEach(el => {
    let i = 0;
    const wrap = text => text.split(/(\s+)/).map(w => (/^\s+$/.test(w) || !w ? w : `<span class="sw"><span style="--i:${i++}">${w}</span></span>`)).join("");
    const html = [...el.childNodes].map(n => {
      if (n.nodeType === 3) return wrap(n.textContent);
      if (n.nodeType === 1) return `<${n.tagName.toLowerCase()}>${wrap(n.textContent)}</${n.tagName.toLowerCase()}>`;
      return "";
    }).join("");
    el.innerHTML = html;
  });
}

/* ------------------------------------------------------------------ */
/* Loader                                                              */
/* ------------------------------------------------------------------ */
function runLoader() {
  const loader = $("#loader"), count = $("#loader-count");
  let seen = null;
  try { seen = sessionStorage.getItem("arcadia-seen"); } catch {}
  const dur = reduce || seen ? 250 : 1100;
  const t0 = performance.now();
  let imgReady = false;
  const hero = $("#hero-img");
  if (hero.complete) imgReady = true; else hero.addEventListener("load", () => (imgReady = true), { once: true });
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    count.textContent = "100";
    loader.classList.add("done");
    root.classList.add("ready");
    try { sessionStorage.setItem("arcadia-seen", "1"); } catch {}
    setTimeout(() => $$(".hero .reveal-up").forEach(e => e.classList.add("in")), 50);
  };
  setTimeout(finish, 5000); // safety net if rAF is throttled
  const tick = now => {
    if (finished) return;
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    count.textContent = Math.round(eased * (imgReady ? 100 : 92));
    if (p < 1 || (!imgReady && now - t0 < 4000)) return requestAnimationFrame(tick);
    finish();
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ */
/* Header, menu, nav state                                             */
/* ------------------------------------------------------------------ */
function initHeader() {
  const header = $("#header"), hero = $(".hero"), toTop = $("#to-top");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    const pastHero = y > hero.offsetHeight - header.offsetHeight - 10;
    header.classList.toggle("solid", pastHero);
    header.classList.toggle("hide", y > 500 && y > lastY + 4 && !document.body.classList.contains("menu-open"));
    if (y < lastY - 4 || y < 500) header.classList.remove("hide");
    toTop.classList.toggle("show", y > innerHeight * 1.2);
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const links = $$(".nav a");
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.remove("active"));
      map.get(e.target.id)?.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  [...map.keys()].forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });

  // Menu
  const burger = $("#burger"), menu = $("#menu");
  const setMenu = open => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? U("menuClose") : U("menuOpen"));
    menu.classList.toggle("open", open);
    menu.toggleAttribute("inert", !open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("locked", open);
    header.classList.remove("hide");
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });
  matchMedia("(min-width: 1100px)").addEventListener("change", e => e.matches && setMenu(false));
}

/* ------------------------------------------------------------------ */
/* Reveal, counters, parallax                                          */
/* ------------------------------------------------------------------ */
function initReveal() {
  // Stagger siblings
  const groups = new Map();
  $$(".reveal-up").forEach(el => {
    const p = el.parentElement;
    if (!groups.has(p)) groups.set(p, 0);
    const n = groups.get(p);
    el.style.setProperty("--d", `${Math.min(n, 6) * 0.08}s`);
    groups.set(p, n + 1);
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (e.target.closest(".hero")) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  $$(".reveal-up, .split").forEach(el => io.observe(el));
  initReveal.io = io;
}
function observeNew(scope) {
  $$(".reveal-up:not(.in)", scope).forEach(el => initReveal.io.observe(el));
}

function initCounters() {
  const fmt = (v, kind) => {
    if (kind === "k") return v >= 1000 ? `${(v / 1000).toLocaleString(locale(), { maximumFractionDigits: 1, minimumFractionDigits: 1 })}k` : `${v}`;
    return v.toLocaleString(locale());
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, kind = el.dataset.format;
      if (reduce) { el.textContent = fmt(to, kind); el.dataset.done = 1; return; }
      const t0 = performance.now(), d = 1800;
      const step = now => {
        const p = Math.min(1, (now - t0) / d), k = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(to * k), kind);
        if (p < 1) requestAnimationFrame(step); else el.dataset.done = 1;
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  $$(".count").forEach(el => io.observe(el));
  initCounters.refresh = () => $$(".count[data-done]").forEach(el => (el.textContent = fmt(+el.dataset.to, el.dataset.format)));
}

function initParallax() {
  if (reduce) return;
  const heroImg = $(".hero-media"), hero = $(".hero");
  const items = $$(".parallax");
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight, y = scrollY;
    if (y < hero.offsetHeight) heroImg.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${p * (+el.dataset.speed || 0) * 6}%, 0)`;
    });
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
function renderMarquee() {
  const words = MARQUEE[lang];
  const half = words.map(w => `<span>${w}</span>`).join("");
  $("#marquee").innerHTML = half + half;
}

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */
let progIdx = 0;
function renderProgramTabs() {
  $("#prog-tabs").innerHTML = PROGRAMS.map((p, i) => `
    <button class="prog-tab" role="tab" id="ptab-${i}" aria-controls="prog-panel" aria-selected="${i === progIdx}" tabindex="${i === progIdx ? 0 : -1}" data-i="${i}">
      <small>0${i + 1}</small>
      <div><strong>${L(p.name)}</strong><span class="meta">${L(p.meta)}</span></div>
      <svg class="i"><use href="#i-arrow"/></svg>
    </button>`).join("");
  renderProgramPanel(false);
}
function renderProgramPanel(anim = true) {
  const p = PROGRAMS[progIdx], panel = $("#prog-panel");
  panel.setAttribute("aria-labelledby", `ptab-${progIdx}`);
  panel.classList.remove("pp-anim");
  panel.innerHTML = `
    <div class="pp-media"><img src="${p.img}" alt="" style="object-position:${p.pos}" loading="lazy" decoding="async" /><span class="pp-age">${L(p.meta)}</span></div>
    <div class="pp-body">
      <h3>${L(p.title)}</h3>
      <p>${L(p.desc)}</p>
      <dl class="pp-facts">${p.facts.map(([ic, k, v]) => `<div><svg class="i"><use href="#${ic}"/></svg><dt>${L(k)}</dt><dd>${L(v)}</dd></div>`).join("")}</dl>
      <ul class="pp-list">${L(p.list).map(li => `<li><svg class="i"><use href="#i-check"/></svg><span>${li}</span></li>`).join("")}</ul>
      <div class="pp-foot">
        <p class="pp-price">${U("from")} <strong>${money(p.price)}</strong>${L(p.unit)}</p>
        <button class="btn btn-navy" type="button" data-open="trial" data-prog="${progIdx}"><span>${L({ fr: "Réserver un essai", en: "Book a trial" })}</span><svg class="i"><use href="#i-arrow"/></svg></button>
      </div>
    </div>`;
  if (anim && !reduce) { void panel.offsetWidth; panel.classList.add("pp-anim"); }
}
function selectProgram(i, focus) {
  progIdx = (i + PROGRAMS.length) % PROGRAMS.length;
  $$(".prog-tab").forEach((t, j) => { t.setAttribute("aria-selected", j === progIdx); t.tabIndex = j === progIdx ? 0 : -1; });
  const tab = $(`#ptab-${progIdx}`);
  if (focus) tab.focus();
  tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
  renderProgramPanel();
}
function initPrograms() {
  const tabs = $("#prog-tabs");
  tabs.addEventListener("click", e => { const b = e.target.closest(".prog-tab"); if (b) selectProgram(+b.dataset.i); });
  tabs.addEventListener("keydown", e => {
    const k = e.key;
    if (["ArrowDown", "ArrowRight"].includes(k)) { e.preventDefault(); selectProgram(progIdx + 1, true); }
    if (["ArrowUp", "ArrowLeft"].includes(k)) { e.preventDefault(); selectProgram(progIdx - 1, true); }
    if (k === "Home") { e.preventDefault(); selectProgram(0, true); }
    if (k === "End") { e.preventDefault(); selectProgram(PROGRAMS.length - 1, true); }
  });
  $$("a[data-prog]").forEach(a => a.addEventListener("click", () => selectProgram(+a.dataset.prog)));
}

/* ------------------------------------------------------------------ */
/* Coaches rail                                                        */
/* ------------------------------------------------------------------ */
function renderCoaches() {
  $("#coach-rail").innerHTML = COACHES.map(c => `
    <article class="coach">
      <div class="coach-img">
        <img src="${c.img}" alt="${c.name}" style="object-position:${c.pos}" loading="lazy" decoding="async" draggable="false" />
        <span class="coach-tag">${L(c.tag)}</span>
        <div class="coach-name"><h3>${c.name}</h3><p>${L(c.role)}</p></div>
      </div>
      <div class="coach-body">
        <p>${L(c.bio)}</p>
        <div class="coach-meta">${c.meta.map(m => `<span>${L(m)}</span>`).join("")}</div>
      </div>
    </article>`).join("");
}
function initCoachRail() {
  const rail = $("#coach-rail"), bar = $("#coach-bar");
  const step = () => (rail.querySelector(".coach")?.offsetWidth || 300) + 20;
  $("#coach-prev").addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }));
  $("#coach-next").addEventListener("click", () => {
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + step(), behavior: reduce ? "auto" : "smooth" });
  });
  const prog = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const vis = rail.clientWidth / rail.scrollWidth;
    bar.style.width = `${Math.max(vis, 0.15) * 100}%`;
    bar.style.transform = `translateX(${max > 0 ? (rail.scrollLeft / max) * (1 / Math.max(vis, 0.15) - 1) * 100 : 0}%)`;
  };
  rail.addEventListener("scroll", prog, { passive: true });
  addEventListener("resize", prog);
  prog();
  rail.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); rail.scrollBy({ left: step(), behavior: "smooth" }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); rail.scrollBy({ left: -step(), behavior: "smooth" }); }
  });
  // Mouse drag
  let down = false, sx = 0, sl = 0, moved = false;
  rail.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; });
  addEventListener("pointermove", e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) { moved = true; rail.classList.add("drag"); }
    rail.scrollLeft = sl - dx;
  });
  addEventListener("pointerup", () => {
    if (!down) return;
    down = false;
    if (moved) {
      rail.classList.remove("drag");
      const w = step(), target = Math.round(rail.scrollLeft / w) * w;
      rail.scrollTo({ left: target, behavior: "smooth" });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */
const booked = new Set(); // "YYYY-MM-DD|H|courtId"
const bk = { day: 0, surf: "all", dur: 1, hour: null, court: null };
const dayDate = i => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); return d; };
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const isWeekend = d => d.getDay() === 0 || d.getDay() === 6;
const openHours = d => (isWeekend(d) ? [8, 21] : [7, 23]);
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
function courtFree(d, h, c) {
  const key = `${iso(d)}|${h}|${c.id}`;
  if (booked.has(key)) return false;
  // Busier on evenings & weekends
  const busy = (h >= 17 && h <= 21 ? 0.62 : h >= 12 && h <= 13 ? 0.5 : 0.32) + (isWeekend(d) ? 0.15 : 0);
  return hash(key) > busy;
}
const courtName = c => (c.surf === "indoor" ? `${lang === "fr" ? "Dôme" : "Dome"} ${c.id.slice(1)}` : c.name);
const isPeak = (d, h) => isWeekend(d) || h >= 17;
const rate = (d, h, c) => (isPeak(d, h) ? 30 : 20) + (c && c.surf === "indoor" ? 6 : 0);
function freeCourtsFor(d, h, surf, dur) {
  const now = new Date();
  const [o, cl] = openHours(d);
  if (h < o || h + dur > cl) return [];
  if (iso(d) === iso(now) && h <= now.getHours()) return [];
  const span = Math.ceil(dur);
  return COURTS.filter(c => (surf === "all" || c.surf === surf) && Array.from({ length: span }, (_, k) => courtFree(d, h + k, c)).every(Boolean));
}
function countFree(d) {
  const [o, cl] = openHours(d);
  let n = 0;
  for (let h = o; h < cl; h++) if (freeCourtsFor(d, h, "all", 1).length) n++;
  return n;
}
function renderDays() {
  const wd = new Intl.DateTimeFormat(locale(), { weekday: "short" });
  const mo = new Intl.DateTimeFormat(locale(), { month: "short" });
  $("#days").innerHTML = Array.from({ length: 10 }, (_, i) => {
    const d = dayDate(i);
    return `<button class="day" type="button" role="radio" aria-checked="${i === bk.day}" tabindex="${i === bk.day ? 0 : -1}" data-i="${i}">
      <small>${i === 0 ? U("today") : wd.format(d).replace(".", "")}</small><strong>${d.getDate()}</strong><span>${mo.format(d).replace(".", "")}</span></button>`;
  }).join("");
}
function renderSeg() {
  $("#surface").innerHTML = SURFACES.map(s => `<button type="button" role="radio" aria-checked="${bk.surf === s.id}" data-v="${s.id}">${s.label()}</button>`).join("");
  $("#duration").innerHTML = DURATIONS.map(s => `<button type="button" role="radio" aria-checked="${bk.dur === s.v}" data-v="${s.v}">${s.l}</button>`).join("");
}
function renderSlots() {
  const d = dayDate(bk.day), [o, cl] = openHours(d);
  let html = "", any = false;
  const isToday = bk.day === 0, nowH = new Date().getHours();
  for (let h = o; h < cl; h++) {
    if (h + bk.dur > cl) break;
    if (isToday && h <= nowH) continue;
    const free = freeCourtsFor(d, h, bk.surf, bk.dur);
    const sel = bk.hour === h && free.length;
    if (free.length) any = true;
    const price = Math.min(...(free.length ? free : COURTS.filter(c => bk.surf === "all" || c.surf === bk.surf)).map(c => rate(d, h, c)));
    html += `<button class="slot${isPeak(d, h) ? " peak" : ""}" type="button" role="radio" aria-checked="${!!sel}" data-h="${h}" ${free.length ? "" : "disabled"}
      aria-label="${h}:00 — ${free.length ? U("courtsFree", free.length) : U("full")}">
      <strong>${String(h).padStart(2, "0")}:00</strong><span>${free.length ? `${U("courtsFree", free.length)} · ${money(price)}` : U("full")}</span></button>`;
  }
  if (!any) html = `<p class="slots-empty">${U("noSlots")}</p>` + html;
  $("#slots").innerHTML = html;
  if (bk.hour != null && !freeCourtsFor(d, bk.hour, bk.surf, bk.dur).length) { bk.hour = null; bk.court = null; }
  renderSummary();
}
function fmtDate(d, long) {
  return new Intl.DateTimeFormat(locale(), long ? { weekday: "long", day: "numeric", month: "long" } : { weekday: "short", day: "numeric", month: "short" }).format(d);
}
const fmtDateFr = d => new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
const hm = h => { const H = Math.floor(h), M = Math.round((h - H) * 60); return `${String(H).padStart(2, "0")}:${String(M).padStart(2, "0")}`; };
function bookingTotal() {
  const d = dayDate(bk.day);
  if (bk.hour == null || !bk.court) return null;
  let total = 0;
  for (let k = 0; k < Math.ceil(bk.dur); k++) total += rate(d, bk.hour + k, bk.court) * Math.min(1, bk.dur - k);
  return total;
}
function renderSummary() {
  const d = dayDate(bk.day);
  if (bk.hour != null) {
    const free = freeCourtsFor(d, bk.hour, bk.surf, bk.dur);
    if (!bk.court || !free.includes(bk.court)) bk.court = free[0] || null;
  }
  const has = bk.hour != null && bk.court;
  $("#sum-date").textContent = fmtDate(d);
  $("#sum-time").textContent = has ? `${hm(bk.hour)} – ${hm(bk.hour + bk.dur)}` : "—";
  $("#sum-court").textContent = has ? courtName(bk.court) : "—";
  $("#sum-dur").textContent = DURATIONS.find(x => x.v === bk.dur).l;
  $("#sum-price").textContent = has ? money(bookingTotal()) : "—";
  $("#book-go").disabled = !has;
}
function updateHeroFree() {
  let n = countFree(dayDate(0)), lbl = U("todayAvail");
  if (!n) { n = countFree(dayDate(1)); lbl = U("tomorrowAvail"); }
  $("#hero-free").textContent = n;
  $("#hero-slots").textContent = lang === "fr" ? (n > 1 ? "créneaux libres" : "créneau libre") : (n > 1 ? "open slots" : "open slot");
  $(".live-head [data-i18n]").textContent = lbl;
}
function radioKeys(container, sel, onPick) {
  container.addEventListener("keydown", e => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    const items = $$(sel, container).filter(b => !b.disabled);
    const cur = items.indexOf(document.activeElement);
    if (cur < 0) return;
    e.preventDefault();
    const nx = items[(cur + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1) + items.length) % items.length];
    nx.focus(); onPick(nx);
  });
}
function initBooking() {
  renderDays(); renderSeg(); renderSlots(); updateHeroFree();
  const pickDay = b => { bk.day = +b.dataset.i; bk.hour = null; renderDays(); renderSlots(); $(`.day[data-i="${bk.day}"]`).focus({ preventScroll: true }); };
  $("#days").addEventListener("click", e => { const b = e.target.closest(".day"); if (b) pickDay(b); });
  radioKeys($("#days"), ".day", pickDay);
  $("#surface").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; bk.surf = b.dataset.v; renderSeg(); renderSlots(); });
  $("#duration").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; bk.dur = +b.dataset.v; renderSeg(); renderSlots(); });
  const pickSlot = b => { bk.hour = +b.dataset.h; bk.court = null; $$(".slot", $("#slots")).forEach(s => s.setAttribute("aria-checked", s === b)); renderSummary(); };
  $("#slots").addEventListener("click", e => { const b = e.target.closest(".slot"); if (b && !b.disabled) pickSlot(b); });
  radioKeys($("#slots"), ".slot", pickSlot);
  $("#book-go").addEventListener("click", openBookingModal);
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */
let billing = "m";
function renderPlans() {
  $("#plans").innerHTML = PLANS.map(p => {
    const yearly = Math.round(p.m * 12 * 0.85);
    const shown = billing === "m" ? p.m : Math.round(yearly / 12);
    return `<article class="plan${p.featured ? " featured" : ""} reveal-up${initReveal.io ? "" : ""}">
      ${p.featured ? `<span class="plan-badge">${U("popular")}</span>` : ""}
      <h3>${L(p.name)}</h3>
      <p class="plan-desc">${L(p.desc)}</p>
      <div class="plan-price"><strong data-v="${shown}">${shown} €</strong><span>${U("perMonth")}</span></div>
      <p class="plan-sub">${billing === "y" ? U("billedYear", money(yearly)) : U("noCommit")}</p>
      <ul>${L(p.feats).map(f => `<li><svg class="i"><use href="#i-check"/></svg><span>${f}</span></li>`).join("")}</ul>
      <button class="btn ${p.featured ? "btn-ball" : ""} btn-block" type="button" data-open="plan" data-plan="${p.id}"><span>${L({ fr: "Choisir", en: "Choose" })} ${L(p.name)}</span><svg class="i"><use href="#i-arrow"/></svg></button>
    </article>`;
  }).join("");
  if (initReveal.io) observeNew($("#plans"));
}
function initPricing() {
  $$(".billing button").forEach(b => b.addEventListener("click", () => {
    if (billing === b.dataset.bill) return;
    billing = b.dataset.bill;
    $$(".billing button").forEach(x => x.setAttribute("aria-checked", x === b));
    // animate number swap
    $$(".plan-price strong").forEach((el, i) => {
      const p = PLANS[i], from = parseInt(el.dataset.v, 10);
      const to = billing === "m" ? p.m : Math.round(Math.round(p.m * 12 * 0.85) / 12);
      const t0 = performance.now();
      const st = now => { const k = Math.min(1, (now - t0) / 500), e = 1 - Math.pow(1 - k, 3); el.textContent = `${Math.round(from + (to - from) * e)} €`; if (k < 1) requestAnimationFrame(st); };
      el.dataset.v = to;
      reduce ? (el.textContent = `${to} €`) : requestAnimationFrame(st);
      el.closest(".plan").querySelector(".plan-sub").textContent = billing === "y" ? U("billedYear", money(Math.round(p.m * 12 * 0.85))) : U("noCommit");
    });
  }));
}

/* ------------------------------------------------------------------ */
/* Reviews, events, FAQ                                                */
/* ------------------------------------------------------------------ */
const stars = '<div class="stars" aria-label="5/5">' + '<svg><use href="#i-star"/></svg>'.repeat(5) + "</div>";
const initials = n => n.split(" ").map(x => x[0]).join("").slice(0, 2);
function renderReviews() {
  $("#rev-grid").innerHTML = REVIEWS.map(r => `
    <figure class="rev${r.hl ? " hl" : ""}${r.big ? " big" : ""} reveal-up">
      ${stars}
      <blockquote>“${L(r.q)}”</blockquote>
      <figcaption><span class="avatar" style="background:${r.c}" aria-hidden="true">${initials(r.n)}</span><div><strong>${r.n}</strong><span>${L(r.r)}</span></div></figcaption>
    </figure>`).join("");
  if (initReveal.io) observeNew($("#rev-grid"));
}
function renderEvents() {
  const dm = new Intl.DateTimeFormat(locale(), { month: "short" });
  $("#ev-list").innerHTML = EVENTS.map((e, i) => {
    const d = new Date(e.d + "T12:00:00");
    const full = e.left === 0;
    return `<li class="ev reveal-up"><button type="button" data-open="event" data-ev="${i}" ${full ? 'aria-disabled="true"' : ""}>
      <span class="ev-date"><strong>${d.getDate()}</strong><span>${dm.format(d).replace(".", "")}</span></span>
      <span class="ev-title"><h3>${L(e.title)}</h3><p>${L(e.sub)}</p></span>
      <span class="ev-cat"><span class="tag ${EV_CAT[e.cat].cls}">${L(EV_CAT[e.cat].l)}</span></span>
      <span class="ev-spots">${full ? `<b>${U("full")}</b>` : `<b>${e.left}</b> / ${e.spots} ${U("places")} ${U("left")}`}</span>
      <span class="ev-arrow"><svg class="i"><use href="#i-arrow"/></svg></span>
    </button></li>`;
  }).join("");
  if (initReveal.io) observeNew($("#ev-list"));
}
function renderFaq() {
  const open = $$(".acc-q").map(b => b.getAttribute("aria-expanded") === "true");
  $("#faq-list").innerHTML = FAQ.map((f, i) => `
    <div class="acc-item reveal-up">
      <h3><button class="acc-q" type="button" id="faq-q${i}" aria-expanded="${open[i] ?? i === 0}" aria-controls="faq-a${i}">
        <span>${L(f.q)}</span><span class="ic" aria-hidden="true"><svg class="i"><use href="#i-plus"/></svg></span></button></h3>
      <div class="acc-a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div><p>${L(f.a)}</p></div></div>
    </div>`).join("");
  if (initReveal.io) observeNew($("#faq-list"));
}
function initFaq() {
  $("#faq-list").addEventListener("click", e => {
    const b = e.target.closest(".acc-q"); if (!b) return;
    b.setAttribute("aria-expanded", String(b.getAttribute("aria-expanded") !== "true"));
  });
}

/* ------------------------------------------------------------------ */
/* Contact: hours + forms                                              */
/* ------------------------------------------------------------------ */
function renderHours() {
  const now = new Date(), day = now.getDay();
  $$("#hours tr").forEach(tr => {
    const we = tr.dataset.days === "6-0";
    tr.classList.toggle("today", we === (day === 0 || day === 6));
  });
  const [o, c] = openHours(now), h = now.getHours() + now.getMinutes() / 60;
  const open = h >= o && h < c;
  const el = $("#open-now");
  let nextOpen = o;
  if (!open && h >= c) { const t = new Date(now); t.setDate(t.getDate() + 1); nextOpen = openHours(t)[0]; }
  el.textContent = open ? U("openNow", c) : U("closedNow", nextOpen);
  el.classList.toggle("closed", !open);
  $(".live-dot").classList.toggle("closed", !open);
}
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOk = v => v.replace(/[\s.\-()]/g, "").replace(/^\+/, "").length >= 9 && /^[+\d\s.\-()]+$/.test(v.trim());
function validate(form) {
  let ok = true, first = null;
  $$("input, textarea, select", form).forEach(f => {
    const wrap = f.closest(".fld, .check");
    if (!wrap) return;
    let valid = true;
    if (f.type === "checkbox") valid = !f.required || f.checked;
    else if (f.required && !f.value.trim()) valid = false;
    else if (f.type === "email" && f.value && !emailOk(f.value)) valid = false;
    else if (f.type === "tel" && f.value && !phoneOk(f.value)) valid = false;
    wrap.classList.toggle("invalid", !valid);
    f.setAttribute("aria-invalid", String(!valid));
    if (!valid) { ok = false; first ||= f; }
  });
  first?.focus();
  return ok;
}
function liveClear(form) {
  form.addEventListener("input", e => { const w = e.target.closest(".invalid"); if (w) { w.classList.remove("invalid"); e.target.removeAttribute("aria-invalid"); } });
  form.addEventListener("change", e => { const w = e.target.closest(".invalid"); if (w) w.classList.remove("invalid"); });
}
/* ------------------------------------------------------------------ */
/* Email delivery (Web3Forms)                                          */
/* ------------------------------------------------------------------ */
const FORM_KEY = ((window.ARCADIA_CONFIG || {}).web3formsKey || "").trim();
const HONEYPOT = '<input class="hp" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" />';
// Sends one request to the club's inbox. Without a key the site runs in demo mode.
async function sendForm(form, subject, fields, replyTo) {
  if (form?.querySelector('[name="botcheck"]')?.checked) return; // bot: pretend success
  if (!FORM_KEY) { await new Promise(r => setTimeout(r, 600)); return; }
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: FORM_KEY,
      subject,
      from_name: "Site Arcadia Tennis Club",
      replyto: replyTo,
      "Langue du site": lang.toUpperCase(),
      ...fields,
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
}
// Runs a send with a busy button; returns true on success, shows an error toast otherwise.
async function submitting(btn, task) {
  const label = btn.querySelector("span") || btn;
  const prev = label.textContent;
  btn.disabled = true;
  btn.setAttribute("aria-busy", "true");
  if (label !== btn) label.textContent = L({ fr: "Envoi…", en: "Sending…" });
  try { await task(); return true; }
  catch (err) { console.error("Form delivery failed:", err); toast(U("sendErr")); return false; }
  finally { btn.disabled = false; btn.removeAttribute("aria-busy"); if (label !== btn) label.textContent = prev; }
}
function initContact() {
  const form = $("#contact-form");
  liveClear(form);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!validate(form)) return;
    const d = Object.fromEntries(new FormData(form));
    const ok = await submitting($("button[type=submit]", form), () => sendForm(form, `Contact — ${d.subject} — ${d.first} ${d.last}`, {
      "Prénom": d.first, "Nom": d.last, "E-mail": d.email, "Sujet": d.subject, "Message": d.message,
    }, d.email));
    if (!ok) return;
    $(".form-ok", form).hidden = false;
    form.reset();
    toast(L({ fr: "Message envoyé — merci !", en: "Message sent — thank you!" }));
  });
  $("#news-form").addEventListener("submit", async e => {
    e.preventDefault();
    const nf = e.currentTarget, inp = $("#news-email"), msg = $("#news-msg");
    if (!emailOk(inp.value)) { msg.textContent = U("newsBad"); msg.classList.add("bad"); inp.focus(); return; }
    const email = inp.value.trim();
    const ok = await submitting($("button[type=submit]", nf), () => sendForm(nf, `Newsletter — nouvelle inscription : ${email}`, { "E-mail": email }, email));
    msg.textContent = ok ? U("newsOk") : U("sendErr");
    msg.classList.toggle("bad", !ok);
    if (ok) inp.value = "";
  });
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */
const modal = $("#modal"), mbody = $("#modal-body");
let lastFocus = null;
function openModal(html) {
  lastFocus = document.activeElement;
  mbody.innerHTML = html;
  modal.classList.add("open");
  modal.removeAttribute("inert");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  setTimeout(() => ($("input, select, button:not(.modal-x)", mbody) || $(".modal-x")).focus(), 60);
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("inert", "");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  lastFocus?.focus?.();
}
modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
addEventListener("keydown", e => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") {
    const f = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal.querySelector(".modal-panel")).filter(x => !x.disabled && x.offsetParent);
    if (!f.length) return;
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
});
const fld = (name, label, type = "text", extra = "") => `<label class="fld"><span>${label}</span><input name="${name}" type="${type}" ${extra} required /><em class="err">${type === "email" ? U("badEmail") : type === "tel" ? U("badPhone") : U("req")}</em></label>`;
const sel = (name, label, opts, selIdx = 0) => `<label class="fld"><span>${label}</span><select name="${name}">${opts.map((o, i) => `<option${i === selIdx ? " selected" : ""}>${o}</option>`).join("")}</select></label>`;
const doneView = (title, text, ref) => `<div class="m-done">
  <div class="big-check"><svg class="i"><use href="#i-check"/></svg></div>
  <h2 class="m-title" id="modal-title">${title}</h2>
  <p class="m-sub">${text}</p>
  ${ref ? `<span class="ref">${U("ref")} · ${ref}</span><br />` : ""}
  <button class="btn btn-navy" type="button" data-close>${U("done")}</button></div>`;
const refCode = () => "ARC-" + Math.random().toString(36).slice(2, 7).toUpperCase();
// build(data, ref) -> [subject, fields]; onDone(data, ref) -> success view HTML
function wireModalForm(build, onDone) {
  const form = $("form", mbody);
  form.insertAdjacentHTML("afterbegin", HONEYPOT);
  liveClear(form);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!validate(form)) return;
    const data = Object.fromEntries(new FormData(form)), ref = refCode();
    const [subject, fields] = build(data, ref);
    const contact = { "Nom": data.name, "E-mail": data.email, "Téléphone": data.phone };
    const ok = await submitting($("button[type=submit]", form), () => sendForm(form, `${subject} — ${data.name}`, { ...fields, ...contact, "Référence": ref }, data.email));
    if (!ok) return;
    mbody.innerHTML = onDone(data, ref);
    $("button", mbody)?.focus();
  });
}

function openBookingModal() {
  const d = dayDate(bk.day), c = bk.court, total = bookingTotal();
  if (!c) return;
  openModal(`
    <p class="eyebrow">${L({ fr: "Réservation", en: "Booking" })}</p>
    <h2 class="m-title" id="modal-title">${U("bookTitle")}</h2>
    <p class="m-sub">${U("bookSub")}</p>
    <dl class="m-recap">
      <div><dt>${L({ fr: "Date", en: "Date" })}</dt><dd>${fmtDate(d, true)}</dd></div>
      <div><dt>${L({ fr: "Horaire", en: "Time" })}</dt><dd>${hm(bk.hour)} – ${hm(bk.hour + bk.dur)}</dd></div>
      <div><dt>${L({ fr: "Court", en: "Court" })}</dt><dd>${courtName(c)}</dd></div>
      <div><dt>Total</dt><dd>${money(total)}</dd></div>
    </dl>
    <form class="m-form" novalidate>
      ${fld("name", U("name"), "text", 'autocomplete="name"')}
      <div class="f-row">${fld("email", U("email"), "email", 'autocomplete="email"')}${fld("phone", U("phone"), "tel", 'autocomplete="tel"')}</div>
      <button class="btn btn-ball btn-block" type="submit"><span>${U("confirm")}</span><svg class="i"><use href="#i-arrow"/></svg></button>
    </form>`);
  const snap = { d, h: bk.hour, dur: bk.dur, c };
  wireModalForm(() => ["Réservation de court", {
    "Date": fmtDateFr(snap.d), "Horaire": `${hm(snap.h)} – ${hm(snap.h + snap.dur)}`,
    "Court": courtName(snap.c), "Durée": DURATIONS.find(x => x.v === snap.dur).l, "Total": `${total} €`,
  }], (data, ref) => {
    for (let k = 0; k < Math.ceil(snap.dur); k++) booked.add(`${iso(snap.d)}|${snap.h + k}|${snap.c.id}`);
    bk.hour = null; bk.court = null;
    renderSlots(); updateHeroFree();
    return doneView(U("bookedTitle"), U("bookedSub", fmtDate(snap.d, true), hm(snap.h)), ref);
  });
}
function openTrialModal(progI) {
  const progNames = PROGRAMS.map(p => L(p.name));
  openModal(`
    <p class="eyebrow">${U("trialEyebrow")}</p>
    <h2 class="m-title" id="modal-title">${U("trialTitle")}</h2>
    <p class="m-sub">${U("trialSub")}</p>
    <form class="m-form" novalidate>
      ${fld("name", U("name"), "text", 'autocomplete="name"')}
      <div class="f-row">${fld("email", U("email"), "email", 'autocomplete="email"')}${fld("phone", U("phone"), "tel", 'autocomplete="tel"')}</div>
      <div class="f-row">${sel("prog", L({ fr: "Programme", en: "Program" }), progNames, progI ?? 0)}${sel("level", U("level"), U("levels"))}</div>
      <button class="btn btn-ball btn-block" type="submit"><span>${U("send")}</span><svg class="i"><use href="#i-arrow"/></svg></button>
    </form>`);
  wireModalForm(data => ["Demande de cours d'essai", { "Programme": data.prog, "Niveau": data.level }],
    data => doneView(U("trialDoneT"), U("trialDoneD", (data.name || "").split(" ")[0])));
}
function openEventModal(i) {
  const e = EVENTS[i];
  if (!e || e.left === 0) { toast(L({ fr: "Cet événement est complet — liste d'attente à l'accueil.", en: "This event is full — ask the front desk for the waiting list." })); return; }
  openModal(`
    <p class="eyebrow">${U("evEyebrow")}</p>
    <h2 class="m-title" id="modal-title">${L(e.title)}</h2>
    <p class="m-sub">${fmtDate(new Date(e.d + "T12:00:00"), true)} · ${L(e.sub)}</p>
    <form class="m-form" novalidate>
      ${fld("name", U("name"), "text", 'autocomplete="name"')}
      <div class="f-row">${fld("email", U("email"), "email", 'autocomplete="email"')}${fld("phone", U("phone"), "tel", 'autocomplete="tel"')}</div>
      ${sel("level", U("level"), U("levels"))}
      <button class="btn btn-ball btn-block" type="submit"><span>${U("register")}</span><svg class="i"><use href="#i-arrow"/></svg></button>
    </form>`);
  wireModalForm(data => [`Inscription événement : ${e.title.fr}`, { "Événement": e.title.fr, "Date": fmtDateFr(new Date(e.d + "T12:00:00")), "Niveau": data.level }],
    (data, ref) => { e.left = Math.max(0, e.left - 1); renderEvents(); return doneView(U("evDoneT"), U("evDoneD", L(e.title)), ref); });
}
function openPlanModal(id) {
  const p = PLANS.find(x => x.id === id);
  const yearly = Math.round(p.m * 12 * 0.85);
  openModal(`
    <p class="eyebrow">${U("planEyebrow")}</p>
    <h2 class="m-title" id="modal-title">${L({ fr: "Formule", en: "Plan" })} <em>${L(p.name)}</em></h2>
    <p class="m-sub">${billing === "m" ? `${p.m} €${U("perMonth")} · ${U("noCommit")}` : `${money(yearly)} / ${L({ fr: "an", en: "year" })}`}</p>
    <form class="m-form" novalidate>
      ${fld("name", U("name"), "text", 'autocomplete="name"')}
      <div class="f-row">${fld("email", U("email"), "email", 'autocomplete="email"')}${fld("phone", U("phone"), "tel", 'autocomplete="tel"')}</div>
      ${sel("who", U("forWho"), U("forWhoOpts"))}
      <button class="btn btn-ball btn-block" type="submit"><span>${U("join")}</span><svg class="i"><use href="#i-arrow"/></svg></button>
    </form>`);
  const period = billing;
  wireModalForm(data => [`Demande d'adhésion : ${p.name.fr}`, {
    "Formule": p.name.fr, "Facturation": period === "m" ? `Mensuelle — ${p.m} €/mois` : `Annuelle — ${yearly} €/an`, "Pour qui": data.who,
  }], (data, ref) => doneView(U("planDoneT"), U("planDoneD", L(p.name)), ref));
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-open]");
  if (!t) return;
  const kind = t.dataset.open;
  if (kind === "trial") openTrialModal(t.dataset.prog != null ? +t.dataset.prog : progIdx);
  if (kind === "event") openEventModal(+t.dataset.ev);
  if (kind === "plan") openPlanModal(t.dataset.plan);
});

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */
let toastT;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ------------------------------------------------------------------ */
/* Render all dynamic content (on boot + language switch)              */
/* ------------------------------------------------------------------ */
function renderDynamic() {
  renderMarquee();
  renderProgramTabs();
  renderCoaches();
  renderDays(); renderSeg(); renderSlots(); updateHeroFree();
  renderPlans();
  renderReviews();
  renderEvents();
  renderFaq();
  renderHours();
}
function setLang(next) {
  lang = next;
  store.set("arcadia-lang", lang);
  const splitIn = $$(".split").map(el => el.classList.contains("in"));
  applyStatic();
  splitAll();
  $$(".split").forEach((el, i) => splitIn[i] && el.classList.add("in"));
  renderDynamic();
  $$(".reveal-up:not(.in)").forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add("in"); });
  initCounters.refresh?.();
  if (modal.classList.contains("open")) closeModal();
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
applyStatic();
splitAll();
initReveal();
renderDynamic();
initHeader();
initCounters();
initParallax();
initPrograms();
initCoachRail();
initBooking();
initPricing();
initFaq();
initContact();
$("#year").textContent = new Date().getFullYear();
$("#lang-toggle").addEventListener("click", () => setLang(lang === "fr" ? "en" : "fr"));
setInterval(() => { renderHours(); updateHeroFree(); }, 60000);
runLoader();
})();

const VIEWS = ["studio", "flows", "dialogue", "grade", "pitch"];
const TITLES = {
  studio: "Prototype · Grammarly in Word",
  flows: "Flows · Grammarly in Word",
  dialogue: "Sample dialogue · Grammarly in Word",
  grade: "Grade · Grammarly in Word",
  pitch: "Pitch · Grammarly in Word",
};

const DIMS = [
  { id: "grammar", label: "Grammar", weight: 0.15, high: "Mechanics do not pull a careful reader off the claim." },
  { id: "tone", label: "Tone", weight: 0.2, high: "Diction matches the tone locked in the brief." },
  { id: "style", label: "Style", weight: 0.15, high: "Sentences are shaped for the audience named in the brief." },
  { id: "vocabulary", label: "Vocabulary", weight: 0.15, high: "Word choice is precise enough to defend out loud." },
  { id: "persuasiveness", label: "Persuasiveness", weight: 0.35, high: "The draft does the job the writer said it should do." },
];

const BASE = { grammar: 80, tone: 64, style: 66, vocabulary: 70, persuasiveness: 62 };

const SAMPLE = {
  topic: "A city council proposal to fund bus and rail instead of widening roads",
  tone: "Confident and respectful, for city council",
  message: "Convince the council that transit cuts congestion and is fairer than adding lanes",
};

const TONES = [
  SAMPLE.tone,
  "Neutral and informative",
  "Warm and conversational",
  "Urgent and direct",
  "Academic and measured",
];

const CATS = {
  Grammar: { color: "#185abd", soft: "#e7f0fb" },
  Tone: { color: "#5c6b7a", soft: "#eef1f4" },
  Style: { color: "#2f6fad", soft: "#e8f1fa" },
  Clarity: { color: "#3d4f63", soft: "#eef2f5" },
  Persuasion: { color: "#0f3d82", soft: "#e6eef8" },
};

const STARTER_TITLE = "Why this city should fund transit, not wider roads";
const STARTER_DOC = "Cities should invest more in public transit because its really important for the environment and stuff. Lots of people drive cars which causes traffic and pollution. If we had better buses everyone would use them. Studies show that public transportation can reduce emissions. This is a good idea that everyone should support.";

const SUGGESTIONS = [
  {
    id: "g1",
    category: "Grammar",
    original: "its",
    lead: "The claim sentence needs “it is.” “Its” is possessive, and this clause is not.",
    why: "“Its” without an apostrophe is the possessive pronoun, as in “the city and its budget.” This clause means “it is.” A council packet is read by people who notice that miss in the first line, and the first line is where this draft has to sound sure of itself.",
    clarity: "The sentence is trying to say the investment matters. The missing word does not change the policy logic, but it does make a careful reader pause on the writer. Correctness here is about keeping attention on the argument.",
    message: "The brief asks for a confident, respectful case. A basic error in the claim sentence spends that confidence before the reason arrives. “It is” also fits a formal room better than a contraction. The contraction is available if the only goal is to clear the error.",
    options: [
      { text: "it is", note: "Recommended. Fixes the error and keeps the claim sentence formal enough for the locked tone." },
      { text: "it's", note: "Clears the error with the smallest edit. Slightly chattier than the brief’s room." },
      { text: "the investment is", note: "Avoids the pronoun and names the thing that matters. Harder to misread, a little heavier." },
    ],
    deltas: { grammar: 14 },
  },
  {
    id: "t1",
    category: "Tone",
    original: "and stuff",
    lead: "“And stuff” sounds unfinished in a room that is about to vote.",
    why: "“And stuff” tells the reader you have a category in mind and have not chosen it. With a friend, that can sound honest. With a council, it sounds like the thinking stopped. That fights the tone you locked: confident and respectful.",
    clarity: "This sentence’s job is to say why transit is worth funding. A named cost can be questioned, sourced, or voted on. “Stuff” cannot. Clarity here means giving the reader a reason with edges.",
    message: "You want them to believe transit is fairer than wider roads. Cost, air, access, and climate targets are four different doors into that belief. Pick one door in this sentence. Cost is the recommended door because road-widening debates are usually about delay and money. The emissions point already has its own sentence later.",
    options: [
      { text: "and for the daily cost of congestion", note: "Recommended. Matches a budget hearing and leaves climate for the sentence that already mentions emissions." },
      { text: "and for neighborhood air quality", note: "Use this if the next paragraph will stay on health rather than on the vote." },
      { text: "and for people who cannot drive", note: "Opens the fairness argument immediately. Strong if equity is the lead." },
    ],
    deltas: { tone: 20, style: 8 },
  },
  {
    id: "v1",
    category: "Style",
    original: "Lots of people drive cars which causes traffic and pollution",
    lead: "“Lots of people” cannot be defended, and the verb does not agree.",
    why: "“Lots” has no boundary, so a skeptical member hears a guess. “Which causes” is also singular against a plural idea, which makes the sentence feel unedited. In this genre, precise words are how the writer keeps credibility.",
    clarity: "“Most commuters in this city” names who. “Drive alone” names the behavior you are contrasting with a bus. “Delay and tailpipe pollution” splits one vague harm into the two harms a transportation vote already recognizes.",
    message: "Fairness depends on who is affected. “Most commuters” stays large enough to matter and small enough to defend. If you do not have the local mode-share number yet, this wording leaves a clean slot to drop it in.",
    options: [
      { text: "Most commuters in this city still drive alone, which adds delay and tailpipe pollution", note: "Recommended. Names the group, fixes agreement, and splits the harm into delay and pollution." },
      { text: "Many residents drive alone, which adds delay and local pollution", note: "Safer if you are not ready to say “most.” Slightly weaker as a reason to spend city money." },
      { text: "A large share of weekday trips are solo car trips, which slows the main corridors", note: "Sounds the most like a staff memo. Use it when you are about to cite a count." },
    ],
    deltas: { vocabulary: 16, grammar: 4 },
  },
  {
    id: "c1",
    category: "Clarity",
    original: "If we had better buses everyone would use them",
    lead: "“Everyone” is an absolute a single dissenter can throw out.",
    why: "One council member who would not switch can dismiss the sentence, and with it some of the paragraph. Better frequency does not create universal ridership. It creates a real option for people the current schedule fails.",
    clarity: "The revision states a mechanism (frequency), an outcome (a practical choice), and a population (riders with no reliable alternative). A reader can agree halfway. Policy arguments survive on halfway agreement.",
    message: "The message is to win a funding choice, not to sound enthusiastic. A bounded claim is more persuasive to this audience than a total one, because it shows you already considered the objection.",
    options: [
      { text: "Better bus frequency would make transit a practical choice for riders who have no reliable alternative", note: "Recommended. Replaces the absolute with a mechanism and a specific group." },
      { text: "More frequent buses would raise ridership among people who can already reach a stop", note: "Even tighter. Use it if you are not claiming new routes, only better service." },
      { text: "If frequency improved, some drivers would switch for peak-hour trips", note: "Good when the rival plan is a peak-hour lane. Smaller claim, harder to attack." },
    ],
    deltas: { persuasiveness: 14, style: 10 },
  },
  {
    id: "p1",
    category: "Persuasion",
    original: "This is a good idea that everyone should support",
    lead: "The close restates approval. It never names the vote.",
    why: "“A good idea” is a judgment with no content, and “everyone” repeats the absolute you are trying to get out of the draft. The brief’s message is a decision: fund transit rather than wider roads. A last sentence should name the body, the action, and the reason.",
    clarity: "The revision says what to do (fund the expansion in this budget) and why that action beats the alternative on the table (more people moved, less new pavement). “Support this” does not say what support looks like on Tuesday night.",
    message: "Respectful does not mean vague. Addressing the council and naming the decision is more respectful than telling everyone what they should feel. The reason clause carries fairness without a speech: the same money, less pavement, more people.",
    options: [
      { text: "The council should fund the transit expansion in this budget, because it moves more people with less new pavement", note: "Recommended. Names the body, the action, the timing, and the comparison your message depends on." },
      { text: "Please vote to move this year’s road-widening allocation into the transit package", note: "The most direct ask. Use it if the agenda item is literally a transfer of funds." },
      { text: "I ask the council to approve the expansion because riders and drivers share the same congested corridors", note: "Warmer, still formal. Leans on a shared problem rather than on pavement." },
    ],
    deltas: { persuasiveness: 14, tone: 8 },
  },
];

const SEGMENTS = [
  { id: "a", text: "Cities should invest more in public transit because " },
  { id: "g1", text: "its", suggestionId: "g1" },
  { id: "b", text: " really important for the environment " },
  { id: "t1", text: "and stuff", suggestionId: "t1" },
  { id: "c", text: ". " },
  { id: "v1", text: "Lots of people drive cars which causes traffic and pollution", suggestionId: "v1" },
  { id: "d", text: ". " },
  { id: "c1", text: "If we had better buses everyone would use them", suggestionId: "c1" },
  { id: "e", text: ". Studies show that public transportation can reduce emissions. " },
  { id: "p1", text: "This is a good idea that everyone should support", suggestionId: "p1" },
  { id: "f", text: "." },
];

const WEAKNESS = {
  g1: ["The claim sentence has a basic error", "“Its” is possessive. Starting a council argument with that miss trains the reader to doubt the care of everything after it."],
  t1: ["The tone slips out of the room", "“And stuff” is spoken diction. It tells a formal audience the reason has not been chosen yet."],
  v1: ["The key fact is too vague to defend", "“Lots of people” cannot survive a follow-up question, and the verb agreement makes the sentence feel unfinished."],
  c1: ["An absolute is doing the work of a mechanism", "“Everyone would use them” is the sentence a skeptical member will quote back."],
  p1: ["The close never names the decision", "“A good idea” asks for a feeling. The brief asked you to win a funding choice against wider roads."],
};

const GAIN = {
  g1: ["The claim is mechanically clean", "A reader can enter the argument without stopping on a possessive."],
  t1: ["The reason sounds like the hearing", "Congestion cost is a reason this audience already knows how to debate."],
  v1: ["The subject of the sentence is defendable", "“Most commuters” and “drive alone” can hold a number when you have one."],
  c1: ["The ridership claim can survive a question", "Frequency plus a defined group is a mechanism, not a wish."],
  p1: ["The last sentence is the ask", "The council, the budget, and the pavement comparison are all in the close."],
};

const PATH = {
  g1: ["Read the claim sentence aloud once", "If the first line has a mechanical error, fix that before you tune adjectives. Confidence is partly cleanliness."],
  t1: ["Cut any word you would not say into the microphone", "Hold the locked tone next to the draft. Filler that signals “I have not decided” is the first cut."],
  v1: ["Replace unbounded quantities", "Trade “lots,” “many,” and “really” for who, where, and how often. Leave a slot for one local figure."],
  c1: ["Bound every absolute", "When you write “everyone” or “always,” name the group and the condition."],
  p1: ["Close on the decision", "The last sentence names the body, the action, and the reason. Approval is not an action."],
};

const state = loadState();
let lastView = null;
const scrollMemory = { desk: 0, side: 0 };

function loadState() {
  const blank = {
    topic: "",
    tone: "",
    message: "",
    coaching: false,
    accepted: [],
    dismissed: [],
    choices: {},
    selected: "",
    graded: false,
    title: STARTER_TITLE,
    doc: STARTER_DOC,
    reviewing: false,
    submitted: false,
    hidden: [],
    pendingSubmit: false,
    reviewError: "",
  };
  try {
    const raw = sessionStorage.getItem("brief-demo");
    if (!raw) return blank;
    return { ...blank, ...JSON.parse(raw) };
  } catch {
    return blank;
  }
}

function persist() {
  sessionStorage.setItem("brief-demo", JSON.stringify({
    topic: state.topic,
    tone: state.tone,
    message: state.message,
    coaching: state.coaching,
    accepted: state.accepted,
    dismissed: state.dismissed,
    choices: state.choices,
    selected: state.selected,
    graded: state.graded,
    title: state.title,
    doc: state.doc,
    reviewing: state.reviewing,
    submitted: state.submitted,
    hidden: state.hidden,
    pendingSubmit: state.pendingSubmit,
  }));
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function suggestion(id) {
  return SUGGESTIONS.find((item) => item.id === id);
}

function ready() {
  return state.topic.trim().length > 2 && state.tone.trim().length > 0 && state.message.trim().length > 8;
}

function openIds() {
  return SUGGESTIONS.map((item) => item.id).filter(
    (id) => !state.accepted.includes(id) && !state.dismissed.includes(id),
  );
}

function findingById(id) {
  return analyze(state.doc || "").find((item) => item.id === id) || suggestion(id);
}

function choiceIndex(id) {
  const item = findingById(id);
  if (!item) return 0;
  const index = state.choices[id] ?? 0;
  return index >= 0 && index < item.options.length ? index : 0;
}

function fullText() {
  return state.doc || "";
}

const EXTRA = {
  g1: { grammar: 14 },
  t1: { tone: 18, style: 8 },
  v1: { vocabulary: 14, grammar: 6 },
  c1: { persuasiveness: 12, style: 8 },
  p1: { persuasiveness: 14, tone: 8 },
};

function coversBrief(text) {
  const source = `${state.topic} ${state.message}`.toLowerCase();
  const words = source.split(/[^a-z0-9']+/).filter((word) => word.length > 4);
  if (!words.length) return true;
  const hay = text.toLowerCase();
  return words.some((word) => hay.includes(word));
}

function overlaps(found, start, end) {
  return found.some((item) => start < item.end && end > item.start);
}

function analyze(text) {
  const found = [];
  const source = text || "";
  function push(item) {
    if (item.start < 0 || item.end <= item.start || item.end > source.length) return;
    if (overlaps(found, item.start, item.end)) return;
    found.push(item);
  }
  SUGGESTIONS.forEach((item) => {
    let from = 0;
    let n = 0;
    while (from < source.length) {
      const at = source.indexOf(item.original, from);
      if (at < 0) break;
      push({
        ...item,
        id: n === 0 ? item.id : `${item.id}-${n}`,
        key: `${item.id}:${item.original}`,
        start: at,
        end: at + item.original.length,
        dimension: item.id === "v1" ? "vocabulary" : item.id === "c1" || item.id === "p1" ? "persuasiveness" : item.id === "t1" ? "tone" : item.id === "g1" ? "grammar" : "style",
      });
      n += 1;
      from = at + item.original.length;
    }
  });

  const rules = [
    {
      id: "filler",
      re: /\b(and stuff|or something|kinda|sort of|gonna|wanna)\b/gi,
      category: "Tone",
      dimension: "tone",
      penalty: 16,
      lead: "This phrase sounds unfinished for the tone you locked.",
      why: "Filler tells a careful reader the thought is still a gesture. If the brief asks for a confident or formal voice, the sentence should name the thing instead of waving at it.",
      clarity: "A named reason can be questioned or kept. “Stuff,” “kinda,” and “sort of” cannot. Clarity here means giving the sentence an edge.",
      message: "The message in your brief only lands if the sentence is willing to say it. Replace the filler with the specific reason you actually mean.",
      options: (match) => [
        { text: "for a specific reason a reader can check", note: "Use this shape, then swap in the real reason from your brief." },
        { text: "in a way that matches the tone you asked for", note: "A placeholder that keeps the sentence formal while you choose the detail." },
        { text: match, note: "Leave it only if this document is meant to sound like a conversation." },
      ],
    },
    {
      id: "vague-qty",
      re: /\b(lots of|a lot of|many people|some people)\b/gi,
      category: "Style",
      dimension: "vocabulary",
      penalty: 12,
      lead: "This quantity has no edge, so a skeptical reader can dismiss it.",
      why: "“Lots” and “a lot” sound like a guess. Precise words are how the draft keeps credibility with the audience in your brief.",
      clarity: "Name who, where, or how often. That is the version a reader can ask a follow-up about.",
      message: "Your message gets stronger when the scale of the claim is defendable. Leave a slot for one real figure.",
      options: () => [
        { text: "most of the people this affects", note: "Bounded, and still large enough to matter." },
        { text: "a clear share of the audience", note: "Use this when you are about to add a number." },
        { text: "many of the readers", note: "Safer if you are not ready to say “most.”" },
      ],
    },
    {
      id: "absolute",
      re: /\b(everyone|everybody|always|never|no one)\b/gi,
      category: "Clarity",
      dimension: "persuasiveness",
      penalty: 12,
      lead: "An absolute is easy for one exception to throw out.",
      why: "One reader who does not fit “everyone” or “always” can refuse the sentence, and with it some of the paragraph. Your brief asked for a message that can survive a question.",
      clarity: "Name the group and the condition. A reader can agree halfway, which is how an argument stays standing.",
      message: "Persuasion in this draft means landing the message you wrote down, not sounding certain. A bounded claim does that job better.",
      options: (match) => [
        { text: "the people most affected", note: `Replaces “${match}” with a group you can describe.` },
        { text: "in the cases that matter here", note: "Use this when the absolute was about time or frequency." },
        { text: "some of the audience, not all of it", note: "Shows you already considered the objection." },
      ],
    },
    {
      id: "weak-close",
      re: /\b(good idea|great idea|really important|very important)\b/gi,
      category: "Persuasion",
      dimension: "persuasiveness",
      penalty: 12,
      lead: "This judgment has no content. Say what the reader should do or believe.",
      why: "“A good idea” and “really important” are reactions, not reasons. The last thing a reader should hear is the action or belief from your brief.",
      clarity: "Name the decision, the person who makes it, and the reason. A reader can picture that. A compliment cannot.",
      message: "Your brief already says the outcome you want. Put that outcome in the sentence instead of a vague endorsement.",
      options: () => [
        { text: "the outcome your brief is asking for", note: "Replace this with the message you locked, in your own words." },
        { text: "a specific next step for the reader", note: "Use this when the piece should end on an action." },
        { text: "a reason the reader can repeat later", note: "Better than an adjective if you want the point to stick." },
      ],
    },
    {
      id: "its-fix",
      re: /\bits\b/gi,
      category: "Grammar",
      dimension: "grammar",
      penalty: 14,
      lead: "“Its” is possessive. If you mean “it is,” the sentence needs “it's” or “it is.”",
      why: "“Its” without an apostrophe belongs to something (“the city and its budget”). If the clause means “it is,” the missing letters make a careful reader pause on the writer instead of the point.",
      clarity: "The logic may be clear to you. The miss still spends attention that should stay on the argument.",
      message: "The tone you locked depends on sounding sure. A basic error in the claim spends that sureness before the reason arrives.",
      options: () => [
        { text: "it is", note: "Fixes the error and stays formal enough for most locked tones." },
        { text: "it's", note: "The smallest edit. Slightly more conversational." },
      ],
      when: (match, index) => {
        const after = source.slice(index + match.length, index + match.length + 24);
        return /^\s+(really|very|so|just|important|good|bad|going|been|not|time)\b/i.test(after);
      },
    },
  ];

  rules.forEach((rule) => {
    const re = new RegExp(rule.re.source, rule.re.flags);
    let match = re.exec(source);
    let n = 0;
    while (match) {
      const ok = rule.when ? rule.when(match[0], match.index) : true;
      if (ok) {
        const phrase = match[0];
        push({
          id: `${rule.id}-${n}`,
          key: `${rule.id}:${phrase.toLowerCase()}`,
          category: rule.category,
          dimension: rule.dimension,
          penalty: rule.penalty,
          original: phrase,
          lead: rule.lead,
          why: rule.why,
          clarity: rule.clarity,
          message: rule.message,
          options: rule.options(phrase),
          start: match.index,
          end: match.index + phrase.length,
        });
      }
      n += 1;
      if (re.lastIndex === match.index) re.lastIndex += 1;
      match = re.exec(source);
    }
  });

  if (state.coaching && source.trim() && !coversBrief(source)) {
    const end = Math.max(source.indexOf("."), 0);
    const sliceEnd = end > 0 ? end + 1 : Math.min(source.length, 140);
    push({
      id: "brief-fit",
      key: "brief-fit",
      category: "Persuasion",
      dimension: "persuasiveness",
      penalty: 16,
      original: source.slice(0, sliceEnd),
      start: 0,
      end: sliceEnd,
      lead: "The opening does not yet carry the message you locked.",
      why: `You asked this piece to do a specific job: ${state.message}. A reader who only sees the opening cannot tell that yet.`,
      clarity: "Say the outcome in the first or last sentence, in words a stranger could repeat.",
      message: `The tone to protect is ${state.tone}. The sentence can stay in your voice and still name the result you want.`,
      options: [
        { text: state.message, note: "The message from your brief, ready to edit into your own sentence." },
        { text: `The point of this piece is that ${state.message.charAt(0).toLowerCase()}${state.message.slice(1)}.`, note: "A direct version you can tighten." },
      ],
    });
  }

  found.sort((a, b) => a.start - b.start);
  return found;
}

function visibleFindings() {
  const hidden = new Set(state.hidden || []);
  return analyze(state.doc || "").filter((item) => !hidden.has(item.key));
}

function scoreDocument(text, findings) {
  const scores = { grammar: 94, tone: 90, style: 88, vocabulary: 88, persuasiveness: 90 };
  (findings || analyze(text || "")).forEach((item) => {
    const extra = EXTRA[item.id] || { [item.dimension || "style"]: item.penalty || 12 };
    Object.keys(extra).forEach((key) => {
      scores[key] -= extra[key];
    });
  });
  const words = wordCount(text || "");
  if (words < 20) {
    scores.persuasiveness -= 18;
    scores.style -= 10;
  } else if (words < 40) {
    scores.persuasiveness -= 6;
  }
  if (state.coaching && !coversBrief(text || "")) scores.persuasiveness -= 14;
  DIMS.forEach((dim) => {
    scores[dim.id] = Math.max(46, Math.min(98, Math.round(scores[dim.id])));
  });
  const raw = DIMS.reduce((sum, dim) => sum + scores[dim.id] * dim.weight, 0);
  const total = Math.round(raw);
  return { ...scores, total, letter: letter(total) };
}

function feedbackNote(findings, report) {
  if (!findings.length) {
    return `I read this against your brief: ${state.message || "the outcome you named"}. Overall ${report.total}, ${report.letter}. I am not holding any marks. The voice is close to ${state.tone || "the tone you locked"}. Before you call it finished, add one detail a reader could check — a number, a name, or a comparison.`;
  }
  const leads = findings.slice(0, 3).map((item) => item.lead).join(" ");
  return `I graded this against your brief — ${state.message || "the message you locked"} — in a ${state.tone || "chosen"} voice. Overall ${report.total}, ${report.letter}. ${leads} Each mark below explains why the change helps, how it serves the message, and other ways to say it.`;
}

function wordCount(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function letter(n) {
  if (n >= 93) return "A";
  if (n >= 90) return "A-";
  if (n >= 87) return "B+";
  if (n >= 83) return "B";
  if (n >= 80) return "B-";
  if (n >= 77) return "C+";
  if (n >= 73) return "C";
  if (n >= 70) return "C-";
  if (n >= 67) return "D+";
  if (n >= 63) return "D";
  if (n >= 60) return "D-";
  return "F";
}

function score(ids) {
  const next = { ...BASE };
  ids.forEach((id) => {
    const deltas = suggestion(id)?.deltas || {};
    DIMS.forEach((dim) => {
      next[dim.id] = Math.min(98, next[dim.id] + (deltas[dim.id] || 0));
    });
  });
  const raw = DIMS.reduce((sum, dim) => sum + next[dim.id] * dim.weight, 0);
  const total = Math.round(raw);
  return { ...next, total, letter: letter(total) };
}

function scoreClass(n) {
  if (n >= 87) return "good";
  if (n >= 73) return "mid";
  return "warn";
}

function teacherNote(open, total) {
  if (open.length === 0) {
    return "The piece now sounds like the brief. The claim is clean, the filler is gone, the ridership sentence is bounded, the vocabulary can hold a fact, and the last sentence names the decision. I would still ask for one local figure before you submit — ridership, cost per new rider, or a comparison with a road project. The structure is ready for that evidence. I would not add adjectives. I would add a number.";
  }
  if (total >= 80) {
    return "Most of the brief is now audible. What remains is small, and it is still worth doing, because a council reader remembers the loosest sentence, not the average one. Finish the open marks, then add one sourced comparison.";
  }
  if (open.length < SUGGESTIONS.length) {
    const left = open.map((id) => WEAKNESS[id][0].toLowerCase()).join("; ");
    return `Part of the brief is now visible on the page. I am not calling the draft ready. Still open: ${left}. Finish those before you treat this as a submission score, then add one local figure.`;
  }
  return "Marcus, the assignment is visible in the opening, and that is a real strength: a council reader can tell what you want. The draft then spends its credibility. Casual filler tells a formal audience you have not chosen a reason. An absolute about ridership is easy to refuse. The close asks people to agree and never names the vote. Grammar is not the main problem. The distance between this voice and the confident, respectful tone you locked is the problem.";
}

function currentView() {
  const name = location.hash.replace("#", "");
  return VIEWS.includes(name) ? name : "studio";
}

function header() {
  const view = currentView();
  const links = [
    ["studio", "Prototype"],
    ["flows", "Flows"],
    ["dialogue", "Dialogue"],
    ["grade", "Grade"],
    ["pitch", "Pitch"],
  ];
  return `
    <header class="site">
      <a class="brand" href="#studio">
        <span class="mark" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11.5V3.2L7.2 2l3.8 1.2V11.5" stroke="white" stroke-width="1.4"/>
            <path d="M5 7.2h4M5 9.2h3" stroke="white" stroke-width="1.2"/>
          </svg>
        </span>
        Grammarly <em>in Word</em>
      </a>
      <nav>
        ${links.map(([id, label]) => `<a href="#${id}" class="${view === id ? "active" : ""}">${label}</a>`).join("")}
      </nav>
      <span class="build">Product review build</span>
    </header>`;
}

function render(opts = {}) {
  const root = document.getElementById("app");
  const prevDesk = root.querySelector(".desk");
  const prevSide = root.querySelector(".side");
  if (prevDesk) scrollMemory.desk = prevDesk.scrollTop;
  if (prevSide) scrollMemory.side = prevSide.scrollTop;
  const view = currentView();
  const viewChanged = lastView !== null && lastView !== view;
  if (viewChanged) {
    scrollMemory.desk = 0;
    scrollMemory.side = 0;
  }
  if (opts.resetSide) scrollMemory.side = 0;
  lastView = view;
  document.body.className = `view-${view}`;
  document.title = TITLES[view];
  root.innerHTML = header() + (view === "studio" ? studio() : pageWrap(view));
  const desk = root.querySelector(".desk");
  const side = root.querySelector(".side");
  if (desk) desk.scrollTop = scrollMemory.desk;
  if (side) side.scrollTop = scrollMemory.side;
  if (viewChanged) window.scrollTo(0, 0);
  if (opts.focusDraft) {
    const draft = document.getElementById("draft");
    if (draft) {
      draft.focus();
      const range = document.createRange();
      range.selectNodeContents(draft);
      range.collapse(false);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
  persist();
}

function pageWrap(view) {
  const body = { flows: flowsPage, dialogue: dialoguePage, grade: gradePage, pitch: pitchPage }[view]();
  return `<main class="page-wrap">${body}</main>`;
}

function studio() {
  const text = fullText();
  const findings = state.reviewing ? visibleFindings() : [];
  const selected = findings.find((item) => item.id === state.selected) || null;
  const report = state.submitted ? scoreDocument(text, analyze(text)) : null;
  return `
    <div class="word">
      <div class="titlebar">
        <div class="word-badge"><i>W</i> Word</div>
        <div class="docname">Draft.docx</div>
        <div class="saved">${state.reviewing ? "Submitted" : "Editing"}</div>
      </div>
      <div class="tabs">
        <span class="file">File</span><span>Home</span><span>Insert</span><span>Draw</span>
        <span>Design</span><span>Layout</span><span>References</span><span>Review</span>
        <span>View</span><span class="on">Grammarly</span>
      </div>
      <div class="ribbon">
        <button class="cmd" data-action="focus-brief" type="button">
          ${iconBrief()}
          <span>${state.coaching ? "Edit brief" : "Brief"}</span>
        </button>
        <button class="cmd" data-action="sample" type="button">
          ${iconDoc()}
          <span>Sample</span>
        </button>
        <button class="cmd" data-action="grade" type="button">
          ${iconGrade()}
          <span>Grade</span>
        </button>
        <div class="sep"></div>
        <button class="btn primary submit-btn" type="button" data-action="submit">Submit to Grammarly</button>
        ${state.reviewing ? `<button class="btn secondary submit-btn" type="button" data-action="edit-draft">Edit draft</button>` : ""}
        <div class="ribbon-note">${ribbonNote(findings)}</div>
      </div>
      <div class="workspace">
        <div class="desk">
          <article class="page">
            <h1 id="doctitle" contenteditable="true" spellcheck="false">${esc(state.title || STARTER_TITLE)}</h1>
            <p class="byline">Click the page and write. Submit when you want a grade.</p>
            ${renderDraft(text, findings, selected)}
            ${selected ? bubble(selected, findings) : ""}
          </article>
        </div>
        <aside class="side">
          ${state.coaching ? coachingSide(selected, findings, report) : briefForm()}
        </aside>
      </div>
      <div class="statusbar">
        <span data-words>Page 1 of 1 · ${wordCount(text)} words · English (United States)</span>
        <span>${statusNote(findings, report)}</span>
      </div>
    </div>`;
}

function ribbonNote(findings) {
  if (!state.coaching) return "You can type now. Submit asks for the brief, then grades the draft.";
  if (state.reviewing) return findings.length ? `${findings.length} mark${findings.length === 1 ? "" : "s"}. Click an underline to read the note.` : "No marks. The grade is in the sidebar.";
  return "Type in the page, then submit. The grade uses the brief you locked.";
}

function statusNote(findings, report) {
  if (state.reviewing && report) return `Graded · ${report.total} ${report.letter} · ${findings.length} open`;
  if (state.coaching) return "Brief locked · not submitted";
  return "Grammarly · waiting for a brief";
}

function renderDraft(text, findings, selected) {
  if (!state.reviewing) {
    return `<div id="draft" class="prose" contenteditable="true" spellcheck="false" role="textbox" aria-label="Document body">${esc(text)}</div>`;
  }
  if (!findings.length) return `<div class="prose">${esc(text)}</div>`;
  let html = "";
  let cursor = 0;
  findings.forEach((item) => {
    html += esc(text.slice(cursor, item.start));
    const cat = CATS[item.category] || CATS.Grammar;
    const on = selected && selected.id === item.id ? " on" : "";
    html += `<span class="mark-text${on}" role="button" tabindex="0" data-action="select" data-id="${esc(item.id)}" style="--cat:${cat.color};--cat-soft:${cat.soft}">${esc(text.slice(item.start, item.end))}</span>`;
    cursor = item.end;
  });
  html += esc(text.slice(cursor));
  return `<div class="prose">${html}</div>`;
}

function bubble(item, open) {
  const cat = CATS[item.category] || CATS.Grammar;
  const option = item.options[choiceIndex(item.id)];
  const place = open.findIndex((entry) => entry.id === item.id) + 1;
  return `
    <div class="bubble" style="--cat:${cat.color}">
      <div class="kicker"><span>Inline · ${esc(item.category)}</span><span>${place} of ${open.length}</span></div>
      <p class="swap"><s>${esc(item.original)}</s> → <b>${esc(option.text)}</b></p>
      <p>${esc(item.lead)}</p>
      <div class="row">
        <button class="btn primary" type="button" data-action="apply" data-id="${item.id}">Apply</button>
        <button class="btn secondary" type="button" data-action="cycle" data-dir="1">Next mark</button>
        <button class="btn ghost" type="button" data-action="dismiss" data-id="${item.id}">Dismiss</button>
      </div>
    </div>`;
}

function briefForm() {
  const toneOptions = TONES.map((tone) => `<option value="${esc(tone)}" ${state.tone === tone ? "selected" : ""}>${esc(tone)}</option>`).join("");
  return `
    <h2>Before I grade this</h2>
    <p class="lead">${state.pendingSubmit
      ? "I have the draft. I still need the assignment before I score it."
      : "You can type in the page now. I will not grade it until these three answers are locked."}</p>
    <label class="field"><span>What are you writing about?</span>
      <input data-field="topic" value="${esc(state.topic)}" placeholder="The subject of this document" />
    </label>
    <label class="field"><span>What tone do you want?</span>
      <select data-field="tone">
        <option value="" ${state.tone ? "" : "selected"}>Choose a tone</option>
        ${toneOptions}
      </select>
    </label>
    <label class="field"><span>What should the reader walk away believing or doing?</span>
      <textarea data-field="message" placeholder="The message this draft has to land">${esc(state.message)}</textarea>
    </label>
    <p class="hint" data-brief-hint ${ready() ? "" : "hidden"}>${ready() ? esc(`I will coach only toward this: ${state.message} Tone I will protect: ${state.tone}.`) : ""}</p>
    <div class="row">
      <button class="btn primary" type="button" data-action="lock" ${ready() ? "" : "disabled"}>Lock brief and start coaching</button>
      <button class="btn secondary" type="button" data-action="sample">Load the sample assignment</button>
    </div>`;
}

function coachingSide(selected, findings, report) {
  return `
    <div class="brief-card">
      <header><strong>Brief locked</strong>
        <button class="btn ghost" type="button" data-action="edit-brief">Edit brief</button>
      </header>
      <p>${esc(state.topic)}</p>
      <p>Tone: ${esc(state.tone)}</p>
      <p>Message: ${esc(state.message)}</p>
    </div>
    ${report ? `<div class="score ${scoreClass(report.total)}"><b>${report.total}</b><span>This submission · ${report.letter}</span></div><p class="lead">${esc(feedbackNote(analyze(state.doc || ""), report))}</p>` : `<p class="lead">Write in the document, then press Submit to Grammarly. I will score grammar, tone, style, vocabulary, and persuasiveness against this brief.</p>`}
    ${state.reviewError ? `<p class="lead">${esc(state.reviewError)}</p>` : ""}
    ${selected ? teach(selected) : ""}
    <div class="side-label">${findings.length ? `Feedback · ${findings.length}` : state.reviewing ? "No open marks" : "Submit to see feedback"}</div>
    ${findings.map((item) => `
      <button class="issue ${selected && selected.id === item.id ? "on" : ""}" type="button" data-action="select" data-id="${esc(item.id)}"><b>${esc(item.category)}</b><span>${esc(item.lead)}</span></button>
    `).join("")}
    <div class="row" style="margin-top:14px">
      <button class="btn primary" type="button" data-action="submit">Submit to Grammarly</button>
      <button class="btn secondary" type="button" data-action="grade">Open grade</button>
      <button class="btn ghost" type="button" data-action="reset">Reset</button>
    </div>
  `;
}

function teach(item) {
  const cat = CATS[item.category] || CATS.Grammar;
  const index = choiceIndex(item.id);
  return `
    <section class="teach" style="--cat:${cat.color}">
      <div class="cat">${esc(item.category)}</div>
      ${noteBlock("Why this change", item.why)}
      ${noteBlock("How it improves clarity or correctness", item.clarity)}
      ${noteBlock("How it supports the message in the brief", item.message)}
      <div class="block">
        <h3>Other ways to say it</h3>
        ${item.options.map((option, i) => `
          <button class="option ${i === index ? "on" : ""}" type="button" data-action="choice" data-id="${item.id}" data-index="${i}">
            <b>${i === 0 ? "Recommended · " : ""}${esc(option.text)}</b>
            <span>${esc(option.note)}</span>
          </button>`).join("")}
      </div>
      <div class="row" style="margin-top:12px">
        <button class="btn primary" type="button" data-action="apply" data-id="${item.id}">Apply selected phrasing</button>
        <button class="btn ghost" type="button" data-action="dismiss" data-id="${item.id}">Dismiss</button>
      </div>
    </section>`;
}

function noteBlock(title, body) {
  return `<div class="block"><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`;
}

function listApplied() {
  if (!state.accepted.length) return "";
  return `<div class="side-label">Applied</div>` + state.accepted.map((id) => {
    const item = suggestion(id);
    const text = item.options[choiceIndex(id)].text;
    return `<div class="applied"><span>${esc(item.category)}: ${esc(text)}</span><button class="btn ghost" type="button" data-action="revert" data-id="${id}">Revert</button></div>`;
  }).join("");
}

function listDismissed() {
  if (!state.dismissed.length) return "";
  return `<div class="side-label">Dismissed</div>` + state.dismissed.map((id) => `
    <div class="applied"><span>${esc(suggestion(id).category)}</span><button class="btn ghost" type="button" data-action="restore" data-id="${id}">Restore</button></div>
  `).join("");
}

function iconBrief() {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="12" height="14" rx="1.5" stroke="#185abd" stroke-width="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#185abd" stroke-width="1.3"/></svg>`;
}
function iconDoc() {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 3.5h5l3.5 3.5V16.5H6v-13z" stroke="#444" stroke-width="1.4"/><path d="M11 3.5V7h3.5" stroke="#444" stroke-width="1.4"/></svg>`;
}
function iconGrade() {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 15.5V4.5h12v11l-6-2.2-6 2.2z" stroke="#444" stroke-width="1.4"/></svg>`;
}

function diagram(spec) {
  const byId = Object.fromEntries(spec.nodes.map((node) => [node.id, node]));
  const marker = `arrow-${spec.id}`;
  const paths = spec.edges.map((edge) => {
    const a = byId[edge.from];
    const b = byId[edge.to];
    const [x1, y1] = point(a, edge.fromAnchor || "bottom");
    const [x2, y2] = point(b, edge.toAnchor || "top");
    let d;
    if (edge.lane === "right") {
      const lane = spec.width - 18;
      d = `M ${x1} ${y1} C ${lane} ${y1}, ${lane} ${y2}, ${x2} ${y2}`;
    } else if (edge.lane === "left") {
      d = `M ${x1} ${y1} C 16 ${y1}, 16 ${y2}, ${x2} ${y2}`;
    } else {
      const mid = (y1 + y2) / 2;
      d = `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
    }
    return `<path d="${d}" class="${edge.back ? "back" : ""}" marker-end="url(#${marker})"/>`;
  }).join("");
  const nodes = spec.nodes.map((node) => `
    <div class="dnode ${node.accent ? "accent" : ""}" style="left:${node.x}px;top:${node.y}px;width:${node.w}px;height:${node.h}px">
      <strong>${esc(node.title)}</strong>
      ${node.sub ? `<span>${esc(node.sub)}</span>` : ""}
    </div>`).join("");
  return `
    <div class="diagram-scroll">
      <div class="diagram" style="width:${spec.width}px;height:${spec.height}px">
        <svg width="${spec.width}" height="${spec.height}" viewBox="0 0 ${spec.width} ${spec.height}" aria-hidden="true">
          <defs>
            <marker id="${marker}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill="#b9b9b9"/>
            </marker>
          </defs>
          ${paths}
        </svg>
        ${nodes}
      </div>
    </div>`;
}

function point(node, anchor) {
  if (anchor === "top") return [node.x + node.w / 2, node.y];
  if (anchor === "left") return [node.x, node.y + node.h / 2];
  if (anchor === "right") return [node.x + node.w, node.y + node.h / 2];
  return [node.x + node.w / 2, node.y + node.h];
}

function flowsPage() {
  const user = diagram({
    id: "user",
    width: 760,
    height: 860,
    nodes: [
      { id: "open", x: 270, y: 16, w: 220, h: 56, title: "Open the document" },
      { id: "brief", x: 270, y: 104, w: 220, h: 56, title: "Answer the brief", sub: "Topic, tone, message", accent: true },
      { id: "draft", x: 270, y: 192, w: 220, h: 56, title: "Write in Word" },
      { id: "marks", x: 270, y: 280, w: 220, h: 56, title: "Live underlines appear" },
      { id: "select", x: 270, y: 368, w: 220, h: 56, title: "Select a mark" },
      { id: "note", x: 270, y: 456, w: 220, h: 56, title: "Read why and alternatives", accent: true },
      { id: "apply", x: 70, y: 560, w: 210, h: 56, title: "Apply a phrasing" },
      { id: "dismiss", x: 480, y: 560, w: 210, h: 56, title: "Dismiss the mark" },
      { id: "grade", x: 270, y: 664, w: 220, h: 56, title: "Ask for a grade", accent: true },
      { id: "dash", x: 270, y: 752, w: 220, h: 56, title: "Review the path" },
    ],
    edges: [
      { from: "open", to: "brief" },
      { from: "brief", to: "draft" },
      { from: "draft", to: "marks" },
      { from: "marks", to: "select" },
      { from: "select", to: "note" },
      { from: "note", to: "apply" },
      { from: "note", to: "dismiss" },
      { from: "apply", to: "grade" },
      { from: "grade", to: "dash" },
      { from: "apply", to: "draft", back: true, lane: "left", fromAnchor: "left", toAnchor: "left" },
      { from: "dismiss", to: "draft", back: true, lane: "right", fromAnchor: "right", toAnchor: "right" },
    ],
  });
  const system = diagram({
    id: "system",
    width: 760,
    height: 900,
    nodes: [
      { id: "doc", x: 250, y: 12, w: 200, h: 52, title: "Document edits" },
      { id: "snap", x: 250, y: 108, w: 200, h: 52, title: "Debounced snapshot" },
      { id: "grammar", x: 24, y: 250, w: 150, h: 48, title: "Grammar" },
      { id: "tone", x: 198, y: 250, w: 150, h: 48, title: "Tone" },
      { id: "clarity", x: 372, y: 250, w: 150, h: 48, title: "Clarity" },
      { id: "style", x: 546, y: 250, w: 150, h: 48, title: "Style" },
      { id: "rank", x: 40, y: 390, w: 280, h: 54, title: "Rank against the brief", accent: true },
      { id: "brief", x: 420, y: 390, w: 200, h: 54, title: "Writing brief", sub: "Joined here, and at the rubric", accent: true },
      { id: "explain", x: 200, y: 500, w: 280, h: 54, title: "Write the four-part note", accent: true },
      { id: "surface", x: 200, y: 600, w: 280, h: 54, title: "Bubble and sidebar" },
      { id: "apply", x: 40, y: 720, w: 200, h: 52, title: "Apply the phrasing" },
      { id: "rubric", x: 420, y: 720, w: 220, h: 52, title: "Teacher rubric", accent: true },
      { id: "dash", x: 420, y: 820, w: 220, h: 52, title: "Scores and practice path" },
    ],
    edges: [
      { from: "doc", to: "snap" },
      { from: "snap", to: "grammar" },
      { from: "snap", to: "tone" },
      { from: "snap", to: "clarity" },
      { from: "snap", to: "style" },
      { from: "grammar", to: "rank" },
      { from: "tone", to: "rank" },
      { from: "clarity", to: "rank" },
      { from: "style", to: "rank" },
      { from: "brief", to: "rank", fromAnchor: "left", toAnchor: "right" },
      { from: "rank", to: "explain" },
      { from: "explain", to: "surface" },
      { from: "surface", to: "apply" },
      { from: "surface", to: "rubric" },
      { from: "brief", to: "rubric" },
      { from: "rubric", to: "dash" },
      { from: "apply", to: "doc", back: true, lane: "left", fromAnchor: "left", toAnchor: "left" },
    ],
  });
  return `
    <p class="kicker">How the session moves</p>
    <h1>Flows</h1>
    <p class="lede">Suggestions cannot appear before the brief. Applying or dismissing a mark returns the writer to the draft. Dashed lines are those returns.</p>
    <h2>User flow</h2>
    ${user}
    <p class="caption">Blue borders are the steps this redesign adds or deepens: the brief, the taught note, and the grade. Dashed lines return to the draft. Editing the brief hides tone, clarity, style, and persuasion until it is locked again.</p>
    <h2>System logic</h2>
    <p>Detectors may read the snapshot at any time. They are not allowed to speak until the brief is joined at the ranker. The same brief is an input to the teacher rubric.</p>
    ${system}
    <p class="caption">Vocabulary is judged inside Style. Persuasiveness is the ranker’s question: does this change help the locked message. The dashed curve is the cycle: an applied edit changes the document and re-enters the snapshot.</p>
    <h2>Rules the pipeline has to enforce</h2>
    <table>
      <thead><tr><th>Rule</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td>No locked brief</td><td>The bubble and the sidebar show the three questions and zero marks.</td></tr>
        <tr><td>Rank against the brief</td><td>A suggestion that is cleaner but fights the locked tone or message is dropped.</td></tr>
        <tr><td>Every shown suggestion</td><td>Carries why, a clarity or correctness effect, a message fit, and alternative phrasings.</td></tr>
        <tr><td>Inline bubble</td><td>Shows the selected phrasing and one sentence. Apply writes that phrasing into the document.</td></tr>
        <tr><td>Dismiss</td><td>Hides the mark for the session. The weakness remains in the grade, because the sentence did not change.</td></tr>
        <tr><td>Grade</td><td>Writer-initiated. Weights: grammar 15, tone 20, style 15, vocabulary 15, persuasiveness 35.</td></tr>
      </tbody>
    </table>`;
}

function dialoguePage() {
  const partial = score(["g1", "t1"]);
  const turns = [
    ["Grammarly", "I can see a draft about transit funding, and I am not going to mark it yet. If I edit before I know the assignment, I will sand the sentences toward a generic clear style, and I may sand off the point. Three questions, then I will coach."],
    ["Grammarly", "What are you writing about? What tone do you want? What should the reader walk away believing or doing?"],
    ["Marcus", "It’s for city council. I want them to fund buses and rail instead of widening roads. The tone should be confident and not rude. The message is that transit is fairer than more lanes because it moves more people and cuts congestion."],
    ["Grammarly", "Locked. I will treat every suggestion as serving a confident, respectful council argument whose job is to win a funding choice. I found five places where the draft works against that. The first is small, and it is in your claim sentence: “its” needs to be “it is.”"],
    ["Marcus", "Can you just change it to it’s and move on? I know the difference."],
    ["Grammarly", "I can. “It’s” is one of the alternatives, and it fixes the error. I am recommending “it is” because you asked for a formal room, and the contraction is a slightly chattier choice in the sentence that carries the whole ask. Apply either one. The note stays, so a later grade can tell a choice you understand from an autocomplete you tapped."],
    ["Marcus", "Use “it is.”"],
    ["Grammarly", "Applied. Next is tone. “And stuff” tells this audience you have a category and have not chosen it. You have four honest doors: the daily cost of congestion, neighborhood air, people who cannot drive, or the city’s climate targets. I recommend cost, because a road-widening debate is already about delay and money, and you already have an emissions sentence later. Which door is the one you mean?"],
    ["Marcus", "Cost. They’re always arguing about money."],
    ["Grammarly", "Then “and for the daily cost of congestion” is the phrasing that supports your message. Air and climate can wait. Putting all four reasons in this sentence would blur the vote. I would look next at “everyone would use them.” One member who would not switch can throw that sentence out. The clearer claim is that better frequency makes transit a practical choice for riders who have no reliable alternative."],
    ["Marcus", "Grade what I have. I only took the first two."],
    ["Grammarly", `Grammar ${partial.grammar}, tone ${partial.tone}, style ${partial.style}, vocabulary ${partial.vocabulary}, persuasiveness ${partial.persuasiveness}. Overall ${partial.total}, a ${partial.letter}. The claim sentence now sounds like it belongs in the room. I am not calling this ready. The draft still has a quantity with no edges (“lots of people”), an absolute about ridership, and a close that asks for support instead of a vote. Those three are why persuasiveness is still a ${partial.persuasiveness}, and persuasiveness is 35 percent of this rubric because your brief was a persuasion task. Next practice: bound the ridership sentence, then make the last sentence name the council, the budget, and the reason.`],
  ];
  return `
    <p class="kicker">Sample session</p>
    <h1>Marcus and the assistant</h1>
    <p class="lede">He locks a council brief, pushes back on the first suggestion, chooses the cost phrasing because he knows the room, and asks for a grade before the draft is finished. The numbers match the rubric if only grammar and tone are applied: ${partial.total}, ${partial.letter}.</p>
    <div class="thread">
      ${turns.map(([who, body]) => `
        <div class="turn ${who === "Marcus" ? "student" : "assistant"}">
          <div class="who">${esc(who)}</div>
          <p>${esc(body)}</p>
        </div>`).join("")}
    </div>
    <div class="callout" style="margin-top:22px">
      <strong>What this session is meant to prove</strong>
      The assistant can refuse to mark, can lose a phrasing argument, and can grade a half-finished revision honestly. The ${partial.letter} names the remaining marks. It does not tell him to accept them blindly.
    </div>
    <p><a href="#studio">Open the same draft in the prototype</a></p>`;
}

function submissionGrade() {
  if (!state.submitted) {
    return `<div class="callout"><strong>No submission yet</strong> Type in the prototype, lock the brief, and press Submit to Grammarly. The sample below shows how the rubric reads a draft.</div>`;
  }
  const findings = analyze(state.doc || "");
  const report = scoreDocument(state.doc || "", findings);
  return `
    <p class="kicker">Your submission</p>
    <h1>${esc(state.title || "Draft")}</h1>
    <div class="score-row">${scoreBlock(report, "Overall")}</div>
    <p class="lede">${esc(feedbackNote(findings, report))}</p>
    <div class="bars">
      ${DIMS.map((dim) => `<div class="bar-row"><div class="bar-label">${esc(dim.label)}<div class="quiet">${report[dim.id]}</div></div><div class="track"><i class="c" title="${report[dim.id]}"><b style="width:${report[dim.id]}%"></b></i></div></div>`).join("")}
    </div>
    <p class="caption">Bars are rubric points from 0 to 100 for the draft you submitted. Source: the prototype rubric applied to your document and brief.</p>
    <div class="stack-list" style="margin:16px 0">
      ${findings.length ? findings.map((item) => `<p><strong>${esc(item.category)} · ${esc(item.original)}</strong> ${esc(item.why)}</p>`).join("") : `<p><strong>No open marks.</strong> Add one checkable detail, then submit again if you revise.</p>`}
    </div>
    <article class="note-card" style="margin-bottom:28px"><header><h3>Submitted draft</h3><span class="pill on">${report.total} · ${report.letter}</span></header><p>${esc(state.doc || "")}</p></article>
    <h2>Sample assignment, for comparison</h2>
    <p>The figures below are the fixed council paragraph, so a reviewer can see the rubric without submitting.</p>`;
}

function gradePage() {
  const before = score([]);
  const after = score(SUGGESTIONS.map((item) => item.id));
  const session = state.submitted ? scoreDocument(state.doc || "", analyze(state.doc || "")) : score(state.accepted);
  const open = SUGGESTIONS.map((item) => item.id).filter((id) => !state.accepted.includes(id));
  return `
    ${submissionGrade()}
    <p class="kicker">Teacher module</p>
    <h1>Grade the piece, not the underline</h1>
    <p class="lede">Persuasiveness carries 35 percent when the brief is a persuasion task. A clean grammar score cannot carry the grade alone.</p>
    <div class="score-row">
      ${scoreBlock(before, "Uncoached draft")}
      ${scoreBlock(after, "All five suggestions")}
      ${state.submitted ? scoreBlock(session, "Your draft") : ""}
    </div>
    <div class="legend"><s><i class="sw a"></i> Uncoached</s><u><i class="sw c"></i> Fully coached</u></div>
    <div class="bars">
      ${DIMS.map((dim) => meter(dim.label, before[dim.id], after[dim.id])).join("")}
    </div>
    <p class="caption">Bars are rubric points from 0 to 100 for Marcus Hale’s sample paragraph. Source: the prototype rubric, uncoached and after the five recommended edits.</p>
    <h2>How the overall is weighted</h2>
    <table>
      <thead><tr><th>Dimension</th><th>Weight</th><th>A high score means</th></tr></thead>
      <tbody>
        ${DIMS.map((dim) => `<tr><td>${dim.label}</td><td>${Math.round(dim.weight * 100)}%</td><td>${esc(dim.high)}</td></tr>`).join("")}
      </tbody>
    </table>
    <div class="split" style="margin-top:18px">
      ${noteCard("Uncoached draft", before, teacherNote(SUGGESTIONS.map((item) => item.id), before.total))}
      ${noteCard("After the five suggestions", after, teacherNote([], after.total), true)}
    </div>
    <div class="split" style="margin-top:22px">
      <div>
        <h2>Strengths before coaching</h2>
        <div class="stack-list">
          <p><strong>The opening names a fundable claim.</strong> A council reader does not have to hunt for the point.</p>
          <p><strong>The emissions sentence is a hook.</strong> A member can ask to see it sourced.</p>
          <p><strong>The draft never attacks drivers.</strong> The respectful half of the brief is already partly true.</p>
        </div>
        <h2>Weaknesses</h2>
        <div class="stack-list">
          ${SUGGESTIONS.map((item) => `<p><strong>${esc(WEAKNESS[item.id][0])}</strong> ${esc(WEAKNESS[item.id][1])}</p>`).join("")}
        </div>
      </div>
      <div>
        <h2>What coaching adds</h2>
        <div class="stack-list">
          ${SUGGESTIONS.map((item) => `<p><strong>${esc(GAIN[item.id][0])}</strong> ${esc(GAIN[item.id][1])}</p>`).join("")}
        </div>
        <h2>Still assigned after a clean revision</h2>
        <p>Add one local figure: current bus frequency on the corridor the road project would widen, or the share of weekday trips driven alone. The sentences can already hold a fact.</p>
      </div>
    </div>
    <h2>Improvement path</h2>
    <p>Ordered by what would move this brief. Grammar is first only because the error sits in the claim sentence.</p>
    <ol class="path">
      ${SUGGESTIONS.map((item, index) => `<li><b>${index + 1}</b><div><b>${esc(PATH[item.id][0])}</b><div>${esc(PATH[item.id][1])}</div></div></li>`).join("")}
    </ol>
    <h2>The paragraph</h2>
    <div class="compare">
      <article>
        <h3>Uncoached</h3>
        <p><del>Cities should invest more in public transit because its really important for the environment and stuff.</del> <del>Lots of people drive cars which causes traffic and pollution.</del> <del>If we had better buses everyone would use them.</del> Studies show that public transportation can reduce emissions. <del>This is a good idea that everyone should support.</del></p>
      </article>
      <article>
        <h3>Recommended revision</h3>
        <p><ins>Cities should invest more in public transit because it is really important for the environment and for the daily cost of congestion.</ins> <ins>Most commuters in this city still drive alone, which adds delay and tailpipe pollution.</ins> <ins>Better bus frequency would make transit a practical choice for riders who have no reliable alternative.</ins> Studies show that public transportation can reduce emissions. <ins>The council should fund the transit expansion in this budget, because it moves more people with less new pavement.</ins></p>
      </article>
    </div>
    <h2>This session</h2>
    <p>${state.accepted.length
      ? `Applied ${state.accepted.length} of 5 suggestions in the prototype. Dismissed marks do not raise the score, because the sentence is unchanged.`
      : "Nothing has been applied in the prototype yet, so this session still matches the uncoached draft."}</p>
    ${noteCard("Session note", session, teacherNote(open, session.total), session.total >= 87)}
    ${open.length ? `<div class="stack-list" style="margin-top:12px">${open.map((id) => `<p><strong>${esc(PATH[id][0])}</strong> ${esc(PATH[id][1])}</p>`).join("")}</div>` : ""}
    <p style="margin-top:18px"><a href="#studio">Return to the draft</a></p>`;
}

function scoreBlock(report, label) {
  return `<div class="score ${scoreClass(report.total)}"><b>${report.total}</b><span>${esc(label)} · ${report.letter}</span></div>`;
}

function meter(label, before, after) {
  return `
    <div class="bar-row">
      <div class="bar-label">${esc(label)}<div class="quiet">${before} → ${after}</div></div>
      <div class="track">
        <i class="a" title="Uncoached ${before}"><b style="width:${before}%"></b></i>
        <i class="c" title="Coached ${after}"><b style="width:${after}%"></b></i>
      </div>
    </div>`;
}

function noteCard(title, report, body, on) {
  return `
    <article class="note-card">
      <header><h3>${esc(title)}</h3><span class="pill ${on ? "on" : ""}">${report.total} · ${report.letter}</span></header>
      <p>${esc(body)}</p>
    </article>`;
}

function pitchPage() {
  return `
    <p class="kicker">Decision for this review</p>
    <h1>Brief the assistant before it edits.</h1>
    <p class="lede">Make Briefed the default Grammarly mode in Word for school accounts and for longer documents. The writer confirms three answers, and only then do tone, clarity, style, and persuasion appear. Instant mode stays available and limits itself to spelling and grammar.</p>
    <div class="callout">
      <strong>The bet</strong>
      A suggestion ranked against a stated message is one a writer can defend a day later. The sample paragraph moves from a D+ (67) to an A- (90) when the five recommended edits land, and the teacher note still asks for a number, not another adjective.
    </div>
    <div class="row">
      <a class="btn primary" href="#studio">Open the Word prototype</a>
      <a class="btn secondary" href="#grade">See the grade</a>
    </div>
    <h2>What changes in the session</h2>
    <table>
      <thead><tr><th>Moment</th><th>Today</th><th>This prototype</th></tr></thead>
      <tbody>
        <tr><td>Session start</td><td>Marks appear as soon as the text does.</td><td>Three questions. Marks stay hidden until the brief is locked.</td></tr>
        <tr><td>A suggestion</td><td>A short replacement.</td><td>Why, what it does for clarity, how it serves the message, and alternative phrasings.</td></tr>
        <tr><td>Where it sits</td><td>A margin list.</td><td>An inline bubble for the decision, a sidebar for the lesson.</td></tr>
        <tr><td>After drafting</td><td>A score with little memory of the assignment.</td><td>A teacher grade on five dimensions, written against the brief, plus a practice path.</td></tr>
      </tbody>
    </table>
    <h2>Who it is for</h2>
    <div class="cols">
      <div><h3>The writer</h3><p>Suggestions stop fighting the assignment. Alternatives keep authorship: the model proposes, the writer chooses the sentence they will stand behind.</p></div>
      <div><h3>The teacher</h3><p>The grade uses the same brief the student locked. Grammar is 15 percent of this rubric because a clean sentence that misses the message should not outscore a rough sentence that makes the ask.</p></div>
      <div><h3>The product</h3><p>Briefed mode should raise the share of suggestions people keep, and the share of writers who can restate the reason. That second number is the one a school buyer can defend.</p></div>
    </div>
    <h2>Pilot targets</h2>
    <p>Share of sessions. Higher is better. These are planning targets for a six-week classroom pilot, so the size of the bet is visible. They are not production measurements.</p>
    <div class="legend"><s><i class="sw a"></i> Instant flags, no brief</s><u><i class="sw c"></i> Briefed coaching</u></div>
    <div class="bars">
      ${meter("Suggestions accepted", 38, 64)}
      ${meter("Writer can explain why", 19, 70)}
      ${meter("Tone matches the brief", 44, 81)}
    </div>
    <p class="caption">Bar length is the share of pilot sessions, out of 100. Source: targets proposed for a six-week classroom pilot.</p>
    <table>
      <thead><tr><th>Outcome</th><th>Instant flags</th><th>Briefed coaching</th><th>Target move</th></tr></thead>
      <tbody>
        <tr><td>Suggestions accepted</td><td>38%</td><td>64%</td><td>+26 pts</td></tr>
        <tr><td>Accepted, then undone within 60 seconds</td><td>21%</td><td>8%</td><td>−13 pts</td></tr>
        <tr><td>Writer can explain the change a day later</td><td>19%</td><td>70%</td><td>+51 pts</td></tr>
        <tr><td>Tone rated as matching the locked brief</td><td>44%</td><td>81%</td><td>+37 pts</td></tr>
      </tbody>
    </table>
    <p class="caption">The undo row is kept out of the chart because lower is better there.</p>
    <h2>Questions the pilot has to answer</h2>
    <table>
      <thead><tr><th>Question</th><th>What the prototype does now</th></tr></thead>
      <tbody>
        <tr><td>Will people abandon the three questions?</td><td>The sample brief loads in one action, then still requires an explicit lock. Instant mode would keep spelling and grammar alive if they skip.</td></tr>
        <tr><td>How long can a note be?</td><td>The bubble is one sentence and an Apply. The four-part note lives in the sidebar.</td></tr>
        <tr><td>Who is allowed to see the grade?</td><td>The grade is writer-initiated. The rubric weights sit next to the number.</td></tr>
        <tr><td>Where does the brief live?</td><td>Design assumption: a document property, editable from the sidebar, so reopening the file does not ask again.</td></tr>
      </tbody>
    </table>`;
}

function syncHint() {
  const lock = document.querySelector("[data-action='lock']");
  const hint = document.querySelector("[data-brief-hint]");
  if (lock) lock.disabled = !ready();
  if (hint) {
    hint.hidden = !ready();
    hint.textContent = ready()
      ? `I will coach only toward this: ${state.message} Tone I will protect: ${state.tone}.`
      : "";
  }
}

function onField(event) {
  if (event.target.id === "draft") {
    state.doc = event.target.innerText.replace(/\u00a0/g, " ");
    const words = document.querySelector("[data-words]");
    if (words) words.textContent = `Page 1 of 1 · ${wordCount(state.doc)} words · English (United States)`;
    persist();
    return;
  }
  if (event.target.id === "doctitle") {
    state.title = event.target.innerText.replace(/\n/g, " ").trim();
    persist();
    return;
  }
  const field = event.target.dataset.field;
  if (!field) return;
  state[field] = event.target.value;
  syncHint();
  persist();
}

function captureDraft() {
  const draft = document.getElementById("draft");
  const title = document.getElementById("doctitle");
  if (draft) state.doc = draft.innerText.replace(/\u00a0/g, " ");
  if (title) state.title = title.innerText.replace(/\n/g, " ").trim() || state.title;
}

function runReview() {
  captureDraft();
  if (wordCount(state.doc) < 8) {
    state.reviewError = "Write a little more, then submit. I need at least a few sentences to grade.";
    state.reviewing = false;
    render();
    return;
  }
  state.reviewError = "";
  state.hidden = [];
  state.reviewing = true;
  state.submitted = true;
  state.pendingSubmit = false;
  const findings = visibleFindings();
  state.selected = findings[0] ? findings[0].id : "";
  render({ resetSide: true });
}

document.addEventListener("input", onField);
document.addEventListener("change", onField);

document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  const id = el.dataset.id;
  if (action === "sample") {
    state.topic = SAMPLE.topic;
    state.tone = SAMPLE.tone;
    state.message = SAMPLE.message;
    state.doc = STARTER_DOC;
    state.title = STARTER_TITLE;
    state.reviewing = false;
    state.submitted = false;
    state.hidden = [];
    state.reviewError = "";
    render();
    return;
  }
  if (action === "lock") {
    if (!ready()) return;
    const shouldGrade = state.pendingSubmit;
    state.coaching = true;
    state.pendingSubmit = false;
    if (shouldGrade) runReview();
    else render();
    return;
  }
  if (action === "submit") {
    captureDraft();
    if (!state.coaching || !ready()) {
      state.pendingSubmit = true;
      state.coaching = false;
      state.reviewError = "";
      render();
      return;
    }
    runReview();
    return;
  }
  if (action === "edit-draft") {
    state.reviewing = false;
    state.selected = "";
    render({ focusDraft: true });
    return;
  }
  if (action === "edit-brief" || action === "focus-brief") {
    if (state.coaching && action === "focus-brief") {
      state.coaching = false;
      render();
      return;
    }
    if (!state.coaching && action === "focus-brief") {
      const field = document.querySelector("[data-field='topic']");
      if (field) field.focus();
      return;
    }
    state.coaching = false;
    render();
    return;
  }
  if (action === "select") {
    state.selected = id;
    render({ resetSide: true });
    return;
  }
  if (action === "choice") {
    state.choices[id] = Number(el.dataset.index);
    render();
    return;
  }
  if (action === "apply") {
    const item = analyze(state.doc || "").find((entry) => entry.id === id);
    if (!item) return;
    const replacement = item.options[choiceIndex(id)].text;
    state.doc = `${state.doc.slice(0, item.start)}${replacement}${state.doc.slice(item.end)}`;
    const next = visibleFindings();
    state.selected = next[0] ? next[0].id : "";
    state.submitted = true;
    render();
    return;
  }
  if (action === "dismiss") {
    const item = analyze(state.doc || "").find((entry) => entry.id === id);
    if (item && !(state.hidden || []).includes(item.key)) state.hidden.push(item.key);
    const next = visibleFindings();
    state.selected = next[0] ? next[0].id : "";
    render();
    return;
  }
  if (action === "revert") {
    state.accepted = state.accepted.filter((item) => item !== id);
    render();
    return;
  }
  if (action === "restore") {
    state.dismissed = state.dismissed.filter((item) => item !== id);
    render();
    return;
  }
  if (action === "cycle") {
    const ids = visibleFindings().map((item) => item.id);
    if (!ids.length) return;
    const index = ids.indexOf(state.selected);
    const dir = Number(el.dataset.dir) || 1;
    state.selected = ids[(index + dir + ids.length) % ids.length];
    render({ resetSide: true });
    return;
  }
  if (action === "grade") {
    if (location.hash !== "#grade") location.hash = "grade";
    else render();
    return;
  }
  if (action === "reset") {
    state.topic = "";
    state.tone = "";
    state.message = "";
    state.coaching = false;
    state.accepted = [];
    state.dismissed = [];
    state.choices = {};
    state.selected = "";
    state.graded = false;
    state.title = STARTER_TITLE;
    state.doc = STARTER_DOC;
    state.reviewing = false;
    state.submitted = false;
    state.hidden = [];
    state.pendingSubmit = false;
    state.reviewError = "";
    render();
  }
});

document.addEventListener("keydown", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  if (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    el.click();
  }
});

window.addEventListener("hashchange", () => render());

if (!VIEWS.includes(location.hash.replace("#", ""))) location.hash = "studio";
render();

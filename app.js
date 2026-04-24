const WORDS = [
  "apple","brave","crane","drive","eagle","flame","grace","house","ivory","joker",
  "kneel","lemon","mango","noble","ocean","piano","queen","river","stone","tiger",
  "ultra","vivid","water","xenon","yacht","zebra","alert","blaze","chess","delta",
  "elder","frost","globe","haste","inlet","jewel","karma","laser","maple","nerve",
  "orbit","plumb","quest","radar","solar","thorn","umbra","vapor","wheat","xylem",
  "yearn","zonal","angel","birth","candy","dance","earth","fairy","giant","honey",
  "image","judge","knife","light","magic","night","olive","pearl","quiet","raise",
  "saint","table","unity","voice","witch","extra","young","zones","abide","blunt",
  "crisp","dwell","evoke","flint","grind","hinge","irony","jazzy","knack","lyric",
  "mirth","notch","optic","plank","quirk","raven","scorn","trout","usher","venom"
];

// Extended valid guess list (includes answer words + common 5-letter words)
const VALID_WORDS = new Set([
  ...WORDS,
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alike","align","alive","alley","allow",
  "alone","along","aloud","alter","among","ample","amuse","anger","angle","angry",
  "anime","annex","antic","anvil","apart","apply","arena","argue","arise","armor",
  "aroma","arose","array","aside","asset","atlas","attic","audio","audit","avoid",
  "awake","award","aware","awful","badly","baker","basic","basis","batch","beach",
  "beard","beast","began","begin","being","below","bench","bible","black","blade",
  "bland","blank","blast","bleak","bleed","blend","bless","blind","block","blood",
  "bloom","blown","board","bonus","boost","booth","bound","boxer","brace","braid",
  "brand","bread","break","breed","brick","bride","brief","bring","broad","broke",
  "brook","brown","brush","buddy","build","built","bunch","burst","buyer","cabin",
  "camel","carry","catch","cause","cease","chain","chair","chaos","charm","chart",
  "chase","cheap","check","cheek","cheer","chief","child","china","choir","chord",
  "chose","civic","civil","claim","clash","class","clean","clear","clerk","click",
  "cliff","climb","cling","clock","clone","close","cloth","cloud","clown","coach",
  "coast","color","comes","comic","comma","coral","could","count","court","cover",
  "crack","craft","crash","crazy","cream","creek","creep","cross","crowd","crown",
  "cruel","crush","curve","cycle","daily","dairy","daisy","decay","decoy","delay",
  "depot","depth","derby","devil","diary","digit","dirty","disco","ditch","dizzy",
  "dodge","doing","donor","doubt","dough","dowry","draft","drain","drama","drank",
  "drawn","dread","dream","dress","dried","drift","drink","drool","droop","drops",
  "drove","drown","drugs","drums","drunk","dryer","dying","early","eight","elite",
  "empty","enemy","enjoy","enter","entry","equal","error","essay","event","every",
  "exact","exist","expel","faint","faith","false","fancy","fatal","fault","feast",
  "fence","fetch","fever","fewer","field","fifth","fifty","fight","filed","final",
  "first","fixed","flair","flash","flask","flesh","flies","flock","flood","floor",
  "flora","flour","flown","fluid","flute","focus","force","forge","forth","forum",
  "found","frame","frank","fraud","fresh","front","froze","fruit","fully","funny",
  "games","gauge","gavel","gears","ghost","given","gland","glare","glass","gleam",
  "gloom","gloss","glove","going","grace","grade","grain","grand","grant","grasp",
  "grass","grave","great","green","greet","grief","grill","groan","groin","groom",
  "gross","group","grove","grown","gruel","guard","guess","guest","guide","guild",
  "guile","guise","gulch","gusto","habit","happy","harsh","haven","heart","heavy",
  "hedge","heist","hence","herbs","heron","hilly","hippo","hoist","holly","homer",
  "honor","horse","hotel","hours","human","humid","hurry","hyena","ideal","idiom",
  "idiot","igloo","imply","index","indie","infer","inner","input","inter","intro",
  "issue","items","ivory","japan","jelly","jewel","joint","joust","juice","juicy",
  "jumbo","jumpy","kayak","kebab","khaki","kitty","kneel","knelt","known","koala",
  "label","lance","large","later","laugh","layer","learn","lease","least","leave",
  "legal","level","light","limit","linen","liner","liver","llama","local","lodge",
  "logic","loose","lover","lower","lucky","lunar","lunch","lusty","lying","maker",
  "manor","march","marry","match","mayor","media","mercy","merit","metal","might",
  "mimic","minor","minus","mirth","model","money","month","moral","motor","motto",
  "mount","mourn","mouth","moved","movie","muddy","multi","music","naive","nanny",
  "nasty","naval","never","newer","nexus","nicer","niche","ninja","noise","north",
  "noted","novel","nurse","nymph","occur","offer","often","onset","opera","order",
  "other","ought","ounce","outer","outdo","owner","oxide","ozone","paint","panel",
  "panic","paper","party","pasta","patch","pause","peace","penal","penny","perch",
  "phase","phone","photo","pilot","pinch","pixel","pizza","place","plain","plane",
  "plant","plate","plaza","plead","pleat","pluck","plume","plunge","point","polar",
  "poppy","porch","posed","pouch","pound","power","press","price","pride","prime",
  "print","prior","prize","probe","prone","proof","prose","proud","prove","prowl",
  "proxy","psalm","pubic","pulse","punch","pupil","purse","pushy","pygmy","quack",
  "quail","qualm","quart","quasi","quell","query","queue","quick","quill","quota",
  "quote","rabbi","rabid","racer","radio","rally","ranch","range","rapid","ratio",
  "reach","ready","realm","rebel","refer","reign","relax","repay","repel","reply",
  "rerun","reset","reuse","rider","ridge","rifle","right","risky","rival","roast",
  "robin","rocky","rouge","rough","round","route","royal","rugby","ruler","rural",
  "rusty","sadly","salad","sauce","scale","scare","scene","scope","score","scout",
  "seize","sense","serve","setup","seven","shade","shaft","shake","shall","shame",
  "shape","share","shark","sharp","sheer","shelf","shell","shift","shine","shirt",
  "shock","shoot","shore","short","shout","shove","shown","shrug","sight","silly",
  "since","sixth","sixty","sized","skill","skull","skunk","slate","slave","sleep",
  "sleet","slept","slice","slide","slime","sling","slope","sloth","slump","slunk",
  "small","smart","smell","smile","smite","smoke","snack","snail","snake","snare",
  "sneak","sneer","sniff","snore","snort","snowy","sober","solid","solve","sorry",
  "south","space","spare","spark","spawn","speak","spear","speed","spend","spice",
  "spill","spine","spite","split","spoke","spook","spoon","sport","spout","spray",
  "squad","squat","squid","stack","staff","stage","stain","stair","stake","stale",
  "stall","stamp","stand","stare","stark","start","state","stays","steal","steam",
  "steel","steep","steer","stern","stick","stiff","still","sting","stock","stomp",
  "stood","stool","store","storm","story","stout","stove","strap","straw","stray",
  "strip","strut","stuck","study","stuff","stump","stung","stunk","stunt","style",
  "sugar","suite","sunny","super","surge","swamp","swear","sweat","sweep","sweet",
  "swept","swift","swill","swine","swing","swipe","swirl","swoop","sword","swore",
  "sworn","syrup","tacit","talon","tango","tapir","taste","taunt","tawny","teach",
  "tease","teeth","tempo","tense","tenth","tepid","terms","terse","thank","their",
  "theme","there","these","thick","thing","think","third","those","three","threw",
  "throw","thumb","tidal","tilde","timer","tipsy","tired","title","today","token",
  "tonal","topic","total","touch","tough","towel","tower","toxic","trace","track",
  "trade","trail","train","trait","tramp","trash","trawl","tread","treat","trend",
  "trial","tribe","trick","tried","troop","trove","truck","truly","trump","trunk",
  "trust","truth","tulip","tumor","tuner","tunic","tuple","tutor","tweed","twice",
  "twill","twine","twist","tying","udder","ulcer","uncut","under","unfit","union",
  "until","upper","upset","urban","usage","usual","utter","valid","value","valve",
  "vaunt","vicar","video","vigil","villa","viral","virus","visit","visor","vista",
  "vital","vivid","vixen","vocal","vodka","vogue","voila","voter","vouch","vowel",
  "vulva","wacky","waltz","waste","watch","weary","weave","wedge","weedy","weigh",
  "weird","whale","where","which","while","whiff","whine","whirl","white","whole",
  "whose","wider","wield","windy","witty","woman","women","world","worry","worse",
  "worst","worth","would","wound","wrath","wrist","write","wrote","wryly","xerox",
  "yeoman","yield","zappy","zesty","zilch","zippy","zombi"
]);

const ROWS = 6;
const COLS = 5;
const KB_ROWS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["Enter","z","x","c","v","b","n","m","Backspace"]
];

let answer = "";
let currentRow = 0;
let currentCol = 0;
let currentGuess = [];
let gameOver = false;
let tiles = [];

function init() {
  answer = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  buildBoard();
  buildKeyboard();
  document.addEventListener("keydown", handleKey);
}

function buildBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  tiles = [];
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = "row-" + r;
    const rowTiles = [];
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.appendChild(tile);
      rowTiles.push(tile);
    }
    board.appendChild(row);
    tiles.push(rowTiles);
  }
}

function buildKeyboard() {
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  KB_ROWS.forEach(keys => {
    const row = document.createElement("div");
    row.classList.add("kb-row");
    keys.forEach(k => {
      const btn = document.createElement("button");
      btn.classList.add("key");
      btn.textContent = k === "Backspace" ? "⌫" : k;
      btn.dataset.key = k;
      if (k === "Enter" || k === "Backspace") btn.classList.add("wide");
      btn.addEventListener("click", () => handleKey({ key: k }));
      row.appendChild(btn);
    });
    kb.appendChild(row);
  });
}

function handleKey(e) {
  if (gameOver) return;
  const key = e.key;
  if (key === "Enter") {
    submitGuess();
  } else if (key === "Backspace") {
    deleteLetter();
  } else if (/^[a-zA-Z]$/.test(key)) {
    addLetter(key.toUpperCase());
  }
}

function addLetter(letter) {
  if (currentCol >= COLS) return;
  const tile = tiles[currentRow][currentCol];
  tile.textContent = letter;
  tile.classList.add("filled");
  tile.classList.add("pop");
  tile.addEventListener("animationend", () => tile.classList.remove("pop"), { once: true });
  currentGuess.push(letter);
  currentCol++;
}

function deleteLetter() {
  if (currentCol <= 0) return;
  currentCol--;
  currentGuess.pop();
  const tile = tiles[currentRow][currentCol];
  tile.textContent = "";
  tile.classList.remove("filled");
}

function submitGuess() {
  if (currentCol < COLS) {
    showMessage("Not enough letters");
    shakeRow(currentRow);
    return;
  }

  const guess = currentGuess.join("").toLowerCase();

  if (!VALID_WORDS.has(guess)) {
    showMessage("Not in word list");
    shakeRow(currentRow);
    return;
  }

  const guessUpper = guess.toUpperCase();
  const result = evaluate(guessUpper, answer);
  const rowIdx = currentRow;

  revealRow(rowIdx, result, () => {
    updateKeyboard(guessUpper, result);

    if (guessUpper === answer) {
      gameOver = true;
      const msgs = ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"];
      showMessage(msgs[rowIdx] || "Nice!");
    } else if (rowIdx === ROWS - 1) {
      gameOver = true;
      showMessage(answer, 0);
    } else {
      currentRow++;
      currentCol = 0;
      currentGuess = [];
    }
  });
}

function evaluate(guess, answer) {
  const result = Array(COLS).fill("absent");
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array(COLS).fill(false);

  for (let i = 0; i < COLS; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < COLS; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < COLS; j++) {
      if (!used[j] && guessArr[i] === answerArr[j]) {
        result[i] = "present";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

function revealRow(rowIdx, result, callback) {
  const rowTiles = tiles[rowIdx];
  rowTiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add(result[i]);
    }, i * 300);
  });
  setTimeout(callback, rowTiles.length * 300);
}

function updateKeyboard(guess, result) {
  const priority = { correct: 3, present: 2, absent: 1 };
  guess.split("").forEach((letter, i) => {
    const btn = document.querySelector(`.key[data-key="${letter.toLowerCase()}"]`);
    if (!btn) return;
    const current = btn.dataset.state || "";
    const newState = result[i];
    if ((priority[newState] || 0) > (priority[current] || 0)) {
      if (current) btn.classList.remove(current);
      btn.classList.add(newState);
      btn.dataset.state = newState;
    }
  });
}

function shakeRow(rowIdx) {
  const row = document.getElementById("row-" + rowIdx);
  row.classList.add("shake");
  row.addEventListener("animationend", () => row.classList.remove("shake"), { once: true });
}

function showMessage(text, duration = 2000) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.add("show");
  if (duration > 0) {
    setTimeout(() => msg.classList.remove("show"), duration);
  }
}

init();



/**
 * All exhibition content for "Northwest Coast".
 *
 * Subject: the Indigenous Peoples of the Pacific Northwest Coast and the
 * environment that shaped them — cedar forest, ocean, salmon rivers, and the
 * nations that have lived here for at least 14,000 years and live here still.
 *
 * Every record states plainly whether the object shown is an authentic
 * original, a museum cast/replica, or a reconstruction — and every image on
 * this site is an AI-generated rendering made for a 7th-grade Social Studies
 * project, never a photograph of a real museum object.
 */

export type Authenticity = "original" | "cast" | "reconstruction";

export const AUTHENTICITY_LABEL: Record<Authenticity, string> = {
  original: "Authentic original",
  cast: "Cast replica",
  reconstruction: "Reconstruction",
};

export const AUTHENTICITY_NOTE: Record<Authenticity, string> = {
  original: "The kind of object held in the museum or cultural centre named below.",
  cast: "A replica made for display. Originals are far too fragile or too sacred to handle.",
  reconstruction: "Re-created from archaeological evidence, photographs and the knowledge of living practitioners.",
};

export interface Artifact {
  id: string;
  case: string;
  name: string;
  culture: string;
  date: string;
  material: string;
  size: string;
  found: string;
  home: string;
  authenticity: Authenticity;
  image: string;
  era: string;
  summary: string;
  facts: string[];
  /** Tall (portrait) or wide images get slightly different framing. */
  wide?: boolean;
}

export const ARTIFACTS: Artifact[] = [
  {
    id: "great-canoe",
    case: "Gallery III · Case 01",
    name: "The Great Canoe",
    culture: "Heiltsuk and Haida peoples · Central Coast, British Columbia",
    date: "c. 1878",
    material: "A single western red cedar trunk, carved, fire-shaped and painted",
    size: "≈ 19 m (63 ft) long",
    found: "Pacific Northwest Coast — carved on the coast of what is now British Columbia",
    home: "American Museum of Natural History, Grand Gallery, New York",
    authenticity: "original",
    image: "/img/artifacts/great-canoe.jpg",
    era: "Transportation",
    wide: true,
    summary:
      "Hollowed from one enormous cedar tree, this ocean-going canoe could carry dozens of people plus their trade goods along hundreds of kilometres of open coast. Heiltsuk and Haida oral traditions both carry its story, and it may have been given as a dowry payment at a marriage.",
    facts: [
      "The ocean was the highway: villages were reachable only by water, and canoes carried people, food, cedar and trade goods between nations.",
      "The canoe arrived at the museum in 1899 and has been on public display for more than a century.",
      "The tradition is alive: since 1989 the annual Tribal Canoe Journeys bring dozens of Coast Salish and Northwest Coast nations together in ocean canoes.",
    ],
  },
  {
    id: "house-frontal-pole",
    case: "Gallery III · Case 02",
    name: "House Frontal Pole",
    culture: "Haida · Haida Gwaii (Islands of the People)",
    date: "c. 1850",
    material: "A single western red cedar, carved with stone, shell and later steel adzes",
    size: "9 – 15 m tall in front of a great plank house",
    found: "Haida Gwaii and the northern coast — villages such as SGang Gwaay, Skidegate and Old Massett",
    home: "Authentic poles: Museum of Anthropology at UBC; Canadian Museum of History; SGang Gwaay (a UNESCO World Heritage Site)",
    authenticity: "original",
    image: "/img/artifacts/house-frontal-pole.jpg",
    era: "Art & Culture",
    summary:
      "A pole is not a totem of worship — it is a record. Each carved figure is a crest belonging to one family, earned or inherited, telling who they are, where they come from and what happened to their ancestors. Reading a pole is like reading a coat of arms plus a family history.",
    facts: [
      "Poles stood at the front of cedar plank houses, with a doorway cut through the base; the house itself was the family's title deed.",
      "A pole was raised at a potlatch, where witnesses were fed and given gifts so they would remember and confirm the family's claims.",
      "Left standing, cedar returns to the forest in 60–100 years. Many old village sites now hold only moss-covered stumps.",
    ],
  },
  {
    id: "transformation-mask",
    case: "Gallery III · Case 03",
    name: "Transformation Mask",
    culture: "Kwakwaka'wakw · northern Vancouver Island and the adjacent mainland",
    date: "c. 1880",
    material: "Lightweight red cedar, hide hinges and cords, pigment, abalone shell, feathers and fur",
    size: "≈ 45 cm across when closed",
    found: "Kwakwaka'wakw winter villages; many were seized in the 1921–22 potlatch prosecutions",
    home: "U'mista Cultural Centre, Alert Bay, BC — built to hold the potlatch collection; also the American Museum of Natural History",
    authenticity: "original",
    image: "/img/artifacts/transformation-mask.jpg",
    era: "Traditions & Community",
    summary:
      "Pulled open by hidden cords in the firelight of a winter dance, this mask splits apart to reveal a second face inside — an animal becoming a human, or a spirit becoming an ancestor. It is theatre, law and religion at the same time.",
    facts: [
      "Kwakwaka'wakw winter ceremonies (the t'seka, or red cedar bark season) were when the great masks were danced.",
      "Canada outlawed the potlatch in 1884. At a 1921 potlatch on Village Island, dancers were arrested and about 750 ceremonial objects were confiscated.",
      "U'mista Cultural Centre opened in 1980 in Alert Bay so that the seized regalia could come home; repatriation continues today.",
    ],
  },
  {
    id: "chilkat-robe",
    case: "Gallery III · Case 04",
    name: "Chilkat Dancing Robe",
    culture: "Tlingit (Chilkat) · Southeast Alaska",
    date: "c. 1880",
    material: "Mountain goat wool and yellow cedar bark, finger-woven on a strap loom",
    size: "≈ 1.5 m wide, with a long knotted fringe",
    found: "Woven in Chilkat Tlingit villages; traded widely along the coast",
    home: "Authentic robes: American Museum of Natural History; Smithsonian; McCord Stewart Museum",
    authenticity: "original",
    image: "/img/artifacts/chilkat-robe.jpg",
    era: "Art & Culture",
    summary:
      "A chief's robe is a crest worn on the body. Men painted the design on a pattern board; women wove it — a single robe could take a year. In dance, the long fringe swings and the crest seems to move, which is exactly the effect the weaver intended.",
    facts: [
      "Yellow cedar bark was boiled and shredded to soften it, then spun with goat wool — a textile made entirely from the forest and the mountains.",
      "Robes are regalia (at.óow): they belong to a clan, not to a person, and are brought out only for ceremony.",
      "Chilkat weaving is still practised today, taught by master weavers to a new generation of Tlingit artists.",
    ],
  },
  {
    id: "bentwood-box",
    case: "Gallery III · Case 05",
    name: "Bentwood Box",
    culture: "Coast Salish, Haida and Kwakwaka'wakw · the whole coast",
    date: "c. 1890",
    material: "One red cedar plank, steamed, kerfed and bent into four sides, with a fitted lid and bottom",
    size: "≈ 45 × 45 × 40 cm",
    found: "Every plank house on the coast — the standard storage container of Northwest Coast life",
    home: "Authentic boxes: Burke Museum, Seattle; Canadian Museum of History; American Museum of Natural History",
    authenticity: "original",
    image: "/img/artifacts/bentwood-box.jpg",
    era: "Traditional Homes",
    summary:
      "One plank becomes a watertight box. Red-hot stones dropped into a box of water could boil food; boxes stored dried salmon, berries and oil; others became drums, or held a person's regalia, or served as a burial box. It is one of the most elegant pieces of engineering on the coast.",
    facts: [
      "The corners are cut almost through (kerfed), then soaked and steamed until the wood bends without splitting.",
      "Boxes were traded far inland along the grease trails in exchange for furs, obsidian and oolichan oil.",
      "A painted crest on a box told everyone which family owned it — design was documentation.",
    ],
  },
  {
    id: "halibut-hook",
    case: "Gallery III · Case 06",
    name: "Wooden Halibut Hook",
    culture: "Tlingit and Haida · Southeast Alaska and Haida Gwaii",
    date: "c. 1900",
    material: "Two pieces of yew and cedar lashed together, with a bone barb and a stone weight",
    size: "≈ 30 cm across the V",
    found: "Fished from canoes over deep banks off the outer coast",
    home: "Authentic hooks: Sealaska Heritage Institute, Juneau; Alaska State Museum; Canadian Museum of History",
    authenticity: "original",
    image: "/img/artifacts/halibut-hook.jpg",
    era: "Food & Fishing",
    summary:
      "The V-shape is deliberate and clever: it is sized to catch a medium halibut — big enough to feed a family, small enough to haul into a canoe and tender enough to eat well. The huge ones were left alone. That is conservation built into the design of a tool.",
    facts: [
      "Hooks were often carved with an octopus or a spirit figure, and fishermen sang to them before setting the line.",
      "Yew wood was chosen for its strength and spring; it was one of the few hardwoods on the coast and was also used for paddles and tools.",
      "Halibut banks were owned by specific clans, who knew the depth, the bottom and the season of each one.",
    ],
  },
  {
    id: "whaling-harpoon",
    case: "Gallery III · Case 07",
    name: "Whaling Harpoon and Floats",
    culture: "Nuu-chah-nulth and Makah · west coast of Vancouver Island and Cape Flattery",
    date: "c. 1800",
    material: "Yew shaft, mussel-shell and stone point, cedar-bark rope, inflated sealskin floats",
    size: "Shaft sections joined to over 8 m; floats of whole sealskins",
    found: "Used from eight-paddler canoes far out in the open Pacific",
    home: "Authentic gear: Royal BC Museum, Victoria; Canadian Museum of History; Makah Cultural and Research Center",
    authenticity: "original",
    image: "/img/artifacts/whaling-harpoon.jpg",
    era: "Food & Fishing",
    wide: true,
    summary:
      "Whaling was the highest-status pursuit on the coast. A chief whaler prepared for months — bathing in cold water, fasting, praying — because success was understood to depend on spiritual power as much as on skill. The floats tired the whale; the harpoon held it.",
    facts: [
      "The whaler's shrine at Yuquot (Friendly Cove) — carved figures and whale bones — was collected in 1904 and taken to the American Museum of Natural History. The Mowachaht/Muchalaht have pursued its return ever since.",
      "A single whale fed a village for months and supplied oil, baleen and bone for trade.",
      "Makah whaling rights were guaranteed in the 1855 Treaty of Neah Bay and are still asserted today.",
    ],
  },
  {
    id: "cedar-bark-hat",
    case: "Gallery III · Case 08",
    name: "Cedar-Bark Hat and Basket",
    culture: "Makah · Ozette village, Cape Alava, Washington",
    date: "c. 1750, buried by a mudslide; excavated 1970–1976",
    material: "Inner cedar bark and spruce root, woven; preserved waterlogged in anaerobic mud",
    size: "Hat ≈ 30 cm across",
    found: "Ozette — five longhouses sealed under wet mud, which stopped decay completely",
    home: "Makah Cultural and Research Center, Neah Bay, Washington — opened by the Makah Tribe in 1979",
    authenticity: "original",
    image: "/img/artifacts/cedar-bark-hat.jpg",
    era: "Natural Resources",
    summary:
      "About 55,000 objects came out of the Ozette mud: hats, baskets, fishing gear, whalebone clubs, a carved whale fin, even food. Because the mud held no oxygen, wood and fibre survived for centuries. It is the single richest snapshot of daily life on the coast before European contact.",
    facts: [
      "The excavation was led by archaeologist Richard Daugherty together with the Makah Nation — one of the first true partnerships of its kind in the United States.",
      "Cedar bark was harvested from living trees in long strips that let the tree survive; archaeologists call these 'culturally modified trees' and some are thousands of years old.",
      "The Makah Cultural and Research Center was built by the tribe to keep Ozette at home rather than in a distant museum.",
    ],
  },
  {
    id: "reef-net",
    case: "Gallery III · Case 09",
    name: "Reef Net and Salmon Weir",
    culture: "Coast Salish · Lummi, Saanich, Musqueam, Samish and neighbouring nations",
    date: "Ancient technology, used into the 20th century and revived today",
    material: "Cedar-bark rope netting, cedar stakes, stone anchors, two canoes",
    size: "Nets 20 m or more across a tidal channel",
    found: "Shallow reef channels in the Salish Sea and river mouths from the Fraser to the Columbia",
    home: "Re-created and demonstrated by Coast Salish nations; models in the Burke Museum and the Museum of Anthropology at UBC",
    authenticity: "reconstruction",
    image: "/img/artifacts/reef-net.jpg",
    era: "Food & Fishing",
    wide: true,
    summary:
      "A reef net is a trap made of geography. Two canoes hold a net across a channel where salmon must pass, with a 'false bottom' of netting that leads the fish to think they are still swimming free. Fishing sites were family property, passed down with the knowledge of exactly when the tide and the run would meet.",
    facts: [
      "Weirs and traps were managed: fishers let enough salmon through to reach the spawning grounds, so the run returned next year.",
      "Canada banned salmon weirs in the 1880s and Washington State restricted reef nets in the 20th century.",
      "Coast Salish nations are now reviving reef-net fishing, and clam gardens are being rebuilt on both sides of the border.",
    ],
  },
  {
    id: "argillite-carving",
    case: "Gallery III · Case 10",
    name: "Haida Argillite Carving",
    culture: "Haida · Skidegate, Haida Gwaii",
    date: "c. 1840 onward",
    material: "Black argillite (a fine slate) quarried only at Tllgaduu Randlaay on Haida Gwaii",
    size: "≈ 25 cm panel or model pole",
    found: "Carved at Skidegate and Old Massett for trade with sailors, fur traders and collectors",
    home: "Authentic carvings: The British Museum; Canadian Museum of History; Museum of Anthropology at UBC",
    authenticity: "original",
    image: "/img/artifacts/argillite-carving.jpg",
    era: "Northwest Coast Today",
    summary:
      "When epidemics and the collapse of the fur trade destroyed the old economy, Haida artists created a new one. Argillite — a soft black slate found nowhere else on Earth — was carved into panels, pipes and model poles and sold to ship crews. It became one of the most collectable art forms of the 19th-century Pacific.",
    facts: [
      "The quarry is Haida property. Under Haida law, only Haida carvers may take argillite from it.",
      "In 1904 Haida carvers from Skidegate built a complete model village of 29 miniature houses and poles for the World's Fair in St. Louis; it is now at the Canadian Museum of History.",
      "Haida art never stopped. Charles Edenshaw (c. 1839–1920), Bill Reid (1920–1998) and Robert Davidson (b. 1946) carried formline design into galleries worldwide.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Section 2 — immersive environments                                   */
/* ------------------------------------------------------------------ */

export interface Scene {
  id: string;
  numeral: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  stats: { value: string; label: string }[];
  tint: string;
}

export const SCENES: Scene[] = [
  {
    id: "geography",
    numeral: "I",
    kicker: "Geography & Climate",
    title: "The Rain Coast",
    body:
      "Picture a narrow green strip of land squeezed between the Pacific Ocean and the Coast Mountains, running all the way from Alaska down to Oregon. Wet air off the warm ocean current hits the mountains and drops its rain — some places get more than three metres in a single year. That rain grows temperate rainforest: western red cedar, hemlock and spruce so tall the light comes down in shafts. Winters are mild, summers cool, and the sea never freezes. This climate is the whole reason large, permanent villages could thrive here without farming.",
    image: "/img/env/mountains.jpg",
    stats: [
      { value: "25,000 km", label: "Of coastline, islands and inlets" },
      { value: "3 m+", label: "Rainfall in a wet year" },
      { value: "60 m", label: "Height of an old-growth cedar" },
    ],
    tint: "rgba(46,110,72,0.22)",
  },
  {
    id: "transportation",
    numeral: "II",
    kicker: "Transportation",
    title: "The Ocean Road",
    body:
      "For Northwest Coast peoples the ocean was never a wall — it was a highway. Canoes carved from single cedar trees crossed open straits to trade, marry, visit and fish. A large ocean canoe could carry forty people plus their goods for hundreds of kilometres. Designs differed by Nation: Nuu-chah-nulth canoes were built to ride heavy swell for whaling, while Coast Salish canoes were built for reef-net fishing in shallow channels.",
    image: "/img/env/ocean.jpg",
    stats: [
      { value: "19 m", label: "Length of the largest ocean canoes" },
      { value: "40+", label: "People one big canoe could carry" },
      { value: "2,500 km", label: "Of coast linked by canoe travel" },
    ],
    tint: "rgba(60,110,130,0.20)",
  },
  {
    id: "homes",
    numeral: "III",
    kicker: "Traditional Homes",
    title: "The Cedar-Plank Longhouse",
    body:
      "In summer families moved out to fishing camps. In winter they gathered in permanent villages of great cedar plank houses, each up to 20 metres across, with several related families living under one roof. The planks could be lifted off and carried to the next camp — the frame stayed, the walls travelled. Carved house posts held the roof beams, and a frontal pole with a doorway cut through it stood at the front, displaying the family's crests.",
    image: "/img/env/village.jpg",
    stats: [
      { value: "20 m", label: "Across the largest plank houses" },
      { value: "30+", label: "People in one household" },
      { value: "Winter", label: "The ceremonial season" },
    ],
    tint: "rgba(150,110,60,0.18)",
  },
  {
    id: "food",
    numeral: "IV",
    kicker: "Food & Fishing",
    title: "The Salmon River",
    body:
      "Salmon are the reason this coast supported large, wealthy, settled societies without ever planting a field. Whole villages organised their year around the runs. Fish were caught at weirs and reef nets, then split and smoked on cedar racks and stored in bentwood boxes for winter. Clams, halibut, herring, seals, whales, berries and roots filled out the diet — and the first salmon of the season was honoured in ceremony, because a run that was respected would come back.",
    image: "/img/env/river.jpg",
    stats: [
      { value: "5", label: "Species of Pacific salmon" },
      { value: "11,000 yrs", label: "Of fishing at Celilo Falls" },
      { value: "1957", label: "Celilo Falls flooded by a dam" },
    ],
    tint: "rgba(160,90,50,0.16)",
  },
];

/* ------------------------------------------------------------------ */
/* Section 4 — timeline, discoveries, map                               */
/* ------------------------------------------------------------------ */

export interface TimelineEntry {
  id: string;
  when: string;
  era: string;
  title: string;
  text: string;
  scale: "deep" | "ancient" | "modern";
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: "t1",
    when: "c. 14,000 years ago",
    era: "Deep time",
    title: "A hearth on Triquet Island",
    text:
      "Archaeologists working with the Heiltsuk Nation found charcoal from an ancient hearth on a small island off British Columbia, dated to about 14,000 years ago — while much of the continent was still under ice. Heiltsuk oral history has always said this coast was a refuge.",
    scale: "deep",
  },
  {
    id: "t2",
    when: "c. 13,000 – 10,000 years ago",
    era: "Deep time",
    title: "The sea rises and drowns the old shoreline",
    text:
      "As the glaciers melted, sea level rose more than 100 metres. The coastlines people walked for thousands of years are now underwater, which is why so much of the earliest evidence here is found on islands that stayed high, or on the seafloor itself.",
    scale: "deep",
  },
  {
    id: "t3",
    when: "at least 3,500 years ago",
    era: "Deep time",
    title: "The clam gardens are built",
    text:
      "Along thousands of kilometres of beach, people rolled boulders into low walls at the tide line, creating flat terraces behind them where clams thrive. These engineered gardens can multiply clam productivity — some of the oldest known examples of marine farming anywhere on Earth.",
    scale: "deep",
  },
  {
    id: "t4",
    when: "c. 4,000 – 2,000 years ago",
    era: "Deep time",
    title: "Villages of plank and salmon",
    text:
      "On the Fraser River and around the Salish Sea, large permanent villages appear in the archaeological record, with plank houses, elaborate burials and carved stone and bone. Intensified salmon fishing supports populations that rival farming societies elsewhere.",
    scale: "deep",
  },
  {
    id: "t5",
    when: "c. 2,000 years ago",
    era: "Deep time",
    title: "Formline design matures",
    text:
      "The Northwest Coast art system — ovoids, U-forms and flowing formlines in black, red and blue-green — reaches its classic form on bone, antler, stone and cedar. It is one of the world's great graphic traditions, and it is still practised today.",
    scale: "deep",
  },
  {
    id: "t6",
    when: "c. 1,000 years ago",
    era: "The classic coast",
    title: "Monumental cedar and the potlatch",
    text:
      "Great plank-house villages line the coast, fronted by carved cedar poles. The potlatch becomes the governing institution of society: names, titles, marriages and histories are validated in public, in front of witnesses, by giving wealth away.",
    scale: "ancient",
  },
  {
    id: "t7",
    when: "c. 1750",
    era: "The classic coast",
    title: "Ozette is sealed under mud",
    text:
      "A rain-saturated mudslide sweeps down a hillside at Cape Alava, Washington, and buries part of a Makah village. The wet, airless mud preserves wood, fibre and food so completely that it becomes a time capsule of life before sustained European contact.",
    scale: "ancient",
  },
  {
    id: "t8",
    when: "1774 – 1778",
    era: "Contact",
    title: "Ships arrive on the coast",
    text:
      "The Spanish ship Santiago under Juan Pérez meets Haida and Nuu-chah-nulth people in 1774. In 1778 Captain James Cook shelters at Yuquot (Nootka Sound) and trades for sea otter pelts. Objects collected on that voyage are now in the British Museum.",
    scale: "modern",
  },
  {
    id: "t9",
    when: "1780s – 1850s",
    era: "Contact",
    title: "The fur trade, steel tools — and epidemics",
    text:
      "Sea otter pelts bound for China bring enormous wealth and iron tools that transform carving. They also bring smallpox, measles and influenza. Haida population, perhaps 10,000–15,000 before contact, falls to about 600 by 1915.",
    scale: "modern",
  },
  {
    id: "t10",
    when: "1855",
    era: "Contact",
    title: "The Treaty of Neah Bay",
    text:
      "The Makah sign a treaty with the United States guaranteeing their right to fish and to hunt whales — a right they have defended in court ever since. Across the coast, other treaties, reserves and land losses follow.",
    scale: "modern",
  },
  {
    id: "t11",
    when: "1883 – 1884",
    era: "Suppression",
    title: "The ceremonies are outlawed",
    text:
      "The United States issues its Code of Indian Offenses in 1883 and Canada amends the Indian Act in 1884 to criminalise the potlatch and the winter dances. Children are taken to residential and industrial schools. Ceremonies go underground rather than stop.",
    scale: "modern",
  },
  {
    id: "t12",
    when: "1899",
    era: "Collecting",
    title: "The Great Canoe arrives in New York",
    text:
      "The 19-metre Heiltsuk/Haida canoe reaches the American Museum of Natural History, one of tens of thousands of Northwest Coast objects collected in an era when museums almost never asked the nations who made them.",
    scale: "modern",
  },
  {
    id: "t13",
    when: "1921 – 1922",
    era: "Suppression",
    title: "The Village Island potlatch raid",
    text:
      "At Chief Dan Cranmer's potlatch on Village Island, Kwakwaka'wakw dancers are arrested and 45 people are charged; about 750 masks, coppers and regalia are confiscated and many are sold to museums. The community has spent a century working to bring them home.",
    scale: "modern",
  },
  {
    id: "t14",
    when: "1951 – 1957",
    era: "Renewal",
    title: "The ban ends — and Celilo Falls is drowned",
    text:
      "Canada repeals the potlatch ban in 1951 and potlatches are held openly again. In 1957 The Dalles Dam floods Celilo Falls (Nixlúutix) on the Columbia River, ending a salmon fishery and trade market that had run for about 11,000 years.",
    scale: "modern",
  },
  {
    id: "t15",
    when: "1974 – today",
    era: "Renewal",
    title: "Rights, repatriation and living art",
    text:
      "The Boldt Decision (1974) upholds treaty fishing rights. U'mista Cultural Centre opens in 1980. Haida carving is revived by Bill Reid and Robert Davidson. Haida Gwaii and Gwaii Haanas are co-managed with the Haida Nation, and canoes journey the coast again every summer.",
    scale: "modern",
  },
];

export interface Discovery {
  id: string;
  layer: string;
  depth: string;
  title: string;
  place: string;
  year: string;
  body: string;
  points: string[];
  image?: string;
}

export const DISCOVERIES: Discovery[] = [
  {
    id: "d1",
    layer: "Stratum I",
    depth: "Mudslide layer · c. 1750",
    title: "The Village Under the Mud",
    place: "Ozette, Cape Alava, Washington",
    year: "Excavated 1970 – 1976",
    body:
      "A mudslide buried part of a Makah village around 1750. Because the mud held no oxygen, wood, cedar bark, netting and even stored food survived for more than two centuries. When excavation began in 1970, archaeologists found roughly 55,000 objects — the richest record of everyday Northwest Coast life ever recovered.",
    points: [
      "The dig was a partnership between Richard Daugherty's team and the Makah Nation, decades before that was normal practice.",
      "Finds included whalebone clubs, a carved whale dorsal fin, basketry hats, fishing gear and the contents of storage boxes.",
      "The Makah built their own museum at Neah Bay in 1979 so the collection would stay in Makah hands.",
    ],
    image: "/img/artifacts/cedar-bark-hat.jpg",
  },
  {
    id: "d2",
    layer: "Stratum II",
    depth: "Intertidal · lowest tide",
    title: "The Gardens in the Tide",
    place: "Gulf Islands, BC · Southeast Alaska · Washington",
    year: "Mapped from the 1990s · dated to 3,500+ years",
    body:
      "From the air and at extreme low tide, a pattern appears along the coast: long, straight walls of hand-stacked boulders built at the tide line. Behind each wall is a flat terrace of gravel and shell where clams grow thick and fast. These are clam gardens — deliberate marine farms, built and maintained for thousands of years.",
    points: [
      "Experiments show the walls can multiply the productivity of butter clams and nearly double that of littleneck clams.",
      "Gardeners also tilled the beaches, removed predators and harvested at a size that let the population recover.",
      "Coast Salish, Haida, Tlingit and other nations are rebuilding clam gardens today, working with archaeologists and biologists.",
    ],
    image: "/img/artifacts/clam-garden.jpg",
  },
  {
    id: "d3",
    layer: "Stratum III",
    depth: "Peat & shell · 14,000 years",
    title: "The Hearth That Moved the Timeline",
    place: "Triquet Island, British Columbia",
    year: "Excavated 2017",
    body:
      "On a small island in Heiltsuk territory, archaeologists from the Hakai Institute and the University of Victoria dug through layers of peat and shell and found charcoal from an ancient hearth. Radiocarbon dating put it at about 14,000 years old — making it one of the oldest archaeological sites known in North America.",
    points: [
      "The find supports Heiltsuk oral history, which describes this coast as an ice-free refuge during the last glaciation.",
      "Sea-level studies show the island has been above water continuously for about 14,000 years.",
      "It changed a long-held idea that the first people in the Americas could only have arrived later, through an inland ice-free corridor.",
    ],
    image: "/img/env/coast.jpg",
  },
  {
    id: "d4",
    layer: "Stratum IV",
    depth: "Museum storeroom · 1922 – 1980",
    title: "The Collection That Came Home",
    place: "Alert Bay and Village Island, British Columbia",
    year: "1921 raid · U'mista opens 1980",
    body:
      "In December 1921 Chief Dan Cranmer held a great potlatch at Village Island. Under Canadian law the potlatch was illegal. Dancers were arrested, dozens of people were charged, and about 750 masks, coppers, headdresses and regalia were confiscated — then scattered into museum storerooms and private collections.",
    points: [
      "The Kwakwaka'wakw spent decades asking for the regalia back, and began succeeding in the 1970s and 1980s.",
      "U'mista Cultural Centre opened in Alert Bay in 1980 — its name means 'to bring back home' — as a purpose-built home for the collection.",
      "In the United States, NAGPRA (1990) created a legal route for museums to return sacred objects and ancestral remains to tribes.",
    ],
    image: "/img/artifacts/transformation-mask.jpg",
  },
];

export interface MapSite {
  id: string;
  name: string;
  region: string;
  lon: number;
  lat: number;
  era: string;
  artifactId?: string;
  note: string;
}

/** New York is the destination for every "journey" arc on the map. */
export const MUSEUM_SITE: MapSite = {
  id: "amnh",
  name: "American Museum of Natural History",
  region: "New York City, USA",
  lon: -73.974,
  lat: 40.781,
  era: "Founded 1869",
  note: "Holds the Great Canoe, the Yuquot whalers' shrine and one of the world's largest Northwest Coast collections — the model for this virtual exhibition.",
};

export const MAP_SITES: MapSite[] = [
  {
    id: "haida-gwaii",
    name: "Haida Gwaii",
    region: "Skidegate & SGang Gwaay, British Columbia",
    lon: -132.6,
    lat: 52.1,
    era: "Time immemorial – today",
    artifactId: "argillite-carving",
    note: "The 'Islands of the People'. Home of Haida monumental carving, the black argillite quarry, and SGang Gwaay — a UNESCO World Heritage village of standing memorial poles.",
  },
  {
    id: "sitka",
    name: "Sitka (Sheet'ká)",
    region: "Southeast Alaska",
    lon: -135.33,
    lat: 57.05,
    era: "Time immemorial – today",
    artifactId: "chilkat-robe",
    note: "Tlingit capital and centre of Chilkat weaving. Sitka National Historical Park preserves a trail of carved poles, including poles shown at the 1904 St. Louis World's Fair.",
  },
  {
    id: "heiltsuk",
    name: "Heiltsuk Territory",
    region: "Bella Bella & Triquet Island, BC",
    lon: -128.15,
    lat: 52.16,
    era: "c. 14,000 years ago – today",
    artifactId: "great-canoe",
    note: "One of the nations whose oral traditions claim the Great Canoe. Triquet Island in Heiltsuk waters yielded a hearth dated to about 14,000 years ago.",
  },
  {
    id: "kwakwaka",
    name: "Kwakwaka'wakw Territory",
    region: "Fort Rupert, Alert Bay & Village Island, BC",
    lon: -127.7,
    lat: 50.6,
    era: "Time immemorial – today",
    artifactId: "transformation-mask",
    note: "Home of the great transformation masks and the winter cedar-bark ceremonies — and of the 1921 potlatch whose regalia is now returning to U'mista Cultural Centre.",
  },
  {
    id: "nuuchah",
    name: "Yuquot (Friendly Cove)",
    region: "Nuu-chah-nulth territory, Vancouver Island",
    lon: -126.9,
    lat: 49.6,
    era: "1778 – today",
    artifactId: "whaling-harpoon",
    note: "Mowachaht/Muchalaht whaling capital, and the first place on the coast visited by Captain Cook in 1778. The whalers' shrine collected here in 1904 is still held in New York.",
  },
  {
    id: "salish",
    name: "Musqueam & the Fraser River",
    region: "Coast Salish territory, British Columbia",
    lon: -123.2,
    lat: 49.2,
    era: "c. 4,000 years ago – today",
    artifactId: "reef-net",
    note: "The great salmon river of the Coast Salish world: reef nets, weirs, plank-house villages and the Marpole site. Musqueam, Squamish and Tsleil-Waututh nations live here today.",
  },
  {
    id: "ozette",
    name: "Ozette / Cape Alava",
    region: "Makah territory, Washington State",
    lon: -124.72,
    lat: 48.09,
    era: "c. 1750 · excavated 1970",
    artifactId: "cedar-bark-hat",
    note: "The mudslide site that preserved about 55,000 objects. The collection is kept by the Makah Cultural and Research Center at Neah Bay.",
  },
  {
    id: "celilo",
    name: "Celilo Falls (Nixlúutix)",
    region: "Columbia River, Oregon",
    lon: -121.1,
    lat: 45.6,
    era: "c. 11,000 years of fishing · flooded 1957",
    note: "One of the oldest continuously used fishing and trading sites in North America. Chinook, Yakama, Warm Springs and Umatilla fishers worked the falls until The Dalles Dam drowned them.",
  },
  {
    id: "london",
    name: "The British Museum",
    region: "London, England",
    lon: -0.127,
    lat: 51.51,
    era: "Objects collected from 1778",
    note: "Early maritime-fur-trade objects — including Nuu-chah-nulth and Haida material collected on Cook's 1778 and 1787 voyages — were shipped to Europe and are still held there.",
  },
];

/* ------------------------------------------------------------------ */
/* Section 5 — people and cultures                                      */
/* ------------------------------------------------------------------ */

export interface Person {
  id: string;
  name: string;
  lived: string;
  culture: string;
  role: string;
  image: string;
  quote?: string;
  quoteSource?: string;
  body: string;
  facts: string[];
  /** How the portrait should be understood. */
  likeness: string;
}

export const PEOPLE: Person[] = [
  {
    id: "carver",
    name: "The Carver",
    lived: "c. 1850 – today",
    culture: "Haida · Ts'ak, the one who shapes cedar",
    role: "Master carver of poles, canoes and crests",
    image: "/img/people/canoe-carver.jpg",
    quote: "The tree is a relative. You ask before you take, and you use all of it.",
    quoteSource: "A teaching carried by Northwest Coast carvers",
    body:
      "A carver read a standing cedar for years before felling it: straight grain, no rot, no lightning scar. Then the work began — splitting with elk-antler wedges, shaping with a stone and later steel adze, and laying down formline design that had to be correct, because a crest is a legal claim, not a decoration.",
    facts: [
      "Carving knowledge was inherited and apprenticed: a young carver learned by watching, then by roughing out, then by finishing.",
      "Charles Edenshaw (c. 1839–1920) of Skidegate is considered the first great Haida artist known by name in the modern record.",
      "Bill Reid (1920–1998) and Robert Davidson (b. 1946) revived Haida formline art; Reid's 'The Raven and the First Men' (1980) stands at the Museum of Anthropology, UBC.",
    ],
    likeness: "Artistic reconstruction — this honours the tradition of the ts'ak rather than one identified individual.",
  },
  {
    id: "dancer",
    name: "The Dancer",
    lived: "c. 1880 – today",
    culture: "Kwakwaka'wakw · t'seka, the red cedar bark season",
    role: "Dancer of the winter ceremonies",
    image: "/img/people/dancer.jpg",
    quote: "When the mask opens, the dancer is no longer only himself.",
    quoteSource: "On the transformation masks of the winter dances",
    body:
      "In the darkest months the village turned into a theatre. Dancers entered through a hidden door in the plank house, moving with the firelight behind them, while singers kept the rhythm and the audience — who were also the witnesses — confirmed everything they saw. The dances carried the family's history and its rights.",
    facts: [
      "Cedar bark, dyed red and shredded into rings and headdresses, was the regalia of the winter season.",
      "Canada criminalised these ceremonies in 1884; communities kept dancing in secret or moved the feasts to Christmas and birthdays.",
      "Since the ban was repealed in 1951, potlatches and winter dances have been held openly again — and the regalia is coming home.",
    ],
    likeness: "Artistic reconstruction — no portrait of a specific dancer is claimed; regalia and ceremony are shown respectfully.",
  },
  {
    id: "whaler",
    name: "The Whaler",
    lived: "c. 1800 – today",
    culture: "Nuu-chah-nulth and Makah · west coast of Vancouver Island and Cape Flattery",
    role: "Chief whaler and canoe master",
    image: "/img/people/whaler.jpg",
    body:
      "Whaling was the highest-status work on the coast, and it was as much spiritual as technical. A whaling chief trained for years: cold-water bathing, fasting, long swims, and prayers at a shrine of carved figures and whale bones. Only then did he take an eight-paddler canoe out into the open Pacific after a grey whale.",
    facts: [
      "The harpoon had a detachable point; sealskin floats on the line exhausted the whale so the crew could bring it in.",
      "A single whale fed a village for months and supplied oil, baleen and bone that were traded inland.",
      "The Makah's treaty right to hunt whales was guaranteed in 1855 and remains a live legal and cultural question today.",
    ],
    likeness: "Artistic reconstruction — an honour to the whaling tradition, not a portrait of an identified person.",
  },
  {
    id: "weaver",
    name: "The Weaver",
    lived: "c. 1800 – today",
    culture: "Coast Salish · Musqueam, Squamish, Stó:lō and neighbouring nations",
    role: "Weaver of cedar bark and mountain goat wool",
    image: "/img/people/weaver.jpg",
    quote: "The pattern is remembered in the hands before it is remembered in the mind.",
    quoteSource: "On the teaching of weaving",
    body:
      "Women owned the textile arts of the coast. They stripped inner cedar bark in long living strips, soaked and split it, spun it with goat wool and dog wool, and wove blankets, robes, baskets, mats, hats and cradles. A Coast Salish weaver could make a watertight basket, a ceremonial robe and a kilometre of fishing rope from the same forest.",
    facts: [
      "Bark was taken from living trees in a way that let them survive — thousands of 'culturally modified trees' still show the scars.",
      "Coast Salish weavers also spun the wool of a special shaggy dog bred for fibre, before sheep arrived on the coast.",
      "Weaving was nearly lost under the residential school system; Musqueam, Squamish and Sto:lō weavers have taught it back into practice since the 1970s.",
    ],
    likeness: "Artistic reconstruction — represents the role of the weaver, not one identified individual.",
  },
];

export interface Culture {
  id: string;
  name: string;
  span: string;
  place: string;
  text: string;
  legacy: string;
}

export const CULTURES: Culture[] = [
  {
    id: "c1",
    name: "Geography & Climate",
    span: "Exhibit 01",
    place: "Pacific coastline · Coast Mountains · temperate rainforest",
    text:
      "A narrow strip of land between the ocean and the mountains, from Alaska to Oregon. Warm wet air off the Pacific hits the mountains and dumps rain — over three metres a year in some places. That rain grows temperate rainforest, with mild winters, cool summers and a sea that never freezes.",
    legacy:
      "The same coastline, rainforest and rivers are the homelands of these Nations today.",
  },
  {
    id: "c2",
    name: "Natural Resources",
    span: "Exhibit 02",
    place: "Cedar · salmon · sea mammals · shellfish · berries",
    text:
      "Four resources built this world. Western red cedar gave wood, bark and rope; salmon and halibut gave food; seals, otters and whales gave oil, bone and hide; clams, berries and roots filled the rest. Nothing was wasted — bark was stripped from living trees so they survived, and enough fish were let through to spawn.",
    legacy:
      "Clam gardens and cedar stands are still cared for the same way, by the same Nations.",
  },
  {
    id: "c3",
    name: "Traditional Homes",
    span: "Exhibit 03",
    place: "Winter villages of the whole coast",
    text:
      "Families lived in great houses of split cedar planks, up to 20 metres across, with several related families under one roof. Planks could be lifted off and carried to summer fishing camps — the frame stayed, the walls travelled. Carved house posts held the beams, and a frontal pole with a doorway showed the family's crests.",
    legacy:
      "Longhouses are still built and used today for ceremonies, gatherings and feasts.",
  },
  {
    id: "c4",
    name: "Transportation",
    span: "Exhibit 04",
    place: "Haida · Tlingit · Heiltsuk · Kwakwaka'wakw · Nuu-chah-nulth · Makah · Coast Salish",
    text:
      "The ocean was the highway. Canoes carved from single cedars ranged from 3-metre river canoes to 19-metre ocean canoes carrying forty people and their goods. Designs differed by Nation: Nuu-chah-nulth canoes were built for whaling in heavy swell, Coast Salish canoes for reef-net fishing in shallow channels.",
    legacy:
      "Since 1989 the annual Tribal Canoe Journeys bring dozens of Nations together on the water.",
  },
  {
    id: "c5",
    name: "Food & Fishing",
    span: "Exhibit 05",
    place: "Rivers, reefs and tidal flats",
    text:
      "Salmon were the staple — caught at weirs and reef nets, with dip nets, hooks and traps, then split and smoked on cedar racks for winter. Halibut, herring, eulachon, seals, whales, clams and crabs filled the diet, with berries and roots in season. Fishing sites were family property, passed down with knowledge of the tide and the run.",
    legacy:
      "Treaty fishing rights were upheld in court in 1974; Nations still fish and manage the runs.",
  },
  {
    id: "c6",
    name: "Art & Culture",
    span: "Exhibit 06",
    place: "Haida · Tlingit · Kwakwaka'wakw · Coast Salish styles",
    text:
      "Art was documentation. Poles, house posts, masks, bentwood boxes, Chilkat robes and argillite panels carried family crests — the animals and beings whose stories a family has the right to tell. Styles differ by Nation: northern formline design (Haida, Tlingit) is bold and geometric, while Coast Salish carving is softer and more abstract.",
    legacy:
      "Charles Edenshaw, Bill Reid and Robert Davidson carried it into world galleries; carvers and weavers teach it now.",
  },
  {
    id: "c7",
    name: "Traditions & Community",
    span: "Exhibit 07",
    place: "Every Nation of the coast",
    text:
      "The potlatch — from a Chinook Jargon word meaning 'to give' — was the heart of society. A host fed hundreds of guests and gave away wealth; in return the guests witnessed and confirmed a name, a title, a marriage or a memorial. Wealth was measured by what you gave, not what you kept. Winter dances and cedar-bark regalia carried the same histories.",
    legacy:
      "Banned from 1884 to 1951, potlatches are now held openly again all along the coast.",
  },
  {
    id: "c8",
    name: "Northwest Coast Today",
    span: "Exhibit 08",
    place: "Haida · Tlingit · Kwakwaka'wakw · Nuu-chah-nulth · Coast Salish · Heiltsuk · Makah · Chinook",
    text:
      "These are not cultures of the past. Haida Gwaii and Gwaii Haanas are co-managed by the Haida Nation and Canada; U'mista and the Makah Cultural and Research Center are Indigenous-run museums; weavers, carvers and canoe pullers are teaching the next generation; and Nations are rebuilding clam gardens and bringing regalia home from museums worldwide.",
    legacy:
      "Tens of thousands of people belong to Northwest Coast Nations today — and their art, law and language are growing.",
  },
];

/**
 * The Nations of this coast. They are not one people: each has its own
 * language, territory, art style and government, and each is alive today.
 */
export const NATIONS: Culture[] = [
  {
    id: "n1",
    name: "Haida",
    span: "Time immemorial – today",
    place: "Haida Gwaii & southern Alaska (Kaigani)",
    text:
      "A seafaring nation of monumental carvers, organised into two moieties — Raven and Eagle — and dozens of lineages, each holding its own crests. Their villages of Skidegate, Old Massett and SGang Gwaay were fronted by great cedar poles, and Haida canoes were traded all along the coast.",
    legacy:
      "Haida Gwaii and Gwaii Haanas are co-managed by the Council of the Haida Nation and Canada; SGang Gwaay is a UNESCO World Heritage Site.",
  },
  {
    id: "n2",
    name: "Tlingit (Lingít)",
    span: "Time immemorial – today",
    place: "Southeast Alaska · fjords, islands and rivers",
    text:
      "A clan-based society of the northern coast, also organised into Raven and Eagle/Wolf moieties. Clan regalia — at.óow, meaning robes, hats, coppers and screens — belongs to the clan rather than to any individual, and is brought out only for ceremony.",
    legacy:
      "Chilkat and ravenstail weaving are taught again by master weavers, and clan law still governs ceremonies.",
  },
  {
    id: "n3",
    name: "Kwakwaka'wakw",
    span: "Time immemorial – today",
    place: "Northern Vancouver Island & the adjacent mainland, BC",
    text:
      "Nineteen nations speaking Kwak'wala, famous for the winter cedar-bark ceremonies and for transformation masks that split open in the firelight. Their potlatches were the direct target of Canada's 1884 ban and of the 1921 Village Island prosecutions.",
    legacy:
      "U'mista Cultural Centre in Alert Bay — 'to bring back home' — was built in 1980 to hold the returning regalia.",
  },
  {
    id: "n4",
    name: "Nuu-chah-nulth",
    span: "Time immemorial – today",
    place: "West coast of Vancouver Island, facing the open Pacific",
    text:
      "The great whalers of the coast. Whaling required years of ritual preparation as well as engineering: harpoons with detachable points, cedar-bark rope and sealskin floats. Yuquot (Friendly Cove) was the first place on this coast visited by Captain Cook, in 1778.",
    legacy:
      "The Mowachaht/Muchalaht continue to seek the return of the Yuquot whalers' shrine, collected in 1904 and still held in New York.",
  },
  {
    id: "n5",
    name: "Coast Salish",
    span: "Time immemorial – today",
    place: "Salish Sea, Fraser River & Puget Sound",
    text:
      "A large family of nations — Musqueam, Squamish, Tsleil-Waututh, Stó:lō, Lummi, Samish, Saanich and many more — sharing reef-net fishing sites, plank-house villages and a softer, more abstract carving style than the north.",
    legacy:
      "Musqueam, Squamish and Stó:lō weavers have led a revival of spindle-whorl design and mountain goat wool weaving since the 1970s.",
  },
  {
    id: "n6",
    name: "Heiltsuk",
    span: "Time immemorial – today",
    place: "Central Coast, British Columbia (Bella Bella)",
    text:
      "One of the nations whose oral traditions carry the history of the Great Canoe. Heiltsuk territory includes Triquet Island, where archaeologists working with the Nation found a hearth dated to about 14,000 years ago — confirming a very old oral account of an ice-free refuge.",
    legacy:
      "Heiltsuk harvest eulachon and render its grease today, and lead the annual Tribal Canoe Journeys.",
  },
  {
    id: "n7",
    name: "Makah",
    span: "Time immemorial – today",
    place: "Cape Flattery & Neah Bay, Washington",
    text:
      "Whalers and sealers at the north-west tip of the continental United States. Their village of Ozette was sealed by a mudslide around 1750 and excavated in the 1970s, preserving about 55,000 objects in airless mud.",
    legacy:
      "The Makah built their own museum at Neah Bay in 1979 to keep the collection at home, and their 1855 treaty fishing and whaling rights remain in force.",
  },
  {
    id: "n8",
    name: "Chinook",
    span: "Time immemorial – today",
    place: "Lower Columbia River, Oregon & Washington",
    text:
      "Masters of the river and of the trade that ran along it. Celilo Falls and the mouth of the Columbia were among the greatest trading centres in North America, and Chinook Jargon (Chinuk Wawa) became the shared language of the whole coast.",
    legacy:
      "Chinookan peoples are reviving Chinuk Wawa as a first language, and continue a two-century fight for full federal recognition.",
  },
];

/* ------------------------------------------------------------------ */
/* Sources                                                              */
/* ------------------------------------------------------------------ */

export interface Source {
  title: string;
  publisher: string;
  used: string;
}

export const SOURCES: Source[] = [
  {
    title: "The Great Canoe in the Grand Gallery",
    publisher: "American Museum of Natural History — On Exhibit Posts",
    used: "Single western red cedar, c. 1878, Heiltsuk and Haida oral traditions, dowry payment, arrival in 1899",
  },
  {
    title: "Northwest Coast collections & the Yuquot whalers' shrine",
    publisher: "American Museum of Natural History; Mowachaht/Muchalaht First Nation",
    used: "Collection of the shrine in 1904 and the community's efforts to have it returned",
  },
  {
    title: "U'mista Cultural Centre — the Potlatch Collection",
    publisher: "U'mista Cultural Centre, Alert Bay, BC",
    used: "1921 Village Island potlatch, prosecutions, confiscated regalia, repatriation since 1980",
  },
  {
    title: "Ozette / Makah Cultural and Research Center",
    publisher: "Makah Tribe; Washington State University archaeology (R. Daugherty)",
    used: "c. 1750 mudslide, 1970–1976 excavation, ~55,000 artefacts, museum opened at Neah Bay in 1979",
  },
  {
    title: "Triquet Island excavation",
    publisher: "Hakai Institute & University of Victoria, with the Heiltsuk Nation (2017)",
    used: "Hearth charcoal dated to about 14,000 years ago; stable sea level on the island",
  },
  {
    title: "Clam garden research",
    publisher: "Simon Fraser University, University of Washington & Indigenous clam garden networks",
    used: "Boulder-wall construction, productivity gains, minimum age of about 3,500 years, modern restoration",
  },
  {
    title: "Indian Act (Canada) 1884 & 1951; Code of Indian Offenses (USA) 1883",
    publisher: "Government of Canada; US Office of Indian Affairs",
    used: "Criminalisation of the potlatch and winter ceremonies, and their repeal",
  },
  {
    title: "Treaty of Neah Bay (1855); United States v. Washington (1974); NAGPRA (1990)",
    publisher: "US courts and federal law; Celilo Falls records, Oregon Historical Society",
    used: "Treaty fishing and whaling rights, the Boldt Decision, repatriation law, and the 1957 flooding of Celilo Falls",
  },
];

export const PROJECT = {
  title: "Northwest Coast",
  subtitle: "Northwest Coast Indigenous Peoples and Their Environment",
  course: "Grade 7 Social Studies",
  inspiredBy: "Inspired by the American Museum of Natural History, New York",
  year: "2026",
};

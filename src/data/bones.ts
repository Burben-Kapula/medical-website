// Bone information and the rules that connect 3D mesh names to it.
// This file has no imports, so the Node scripts in /scripts can load it too.

export type BoneInfo = {
  id: string;
  name: string;
  latinName: string;
  description: string;
  function: string;
  image: string;
  sourceUrl?: string;
};

export type BoneRegion =
  | "skull"
  | "spine"
  | "thorax"
  | "upperLimb"
  | "hand"
  | "pelvis"
  | "lowerLimb"
  | "foot";

export const regionOrder: BoneRegion[] = [
  "skull",
  "spine",
  "thorax",
  "upperLimb",
  "hand",
  "pelvis",
  "lowerLimb",
  "foot",
];

const wiki = (page: string) => `https://en.wikipedia.org/wiki/${page}`;
const img = (id: string) => `/images/bones/${id}.jpg`;

export const bones: BoneInfo[] = [
  // ── Skull ────────────────────────────────────────────────────────────────
  {
    id: "frontal",
    name: "Frontal bone",
    latinName: "Os frontale",
    description:
      "Unpaired cranial bone forming the forehead, the roofs of the orbits and the anterior cranial fossa. It has a vertical squamous part and horizontal orbital parts, and contains the frontal sinuses.",
    function:
      "Protects the frontal lobes of the brain, forms the upper margin and roof of each orbit, and gives attachment to the temporalis muscle and galea aponeurotica.",
    image: img("frontal"),
    sourceUrl: wiki("Frontal_bone"),
  },
  {
    id: "parietal",
    name: "Parietal bone",
    latinName: "Os parietale",
    description:
      "Paired, roughly quadrilateral cranial bones that meet at the sagittal suture. They join the frontal bone at the coronal suture and the occipital bone at the lambdoid suture.",
    function:
      "Form the roof and sides of the cranial vault, protecting the parietal lobes. The inner surface is grooved by the middle meningeal vessels.",
    image: img("parietal"),
    sourceUrl: wiki("Parietal_bone"),
  },
  {
    id: "temporal",
    name: "Temporal bone",
    latinName: "Os temporale",
    description:
      "Paired bone at the side and base of the skull with squamous, petrous, tympanic and mastoid parts and the styloid process. It houses the external acoustic meatus, middle ear and inner ear.",
    function:
      "Protects the organs of hearing and balance, forms the temporomandibular joint with the mandible, and transmits cranial nerves VII and VIII and the internal carotid artery.",
    image: img("temporal"),
    sourceUrl: wiki("Temporal_bone"),
  },
  {
    id: "occipital",
    name: "Occipital bone",
    latinName: "Os occipitale",
    description:
      "Unpaired, trapezoid bone forming the back and base of the skull. It surrounds the foramen magnum and bears the occipital condyles that articulate with the atlas.",
    function:
      "Protects the occipital lobes and cerebellum, transmits the spinal cord through the foramen magnum, and forms the atlanto-occipital joints for nodding the head.",
    image: img("occipital"),
    sourceUrl: wiki("Occipital_bone"),
  },
  {
    id: "sphenoid",
    name: "Sphenoid bone",
    latinName: "Os sphenoidale",
    description:
      "Unpaired, butterfly-shaped bone in the middle of the skull base with a body, greater and lesser wings and pterygoid processes. The sella turcica on its upper surface holds the pituitary gland.",
    function:
      "Links the cranial and facial skeleton, forms part of each orbit, transmits the optic nerve and other cranial nerves, and anchors the pterygoid muscles of mastication.",
    image: img("sphenoid"),
    sourceUrl: wiki("Sphenoid_bone"),
  },
  {
    id: "ethmoid",
    name: "Ethmoid bone",
    latinName: "Os ethmoidale",
    description:
      "Light, spongy, unpaired bone between the orbits. It has the cribriform plate, the perpendicular plate of the nasal septum, and labyrinths containing the ethmoidal air cells.",
    function:
      "Forms part of the nasal cavity, nasal septum and medial orbital walls. The cribriform plate transmits the olfactory nerve fibres.",
    image: img("ethmoid"),
    sourceUrl: wiki("Ethmoid_bone"),
  },
  {
    id: "maxilla",
    name: "Maxilla",
    latinName: "Maxilla",
    description:
      "Paired bones that fuse in the midline to form the upper jaw. Each contains the large maxillary sinus and carries the upper teeth in its alveolar process.",
    function:
      "Holds the upper teeth, forms most of the hard palate, the floor of the orbit and the lateral walls of the nasal cavity.",
    image: img("maxilla"),
    sourceUrl: wiki("Maxilla"),
  },
  {
    id: "mandible",
    name: "Mandible",
    latinName: "Mandibula",
    description:
      "The lower jaw: the largest and strongest facial bone and the only movable bone of the skull. It has a horseshoe-shaped body and two rami ending in the condylar and coronoid processes.",
    function:
      "Holds the lower teeth and moves at the temporomandibular joints for chewing and speech. It gives attachment to the muscles of mastication.",
    image: img("mandible"),
    sourceUrl: wiki("Mandible"),
  },
  {
    id: "zygomatic",
    name: "Zygomatic bone",
    latinName: "Os zygomaticum",
    description:
      "Paired cheekbone that joins the maxilla, frontal, sphenoid and temporal bones. Its temporal process forms the zygomatic arch together with the temporal bone.",
    function:
      "Forms the prominence of the cheek and the lateral wall and floor of the orbit. It is the origin of the masseter and zygomaticus muscles.",
    image: img("zygomatic"),
    sourceUrl: wiki("Zygomatic_bone"),
  },
  {
    id: "nasal",
    name: "Nasal bone",
    latinName: "Os nasale",
    description:
      "Two small oblong bones that meet in the midline to form the bridge of the nose.",
    function:
      "Support the upper part of the external nose and protect the nasal cavity. It is the most commonly fractured facial bone.",
    image: img("nasal"),
    sourceUrl: wiki("Nasal_bone"),
  },
  {
    id: "lacrimal",
    name: "Lacrimal bone",
    latinName: "Os lacrimale",
    description:
      "The smallest and most fragile facial bones, located in the anterior part of the medial wall of each orbit.",
    function:
      "Forms part of the fossa for the lacrimal sac and the nasolacrimal canal, which drains tears into the nasal cavity.",
    image: img("lacrimal"),
    sourceUrl: wiki("Lacrimal_bone"),
  },
  {
    id: "palatine",
    name: "Palatine bone",
    latinName: "Os palatinum",
    description:
      "Paired L-shaped bones at the back of the nasal cavity, each with a horizontal and a perpendicular plate.",
    function:
      "Form the posterior hard palate and parts of the nasal cavity floor, lateral nasal wall and orbital floor.",
    image: img("palatine"),
    sourceUrl: wiki("Palatine_bone"),
  },
  {
    id: "vomer",
    name: "Vomer",
    latinName: "Vomer",
    description:
      "Thin, unpaired, trapezoid bone in the midline of the nasal cavity, articulating with the sphenoid, ethmoid, maxillae and palatine bones.",
    function: "Forms the posterior and inferior part of the bony nasal septum.",
    image: img("vomer"),
    sourceUrl: wiki("Vomer"),
  },
  {
    id: "inferior-nasal-concha",
    name: "Inferior nasal concha",
    latinName: "Concha nasalis inferior",
    description:
      "Paired scroll-shaped bones on the lateral walls of the nasal cavity. Unlike the superior and middle conchae, they are separate bones, not parts of the ethmoid.",
    function:
      "Increase the surface area of the nasal mucosa to warm, humidify and filter inspired air. The nasolacrimal duct opens beneath each one.",
    image: img("inferior-nasal-concha"),
    sourceUrl: wiki("Inferior_nasal_concha"),
  },
  {
    id: "teeth",
    name: "Teeth",
    latinName: "Dentes",
    description:
      "The permanent dentition has 32 teeth: in each quadrant 2 incisors, 1 canine, 2 premolars and 3 molars. Teeth are not bones; they are made of enamel, dentin and cementum around a pulp cavity.",
    function:
      "Incisors cut, canines tear, and premolars and molars grind food. Teeth also help with articulation of speech.",
    image: img("teeth"),
    sourceUrl: wiki("Human_tooth"),
  },

  // ── Vertebral column ─────────────────────────────────────────────────────
  {
    id: "atlas",
    name: "Atlas (C1)",
    latinName: "Atlas",
    description:
      "The first cervical vertebra. It has no vertebral body or spinous process and is a ring of anterior and posterior arches joined by two lateral masses.",
    function:
      "Supports the skull at the atlanto-occipital joints, allowing flexion and extension of the head (nodding).",
    image: img("atlas"),
    sourceUrl: wiki("Atlas_(anatomy)"),
  },
  {
    id: "axis",
    name: "Axis (C2)",
    latinName: "Axis",
    description:
      "The second cervical vertebra, recognised by the dens (odontoid process) that projects upward into the ring of the atlas.",
    function:
      "Acts as the pivot of the atlanto-axial joint, which provides about half of the rotation of the head.",
    image: img("axis"),
    sourceUrl: wiki("Axis_(anatomy)"),
  },
  {
    id: "cervical-vertebrae",
    name: "Cervical vertebrae (C3–C7)",
    latinName: "Vertebrae cervicales",
    description:
      "Small vertebrae of the neck with transverse foramina for the vertebral arteries and, from C3 to C6, bifid spinous processes. C7 (vertebra prominens) has a long, easily felt spinous process.",
    function:
      "Support the head and give the neck its wide range of motion while protecting the cervical spinal cord.",
    image: img("cervical-vertebrae"),
    sourceUrl: wiki("Cervical_vertebrae"),
  },
  {
    id: "thoracic-vertebrae",
    name: "Thoracic vertebrae (T1–T12)",
    latinName: "Vertebrae thoracicae",
    description:
      "Twelve vertebrae of intermediate size with heart-shaped bodies, long downward-sloping spinous processes and costal facets for the ribs.",
    function:
      "Articulate with the ribs to form the posterior thoracic wall, protect the thoracic spinal cord, and limit flexion and extension.",
    image: img("thoracic-vertebrae"),
    sourceUrl: wiki("Thoracic_vertebrae"),
  },
  {
    id: "lumbar-vertebrae",
    name: "Lumbar vertebrae (L1–L5)",
    latinName: "Vertebrae lumbales",
    description:
      "The five largest movable vertebrae, with massive kidney-shaped bodies and short, thick, horizontal spinous processes.",
    function:
      "Carry the weight of the upper body, allow flexion and extension of the trunk, and protect the cauda equina below about L1–L2.",
    image: img("lumbar-vertebrae"),
    sourceUrl: wiki("Lumbar_vertebrae"),
  },
  {
    id: "sacrum",
    name: "Sacrum",
    latinName: "Os sacrum",
    description:
      "Triangular bone formed by the fusion of five sacral vertebrae (S1–S5), wedged between the two hip bones. It has four pairs of sacral foramina.",
    function:
      "Transfers body weight from the spine to the pelvis through the sacroiliac joints and forms the posterior wall of the pelvic cavity.",
    image: img("sacrum"),
    sourceUrl: wiki("Sacrum"),
  },
  {
    id: "coccyx",
    name: "Coccyx",
    latinName: "Os coccygis",
    description:
      "The tailbone: a small triangular bone of 3–5 fused rudimentary vertebrae at the inferior end of the vertebral column.",
    function:
      "Attachment point for the gluteus maximus, the pelvic floor muscles and the anococcygeal ligament. It bears weight when sitting and leaning back.",
    image: img("coccyx"),
    sourceUrl: wiki("Coccyx"),
  },

  // ── Thorax ───────────────────────────────────────────────────────────────
  {
    id: "sternum",
    name: "Sternum",
    latinName: "Sternum",
    description:
      "Flat bone in the anterior midline of the chest made of the manubrium, the body and the xiphoid process. The sternal angle at the manubriosternal joint marks the level of the 2nd costal cartilage.",
    function:
      "Anchors the clavicles and the costal cartilages of the upper ribs, protects the heart and great vessels, and is a common site for bone marrow biopsy.",
    image: img("sternum"),
    sourceUrl: wiki("Sternum"),
  },
  {
    id: "ribs",
    name: "Ribs",
    latinName: "Costae",
    description:
      "Twelve pairs of curved flat bones. Ribs 1–7 are true ribs (directly attached to the sternum), 8–10 are false ribs, and 11–12 are floating ribs.",
    function:
      "Form the thoracic cage that protects the heart and lungs, and move with each breath to change thoracic volume.",
    image: img("ribs"),
    sourceUrl: wiki("Rib"),
  },
  {
    id: "costal-cartilages",
    name: "Costal cartilages",
    latinName: "Cartilagines costales",
    description:
      "Bars of hyaline cartilage that continue the anterior ends of ribs 1–10. Cartilages 8–10 join the cartilage above to form the costal margin.",
    function:
      "Connect the ribs to the sternum and make the thoracic wall elastic, which is essential for breathing.",
    image: img("costal-cartilages"),
    sourceUrl: wiki("Costal_cartilage"),
  },

  // ── Upper limb ───────────────────────────────────────────────────────────
  {
    id: "clavicle",
    name: "Clavicle",
    latinName: "Clavicula",
    description:
      "S-shaped long bone lying horizontally between the sternum and the acromion of the scapula. It is the first bone to ossify and one of the most frequently fractured.",
    function:
      "Acts as a strut that holds the upper limb away from the trunk, transmits forces from the arm to the axial skeleton, and protects the subclavian vessels.",
    image: img("clavicle"),
    sourceUrl: wiki("Clavicle"),
  },
  {
    id: "scapula",
    name: "Scapula",
    latinName: "Scapula",
    description:
      "Flat triangular bone on the posterior thoracic wall (ribs 2–7) with a spine, acromion, coracoid process and the shallow glenoid cavity.",
    function:
      "Forms the shoulder joint with the humerus and gives attachment to 17 muscles, including the rotator cuff.",
    image: img("scapula"),
    sourceUrl: wiki("Scapula"),
  },
  {
    id: "humerus",
    name: "Humerus",
    latinName: "Humerus",
    description:
      "Long bone of the arm with a head, anatomical and surgical necks, greater and lesser tubercles, and a distal trochlea and capitulum. The radial nerve runs in a groove on the shaft.",
    function:
      "Links the shoulder and elbow joints and is the lever for many arm movements. Surgical neck and mid-shaft fractures can injure the axillary and radial nerves.",
    image: img("humerus"),
    sourceUrl: wiki("Humerus"),
  },
  {
    id: "radius",
    name: "Radius",
    latinName: "Radius",
    description:
      "Lateral (thumb-side) bone of the forearm. It is narrow at the elbow and wide at the wrist, ending in the radial styloid process.",
    function:
      "Rotates around the ulna for pronation and supination and carries most of the load from the hand. A distal radius (Colles) fracture is very common.",
    image: img("radius"),
    sourceUrl: wiki("Radius_(bone)"),
  },
  {
    id: "ulna",
    name: "Ulna",
    latinName: "Ulna",
    description:
      "Medial (little-finger side) bone of the forearm. Its proximal end has the olecranon and the trochlear notch, which grips the trochlea of the humerus.",
    function:
      "Forms the hinge of the elbow joint and is the stable axis around which the radius rotates.",
    image: img("ulna"),
    sourceUrl: wiki("Ulna"),
  },

  // ── Hand ─────────────────────────────────────────────────────────────────
  {
    id: "carpals",
    name: "Carpal bones",
    latinName: "Ossa carpi",
    description:
      "Eight short bones of the wrist in two rows. Proximal: scaphoid, lunate, triquetrum, pisiform. Distal: trapezium, trapezoid, capitate, hamate.",
    function:
      "Make the wrist flexible and form the floor of the carpal tunnel. The scaphoid is the most often fractured carpal bone and is at risk of avascular necrosis.",
    image: img("carpals"),
    sourceUrl: wiki("Carpal_bones"),
  },
  {
    id: "metacarpals",
    name: "Metacarpal bones",
    latinName: "Ossa metacarpi",
    description:
      "Five long bones of the palm, numbered I (thumb) to V (little finger), each with a base, shaft and head (the knuckle).",
    function:
      "Form the skeleton of the palm and connect the wrist to the fingers. The saddle joint at the base of metacarpal I allows the thumb to oppose the other fingers.",
    image: img("metacarpals"),
    sourceUrl: wiki("Metacarpal_bones"),
  },
  {
    id: "hand-phalanges",
    name: "Phalanges of the hand",
    latinName: "Phalanges manus",
    description:
      "Fourteen finger bones: proximal, middle and distal phalanges in fingers 2–5, and only proximal and distal phalanges in the thumb.",
    function: "Make the fingers able to grip precisely and with force, and to do fine manipulation.",
    image: img("hand-phalanges"),
    sourceUrl: wiki("Phalanx_bone"),
  },

  // ── Pelvis ───────────────────────────────────────────────────────────────
  {
    id: "hip-bone",
    name: "Hip bone",
    latinName: "Os coxae",
    description:
      "Large flat bone formed by the fusion of the ilium, ischium and pubis at the acetabulum. The two hip bones and the sacrum form the bony pelvis.",
    function:
      "Transmits body weight to the lower limbs, forms the hip joint with the femur, protects pelvic organs and anchors trunk and thigh muscles.",
    image: img("hip-bone"),
    sourceUrl: wiki("Hip_bone"),
  },

  // ── Lower limb ───────────────────────────────────────────────────────────
  {
    id: "femur",
    name: "Femur",
    latinName: "Femur",
    description:
      "The longest and strongest bone in the body. The proximal femur has the head, neck and greater and lesser trochanters. The distal end has medial and lateral condyles.",
    function:
      "Carries body weight from the hip to the knee. Femoral neck fractures are common in elderly people with osteoporosis.",
    image: img("femur"),
    sourceUrl: wiki("Femur"),
  },
  {
    id: "patella",
    name: "Patella",
    latinName: "Patella",
    description:
      "The kneecap: a triangular sesamoid bone (the largest in the body) inside the quadriceps tendon, in front of the knee joint.",
    function:
      "Increases the leverage of the quadriceps for knee extension and protects the front of the knee joint.",
    image: img("patella"),
    sourceUrl: wiki("Patella"),
  },
  {
    id: "tibia",
    name: "Tibia",
    latinName: "Tibia",
    description:
      "The shinbone: the larger, medial bone of the leg. It has a flat tibial plateau proximally and the medial malleolus distally. Its anterior border lies just under the skin.",
    function:
      "Carries body weight from the knee to the ankle and forms parts of both the knee and ankle joints.",
    image: img("tibia"),
    sourceUrl: wiki("Tibia"),
  },
  {
    id: "fibula",
    name: "Fibula",
    latinName: "Fibula",
    description:
      "Slender lateral bone of the leg, joined to the tibia by the interosseous membrane. Its distal end forms the lateral malleolus.",
    function:
      "Carries little weight but stabilises the ankle joint and is an attachment for leg muscles. The common fibular nerve winds around its neck.",
    image: img("fibula"),
    sourceUrl: wiki("Fibula"),
  },

  // ── Foot ─────────────────────────────────────────────────────────────────
  {
    id: "tarsals",
    name: "Tarsal bones",
    latinName: "Ossa tarsi",
    description:
      "Seven bones of the hindfoot and midfoot: talus, calcaneus, navicular, cuboid and the medial, intermediate and lateral cuneiforms.",
    function:
      "The talus carries body weight from the tibia, the calcaneus forms the heel, and together they shape the arches of the foot.",
    image: img("tarsals"),
    sourceUrl: wiki("Tarsus_(skeleton)"),
  },
  {
    id: "metatarsals",
    name: "Metatarsal bones",
    latinName: "Ossa metatarsi",
    description:
      "Five long bones of the forefoot, numbered I (big toe) to V. Metatarsal I is the shortest and thickest.",
    function:
      "Form the arches of the foot and bear weight while standing and pushing off. Stress fractures of the metatarsals are common in runners.",
    image: img("metatarsals"),
    sourceUrl: wiki("Metatarsal_bones"),
  },
  {
    id: "foot-phalanges",
    name: "Phalanges of the foot",
    latinName: "Phalanges pedis",
    description:
      "Fourteen toe bones: three in each lesser toe and two (proximal and distal) in the big toe (hallux).",
    function: "Help balance and push-off during walking. The big toe carries the most load.",
    image: img("foot-phalanges"),
    sourceUrl: wiki("Phalanx_bone"),
  },
  {
    id: "sesamoid-bones",
    name: "Sesamoid bones",
    latinName: "Ossa sesamoidea",
    description:
      "Small bones embedded in tendons, usually near the thumb's metacarpophalangeal joint and under the head of the first metatarsal. The patella is the largest sesamoid bone.",
    function:
      "Protect tendons from wear and change their angle of pull, which increases the mechanical advantage of the muscle.",
    image: img("sesamoid-bones"),
    sourceUrl: wiki("Sesamoid_bone"),
  },
];

export const boneRegions: Record<string, BoneRegion> = {
  frontal: "skull",
  parietal: "skull",
  temporal: "skull",
  occipital: "skull",
  sphenoid: "skull",
  ethmoid: "skull",
  maxilla: "skull",
  mandible: "skull",
  zygomatic: "skull",
  nasal: "skull",
  lacrimal: "skull",
  palatine: "skull",
  vomer: "skull",
  "inferior-nasal-concha": "skull",
  teeth: "skull",
  atlas: "spine",
  axis: "spine",
  "cervical-vertebrae": "spine",
  "thoracic-vertebrae": "spine",
  "lumbar-vertebrae": "spine",
  sacrum: "spine",
  coccyx: "spine",
  sternum: "thorax",
  ribs: "thorax",
  "costal-cartilages": "thorax",
  clavicle: "upperLimb",
  scapula: "upperLimb",
  humerus: "upperLimb",
  radius: "upperLimb",
  ulna: "upperLimb",
  carpals: "hand",
  metacarpals: "hand",
  "hand-phalanges": "hand",
  "hip-bone": "pelvis",
  femur: "lowerLimb",
  patella: "lowerLimb",
  tibia: "lowerLimb",
  fibula: "lowerLimb",
  tarsals: "foot",
  metatarsals: "foot",
  "foot-phalanges": "foot",
  "sesamoid-bones": "foot",
};

// ── Mesh → bone mapping ─────────────────────────────────────────────────────
// Each mesh name is normalised before matching: lower-cased, "_" turned into
// spaces, and a trailing side marker (" l" / " r") removed. The first rule
// that matches wins, so put specific rules before general ones.

export type MeshMapping = { pattern: RegExp; boneId: string };

export const meshMappings: MeshMapping[] = [
  { pattern: /^frontal bone/, boneId: "frontal" },
  { pattern: /^parietal bone/, boneId: "parietal" },
  { pattern: /^temporal bone/, boneId: "temporal" },
  { pattern: /^occipital bone/, boneId: "occipital" },
  { pattern: /^sphenoid/, boneId: "sphenoid" },
  { pattern: /^ethmoid/, boneId: "ethmoid" },
  { pattern: /^maxilla/, boneId: "maxilla" },
  { pattern: /^mandible/, boneId: "mandible" },
  { pattern: /^zygomatic/, boneId: "zygomatic" },
  { pattern: /^nasal bone/, boneId: "nasal" },
  { pattern: /^lacrimal/, boneId: "lacrimal" },
  { pattern: /^palatine/, boneId: "palatine" },
  { pattern: /^vomer/, boneId: "vomer" },
  { pattern: /^inferior nasal concha/, boneId: "inferior-nasal-concha" },
  { pattern: /(incisor|canine|premolar|molar)/, boneId: "teeth" },
  { pattern: /^atlas/, boneId: "atlas" },
  { pattern: /^axis/, boneId: "axis" },
  { pattern: /^cervical vertebra/, boneId: "cervical-vertebrae" },
  { pattern: /^thoracic vertebra/, boneId: "thoracic-vertebrae" },
  { pattern: /^lumbar vertebra/, boneId: "lumbar-vertebrae" },
  { pattern: /^sacrum/, boneId: "sacrum" },
  { pattern: /^coccyx/, boneId: "coccyx" },
  { pattern: /sternum/, boneId: "sternum" },
  { pattern: /^costal cart/, boneId: "costal-cartilages" },
  { pattern: /^rib\b/, boneId: "ribs" },
  { pattern: /^clavicle/, boneId: "clavicle" },
  { pattern: /^scapula/, boneId: "scapula" },
  { pattern: /^humerus/, boneId: "humerus" },
  { pattern: /^radius/, boneId: "radius" },
  { pattern: /^ulna/, boneId: "ulna" },
  {
    pattern: /^(scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate)/,
    boneId: "carpals",
  },
  { pattern: /metacarpal/, boneId: "metacarpals" },
  { pattern: /sesamoid/, boneId: "sesamoid-bones" },
  { pattern: /phalanx .*of foot/, boneId: "foot-phalanges" },
  { pattern: /phalanx/, boneId: "hand-phalanges" },
  { pattern: /^hip bone/, boneId: "hip-bone" },
  { pattern: /^femur/, boneId: "femur" },
  { pattern: /^patella/, boneId: "patella" },
  { pattern: /^tibia/, boneId: "tibia" },
  { pattern: /^fibula/, boneId: "fibula" },
  { pattern: /^(talus|calcaneus|navicular|cuboid|.*cuneiform)/, boneId: "tarsals" },
  { pattern: /metatarsal/, boneId: "metatarsals" },
];

export type Side = "left" | "right";

const SIDE_SUFFIX = /\s([lr])$/;

export function normalizeMeshName(meshName: string): string {
  return meshName.replace(/_/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

export function sideFromMeshName(meshName: string): Side | undefined {
  const match = normalizeMeshName(meshName).match(SIDE_SUFFIX);
  if (!match) return undefined;
  return match[1] === "l" ? "left" : "right";
}

export function boneIdForMesh(meshName: string): string | undefined {
  const name = normalizeMeshName(meshName).replace(SIDE_SUFFIX, "");
  return meshMappings.find((m) => m.pattern.test(name))?.boneId;
}

const bonesById = new Map(bones.map((b) => [b.id, b]));

export function getBone(id: string): BoneInfo | undefined {
  return bonesById.get(id);
}

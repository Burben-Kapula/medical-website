# MedAnatomy 3D — Interactive Human Skeleton

An interactive 3D osteology atlas for medical students. Rotate, zoom and pan a full human skeleton, hover any bone to see its name, and click it for the Latin name, a concise description, its function, an illustration and a reference link. A built-in quiz highlights bones on the model so you can test yourself.

**Features**

- 42 selectable bones and bone groups, with left and right sides kept separate
- English and Latin names, descriptions and functions written for medical students
- Interface in 7 languages (English, Suomi, Українська, Svenska, Deutsch, فارسی, العربية), with the original translated bone texts
- Search by English, Latin or translated name (press `/` or `Ctrl+K`)
- **Isolate** mode fades every other bone so deep bones (sphenoid, ethmoid, vomer…) are visible
- Quiz mode: identify the highlighted bone, with distractors from the same region
- Works on desktop and mobile (on mobile the panel is a bottom sheet)

**Stack:** React · Vite · TypeScript · Three.js · @react-three/fiber · @react-three/drei · Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). `npm run build` creates a production build in `dist/`.

## Project structure

```
src/
  components/
    SkeletonViewer.tsx   3D scene: model, lights, controls, hover/click, camera focus
    BoneTooltip.tsx      label that follows the cursor
    BoneInfoPanel.tsx    side panel with bone details
    SearchBar.tsx        search with keyboard navigation
    QuizPanel.tsx        self-test quiz
    AboutDialog.tsx      credits
  data/
    bones.ts             bone information + mesh-name mapping rules
    i18n.ts              interface strings for every language
    localizedBones.ts    translated bone names and texts
  lib/skeleton.ts        groups model meshes into selectable entries
  models/skeleton.glb    the optimised 3D model
public/images/bones/     one illustration per bone (<id>.jpg)
scripts/
  prepare-model.mjs      converts/optimises a model into src/models/skeleton.glb
  render-bone-images.mjs renders the bone illustrations from the model
```

## Adding or replacing the skeleton model

1. Get the model as `.glb` or `.gltf`. For FBX, OBJ or other formats, open it in [Blender](https://www.blender.org/) and use **File → Export → glTF 2.0 (.glb)**. Keep each bone as a separate object with a descriptive name, such as `Femur.r`, `Rib (5th).r` or `Sacrum`.
2. Run the preparation script:

   ```bash
   npm run model:prepare -- path/to/your-model.glb
   ```

   With no path, it uses the newest `*skeleton*.glb` in your Downloads folder. The script:
   - renames meshes to `Name L` / `Name R` / `Name` (the app reads the side from the suffix);
   - **mirrors the right side to build the left side** if the model only has `.r` bones (the included model shipped this way);
   - welds and simplifies the geometry (`--ratio 0.5` by default) and compresses it with meshopt.

3. Regenerate the illustrations so they match the new model:

   ```bash
   npm run images:render
   ```

4. Start the dev server. Open the browser console: any mesh that does not match a mapping rule is listed in a `[skeleton]` warning. Unmapped meshes stay visible and clickable and show a short "unlabelled structure" note.

## Adding a new bone

Add an entry to `bones` in `src/data/bones.ts`:

```ts
{
  id: "hyoid",
  name: "Hyoid bone",
  latinName: "Os hyoideum",
  description: "U-shaped bone in the anterior neck…",
  function: "Anchors the tongue and the muscles of the floor of the mouth…",
  image: img("hyoid"),               // → /images/bones/hyoid.jpg
  sourceUrl: wiki("Hyoid_bone"),
},
```

Then:

1. Give it a region in `boneRegions` (`hyoid: "skull"`). This sets its group in search and the region chip.
2. Add a mapping rule (see below) so the 3D mesh is linked to it.
3. Run `npm run images:render -- hyoid` to create its illustration, or put your own image at `public/images/bones/hyoid.jpg`.
4. Optional: add translated names and texts under the same id in `src/data/localizedBones.ts`.

## Mapping mesh names to bone information

`meshMappings` in `src/data/bones.ts` links mesh names to bone ids:

```ts
{ pattern: /^femur/, boneId: "femur" },
{ pattern: /phalanx .*of foot/, boneId: "foot-phalanges" },
{ pattern: /phalanx/, boneId: "hand-phalanges" },
```

- Before matching, each mesh name is **lower-cased**, `_` is turned into spaces, and the side suffix (` l` / ` r`) is removed. For example, `Proximal_phalanx_of_first_finger_of_foot_R` becomes `proximal phalanx of first finger of foot`.
- **The first matching rule wins**, so put specific rules above general ones.
- Many meshes can map to one bone. They highlight and select together (for example all twelve thoracic vertebrae).
- The side (`L`/`R` suffix) is kept, so left and right bones are separate selections that share one information entry.

To see the mesh names in a model, add a temporary `console.log(mesh.name)` in `buildSkeletonIndex` (`src/lib/skeleton.ts`), or check the `[skeleton]` warning for unmapped names.

## Credits

Created by **Maksym Kapula**, **Maryna Kapula** and **Amaliia Paasonen**.
Contact: maksym.kapula@gmail.com

- 3D skeleton model: open3dmodel.com ("overview-skeleton")
- Bone information: Wikipedia and the original MedAnatomy 3D translations

> 🇫🇮 Sivusto on kehitetty kolmen hengen tiiminä. Sen tarkoitus on tarjota mahdollisuus tutustua ihmisen luihin: näet niiden nimet ja opit niiden latinankieliset vastineet.
>
> 🇺🇦 Сайт створений командою з трьох осіб. Його мета — надати можливість ознайомитися з кістками людини: побачити їхні назви та дізнатися латинські відповідники.

For educational use only. Not a substitute for professional medical advice.

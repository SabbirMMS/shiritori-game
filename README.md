[Live URL]()

### 1. Create Project

```bash
npm create-next-app shiritori-game
cd shiritori-game
npm install axios
```

---

### 2. Setup API Route (backend)

* Create `/pages/api/validate.js`

```js
import axios from "axios";

export default async function handler(req, res) {
  const { word } = req.body;
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    res.status(200).json({ valid: true, data: response.data });
  } catch {
    res.status(200).json({ valid: false });
  }
}
```

---

### 3. Frontend Game Page

* Create `/pages/Game.jsx`
* Implement:

  * Two players turn system
  * Input field
  * Call `/api/validate` for word validation
  * Rules: word starts with last letter, not repeated, min 4 chars
  * Countdown with `setTimeout`
  * Score tracking in state
  * Show word history

---

### 4. Core Logic (simplified)

```js
const [turn, setTurn] = useState(1);
const [words, setWords] = useState([]);
const [scores, setScores] = useState({ p1: 0, p2: 0 });
```

* On submit:

  * Validate word (API + rules)
  * Update scores
  * Update word history
  * Switch turn

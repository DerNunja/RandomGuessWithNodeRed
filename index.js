const express = require("express");
const app = express();
app.use(express.json());

// Geheime Zahl (1..100) im Speicher halten
let secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
console.log(secret);

function resetSecret() {
  secret = Math.floor(Math.random() * 100) + 1;
  console.log(secret)
  attempts = 0;
}

app.get("/game/:guess", (req, res) => {
  const guess = Number(req.params.guess);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    return res.status(400).json({ error: "Guess must be an integer 1..100" });
  }

  attempts += 1;

  if (guess < secret) return res.json({ result: "low", attempts });
  if (guess > secret) return res.json({ result: "high", attempts });

  // correct
  const correct = secret;
  const used = attempts;
  resetSecret();
  return res.json({
    result: "correct",
    message: `Richtig! (${correct}) Neue Zahl gewählt.`,
    attempts: used,
    newRound: true
  });
});

// optional: Health-Check
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(8000, () => console.log("Guess API running on http://localhost:8000"));
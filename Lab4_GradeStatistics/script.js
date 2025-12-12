const mathInput = document.getElementById("mathInput");
const englishInput = document.getElementById("englishInput");
const submitBtn = document.getElementById("submitBtn");

const tbody = document.getElementById("tbody");
const msg = document.getElementById("msg");

const mathAvgEl = document.getElementById("mathAvg");
const englishAvgEl = document.getElementById("englishAvg");
const overallAvgEl = document.getElementById("overallAvg");

let rowCount = 0;

function isValidNumber(value) {
  // accept numbers only; disallow empty, NaN
  return value !== "" && !Number.isNaN(Number(value));
}

function clearMessage() {
  msg.textContent = "";
}

function showMessage(text) {
  msg.textContent = text;
}

function to2(n) {
  return Number(n).toFixed(2);
}

function updateColumnAverages() {
  const rows = Array.from(tbody.querySelectorAll("tr"));
  if (rows.length === 0) {
    mathAvgEl.textContent = "--";
    englishAvgEl.textContent = "--";
    overallAvgEl.textContent = "--";
    return;
  }

  let mathSum = 0;
  let engSum = 0;
  let avgSum = 0;

  rows.forEach((tr) => {
    // cells: [#, math, english, avg]
    const tds = tr.querySelectorAll("td");
    const m = Number(tds[1].textContent);
    const e = Number(tds[2].textContent);
    const a = Number(tds[3].textContent);

    mathSum += m;
    engSum += e;
    avgSum += a;
  });

  const n = rows.length;
  mathAvgEl.textContent = to2(mathSum / n);
  englishAvgEl.textContent = to2(engSum / n);
  overallAvgEl.textContent = to2(avgSum / n);
}

submitBtn.addEventListener("click", function () {
  clearMessage();

  const mathVal = mathInput.value.trim();
  const englishVal = englishInput.value.trim();

  if (!isValidNumber(mathVal) || !isValidNumber(englishVal)) {
    showMessage("Please enter valid numbers for Math and English.");
    return;
  }

  const math = Number(mathVal);
  const english = Number(englishVal);

  // Optional: enforce 0~100 (input already has min/max, but JS double-check)
  if (math < 0 || math > 100 || english < 0 || english > 100) {
    showMessage("Scores must be between 0 and 100.");
    return;
  }

  rowCount += 1;

  const avg = (math + english) / 2;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${rowCount}</td>
    <td>${math}</td>
    <td>${english}</td>
    <td>${to2(avg)}</td>
  `;
  tbody.appendChild(tr);

  updateColumnAverages();

  // reset inputs
  mathInput.value = "";
  englishInput.value = "";
  mathInput.focus();
});
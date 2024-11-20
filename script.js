let matrixA = [];
let matrixB = [];

function generateMatrix(matrix) {
  const rows = parseInt(
    document.getElementById(`${matrix.toLowerCase()}-rows`).value
  );
  const cols = parseInt(
    document.getElementById(`${matrix.toLowerCase()}-cols`).value
  );

  if (isNaN(rows) || isNaN(cols)) {
    alert("Jumlah baris dan kolom harus diisi.");
    return;
  }

  const container = document.getElementById(
    `matrix-${matrix.toLowerCase()}-inputs`
  );
  container.innerHTML = `<h3>Input Matriks ${matrix}:</h3>`;
  const inputs = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(
        `<input type="number" id="${matrix}-${i}-${j}" style="width: 50px; margin: 2px;">`
      );
    }
    inputs.push(`<div>${row.join("")}</div>`);
  }
  container.innerHTML += inputs.join("");
  if (matrix === "A")
    matrixA = Array(rows)
      .fill()
      .map(() => Array(cols).fill(0));
  if (matrix === "B")
    matrixB = Array(rows)
      .fill()
      .map(() => Array(cols).fill(0));
}

function performOperation() {
  const operation = document.getElementById("operation").value;

  // Update matrices from inputs
  updateMatrix("A", matrixA);
  updateMatrix("B", matrixB);

  if (operation === "determinant") {
    const targetMatrix = prompt("Pilih matriks (A atau B):").toUpperCase();
    if (targetMatrix !== "A" && targetMatrix !== "B") {
      alert("Pilihan salah.");
      return;
    }
    const matrix = targetMatrix === "A" ? matrixA : matrixB;
    if (matrix.length === 2 && matrix[0].length === 2) {
      const determinant =
        matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
      document.getElementById(
        "result"
      ).innerText = `Determinan Matriks ${targetMatrix}: ${determinant}`;
    } else {
      alert("Hanya mendukung determinan matriks 2x2.");
    }
    return;
  }

  // Other operations (addition, subtraction, multiplication)
  if (operation === "addition" || operation === "subtraction") {
    if (
      matrixA.length !== matrixB.length ||
      matrixA[0].length !== matrixB[0].length
    ) {
      alert("Dimensi matriks harus sama.");
      return;
    }
    const result = matrixA.map((row, i) =>
      row.map((val, j) =>
        operation === "addition" ? val + matrixB[i][j] : val - matrixB[i][j]
      )
    );
    displayResult(
      result,
      operation === "addition" ? "Penjumlahan" : "Pengurangan"
    );
  } else if (operation === "multiplication") {
    if (matrixA[0].length !== matrixB.length) {
      alert("Jumlah kolom Matriks A harus sama dengan jumlah baris Matriks B.");
      return;
    }
    const result = Array(matrixA.length)
      .fill()
      .map(() => Array(matrixB[0].length).fill(0));
    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < matrixB[0].length; j++) {
        for (let k = 0; k < matrixA[0].length; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    displayResult(result, "Perkalian");
  }
}

function updateMatrix(matrix, storage) {
  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage[i].length; j++) {
      storage[i][j] =
        parseInt(document.getElementById(`${matrix}-${i}-${j}`).value) || 0;
    }
  }
}

function displayResult(result, operation) {
  document.getElementById("result").innerText =
    `${operation} Matriks:\n` + result.map((row) => row.join(" ")).join("\n");
}

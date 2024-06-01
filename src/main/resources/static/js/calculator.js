document.addEventListener('input', updatePercentages);

function addRow() {
    const table = document.getElementById('activities-table');
    const rowCount = table.rows.length + 1;
    const row = table.insertRow();
    row.innerHTML = `
        <td>Activity ${rowCount}</td>
        <td>A${rowCount}</td>
        <td><input type="text" name="weight" class="weight"></td>
        <td>
            <input type="text" name="grade-obtained" class="grade-input"> / 
            <input type="text" name="grade-total" class="grade-input">
        </td>
        <td class="percent">0%</td>
    `;
}

function updatePercentages() {
    const rows = document.getElementById('activities-table').rows;
    for (const row of rows) {
        const gradeObtained = row.querySelector('input[name="grade-obtained"]').value;
        const gradeTotal = row.querySelector('input[name="grade-total"]').value;
        const percentCell = row.querySelector('.percent');
        if (gradeObtained && gradeTotal) {
            const percent = (parseFloat(gradeObtained) / parseFloat(gradeTotal)) * 100;
            percentCell.textContent = `${percent.toFixed(2)}%`;
        } else {
            percentCell.textContent = '0%';
        }
    }
}

function calculateMean() {
    const rows = document.getElementById('activities-table').rows;
    let totalPercent = 0;
    let count = 0;

    for (const row of rows) {
        const gradeObtained = row.querySelector('input[name="grade-obtained"]').value;
        const gradeTotal = row.querySelector('input[name="grade-total"]').value;
        if (gradeObtained && gradeTotal) {
            totalPercent += parseFloat(gradeObtained) / parseFloat(gradeTotal);
            count++;
        }
    }

    if (count > 0) {
        const mean = (totalPercent / count) * 100;
        document.getElementById('result-output').textContent = `Mean: ${mean.toFixed(2)}%`;
    } else {
        document.getElementById('result-output').textContent = 'Mean: 0%';
    }
}

function calculateWeighted() {
    const rows = document.getElementById('activities-table').rows;
    let totalWeight = 0;
    let weightedSum = 0;

    for (const row of rows) {
        const weight = row.querySelector('input[name="weight"]').value;
        const gradeObtained = row.querySelector('input[name="grade-obtained"]').value;
        const gradeTotal = row.querySelector('input[name="grade-total"]').value;
        if (weight && gradeObtained && gradeTotal) {
            const weightValue = parseFloat(weight);
            const gradePercent = parseFloat(gradeObtained) / parseFloat(gradeTotal);
            weightedSum += gradePercent * weightValue;
            totalWeight += weightValue;
        }
    }

    if (totalWeight > 0) {
        const weightedMean = (weightedSum / totalWeight) * 100;
        document.getElementById('result-output').textContent = `Weighted: ${weightedMean.toFixed(2)}%`;
    } else {
        document.getElementById('result-output').textContent = 'Weighted: 0%';
    }
}

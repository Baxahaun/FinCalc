document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('investment-form');
    const resultsDiv = document.getElementById('results');
    const growthChartCanvas = document.getElementById('growthChart');
    let growthChart;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
        const investmentTerm = parseFloat(document.getElementById('investment-term').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value);
        const frequency = parseInt(document.getElementById('frequency').value, 10);

        const results = calculateGrowth(initialInvestment, monthlyContribution, investmentTerm, interestRate, frequency);

        displayResults(results, resultsDiv);

        if (growthChart) growthChart.destroy();

        growthChart = new Chart(growthChartCanvas, {
            type: 'line',
            data: {
                labels: results.map((r) => `Periodo ${r.periodo}`),
                datasets: [{
                    label: 'Crecimiento del Capital',
                    data: results.map((r) => r.capital),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                }],
            },
        });
    });
});

function calculateGrowth(initial, monthly, years, rate, freq) {
    const results = [];
    let capital = initial;
    const monthlyRate = (rate / 100) / freq;

    for (let i = 1; i <= years * freq; i++) {
        capital += monthly;
        capital += capital * monthlyRate;
        results.push({ periodo: i, capital: parseFloat(capital.toFixed(2)) });
    }
    return results;
}

function displayResults(results, container) {
    container.innerHTML = results.map(r => `Periodo ${r.periodo}: ${r.capital}`).join('<br>');
}

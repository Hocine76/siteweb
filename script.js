let trackingData = [];
let weights = [];
let dates = [];

document.getElementById('tracking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let day = document.getElementById('day').value;
    let weight = parseFloat(document.getElementById('weight').value);
    let activities = document.getElementById('activities').value;
    
    trackingData.push({ day, weight, activities });
    weights.push(weight);
    dates.push(day);
    
    updateTrackingData();
    updateChart();
    
    this.reset();
});

function updateTrackingData() {
    let trackingDataDiv = document.getElementById('tracking-data');
    trackingDataDiv.innerHTML = '';
    
    trackingData.forEach((entry, index) => {
        let newEntry = document.createElement('div');
        newEntry.className = 'track-entry';
        newEntry.innerHTML = `
            <div>
                <strong>${entry.day}</strong>: ${entry.activities} <br> Poids: ${entry.weight} kg
            </div>
            <div>
                <button onclick="editEntry(${index})">Modifier</button>
                <button onclick="deleteEntry(${index})">Supprimer</button>
            </div>
        `;
        trackingDataDiv.appendChild(newEntry);
    });
}

function editEntry(index) {
    let entry = trackingData[index];
    
    document.getElementById('day').value = entry.day;
    document.getElementById('weight').value = entry.weight;
    document.getElementById('activities').value = entry.activities;
    
    deleteEntry(index);
}

function deleteEntry(index) {
    trackingData.splice(index, 1);
    weights.splice(index, 1);
    dates.splice(index, 1);
    
    updateTrackingData();
    updateChart();
}

const ctx = document.getElementById('weightChart').getContext('2d');
const weightChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Poids (kg)',
            data: weights,
            borderColor: 'rgba(255, 204, 0, 1)',
            backgroundColor: 'rgba(255, 204, 0, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

function updateChart() {
    weightChart.data.labels = dates;
    weightChart.data.datasets[0].data = weights;
    weightChart.update();
}

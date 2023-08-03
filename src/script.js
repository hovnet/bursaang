// script.js

// Sample data for the graph
const labels = ['January', 'February', 'March', 'April', 'May'];
const data = [10, 15, 8, 12, 20];

// Create the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar', // Use 'bar' for a bar graph, or 'line' for a line graph, etc.
  data: {
    labels: labels,
    datasets: [{
      label: 'Sample Data',
      data: data,
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color of the bars
      borderColor: 'rgba(75, 192, 192, 1)', // Border color of the bars
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

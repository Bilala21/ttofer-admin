import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js/auto';

@Component({
  selector: "app-dashboard",
  templateUrl: "./index.component.html",
})
export class DashboardComponent implements OnInit {
  data = [
    { id: 1, numbers: 256, text: "8% increase from Last month", name: "Total Users", classes: "bg-dark-500 text-white", icon: "people.png" },
    { id: 2, numbers: 256, text: "8% increase from Last month", name: "Today registration", classes: "bg-dark-600 text-white", icon: "note-text.png" },
    { id: 3, numbers: 256, text: "8% increase from Last month", name: "Total Verified Users", classes: "bg-yellow-500", icon: "people-black.png" },
    { id: 4, numbers: 256, text: "8% increase from Last month", name: "Total Reports", classes: "bg-gray-500", icon: "people-black.png" }
  ];
  chart: any = [];

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('barCanvasChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Percentage',
            data: [80, 20, 30, 40, 80, 60, 70, 80, 90, 100],
            borderWidth: 1,
            backgroundColor: '#636A80',
            borderColor: '#636A80'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
              maxTicksLimit: 6
            },
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
    this.chart = new Chart('lineCanvasChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'High',
            data: [40, 90, 70, 30, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: '1',
            tension: 0.1
          },
          {
            label: 'Low',
            data: [30, 50, 40, 30, 60],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
              maxTicksLimit: 6
            },
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }
}





import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js/auto';
import { UserService } from "../../services/user.service";
import { ReportService } from "@/services/report.service";
import { firstValueFrom } from "rxjs";
import { MessageService } from "@/services/messages.service";
import { AdService } from "@/services/ad.service";
import moment from "moment";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./index.component.html",
})
export class DashboardComponent implements OnInit {
  loading = false
  data: any = []
  chart: any = [];
  latestMessages: any = []
  adsData: any = []
  isVerified: any = []

  constructor(private adService: AdService, private toastr: ToastrService, private userService: UserService, private reportService: ReportService, private messageService: MessageService) { }


  getUser = async (url: string): Promise<any> => {
    this.loading = true;
    try {
      const data: any = await firstValueFrom(this.userService.getUsers(url));
      this.loading = false;
      return data.data
    } catch (error) {
      console.error('Error:', error);
      this.loading = false;
      return null;
    }
  }


  getReports = async (url: string) => {
    this.loading = true;
    try {
      const data: any = await firstValueFrom(this.reportService.getReports(url));
      this.loading = false;
      return data.data?.total
    } catch (error) {
      console.error('Error:', error);
      this.loading = false;
      return null;
    }
  }


  getMessages = async (url: string) => {
    this.loading = true;
    try {
      const data: any = await firstValueFrom(this.messageService.getMessages(url));
      this.loading = false;
      return data.data?.data.splice(0, 3)
    } catch (error) {
      console.error('Error:', error);
      this.loading = false;
      return null;
    }
  }


  getAds = async (url: string) => {
    this.loading = true;
    try {
      const data: any = await firstValueFrom(this.adService.getAds(url));
      this.loading = false;
      return data.data?.data.splice(0, 5)
    } catch (error) {
      console.error('Error:', error);
      this.loading = false;
      return null;
    }
  }

  dateTimeFormat(date: string, format: string) {
    return dateTimeFormat(date, format);
  }

  handleStatus = async (id: number) => {
    const index = this.isVerified.indexOf(id);
    if (index > -1) {
      this.isVerified.splice(index, 1);
    } else {
      this.isVerified.push(id);
    }
    this.adService.updateStatus(1, id, "update-product-status").subscribe({
      next: (res: any) => {
        this.toastr.success(res?.msg);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Status Not Updated successfully.");
      }
    });
  }

  async ngOnInit() {
    this.loading = true;

    try {
      // Perform all API calls concurrently
      const [latestMessages, users, todayRegistration, verifiedUser, reportsCount, adsData] = await Promise.all([
        this.getMessages("latest-messages"),
        this.getUser("users"),
        this.getUser("today-registration"),
        this.getUser("verified-users"),
        this.getReports("reports"),
        this.getAds("ads"),
      ]);

      // Assign the fetched data
      this.latestMessages = latestMessages;
      this.adsData = adsData;
      console.log("users",users);
      this.data = [
        { id: 1, numbers: users.total, text: "8% increase from Last month", name: "Total Users", classes: "bg-dark-500 text-white", icon: "people.png" },
        { id: 2, numbers: todayRegistration.total, text: "8% increase from Last month", name: "Today registration", classes: "bg-dark-600 text-white", icon: "note-text.png" },
        { id: 3, numbers: verifiedUser.total, text: "8% increase from Last month", name: "Total Verified Users", classes: "bg-yellow-500", icon: "people-black.png" },
        { id: 4, numbers: reportsCount, text: "8% increase from Last month", name: "Total Reports", classes: "bg-gray-500", icon: "people-black.png" }
      ];

      this.createCharts(users);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      this.loading = false;
    }
  }

  createCharts(users: any) {
    const months: any = [];
    for (let i = 0; i < 10; i++) {
      months.push({ name: moment().month(i).format('MMM'), count: 0 });
    }

    users?.data.map((user: any) => {
      const month = moment(user.created_at).format('MMM');
      const monthData = months.find((m: any) => m.name === month);

      if (monthData) {
        monthData.count += 1;
      }
    });

    const chartData = months.map((month: any) => month.count);

    this.createBarChart(chartData);
    this.createLineChart();
  }

  createBarChart(chartData: number[]) {
    new Chart('barCanvasChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Percentage',
            data: chartData,
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
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}%`,
              maxTicksLimit: 6
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  createLineChart() {
    new Chart('lineCanvasChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'High',
            data: [40, 90, 70, 30, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.1,
            fill: '1'
          },
          {
            label: 'Low',
            data: [30, 50, 40, 30, 60],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            tension: 0.1,
            fill: false
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
              usePointStyle: true
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}%`,
              maxTicksLimit: 6
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}





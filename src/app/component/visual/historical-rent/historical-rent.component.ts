import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RentHistory } from 'src/app/model/rentHistory.model';
import { LeaseService } from 'src/app/service/lease.service';

@Component({
  selector: 'app-historical-rent',
  templateUrl: './historical-rent.component.html',
  styleUrls: ['./historical-rent.component.css'],
})
export class HistoricalRentComponent implements OnInit {
  showHistoricalRentDialog: boolean = false;
  rentData: RentHistory[];
  chartData: any;
  data: number[];
  label: number[];
  chartOption: any;

  constructor(
    private leaseService: LeaseService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.chartOption = {
      legend: {
        labels: {
          fontColor: '#495057',
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: '#495057',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: '#495057',
            },
          },
        ],
      },
    };
  }

  showDialog(unitId: number) {
    this.leaseService.getHistoricalRent(unitId).then((res) => {
      if (res.length != 0) {
        // init arrays
        this.data = [];
        this.label = [];

        res.forEach((point) => {
          this.data.push(point.rent);
          this.label.push(point.startDate);
        });

        this.chartData = {
          labels: this.label,
          datasets: [
            {
              label: 'Historical Rent',
              data: this.data,
              fill: false,
            },
          ],
        };

        this.showHistoricalRentDialog = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'No Rent History',
          detail: 'There is no rent history available',
          life: 3000,
        });
      }
    });
  }
}

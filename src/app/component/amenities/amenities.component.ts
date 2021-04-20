import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Schedule } from 'src/app/model/schedule.model';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
})
export class AmenitiesComponent implements OnInit {
  schedules: Schedule[];
  today = new Date();
  activeFilter: string = 'ALL';
  @ViewChild('dt') dt: Table;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.refreshSchedules();
  }

  refreshSchedules() {
    this.scheduleService.getSchedule().then((res) => {
      this.schedules = res;
      console.log(this.schedules);
    });
  }

  confirmSchedule(scheduleId) {
    this.scheduleService.confirmSchedule(scheduleId);
    // refresh table
    this.refreshSchedules();
  }

  doFilter(criteria: string) {
    this.activeFilter = null;
    if (criteria == 'today') {
      this.dt.filterGlobal(
        formatDate(this.today, 'yyyy-MM-dd', 'en-US'),
        'equals'
      );
      this.activeFilter = 'today';
    } else {
      this.dt.filterGlobal(criteria, 'equals');
      this.activeFilter = criteria;
    }
  }

  handleFormEmits() {
    this.refreshSchedules();
  }
}

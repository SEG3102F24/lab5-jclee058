import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { EmployeeDbService } from './firestore/employee-db.service';
import { Employee } from '../model/employee';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit{
  //protected employees: EmployeeService = inject(EmployeeService);
  employees$: Observable<Employee[]>;

  constructor(private employeeDbService: EmployeeDbService) {
    this.employees$ = this.employeeDbService.getEmployees();
  };

  ngOnInit(): void {
  }
}

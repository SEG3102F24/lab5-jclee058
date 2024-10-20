import {inject, Injectable} from '@angular/core';
import {Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  setDoc,
  deleteDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDbService {
  private firestore:  Firestore = inject(Firestore);
  private authService: EmployeeService = inject(EmployeeService);

  getEmployees(): Observable<Employee[]> {
    const employees = collection(this.firestore, 'employees');
    return collectionData(employees, {idField: 'id'}) as Observable<Employee[]>;
  }

  createAddress(employee: Employee) {
    const employees = collection(this.firestore, 'employees');
    delete employee.id;
    // @ts-ignore
    return addDoc(employees, {...employee});
  }

  updateAddress(employee: Employee) {
    const employeeId = employee.id;
    delete employee.id;
    const employees = collection(this.firestore, 'employees');
    const employeeRef = doc(employees, employeeId!);
    // @ts-ignore
    return setDoc(employeeRef, employee);
  }

  deleteAddress(employeeId: string): Promise<void> {
    const employees = collection(this.firestore, 'employees');
    const employeeRef = doc(employees, employeeId);
    return deleteDoc(employeeRef);
  }
}

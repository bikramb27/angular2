import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  formValue! : FormGroup;
  employeeModelobj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname:[''],
      lastname: [''],
      email: [''],
      address: [''],
      qualification: [''],
      experience: ['']
    })
    this.getAllEmployees;
  }
postEmployeeDetails(){
  this.employeeModelobj.firstname = this.formValue.value.firstname;
  this.employeeModelobj.lastname = this.formValue.value.lastname;
  this.employeeModelobj.email = this.formValue.value.email;
  this.employeeModelobj.address = this.formValue.value.address;
  this.employeeModelobj.qualification = this.formValue.value.qualification;
  this.employeeModelobj.experience = this.formValue.value.experience;

  this.api.postemployee(this.employeeModelobj).subscribe(res=>{
    console.log(res);
    alert("Employee added")
    let ref = document.getElementById("cancel")
    ref?.click()
    this.formValue.reset();
    this.getAllEmployees()
  },
  err=>{
    alert("Something went wrong")
  })
}
getAllEmployees(){
  this.api.getemployees().subscribe(res=>{
    this.employeeData = res;
  })
}
deleteEmployees(emp:any){
  this.api.deleteemployee(emp.firstname).subscribe(res=>{
    alert("Record Deleted");
    this.getAllEmployees()

  })
}
onEdit(emp:any){
  this.formValue.controls['firstname'].setValue(emp.firstname);
  this.formValue.controls['lastname'].setValue(emp.lastname);
  this.formValue.controls['email'].setValue(emp.email);
  this.formValue.controls['address'].setValue(emp.address);
  this.formValue.controls['qualification'].setValue(emp.qualification);
  this.formValue.controls['experience'].setValue(emp.experience)
}
}

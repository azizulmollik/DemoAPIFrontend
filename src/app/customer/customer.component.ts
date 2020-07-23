import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }  
  data: any;  
  CustomerForm: FormGroup;  
  submitted = false;   
  EventValue: any = "Save";  
  
  ngOnInit(): void {  
    this.getdata();  
  
    this.CustomerForm = new FormGroup({  
      customerId: new FormControl(0),  
      name: new FormControl("",[Validators.required]),        
      email: new FormControl("",[Validators.required]),  
      password: new FormControl("",[Validators.required]),  
    })    
  }  
  getdata() {  
    this.customerService.getData().subscribe((data: any[]) => {  
      this.data = data;  
    })  
  }  
  deleteData(id) {  
    this.customerService.deleteData(id).subscribe((data: any[]) => {  
      this.data = data;  
      this.getdata();  
    })  
  }  
  Save() {   
    this.submitted = true;  
    
     if (this.CustomerForm.invalid) {  
            return;                     
     }  
    console.log('save hit');    
    this.customerService.postData(this.CustomerForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
  
    })  
  }  
  Update() {   
    this.submitted = true;  
    
    if (this.CustomerForm.invalid) {  
     return;  
    }        
    this.customerService.putData(this.CustomerForm.value.customerId,this.CustomerForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
    })  
  }  
  
  EditData(Data) {  
    this.CustomerForm.controls["customerId"].setValue(Data.customerId);  
    this.CustomerForm.controls["name"].setValue(Data.name);      
    this.CustomerForm.controls["email"].setValue(Data.email);  
    this.CustomerForm.controls["password"].setValue(Data.password); 
    this.EventValue = "Update";  
  }  
  
  resetFrom()  
  {     
    this.getdata();  
    this.CustomerForm.reset();  
    this.EventValue = "Save";  
    this.submitted = false;   
  }  

}

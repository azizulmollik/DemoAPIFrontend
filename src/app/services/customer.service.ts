import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  } 

  url = 'http://localhost:65389/api/Customers';

  getData(){ 
    return this.http.get('/api/Customers'); 
  }  
  
  postData(formData){  
    return this.http.post('/api/Customers',formData);  
  }  
  
  putData(id,formData){  
    return this.http.put('/api/Customers/'+id,formData);  
  }

  deleteData(id){  
    return this.http.delete('/api/Customers/'+id);  
  }  
}

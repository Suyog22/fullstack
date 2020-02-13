import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 6';
  constructor(private http: HttpClient) { }
  url="http://localhost:8080/listofmobiles";

  mobileName : String;
  price: String;

  httpData:any;
  ngOnInit() {
    this.http.get<Mobile[]>(this.url).subscribe(data => {
      this.httpData=data;
    })

  }


}
interface Mobile {
  name:string;
  price:string;
}
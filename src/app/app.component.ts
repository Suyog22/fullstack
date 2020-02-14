import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  url="http://localhost:8080/listofmobiles";

  mobileName : string;
  price: string;

  myMobile : Mobile;

  httpData:any;
  ngOnInit() {
    this.http.get<Mobile[]>(this.url).subscribe(data => {
      this.httpData=data;
    })

  }

  saveMyMobile()
  {
    this.myMobile = {name:this.mobileName,price:this.price};
    this.http.post(("http://localhost:8080/savemobile"),this.myMobile).subscribe();
  }

  deleteMyMobile(id)
  {
       this.http.delete(("http://localhost:8080/delete/"+id)).subscribe();
  }


}
interface Mobile {
  name:string;
  price:string;
}
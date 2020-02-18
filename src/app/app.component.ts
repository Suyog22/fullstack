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

  getLables = [];

  getPrice = [];

  showData = false;

  addDataOnlyOnce : number = 1;

  ngOnInit() {
    this.http.get<Mobile[]>(this.url).subscribe(data => {
      this.httpData=data as [];
    });

    // for (let entry of this.httpData) {
    //   let myname :string = entry.name;
    //   this.getLables.push(myname);
    // }

    // for (let entry of this.httpData) {
    //   let myprice :string = entry.price;
    //   this.getPrice.push(myprice);
    // }

  }


  public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other','Opera'];
  public pieChartData:number[] = [40, 20, 20 , 10,5,15];
  public pieChartType:string = 'pie';
 

  saveMyMobile()
  {
    this.myMobile = {name:this.mobileName,price:this.price};
    this.http.post(("http://localhost:8080/savemobile"),this.myMobile).subscribe();
  }

  deleteMyMobile(id)
  {
       this.http.delete(("http://localhost:8080/delete/"+id)).subscribe();
  }

  showdataAtconsole()
  {
    // To avoid duplication,first data is added into set and then converted into array
      this.showData = !this.showData;
      let priceSet = new Set();
      for (let entry of this.httpData) {
          let myPrice : number = entry.price;
          priceSet.add(myPrice);
        }
      this.getPrice = Array.from(priceSet.values());


      let nameSet = new Set();
      for (let entry of this.httpData) {
          let myname :string = entry.name;
          nameSet.add(myname);
        }
        this.getLables = Array.from(nameSet.values());
  }
 
}
interface Mobile {
  name:string;
  price:string;
}
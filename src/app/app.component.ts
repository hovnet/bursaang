import {  Component, OnInit } from '@angular/core';
import { PriceService } from './price.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OptionsTickers } from './Options';
import { map } from 'rxjs/operators'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  SelectOps: OptionsTickers[] = [];
 
  chart: any;

  title = 'בורסהנט - לוי';
  Currentsymbol: any = "";
  Current_Stock_Price: number = 0;
  Latesttrade: any = null;
  selected: any = "";
  datasource: any[] = [];
  DBar:any=null;
  dated:any;
  ToDay = new Date().toLocaleDateString("heb-IL");
  Arik = new Date().toJSON().slice(0, 19);


  constructor(private service:PriceService){
  } 

  ngOnInit(): void{
    // const ToDay = new Date();
    this.SelectOps = [
      { id: 'AAPL', name: 'אפל', completed: false },
      { id: 'AMZN', name: 'אמזון', completed: false },
      { id: 'MSFT', name: 'מיקרוסופט', completed: false },
      { id: 'GOOG', name: 'גוגל', completed: false },
      { id: 'META', name: 'פייסבוק', completed: false },
      { id: 'BABA', name: 'עליבאבא', completed: false },
      { id: 'EBAY', name: 'איביי', completed: false }
    ];

  
  }

  async GetCurrentValue(){
    this.service.getCurrentprice(this.selected).subscribe(data => {
      if (data != null) {
        this.datasource.length = 0;
        this.datasource.push(data['Global Quote']);
        console.log('datasource-->', this.datasource);
        this.Current_Stock_Price = this.datasource[0]['05. price'];
        this.Currentsymbol = this.datasource[0]['01. symbol'];
        this.Latesttrade = this.datasource[0]['07. latest trading day'];
      }
    });
  }

  async GetAllValues(){
    await this.service.GetAllPrices(this.selected).subscribe(data => {
      if(data != null){
        // this.datasource.push(data['Meta Data']);
        this.DBar.length = 0;
        this.DBar.push(data);
        // this.DBar = Object.entries(this.datasource[0]["Weekly Time Series"]).map(([key, value]) => ({date: new Date(key), open: parseFloat(value["1. open"]), high: parseFloat(value["2. high"]), low: parseFloat(value["3. low"]), close: parseFloat(value["4. close"])}));
        // this.DBar = this.datasource;
        // this.datasource.push(data);

        console.log('DBar-->', this.DBar); //this.datasource[0]['Monthly Time Series']);
        // console.log('datasource-->', this.datasource);
        // for (const [key, value] of Object.entries(this.datasource[0]['Weekly Time Series'])) {
        //   console.log(`${key}: ${value}`);
        // }
      }
    });
  }

  async GetAllYValues(){
    this.service.GetAllYPrices(this.selected).subscribe(data => {
      if (data != null) {
        this.DBar = null;
        this.DBar = data;
        console.log('DBar.length-->', this.DBar.length);
        var open = this.DBar.map((val: any) => val.open);
        var date = this.DBar.map((val: any) => val.date.substr(0, 10));
        this.createChart(open, date);
      }
      else {
        console.log('data-->', data);
      }
    });
  }

  async createChart(Topen:any, Tdate:any){
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: Tdate,
	       datasets: [
          {
            label: this.selected + "  Prices",
            data: Topen,
            backgroundColor: 'blue',
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }


async createChartdata(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          }//,
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
					// 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  }

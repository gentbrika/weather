import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cities:any = [
    { name: 'Prizren', value: 'prizren'},
    { name: 'Prishtine', value: 'pristina'},
    { name: 'Ferizaj', value: 'ferizaj'},
    { name: 'Peja', value: 'peje'},
    { name: 'Gjilan', value: 'gjilan'},
    { name: 'Mitrovica', value: 'mitrovice'},
  ]
  city:any = ""
  datas:any = [{}];
  click=0;
  tempUnits:any;
  metric:any;
  icon:any;
  sunrise:any;
  sunset:any;
  weeklyWeather:any = [{}];
  coordinates:any;

  constructor( private http : HttpClient) { }



  ngOnInit(): void {    
    // this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&APPID=ea6178aca4bd0de40bdb33abcb2bf135&units=metric').subscribe(res => {
    //   console.log(res);
    // })    
   }

  search(){
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=ea6178aca4bd0de40bdb33abcb2bf135&units=${this.tempUnits}`)
    .subscribe(res => {
      this.datas = res
      this.coordinates = this.datas.coord;
      console.log(this.coordinates);
      this.icon = `http://openweathermap.org/img/wn/${this.datas.weather[0]?.icon}.png`;


      this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&APPID=ea6178aca4bd0de40bdb33abcb2bf135&units=${this.tempUnits}`).subscribe(res => {
        console.log('RESSSSS',res);
        this.weeklyWeather = res;
        this.weeklyWeather = this.weeklyWeather.daily;
        console.log(this.weeklyWeather);
      })




      const sec = this.datas.sys.sunrise;
      const secSunset = this.datas.sys.sunset;
      const date = new Date(sec * 1000);
      const dateSunset = new Date(secSunset * 1000);
      const timestr = date.toLocaleTimeString();
      const timestrSunset = dateSunset.toLocaleTimeString();
      this.sunrise = timestr.slice(0, 5);
      this.sunset = timestrSunset.slice(0, 5);
    })
    this.click++
    console.log(this.tempUnits);
    if(this.tempUnits == "metric"){
      this.metric = true;
    }
    else{
      this.metric = false;
    }
    
  }


}

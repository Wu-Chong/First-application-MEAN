import { Component } from '@angular/core';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  obsUnit: Observable<Unit[]>;
  data: Unit[];

  postObserver: Observable<Object>;
  postData: Object;

  constructor(private http: HttpClient) { }
  getUnitList(): void {
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    this.obsUnit = this.http.get<Unit[]>('https://3000-e0cf99ab-b5b6-4333-9b16-7643ed729eee.ws-eu01.gitpod.io/users', headers);
    this.obsUnit.subscribe((data: Unit[]) => { this.data = data; });
  }

  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement): boolean {
    let newData: Unit = new Unit();
    newData.Unit = newUnit.value;
    newData.Cost = newCost.value;
    newData.Hit_Speed = newHitSpeed.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-e0cf99ab-b5b6-4333-9b16-7643ed729eee.ws-eu01.gitpod.io/users', JSON.stringify(newData),headers)

    this.postObserver = this.http.post('https://3000-e0cf99ab-b5b6-4333-9b16-7643ed729eee.ws-eu01.gitpod.io/users', newData);
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }

}

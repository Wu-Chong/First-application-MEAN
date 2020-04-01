import { Component } from '@angular/core';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
    this.obsUnit = this.http.get<Unit[]>('https://3000-c9fed6be-9f5c-446b-9695-55eea2137345.ws-eu01.gitpod.io/users');
    this.obsUnit.subscribe((data: Unit[]) => { this.data = data; });
  }

  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement): boolean {
    let newData: Unit = new Unit(newUnit.value, newCost.value, newHitSpeed.value);
    this.postObserver = this.http.post('https://3000-c9fed6be-9f5c-446b-9695-55eea2137345.ws-eu01.gitpod.io/users', newData);
    this.postObserver.subscribe(data => this.postData = data);
    this.getUnitList();
    return false;
  }

}

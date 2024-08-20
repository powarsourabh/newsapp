// 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  private apiurl = 'https://newsapi.org/v2/everything?q=Angular&from=2024-08-01&to=2024-08-20&language=en&sortBy=publishedAt&apiKey=e5169eee928a46bba1d9b98b1d94c542';

  constructor(private http:HttpClient) { }

 

  getNews(): Observable<any> {
    return this.http.get<any>(this.apiurl);
  }

  
}
   
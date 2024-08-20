import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  article: any;



  constructor(private route: ActivatedRoute){}



  ngOnInit(): void {
    if (history.state && history.state.article) {
      this.article = history.state.article;
      console.log(this.article);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      
    }
  }
}

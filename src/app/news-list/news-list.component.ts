import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { News } from '../models/news.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news: any[] = [];

  filteredNews: any[] = [];
  selectedCountry: string = '';
  fromDate: string = '';
  toDate: string = '';
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 12;
  loading: boolean = true;


  constructor(private newsservice: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchNews();
  }




  fetchNews(): void {
    this.loading = true;
    this.newsservice.getNews().subscribe(
      (data) => {
        this.news = data.articles;
        this.filteredNews = this.news;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.loading = false;
      }
    );
  }




  goToDetail(article: any): void {
    this.router.navigate(['/news', article.title.replace(/ /g, '-')], { state: { article } });
  }


  filterNews(): void {
    this.filteredNews = this.news.filter(article => {
      const matchesCountry = this.selectedCountry
        ? article.country === this.selectedCountry
        : true;
      const matchesDate =
        (!this.fromDate || new Date(article.publishedAt) >= new Date(this.fromDate)) &&
        (!this.toDate || new Date(article.publishedAt) <= new Date(this.toDate));
      const matchesSearch = this.searchTerm
        ? article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (article.author && article.author.toLowerCase().includes(this.searchTerm.toLowerCase()))
        : true;

      return matchesCountry && matchesDate && matchesSearch;
    });
  }

  viewDetails(news: News): void {
    this.router.navigate(['/news-detail'], { queryParams: { news: JSON.stringify(news) } });
  }

}

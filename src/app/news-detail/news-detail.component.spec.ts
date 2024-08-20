import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetailComponent } from './news-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NewsDetailComponent', () => {
  let component: NewsDetailComponent;
  let fixture: ComponentFixture<NewsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test-id', // Mocked article ID
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display article details when article data is available', () => {
    const article = {
      title: 'Test Article',
      urlToImage: 'https://example.com/image.jpg',
      description: 'Test Description',
      author: 'Test Author',
      publishedAt: '2023-01-01T12:00:00Z',
      content: 'Test Content',
      url: 'https://example.com/full-article',
    };
    history.pushState({ article }, '', '');

    fixture.detectChanges(); // Trigger change detection

    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(titleElement.textContent).toContain(article.title);
    expect(imgElement.src).toContain(article.urlToImage);
    expect(descriptionElement.textContent).toContain(article.description);
  });

  it('should display "No article data available." when no article data is present', () => {
    history.pushState({}, '', '');

    fixture.detectChanges(); // Trigger change detection

    const noArticleElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(noArticleElement.textContent).toContain('No article data available.');
  });
});

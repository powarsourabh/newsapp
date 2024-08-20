import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [NewsService] // Provide the NewsService
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve news data from the API via GET', () => {
    const dummyNews = {
      articles: [
        {
          title: 'Test Article',
          description: 'Test Description',
          author: 'Test Author',
          urlToImage: 'https://example.com/image.jpg',
          publishedAt: '2024-08-15T12:00:00Z',
          content: 'Test Content',
          url: 'https://example.com/full-article',
        },
      ],
    };

    service.getNews().subscribe(news => {
      expect(news).toEqual(dummyNews); // Check if the response matches the mock data
    });

    const req = httpMock.expectOne(service['apiurl']); // Expecting one request to the API URL
    expect(req.request.method).toBe('GET'); // Ensure it was a GET request
    req.flush(dummyNews); // Simulate the response with mock data
  });

  it('should handle HTTP errors gracefully', () => {
    const errorMessage = 'Failed to load news data';

    service.getNews().subscribe(
      () => fail('Expected an error, not news data'),
      (error) => {
        expect(error.status).toBe(500); // Expect a 500 error status
        expect(error.statusText).toBe('Internal Server Error'); // Expect an Internal Server Error message
      }
    );

    const req = httpMock.expectOne(service['apiurl']); // Expecting one request to the API URL
    expect(req.request.method).toBe('GET'); // Ensure it was a GET request

    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' }); // Simulate an HTTP error
  });
});

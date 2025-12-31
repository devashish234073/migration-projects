import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GreetingService } from '../src/app/services/greeting.service';
import { HelloComponent } from '../src/app/components/hello/hello.component';
import { GenderDisplayComponent } from '../src/app/components/gender-display/gender-display.component';
import { ApiDemoComponent } from '../src/app/components/api-demo/api-demo.component';

describe('GreetingService', () => {
  let service: GreetingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GreetingService]
    });
    service = TestBed.inject(GreetingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getGreeting method', () => {
    expect(service.getGreeting).toBeDefined();
  });

  it('should call API with correct URL and params', () => {
    const mockResponse = { message: 'Hello John', time: '2025-12-30' };

    service.getGreeting('John').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/greeting?name=John');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

describe('HelloComponent', () => {
  let component: HelloComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HelloComponent]
    });
    const fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name input property', () => {
    component.name = 'Test User';
    expect(component.name).toBe('Test User');
  });
});

describe('GenderDisplayComponent', () => {
  let component: GenderDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GenderDisplayComponent]
    });
    const fixture = TestBed.createComponent(GenderDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have gender input property', () => {
    component.gender = 'female';
    expect(component.gender).toBe('female');
  });

  it('should emit genderChange event', () => {
    spyOn(component.genderChange, 'emit');
    component.onGenderChange();
    expect(component.genderChange.emit).toHaveBeenCalledWith('female');
  });
});

describe('ApiDemoComponent', () => {
  let component: ApiDemoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiDemoComponent, HttpClientTestingModule],
      providers: [GreetingService]
    });
    const fixture = TestBed.createComponent(ApiDemoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name input property', () => {
    component.name = 'Test User';
    expect(component.name).toBe('Test User');
  });

  it('should initialize with idle status', () => {
    expect(component.status).toBe('idle');
  });
});

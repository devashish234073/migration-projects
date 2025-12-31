describe('Legacy AngularJS App', function() {

  // Load the module before each test
  beforeEach(module('legacyApp'));

  describe('GreetingService', function() {
    let greetingService, $httpBackend;

    beforeEach(inject(function(_GreetingService_, _$httpBackend_) {
      greetingService = _GreetingService_;
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function() {
      expect(greetingService).toBeDefined();
    });

    it('should have getGreeting method', function() {
      expect(greetingService.getGreeting).toBeDefined();
    });

    it('should call API with correct URL and params', function() {
      $httpBackend.expectGET('http://localhost:3000/api/greeting?name=John')
        .respond({ message: 'Hello John', time: '2025-12-30' });

      greetingService.getGreeting('John');
      $httpBackend.flush();
    });
  });

  describe('helloLegacy component', function() {
    let $componentController;

    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
    }));

    it('should exist', function() {
      const component = $componentController('helloLegacy', null, { name: 'Test' });
      expect(component).toBeDefined();
    });

    it('should have name binding', function() {
      const component = $componentController('helloLegacy', null, { name: 'John' });
      expect(component.name).toBe('John');
    });
  });

  describe('genderDisplay component', function() {
    let $componentController;

    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
    }));

    it('should exist', function() {
      const component = $componentController('genderDisplay', null, { gender: 'male' });
      expect(component).toBeDefined();
    });

    it('should have gender binding', function() {
      const component = $componentController('genderDisplay', null, { gender: 'female' });
      expect(component.gender).toBe('female');
    });
  });

  describe('apiDemo component', function() {
    let $componentController;

    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
    }));

    it('should exist', function() {
      const component = $componentController('apiDemo', null, { name: 'Test' });
      expect(component).toBeDefined();
    });

    it('should have name binding', function() {
      const component = $componentController('apiDemo', null, { name: 'John' });
      expect(component.name).toBe('John');
    });
  });
});

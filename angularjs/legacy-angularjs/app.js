angular.module('legacyApp',[])
  .service('GreetingService',['$http', function($http){
    this.getGreeting = function (name) {
        return $http.get('http://localhost:3000/api/greeting',{params: {name:name}});
    }
  }])
  .component('helloLegacy',{
    bindings: {
        name: '<'
    },
    template: `
      <div class="card">
        <strong>AngularJS <strong>: Hello {{$ctrl.name}}</strong></strong>
      </div>
    `,
    controller: function() {

    }
  })
  .component('genderDisplay',{
    bindings: {
        gender: '='
    },
    template: `
      <div class="card">
        <div class="row">
          <label>Gender:</label>
          <select id="genderSelect" ng-model="$ctrl.gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span>{{$ctrl.gender}}</span>
        </div>
      </div>
    `,
    controller: function() {

    }
  })
  .component('apiDemo', {
    bindings: {
        name: '<'
    },
    template: `
      <div class="card">
        <div class="row">
          <label>API greeting</label>
          <span ng-if="$ctrl.status === 'loading'">Loading...</span>
          <span ng-if="$ctrl.status === 'success'">{{$ctrl.greeting.message}} <small>{{$ctrl.greeting.time}}</small></span>
          <span ng-if="$ctrl.status === 'error'">Error: {{$ctrl.error}}</span>
          <button type="button" ng-click="$ctrl.fetchGreeting()">Refresh</button>
        </div>
      </div>
    `,
    controller: ['GreetingService', function (GreetingService) {
        var $ctrl = this;
        $ctrl.status = 'idle';
        $ctrl.greeting = null;
        $ctrl.error = null;

        $ctrl.$onInit = function() {
            $ctrl.fetchGreeting();
        }

        $ctrl.fetchGreeting = function() {
            $ctrl.status = 'loading';
            $ctrl.error = null;
            GreetingService.getGreeting($ctrl.name)
              .then(function (resp) {
                $ctrl.greeting = resp.data;
                $ctrl.status = 'success';
              })
              .catch(function (err) {
                $ctrl.status = 'error';
                $ctrl.error = err.message || 'Unknown error';
              })
        }
    }]
  })
;
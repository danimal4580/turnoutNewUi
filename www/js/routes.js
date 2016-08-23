angular.module('app.routes', ['ionicUIRouter'])

// http://stackoverflow.com/questions/27907670/how-to-handle-states-when-logged-in-ionic-firebase-angularjs

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('page1.editorsPicks', {
    url: '/page2',
    views: {
      'tab2': {
        templateUrl: 'templates/editorsPicks.html',
        controller: 'editorsPicksCtrl'
      }
    }
  })

  .state('page1.discover', {
    url: '/page3',
    views: {
      'tab3': {
        templateUrl: 'templates/discover.html',
        controller: 'discoverCtrl'
      }
    }
  })

  .state('page1.menu', {
    url: '/page4',
    views: {
      'tab4': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })

  .state('page1', {
    url: '/page1',
    templateUrl: 'templates/page1.html',
    abstract:true
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='page1.home'
      2) Using $state.go programatically:
        $state.go('page1.home');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page5
      /page1/tab4/page5
  */
  .state('page1.home', {
    cache: false,
    url: '/page5',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      },
      'tab4': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('page1.newEvent', {
    url: '/page6',
    views: {
      'tab4': {
        templateUrl: 'templates/newEvent.html',
        controller: 'newEventCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='page1.home2'
      2) Using $state.go programatically:
        $state.go('page1.home2');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page7
      /page1/tab4/page7
  */
  .state('page1.home2', {
    cache: false,
    url: '/page7',
    views: {
      'tab1': {
        templateUrl: 'templates/home2.html',
        controller: 'home2Ctrl'
      },
      'tab4': {
        templateUrl: 'templates/home2.html',
        controller: 'home2Ctrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='page1.home3'
      2) Using $state.go programatically:
        $state.go('page1.home3');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page8
      /page1/tab4/page8
  */
  .state('page1.home3', {
    cache: false,
    url: '/page8',
    views: {
      'tab1': {
        templateUrl: 'templates/home3.html',
        controller: 'home3Ctrl'
      },
      'tab4': {
        templateUrl: 'templates/home3.html',
        controller: 'home3Ctrl'
      }
    }
  })

  .state('page1.legal', {
    url: '/page9',
    views: {
      'tab4': {
        templateUrl: 'templates/legal.html',
        controller: 'legalCtrl'
      }
    }
  })

  .state('page1.contactUs', {
    url: '/page10',
    views: {
      'tab4': {
        templateUrl: 'templates/contactUs.html',
        controller: 'contactUsCtrl'
      }
    }
  })

  .state('login', {
    url: '/page13',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page14',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='page1.event'
      2) Using $state.go programatically:
        $state.go('page1.event');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page18
      /page1/tab3/page18
      /page1/tab4/page18
  */
  .state('page1.event', {
    url: '/page18',
    views: {
      'tab1': {
        templateUrl: 'templates/event.html',
        controller: 'eventCtrl'
      },
      'tab3': {
        templateUrl: 'templates/event.html',
        controller: 'eventCtrl'
      },
      'tab4': {
        templateUrl: 'templates/event.html',
        controller: 'eventCtrl'
      }
    }
  })

  .state('page1.interests', {
    url: '/page16',
    views: {
      'tab4': {
        templateUrl: 'templates/interests.html',
        controller: 'interestsCtrl'
      }
    }
  })

  .state('initialInterests', {
    url: '/page17',
    templateUrl: 'templates/initialInterests.html',
    controller: 'initialInterestsCtrl'
  })

  .state('page1.myEvents', {
    url: '/page12',
    views: {
      'tab4': {
        templateUrl: 'templates/myEvents.html',
        controller: 'myEventsCtrl'
      }
    }
  })

  .state('page1.editorSPicksFeed', {
    url: '/page19',
    views: {
      'tab2': {
        templateUrl: 'templates/editorSPicksFeed.html',
        controller: 'editorSPicksFeedCtrl'
      }
    }
  })

  .state('page1.categoryFeed', {
    url: '/page11',
    views: {
      'tab3': {
        templateUrl: 'templates/categoryFeed.html',
        controller: 'categoryFeedCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='page1.blankMap'
      2) Using $state.go programatically:
        $state.go('page1.blankMap');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page15
      /page1/tab3/page15
      /page1/tab4/page15
  */
  .state('page1.blankMap', {
    url: '/page15',
    views: {
      'tab1': {
        templateUrl: 'templates/blankMap.html',
        controller: 'blankMapCtrl'
      },
      'tab3': {
        templateUrl: 'templates/blankMap.html',
        controller: 'blankMapCtrl'
      },
      'tab4': {
        templateUrl: 'templates/blankMap.html',
        controller: 'blankMapCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page13')

  

});
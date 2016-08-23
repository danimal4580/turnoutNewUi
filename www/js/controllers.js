angular.module('app.controllers', ['firebase', 'ionic' , 'ngMap' , 'ngCordova'])
// ng-Map slows us down a lot
  // do ionic for the popups
  
.controller('editorsPicksCtrl', function($scope) {

})
   
.controller('discoverCtrl', function($scope , $state , userFactory ) {

  /// declaring all the category functions
  $scope.food = function() {
    userFactory.category = 'food' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.sports = function() {
    userFactory.category = 'sports' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.career = function() {
    userFactory.category = 'career' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.cultural= function() {
    userFactory.category = 'cultural' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.service = function() {
    userFactory.category = 'service' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.school  = function() {
    userFactory.category = 'school' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.greek = function() {
    userFactory.category = 'greek' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.arts = function() {
    userFactory.category = 'arts' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.nightlife = function() {
    userFactory.category = 'nightlife' ;
    $state.go('page1.categoryFeed') ;
  }
  $scope.other = function() {
    userFactory.category = 'other' ;
    $state.go('page1.categoryFeed') ;
  }
  // 

  $scope.random = function() {
      var eventsArray = [];
     firebase.database().ref('/title/').once('value').then(function(snapshot) {
        for ( var bh in snapshot.val() ) {
          eventsArray.push(bh) ;
       }
       userFactory.event =eventsArray [Math.floor(Math.random()*(eventsArray.length))] ; 
       userFactory.returnAddress = 'page1.discover' ;
       $state.go('page1.event') ;
     })
  }
})
   
.controller('menuCtrl', function($scope) {

})
//       .controller('loginCtrl',['$scope' ,'$state', '$ionicPopup' , 'userFactory', function($scope , $state , $ionicPopup,  userFactory ) {
.controller('homeCtrl',[ '$scope' , '$state' , '$ionicPopup' , 'userFactory' , function($scope , $state , $ionicPopup,  userFactory) {

  $scope.status = " save" ;

  $scope.events = [] ;

  var niceArray = [
    {},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{}
  ] ;

  var timeArray = null ;
  firebase.database().ref('/time/').once('value').then(function(snapshot) {
    timeArray = snapshot.val() ;
  })
  var dateArray = null ;
  firebase.database().ref('/date/').once('value').then(function(snapshot){
    dateArray = snapshot.val() ;
  })
  var descriptionArray = null ;
  firebase.database().ref('/description/').once('value').then(function(snapshot){
    descriptionArray = snapshot.val() ;
  })
  var likesArray = null ;
  firebase.database().ref('/likes/').once('value').then(function(snapshot){
    likesArray = snapshot.val() ;
  })
  // lets pull the stuff from firebase
  var yourCategories = null ;
  var relevantArray = { 
    food: null ,
    sports: null ,
    career: null,
    cultural: null,
    service: null ,
    school: null ,
    greek: null ,
    arts: null,
    nightlife: null,
    other: null
  } ;

  // what if I set relevant array equal to everything and then just killed it all  ....
  firebase.database().ref('/food/').once('value').then(function(snapshot) {
    relevantArray.food = snapshot.val() ;
  })
  firebase.database().ref('/sports/').once('value').then(function(snapshot) {
    relevantArray.sports = snapshot.val() ;
  })
  firebase.database().ref('/career/').once('value').then(function(snapshot) {
    relevantArray.career = snapshot.val() ;
  })
  firebase.database().ref('/cultural/').once('value').then(function(snapshot) {
    relevantArray.cultural = snapshot.val() ;
  })
  firebase.database().ref('/service/').once('value').then(function(snapshot) {
    relevantArray.service = snapshot.val() ;
  })
  firebase.database().ref('/school/').once('value').then(function(snapshot) {
    relevantArray.school = snapshot.val() ;
  })
  firebase.database().ref('/greek/').once('value').then(function(snapshot) {
    relevantArray.greek = snapshot.val() ;
  })
  firebase.database().ref('/arts/').once('value').then(function(snapshot) {
    relevantArray.arts = snapshot.val() ;
  })
  firebase.database().ref('/nigtlife/').once('value').then(function(snapshot) {
    relevantArray.nightlife= snapshot.val() ;
  })
  firebase.database().ref('/other/').once('value').then(function(snapshot) {

    relevantArray.other = snapshot.val() ;
  })
  // this snipped returnsa relevant array that has all the events you might like .... but now it just trims relevant array instead of adding to it
  firebase.database().ref('/usercategories/' + userFactory.uid + '/').once('value').then(function(snapshot) {
    yourCategories = snapshot.val() ;
    for ( var op in yourCategories ) {
      if (yourCategories[op] != true) {
          relevantArray[op] =  null ;
      }
    }
  })

  $scope.save = function (index) {
    var titleChecker = true ;
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot) {
      for ( var we in snapshot.val() ) {
        if (snapshot.val()[we] === $scope.events[index].name) {
          titleChecker = false ;
        }
      }
      if ( titleChecker === false ) {
        $ionicPopup.alert({title:'You have already saved this event; go to my saved events in menu to unsave.'}) ;
        return null ;
      } else if (titleChecker === true)  {
        var betterIndex = $scope.events[index].name ;
        var saveArray = null;
        var updates = {} ;
        firebase.database().ref('/likes/').once('value').then(function(snapshot) {
          saveArray = snapshot.val() ;
          updates['/savedEvents/'+userFactory.uid+'/'+$scope.events[index].name]  = $scope.events[index].name;
          updates['/likes/' + $scope.events[index].name] = (saveArray[betterIndex] + 1) ;
          $scope.events[index].likes += 1 ;
          $state.go('page1.home_tab1')
          return firebase.database().ref().update(updates);
        })
      } 
    })

  }

  $scope.move = function(index) {
    userFactory.event = $scope.events[index].name ;
    $state.go('page1.event') ;
  }

  // we need a precaution for poorly input events...
  var titleArray = null ;
  var counter = 0;
  firebase.database().ref('/title/').once('value').then(function(snapshot) {
    titleArray = snapshot.val() ;
    // apply alogorithim
    for ( var title in titleArray) {
     niceArray[counter].name = titleArray[title] ; 
     niceArray[counter].time = timeArray[title] ;
     niceArray[counter].date = dateArray[title] ;
     niceArray[counter].description = descriptionArray[title] ;
     niceArray[counter].likes = likesArray[title] ;
     niceArray[counter].score = 1 ;
     for (var rt in relevantArray) {
      if (relevantArray[rt] !=  null ) {;
        for (var ty in relevantArray[rt]) {
          if (ty === niceArray[counter].name) {
            niceArray[counter].score += 1 ;
          }
        }
      }
     }
     counter = counter + 1 ;
    }
    // sorts just relative to categories and
    niceArray.sort(function (a, b) {
      if ( a.score < b.score ) {
       return 1;
      }
      if ( a.score> b.score) {
        return -1;
     }
     if (a.score === b.score ) {
          if (a.likes < b.likes) {
            return 1;
          }
          if (a.likes > b.likes ) {
            return -1;
          }
          return 0 ;
      } 
    });
    ///
    counter = 0 ;
    for ( var name in niceArray) {
      if ( niceArray[name].name === undefined ) {
        break ;
      }
      counter += 1 ;
    }
    niceArray.splice(counter,(niceArray.length)-counter) ;
    $scope.events = niceArray ;
    userFactory.returnAddress = 'page1.home' ; 
    // give it some young loadin' time
    $state.go('page1.home') ;
  })

  // set everything back to null

}])
   
.controller('newEventCtrl', function($scope, $state , $ionicPopup , $cordovaCamera, userFactory) {

   // making a new event for storage for later - this can be an empty array
    $scope.newEvent = {
      twentyOnePlus: false ,
      nuOnly: true
    } ;

     // title checker
    var titleArray = null ;
    firebase.database().ref('/title/').once('value').then(function(snapshot) {
      titleArray = snapshot.val() ;
    })

    // nu only checker - nuOnlyBoolean corresponds to user's status
    var nuOnlyBooleanArray = null ;
    firebase.database().ref('/nuOnlyBoolean/').once('value').then(function(snapshot) {
      nuOnlyBooleanArray = snapshot.val() ;
    })

    

  // $scope.upload = function() {
  //       // var syncArray = firebase.storage().ref('/test/' + )
  //       var options = {
  //           quality : 75,
  //           destinationType : Camera.DestinationType.DATA_URL,
  //           sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
  //           allowEdit : true,
  //           encodingType: Camera.EncodingType.JPEG,
  //           popoverOptions: CameraPopoverOptions,
  //           targetWidth: 500,
  //           targetHeight: 500,
  //           saveToPhotoAlbum: false
  //       };
  //       // $add({image: imageData})
  //       $cordovaCamera.getPicture(options).then(function(imageData) {
  //           alert('we made it this far') ;
  //           firebase.storage().ref('/test/').put(imageData).then(function() {
  //               alert("Image has been uploaded");
  //           });.catch(function(error) {
  //       // [START onfailure]
  //              alert('Upload failed:', error);
  //       // [END onfailure]
  //           });
  //           alert('and also this far') ;
  //       }, function(error) {
  //           console.error(error);
  //       });
  //   }
  
  $scope.preview  = function () {

    if ( $scope.newEvent.address != null) {
      userFactory.address = $scope.newEvent.address;
      $state.go('page1.blankMap') ;
    } else {
      $ionicPopup.alert({title:' No address to preview.'}) ;
    }

  }

  // attached to ng-click on the Create new button
  $scope.createNewEvent = function () {

    var checker = $ionicPopup.confirm({
      title: 'Do you want to make this event as it is currently written?'
    })

    checker.then(function(res) {
      if ( res != false) {

      // checks title
    var titleBoolean = null ;
    for ( var title in titleArray) {
      if ( $scope.newEvent.title != titleArray[title]) {
        continue;
      } else if ( $scope.newEvent.title === titleArray[title]) {
        titleBoolean = false ;
        break;
      }
      titleBoolean = true ; 
    }

    // checks nuOnly
    var uid = userFactory.uid ;
    var nuStatusBoolean = null ;

    if ( ( nuOnlyBooleanArray[uid] === false ) && ($scope.newEvent.nuOnly === true) ) {
      nuStatusBoolean = false ;
    } else {
      nuStatusBoolean = true ;
    }
 
    // declare the array of updates to be stored
    var updates = {};

    //  declaration of counter and testing loop 
    var counter = 0 ;
    for ( var ab in $scope.newEvent.categories) {
      if ( ( $scope.newEvent.categories[ab] === true)  ) {
        counter = counter + 1;
      }
    }

    // indicate the things that need to be saved to userfactory
    userFactory.address = $scope.newEvent.address ;
    $scope.newEvent.host = userFactory.email ;

    // return updates and jump pages if cateogires didn't go over
    if (counter > 3) {
      $ionicPopup.alert({title: 'Too many categories selected. You have selected ' + counter + '. The maximum is 3.'}) ;
      // set categoires all back to null ...
      for ( var de in $scope.newEvent.categories) {
        if ($scope.newEvent.categories[de] != null ) {
          $scope.newEvent.categories[de] = null ;
        }
      }
    }
    else if ($scope.newEvent.title === undefined ){
      $ionicPopup.alert({title:'This event does not have a title. How do you expect people to go to it?'}) ;
    } 
   else if ( titleBoolean === false ) {
      $ionicPop.alert ({title:' This title is already in use. Change it to something a little more creative to log your event.'}) ;
    } 

    else if (nuStatusBoolean === false) {
      $ionicPopup.alert ({title:' Your email is not in the u.northwestern.edu network. You do not have permission to post NU only events.'});
    }
    else {
       // apply updates through non categories array
      for ( var cd in $scope.newEvent) {
      // apply regardless of stuff
        if ( ($scope.newEvent[cd] != null) && ( cd != 'categories') ) {
          updates['/' + cd + '/' + $scope.newEvent.title] = $scope.newEvent[cd] ;
        }
      }
      // apply thorugh categories now
      for ( var zx in $scope.newEvent.categories) {
        if ( $scope.newEvent.categories[zx] != null) {
          updates['/' + zx + '/' + $scope.newEvent.title] = $scope.newEvent.categories[zx] ;
        }
      }
      updates['/likes/' + $scope.newEvent.title] = 0 ;
      // firebase doesn't update but the page jumps might just give it a second for loading purposes
      $ionicPopup.alert({title:'Event created. Go have fun you crazy kid, you!'});
      $state.go('page1.menu') ;
      // clean up scope
      $scope.newEvent = {} ;
      return firebase.database().ref().update(updates);
    }

   } // closes res
  })

    // ** remember to clear the input fields
  }

})
   
.controller('home2Ctrl', function($scope , $state, $ionicPopup, userFactory) {

  // this is soon 

 $scope.status = " save" ;

  $scope.events = [] ;

  var niceArray = [
    {},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{}
  ] ;

  var timeArray = null ;
  firebase.database().ref('/time/').once('value').then(function(snapshot) {
    timeArray = snapshot.val() ;
  })
  var dateArray = null ;
  firebase.database().ref('/date/').once('value').then(function(snapshot){
    dateArray = snapshot.val() ;
  })
  var descriptionArray = null ;
  firebase.database().ref('/description/').once('value').then(function(snapshot){
    descriptionArray = snapshot.val() ;
  })
  var likesArray = null ;
  firebase.database().ref('/likes/').once('value').then(function(snapshot){
    likesArray = snapshot.val() ;
  })
  $scope.save = function (index) {
    var titleChecker = true ;
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot) {
      for ( var we in snapshot.val() ) {
        if (snapshot.val()[we] === $scope.events[index].name) {
          titleChecker = false ;
        }
      }
      // title checker is failing in hot and soon
      if ( titleChecker === false ) {
        $ionicPopup.alert({title:'You have already saved this event; go to my saved events in menu to unsave.'}) ;
        return null ;
      } else if (titleChecker === true)  {
        var betterIndex = $scope.events[index].name ;
        var saveArray = null;
        var updates = {} ;
        firebase.database().ref('/likes/').once('value').then(function(snapshot) {
          saveArray = snapshot.val() ;
          updates['/savedEvents/'+userFactory.uid+'/'+$scope.events[index].name]  = $scope.events[index].name;
          updates['/likes/' + $scope.events[index].name] = (saveArray[betterIndex] + 1) ;
          $scope.events[index].likes += 1 ;
          $state.go('page1.home2') ;
          return firebase.database().ref().update(updates);
        })
      } 
    })

  }

  $scope.move = function(index) {
    userFactory.event = $scope.events[index].name ;
    $state.go('page1.event') ;
  }

  var titleArray = null ;
  var counter = 0;
  firebase.database().ref('/title/').once('value').then(function(snapshot) {
    titleArray = snapshot.val() ;
    // apply alogorithim
    for ( var title in titleArray) {
     var date1 = null ;
     var date2 = null ;
     var date3 = null ;
     niceArray[counter].name = titleArray[title] ; 
     niceArray[counter].time = timeArray[title] ;
     niceArray[counter].date = dateArray[title] ;
     niceArray[counter].description = descriptionArray[title] ;
     niceArray[counter].likes = likesArray[title] ;
     date1 = new Date (timeArray[title]) ;
     date2 = new Date (dateArray[title]) ;
     date3 = new Date () ;
     if ( ( date1.getTime() + date2.getTime() - date3.getTime() ) > 0 ) {
      niceArray[counter].soon = ( date1.getTime() + date2.getTime() - date3.getTime() ) ;
     } else {
      niceArray[counter].soon = 0 ;
     }
     counter = counter + 1 ;
    }
    ///
    niceArray.sort(function (a, b) {
      // try and account for the 0
      if ( (a.soon === 0 )|| (b.soon === 0) ) {
        return 1 ;
      }
      else {
        if ( a.soon > b.soon ) {
         return 1;
       }
       if ( a.soon < b.soon ) {
         return -1;
      }
       return 0;
      }
    });
    counter = 0 ;
    for ( var name in niceArray) {
      if ( niceArray[name].name === undefined ) {
        break ;
      }
      counter += 1 ;
    }
    niceArray.splice(counter,(niceArray.length)-counter) ;
    $scope.events = niceArray ;
    userFactory.returnAddress = 'page1.home2'; 
    // give it some young loadin' time
    $state.go('page1.home2') ;
  })

  // set everything back to n

})
   
.controller('home3Ctrl', function($scope , $state, $ionicPopup , userFactory) {

  // this is hot 

  $scope.status = " save" ;

  $scope.events = [] ;

  var niceArray = [
    {},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{}
  ] ;

  var timeArray = null ;
  firebase.database().ref('/time/').once('value').then(function(snapshot) {
    timeArray = snapshot.val() ;
  })
  var dateArray = null ;
  firebase.database().ref('/date/').once('value').then(function(snapshot){
    dateArray = snapshot.val() ;
  })
  var descriptionArray = null ;
  firebase.database().ref('/description/').once('value').then(function(snapshot){
    descriptionArray = snapshot.val() ;
  })
  var likesArray = null ;
  firebase.database().ref('/likes/').once('value').then(function(snapshot){
    likesArray = snapshot.val() ;
  })
  $scope.save = function (index) {
    var titleChecker = true ;
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot) {
      for ( var we in snapshot.val() ) {
        if (snapshot.val()[we] === $scope.events[index].name) {
          titleChecker = false ;
        }
      }
      if ( titleChecker === false ) {
        $ionicPopup.alert({title:'You have already saved this event; go to my saved events in menu to unsave.'}) ;
        return null ;
      } else if (titleChecker === true)  {
        var betterIndex = $scope.events[index].name ;
        var saveArray = null;
        var updates = {} ;
        firebase.database().ref('/likes/').once('value').then(function(snapshot) {
          saveArray = snapshot.val() ;
          updates['/savedEvents/'+userFactory.uid+'/'+$scope.events[index].name]  = $scope.events[index].name;
          updates['/likes/' + $scope.events[index].name] = (saveArray[betterIndex] + 1) ;
          $scope.events[index].likes += 1 ;
          $state.go('page1.home3') ;
          return firebase.database().ref().update(updates);
        })
      } 
    })

  }

  $scope.move = function(index) {
    userFactory.event = $scope.events[index].name ;
    $state.go('page1.event') ;
  }

  var titleArray = null ;
  var counter = 0;
  firebase.database().ref('/title/').once('value').then(function(snapshot) {
    titleArray = snapshot.val() ;
    // apply alogorithim
    for ( var title in titleArray) {
     niceArray[counter].name = titleArray[title] ; 
     niceArray[counter].time = timeArray[title] ;
     niceArray[counter].date = dateArray[title] ;
     niceArray[counter].description = descriptionArray[title] ;
     niceArray[counter].likes = likesArray[title] ;
     counter = counter + 1 ;
    }
    niceArray.sort(function (a, b) {
      if (a.likes < b.likes) {
       return 1;
      }
      if (a.likes > b.likes) {
        return -1;
     }
      return 0;
    });
    counter = 0 ;
    for ( var name in niceArray) {
      if ( niceArray[name].name === undefined ) {
        break ;
      }
      counter += 1 ;
    }
    niceArray.splice(counter,(niceArray.length)-counter) ;
    $scope.events = niceArray ;
    userFactory.returnAddress = 'page1.home3' ;
    // give it some young loadin' time
    $state.go('page1.home3') ;
  })

  // set everything back to n

})
   
.controller('legalCtrl', function($scope) {

})
   
.controller('contactUsCtrl', function($scope) {

})
   
.controller('loginCtrl',['$scope' ,'$state', '$ionicPopup' , 'userFactory', function($scope , $state , $ionicPopup,  userFactory ) {

$scope.accountinfo = {}

// put some console.log statements to check

// login to ng-click
	$scope.login = function() {

    // just user factory the email
          firebase.auth().signInWithEmailAndPassword($scope.accountinfo.email, $scope.accountinfo.password).then(function() {
            var user = firebase.auth().currentUser ;
            if (user.emailVerified === false) {
              // this runs like 2 or 3 times and is annoying
              $ionicPopup.alert({title:'Email not verified and cannot sign in. There is still a chance you are pure evil.'}) ;
            }
             else  {
              userFactory.email = user.email;
              userFactory.uid = user.uid ;
              $state.go('page1.home_tab1') ; 
            }
          }).catch(function(error) {
          // Handle Errors here.
           var errorCode = error.code; 
           console.log(errorCode) ;    
           var errorMessage = error.message;
           // [START_EXCLUDE]
           if (errorCode === 'auth/wrong-password') {
              $ionicPopup.alert({title:'Wrong password.'}) ;
              return errorCode ;
            } 
            if (errorCode === 'auth/user-not-found'){
              $ionicPopup.alert({title:'This email is not in our database, but you should definitely try to add it!'}) ;
              return errorCode ;
            }
            if (errorCode === 'auth/invalid-email') {
              $ionicPopup.alert({title:'Did you type in an email address? We don\t think so.'}) ;
              return errorCode ;
            }
            else {
              $ionicPopup.alert({title:'What did you type in? Seriously ....'}) ;
            }
          });

	};

// add a script clearing the previously written in stuff

}])
   
.controller('signupCtrl' , [ '$scope', '$state' , '$ionicPopup' , 'userFactory'  , function($scope , $state, $ionicPopup , userFactory) {

  // declare empty array for ng-model
	$scope.accountinfo = {}; 

  var uid = null ;
  var twentyOnePlusBoolean = null ;
  var nuOnlyBoolean = null ;

  $scope.testFunction = function() {

    // this checks the password
    if ( $scope.accountinfo.password.length > 5) {

    firebase.auth().createUserWithEmailAndPassword($scope.accountinfo.email, $scope.accountinfo.password).then(function() {

      // i think this should work for the website.
    var DOB = new Date($scope.accountinfo.date);
    var DOBday = DOB.getDate() ;
    var DOBmonth = DOB.getMonth() + 1 ;
    var DOByear = DOB.getFullYear() ;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    // logic of setting 21+ boolean
    if ( (yyyy - DOByear) > 21) {
      twentyOnePlusBoolean = true ;
    } 
    else if ( (yyyy - DOByear) === 21 ) {
      if ( mm > DOBmonth) {
        twentyOnePlusBoolean = true ;
      }
      else if ( mm === DOBmonth) {
        if ( dd >= DOBday) {
          twentyOnePlusBoolean = true ;
        }
        else {
           twentyOnePlusBoolean = false ;
        }
      }
      else {
         twentyOnePlusBoolean = false ;
      }
    }
    else {
      twentyOnePlusBoolean = false ;
    }

    // logic of figuring out in the NU network
    var emailstring = $scope.accountinfo.email ;
    var emailstringlength = emailstring.length ;
    var networknumber = null;
    var comparisonstring = 'u.northwestern.edu' ;
    // get where to index the email
    for ( var jj = 0 ; jj < emailstringlength ; jj++) {
      if (emailstring[jj] === '@') {
        networknumber = jj ;
      }
    }
  // compare the rest of the email
  var counter1 = 0 ;
  for ( var jj = networknumber+1 ; jj <emailstringlength ; jj++) {
    // compare
    if ( emailstring[jj] === comparisonstring[counter1]) {
      counter1 = counter1 + 1
    }
    else {
      nuOnlyBoolean = false ;
      break ;
    }
    nuOnlyBoolean = true ;
  }
  uid = firebase.auth().currentUser.uid 
  firebase.auth().currentUser.sendEmailVerification()
  var updates = {} ;
  userFactory.uid =  uid;
  updates['/users/' + uid] = $scope.accountinfo.email; // debate this later
  updates['/nuOnlyBoolean/' + uid] = nuOnlyBoolean;
  updates['/twentyOnePlusBoolean/' + uid] = twentyOnePlusBoolean;
  $ionicPopup.alert({title:'Email verification sent! This might take up to 30 seconds so don\t panic, just hang tight brah.'}) ;
  $state.go('initialInterests') ; 
  return firebase.database().ref().update(updates);


    }).catch(function(error) {
    // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
    })

  } else {
      $ionicPopup.alert({title:'Your password is a wee short for our standards.'}) ;
  }

}


}])
   
.controller('eventCtrl', function($scope, $state , $ionicPopup , userFactory) {

  var user = {} ;

  console.log(userFactory.test) ;
  console.log(userFactory.event) ;

  $scope.event = {} ;
  $scope.event.title = userFactory.event ;

  // this performs a proper safety check 
  firebase.database().ref('/nuOnly/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.nuOnly = snapshot.val() ;
  })
  firebase.database().ref('/twentyOnePlus/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.twentyOnePlus = snapshot.val() ;
  })
  firebase.database().ref('/nuOnlyBoolean/' + userFactory.uid + '/').once('value').then(function(snapshot) {
    user.nuOnlyBoolean = snapshot.val() ;
  })
  firebase.database().ref('/twentyOnePlusBoolean/' + userFactory.uid + '/').once('value').then(function(snapshot) {
    user.twentyOnePlusBoolean = snapshot.val() ;
    if ( ($scope.event.twentyOnePlus === true) && (user.twentyOnePlusBoolean === false) ) {
      $state.go(userFactory.returnAddress) ;
      $ionicPopup.alert({title:'This event is 21+ and you are not 21. Email us if there is a mistake.'}) ;
    }
    // still not checked but the logic is the same
    if ( ($scope.event.nuOnlyBoolean === true) && (user.nuOnlyBoolean === false) ) {
      $state.go(userFactory.returnAddress) ;
      $ionicPopup.alert({title:'This event is nuOnly and your email is not in the network. Email us if there is a mistake.'}) ;
    }
  })
  // ends the safety check
  // starts the view
  firebase.database().ref('/location/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.location = snapshot.val() ;
  })
  firebase.database().ref('/date/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.date = snapshot.val() ;
  })
  firebase.database().ref('/time/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.time = snapshot.val() ;
  })
  firebase.database().ref('/duration/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.duration = snapshot.val() ;
  })
   firebase.database().ref('/price/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.price = snapshot.val() ;
  })
   firebase.database().ref('/host/' +userFactory.event + '/').once('value').then(function(snapshot){
    $scope.event.host = snapshot.val()
   })
   firebase.database().ref('/likes/' + userFactory.event + '/').once('value').then(function(snapshot) {
    $scope.event.likes = snapshot.val() ;
  })
  firebase.database().ref('/longDescription/' + userFactory.event + '/').once('value').then(function(snapshot){
    $scope.event.longDescription = snapshot.val() ;
  })
  // get address
  firebase.database().ref('/address/' + userFactory.event + '/').once('value').then(function(snapshot){
    userFactory.address = snapshot.val() ;
  })
  // might need to redisplay ...

  // ends the view
  // starts the functions
  $scope.save = function () {
    var titleChecker = true ;
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot) {
      for ( var we in snapshot.val() ) {
        if (snapshot.val()[we] === userFactory.event ) {
          titleChecker = false ;
        }
      }
      if ( titleChecker === false ) {
        $ionicPopup.alert({title:'You have already saved this event; go to my saved events in menu to unsave.'}) ;
        return null ;
      } else if (titleChecker === true)  {
        var betterIndex = userFactory.event ;
        var saveArray = null;
        var updates = {} ;
        firebase.database().ref('/likes/').once('value').then(function(snapshot) {
          saveArray = snapshot.val() ;
          updates['/savedEvents/'+userFactory.uid+'/'+ userFactory.event]  = userFactory.event;
          updates['/likes/' + userFactory.event] = (saveArray[betterIndex] + 1) ;
          $scope.event.likes += 1 ;
          $state.go('page1.event') ;
          return firebase.database().ref().update(updates);
        })
      } 
    })
  }
  $scope.map = function () {
    $state.go('page1.blankMap') ;
  }

})
   
.controller('interestsCtrl',[ '$scope' , '$state', 'userFactory' ,  function($scope ,  $state , userFactory) {

  $scope.accountinfo = {} ;
  $scope.accountinfo.categories = {} ;
  firebase.database().ref('/usercategories/'+ userFactory.uid + '/').once('value').then(function(snapshot) {
    $scope.accountinfo.categories = snapshot.val() ;
    $state.go('page1.interests') ;
  })


  // keep going

  $scope.setInterests = function () {

    var updates = {} ;

   updates['/usercategories/' + userFactory.uid + '/food'] = $scope.accountinfo.categories.food;
   updates['/usercategories/' + userFactory.uid + '/sports'] = $scope.accountinfo.categories.sports;
   updates['/usercategories/' + userFactory.uid + '/career'] = $scope.accountinfo.categories.career;
   updates['/usercategories/' + userFactory.uid + '/cultural'] = $scope.accountinfo.categories.cultural;
   updates['/usercategories/' + userFactory.uid + '/service'] = $scope.accountinfo.categories.service;
   updates['/usercategories/' + userFactory.uid + '/school'] = $scope.accountinfo.categories.school;
   updates['/usercategories/' + userFactory.uid + '/greek'] = $scope.accountinfo.categories.greek;
   updates['/usercategories/' + userFactory.uid + '/arts'] = $scope.accountinfo.categories.arts;
   updates['/usercategories/' + userFactory.uid + '/nightlife'] = $scope.accountinfo.categories.nightlife;
   updates['/usercategories/' + userFactory.uid + '/other'] = $scope.accountinfo.categories.other;
   $state.go('page1.menu') ; 
   return firebase.database().ref().update(updates);

  }

}])
   
.controller('initialInterestsCtrl',[ '$scope' , '$state' , 'userFactory' , function($scope , $state , userFactory) {

  $scope.accountinfo = {} ;
  $scope.accountinfo.categories = {
    food: false ,
    sports: false ,
    career: false ,
    cultural: false ,
    service: false ,
    school: false ,
    greek: false ,
    arts: false ,
    nightlife: false ,
    other: false 
  } ;

  $scope.setInterests = function () {

  var updates = {} ;

   updates['/usercategories/' + userFactory.uid + '/food'] = $scope.accountinfo.categories.food;
   updates['/usercategories/' + userFactory.uid + '/sports'] = $scope.accountinfo.categories.sports;
   updates['/usercategories/' + userFactory.uid + '/career'] = $scope.accountinfo.categories.career;
   updates['/usercategories/' + userFactory.uid + '/cultural'] = $scope.accountinfo.categories.cultural;
   updates['/usercategories/' + userFactory.uid + '/service'] = $scope.accountinfo.categories.service;
   updates['/usercategories/' + userFactory.uid + '/school'] = $scope.accountinfo.categories.school;
   updates['/usercategories/' + userFactory.uid + '/greek'] = $scope.accountinfo.categories.greek;
   updates['/usercategories/' + userFactory.uid + '/arts'] = $scope.accountinfo.categories.arts;
   updates['/usercategories/' + userFactory.uid + '/nightlife'] = $scope.accountinfo.categories.nightlife;
   updates['/usercategories/' + userFactory.uid + '/other'] = $scope.accountinfo.categories.other;
   $state.go('login') ; 
   return firebase.database().ref().update(updates);

  }

}])
   
.controller('myEventsCtrl', function($scope , $state, $ionicPopup , userFactory) {

  $scope.status = " unsave" ;

  $scope.unsave = function(index) {
    var savedChecker = false ;
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot) {
      var unsaveArray = snapshot.val() ;
      var namer = null ;
      for ( var no in snapshot.val()) {
        if (snapshot.val()[no] === $scope.events[index].name) {
          savedChecker = true ; 
          namer = $scope.events[index].name ;
          break ;
        }
      }
      if ( savedChecker === false) {
        $ionicPopup.alert({title:'This event is already unsaved. Stop clicking buttons kid.'}) ;
      }
      if (savedChecker === true) {
        var updates = {} ;
        delete unsaveArray[namer];
        $scope.events[index].likes -= 1 ;
        $scope.number -= 1 ;
        updates['/savedEvents/' + userFactory.uid + '/'] = unsaveArray;
        updates['/likes/' + $scope.events[index].name ] = ($scope.events[index].likes ) ;
        $state.go('page1.myEvents') ;
        $ionicPopup.alert({title:'Event unsaved'}) ;
        return firebase.database().ref().update(updates);
      }
    })
  }

  $scope.events = [] ;

  var niceArray = [
    {},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{}
  ] ;

  var timeArray = null ;
  firebase.database().ref('/time/').once('value').then(function(snapshot) {
    timeArray = snapshot.val() ;
  })
  var dateArray = null ;
  firebase.database().ref('/date/').once('value').then(function(snapshot){
    dateArray = snapshot.val() ;
  })
  var descriptionArray = null ;
  firebase.database().ref('/description/').once('value').then(function(snapshot){
    descriptionArray = snapshot.val() ;
  })
  var likesArray = null ;
  firebase.database().ref('/likes/').once('value').then(function(snapshot){
    likesArray = snapshot.val() ;
  })


  $scope.move = function(index) {
    userFactory.event = $scope.events[index].name ;
    $state.go('page1.event') ;
  }


  var titleArray = null ;
  var counter = 0;
  firebase.database().ref('/title/').once('value').then(function(snapshot) {
    titleArray = snapshot.val() ;
    // apply alogorithim
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot){
      
      for ( var title in titleArray) {
        if (snapshot.val()[title] != null) {
          niceArray[counter].name = titleArray[title] ; 
          niceArray[counter].time = timeArray[title] ;
          niceArray[counter].date = dateArray[title] ;
          niceArray[counter].description = descriptionArray[title] ;
          niceArray[counter].likes = likesArray[title] ;
          counter = counter + 1 ;
        }
      }
      counter = 0 ;
      for ( var name in niceArray) {
        if ( niceArray[name].name === undefined ) {
          break ;
        }
        counter += 1 ;
      }
      niceArray.splice(counter,(niceArray.length)-counter) ;
      $scope.events = niceArray ;
      $scope.number = counter ;
      userFactory.returnAddress = 'page1.myEvents' ;
     // give it some young loadin' time
      $state.go('page1.myEvents') ;

    })
    //
    
  })

  // set everything back to null


})
   
.controller('editorSPicksFeedCtrl', function($scope) {

})
   
.controller('categoryFeedCtrl', function($scope , $state , $ionicPopup , userFactory) {

  $scope.category = userFactory.category;

  $scope.status = " save" ;

  $scope.events = [] ;

  var niceArray = [
    {},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{},{},{}, {},{}
  ] ;

  var timeArray = null ;
  firebase.database().ref('/time/').once('value').then(function(snapshot) {
    timeArray = snapshot.val() ;
  })
  var dateArray = null ;
  firebase.database().ref('/date/').once('value').then(function(snapshot){
    dateArray = snapshot.val() ;
  })
  var descriptionArray = null ;
  firebase.database().ref('/description/').once('value').then(function(snapshot){
    descriptionArray = snapshot.val() ;
  })
  var likesArray = null ;
  firebase.database().ref('/likes/').once('value').then(function(snapshot){
    likesArray = snapshot.val() ;
  })
  $scope.save = function (index) {
    var titleChecker = true ;
    firebase.database().ref('/savedEvents/' + userFactory.uid + '/').once('value').then(function(snapshot) {
      for ( var we in snapshot.val() ) {
        if (snapshot.val()[we] === $scope.events[index].name) {
          titleChecker = false ;
        }
      }
      if ( titleChecker === false ) {
        $ionicPopup.alert({title:'You have already saved this event; go to my saved events in menu to unsave.'}) ;
        return null ;
      } else if (titleChecker === true)  {
        var betterIndex = $scope.events[index].name ;
        var saveArray = null;
        var updates = {} ;
        firebase.database().ref('/likes/').once('value').then(function(snapshot) {
          saveArray = snapshot.val() ;
          updates['/savedEvents/'+userFactory.uid+'/'+$scope.events[index].name]  = $scope.events[index].name;
          updates['/likes/' + $scope.events[index].name] = (saveArray[betterIndex] + 1) ;
          $scope.events[index].likes += 1 ;
          $state.go('page1.categoryFeed') ;       
          return firebase.database().ref().update(updates);
        })
      } 
    })

  }

  $scope.move = function(index) {
    userFactory.event = $scope.events[index].name ;
    $state.go('page1.event') ;
  }

  var titleArray = null ;
  var counter = 0;
  firebase.database().ref('/' + userFactory.category + '/').once('value').then(function(snapshot) {
    titleArray = snapshot.val() ;
    // apply alogorithim
    for ( var title in titleArray) {
     niceArray[counter].name = title ; 
     niceArray[counter].time = timeArray[title] ;
     niceArray[counter].date = dateArray[title] ;
     niceArray[counter].description = descriptionArray[title] ;
     niceArray[counter].likes = likesArray[title] ;
     counter = counter + 1 ;
    }
    niceArray.sort(function (a, b) {
      if (a.likes < b.likes) {
       return 1;
      }
      if (a.likes > b.likes) {
        return -1;
     }
      return 0;
    });
    counter = 0 ;
    for ( var name in niceArray) {
      if ( niceArray[name].name === undefined ) {
        break ;
      }
      counter += 1 ;
    }
    niceArray.splice(counter,(niceArray.length)-counter) ;
    $scope.events = niceArray ;
    userFactory.returnAddress = 'page1.categoryFeed' ;
    // give it some young loadin' time
    $state.go('page1.categoryFeed') ;
  })


})
   
.controller('blankMapCtrl', function($scope , NgMap , userFactory) {

  $scope.address = userFactory.address ;
  // maybe null userfactory  ...
  console.log(userFactory.address)

})


// incomplete mini event cards
// ui things
//
 
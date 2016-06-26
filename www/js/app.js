// Ionic Starter App
var base_url = 'http://192.168.10.8:3000';
var fbatch=null;
var batch=null;
var mmsg={
  mtitle:"",
  mmessage:"",
  mdate:"",
  mcname:"",
  mdept:"",
  mbatch:"",
  msec:"",
  url:"",
  file:"",
  flag:''

};
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','ngStorage','ngCordova'])

  .run(function($ionicPlatform, RequestsService,StorageService) {



    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      //pushNotification = window.plugins.pushNotification;
      //
      //
      //window.onNotification = function (e) {
      //
      //  console.log('notification received');
      //  switch (e.event) {
      //    case 'registered':
      //      if (e.regid.length > 0) {
      //
      //        var device_token = e.regid;
      //        RequestsService.register(device_token).then(function (response) {
      //          alert('registered!');
      //        });
      //      }
      //      break;
      //
      //    case 'message':
      //      alert('msg received');
      //      // alert(JSON.stringify(e));
      //      alert('msg received: ' + e.payload.title);
      //      //alert(e.title);
      //
      //      temp.temptitle = e.payload.title;
      //      temp.tempmessage = e.message;
      //      StorageService.add();
      //
      //
      //      // $scope.$apply(function () {
      //      //   $scope.alert('in apply');
      //      //   mmsg.mtitle= e.payload.title;
      //      //   mmsg.mmessage= e.message;
      //      //   StorageService.add(mmsg);
      //      // });
      //
      //      break;
      //
      //    case 'error':
      //      alert('error occured');
      //      break;
      //
      //  }
      //};
      //
      //
      //window.errorHandler = function (error) {
      //  alert('an error occured');
      //}
      //
      //
      //pushNotification.register(
      //  onNotification,
      //  errorHandler,
      //  {
      //    'badge': 'true',
      //    'sound': 'true',
      //    'alert': 'true',
      //    'senderID': '518119464074',
      //    'ecb': 'onNotification'
      //  }
      //);

    });

  })  //controller end
//})

  .factory ('StorageService', function ($localStorage) {
  //$localStorage.$reset();
  console.log('in storage');
  $localStorage = $localStorage.$default({
    // tasks: [{N_ID:0}]
    tasks:[{mid:0,mtitle:'newtile', mmessage:'newmsg',}],
    announcement:[{mtitle:'newtile', mmessage:'newmsg',flag:'0'}],
    teacann:[{title:'titile',msg:'newmsg',msgdate:'2-3-2016'}]

//    tasks: [{N_ID:0,SENDER:'try',RECIEVER:'try',NOTICE:'tryn'}]

  });

  var _getAll = function () {
    //$localStorage.$reset();
    //  console.log('getAll');
    //   console.log($localStorage.tasks);
    return $localStorage.tasks;
  };

  //var _add = function (task) {
  //  console.log(' in add');
  //  $localStorage.tasks.push(task);
  //}
  var _add = function (t) {
    batch++;
    console.log(' in add');
    var objMy = {};
    objMy["mtitle"] = t.mtitle;
    objMy["mmessage"] = t.mmessage;
    objMy["mdate"]= t.mdate;
    objMy["url"]= t.url;
    objMy["file"]= t.file;
    objMy["flag"]='0';

    $localStorage.tasks.push(objMy);
  }
  var _getAllann = function () {
    //$localStorage.$reset();
    //  console.log('getAll');
    //  console.log($localStorage.announcement);
    return $localStorage.announcement;
  };

  //var _add = function (task) {
  //  console.log(' in add');
  //  $localStorage.tasks.push(task);
  //}
  var _addann = function (t) {
    //batch++;
    console.log(' in add');
    var objMy = {};
    objMy["mtitle"] = t.mtitle;
    objMy["mmessage"] = t.mmessage;
    objMy["mdate"]= t.mdate;
    objMy["flag"]='0';

    $localStorage.announcement.push(objMy);
  }

  var _addteacann = function (task) {
    console.log(' in addteacann');
    $localStorage.teacann.push(task);
    for(var i= 0;i< $localStorage.teacann.length;i++)
      console.log('teachann'+i+ JSON.stringify($localStorage.teacann[i]));
  }
  var _getAllteacann = function () {
    // $localStorage.$reset();
    console.log('getAll');
    console.log($localStorage.teacann);
    return $localStorage.teacann;
  };
  var _remove = function (task) {
    $localStorage.tasks.splice($localStorage.tasks.indexOf(task), 1);
  }

  var _get = function (task) {
    //$localStorage.tasks.splice($localStorage.tasks.indexOf(task), 1);
    return $localStorage.tasks[indexOf(task)];
  }
  return {
    getAll: _getAll,
    add: _add,
    remove: _remove,
    get:_get,
    getAllann:_getAllann,
    addann:_addann,
    getAllteacann:_getAllteacann,
    addteacann:_addteacann,
  };
})

  //local storage end
  .factory('ImageUploadFactory', function ($q, $ionicLoading, $cordovaFileTransfer) {
    return {
      uploadImage: function (imageURI) {
        console.log('start upload image.');
        var deferred = $q.defer();

        uploadFile();

        function uploadFile() {
          console.log('in imageuploadfactory');
          console.log('ex'+ extension);
          if(extension == "jpg")
          {console.log('equal');}
          else
          {console.log('not equal');}
          $ionicLoading.show({template : 'Uploading image...'});

          // Add the Cloudinary "upload preset" name to the headers
          if(extension == "jpg") {
            console.log('in jpg');
            var uploadOptions = {
              params: {'upload_preset': "jy0jv82o"}

            };
          }
          else if(extension == "png") {
            var uploadOptions = {
              params: {'upload_preset': "y0gxexaf"}

            };
          }
          else if(extension == "pdf") {
            console.log('in pdf');
            var uploadOptions = {
              params: {'upload_preset': "dg6iycok"}

            };
          }
          else if(extension == "docx") {
            var uploadOptions = {
              params: {'upload_preset': "a4kyl6pr"}

            };
          }
          else if(extension == "doc") {
            var uploadOptions = {
              params: {'upload_preset': "xko6rrpk"}

            };
          }
          else if(extension == "txt") {
            var uploadOptions = {
              params: {'upload_preset': "uaodpwsn"}

            };
          }
          $cordovaFileTransfer
            // Your Cloudinary URL will go here
            .upload("https://api.cloudinary.com/v1_1/dpibroyqu/raw/upload", imageURI, uploadOptions)

            .then(function(result) {
              // Let the user know the upload is completed
              $ionicLoading.show({template : 'Done.', duration: 1000});
              var response = JSON.parse(decodeURIComponent(result.response));
              console.log('response is'+ response + 'result is' + result.response);

              deferred.resolve(response);
            }, function(err) {
              // Uh oh!
              $ionicLoading.show({template : 'Failed.', duration: 3000});
              deferred.reject(err);
            }, function (progress) {

            });
        }
        return deferred.promise;
      },
    }
  })




  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider


      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: 'menu2Ctrl'

      })

      .state('teachome', {
        url: "/teachome",
        templateUrl: "templates/teachome.html",
        controller: 'teachomeCtrl'

      })

      .state('teacNote', {
        url: "/teacNote",
        templateUrl: "templates/teacNote.html",
        controller: 'teacNoteCtrl'
      })

      .state('teacAnn', {
        url: "/teacAnn",
        templateUrl: "templates/teacAnn.html",
        controller: 'teacAnnCtrl'

      })
      .state('teacDetailNote', {
        url: "/teacDetailNote?sender&notice&mdate&url&file",
        templateUrl:"templates/teacDetailNote.html",
        controller: 'teacDetailNoteCtrl'

      })




      .state('DetailAnn', {
        url: "/DetailAnn?sender&notice&mdate",
        templateUrl:"templates/DetailAnn.html",
        controller: 'viewCompleteAnnCtrl'

      })

      .state('DetailNote', {
        url: "/DetailNote?sender&notice&mdate&url&file",
        templateUrl:"templates/DetailNote.html",
        controller: 'viewCompleteNotice2Ctrl'

      })

      .state('Announcements', {
        url: "/Announcements",
        templateUrl: "templates/Announcements.html",
        controller: 'AnnCtrl'
      })

      .state('Notifications', {
        url: "/Notifications",
        templateUrl: "templates/Notifications.html",
        controller: 'notices2Ctrl'
      })


      .state('NewAnnouncement', {
        url: "/NewAnnouncement",
        templateUrl: "templates/NewAnnouncement.html",
        controller:'NewAnnouncementCtrl'
      })



      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller:'studentLoginCtrl'
      })

      .state('teacLogin', {
        url: '/teacLogin',
        templateUrl: 'templates/teacLogin.html',
        controller:'teacLoginCtrl'
      })
      .state('SignIn', {
        url: '/SignIn',
        templateUrl: 'templates/SignIn.html',
        controller:'signctrl'
      })
      .state('teacCode', {
        url: '/teacCode',
        templateUrl: 'templates/teacCode.html',
        controller:'teacCodeCtrl'
      })

      .state('teacDetailAnn', {
        url: '/teacDetailAnn?sender&notice&mdate&cname&dept&batch&sec',
        templateUrl: 'templates/teacDetailAnn.html',
        controller:'teacDetailAnnCtrl'
      })


      .state('startup', {
        url: '/startup',
        templateUrl: 'templates/startup.html',
        controller:'startupctrl'
      })

      .state('teacLecture', {
        url: '/teacLecture',
        templateUrl: 'templates/teacLecture.html',
        controller:'teaclecturectrl'
      })

      .state('lectureupload', {
        url: '/lectureupload',
        templateUrl: 'templates/lectureupload.html',
        /*controller:'lectureuploadctrl'*/
      })
      .state('StdLecture', {
        url: '/StdLecture',
        templateUrl: 'templates/StdLecture.html',
        controller:'StdLecturectrl'
      })

      .state('StdlecDownload', {
        url: '/StdlecDownload',
        templateUrl: 'templates/StdlecDownload.html',
        controller:'StdlecDownloadctrl'
      })
      .state('Events', {
        url: '/Events',
        templateUrl: 'templates/Events.html',
        controller:'ActionSheetctrl'
        /*controller:'Eventsctrl'
     */
      })

      .state('EventDetails', {
        url: '/EventDetails?title&desc',
        templateUrl: 'templates/EventDetails.html',
        controller:'EventDetailsctrl'
      })

      /*.state('ActionSheet', {
        url: '/ActionSheet',
        templateUrl: 'templates/ActionSheet.html',
        controller:'ActionSheetctrl'
      })
*/

    .state('CallModal', {
     url: '/CallModal',
     templateUrl: 'templates/CallModal.html',
     controller:'MyController'
     })

      .state('Modal', {
        url: '/Modal',
        templateUrl: 'templates/Modal.html',
        controller:'MyController'
      })


      .state('bootmodal', {
        url: '/bootmodal',
        templateUrl: 'templates/bootmodal.html',

      })

      .state('Forum', {
        url: '/Forum',
        templateUrl: 'templates/Forum.html',

      })

      .state('CallionicModal', {
        url: '/CallionicModal',
        templateUrl: 'templates/CallionicModal.html',
        controller:'AppCtrl'
      })

      .state('ionicmodal', {
        url: '/ionicmodal',
        templateUrl: 'templates/ionicmodal.html',
        controller:'AppCtrl'
      })





    $urlRouterProvider.otherwise('/Events');

    //if(window.localStorage.getItem('firstTime') == null) //if first time
    // // $state.go('app.signUp');
    //  $urlRouterProvider.otherwise('/SignIn');// go to sign up view.
    //else
    // // $state.go('app.signIn'); //if not first time go to sign in view
    //  $urlRouterProvider.otherwise('/home');
  })

  .controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
  });

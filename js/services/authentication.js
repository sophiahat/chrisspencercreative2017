myApp.factory('Authentication', ['$rootScope', '$firebaseObject', '$firebaseAuth', '$location', function($rootScope, $firebaseObject, $firebaseAuth, $location) {
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    var auth = firebase.auth();
    $rootScope.authObj = $firebaseAuth(auth);
    
    auth.onAuthStateChanged(function(authUser) {
        if (authUser) {
            var userRef = firebase.database().ref('users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = '';
        }
    });
    
    var userObj = {
        login: function(user) {
            $rootScope.authObj.$signInWithEmailAndPassword(user.email, user.password)
            .then(function(regUser) {
                console.log("Signed in as: " + regUser.uid);
                $location.path('/home');
            }).catch(function(error){
                $rootScope.message = "Error: " + error.message;
            });
            
        }, //login
        
        logout: function() {
            return auth.signOut();
        },//logout
        
        requireAuth: function() {
            return $rootScope.authObj.$requireSignIn();
        },//require Authentication
        
//        requireAdmin: function() {
//            var user = $rootScope;
//            console.log(user);
//            var admin = false;
            
//            console.log('auth user');
//            var userRef = firebase.database().ref('users/' + authUser.uid);
//            var userObj = $firebaseObject(userRef);
//            $rootScope.currentUser = userObj;
//            if ($rootScope.currentUser.role == "admin") {
//                admin = true;
//            }
//            
//            console.log(admin);
//            return admin;
//        },//require Admin access level
        
        register: function(user) {
            $rootScope.authObj.$createUserWithEmailAndPassword(user.email, user.password)
            .then(function(regUser) {
                var timestamp = firebase.database.ServerValue.TIMESTAMP;
                var usersObj = firebase.database().ref('users');
                usersObj.child(regUser.uid).set({
                    date: timestamp,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: "guest"
                });
                userObj.login(user);
            }).catch(function(error) {
                $rootScope.message = "Error: " + error.message;
            });//create user
        },//register
    };
    return userObj; //object return
}]); // factory
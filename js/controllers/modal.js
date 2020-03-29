myApp.controller('ModalController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.registrationActive = false;
    console.log('registration active is: ' + $scope.registrationActive);
    const modal = $('#global-modal');
    const modalBtn = $('#modal-btn');
    const closeBtn = $('.close');
//    use jquery controls
//    Event listeners
    $(modalBtn).click(openModal);

    $(closeBtn).click(closeModal);
    
    $(modal).click(outsideClick);
    //open modal
    function openModal() {
        $(modal).show();
    }
//    close modal
    function closeModal() {
        $(modal).hide();
    }
    $rootScope.closeModal = closeModal;
//    close modal if outside click
    function outsideClick(e) {
        if (e.target.id == 'global-modal') {
            $(modal).hide();
        }
    }
    $scope.toggleRegistration = function() {
        $scope.registrationActive = !$scope.registrationActive;
        console.log('registration active is: ' + $scope.registrationActive);
    };

}]);
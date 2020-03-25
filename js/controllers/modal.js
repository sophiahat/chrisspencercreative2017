myApp.controller('ModalController', ['$scope', '$rootScope', function($scope, $rootScope) {
    const modal = $('#global-modal');
    console.log(modal);
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
//    close modal if outside click
    function outsideClick(e) {
        if (e.target.id == 'global-modal') {
            $(modal).hide();
        }
    }
}]);
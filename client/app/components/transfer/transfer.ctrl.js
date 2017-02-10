app.controller("TransferController", ["mtos", "$scope", "$localStorage", "TransferService", "$location", function (mtos, $scope, $localStorage, TransferService, $location) {

    var vm = this;

    vm.mtos = mtos;
    vm.selectedMTO = mtos[0];

    vm.mtoDetails = {};

    vm.sayHi = function() {
        console.log("~~~~~~~~~~~~HI~~~~~~~~~~~~~");
    }

    // $localStorage.mtos = mtos;
    // $localStorage.selectedMTO = $localStorage.mtos[0];

    vm.invalidTransfer = false;
    vm.showTransferSpinner = false;

    console.log("setting mtos: " + mtos);

    vm.transfer = function(transferDetails) {

        console.log("~~user~~");
        console.log($localStorage.user.id);        

        // insert source MTO from logged in identity, selected destination MTO
        transferDetails.sourceMTO = $localStorage.user.id;
        transferDetails.destinationMTO = vm.selectedMTO;

        console.log("~~transferDetails~~");
        console.log(transferDetails);

        vm.showTransferSpinner = true;

        TransferService.transfer(transferDetails)
            .then(function (result) {
                console.log("Returning trasfer result: ")
                console.log(result);
                if (!result) {
                    console.log("no result but no error");
                    // vm.showTransferringSpinner = false;
                    // vm.invalidTransaction = true;
                } else if (result.successful) {
                    console.log("result, has result.successful");
                    // vm.showTransferringSpinner = false;

                    // set user and navigation information on rootscope
                    // $localStorage.user = result.user;

                    // store the token in localStorage
                    // $localStorage.token = result.token;
                    
                    // delete $localStorage.selectedThing;

                    // $location.path("/master");
                    

                } else {
                    console.log("result, no result.successful, other result fields present though");
                    console.log(result);
                    // vm.showTransferringSpinner = false;
                    // vm.invalidTransaction = true;
                }
            }, function (error) {
                console.log("transfer error:");
                console.log(error);
                // vm.showTransferringSpinner = false;
                // vm.invalidTransaction = true;

            })
            .then(
                function (result) {
                    console.log("notSure success still new to promises:");
                    TransferService.afterTransfer()
                    .then( 
                        function (result) {
                            console.log("afterTransfer success still new to promises:");
                            console.log(result);
                            $scope.transferCtrl.mtoDetails = result;
                            $scope.transferCtrl.sayHi();
                        },
                        function (error) {
                            console.log("afterTransfer error still new to promises:");
                            console.log(error);
                        }
                    );
                }, 
                function (error) {
                    console.log("notSure error still new to promises:");
                    console.log(error);
                }
            );
    }

    // vm.afterTransfer = function() {

    //     console.log("~~afterTransfer~~");     

    //     // transferDetails.sourceMTO = $localStorage.user.id;
    //     // transferDetails.destinationMTO = vm.selectedMTO;

    //     TransferService.afterTransfer()
    //         .then(function (result) {
    //             console.log("Returning trasfer result: ")
    //             console.log(result);
    //             if (!result) {
    //                 console.log("no result but no error");
    //                 // vm.showTransferringSpinner = false;
    //                 // vm.invalidTransaction = true;
    //             } else if (result.successful) {
    //                 console.log("result, has result.successful");
    //                 // vm.showTransferringSpinner = false;

    //                 // set user and navigation information on rootscope
    //                 // $localStorage.user = result.user;

    //                 // store the token in localStorage
    //                 // $localStorage.token = result.token;
                    
    //                 // delete $localStorage.selectedThing;

    //                 // $location.path("/master");

    //             } else {
    //                 console.log("result, no result.successful, other result fields present though");
    //                 console.log(result);
    //                 // vm.showTransferringSpinner = false;
    //                 // vm.invalidTransaction = true;
    //             }
    //         }, function (error) {
    //             console.log("transfer error:");
    //             console.log(error);
    //             // vm.showTransferringSpinner = false;
    //             // vm.invalidTransaction = true;

    //         });
    // }
    
}]);

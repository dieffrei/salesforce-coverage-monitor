/**
 * Created by dieffrei on 07/12/16.
 */
angular.module('forceCodeCoverageApp', ["infinite-scroll", "chromeForce"])
    .controller('MainController', function ($scope, $http, $q, $interval, chromeService) {

        $scope.api = null;
        $scope.loading = false;
        $scope.codeCoverageResults = [];
        $scope.organization = null;
        $scope.batchSize = 10;
        $scope.batch = 1;

        function init(){
            $scope.loading = true;
            chromeService.getSessionId().then(function(result){
                console.debug("sessionId", result[0]);
                $scope.api = new SalesforceApi(result[0], result[1], $q, $http);
                refreshOrgInfo();
                getCodeCoverage();
            }, function(err){
                setInactive();
            });
        }

        function refreshOrgInfo(){
            $scope.api.callRestApi("/query/?q=SELECT Id, Name FROM Organization")
                .then(function(response){
                    $scope.organization = response.data.records[0];
                });
        }

        $scope.loadMore = function(){
            console.debug("loadMore");
            $scope.batch++;
            getCodeCoverage();
        };

        function getCodeCoverage(){
            $scope.loading = true;
            var query = "/tooling/query/?q=SELECT NumLinesUncovered, NumLinesCovered, ApexClassorTrigger.Id, ApexClassorTrigger.Name FROM ApexCodeCoverageAggregate cov ORDER BY NumLinesUncovered DESC LIMIT " + $scope.batchSize + " OFFSET " + $scope.batch * $scope.batchSize;
            $scope.api.callRestApi(query)
                .then(function(response){
                    _.each(response.data.records, function(it){
                        $scope.codeCoverageResults.push(new CodeCoverage(it));
                    });
                    $scope.loading = false;
                }, function(err){
                    $scope.loading = false;
                });

        }

        init();

    });
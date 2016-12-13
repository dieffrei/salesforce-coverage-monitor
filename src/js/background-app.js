angular.module('forceCodeCoverageBackgroundApp', ["chromeForce"])

    .controller('MainController', function ($scope, $http, $q, $interval, chromeService) {

        $scope.api = null;

        function init(){
            chrome.tabs.onActivated.addListener(function(activeInfo){
                refreshTab();
            });

            $interval(function(){
                refreshTab();
            }, 1000 * 5);
        }

        function refreshTab(){
            chromeService.getSessionId().then(function(result){
                console.debug("sessionId", result[0]);
                $scope.api = new SalesforceApi(result[0], result[1], $q, $http);
                refreshOrgCodeCoveragePct();
            }, function(err){
                setInactive();
            })
        }

        function setActive(text){
            chrome.browserAction.setIcon({
                path: "img/icon/logo-64.png"
            });
            chrome.browserAction.setPopup({popup: "index.html"});
            setBadge(text);
        }

        function setInactive(){
            chrome.browserAction.setIcon({
                path: "img/icon/logo-64-gray.png"
            });
            chrome.browserAction.setPopup({popup: ""});
            setBadge("");
        }

        function refreshOrgCodeCoveragePct(){
            setActive("...");
            $scope.api.callRestApi("/tooling/query/?q=SELECT PercentCovered FROM ApexOrgWideCoverage")
                .then(function(response){
                    setActive(response.data.records[0].PercentCovered + "%");
                })
        }

        function setBadge(text){
            chrome.browserAction.setBadgeText({text: text});
        }

        init();

    });
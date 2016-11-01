(function () {
    //регистрация модуля
    var app = angular.module("competitionViewer", []);

    var MainController = function ($scope, $http) {
        var onCompetitionComplete = function (response) {
            $scope.football = response.data;
        };

        var onCompetitionError = function (reason) {
            $scope.error = "Извините, произошла ошибка. Попробуйте перезагрузать страницу или зайти чуть позже"
        };

        var config = {headers:  {
                'X-Auth-Token': '26200e692fa74520b6c8432e57d4089b'
            }
        };

        $http.get("http://api.football-data.org/v1/competitions/?season=2016", config)
            .then(onCompetitionComplete, onCompetitionError);

        //сортировка
        $scope.competitionSort = "+caption";

        //вывод команд
        var onTeamsComplete = function (response) {
          $scope.teams = response.data;
        };

        $scope.teamsView = function (href) {
            $http.get(href, config)
                 .then(onTeamsComplete, onCompetitionError)
        }

    };

    //регистрация контроллера
    app.controller("MainController", ["$scope", "$http", MainController]);
}());
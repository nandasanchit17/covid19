var app = angular.module('coronatracker', []);

    app.controller('mainController', function ($scope, $http) {
      var api = "https://covid19.mathdro.id/api";
      $scope.nodata = true;
      var countries_list_temp = [];


      function getdata() {
        $http.get(api + "/").then(function (response) {
          $scope.global_stats = response.data;
        });

        $http.get(api + "/countries").then(function (response) {
          $scope.countries = response.data.countries;
          _.each($scope.countries, (item) => {
            if (item.iso3) {
              countries_list_temp.push(item);
            }
          })
        });
        $scope.countries_list = countries_list_temp;
      }

      getdata();

      $scope.getcountrystats = function (country_code) {
        if (country_code != null) {
          $http.get(api + "/countries/" + country_code).then(function (response) {
            $scope.nodata = false;
            $scope.countries_stats = response.data;
            console.log($scope.countries_stats)
            $scope.total = $scope.countries_stats.confirmed.value + $scope.countries_stats.recovered.value + $scope.countries_stats.deaths.value;
            $scope.rcvrd_perctg = (($scope.countries_stats.recovered.value * 100) / $scope.total) + "%";
            $scope.deaths_perctg = (($scope.countries_stats.deaths.value * 100) / $scope.total) + "%";
            $scope.cnfrm_perctg = (($scope.countries_stats.confirmed.value * 100) / $scope.total) + "%";
          }, function (response) {
            $scope.nodata = true;
          });
        }

      }
    });

//**Key disable**//
document.onkeydown = function(e) {
        if (e.ctrlKey && 
            (e.keyCode === 67 || 
             e.keyCode === 86 || 
             e.keyCode === 85 || 
             e.keyCode === 117)) {
            return false;
        } else {
            return true;
        }
};
$(document).keypress("u",function(e) {
  if(e.ctrlKey)
  {
return false;
}
else
{
return true;
}
});

$(document).keydown(function (event) {
    if (event.keyCode == 123) { // Prevent F12
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
        return false;
    }
});
var app = angular.module("project", ['nvd3','g1b.calendar-heatmap']);
app.controller("mainController", function($scope,$http) {
    console.log("mainController started...");
    // Initialize random data for the demo
    var now = moment().endOf('day').toDate();
    var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
    $scope.exampleData = d3.time.days(yearAgo, now).map(function (dateElement) {
      return {
        date: dateElement,
        details: Array.apply(null, new Array(Math.floor(Math.random() * 25))).map(function(e, i, arr) {
          return {
            'name': 'Project ' + Math.floor(Math.random() * 10),
            'date': function () {
              var projectDate = new Date(dateElement.getTime());
              projectDate.setHours(Math.floor(Math.random() * 24))
              projectDate.setMinutes(Math.floor(Math.random() * 60));
              return projectDate;
            }(),
            'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600)
          }
        }),
        init: function () {
          this.total = this.details.reduce(function (prev, e) {
            return prev + e.value;
          }, 0);
          return this;
        }
      }.init();
    });
    // Set custom color for the calendar heatmap
    $scope.color = '#cd2327';
    // Set overview type (choices are year, month and day)
    $scope.overview = 'year';
    // Handler function
    $scope.print = function (val) {
      console.log(val);
    };


    //////////////////
});

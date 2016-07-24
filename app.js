var app = angular.module("project", ['nvd3', 'g1b.calendar-heatmap']);
app.controller("mainController", function($scope, $http) {
    console.log("mainController started...");
    var d = moment();
    var yearAgo = moment().add(-1, 'years');
    //console.log(d.add(1,'days'));
    $scope.salesData = [];
    $scope.data = [{
        "date": "2016-01-01",
        "total": 17164,
        "details": [{
            "name": "Project 1",
            "date": "2016-01-01 12:30:45",
            "value": 9192
        }, {
            "name": "Project 2",
            "date": "2016-01-01 13:37:00",
            "value": 6753
        }, {
            "name": "Project N",
            "date": "2016-01-01 17:52:41",
            "value": 1219
        }]
    }];
    $http.get('json/salesOrders.json')
        .then(function(res) {
            $scope.salesOrders = res.data;
            // for(var i=0;i<res.data.length;i++) {
            //   for(startDate=yearAgo; startDate<=d; startDate.add(1,'days') ){
            //     console.log(moment(startDate).format("YYYY-MM-DD"));
            //     console.log(moment(res.data[i].sales_order_date).format("YYYY-MM-DD"));
            //     if(moment(startDate).format("YYYY-MM-DD")===moment(res.data[i].sales_order_date).format("YYYY-MM-DD")) {
            //       console.log(startDate + " == " + res.data[i].sales_order_date);
            //     }
            //   }


            //$scope.data=res.data[i].
            //}
            var allSales = []
            for (var i = 0; i < res.data.length; i++) {
                //console.log(moment(startDate).format("YYYY-MM-DD"));
                //console.log(moment(res.data[i].sales_order_date).format("YYYY-MM-DD"));
                //if (moment(startDate).format("YYYY-MM-DD") === moment(res.data[i].sales_order_date).format("YYYY-MM-DD")) {
                //console.log(moment(startDate).format("YYYY-MM-DD") + " == " + res.data[i].sales_order_date);
                var object = {};
                object["name"] = res.data[i].item_number;
                object["date"] = moment(res.data[i].sales_order_date).format("YYYY-MM-DD");
                object["value"] = parseInt(res.data[i].sales_order_row_quantity, 10); //not true!! need to change to money - sales_order_row_quantity*price
                allSales.push(object);
                //}
                //$scope.data=res.data[i].
            }
            console.log(allSales);
            $scope.data = [];
            for (var startDate = moment(yearAgo); startDate.isBefore(d); startDate.add(1, 'days')) {
                var obj = {};
                obj["date"] = moment(startDate).format("YYYY-MM-DD");
                obj["total"] = 0;
                obj["details"] = [];
                for (var i = 0; i < allSales.length; i++) {
                    if (moment(startDate).format("YYYY-MM-DD") === moment(allSales[i].date).format("YYYY-MM-DD")) {
                        //console.log(moment(startDate).format("YYYY-MM-DD") + " == " + res.data[i].sales_order_date);
                        //not true!! need to change to money - sales_order_row_quantity*price
                        obj["total"] += allSales[i].value;
                        obj["details"].push(allSales[i])
                    }
                }
                console.log(obj["total"]);
                $scope.data.push(obj);
            }
            console.log($scope.data);
        });

    $http.get('json/purchaseOrders.json')
        .then(function(res) {
            $scope.prchsOrders = res.data;
        });

    // Initialize random data for the demo
    // var now = moment().endOf('day').toDate();
    // var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
    // $scope.exampleData = d3.time.days(yearAgo, now).map(function (dateElement) {
    //   return {
    //     date: dateElement,
    //     details: Array.apply(null, new Array(Math.floor(Math.random() * 25))).map(function(e, i, arr) {
    //       return {
    //         'name': 'Project ' + Math.floor(Math.random() * 10),
    //         'date': function () {
    //           var projectDate = new Date(dateElement.getTime());
    //           projectDate.setHours(Math.floor(Math.random() * 24))
    //           projectDate.setMinutes(Math.floor(Math.random() * 60));
    //           return projectDate;
    //         }(),
    //         'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600)
    //       }
    //     }),
    //     init: function () {
    //       this.total = this.details.reduce(function (prev, e) {
    //         return prev + e.value;
    //       }, 0);
    //       return this;
    //     }
    //   }.init();
    // });
    // // Set custom color for the calendar heatmap
    // $scope.color = '#cd2327';
    // // Set overview type (choices are year, month and day)
    // $scope.overview = 'year';
    // // Handler function
    // $scope.print = function (val) {
    //   console.log(val);
    // };
    //console.log($scope.exampleData);


    //////////////////
});

var app = angular.module("project", ['nvd3', 'g1b.calendar-heatmap']);
app.controller("mainController", function($scope, $http) {
    console.log("mainController started...");
    var d = moment("2016-04-30", "YYYY-MM-DD");
    var yearAgo = moment(d).add(-1, 'years');
    $scope.pur_temp = [];
    $scope.item = null;
    $scope.selectedForStroke = null;
    $scope.cmprItem1 = null;
    $scope.cmprItem2 = null;
    $scope.btnDisabled = false;
    $scope.itemsOptions = [];
    $scope.stroke_type = 'general';
    $scope.selected_view = 'sales'
    $scope.selected_tab = 1;
    $scope.total_pur = [];

    $http.get('json/new_items_File.json')
        .then(function(items) {
            $scope.itemsOptions = items.data;
        });


    $scope.apply_view = function() {
        if ($scope.selected_view === 'sales') {
            console.log('sales');
            $http.get('json/new_sales_with_prices.json')
                .then(function(res) {
                    $scope.data = res.data;
                    console.log('tab ' + $scope.selected_tab);
                    if ($scope.selected_tab === 3) {
                        $scope.GeneralCompareByPrice();
                    } else if ($scope.selected_tab === 4) {
                        $scope.itemsCompareByPrice();
                    } else if ($scope.selected_tab === 2) {
                        $scope.itemsCompare();
                    }
                })
        } else if ($scope.selected_view === 'purchases') {
            console.log('purchases');
            $http.get('json/purch_2808.json')
                .then(function(res) {
                    $scope.data = res.data;
                    console.log('tab ' + $scope.selected_tab);
                    if ($scope.selected_tab === 3) {
                        $scope.GeneralCompareByPrice();
                    } else if ($scope.selected_tab === 4) {
                        $scope.itemsCompareByPrice();
                    } else if ($scope.selected_tab === 2) {
                        $scope.itemsCompare();
                    }
                })
        }
    }
    $scope.apply_view();




    $scope.filerByPrice = function() {
        if ($scope.stroke_type !== 'price') {
            $scope.stroke_type = 'price';
            $scope.salesFilteredData = [];
            var file = '';
            $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
            $http.get(file)
                .then(function(res) {
                    var arrLentgh = res.data.length;
                    for (var i = 0; i < arrLentgh; i++) {
                        var tempObject = {
                            date: res.data[i].date,
                            total_sales: res.data[i].total_sales,
                            total: 0,
                            details: []
                        };
                        var arr2Length = res.data[i].details.length;
                        for (var z = 0; z < arr2Length; z++) {
                            tempObject.total += (res.data[i].details[z].value * res.data[i].details[z].price);
                            tempObject.details.push(res.data[i].details[z]);
                            $scope.salesFilteredData.push(tempObject);
                        }
                    }
                    $scope.data = $scope.salesFilteredData;
                    if($scope.selected_tab === 4 ) {
                      $scope.itemsCompareByPrice();
                    }
                });
        }

    }


    $scope.GeneralCompare = function() {
        console.log('GeneralCompare has being called');
        $scope.stroke_type = 'general';
        $scope.salesFilteredData = [];
        $scope.apply_view();
    }

    $scope.GeneralCompareByPrice = function() {
        console.log('GeneralCompareByPrice has being called');
        $scope.stroke_type = 'price';
        $scope.salesFilteredData = [];
        var file = '';
        $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
        $http.get(file)
            .then(function(res) {
                var arrLentgh = res.data.length;
                for (var i = 0; i < arrLentgh; i++) {
                    var tempObject = {
                        date: res.data[i].date,
                        total_sales: res.data[i].total_sales,
                        total: 0,
                        details: []
                    };
                    var arr2Length = res.data[i].details.length;
                    for (var z = 0; z < arr2Length; z++) {
                        tempObject.total += (res.data[i].details[z].value * res.data[i].details[z].price);
                        tempObject.details.push(res.data[i].details[z]);
                        $scope.salesFilteredData.push(tempObject);
                    }
                }
                $scope.data = $scope.salesFilteredData;
            });
    }


    $scope.itemsCompare = function() {
        console.log('itemsCompare has being called');
        $scope.stroke_type = 'general';
        $scope.salesFilteredData = [];
        //$scope.apply_view();
        var file = '';
        $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
        $http.get(file)
            .then(function(res) {
                var arrLentgh = res.data.length;
                for (var i = 0; i < arrLentgh; i++) {
                    var tempObject = {
                        date: res.data[i].date,
                        total: 0,
                        details: []
                    };
                    var arr2Length = res.data[i].details.length;
                    for (var z = 0; z < arr2Length; z++) {
                        if (res.data[i].details[z].name === $scope.cmprItem1.item_number || res.data[i].details[z].name === $scope.cmprItem2.item_number) {
                            tempObject.total += res.data[i].details[z].value;
                            tempObject.details.push(res.data[i].details[z]);
                        }
                    }
                    $scope.salesFilteredData.push(tempObject);
                }
                $scope.data = $scope.salesFilteredData;
                $scope.selectedForStroke = $scope.cmprItem2;
            });
    }

    $scope.itemsCompareByPrice = function() {
        console.log('itemsCompareByPrice has being called');
        $scope.stroke_type = 'price';
        $scope.salesFilteredData = [];
        arrLentgh = 0;
        var file = '';
        $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
        $http.get(file)
            .then(function(res) {
                var arrLentgh = res.data.length;
                for (var i = 0; i < arrLentgh; i++) {
                    var tempObject = {
                        date: res.data[i].date,
                        total_sales: 0,
                        total: 0,
                        details: []
                    };
                    var arr2Length = res.data[i].details.length;
                    for (var z = 0; z < arr2Length; z++) {
                        if (res.data[i].details[z].name === $scope.cmprItem1.item_number || res.data[i].details[z].name === $scope.cmprItem2.item_number) {
                            tempObject.total_sales += (res.data[i].details[z].value * res.data[i].details[z].price);
                            tempObject.total += (res.data[i].details[z].value * res.data[i].details[z].price);
                            tempObject.details.push(res.data[i].details[z]);
                        }
                    }
                    $scope.salesFilteredData.push(tempObject);
                }
                $scope.selectedForStroke = $scope.cmprItem2;
                $scope.data = $scope.salesFilteredData;

            });
    }

    $scope.temp = [];
    $scope.filterQuantVSprice = function() {
        console.log('filterQuantVSprice has been called');
        $scope.item = null;
        $scope.selectedForStroke = null;
        $scope.cmprItem1 = null;
        $scope.cmprItem2 = null;
        $scope.btnDisabled = false;
        $scope.temp = [];
        $scope.stroke_type = 'P&Q';
        $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
        $http.get(file)
            .then(function(res) {
                console.log($scope.selected_view);
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].total = (res.data[i].total_sales / res.data[i].total);
                    $scope.temp.push(res.data[i])
                }
                $scope.data = $scope.temp;
            })

    }


    $scope.removeFilteredData = function(attr) {
            if (attr !== 'ok') {
                $scope.stroke_type = 'general';
                $scope.apply_view();
                $scope.item = null;
                $scope.selectedForStroke = null;
                $scope.cmprItem1 = null;
                $scope.cmprItem2 = null;
                $scope.btnDisabled = false;
            } else if (attr === 'ok' && $scope.stroke_type !== 'general') {
                $scope.stroke_type = 'general';
                $scope.apply_view();
            }
        }
        //////////////////
});

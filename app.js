var app = angular.module("project", ['nvd3', 'g1b.calendar-heatmap']);
app.controller("mainController", function($scope, $http) {
    console.log("mainController started...");
    var d = moment("2016-04-30", "YYYY-MM-DD");
    var yearAgo = moment(d).add(-1, 'years');
    //console.log(d.add(1,'days'));
    $scope.pur_temp = [];
    $scope.item = null;
    $scope.selectedForStroke = null;
    $scope.cmprItem1 = null;
    $scope.cmprItem2 = null;
    $scope.btnDisabled = false;
    $scope.itemsOptions = [];
    $scope.stroke_type = 'general';
    $scope.selected_view = 'sales'
    $scope.total_pur = [];
    $http.get('json/itemsFile.json')
        .then(function(items) {
            $scope.itemsOptions = items.data;
        });


    //Math.floor((Math.random() * 10) + 1);
    //arr = arr2.splice(0, arr2.indexOf('c'));
    $http.get('json/purch_2808.json').then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].details.length > 15) {
                var num = Math.floor((Math.random() * 2) + 1);
                var sec = [];
                var orig = [];
                orig = res.data[i].details.splice(10, res.data[i].details.length);
                sec = res.data[i].details.splice(0, 10);
                res.data[i].details = [];
                res.data[i].total=0;
                for (var j = 0; j < sec.length; j++) {
                    res.data[i - num].total += sec[j].value;
                    res.data[i - num].details.push(sec[j]);
                }
                if(orig.length<16) {
                  for (var j = 0; j < orig.length; j++) {
                      res.data[i].total += orig[j].value;
                      res.data[i].details.push(orig[j]);
                  }
                } else {
                  var tmp = orig.splice(orig.length/2, orig.length);
                  var tmp2 = orig.splice(0, orig.length/2);
                  for (var j = 0; j < tmp.length; j++) {
                      res.data[i].total += tmp[j].value;
                      res.data[i].details.push(tmp[j]);
                  }
                  for (var j = 0; j < tmp2.length; j++) {
                      res.data[i + num].total += tmp2[j].value;
                      res.data[i + num].details.push(tmp2[j]);
                  }

                }

            }
        }
        $scope.data=res.data;
    })

    $http.get('json/sales_with_prices.json')
        .then(function(res) {
            var items = [];

            for (var startDate = moment(yearAgo); startDate.isBefore(d); startDate.add(1, 'days')) {
                var obj = {};
                obj["date"] = moment(startDate).format("YYYY-MM-DD");
                obj["total"] = 0;
                obj["details"] = [];
                for (var i = 0; i < res.data.length; i++) {
                  if(moment(startDate).format("YYYY-MM-DD") === moment(res.data[i].date).format("YYYY-MM-DD")) {
                    for (var j = 0; j < res.data[i].details.length; j++) {
                        var tmp = {};
                        tmp['name'] = res.data[i].details[j].name;
                        tmp['value'] = res.data[i].details[j].value;
                        tmp['price'] = Math.round(res.data[i].details[j].price*(Math.random() * (0.9 - 0.8) + 0.5));
                        items.push(tmp);
                    }
                  }
                }
                if (moment(startDate).day() === 2) {
                    for (var i = 0; i < items.length; i++) {
                        obj["total"] += items[i].value;
                        obj["details"].push(items[i]);
                    }
                    items=[];
                }
                $scope.total_pur.push(obj);

            }
            $scope.pur_temp = JSON.stringify($scope.total_pur);
        })
    //###purchase###

    // $http.get('json/purchase_order.json').then(function(pu) {
    //   console.log(pu.data);
    //   $http.get('json/purchaseOrders.json').then(function(purow) {
    //     for(var i=0;i<purow.data.length;i++) {
    //       for(var j=0;j<pu.data.length;j++) {
    //         if(purow.data[i].purchase_order_number === pu.data[j].purchase_order_number) {
    //           purow.data[i]['purchase_order_date'] = pu.data[j].purchase_order_date;
    //         }
    //       }
    //     }
    //     $scope.pur_temp = JSON.stringify(purow.data);
    //   })
    // })

    // $http.get('json/pur_with_date.json').then(function(pu) {
    //   $scope.temp = [];
    //   for (var startDate = moment(yearAgo); startDate.isBefore(d); startDate.add(1, 'days')) {
    //       var obj = {};
    //       obj["date"] = moment(startDate).format("YYYY-MM-DD");
    //       obj["total"] = 0;
    //       obj["details"] = [];
    //       for (var i = 0; i < pu.data.length; i++) {
    //           if (moment(startDate).format("YYYY-MM-DD") === moment(pu.data[i].purchase_order_date).format("YYYY-MM-DD")) {
    //               //console.log(moment(startDate).format("YYYY-MM-DD") + " == " + res.data[i].sales_order_date);
    //               //not true!! need to change to money - sales_order_row_quantity*price
    //               obj["total"] += pu.data[i].purchase_order_row_quantity;
    //               var tmp = {};
    //               tmp['name'] = pu.data[i].item_number;
    //               tmp['date'] = moment(pu.data[i].purchase_order_date).format("YYYY-MM-DD");
    //               tmp['value'] = pu.data[i].purchase_order_row_quantity;
    //               tmp['price'] = parseInt(pu.data[i].updated_supplier_price,10);
    //               obj["details"].push(tmp);
    //           }
    //       }
    //       $scope.temp.push(obj);
    //
    //   }
    //   $scope.pur_temp = JSON.stringify($scope.temp);
    // })


    //##############



    //         $http.get('json/itemsExtended.json')
    //             .then(function(itemsExenteded) {
    //               $http.get('json/itemsFile.json')
    //                   .then(function(items) {
    //                     //console.log(JSON.stringify(itemsExenteded.data));
    //                       $scope.itemsExenteded = [];
    //                       $scope.itemsExenteded = itemsExenteded.data;
    //                       $scope.itemsOptionsNew = [];
    //                         $scope.itemsOptions = items.data;
    //                       for (var i=0; i<$scope.itemsExenteded.length; i++){
    // console.log($scope.itemsOptionsNew.indexOf($scope.itemsExenteded[i].item_number));
    //                           if ($scope.itemsOptionsNew.indexOf($scope.itemsExenteded[i].item_number) !== -1) {
    //
    //                             $scope.itemsOptionsNew[indexOf($scope.itemsExenteded[i].item_number)].push({"price" : $scope.itemsExenteded[i].updated_supplier_price});
    //                             console.log($scope.itemsOptionsNew[indexOf(itemsExenteded.data[i].item_number)]);
    //
    //                         }
    //                       }
    //                       //console.log($scope.itemsOptionsNew);
    //                       console.log("User = " + JSON.stringify($scope.itemsOptionsNew));
    //
    //                     });
    //                   });

    $scope.apply_view = function() {
        if ($scope.selected_view === 'sales') {
            console.log('sales');
            $http.get('json/sales_with_prices.json')
                .then(function(res) {
                    $scope.data = res.data;
                })
        } else if ($scope.selected_view === 'purchases') {
            console.log('purchases');
            $http.get('json/purch_2808.json')
                .then(function(res) {
                    $scope.data = res.data;
                })
        }
    }

    $scope.apply_view();


    //$http.get('json/sales_with_prices.json')
    //$http.get('json/pur_obj.json')
    //.then(function(res) {
    // for(var i=0;i<res.data.length;i++) {
    //   if(moment(res.data[i].date).day()>4) {
    //     res.data[i].total=0;
    //     res.data[i].details = [];
    //   }
    //   else {
    //     res.data[i].total = Math.round(res.data[i].total/20);
    //     for(var j=0;j<res.data[i].details.length;j++) {
    //       res.data[i].details[j].value = Math.round((res.data[i].details[j].value)/20);
    //       res.data[i].details[j].price = Math.round(parseInt(res.data[i].details[j].price,10)/2);
    //     }
    //   }
    // }

    // for (var i = 0; i < res.data.length; i++) {
    //     var totalSales = 0;
    //     for (var j = 0; j < res.data[i].details.length; j++) {
    //         totalSales += (res.data[i].details[j].value * res.data[i].details[j].price);
    //     }
    //     res.data[i]['total_sales'] = totalSales;
    // }
    // console.log(JSON.stringify(res.data));
    //$scope.salesOrders = res.data;
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
    //var allSales = res.data;
    // for (var i = 0; i < res.data.length; i++) {
    //     //console.log(moment(startDate).format("YYYY-MM-DD"));
    //     //console.log(moment(res.data[i].sales_order_date).format("YYYY-MM-DD"));
    //     //if (moment(startDate).format("YYYY-MM-DD") === moment(res.data[i].sales_order_date).format("YYYY-MM-DD")) {
    //     //console.log(moment(startDate).format("YYYY-MM-DD") + " == " + res.data[i].sales_order_date);
    //     var object = {};
    //     object["name"] = res.data[i].item_number;
    //     object["date"] = moment(res.data[i].sales_order_date).format("YYYY-MM-DD");
    //     object["value"] = parseInt(res.data[i].sales_order_row_quantity, 10); //not true!! need to change to money - sales_order_row_quantity*price
    //     allSales.push(object);
    //     //}
    //     //$scope.data=res.data[i].
    // }
    //console.log(allSales);
    //console.log(JSON.stringify(allSales));
    // for (var startDate = moment(yearAgo); startDate.isBefore(d); startDate.add(1, 'days')) {
    //     var obj = {};
    //     obj["date"] = moment(startDate).format("YYYY-MM-DD");
    //     obj["total"] = 0;
    //     obj["details"] = [];
    //     for (var i = 0; i < allSales.length; i++) {
    //         if (moment(startDate).format("YYYY-MM-DD") === moment(allSales[i].date).format("YYYY-MM-DD")) {
    //             //console.log(moment(startDate).format("YYYY-MM-DD") + " == " + res.data[i].sales_order_date);
    //             //not true!! need to change to money - sales_order_row_quantity*price
    //             obj["total"] += allSales[i].value;
    //             obj["details"].push(allSales[i])
    //         }
    //     }
    //     $scope.data.push(obj);
    // }
    //  console.log(JSON.stringify($scope.data));
    //$scope.data = res.data;
    //console.log(JSON.stringify($scope.data));
    // $scope.temp = [];
    // $scope.temp = res.data;
    // //console.log($scope.temp);
    // for(var i=0; i<$scope.temp.length; i++){
    //
    //   for(var j=0; j<$scope.temp[i].details.length ; j++){
    //     for(var z=0; z<$scope.itemsOptions.length; z++){
    //       if($scope.itemsOptions[z].item_number != undefined){
    //       //  console.log($scope.itemsOptions[z].item_number == undefined);
    //       if ($scope.temp[i].details[j].name ===  $scope.itemsOptions[z].item_number) {
    //         $scope.temp[i].details[j].price = $scope.itemsOptions[z].item_unit_price;
    //       //  console.log($scope.temp[i].details[j].name ==  $scope.itemsOptions[z].item_number);
    //       }
    //     }
    //     }
    //     //$scope.itemsOptionsNew.push(res.data[i].details[j].name);
    //   }
    // }
    // //console.log($scope.itemsOptionsNew);
    // console.log("User = " + JSON.stringify($scope.temp));
    //});

    // $http.get('json/purchaseOrders.json')
    //     .then(function(res) {
    //         $scope.prchsOrders = $scope.data;
    //     });

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
    $scope.GeneralCompare = function() {
        console.log('GeneralCompare has being called');
        $scope.stroke_type = 'general';
        $scope.salesFilteredData = [];
        $scope.apply_view();
        //$http.get('json/sales_with_prices.json')
        // $http.get('json/pur_obj.json')
        //     .then(function(res) {
        //         //console.log(res.data);
        //         $scope.data = res.data;
        //         //$scope.selectedForStroke = $scope.cmprItem2;
        //     });
    }

    $scope.GeneralCompareByPrice = function() {
        console.log('GeneralCompareByPrice has being called');
        $scope.stroke_type = 'price';
        $scope.salesFilteredData = [];
        $scope.apply_view();
        //$http.get('json/sales_with_prices.json')
        //    .then(function(res) {
        //console.log(res.data);
        var arrLentgh = $scope.data.length;
        for (var i = 0; i < arrLentgh; i++) {
            var tempObject = {
                date: $scope.data[i].date,
                total: 0,
                details: []
            };
            var arr2Length = $scope.data[i].details.length;
            for (var z = 0; z < arr2Length; z++) {
                tempObject.total += ($scope.data[i].details[z].value * $scope.data[i].details[z].price);
                tempObject.details.push($scope.data[i].details[z]);
                $scope.salesFilteredData.push(tempObject);
            }
        }
        //console.log($scope.salesFilteredData);
        $scope.data = $scope.salesFilteredData;
        //});
    }


    $scope.itemsCompare = function() {
        console.log('itemsCompare has being called');
        $scope.stroke_type = 'general';
        $scope.salesFilteredData = [];
        $scope.apply_view();
        //$http.get('json/sales_with_prices.json')
        //    .then(function(res) {
        //console.log(res.data);
        var arrLentgh = $scope.data.length;
        for (var i = 0; i < arrLentgh; i++) {
            var tempObject = {
                date: $scope.data[i].date,
                total: 0,
                details: []
            };
            var arr2Length = $scope.data[i].details.length;
            for (var z = 0; z < arr2Length; z++) {
                if ($scope.data[i].details[z].name === $scope.cmprItem1.item_number || $scope.data[i].details[z].name === $scope.cmprItem2.item_number) {
                    tempObject.total += $scope.data[i].details[z].value;
                    tempObject.details.push($scope.data[i].details[z]);
                }
                $scope.salesFilteredData.push(tempObject);
            }
        }
        //console.log($scope.salesFilteredData);
        $scope.data = $scope.salesFilteredData;
        $scope.selectedForStroke = $scope.cmprItem2;
        //});
    }

    $scope.itemsCompareByPrice = function() {
        console.log('itemsCompareByPrice has being called');
        $scope.stroke_type = 'price';
        $scope.salesFilteredData = [];
        $scope.apply_view();
        //$http.get('json/sales_with_prices.json')
        //    .then(function(res) {
        //console.log(res.data);
        var arrLentgh = $scope.data.length;
        for (var i = 0; i < arrLentgh; i++) {
            var tempObject = {
                date: $scope.data[i].date,
                total_sales: $scope.data[i].total_sales,
                total: 0,
                details: []
            };
            var arr2Length = $scope.data[i].details.length;
            for (var z = 0; z < arr2Length; z++) {
                if ($scope.data[i].details[z].name === $scope.cmprItem1.item_number || $scope.data[i].details[z].name === $scope.cmprItem2.item_number) {
                    tempObject.total += ($scope.data[i].details[z].value * $scope.data[i].details[z].price);
                    tempObject.details.push($scope.data[i].details[z]);
                }
                $scope.salesFilteredData.push(tempObject);
            }
        }
        $scope.data = $scope.salesFilteredData;
        $scope.selectedForStroke = $scope.cmprItem2;
        //});
    }

    // $scope.getFilteredData = function() {
    //     $scope.salesFilteredData = [];
    //     $http.get('json/salesYear.json')
    //         .then(function(res) {
    //             //console.log(res.data);
    //             var arrLentgh = res.data.length;
    //             for (var i = 0; i < arrLentgh; i++) {
    //                 var tempObject = {
    //                     date: res.data[i].date,
    //                     total: 0,
    //                     details: []
    //                 };
    //                 var arr2Length = res.data[i].details.length;
    //                 for (var z = 0; z < arr2Length; z++) {
    //                     if (res.data[i].details[z].name === $scope.item.item_number) {
    //                         tempObject.total += res.data[i].details[z].value;
    //                         tempObject.details.push(res.data[i].details[z]);
    //
    //
    //                     }
    //                     $scope.salesFilteredData.push(tempObject);
    //                 }
    //             }
    //             //console.log($scope.salesFilteredData);
    //             $scope.data = $scope.salesFilteredData;
    //         });
    // }

    $scope.removeFilteredData = function() {
            $scope.stroke_type = 'general';
            $scope.apply_view();
            $scope.item = null;
            $scope.selectedForStroke = null;
            $scope.cmprItem1 = null;
            $scope.cmprItem2 = null;
            $scope.btnDisabled = false;
            // $http.get('json/sales_with_prices.json')
            //     .then(function(res) {
            //         $scope.item = null;
            //         $scope.selectedForStroke = null;
            //         $scope.cmprItem1 = null;
            //         $scope.cmprItem2 = null;
            //         $scope.btnDisabled = false;
            //         $scope.data = res.data;
            //     });
        }
        //////////////////
});

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

    //$http.get('json/itemsFile.json')
    $http.get('json/new_items_File.json')
        .then(function(items) {
            $scope.itemsOptions = items.data;
        });


    //Math.floor((Math.random() * 10) + 1);
    //arr = arr2.splice(0, arr2.indexOf('c'));
    // $http.get('json/purch_2808.json').then(function(res) {
    //     for (var i = 0; i < res.data.length; i++) {
    //         if (res.data[i].details.length > 15) {
    //             var num = Math.floor((Math.random() * 2) + 1);
    //             var sec = [];
    //             var orig = [];
    //             orig = res.data[i].details.splice(10, res.data[i].details.length);
    //             sec = res.data[i].details.splice(0, 10);
    //             res.data[i].details = [];
    //             res.data[i].total = 0;
    //             for (var j = 0; j < sec.length; j++) {
    //                 res.data[i - num].total += sec[j].value;
    //                 res.data[i - num].details.push(sec[j]);
    //             }
    //             if (orig.length < 16) {
    //                 for (var j = 0; j < orig.length; j++) {
    //                     res.data[i].total += orig[j].value;
    //                     res.data[i].details.push(orig[j]);
    //                 }
    //             } else {
    //                 var tmp = orig.splice(orig.length / 2, orig.length);
    //                 var tmp2 = orig.splice(0, orig.length / 2);
    //                 for (var j = 0; j < tmp.length; j++) {
    //                     res.data[i].total += tmp[j].value;
    //                     res.data[i].details.push(tmp[j]);
    //                 }
    //                 for (var j = 0; j < tmp2.length; j++) {
    //                     res.data[i + num].total += tmp2[j].value;
    //                     res.data[i + num].details.push(tmp2[j]);
    //                 }
    //
    //             }
    //
    //         }
    //     }
    //     $scope.data = res.data;
    //     $scope.pur_temp = JSON.stringify($scope.data);
    // })

    //fix totals after remove duplicates
    $http.get('json/new_sales_with_prices.json').then(function(res) {
      $scope.new_data = [];
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].total = 0;
            for (var j = 0; j < res.data[i].details.length; j++) {
              res.data[i].total+=res.data[i].details[j].value;
            }
            $scope.new_data.push(res.data[i]);
        }
        $scope.pur_temp = JSON.stringify($scope.new_data);

    })


    //remove duplicates purchases
    // $http.get('json/new_sales_with_prices.json').then(function(res) {
    //   $scope.new_data = [];
    //     var items = [];
    //     var index = 0;
    //     for (var i = 0; i < res.data.length; i++) {
    //         items = [];
    //         for (var j = 0; j < res.data[i].details.length; j++) {
    //             if (items.indexOf(res.data[i].details[j].name) === -1) {
    //                 items.push(res.data[i].details[j].name);
    //                 index = j;
    //             } else {
    //                 res.data[i].details[index].value += res.data[i].details[j].value;
    //                 //res.data[i].total += res.data[i].details[j].value;
    //                 res.data[i].details.splice(j, 1);
    //
    //             }
    //         }
    //         $scope.new_data.push(res.data[i]);
    //     }
    //     $scope.pur_temp = JSON.stringify($scope.new_data);
    //
    // })

    //fix purchases prices
    // $http.get('json/purch_2808.json').then(function(res) {
    //     var items = [];
    //     var price = 0;
    //     var cur_item = '';
    //     for (var i = 0; i < res.data.length; i++) {
    //         for (var j = 0; j < res.data[i].details.length; j++) {
    //             if (items.indexOf(res.data[i].details[j].name) === -1) {
    //                 price = res.data[i].details[j].price;
    //                 cur_item = res.data[i].details[j].name;
    //                 items.push(res.data[i].details[j].name);
    //                 for (var z = 0; z < res.data.length; z++) {
    //                     for (var t = 0; t < res.data[z].details.length; t++) {
    //                         if (res.data[z].details[t].name === cur_item) {
    //                           console.log('old: ' + res.data[z].details[t].price + ' new: ' + price);
    //                             res.data[z].details[t].price = price;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     $scope.pur_temp = JSON.stringify(res.data);
    // });

    //###generate purchases
    // $http.get('json/new_sales_with_prices.json')
    //     .then(function(res) {
    //         var items = [];
    //
    //         for (var startDate = moment(yearAgo); startDate.isBefore(d); startDate.add(1, 'days')) {
    //             var obj = {};
    //             obj["date"] = moment(startDate).format("YYYY-MM-DD");
    //             obj["total"] = 0;
    //             obj["details"] = [];
    //             for (var i = 0; i < res.data.length; i++) {
    //               if(moment(startDate).format("YYYY-MM-DD") === moment(res.data[i].date).format("YYYY-MM-DD")) {
    //                 for (var j = 0; j < res.data[i].details.length; j++) {
    //                     var tmp = {};
    //                     tmp['name'] = res.data[i].details[j].name;
    //                     tmp['value'] = res.data[i].details[j].value;
    //                     tmp['price'] = Math.round(res.data[i].details[j].price*(Math.random() * (0.9 - 0.8) + 0.5));
    //                     items.push(tmp);
    //                 }
    //               }
    //             }
    //             if (moment(startDate).day() === 2) {
    //                 for (var i = 0; i < items.length; i++) {
    //                     obj["total"] += items[i].value;
    //                     obj["details"].push(items[i]);
    //                 }
    //                 items=[];
    //             }
    //             $scope.total_pur.push(obj);
    //
    //         }
    //         $scope.pur_temp = JSON.stringify($scope.total_pur);
    //     })
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
    //a script for generating a json with the total quantities for sold items
    // $http.get('json/new_itemsFile.json')
    //a script for generating a json with the total quantities for sold items
    // $http.get('json/itemsFile.json')
    //             .then(function(itemsFile) {
    //               $http.get('json/new_sales_with_prices.json')
    //                   .then(function(sales) {
    //                     //console.log(JSON.stringify(itemsExenteded.data));
    //                       $scope.items = [];
    //                       $scope.items = itemsFile.data;
    //                       $scope.sales = [];
    //                       $scope.sales = sales.data;
    //                       $scope.onlyitems = [];
    //                       $scope.itemssumofquantity = [];
    //                       for (var i=0; i<$scope.items.length; i++){
    //                         $scope.items[i]["totalquantity"]= 0;
    //                       }
    //                       for (var i=0; i<$scope.items.length; i++){
    //                         $scope.onlyitems.push($scope.items[i].item_number);
    //                       }
    //
    //                       for (var i=0; i<$scope.sales.length; i++){
    //                         for (var j=0; j<$scope.sales[i].details.length; j++){
    //                           var quantity= $scope.items[$scope.onlyitems.indexOf($scope.sales[i].details[j].name)].totalquantity;
    //                             quantity+=$scope.sales[i].details[j].value;
    //                             $scope.items[$scope.onlyitems.indexOf($scope.sales[i].details[j].name)].totalquantity=quantity;
    //                         }
    //                       }
    //                       for (var i=0; i<$scope.items.length; i++){
    //                         $scope.itemssumofquantity.push({
    //                           "item_number" :$scope.items[i].item_number,
    //                           "total_quantity" : $scope.items[i].totalquantity
    //                         });
    //                       }
    //                      console.log(JSON.stringify($scope.itemssumofquantity));
    //
    //
    //                     });
    //                   });
    //******************** script for creating an object with all the items and then for each, the total quantity
    // $http.get('json/new_sales_with_prices.json')
    // .then(function(res) {
    //   $scope.allitems = [];
    //   $scope.itemswithquantity = [];
    // for(var i=0;i<res.data.length;i++) {
    //   for(var j=0;j<res.data[i].details.length;j++) {
    //     if($scope.allitems.indexOf(res.data[i].details[j].name) === -1)
    //       $scope.allitems.push(res.data[i].details[j].name);
    //   }
    // }
    // for(var i=0;i<$scope.allitems.length;i++){
    //   var obj = {};
    //   obj["item_number"]=$scope.allitems[i];
    //   obj["total_quantity"]=0;
    //   $scope.itemswithquantity.push(obj)
    // }
    // for(var i=0;i<res.data.length;i++) {
    //   for(var j=0;j<res.data[i].details.length;j++) {
    //     for(var z=0; z<$scope.itemswithquantity.length; z++){
    //       if(res.data[i].details[j].name===$scope.itemswithquantity[z].item_number){
    //         $scope.itemswithquantity[z].total_quantity+=res.data[i].details[j].value;
    //       }
    //     }
    //   }
    // }
    //          console.log(JSON.stringify($scope.itemswithquantity));
    //  });


    //script to change prices
    // $http.get('json/itemsFile.json')
    // .then(function(res) {
    // for(var i=0;i<res.data.length;i++) {
    //       res.data[i].item_unit_price = (parseInt(res.data[i].item_unit_price,10)*3)+2;
    //   }
    //          console.log(JSON.stringify(res.data));
    //  });

    //  $http.get('json/new_items_File.json')
    //  .then(function(items) {
    //    $http.get('json/sales_with_prices.json')
    //    .then(function(sales) {
    //      for(var i=0; i<sales.data.length; i++){
    //        sales.data[i].total=0;
    //         sales.data[i].total_sales=0;
    //        for(var z=0; z<sales.data[i].details.length; z++){
    //          sales.data[i].details[z].value= Math.round((sales.data[i].details[z].value)*0.7);
    //          for(var j=0;j<items.data.length;j++) {
    //            if(sales.data[i].details[z].name === items.data[j].item_number)
    //                sales.data[i].details[z].price = items.data[j].item_unit_price;
    //              }
    //            }
    //          }
    //        console.log(JSON.stringify(sales.data));
    //      });
    //   });


    // $http.get('json/purch_2808.json')
    //     .then(function(sales) {
    //             for (var i = 0; i < sales.data.length; i++) {
    //                 var total = 0;
    //                 var total_sales = 0;
    //                 for (var z = 0; z < sales.data[i].details.length; z++) {
    //                     //  if(sales.data[i].details[z].value >=100)
    //                     sales.data[i].details[z].value = sales.data[i].details[z].value;
    //                     total += sales.data[i].details[z].value;
    //                     total_sales += (sales.data[i].details[z].value * sales.data[i].details[z].price);
    //                 }
    //                 sales.data[i].total = total;
    //                 sales.data[i].total_sales = total_sales;
    //             }
    //             $scope.pur_temp = JSON.stringify(sales.data);
    //     });

//script to change prices
// $http.get('json/itemsFile.json')
// .then(function(res) {
// for(var i=0;i<res.data.length;i++) {
//       res.data[i].item_unit_price = (parseInt(res.data[i].item_unit_price,10)*3)+2;
//   }
//          console.log(JSON.stringify(res.data));
//  });

//  $http.get('json/new_items_File.json')
//  .then(function(items) {
//    $http.get('json/sales_with_prices.json')
//    .then(function(sales) {
//      for(var i=0; i<sales.data.length; i++){
//        sales.data[i].total=0;
//         sales.data[i].total_sales=0;
//        for(var z=0; z<sales.data[i].details.length; z++){
//          sales.data[i].details[z].value= Math.round((sales.data[i].details[z].value)*0.7);
//          for(var j=0;j<items.data.length;j++) {
//            if(sales.data[i].details[z].name === items.data[j].item_number)
//                sales.data[i].details[z].price = items.data[j].item_unit_price;
//              }
//            }
//          }
//        console.log(JSON.stringify(sales.data));
//      });
//   });


//   $http.get('json/new_sales_with_prices.json')
//   .then(function(sales) {
//      for(var i=0; i<sales.data.length; i++){
//           var total=0;
//           var total_sales = 0;
//       for(var z=0; z<sales.data[i].details.length; z++){
//          if(sales.data[i].details[z].value >=100)
//             sales.data[i].details[z].value=parseInt(sales.data[i].details[z].value*0.6);
//          total+=sales.data[i].details[z].value;
//          total_sales+= (sales.data[i].details[z].value*sales.data[i].details[z].price)
//              }
//              sales.data[i].total=total;
//              sales.data[i].total_sales=total_sales;
//          }
//       console.log(JSON.stringify(sales.data));
//      });



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
        // $http.get('json/sales_with_prices.json')
        $http.get('json/new_sales_with_prices.json')
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

$scope.filerByPrice = function() {
    $scope.stroke_type = 'price';
    $scope.salesFilteredData = [];
    //$scope.apply_view();
    var file = '';
    $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
    $http.get(file)
        .then(function(res) {
            //console.log(res.data);
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
            //console.log($scope.salesFilteredData);
            $scope.data = $scope.salesFilteredData;
        });
}

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
    //$scope.apply_view();
    var file = '';
    $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
    $http.get(file)
        .then(function(res) {
            //console.log(res.data);
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
            //console.log($scope.salesFilteredData);
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
            //console.log(res.data);
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
    $scope.salesFilteredData = [];
    arrLentgh = 0;
    //$scope.apply_view();
    var file = '';
    $scope.selected_view === 'sales' ? file = 'json/new_sales_with_prices.json' : file = 'json/purch_2808.json';
    $http.get(file)
        .then(function(res) {
            //console.log(res.data);
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
            $scope.data = $scope.salesFilteredData;
            $scope.selectedForStroke = $scope.cmprItem2;
        });
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

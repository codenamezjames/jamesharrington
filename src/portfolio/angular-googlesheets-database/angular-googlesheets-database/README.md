# Angular google sheets database
This snippet is designed to get all sheets of a google sheets workbook and return them in json format using promises.  

*Note: this will only return data you can not POST or PUT data to a sheet*

    bower install angular-googlesheets-database --save

    var app = angular.module('app', ['googleSheetsDB']);


    app.controller('Ctrl', function(sheetsDB){
      sheetsDB('1Ie6BFT2mBGOxtqsqq7KhfPqDVlNazsV-OW1nTXdFCDo').then(function(d){
        console.log(d)
      })
    })

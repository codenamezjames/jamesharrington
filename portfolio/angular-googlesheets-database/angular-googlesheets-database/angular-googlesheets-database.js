angular.module('googleSheetsDB',[]).factory('sheetsDB', function($q, $http){
  var config= {
    doc:'',
    workbook:`https://spreadsheets.google.com/feeds/worksheets/{doc}/public/full?alt=json`,
    sheets:`https://spreadsheets.google.com/feeds/list/{doc}/{sheet}/public/values?alt=json`
  };

  function _getSheets(){
    var def = $q.defer();
    $http.get(config.workbook.replace('{doc}', config.doc))
    .success(function(data){
      def.resolve(data);
    });
    return def.promise;
  }

  function _sheetNameExstractor(){
    var def = $q.defer(),
        sheetNames = {};
    _getSheets()
    .then(function(data){
      angular.forEach(data.feed.entry, function(v, i){
        sheetNames[v.title.$t] = v.id.$t.substr(v.id.$t.lastIndexOf('/')+1); //pares the sheet name with the id
      });
      def.resolve(sheetNames);
    });
    return def.promise;
  }

  function _getDataSets(){
    var def = $q.defer(), 
        datas = [];
    _sheetNameExstractor().then(function(sheetNames){
      angular.forEach(sheetNames, function(sheet,i){
        datas.push($http.get(config.sheets.replace('{doc}', config.doc).replace('{sheet}', sheet)));
      });
      def.resolve(datas);
    });
    return def.promise;
  }
  
  return function returnFinalData(doc){
    config.doc = doc;
    var def = $q.defer();
    _getDataSets().then(function(arr){
      $q.all(arr).then(function(data){
        def.resolve(data);
      });
    });
    return def.promise; //An array of sheets
  }
  
});
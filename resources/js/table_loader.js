RPFC.tableLoader = (function(){
  var $table = $('#marketplace-table');
  
  var tableHeaders = ["Loan Title", "Risk", "Amount", "Term", "Av. Rate",
                     "Progress", "Time Left"]

  var createTableHTML = function(){
       var template  = $('#table-row-template').html()
       return  _.template(template, JSON.parse(RPFC.mockAjax.tableData()))
  }

  return {
    load: function(dataArray){
      $table.children('tbody').append(createTableHTML());
    },
    clear: function(){
      $table.children('tbody').empty(); 
    }
  }
})();

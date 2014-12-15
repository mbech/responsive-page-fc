RPFC.tableLoader = (function(){
  var $table = $('#marketplace-table');
  
  var tableHeaders = ["Loan Title", "Risk", "Amount", "Term", "Av. Rate",
                     "Progress", "Time Left"]

  var createRow = function(obj){
     
  }

  return {
    load: function(dataArray){
       
    },
    clear: function(){
      $table.children('tbody').empty(); 
    }
  }
})();

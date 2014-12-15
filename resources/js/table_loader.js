RPFC.tableLoader = (function(){
  var $tableTarget = $('#table-target');
  
  var tableHeaders = ["Loan Title", "Risk", "Amount", "Term", "Av. Rate",
                     "Progress", "Time Left"];

  var createTableHTML = function(data){
    //Select a table template based on current window width
    var template  = $(window).width() < 780 ?
                    $('#table-row-template-sm').html() :
                    $('#table-row-template').html();

    return  _.template(template, data)
  }

  return {
    load: function(){
      // For real page, this should be called as success callback to an 
      // earlier AJAX request, getting fresh data from the server
      // For this example, I'll use the mock data
      var data = JSON.parse(RPFC.mockAjax.tableData());

      $tableTarget.append(createTableHTML(data));
    },
    clear: function(){
      $tableTarget.empty(); 
    }
  }
})();

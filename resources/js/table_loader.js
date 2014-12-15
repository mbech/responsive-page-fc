RPFC.tableLoader = (function(){
  var $tableTarget = $('#table-target');
  
  var tableHeaders = ["Loan Title", "Risk", "Amount", "Term", "Av. Rate",
                     "Progress", "Time Left"];

  var createTableHTML = function(){
    //Select a table template based on current window width
    var template  = ($(window).width() > 780) ?
    $('#table-row-template').html() : $('#table-row-template-sm').html();

    return  _.template(template, JSON.parse(RPFC.mockAjax.tableData()))
  }

  return {
    load: function(){
      $tableTarget.append(createTableHTML());
    },
    clear: function(){
      $tableTarget.empty(); 
    }
  }
})();

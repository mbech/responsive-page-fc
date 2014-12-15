RPFC.tableLoader = (function(){
  var itemsPerPage = 5; //default, can override
  var currentPage = 0;

  var $tableTarget = $('#table-target');

  var createTableHTML = function(data){
    //Select a table template based on current window width
    //This means requires a reload on resize, but deemed preferrable to
    //checking on jQuery resize event
    var template  = $(window).width() < 780 ? 
                    $('#table-row-template-sm').html() :
                    $('#table-row-template').html();

    return  _.template(template, data)
  };

  return {
    clear: function(){
      $tableTarget.empty(); 
      return;
    },
      load: function(page){
        if (typeof page === "number"){
          currentPage = page; 
        }
        // For real page, this should be called as success callback to an 
        // earlier AJAX request, getting fresh data from the server
        // For this example, I'll use the mock data
        var data = JSON.parse(RPFC.mockAjax.tableData());
        
        // Select subset of data for pagination
        var minShownIndex = itemsPerPage * currentPage;
        var maxShownIndex = minShownIndex + itemsPerPage;
        console.log(minShownIndex);
        console.log(maxShownIndex);
        data.loans = data.loans.slice(minShownIndex, maxShownIndex);   
            
        // Clear out currently loaded data and append new subset
        this.clear();
        $tableTarget.append(createTableHTML(data));
        return data;
      },
      setItemsPerPage: function(iPerPage){
        itemsPerPage = iPerPage;     
      }
 }
})();

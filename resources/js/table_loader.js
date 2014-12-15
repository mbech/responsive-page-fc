RPFC.tableLoader = (function(){
  var serverData = {};

  // Pagination State
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
      requestServerData: function(){
        // For real page, this should be called as success callback to an 
        // earlier AJAX request, getting fresh data from the server
        // For this example, I'll use the mock data
        // Data for the table is cached in the serverData variable
        return serverData = JSON.parse(RPFC.mockAjax.tableData());
      },

      render: function(){
        // Pull out a subset of currently held serverData to render 
        var renderData = {};
        var minShownIndex = itemsPerPage * currentPage;
        var maxShownIndex = minShownIndex + itemsPerPage;
        renderData.loans = serverData.loans.slice(minShownIndex, maxShownIndex);   
            
        // Clear out currently loaded data and append new subset
        this.clear();
        $tableTarget.append(createTableHTML(renderData));
        return renderData;
      },
      setItemsPerPage: function(iPerPage){
        return itemsPerPage = iPerPage;     
      },
      getCurrentPage: function(){
        return currentPage;
      },
      setCurrentPage: function(newPage){
        if (typeof newPage === "number"){
        return currentPage = newPage;
        } else {
          return undefined; 
        }
      }
 }
})();

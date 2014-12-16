RPFC.tableLoader = (function(){
  var serverData = {};

  // Pagination settings and page state
  var totalNumOfItems;
  var itemsPerPage = 5; //default, can override
  var currentPage = 0;

  var $tableTarget = $('#table-target');
  var $paginationControllTarget = $('#pagination-control-target');

  var createTableHTML = function(data){
    //Select a table template based on current window width
    //This means requires a reload on resize, but deemed preferrable to
    //checking on jQuery resize event
    var template = $(window).width() < 780 ? 
                   $('#table-row-template-sm').html() :
                   $('#table-row-template').html();

    return  _.template(template, {rowData: data});
  };

  var createPaginationButtonHTML = function(){
    // Figure out how many pages (buttons) are needed
    var numPages = Math.ceil(totalNumOfItems / itemsPerPage);

    var template = $('#table-pagination-template').html(); 
    return _.template(template, {pages: _.range(numPages)});
  }

  //Return public API of tableLoader
  return {
    clear: function(){
      $tableTarget.empty(); 
      return;
    },
      requestServerData: function(){
        // For a real page, this would be asynchrnous (AJAX request). 
        // It would call 'render()' on success, some visual feedback on fail.
        // For this example, I'll use the mock data

        // Most recent data for the table is cached in the serverData variable
        serverData = JSON.parse(RPFC.mockAjax.tableData());
        totalNumOfItems = serverData.length;
      },

      render: function(){
        // Pull out a subset of currently held serverData to render based on
        // currently stored pagination state
        var renderData = {};
        var minShownIndex = itemsPerPage * currentPage;
        var maxShownIndex = minShownIndex + itemsPerPage;
        renderData = serverData.slice(minShownIndex, maxShownIndex);   
            
        // Clear out currently loaded data and append new subset
        this.clear();
        $tableTarget.append(createTableHTML(renderData));
      },
      setItemsPerPage: function(iPerPage){
        itemsPerPage = iPerPage;     
      },
      getCurrentPage: function(){
        return currentPage;
      },
      setCurrentPage: function(newPage){
        if (typeof newPage === "number"){
          currentPage = newPage;
        }
      },
      htmlTest: createPaginationButtonHTML
 };
})();

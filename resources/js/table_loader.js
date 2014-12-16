RPFC.tableLoader = (function(){
  var serverData = {};

  // Pagination settings and page state
  var totalNumOfItems;
  var itemsPerPage = 5; //default, can override
  var currentPage = 0;
  var numPages = 0;

  // stored jQuery selections
  var $tableTarget = $('#table-target');
  var $paginationTarget = $('#pagination-control-target');

  var createTableHTML = function(data){
    //Select a table template based on current window width
    //This means requires a reload on resize, but deemed preferrable to
    //checking on jQuery resize event
    var template = $(window).width() < 780 ? 
                   $('#table-row-template-sm').html() :
                   $('#table-row-template').html();

    return  _.template(template, {rowData: data});
  };

  // Pagination creation/render/update functionality
  var createPaginationHTML = function(){
    numPages = Math.ceil(totalNumOfItems / itemsPerPage);
    var template = $('#table-pagination-template').html(); 
    return _.template(template, {pages: _.range(numPages)});
  };

  var renderPaginationControls = function(){
    // Add html template to page
    $paginationTarget.empty().append(createPaginationHTML);
    bindPaginationControls();
    $paginationTarget.trigger('paginationChange');
     };

  var bindPaginationControls = function(){
    var $buttons = $paginationTarget.find('button');

    // Set initial current-button class based on currentPage var
    var $initialBtn= $buttons.filter(function() { 
      return $(this).data("page-num") == currentPage;
    });
    $initialBtn.addClass('current-page');
  
    // Add bindings  to buttons
    $buttons.on('click', function(e){
      var clickedPage = $(this).data('page-num');

      //special cases for 'next' and 'last' buttons
      if ( typeof clickedPage != "number") {
        if (clickedPage === "next") {
        currentPage = (currentPage === numPages - 1) ? currentPage : currentPage + 1;
        }
        if (clickedPage === "last"){
        currentPage = numPages - 1; 
        }
        $buttons.removeClass('current-page');
        $paginationTarget.find("[data-page-num=" + currentPage + "]").addClass('current-page');
      } else {
      //Handle page number button being pressed
        if ($(this).data('page-num') == currentPage){
          //Current page button clicked again, do nothing 
          return;
        }
        $buttons.removeClass('current-page');
        $(this).addClass('current-page');
        currentPage = $(this).data('page-num');
      }
    //trigger event to notify that a re-render is needed
    $(this).trigger('paginationChange');
    }); 
  };

  //Return public API of tableLoader
  return {
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
            
        // Check if it's the initial load, (target empty, no children)
        // replaceWith used instead of empty/append to prevent div collapsing 
        // and shifting window position (resembled a page reload jump).
        if ($tableTarget.children().length) {
          $tableTarget.fadeTo(250,0, function(){
            $(this).children().replaceWith(createTableHTML(renderData))
            $(this).fadeTo(250,1);
          });
        } else {
          //initial fade in
          $tableTarget.hide().append(createTableHTML(renderData)).fadeTo(500, 1);
        }
      },
      setItemsPerPage: function(iPerPage){
        itemsPerPage = iPerPage;     
        renderPaginationControls();
      },
      bindEvents: function(){
        var that = this;
        $paginationTarget.on('paginationChange', function(){
          that.render();
        });
      }
 };
})();

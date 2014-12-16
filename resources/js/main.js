// Using namespace rather than require/modules for this example page for
// simplicity
var RPFC = {};

$(document).ready(function(){
  RPFC.tableLoader.requestServerData();
  RPFC.tableLoader.setItemsPerPage(5); //Can handle any positive int
  RPFC.tableLoader.render(0);
  RPFC.tableLoader.bindEvents();
});

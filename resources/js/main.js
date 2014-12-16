// Using namespace rather than require/modules on this example page for
// simplicity
var RPFC = {};

$(document).ready(function(){
  RPFC.tableLoader.requestServerData();
  RPFC.tableLoader.setItemsPerPage(5);
  RPFC.tableLoader.render();
  RPFC.tableLoader.bindEvents();
});

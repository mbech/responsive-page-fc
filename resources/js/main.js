// Using namespace rather than require/modules for this example page for
// simplicity
var RPFC = {};

$(document).ready(function(){
  RPFC.tableLoader.setItemsPerPage(5);
  RPFC.tableLoader.load(0);
});

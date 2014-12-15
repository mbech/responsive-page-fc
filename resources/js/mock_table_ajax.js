//Object to return mocked ajax data
var mockAjax = (function(){
  var createEntry = function(initObj){
    return {
      loanTitle: initObj.loadTitle,
      risk: initObj.risk,
      amount: initObj.amount,
      term: initObj.term,
      avRate: initObj.avRate,
      progress: initObj.progress, 
      timeLeft: initObj.timeLeft
    }; 
  }

  // create return object and fill with fake data
  var data = {results:[]};
  var i = 10; 
  while (i--){
    data.results.push(createEntry({
      loanTitle: "Elevating Profits", 
      risk: "A",
      amount: "100000",
      term: 60,
      avRate: "7.7",
      progress: 80,
      timeLeft: "39 minutes"
    })); 
    data.results.push(createEntry({
      loanTitle: "Hatching Future Growth", 
      risk: "A",
      amount: "60000",
      term: 60,
      avRate: "7.3",
      progress: 100,
      timeLeft: "2 hours"
    })); 
  }

  return {
    tableData: function(){
      return JSON.stringify(data); 
    }
  };
})();

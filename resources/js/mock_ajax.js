//Object to return mocked ajax data
RPFC.mockAjax = (function(){
  var createEntry = function(loan){
    return {
      title: loan.title,
      risk: loan.risk,
      amount: loan.amount,
      term: loan.term,
      avRate: loan.avRate,
      progress: loan.progress, 
      timeLeft: loan.timeLeft
    }; 
  }

  // create return object and fill with fake data
  var data = {loans:[]};
  var i = 10; 
  while (i--){
    data.loans.push(createEntry({
      title: "Elevating Profits", 
      risk: "A",
      amount: "100,000",
      term: Math.floor(Math.random()*90),
      avRate: "7.7",
      progress: Math.floor(Math.random()*100),
      timeLeft: "39 minutes"
    })); 
    data.loans.push(createEntry({
      title: "Hatching Future Growth", 
      risk: "A",
      amount: "60,000",
      term: Math.floor(Math.random()*90),
      avRate: "7.3",
      progress: Math.floor(Math.random()*100),
      timeLeft: "2 hours"
    })); 
  }

  return {
    tableData: function(){
      return JSON.stringify(data); 
    }
  };
})();

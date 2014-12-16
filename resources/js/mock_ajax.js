//Supply mocked ajax data
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
  };

  // create return array and fill with fake data
  var data = [];
  var i = 20; 
  var titles = ["Elevating Profits", "Hatching Future Growth", "Expansion Funding", "Expansion Capital"];
  var amounts = ["100,000", "60,000", "80,000"];
  while (i--){
    data.push(createEntry({
      title: titles[Math.floor(Math.random()*titles.length)], 
      risk: "A",
      amount: amounts[Math.floor(Math.random()*amounts.length)], 
      term: Math.floor(Math.random()*90),
      avRate: "7.7",
      progress: Math.floor(Math.random()*100),
      timeLeft: "39 minutes"
    })); 
  }

  //Return public method for generating JSON 'response'
  return {
    tableData: function(){
      return JSON.stringify(data); 
    }
  };
})();

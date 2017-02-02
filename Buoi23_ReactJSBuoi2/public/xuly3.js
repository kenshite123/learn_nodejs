var fruits = ["cam", "xoài", "táo", "nho"];


ReactDOM.render(
  <div>
    {
      fruits.map(function(i){
        return(
          <h3>{i}</h3>
        );
      })
    }
  </div>
  , document.getElementById('root')
);

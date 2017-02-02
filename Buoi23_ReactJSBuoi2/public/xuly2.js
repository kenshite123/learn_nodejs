var Tinh = React.createClass({
  xuly: function(){
    console.log(this.refs.txtHoTen.value);
  },
  render: function(){
    return(
      <div>
        <input type="text" ref="txtHoTen" placeholder="Họ tên" />
        <button onClick={this.xuly}>Click me</button>
      </div>
    );
  }
});


ReactDOM.render(
  <div>
    <Tinh />
  </div>
  , document.getElementById('root')
);

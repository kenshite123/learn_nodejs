var SinhVien = React.createClass({
  getInitialState: function(){
    return({
      toan: 0,
      ly: 0
    });
  },
  clickBenTrai(){
    this.setState({
      toan: this.state.toan + 1
    });
  },
  clickBenPhai(v){
    alert(v);
  },
  render: function(){
    return(
      <div className="sv">
        <div className="hoten">{this.props.hoten}</div>
        <div className="toan">{this.state.toan}</div>
        <input type="button" value="Trái" onClick={this.clickBenTrai} />
        <input type="button" value="Phải" onClick={()=>{this.clickBenPhai(this.props.hoten)}} />
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    <SinhVien hoten="Teo"/>
    <SinhVien hoten="Ti"/>
    <SinhVien hoten="Tun"/>
  </div>,
  document.getElementById('root')
);

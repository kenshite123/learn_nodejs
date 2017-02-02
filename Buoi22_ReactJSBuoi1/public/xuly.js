var Sach = React.createClass({
  helloWorld: function(){
    alert("Hello World");
  },
  helloReactJS: function(data){
    alert(data);
  },
  render: function(){
    return(
      <h1 className="vang">
        <div onClick={this.helloWorld}>{this.props.ten}</div>
        <div onClick={()=>{this.helloReactJS(this.props.children)}}>{this.props.ten}</div>
        <div>{this.props.children}</div>
        <GiaTien gia={this.props.gia} />
      </h1>
    );
  }
});

function hello(){
  alert(1);
}

var GiaTien = React.createClass({
  render: function(){
    return(
      <div>{this.props.gia}</div>
    );
  }
});

ReactDOM.render(
  <div>
    <Sach ten="Dragon ball super" gia="100,000 đ">Songoku</Sach>
    <Sach ten="Naruto" gia="200,000 đ">Sas</Sach>
    <Sach ten="Pig" gia="300,000 đ">Heo</Sach>
  </div>,
  document.getElementById('root')
);

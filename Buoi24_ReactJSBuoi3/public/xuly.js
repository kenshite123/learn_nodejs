var List = React.createClass({
  getInitialState: function(){
    that = this;
    return {mang: ["Android", "iOS", "NodeJS"]}
  },
  add(){
    this.state.mang.push("PHP");
    this.setState(this.state);
  },
  render: function(){
    var xhtml = this.state.mang.map(function(item, index){
      return (
        <div key={index}>
          <Note>{item}</Note>
          <button>Sửa</button>
        </div>
      );
    });
    return(
      <div>
        <div id="placeAddNewNote"></div>
        <button onClick={addNewNote}>Add</button>&nbsp;&nbsp;
        <button onClick={this.add}>Add local</button>
        {xhtml}
      </div>
    );
  }
});

var that;

var InputDiv = React.createClass({
  render: function(){
    return(
      <div id="fromAdd">
        <input type="text" ref="monHoc" placeholder="Enter your name"/><br/><br/>
        <button onClick={()=>{saveNewNote(this.refs.monHoc.value)}}>Save</button>
      </div>
    )
  }
});

function saveNewNote(ten){
  that.state.mang.push(ten);
  that.setState(that.state)
}

function addNewNote(){
  ReactDOM.render(
    <div>
      <InputDiv /><br/>
    </div>,
      document.getElementById('placeAddNewNote')
  );
}

function abc(){
  alert("abc");
}

var txt = "Chính Bùi";

var Note = React.createClass({
  render: function(){
    return(
      <div>
        <h3>{this.props.children}</h3>
      </div>
    );
  }
});

var hienThiFrom = React.createClass({
  getInitialState(){
    return {onEdit: true}
  },
  render: function(){
    var xhtml;
    if(this.state.onEdit){
      xthml = <input type="text" value="123" />
    }else{
      xhtml = <p>"123456"</p>
    }
    return(
      <div>
        {xhtml}
      </div>
    )
  }
});

ReactDOM.render(
  <div>
    <hienThiFrom />
  </div>,
  document.getElementById('root2')
);

ReactDOM.render(
  <div>
    <List />
    <Note>Khoa Pham</Note>
  </div>,
  document.getElementById('root')
);

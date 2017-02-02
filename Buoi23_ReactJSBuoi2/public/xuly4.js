function SinhVien(t, n, h){
  this.hoten = t;
  this.namsinh = n;
  this.hinh = h;
}


var BaiTap = React.createClass({
  getInitialState: function(){
    return(
      mang: [
        new SinhVien('Tèo', '2000', 'TEO.png'),
        new SinhVien('Tí', '2012', 'TI.png'),
        new SinhVien('TUN', '1993', 'TUN.png'),
      ]
    );
  },
  render: function(){
    return(
      <div>
        <input type="text" ref="txtHoTen" placeholder="Họ tên" /><br/><br/>
        <input type="text" ref="txtNamSinh" placeholder="Năm sinh" /><br/><br/>
        <select ref="slHinh">
          <option value="TEO.png">Teo</option>
          <option value="TI.png">Ti</option>
          <option value="TUN.png">Tun</option>
        </select><br/><br/>
        <button>Thêm</button>

        <div id="danhsach">
          {
            this.state.mang.map(function(i){
              <h1>1111</h1>
            })
          }
          <div className="sv">
            <img src="images/TEO.png" />
            <div className="hoten">Tèo</div>
            <div className="namsinh">2000</div>
            <div className="block"></div>
          </div>
        </div>
      </div>
    );
  }
});



ReactDOM.render(
  <div>
    <BaiTap />
  </div>
  , document.getElementById('root')
);

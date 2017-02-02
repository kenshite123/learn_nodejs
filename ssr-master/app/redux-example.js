var redux = require('redux');

//pure function temp

var defaultState = {city: 'Saigon', temp: 30}

var reducer = (state=defaultState, action) =>
{
  switch (action.type) {
    case "CHANGE_CITY":
      return {...state, city: action.name};
    case "CHANGE_TEMP":
      return {...state, temp: action.temp};
    default:
      return state;
  }
}

var store = redux.createStore(reducer);
store.subscribe(function(){
  var cityName = store.getState().city;
  var temp = store.getState().temp;
  var msg = cityName + ' ' + temp;
  document.getElementById('city').innerHTML = msg;
  // document.getElementById('city').append('City is ' + cityName);
});

store.dispatch(
  {
    type: "CHANGE_CITY",
    name: "Da Nang"
  }
);

store.dispatch(
  {
    type: "CHANGE_CITY",
    name: "Hau Giang"
  }
);

store.dispatch({
  type: "CHANGE_TEMP",
  temp: 31;
});

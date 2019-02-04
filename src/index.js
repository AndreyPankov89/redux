import {createStore} from 'redux';
//import JsonService from './service/jsonService'

const reducer = (state = 0, action) => {
    switch (action.type){
        case 'INC':{
            return state +1;
        }
        case 'DEC':{
            return state - 1;
        }
  //      case 'UPL':{
    //        return action.value;
      //  }
        case 'RST':{
            return 0;
        }

        default: {
            return state
        }
    }

}

// const getRandomObject = async () =>{
//     const service = new JsonService();
//     const numbers = await service.getResource();
//     console.log(numbers);
//     return numbers[Math.floor(Math.random()*3)].const;
// }

const inc = () => ({type:'INC'});
const dec = () => ({type:'DEC'});
const rst = () => ({type:'RST'});
// const upl = async () =>{
//     const value = await getRandomObject();
//     return {type: 'UPL', value}
// };

const store = createStore(reducer);
document.getElementById('plus').addEventListener('click', ()=>{store.dispatch(inc())});
document.getElementById('minus').addEventListener('click', ()=>{store.dispatch(dec())});
document.getElementById('reset').addEventListener('click', ()=>{store.dispatch(rst())});
// document.getElementById('upload').addEventListener('click', ()=>{console.log('123');store.dispatch(upl())});

store.subscribe(() => {
     document.getElementById('counter').innerHTML = store.getState();
})
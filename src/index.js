import {createStore} from 'redux';
import JsonService from './service/jsonService'

const reducer = (state = 0, action) => {
    switch (action.type){
        case 'INC':{
            return state +1;
        }
        case 'DEC':{
            return state - 1;
        }
        case 'UPL':{
            return action.value;
        }
        case 'RST':{
            return 0;
        }

        default: {
            return state
        }
    }

}


// const getRandomObject = async () =>{
//     // const service = new JsonService();
//     // const res = await service.getResource()
//     //     .then(res =>{
//     //         return +res[Math.floor(Math.random()*3)].const;
//     //     })
    
//     // console.log(res);
//     // return res;

//     const rnd = Math.floor(Math.random() * 10);
//     let value =  await fetch('http://localhost:3004/numbers')
//         .then(res => res.json())
//         .then(res => {
//             if (rnd <= 3) {
//                 return +res[0].const;
//             } else if (rnd > 3 && rnd <= 6) {
//                 return +res[1].const;
//             } else {
//                 return +res[2].const;
//             }
//         });
//     console.log(value);
// //    const value = Math.floor(Math.random()*10)
//     const action = {type: 'UPL', value};
//     console.log(action)
//     return action;
//     return await value

// }

const inc = () => ({type:'INC'});
const dec = () => ({type:'DEC'});
const rst = () => ({type:'RST'});
const upl = (value) =>{
    return {type:'UPL', value}
};

const store = createStore(reducer);
document.getElementById('plus').addEventListener('click', ()=>{store.dispatch(inc())});
document.getElementById('minus').addEventListener('click', ()=>{store.dispatch(dec())});
document.getElementById('reset').addEventListener('click', ()=>{store.dispatch(rst())});
document.getElementById('upload').addEventListener('click', async ()=>{
    const rnd = Math.floor(Math.random() * 10);

    let value =  await fetch('./db.json')
        .then(res => res.json())
        .then(res => {
            if (rnd <= 3) {
                return +res.numbers[0].const;
            } else if (rnd > 3 && rnd <= 6) {
                return +res.numbers[1].const;
            } else {
                return +res.numbers[2].const;
            }
        });
    await store.dispatch(upl(value));

});
document.getElementById('download').addEventListener('click', async ()=>{
    const jsonService = new JsonService();
    const id = await jsonService.getLastId()+1;
    const data = {saved: store.getState(), id: id};
    jsonService.postData(data);
});

store.subscribe(() => {
     document.getElementById('counter').innerHTML = store.getState();
})
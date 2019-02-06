import React from 'react';
import {connect} from 'react-redux';
import * as acions from '../actions';
import {bindActionCreators} from 'redux';
import JsonService from '../service/jsonService';

const Counter = ({counter, inc, dec, rst, upl, dld}) => {
    return(
        <div className="container">
            <div className="counter-wrapper">
                <div className="counter">
                    {counter}
                </div>
                <div className="counter-tool">
                    <button onClick={inc} className="btn btn-plus"><img src="./img/Plus.svg" alt="plus"/></button>
                    <button onClick={dec} className="btn btn-minus"><img src="./img/Minus.svg" alt="minus"/></button>
                    <button onClick={rst} className="btn btn-reset"><img src="./img/Reset.svg" alt="reset"/></button>
                    <button onClick={upl} className="btn btn-load"><img src="./img/Upload.png" alt="reset"/></button>
                    <button onClick={dld} className="btn btn-load"><img src="./img/Download.png" alt="reset"/></button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        counter: state
    }
}

const mapDispatchToProps=(dispatch,state) => {
    const {inc, dec, rst, upl} = bindActionCreators(acions, dispatch);
    return{
        inc,
        dec,
        rst,
        upl: async () =>{
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
            await upl(value);
        },
        dld:  async ()=>{
            console.dir(state);
            debugger;
            const jsonService = new JsonService();
            const id = await jsonService.getLastId()+1;
            const data = {saved: state.counter, id: id};
            jsonService.postData(data);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
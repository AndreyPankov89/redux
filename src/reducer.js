export const reducer = (state = 0, action) => {
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
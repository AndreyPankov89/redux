
export const inc = () => ({type:'INC'});
export const dec = () => ({type:'DEC'});
export const rst = () => ({type:'RST'});
export const upl = (value) =>{
    return {type:'UPL', value}
};
let holder = "";
const SET_HOLDER = (txt) => {
    holder = txt;

};
const GET_HOLDER = () => {
    return holder

};


console.internal ={
    get : GET_HOLDER,
    set : SET_HOLDER
};
module.exports = {
  
};

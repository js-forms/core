/*
 *  For each loop with callback and scope
 */
export default (array, callback, scope) => {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, array[i], i)
    }   
};
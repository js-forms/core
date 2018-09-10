/*
*  Checks if an element has been interacted with
*/
export default (el) => {
    switch(el.type) {
        case "radio":
        case "checkbox":
            return el.checked === el.defaultChecked
        case "select-one":
        case "select-multiple":
            for (var j = 0; j < el.options.length; j++) {
                if (el.options[j].selected !=
                    el.options[j].defaultSelected) {
                    return true;
                }
            }
        default:
            return el.value !== el.defaultValue            
    }
}
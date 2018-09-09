/* 
 *  Wraps an element
 */
export default (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
}
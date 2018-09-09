/* 
 *  Creates element references from an html string
 *  Adapted from https://github.com/m3g4p0p/from-html
 */
export default (html, controller = null, options = false) => {
    const {
      refAttribute: refAttr = 'ref',
      eventAttribute: evtAttr = 'on',
      removeRefAttribute: removeRef = true,
      removeEventAttribute: removeEvt = true,
      assignToController: assign = (
        typeof options === 'boolean' ||
        typeof options === 'string'
      ) ? options : false
    } = typeof options === 'object' ? options : {}
  
    const container = document.createElement('div')
    const elementId = html[0] === '#' && html.slice(1)
    const assignProp = typeof assign === 'string' && assign
  
    container.innerHTML = elementId
      ? document.getElementById(elementId).innerHTML
      : html
    
    const refElements = container.querySelectorAll(`[${refAttr}]`)
    const evtElements = container.querySelectorAll(`[${evtAttr}]`)
    
    // Add event listeners
    Array.prototype.forEach.call(evtElements, element => {
      element
        .getAttribute(evtAttr)
        .trim()
        .split(/\s+/)
        .forEach(binding => {
          const [type, method] = binding.split(':')
          const handler = method ? ( 'bind' in controller ? controller.bind(method) : controller[method] ) : controller
  
          element.addEventListener(type, (e) => { handler(e) })
        })
  
      if (removeEvt) {
        element.removeAttribute(evtAttr)
      }
    })
  
    // Add the references to the target object
    if (assignProp) {
      controller[assignProp] = controller[assignProp] || {}
    }
  
    return Array.from(refElements).reduce((carry, element) => {
      const [, propName, asArray] = element
        .getAttribute(refAttr)
        .trim()
        .match(/(.*?)(\[\])?$/)
  
      if (removeRef) {
        element.removeAttribute(refAttr)
      }
  
      if (asArray) {
        carry[propName] = carry[propName] || []
        carry[propName].push(element)
      } else {
        carry[propName] = element
      }
  
      return carry
    }, assign === false
      ? {}
      : assignProp
        ? controller[assignProp]
        : controller
    )
  }
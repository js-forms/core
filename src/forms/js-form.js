import readProp from '../props/readProp';
import toHTML from '../dom/toHTML';

class JsForm {
    constructor(source, proto) {
        
        this.formId = proto.id || `jsForm${[...document.forms].length + 1}`

        let content = `
        <form ref="form" id="${this.formId}" on="submit:onSubmit">${source}</form>
        `
        if (proto.layout) {
            content = typeof proto.layout === 'function' ? proto.layout(content) : proto.layout
        }

        toHTML(content, this, 'refs')

        let self = this

        this.source = source
        this.proto = proto
        this.plugins = []
        this.listeners = {}

        this.proxy = new Proxy(proto, {
            set(target, key, value) {
                proto[key] = value
                return true
            },
            get(target, key) {
                if (proto.hasOwnProperty(key)) {
                    return proto[key]
                }
                return self[key]
            }
        })

        this.fire('init')
    }
    loadHTML (source, controller, ref) {
        return toHTML(source, controller || {}, ref)
    }
    bind (name) {
        return (payload) => {
            this.fire(name, payload)           
        }
    }
    fire (name, payload) {        

        this.proto && (typeof this.proto[name] === 'function') && this.proto[name](this.proxy, payload)

        // listeners
        Array.prototype.forEach.call(readProp(this, `proxy.listeners.${name}`) || [], listener => {
            return listener(payload)
        })
    }
    listen (event, callback) {
        if (!this.proxy.listeners) {
            this.proxy.listeners = {}
        }
        if (!this.proxy.listeners.hasOwnProperty(event)) {
            this.proxy.listeners[event] = []
        }
        this.proxy.listeners[event].push(callback)
    }
    use (plugin) {
        if (!plugin) { return; }

        let pluginProto = 'apply' in plugin ? plugin.apply(this.proxy) : plugin(this.proxy)

        if (pluginProto) {
            Object.keys(pluginProto).forEach( key => {
                this.proto[key] = pluginProto[key]
            })
        }
    }
    mount (target, ref) {
        this.target = target
        this.form = this.refs.form
        delete this.refs.form
        target.append(this.refs[ref] || this.form)
        this.fire('onMount')
    }
    resetForm (elements) {
        Array.prototype.forEach.call(elements, el => {            
            switch(el.type) {
                case "radio":
                case "checkbox":
                    el.checked = el.defaultChecked
                case "select-one":
                case "select-multiple":
                    el.options[j].selected = el.options[j].defaultSelected
                default:
                    el.value = el.defaultValue            
            }
        })
    }
    remove (ref) {
        ref = ref || this.form
        let parent = ref.parentNode;
        parent.removeChild(ref)
        this.fire('onRemove', ref)
    }
    onSubmit (e) {
        this.fire('onSubmit', e)
    }
}

export default (text, proto) => new JsForm(text, proto)

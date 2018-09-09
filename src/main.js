import isDirty from './dom/isDirty'
import toHTML from './dom/toHTML'
import wrap from './dom/wrap'
import readProp from './props/readProp'
import forEach from './props/forEach'

const dom = {
	isDirty,
	toHTML,
	wrap
}

const props = {
	readProp,
	forEach
}

export default {
	dom,
	props
}
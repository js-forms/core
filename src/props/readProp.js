export default (obj, str, fallback) => {
    try {
        return str.split('.').reduce( (a, b) => {
            return a[b]
        }, obj) || fallback
    } catch (e) {
        return fallback
    }
}




export default function JSONStringify(object) {
    var cache = [];
    var str = JSON.stringify(object,
        // custom replacer fxn - gets around "TypeError: Converting circular structure to JSON"
        function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }, 4);
    cache = null; // enable garbage collection
    return str;
};
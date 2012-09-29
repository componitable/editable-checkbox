var emitter = require('emitter');
var editable = require('editable');

module.exports = makeEditable;
function makeEditable(elements, options) {
    options = options || {};
    editable.forEach(elements, function (element) {
        if (element.tagName === 'input' && element.type === 'checkbox') {
            edit(element, options);
        } else {
            var els = element.getElementsByTagName('input');
            for (var i = 0; i < els.length; i++) {
                if (els[i].type === 'checkbox') {
                    edit(els[i], options);
                }
            }
        }
    });
}
emitter(makeEditable);

function edit(element, options) {
    element.addEventListener('change', function () {
        emit('update', element, element.checked);
    });
}
function emit() {
    module.exports.emit.apply(module.exports, arguments);
    editable.emit.apply(editable, arguments);
}
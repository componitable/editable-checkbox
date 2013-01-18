var emitter = require('emitter');
var editable = require('editable');
var matchesSelector = require('matches-selector');

module.exports = makeEditable;
function makeEditable(elements, options) {
    options = options || {};
    if (options.live != false && typeof elements === 'string') {
        document.addEventListener('change', function (eventArgs) {
            if (matchesSelector(eventArgs.target, elements) || matchesSelector(eventArgs.target, elements + ' *')) {
                var element = eventArgs.target.tagName.toLowerCase() === 'input' ? eventArgs.target : eventArgs.target.getElementsByTagName('input')[0];
                emit('update', element, element.checked);
            }
        }, false);
        return;
    } else if (options.live === true) {
      throw new Error('Live option only works when elements is a string.');
    }
    editable.forEach(elements, function (element) {
        if (element.tagName.toLowerCase() === 'input' && element.type.toLowerCase() === 'checkbox') {
            edit(element, options);
        } else {
            var els = element.getElementsByTagName('input');
            for (var i = 0; i < els.length; i++) {
                if (els[i].type.toLowerCase() === 'checkbox') {
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
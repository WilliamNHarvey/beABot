document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    document.getElementById('disable').addEventListener('click', check);
});
function restoreOptions() {
    chrome.storage.sync.get({
        //False is the default value when first opening the extension
        'value' : false
    }, function (items) {
        document.getElementById('disable').checked = items.value;
    });
}

function check() {
    chrome.storage.sync.set({
        'value' : document.getElementById("disable").checked
    }, function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    });
}

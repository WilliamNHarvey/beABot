
chrome.storage.sync.get({
    //False is the default value when first opening the extension
    'value' : false
}, function (items) {
    if(!items.value) {
        ignore=false;
        $(document).mousedown(function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            ignore=true;
            var ev = document.createEvent("MouseEvent");
            var el = document.elementFromPoint(e.clientX,e.clientY);
            ev.initMouseEvent(
                "click",
                true /* bubble */, true /* cancelable */,
                window, null,
                e.clientX, e.clientY, 0, 0, /* coordinates */
                false, false, false, false, /* modifier keys */
                0 /*left*/, null
            );
            el.dispatchEvent(ev);
            e.target.focus();
        });
        
        $(document).keydown(function(e) {
            e.preventDefault();
            if (e.originalEvent.keyCode == 8) {
                $(':focus').val($(':focus').val().slice(0, -1));
            }
            else if (e.originalEvent.keyCode == 13) {
                $(':focus').parent.submit();
            }
            else {
                $(':focus').val($(':focus').val() + e.originalEvent.key);
            }
            
        });
        
        ignoresubmit=false;
        $("form").on('submit', function(e) {
           if(!ignoresubmit) {
               e.preventDefault();
               ignoresubmit=true;
               $(this).submit();
               ignoresubmit=false;
           }
           
        });
    }
});


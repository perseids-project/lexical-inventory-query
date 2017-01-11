$(document).ready(
    function() {
        $("form").submit(function() {
            if ($("#token").val() == '') {
                alert("Enter a Latin word!");
                return false;
            }
            $("#results").html('<div id="tei-lemmas-loading"/>');
            teilod.getLemmas($("#token").get(0),populate_lemmas);
            return false;
        }
      
    );
    }
)

function populate_lemmas (a_lemmas) {
    if (a_lemmas.length == 0) {
        alert("Not found.");
    }
    for (var i=0; i<a_lemmas.length; i++) {
    
        $.get("http://perseids.org/queries/morpheus/lat/"+a_lemmas[i]).done(
            function(a_data) {
                var uri = $('uri',a_data).text();
                $("#results").append('<iframe src="http://data.perseus.org/collections/' + uri + '"/>');
            }
        ).fail(
            function() {alert("Unable to find urn for " + a_lemmas[i])});
    }
}

function do_query(a_query) {
    var queryui = $("meta[name='Perseus-Sparql-Endpoint']").attr("content");
    $.get(queryuri + encodeURIComponent(a_query) + "&format=json")
        .done( 
            function(data) {
                var results = [];
                if (data.results.bindings.length > 0) {
                    jQuery.each(data.results.bindings, function(i, row) {
                        results.push(row);
                    })
                }
            PerseusLD[formatter]($(a_query_elem),results);
            }).fail(
                function(){
    	           if (window.console) { console.log("Error retrieving annotations"); }
    	        });

}

function normalize(a_str) {
    a_str.replace(/[\x{00c0}\x{00c1}\x{00c2}\x{00c3}\x{00c4}\x{0100}\x{0102}]/g, 'A');
    a_str.replace(/[\x{00c8}\x{00c9}\x{00ca}\x{00cb}\x{0112}\x{0114}]/g,'E');
    a_str.replace(/[\x{00cc}\x{00cd}\x{00ce}\x{00cf}\x{012a}\x{012c}]/g,'I');
    a_str.replace(/[\x{00d2}\x{00d3}\x{00d4}\x{00df}\x{00d6}\x{014c}\x{014e}]/g,'O');
    a_str.replace(/[\x{00d9}\x{00da}\x{00db}\x{00dc}\x{0016a}\x{016c}]/g,'U');
    a_str.replace(/[\x{00c6}\x{01e2}]/g,'AE');
    a_str.replace(/[\x{0152}]/g,'OE');
    a_str.replace(/[\x{00e0}\x{00e1}\x{00e2}\x{00e3}\x{00e4}\x{0101}\x{0103}]/g,'a');
    a_str.replace(/[\x{00e8}\x{00e9}\x{00ea}\x{00eb}\x{0113}\x{0115}]/g, 'e');
    a_str.replace(/[\x{00ec}\x{00ed}\x{00ee}\x{00ef}\x{012b}\x{012d}\x{0129}]/g,'i');
    a_str.replace(/[\x{00f2}\x{00f3}\x{00f4}\x{00f5}\x{00f6}\x{014d}\x{014f}]/g, 'o');
    a_str.replace(/[\x{00f9}\x{00fa}\x{00fb}\x{00fc}\x{0016b}\x{016d}]/g, 'u');
    a_str.replace(/[\x{00e6}\x{01e3}]/g, 'ae');
    a_str.replace(/&aelig;/g, 'ae');
    a_str.replace(/[\x{0153}]/g, 'oe');
    a_str.replace(/&oelig;/g, 'oe');
    // a few lemmas have weird / in them - just drop that
    // e.g. augu/rius
    a_str.replace(/\//g,'');
    // drop trailing digits
    a_str.replace(/\d+$/,'');
    return a_str;
}

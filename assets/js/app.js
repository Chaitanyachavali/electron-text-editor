const os = require('os');

$(document).ready(function() {
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
        $("#left").toggle();
        $("#right").toggle();
    });
    $("#left").toggle();
    $("#right, #left").on('click', function() {
        $("#sidebarCollapse").trigger('click');
    });
});

function countWords(text) {
    var tow = text.match(/\S+/g);
    return {
        words: tow ? tow.length : 0,
        characters: text.length
    };
}
var textarea = document.getElementById("text");
textarea.addEventListener("input", function() {
    var response = countWords(this.value);
    $("#rcount").html(response.words);
}, false);

function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

var mem = formatBytes(os.freemem());
$("#osMod").html(os.platform());
$("#freeMem").html(mem);
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
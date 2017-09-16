// author: chaitanyachavali
// web: http://chaitanyachavali.com

const os = require('os');
const file = require('fs');
const electron = require('electron').remote;
const dialog = electron.dialog;

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

$("#newBtn").on('click', function() {
    $("#text").val('');
    $("#foName").html('Folder Name');
    $("#fiName").html('File Namee');
    $("#fiSize").html('File Size');
});

$("#saveBtn").on('click', function() {
    var content = $("#text").val();
    var check = content.replace(/ /g,'');
    if(check === '')
    {
        dialog.showErrorBox('Cannot Continue!', 'Please write something in the textarea to save.');
    }
    else
    {
        dialog.showSaveDialog((savePath) => {
            if(savePath === undefined)
            {
                console.log("Error in detecting the path to save the file");
                return;
            }
            file.writeFile(savePath, content, (error) => {
                if(error) console.log('File not saved; ' + error);
                console.log('File saved at ' + savePath);
                var stats = file.statSync(savePath);
                var fileSize = formatBytes(stats.size);
                $("#fiSize").html(fileSize);
                var splitPath = savePath.split("\\");
                $("#fiName").html(splitPath[splitPath.length - 1]);
                $("#foName").html(splitPath[splitPath.length - 2]);
            });
        });
    }
});
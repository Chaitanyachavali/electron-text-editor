// author: chaitanyachavali
// web: http://chaitanyachavali.com

const os = require('os');
const file = require('fs');
const electron = require('electron').remote;
const dialog = electron.dialog;
var currentFile;
var saveStatus;

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
    currentFile = 'none';
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
    saveStatus = false;
    var response = countWords(this.value);
    $("#rcount").html(response.words);
}, false);

function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
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
    if (saveStatus === false) {
        dialog.showErrorBox('Alert!', 'Make sure you save before continue');
    } else {
        $("#text").val('');
        $("#foName").html('Folder Name');
        $("#fiName").html('File Name');
        $("#fiSize").html('File Size');
        currentFile = 'none';
    }
});

function updateFields() {
    var stats = file.statSync(currentFile);
    var fileSize = formatBytes(stats.size);
    $("#fiSize").html(fileSize);
    var splitPath = currentFile.split("\\");
    $("#fiName").html(splitPath[splitPath.length - 1]);
    $("#foName").html(splitPath[splitPath.length - 2]);
    $('title').html(splitPath[splitPath.length - 1]);
}

$("#openBtn").on('click', function() {
    if (saveStatus === false) {
        dialog.showErrorBox('Alert!', 'Make sure you save before continue');
    } else {
        dialog.showOpenDialog((filePath) => {
            if(filePath === undefined) {
                console.log('No file selected');
            }
            file.readFile(filePath[0], 'utf-8', (error, data) => {
                if(error) console.log('Error in reading the file; ' + error);
                $("#text").val(data);
                saveStatus = true;
                currentFile = filePath[0];
                updateFields();
            });
        });
    }
});

function saveAsNewFile() {
    var content = $("#text").val();
    var check = content.replace(/ /g, '');
    if (check === '') {
        dialog.showErrorBox('Cannot Continue!', 'Please write something in the textarea to save');
    } else {
        dialog.showSaveDialog((savePath) => {
            if (savePath === undefined) {
                console.log("Error in detecting the path to save the file");
                return;
            }
            file.writeFile(savePath, content, (error) => {
                if (error) console.log('File not saved; ' + error);
                console.log('File saved at ' + savePath);
                saveStatus = true;
                currentFile = savePath;
                updateFields();
            });
        });
    }
}

$("#saveBtn").on('click', function() {
    if(currentFile === 'none') {
        saveAsNewFile();
    }
    else {
        var content = $("#text").val();
        file.writeFile(currentFile, content, (error) => {
            if (error) console.log('File not saved; ' + error);
            console.log('File saved at ' + currentFile);
            saveStatus = true;
            var stats = file.statSync(currentFile);
            var fileSize = formatBytes(stats.size);
            $("#fiSize").html(fileSize);
        });
    }
});

$("#saveAsBtn").on('click', function() {
    saveAsNewFile();
});
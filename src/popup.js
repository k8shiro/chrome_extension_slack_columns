
function addInput(url = '') {
    let div = document.createElement('div');

    let line = document.createElement('input');
    line.type = "text";
    line.value = url;
    line.className = "line";

    let delBtn = document.createElement('input');
    delBtn.type = "button";
    delBtn.value = "-";
    delBtn.onclick = function() {div.remove();}

    div.appendChild(line);
    div.appendChild(delBtn);

    let lines = document.getElementById("lines");
    lines.appendChild(div);
}

window.onload = function () {
    chrome.storage.sync.get(
        'channels',
        function(channels) {
            console.log(channels)
            for(let i = 0; i < channels['channels'].length; i++) {
                if(channels['channels'][i]){
                    addInput(channels['channels'][i])
                }
            }
        }
    );

    let submitBtn = document.getElementById("submitLine");
    submitBtn.onclick = function() {
        channels = []
        for (let line of document.getElementsByClassName('line')){
            if(line.value){
                channels.push(line.value)
            }
        }
        var formOptions = {
            channels: channels
        };
        chrome.storage.sync.set(formOptions, function(){});

    }

    let addBtn = document.getElementById("addLine");
    addBtn.onclick = function() {addInput()}
}




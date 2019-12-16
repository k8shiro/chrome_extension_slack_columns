lines = []

window.onload = function() {
    let originUrl = location.href ;
    let body = document.body;
    body.innerHTML = `
        <div id="wrapper">
            <div id="originLine" style="width:100%;" ><iframe src="${originUrl}" id="origin"></div>
        </div>
    `;

    chrome.storage.sync.get(
        {channels: []},
        function(channels) {
            for(let i = 0; i < channels['channels'].length; i++) {
                addLine('channel'+String(i), channels['channels'][i])
            }
        }
    );
};

function addLine(lineId, lineUrl) {
    lines.push(lineId)

    let element = document.createElement('div');
    element.setAttribute('class', 'element');
    element.innerHTML = `<iframe src="${lineUrl}" id="${lineId}">`

    document.getElementById("wrapper").appendChild(element)
    document.getElementById(lineId).addEventListener("load", function(){ iframeLoaded(lineId) });

    let lineWidth = 100 / (lines.length+2);
    document.getElementById("originLine").style.width = String(lineWidth*2) + '%'
    for (let element of document.getElementsByClassName('element')) {
        element.style.width = String(lineWidth) + '%'
    }

}

function iframeLoaded(lineId) {
    data1 = document.getElementById(lineId);
    data1.contentWindow.document.getElementsByClassName('p-classic_nav__team_header')[0].style.display = "none";
    data1.contentWindow.document.getElementsByClassName('p-workspace__sidebar')[0].style.display = "none";
    data1.contentWindow.document.getElementsByClassName('p-workspace--context-pane-collapsed')[0].style.gridTemplateColumns = "0px auto"
}

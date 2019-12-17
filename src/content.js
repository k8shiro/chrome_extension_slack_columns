lines = []

window.onload = function() {
    let originUrl = location.href ;
    let body = document.body;
    body.setAttribute("id", "origin")
    let newBody = document.createElement('body');
    newBody.appendChild(body)
    newBody.style.display = "flex"

    let wrapper = document.createElement('div');
    wrapper.setAttribute("id", "wrapper")
    newBody.appendChild(wrapper)

    document.documentElement.appendChild(newBody)

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

    document.getElementsByClassName("p-client")[0].style.width = '100%';
    let originWidth = 100 / (lines.length + 2) * 2;
    let wrapperWidth = 100 / (lines.length + 2) * lines.length;
    document.getElementById("origin").style.width = String(originWidth) + '%'
    document.getElementById("wrapper").style.width = String(wrapperWidth) + '%'

    lineWidth = 100 / (lines.length);
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

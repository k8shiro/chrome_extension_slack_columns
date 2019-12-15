lines = []

window.onload = function() {
    var url = location.href;
    var html_page = document.documentElement;
    var body = document.body;
    this.console.log(url)
    body.className = '';
    html_page.style.height = '100%';
    body.style.height = '100%';
    body.innerHTML = `
        <style type="text/css">
            #wrapper{
                display: flex;
                width: 100%;
                height: 100%;
            }
            .element{
                height: 100%;
            }
            iframe {
                width: 100%;
                height: 100%;
                border:0;
            }
        </style>
        <div id="wrapper">
            <div id="originLine" style="width:100%;" ><iframe src="${url}" id="origin"></div>
        </div>
    `
    
    chrome.storage.sync.get(
        {channels: []},
        function(channels) {
            console.log(channels)
            for(let i = 0; i < channels['channels'].length; i++) {
                console.log(i)
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
    //data1.contentWindow.document.getElementsByClassName('p-workspace__banner')[0].style.display = "none";
    //data1.contentWindow.document.getElementsByClassName('p-workspace__top_nav')[0].style.display = "none";
    data1.contentWindow.document.getElementsByClassName('p-classic_nav__team_header')[0].style.display = "none";
    data1.contentWindow.document.getElementsByClassName('p-workspace__sidebar')[0].style.display = "none";
    //data1.contentWindow.document.getElementsByClassName('p-workspace__secondary_view')[0].style.display = "none";
    data1.contentWindow.document.getElementsByClassName('p-workspace--context-pane-collapsed')[0].style.gridTemplateColumns = "0px auto"
}

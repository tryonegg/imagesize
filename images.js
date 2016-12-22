function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

function addInfo(image){
    // create wrapper container
    var wrapper = document.createElement('div');
    //wrapper.style.cssText = "position:relative;";

    // insert wrapper before el in the DOM tree
    image.parentNode.insertBefore(wrapper, image);

    // move el into wrapper
    var info = document.createElement("ul");
    info.innerHTML = "<li><a  style='color:#fff;text-decoration:underline;' href='" + image.currentSrc + "' target='_blank'>View Image</a></li>"
                    +"<li style='color:#fff'>Native  Size: " + image.naturalWidth+ "x" + image.naturalHeight + "</li>"
                    +"<li style='color:#fff'>Current Size: " + image.width + "x" + image.height + "</li>"
                    +"<li style='color:#fff'>Pixel Ratio: " + (Math.floor( (image.naturalWidth / image.width ) * 10 ) / 10) + "</li>"
                    +"<li style='color:#fff'>Container Size: " + image.parentElement.offsetWidth + "x" + image.parentElement.offsetHeight + "</li>"
                    +"<li style='color:#fff'>2x HiDPI Optimal: " + (image.parentElement.offsetWidth * 2) + "x" + (image.parentElement.offsetHeight * 2) + "</li>";
    info.style.cssText = "z-index:1000; position: absolute; top:0; right: 0; background: rgba(0,0,0,.5);color: #fff; padding: 10px 20px;list-style:none;";

    wrapper.appendChild(image);
    wrapper.appendChild(info);    

    request('HEAD', image.currentSrc)
        .then(function (e) {
            var size = document.createElement("li");
            size.style.color = "#fff";
            size.innerHTML = "Filesize: " + humanFileSize(e.total, true);
            this.appendChild(size);
        }.bind(info));
}

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}


(function () {
  var links = document.querySelectorAll("img");
  for (var i  = 0; i < links.length; ++i) {
    if(links[i].width > 0){
        addInfo(links[i]);
    }
  }
})();
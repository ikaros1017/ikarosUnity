function $(element){
    return document.querySelector(element);
}

function readimg(imgFile,img){
    $(imgFile).onchange = function () {
        if (this.files.length) {
            let file = this.files[0];
            let reader = new FileReader();
            reader.onload = function () {
                $(img).src = this.result;
            };
            reader.readAsDataURL(file);
        }
    }
}

Number.prototype.addZero = function(l){
    let s = '';
    for(let i = this.toString().length; i < l; i++){
        s += '0'
    }
    s += this;
    return s
}

Element.prototype.rotation = function (imgArr,t) {
    let r = this;
    let timer;
    let rWidth = r.clientWidth;
    let HTMLStr = ` <div style="transform: translateX(${-rWidth}px);">
        <div style="width:${rWidth}px">
            <img src="${imgArr[imgArr.length-1]}">
        </div>
        `
    for (let i = 0; i < imgArr.length; i++) {
        HTMLStr += `
        <div style="width:${rWidth}px">
        <img src="${imgArr[i]}">
        </div>`
    }
    HTMLStr += `<div style="width:${rWidth}px">
        <img src="${imgArr[0]}">
        </div>
        </div>
        <ul>
        `
    for (let i = 0; i < imgArr.length; i++) {
        if (i == 0) {
            HTMLStr += `
        <li index='${i}' class="active"></li>`
        } else {
            HTMLStr += `
        <li index='${i}'></li>`
        }

    }
    HTMLStr += `</ul>
                <div class="left">
                    <div></div>
                </div>
                <div class="right">
                    <div></div>
                </div> `
    r.innerHTML = HTMLStr;
    let index = 0;
    let pdz = 0 - r.children[0].clientWidth + rWidth;
    let r_left = -rWidth;
    autoplay(t)
    r.children[2].onclick = left;
    r.children[3].onclick = right;

    r.onmouseover = () => {
        clearInterval(timer)
    };
    r.onmouseout = () => {
        autoplay(5000)
    };
    r.children[1].children[0].onclick = liC;
    r.children[1].children[1].onclick = liC;
    r.children[1].children[2].onclick = liC;

    function liC(e) {
        let index = Number(e.target.attributes[0].value);
        for (let i = 0; i < 3; i++) {
            r.children[1].children[i].className = '';
        }
        r.children[1].children[index].className = 'active';
        r_left = (index + 1) * -rWidth;
        r.children[0].style.transition = `transform .3s`;
        r.children[0].style.transform = `translateX(${r_left}px)`;
    }

    function autoplay(t) {
        timer = setInterval(() => {
            if (r_left <= pdz) {
                r.children[0].style.transition = `transform 0s`;
                r.children[0].style.transform = `translateX(${-rWidth}px)`;
                r_left = -rWidth;
                index++;
                for (let i = 0; i < 3; i++) {
                    r.children[1].children[i].className = '';
                }
                r.children[1].children[index].className = 'active';
                setTimeout(() => {
                    r_left -= rWidth;
                    r.children[0].style.transition = `transform .3s`;
                    r.children[0].style.transform = `translateX(${r_left}px)`;
                }, 0);
            } else {
                r_left -= rWidth;
                r.children[0].style.transition = `transform .3s`;
                r.children[0].style.transform = `translateX(${r_left}px)`;
                index++;
                for (let i = 0; i < 3; i++) {
                    r.children[1].children[i].className = '';
                }
                if (index == 3) {
                    index = 0;
                }
                r.children[1].children[index].className = 'active';
            }
        }, t);
    }

    function left() {
        for (let i = 0; i < 3; i++) {
            r.children[1].children[i].className = '';
        }
        if (index == 0) {
            index = 2;
            r_left = 0;
            r.children[0].style.transition = `transform .3s`;
            r.children[0].style.transform = `translateX(${r_left}px)`;
            setTimeout(() => {
                r_left = pdz + rWidth;
                r.children[0].style.transition = `transform 0s`;
                r.children[0].style.transform = `translateX(${r_left}px)`;
            }, 301);
        } else {
            index--;
            r_left = (index + 1) * -rWidth;
            r.children[0].style.transition = `transform .3s`;
            r.children[0].style.transform = `translateX(${r_left}px)`;
        }
        r.children[1].children[index].className = 'active';
    }

    function right() {
        for (let i = 0; i < 3; i++) {
            r.children[1].children[i].className = '';
        }
        if (index == 2) {
            index = 0;
            r_left = pdz;
            r.children[0].style.transition = `transform .3s`;
            r.children[0].style.transform = `translateX(${r_left}px)`;
            setTimeout(() => {
                r_left = -rWidth;
                r.children[0].style.transition = `transform 0s`;
                r.children[0].style.transform = `translateX(${r_left}px)`;
            }, 301);
        } else {
            index++;
            r_left = (index + 1) * -rWidth;
            r.children[0].style.transition = `transform .3s`;
            r.children[0].style.transform = `translateX(${r_left}px)`;
        }
        r.children[1].children[index].className = 'active';
    }
}
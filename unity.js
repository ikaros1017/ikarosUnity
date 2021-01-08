//$()获取原生元素对象
function $(element) {
    return document.querySelector(element);
}

//在当前页面显示上传的img图片
function readimg(imgFile, img) {
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

//返回x位数字，以0补位
Number.prototype.addZero = function (x) {
    let s = '';
    for (let i = this.toString().length; i < x; i++) {
        s += '0'
    }
    s += this;
    return s
}

//自动生产轮播图
Element.prototype.rotation = function (imgArr, t) {
    let r = this; //轮播图容器
    let timer; //定时器
    let rWidth = r.clientWidth; //容器宽度
    //拼接字符串
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
    HTMLStr += `    <div style="width:${rWidth}px">
                        <img src="${imgArr[0]}">
                    </div>
                </div>
                <ul>
        `
    for (let i = 0; i < imgArr.length; i++) {
        if (i == 0) {
            HTMLStr += `<li index='${i}' class="active"></li>`
        } else {
            HTMLStr += `<li index='${i}'></li>`
        }

    }
    HTMLStr += `</ul>
                <div class="left">
                </div>
                <div class="right">
                </div> `
    r.innerHTML = HTMLStr;

    let index = 0; //图片索引
    let pdz = 0 - r.children[0].clientWidth + rWidth; //判断值
    let r_left = -rWidth; //当前向左移动的值
    autoplay(t) // 执行轮播函数
    r.children[2].onclick = left; //左按钮绑定
    r.children[3].onclick = right; //右按钮绑定
    //鼠标移入清除定时器
    r.onmouseover = () => {
        clearInterval(timer)
    };
    //鼠标移出打开定时器
    r.onmouseout = () => {
        autoplay(t)
    };
    //li元素绑定点击事件
    for (let i = 0; i < imgArr.length; i++) {
        r.children[1].children[i].onclick = liC;
    }

    //li元素点击事件
    function liC(e) {
        let index = Number(e.target.attributes[0].value);//点击的li元素index索引值
        //清空active类名
        clearClass();
        //赋予类名
        r.children[1].children[index].className = 'active';
        //移动的值
        r_left = (index + 1) * -rWidth;
        r.children[0].style.transition = `transform .3s`;
        r.children[0].style.transform = `translateX(${r_left}px)`;
    }

    //轮播函数
    function autoplay(t) {
        timer = setInterval(() => {
            if (r_left <= pdz) {
                r.children[0].style.transition = `transform 0s`;
                r.children[0].style.transform = `translateX(${-rWidth}px)`;
                r_left = -rWidth;
                index++;
                //清空active类名
                clearClass();
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
                //清空active类名
                clearClass();
                if (index == 3) {
                    index = 0;
                }
                r.children[1].children[index].className = 'active';
            }
        }, t);
    }

    //左按钮函数
    function left() {
        //清空active类名
        clearClass();
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

    //右按钮函数
    function right() {
        //清空active类名
        clearClass();
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

    //清空active类名
    function clearClass(){
        for (let i = 0; i < imgArr.length; i++) {
            r.children[1].children[i].className = '';
        }
    }
}
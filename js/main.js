// js/main.js

// 小屏幕打开 / 关闭左侧导航栏
function openNav() {
    var menu = document.getElementById("layout-menu");
    if (window.innerWidth <= 992 && menu) {
        menu.classList.toggle("open");
    }
}

// 预留的关闭函数（目前没用到，可以在将来调用）
function closeNav() {
    var menu = document.getElementById("layout-menu");
    if (window.innerWidth <= 992 && menu) {
        menu.classList.remove("open");
    }
}

// 自动填充 footer 中的 "Last edited ..." 文本
function updateLastEdited() {
    var el = document.getElementById("last-edited");
    if (!el) return;

    var d = new Date(document.lastModified);
    if (isNaN(d.getTime())) return;

    var monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    var m = monthNames[d.getMonth()];
    var y = d.getFullYear();
    var day = d.getDate();

    function suffix(n) {
        if (n % 10 === 1 && n % 100 !== 11) return "st";
        if (n % 10 === 2 && n % 100 !== 12) return "nd";
        if (n % 10 === 3 && n % 100 !== 13) return "rd";
        return "th";
    }

    var hh = d.getHours();
    var mm = d.getMinutes();
    if (mm < 10) mm = "0" + mm;

    el.textContent =
        "Last edited on " + m + " " + day + suffix(day) + " " + y +
        " " + hh + ":" + mm + ".";
}

// DOM 加载完成后自动执行
document.addEventListener("DOMContentLoaded", updateLastEdited);

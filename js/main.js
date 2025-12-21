// js/main.js

// 和 CSS 中的断点保持一致：<= 992px 视为“小屏幕”
var NAV_BREAKPOINT = 992;

// 小屏幕打开 / 关闭左侧导航栏
function openNav() {
    var menu = document.getElementById("layout-menu");
    if (!menu) return;

    // 大屏幕不需要汉堡逻辑
    if (window.innerWidth > NAV_BREAKPOINT) {
        return;
    }

    // 这次点击前，导航是否是关闭状态？
    var willOpen = !menu.classList.contains("open");

    // 切换 open class（控制 display:block / none）
    menu.classList.toggle("open");

    // 如果是“打开导航栏”，自动滚动到页面顶部，保证导航栏可见
    if (willOpen) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"   // 平滑滚动，看起来更自然
        });
    }
}

// 预留的关闭函数（目前没地方直接调用，但保留没坏处）
function closeNav() {
    var menu = document.getElementById("layout-menu");
    if (!menu) return;

    if (window.innerWidth > NAV_BREAKPOINT) {
        return;
    }
    menu.classList.remove("open");
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

// DOM 加载完成后自动更新 footer 时间
document.addEventListener("DOMContentLoaded", updateLastEdited);

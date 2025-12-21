// js/main.js

// 和 CSS 中的断点保持一致：<= 992px 视为“小屏幕”
var NAV_BREAKPOINT = 992;

// 统一管理所有导航项，只在这里改一次就行
// id 对应各页面 <body data-page="...">
var NAV_ITEMS = [
    { id: "index",        href: "index.html",        label: "About" },
    { id: "experience",   href: "experience.html",   label: "Experience" },
    { id: "teaching",     href: "teaching.html",     label: "Teaching" },
    { id: "publications", href: "publications.html", label: "Publications" },
    { id: "activities",   href: "services.html",     label: "Activities" }
];

// 根据 NAV_ITEMS 构建左侧导航
function buildNav() {
    var menu = document.getElementById("layout-menu");
    if (!menu) return;

    // 当前页面 id，从 <body data-page="..."> 读取
    var currentId = document.body.dataset.page || "";

    var html = "";
    for (var i = 0; i < NAV_ITEMS.length; i++) {
        var item = NAV_ITEMS[i];
        var isCurrent = (item.id === currentId);
        html +=
            '<div class="menu-item">' +
                '<a href="' + item.href + '"' +
                    (isCurrent ? ' class="current"' : '') +
                '>' + item.label + '</a>' +
            '</div>\n';
    }

    menu.innerHTML = html;
}

// 小屏幕打开 / 关闭导航栏
function openNav() {
    var menu = document.getElementById("layout-menu");
    if (!menu) return;

    // 大屏幕不需要折叠导航
    if (window.innerWidth > NAV_BREAKPOINT) {
        return;
    }

    var willOpen = !menu.classList.contains("open");

    menu.classList.toggle("open");

    // 如果是这次要“打开”，则滚回顶部，保证导航能看到
    if (willOpen) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

// 预留的关闭函数
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

// DOM 加载完成后：生成导航 + 更新时间
document.addEventListener("DOMContentLoaded", function () {
    buildNav();
    updateLastEdited();
});

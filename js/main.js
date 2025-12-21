// js/main.js

// 和 CSS 中的断点保持一致：<= 992px 视为“小屏幕”
var NAV_BREAKPOINT = 992;

// 统一管理所有导航项，只在这里改一次就行
// id 对应各页面 current 标记使用
var NAV_ITEMS = [
    { id: "index",        href: "index.html",        label: "About" },
    { id: "experience",   href: "experience.html",   label: "Experience" },
    { id: "publications", href: "publications.html", label: "Publications" },
    { id: "teaching",     href: "teaching.html",     label: "Teaching" },
    { id: "services",     href: "services.html",     label: "Services" },
    { id: "activities",   href: "activities.html",     label: "Activities" }
];

// 在 HTML 解析时，直接向 #layout-menu 里写入导航 HTML
// currentId 由每个页面传入，例如 writeNav('index')
function writeNav(currentId) {
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
    document.write(html);
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

// 预留的关闭函数（暂时没用到）
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

/* ============ 一键复制邮箱 ============ */

// 统一的小提示气泡
function showToast(message) {
    var toast = document.getElementById("copy-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "copy-toast";
        toast.className = "copy-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");

    // 如果之前有定时器，先清掉
    if (toast._hideTimer) {
        clearTimeout(toast._hideTimer);
    }
    toast._hideTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 1500); // 1.5s 后淡出
}

// 通用复制函数
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // 现代浏览器
        navigator.clipboard.writeText(text).then(function () {
            showToast("Email copied to clipboard.");
        }).catch(function () {
            fallbackCopyText(text);
        });
    } else {
        // 旧浏览器走兜底
        fallbackCopyText(text);
    }
}

// 旧浏览器的兜底方案
function fallbackCopyText(text) {
    var input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
        document.execCommand("copy");
        showToast("Email copied to clipboard.");
    } catch (e) {
        showToast("Your browser does not support automatic copy. Please copy it manually.");
    }
    document.body.removeChild(input);
}

// 给 index 页面用的复制邮箱函数
function copyEmail() {
    copyToClipboard("yanszhang7-c@my.cityu.edu.hk");
}

// DOM 加载完成后：只负责更新时间
document.addEventListener("DOMContentLoaded", updateLastEdited);

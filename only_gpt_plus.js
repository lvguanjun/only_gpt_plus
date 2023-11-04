// ==UserScript==
// @name         Only Gpt Plus
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Toggle visibility of links without class "plus"
// @author       lvguanjun
// @match        https://chat-shared2.zhile.io/shared.html*
// @match        https://chat-shared3.zhile.io/shared.html*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // 初始隐藏不包含 "plus" 的元素
    hideNonPlus();

    // 在用户脚本中添加样式
    let style = document.createElement('style');
    style.innerHTML = `
    @keyframes shine-animation {
        0% {
            box-shadow: 0 0 3px 2px gold;
        }
        50% {
            box-shadow: 0 0 7px 6px gold;
        }
        100% {
            box-shadow: 0 0 3px 1px gold;
        }
    }

    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 30% 50%;
        }
    }

    .gradient {
        background-size: 200% 200%;
        background-image: linear-gradient(45deg, #007BFF, #24C6DC, #FFD700, #24C6DC, #007BFF);
    }

    .animate-gradient {
        animation: gradient-animation 2s ease-in-out forwards;
    }

    .gradient-shine {
        animation: gradient-animation 2s ease-in-out forwards, shine-animation 3s ease-in-out infinite;
    }
`;
    document.head.appendChild(style);

    // 创建一个按钮
    let button = document.createElement('button');
    button.innerText = 'PLUS';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    button.style.padding = '15px 25px';
    button.style.fontSize = '10px';
    button.style.border = 'none';
    button.style.borderRadius = '50px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    button.style.transition = 'all 0.3s ease';

    button.classList.add('gradient')
    button.classList.add('gradient-shine');

    // 鼠标悬停效果
    button.onmouseover = function () {
        button.style.transform = 'scale(1.05) translateY(-5px)';
        button.style.boxShadow = '0 7px 20px rgba(0,0,0,0.3)';
    }

    // 鼠标移出效果
    button.onmouseout = function () {
        button.style.transform = 'scale(1) translateY(0)';
        button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    }

    // 将按钮添加到页面上
    document.body.appendChild(button);

    button.onclick = toggleNonPlus;

    function hideNonPlus() {
        document.querySelectorAll('li > a:not(.plus)').forEach(e => {
            e.parentNode.style.display = 'none';
        });
    }

    function showNonPlus() {
        document.querySelectorAll('li > a:not(.plus)').forEach(e => {
            e.parentNode.style.display = '';
        });
    }

    function toggleNonPlus() {
        let firstNonPlus = document.querySelector('li > a:not(.plus)');
        if (firstNonPlus && firstNonPlus.parentNode.style.display === 'none') {
            showNonPlus();
            button.classList.remove('gradient-shine');
            setTimeout(() => {
                button.classList.add('animate-gradient');
            }, 0);
        } else {
            hideNonPlus();
            button.classList.remove('animate-gradient');
            setTimeout(() => {
                button.classList.add('gradient-shine');
            }, 0);
        }
    }

    const originalSwalFire = Swal.fire;

    // 覆盖Swal.fire函数
    Swal.fire = function (settings) {
        // 检查是否为特定的调用
        if (settings.title === '请珍惜账号' && settings.icon === 'warning') {
            // 不要执行此Swal.fire调用
            console.log('Blocked Swal.fire with title: 请珍惜账号');
            return;
        }
        // 否则，调用原始Swal.fire函数
        return originalSwalFire.apply(this, arguments);
    };
})();

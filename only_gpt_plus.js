// ==UserScript==
// @name         Only Gpt Plus
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Toggle visibility of links without class "plus"
// @author       lvguanjun
// @match        https://chat-shared2.zhile.io/shared.html*
// @match        https://chat-shared3.zhile.io/shared.html*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // Add custom styles to the user script
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shine-animation {
            0% { box-shadow: 0 0 3px 2px gold; }
            50% { box-shadow: 0 0 7px 6px gold; }
            100% { box-shadow: 0 0 3px 1px gold; }
        }

        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 30% 50%; }
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

        .flex-list li:not(:has(.plus)) {
            display: none;
        }

        .flex-list.show-non-plus li:not(:has(.plus)) {
            display: list-item;
        }
    `;
    document.head.appendChild(style);

    // Create a button
    const button = document.createElement('button');
    button.innerText = 'PLUS';
    button.style.cssText = `
        position: fixed; top: 10px; right: 10px; z-index: 1000;
        padding: 15px 25px; font-size: 10px; border: none;
        border-radius: 50px; color: white; cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;
    `;
    button.classList.add('gradient', 'gradient-shine');

    // Mouse hover effects
    button.onmouseover = () => {
        button.style.cssText += 'transform: scale(1.05) translateY(-5px); box-shadow: 0 7px 20px rgba(0,0,0,0.3);';
    };

    button.onmouseout = () => {
        button.style.cssText += 'transform: scale(1) translateY(0); box-shadow: 0 5px 15px rgba(0,0,0,0.2);';
    };

    // Append the button to the page
    document.body.appendChild(button);

    // Function to toggle visibility of non-plus elements and change button style
    button.onclick = () => {
        const flexList = document.querySelector('.flex-list');
        flexList.classList.toggle('show-non-plus');

        if (flexList.classList.contains('show-non-plus')) {
            button.classList.remove('gradient-shine');
            setTimeout(() => {
                button.classList.add('animate-gradient');
            }, 0);
        } else {
            button.classList.remove('animate-gradient');
            setTimeout(() => {
                button.classList.add('gradient-shine');
            }, 0);
        }
    };

    // Override Swal.fire function for specific calls
    const originalSwalFire = Swal.fire;
    Swal.fire = function (settings) {
        if (settings.title === '请珍惜账号' && settings.icon === 'warning') {
            console.log('Blocked Swal.fire with title: 请珍惜账号');
            return;
        }
        return originalSwalFire.apply(this, arguments);
    };
})();

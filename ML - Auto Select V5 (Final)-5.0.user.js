// ==UserScript==
// @name         ML - Auto Select V5 (Final)
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Seleciona itens sem promoção "ATIVA" e rola para o final da página.
// @author       jny
// @match        https://*.mercadolivre.com.br/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createButton() {
        const oldBtn = document.getElementById('btn-auto-select-ml');
        if (oldBtn) oldBtn.remove();

        const btn = document.createElement('button');
        btn.id = 'btn-auto-select-ml';
        btn.innerHTML = '✅ Selecionar itens SEM "ATIVA"';
        btn.style.position = 'fixed';
        btn.style.top = '140px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';
        btn.style.padding = '12px 20px';
        btn.style.backgroundColor = '#00a650';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '6px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = 'bold';
        btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        btn.style.fontSize = '14px';

        btn.onclick = function() {
            selectItems();
        };

        document.body.appendChild(btn);
    }

    function selectItems() {
        let count = 0;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(chk => {
            let parent = chk.parentElement;
            let productRow = null;
            let levels = 0;

            while (parent && levels < 8) {
                if (parent.querySelector('img')) {
                    productRow = parent;
                    break;
                }
                parent = parent.parentElement;
                levels++;
            }

            if (productRow) {
                const rowText = productRow.innerText.toUpperCase();
                const isHeader = productRow.closest('thead');
                const isRealProduct = rowText.includes('R$') || rowText.includes('ESTOQUE') || rowText.includes('UNIDADE');

                if (!isHeader && isRealProduct) {
                    if (!rowText.includes('ATIVA')) {
                        if (!chk.checked) {
                            chk.click();
                            count++;
                        }
                        productRow.style.transition = "background 0.5s";
                        productRow.style.backgroundColor = "#fff9c4";
                    }
                }
            }
        });

        if (count > 0) {
            showToast(`${count} itens selecionados! Indo para o rodapé...`);
        } else {
            showToast('Nenhum item novo. Indo para o rodapé...');
        }

        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 300);
    }

    function showToast(text) {
        const oldToast = document.getElementById('ml-toast-msg');
        if(oldToast) oldToast.remove();

        const msg = document.createElement('div');
        msg.id = 'ml-toast-msg';
        msg.innerText = text;
        msg.style.position = 'fixed';
        msg.style.top = '140px';
        msg.style.right = '240px';
        msg.style.background = 'rgba(0,0,0,0.85)';
        msg.style.color = '#fff';
        msg.style.padding = '12px 20px';
        msg.style.borderRadius = '6px';
        msg.style.zIndex = '10000';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }

    setInterval(() => {
        if (!document.getElementById('btn-auto-select-ml')) {
            createButton();
        }
    }, 2000);
})();
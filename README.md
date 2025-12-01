# script-mercadolivre-promocoes
Automação em JavaScript para agilizar a seleção em massa de itens na central de promoções do Mercado Livre.

Script desenvolvido em JavaScript (para Tampermonkey) que automatiza o processo de seleção de anúncios na Central de Promoções do Mercado Livre.

## 🎯 O Problema
A interface padrão do Mercado Livre exige que o vendedor procure manualmente em diversas páginas quais anúncios *não* estão participando de promoções para ativá-los, misturando-os com anúncios que já possuem a tag "ATIVA". Em grandes contas (20+ páginas), esse processo manual é lento e propenso a erros.

## 🚀 A Solução
Este userscript injeta uma funcionalidade na página que:
1.  Identifica visualmente linhas de produtos (ignorando cabeçalhos).
2.  Verifica a existência da tag "ATIVA".
3.  **Seleciona automaticamente** apenas os checkboxes dos produtos sem promoção.
4.  Realiza **scroll automático** até o rodapé para agilizar a navegação para a próxima página.

## 🛠️ Tecnologias
* JavaScript (ES6+)
* DOM Manipulation
* Tampermonkey API

## 📦 Como usar
1.  Instale a extensão [Tampermonkey](https://www.tampermonkey.net/) no seu navegador.
2.  Crie um novo script e cole o código do arquivo `script.js` deste repositório.
3.  Acesse a aba de Promoções do Mercado Livre.
4.  Clique no botão "✅ Selecionar itens SEM ATIVA".

## ⚠️ Nota
O script foi desenvolvido com "travas de segurança" (seleção manual de página) para evitar bloqueios por comportamento de bot (rate limiting) na plataforma.

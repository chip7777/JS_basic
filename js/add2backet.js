const basketCounter = document.querySelector('.header__backet-counter');
document.querySelectorAll('.catalog__item-button').forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        let card = evt.target;
        while(card.tagName != 'LI') card = card.parentElement; 
        const tName = card.querySelector('.catalog__item-title').textContent;
        const cost = card.querySelector('.catalog__item-cost').textContent;
        basket.add2backet(tName, parseInt(cost.slice(1)));
    });
});

const basketPage = document.querySelector('.basket');
document.querySelector('.header__backet').addEventListener('click', () => {
    basketPage.classList.toggle('hidden');
});

class backetType {
    constructor () {
        this.count = 0;
        this.totalCost = 0;
        this.goods = [];
    }

    add2backet(itemName,cost) {
        
        const el = this.goods.find((element) => {
            return (element.itemName == itemName);
        }); 
        if (!el) {
            this.goods.push({itemName, cost, count : 1});
        } else {
            el.count++;
        }
        this.count++;
        basketCounter.textContent = this.count;
        this.totalCost += cost;
        basket.showBasket();
    }

    showBasket () {
        let goodsPos = '';
        for (let i = 0; i < this.goods.length; i++) {
            let goodsCurPos = '<div class="basketRow">';
                    goodsCurPos += `<div>${this.goods[i].itemName}</div>`;
                    goodsCurPos += `<div>${this.goods[i].count}</div>`;
                    goodsCurPos += `<div>${this.goods[i].cost}</div>`;
                    goodsCurPos += `<div>${this.goods[i].count
                        * this.goods[i].cost}</div>`;
                goodsCurPos += '</div>';
            goodsPos += goodsCurPos; 
        }
        const html = `
        <div class="basketRow basketHeader">
            <div>Название товара</div>
            <div>Количество</div>
            <div>Цена за шт.</div>
            <div>Итого</div>
        </div>
        ${goodsPos}            
        <div class="basketTotal">
            Товаров в корзине на сумму:
            $<span class="basketTotalValue">${this.totalCost}</span>
        </div>`;
        basketPage.innerHTML = html;
        console.log(this);
    }
}
const basket = new backetType();

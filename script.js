import {products} from './dict.js';
import {selectOptions_categories} from './dict.js';
import {selectOptions_weights} from './dict.js';
import {selectOptions_default} from './dict.js';




function goBack() {
  window.history.back();
}
let current_page = "index";
localStorage.setItem('current_page',  JSON.stringify(current_page));

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop) {
    // Прокрутка вниз
    header.style.transform = 'translateY(-100%)';
  } else {
    // Прокрутка вверх
    header.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollTop;
});

//localStorage.setItem('products', JSON.stringify(products));

function assignCategory() {
  // Получаем все контейнеры с товарами
  const allItems = document.querySelectorAll('.item');

  allItems.forEach(itemElement => {
    const itemProductId = itemElement.getAttribute('data-product-id');
    const product = products.find(product => product.id === itemProductId);
    if (product) {
      itemElement.setAttribute('data-category', product.categories.join(','));
    }
      });
}

function assignCheckboxBlocks() {
  // Получаем все контейнеры с товарами
  const cb_item = document.querySelector('.cb_items_div');



  cb_item.insertAdjacentHTML('beforeend',`<div class="cb_item">
  <input type="checkbox" id="checkbox1" name="category" value="all" onchange="handleCheckboxChange(this)">
  <label for="checkbox1">все торты</label><br>
  </div>${selectOptions_categories.map((option_value, index) => `<div class="cb_item">
  <input type="checkbox" id="checkbox${index + 2}" name="category" value="${option_value.name}" onchange="handleCheckboxChange(this)">
  <label for="checkbox${index + 2}">${option_value.name}</label><br>
  </div>`).join('')}`);
};

function showProductInCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  let products_amount = 0;

  for (const itemId in cart) {
    ;
    const product_in_cart_amount_block = document.querySelector(`.product_in_cart_amount[id="${itemId}"]`);

    if (product_in_cart_amount_block) {
      product_in_cart_amount_block.textContent = `${cart[itemId]}`;
      product_in_cart_amount_block.style.display = 'block';
      }
  }
}

function showCartAmount() {
  const cart_amount_block = document.getElementById('cart_amount');
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  let products_amount = 0;

  for (const itemId in cart) {
    products_amount += parseInt(cart[itemId]);

  }
  if (cart_amount_block) {
    if (products_amount === 0) {
      cart_amount_block.style.display = 'none';
      } else {
      cart_amount_block.style.display = 'block';
      cart_amount_block.textContent = `${products_amount}`;
      };
    }
}

function getOrderButtons() {

  // Получаем все кнопки "Заказать"
  const orderButtons = document.querySelectorAll('.btn_order');

  // Обработчик для кнопки "Заказать"
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.dataset.itemId; // Получаем id товара из data-атрибута
      const itemQuantity = 1; // Предполагаем, что всегда заказывается 1 штука

      // Проверяем, есть ли уже товар в корзине
      const cart = JSON.parse(localStorage.getItem('cart')) || {};

      const selectOption = JSON.parse(localStorage.getItem('selectOption')) || {};


      if (cart[itemId]) {
        cart[itemId] += itemQuantity;
      } else {
        cart[itemId] = 1;
        selectOption[itemId] = selectOptions_default[0]

      }

      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('selectOption', JSON.stringify(selectOption));
      showProductInCart();
      showCartAmount();


    });
  })
}

function showCartContainer() {

  // Получаем данные из localStorage и строим корзину на странице cart.html
  const cartData = JSON.parse(localStorage.getItem('cart'));
  //const optionsData = JSON.parse(localStorage.getItem('selectOption')) ;

  const cartItem = document.querySelector('#cartContainer');
  cartItem.innerHTML = '';
  const makeOrder = document.querySelector('#makeOrder');
  //let optionsDataCategory = '1';
  //let resultPriceTotal = 0;
  // Выводим данные в корзине на странице cart.html
  for (const itemId in cartData) {
        // Находим товар с соответствующим идентификатором
    const cartProduct = products.find(item => item.id === itemId);

    // Находим стоимость торта в зависимости от выбранной категории
    //const priceProduct = categories.find(item => item.id === optionsDataCategory);


    //const priceProductValue = priceProduct['price'];

    //const cartImgElement = document.createElement('img');
    //cartImgElement.src = cartProduct.images[0];
    //cartImgElement.alt = 'Фото товара';
    //cartItem.appendChild(cartImgElement);
    //const resultPrice = itemQuantity*priceProductValue

    cartItem.insertAdjacentHTML('beforeend',`
    <div class="cartContainer" id=${itemId}>
      <div>
        <img src=${cartProduct.images[0]}></img>
        <div>
          <h2 class="h_style_cart">${cartProduct.name}</h2>

        </div>
      </div>

      <div class=select-options>

        <div>
          <h2 class="h_style_p_a_t">Количество:</h2>


          <div class=price-amount-total>
            <div>
              <img src="img/minus.png" class=minus_amount id=${itemId}></img>
              <h2 class=h_style_p_a_t id=itemQuantity></h2>
              <img src="img/plus.png" class=plus_amount id=${itemId}></img>
              <h2 class="h_style_p_a_t">Стоимость:</h2>
              <h2 class=h_style_p_a_t id=resultPrice></h2>
              <img src="img/cross.png" class=cross_amount id=${itemId}></img>
            </div>
          </div>
        </div>

        <div>
          <h2 class="h_style_p_a_t">Вес: </h2>
          <div id=weightSelect class=weightSelect>
            <div>


              <img src="img/minus.png" class=minus_weight id=${itemId}></img>
              <img src="img/plus.png" class=plus_weight id=${itemId}></img>


            </div>
          </div>

          <select class="selectoptions" id="select_1" size="1">
            <option value="1">1.5 кг</option>
            <option value="2">2 кг</option>
            <option value="3">2.5 кг</option>
            <option value="4">3 кг</option>
            <option value="5">3.5 кг</option>
            <option value="6">4 кг</option>
            <option value="7">4.5 кг</option>
            <option value="8">5 кг</option>
            <option value="9">5.5 кг</option>
            <option value="10">6 кг</option>
            <option value="11">6.5 кг</option>
            <option value="12">7 кг</option>
            <option value="13">7.5 кг</option>
            <option value="14">8 кг</option>
            <option value="15">8.5 кг</option>
            <option value="16">9 кг</option>
            <option value="17">9.5 кг</option>
            <option value="18">10 кг</option>
          </select>
        </div>

        <div>
          <h2 class="h_style_p_a_t">Тип: </h2>
          <select class="selectoptions" id="select_2" size="1"><option value="1">П/п торт (2000 руб / кг)</option><option value="2">Классический торт (1800руб. / кг)</option></select>
        </div>
        <div>
          <h2 class="h_style_p_a_t">Начинка: </h2>
          <select class="selectoptions" id="select_3" size="1">
          ${cartProduct.options1.map((option_value, index) => `<option value="${index + 1}">${option_value}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>`);

  };
  //resultPriceTotal += resultPrice;
  makeOrder.innerHTML = '';

  makeOrder.insertAdjacentHTML('beforeend',`<h2 class=h_style_makeOrder id="h2_makeOrder"></h2>`);

};

function showCartContainer_itemQuantity_resultPrice() {

  const cartData = JSON.parse(localStorage.getItem('cart'));
  const optionsData = JSON.parse(localStorage.getItem('selectOption')) ;

  const cartItem = document.querySelector('#cartContainer');
  //cartItem.innerHTML = '';
  const makeOrder = document.querySelector('#makeOrder');

  const itemDelivery = document.querySelector('#delivery');
  const itemInfocart = document.querySelector('#infocart');
  const itemDressing = document.querySelector('#dressing');

  const btn_order = document.querySelector('#makeOrderButton_button');

  //let optionsDataCategory = '1';
  let resultPrice = 0;
  let resultPriceTotal = 0;
  // Выводим данные в корзине на странице cart.html
  for (const itemId in cartData) {
    const cartItem_itemId = cartItem.querySelector(`.cartContainer[id="${itemId}"]`);
    const itemQuantity = cartData[itemId];
    const optionsDataCategory = optionsData[itemId]['select_2'];
    const optionsDataWeight = parseInt(optionsData[itemId]['select_1'],10);

    // Находим товар с соответствующим идентификатором
    const cartProduct = products.find(item => item.id === itemId);

    // Находим стоимость торта на кг в зависимости от выбранной категории
    const priceProduct = selectOptions_categories.find(item => item.id === optionsDataCategory);

    // Находим вес торта в зависимости от выбранной категории
    //const weightProduct = selectOptions_weights.find(item => item.id === optionsDataWeight);

    const priceProductValue = priceProduct['price'];
    //const weightProductValue = weightProduct['weight'];

    const weightValue = 1 + optionsDataWeight*0.5;

    const resultPrice = itemQuantity*priceProductValue*weightValue ;


    //const h2_itemQuantity = cartItem.querySelector(`#itemQuantity[id="${itemId}"]`);
    const h2_itemQuantity = cartItem_itemId.querySelector('#itemQuantity');
    const h2_resultPrice = cartItem_itemId.querySelector('#resultPrice');
    //const h2_weightValue = cartItem_itemId.querySelector('#h2_weight');

    const h2_makeOrder = makeOrder.querySelector('#h2_makeOrder');

    const btn_order = document.querySelector('#makeOrderButton_button');

    h2_itemQuantity.textContent = `${itemQuantity}`;
    h2_resultPrice.textContent = `${resultPrice} руб.`;
    //h2_weightValue.textContent = `${weightValue} кг.`;
    resultPriceTotal += resultPrice;
  };

  localStorage.setItem('resultPriceTotal', JSON.stringify(resultPriceTotal));
  //h2_makeOrder.textContent = `Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.`;
  //makeOrder.insertAdjacentHTML('beforeend',`<h2 class=h_style_makeOrder>Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.</h2>`);

  if (resultPriceTotal === 0){
    itemDelivery.style.display = 'none';
    itemInfocart.style.display = 'none';
    itemDressing.style.display = 'none';
    const cartItem = document.querySelector('#cartContainer');
    cartItem.remove();
    btn_order.setAttribute("visibility", "false");
  }
  else {
    let tg = window.Telegram.WebApp;
    tg.expand();
    tg.MainButton.textColor = "#FFFFFF";
    tg.MainButton.color = "#f5919b";

    itemDelivery.style.display = 'block';
    itemInfocart.style.display = 'block';
    itemDressing.style.display = 'block';
    btn_order.setAttribute("visibility", "true");
    //btn_order.setAttribute("disabled", "false");

    //btn_order.removeAttribute("disabled");

    btn_order.addEventListener('click', function(){
      //const resultPriceTotal_localStorage = JSON.stringify(JSON.parse(localStorage.getItem('resultPriceTotal')));

      if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
      }
      else {
          tg.MainButton.setText('Оплатить в телеграм или на сайте??');
          //tg.sendData(resultPriceTotal_localStorage);
          //const sendData = optionsData['1']['select_1'].toString()
          //const sendData = optionsData['1']['select_1'].toString()
          const cartInfo = JSON.parse(localStorage.getItem('cartInfo')) || {};

          if (cartInfo['radio']) {
          } else {
            cartInfo['radio'] = 'manager';
            };

          const inputDate = document.querySelector('input[type="date"]');

          if (cartInfo['date']) {
          } else {
            cartInfo['date'] = inputDate.min;
            };

          localStorage.setItem('cartInfo', JSON.stringify(cartInfo));


          tg.sendData(localStorage);
          tg.MainButton.show();



          localStorage.clear('cart');
          localStorage.clear('selectOption');
          //localStorage.setItem('selectOption',selectOption);
          localStorage.setItem('resultPriceTotal',0);

          showCartAmount();
          showCartContainer_itemQuantity_resultPrice();
          }

    });

  };

  h2_makeOrder.innerHTML = `<h2 class=h_style_makeOrder>Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.</h2>`;

};

function listenerCartContainer() {

  const cartData = JSON.parse(localStorage.getItem('cart'));

  const minus_amount_block = document.querySelectorAll('.minus_amount');
  minus_amount_block.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.id; // Получаем id товара из data-атрибута
      const itemQuantity = 1; // Предполагаем, что всегда заказывается 1 штука

      // Проверяем, есть ли уже товар в корзине
      const cart = JSON.parse(localStorage.getItem('cart')) || {};

      const selectOption = JSON.parse(localStorage.getItem('selectOption')) || {};

      if (cart[itemId] === 1) {
        cart[itemId] -= itemQuantity;
        delete cart[itemId];

        delete selectOption[itemId];
        localStorage.setItem('selectOption', JSON.stringify(selectOption));
        const cartContainer = document.querySelector(`.cartContainer[id="${itemId}"]`);
        cartContainer.remove();

      } else {
        cart[itemId] -= itemQuantity;

      };

      localStorage.setItem('cart', JSON.stringify(cart));

      showCartAmount();
      showCartContainer_itemQuantity_resultPrice();

    });
  });

  const plus_amount_block = document.querySelectorAll('.plus_amount');
  plus_amount_block.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.id; // Получаем id товара из data-атрибута
      const itemQuantity = 1; // Предполагаем, что всегда заказывается 1 штука

      // Проверяем, есть ли уже товар в корзине
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[itemId] += itemQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      showCartAmount();
      showCartContainer_itemQuantity_resultPrice();

    });
  });

  const cross_amount_block = document.querySelectorAll('.cross_amount');
  cross_amount_block.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.id; // Получаем id товара из data-атрибута
      // Проверяем, есть ли уже товар в корзине
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      delete cart[itemId];
      localStorage.setItem('cart', JSON.stringify(cart));
      const selectOption = JSON.parse(localStorage.getItem('selectOption')) || {};
      delete selectOption[itemId];
      localStorage.setItem('selectOption', JSON.stringify(selectOption));
      const cartContainer = document.querySelector(`.cartContainer[id="${itemId}"]`);
      cartContainer.remove();
      showCartAmount();
      showCartContainer_itemQuantity_resultPrice();

    });
  });

}

function listenerWeightSelect() {

  const minus_weight_block = document.querySelectorAll('.minus_weight');
  minus_weight_block.forEach(button => {
    button.addEventListener('click', function() {
        const optionsData = JSON.parse(localStorage.getItem('selectOption'));
        const itemId = this.id; // Получаем id товара из data-атрибута
        const itemQuantity = 1;
        if (parseInt(optionsData[itemId]['select_1'],10) === 1) {
        } else {
          let minus_weight_value = parseInt(optionsData[itemId]['select_1'],10)
          minus_weight_value -= itemQuantity;
          optionsData[itemId]['select_1'] = minus_weight_value

          localStorage.setItem('selectOption', JSON.stringify(optionsData));

          const selectOptionsBlock = this.closest('.select-options');
          const select1Block = selectOptionsBlock.querySelector(`.selectoptions[id="select_1"]`);
          select1Block.value = minus_weight_value
        };
        localStorage.setItem('selectOption', JSON.stringify(optionsData));

      });
    });

  const plus_weight_block = document.querySelectorAll('.plus_weight');
  plus_weight_block.forEach(button => {
    button.addEventListener('click', function() {
        const optionsData = JSON.parse(localStorage.getItem('selectOption'));
        const itemId = this.id; // Получаем id товара из data-атрибута
        const itemQuantity = 1;
        if (parseInt(optionsData[itemId]['select_1'],10) === 18) {
        }
        else {
          let plus_weight_value = parseInt(optionsData[itemId]['select_1'],10)
          plus_weight_value += itemQuantity;
          optionsData[itemId]['select_1'] = plus_weight_value

          const selectOptionsBlock = this.closest('.select-options');
          const select1Block = selectOptionsBlock.querySelector(`.selectoptions[id="select_1"]`);
          select1Block.value = plus_weight_value
        }
        localStorage.setItem('selectOption', JSON.stringify(optionsData));

        showCartContainer_itemQuantity_resultPrice();
    });
  });
}

function loadPage(pageUrl, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      if (xhr.status === 200) {
          // Помещаем содержимое <body> в контейнер
          document.body.innerHTML = xhr.responseText;
          if (typeof callback === 'function') {
            callback();
        }
      }
  };
  xhr.open('GET', pageUrl, true);
  xhr.send();

};

function saveSelectedOptions() {


  const selectOption_LS = {};
  const selectOption_LS_sub = {};
  //|| {"select_1":0,"select_2":0,"select_3":0};

  //const selectElement_1 = document.querySelector('select[id="select_1"]');
  const cartContainers = document.querySelectorAll('.cartContainer');

  cartContainers.forEach(cartContainer => {
    const productId = cartContainer.id
    const selectElements = cartContainer.querySelectorAll('.selectoptions');

    selectElements.forEach(selectElement => {
      const id = selectElement.id
      selectOption_LS_sub[id] = selectElement.value
    });
  selectOption_LS[productId] = selectOption_LS_sub;
  localStorage.setItem('selectOption', JSON.stringify(selectOption_LS));
});
};

function loadSelectedOptions() {

  const selectOption_LS = JSON.parse(localStorage.getItem('selectOption')) || {};

  const cartContainers = document.querySelectorAll('.cartContainer') || {};

  cartContainers.forEach(cartContainer => {

    const productId = cartContainer.id;

    const selectElements = cartContainer.querySelectorAll('.selectoptions');

    const selectOption_LS_sub = selectOption_LS[productId] || {};

    selectElements.forEach(selectElement => {
      const id = selectElement.id
      selectElement.value = selectOption_LS_sub[id]

    });

  });

  const selectElements = document.querySelectorAll('.selectoptions');
  selectElements.forEach(selectElement => {
    selectElement.addEventListener('change', function() {
      const selectOption_LS = JSON.parse(localStorage.getItem('selectOption'));

      const cartContainer_id = this.closest('.cartContainer').id;

      const selectOption_LS_sub = selectOption_LS[cartContainer_id];

      const id = selectElement.id
      selectOption_LS_sub[id] = this.value

      selectOption_LS[cartContainer_id] = selectOption_LS_sub;

      localStorage.setItem('selectOption', JSON.stringify(selectOption_LS));

      loadSelectedOptions();
      showCartContainer_itemQuantity_resultPrice();

    });
  });

};

function cart_link_Listener() {

  cart_link = document.getElementById("cart");
  // Назначаем обработчик события клика на кнопке
  cart_link.addEventListener('click', function () {
      current_page = 'cart';
      localStorage.setItem('current_page', JSON.stringify(current_page));
      loadPage('cart.html', function() {

        showCartContainer();
        showCartAmount();
        showCartContainer_itemQuantity_resultPrice();
        listenerCartContainer();
        listenerWeightSelect();
        loadSelectedOptions();

        saveRadioChange();
        listenerRadioChange();
        listenerInputChange();

        setMinData ();

        cart_link_Listener();
        home_link_Listener();


      });


  });
};

function home_link_Listener() {
  const home_link = document.getElementById("container_path_img_home");
  if (home_link) {

    home_link.addEventListener('click', function () {
      current_page = 'home';
      //window.location.reload();
      loadPage('index.html', function() {
        updateVisibleItemCount();
        getOrderButtons()
        showProductInCart();
        assignCategory();
        assignCheckboxBlocks();
        showCartAmount();
        listenerCheckboxChange();
        cart_link_Listener();
        home_link_Listener();
        product_details_link_Listener()



      });


    })
  };
};

document.addEventListener('DOMContentLoaded', function() {
  updateVisibleItemCount();
  getOrderButtons()
  showProductInCart();
  assignCategory();
  assignCheckboxBlocks();
  showCartAmount();
  listenerCheckboxChange();
  cart_link_Listener();
  home_link_Listener();
  product_details_link_Listener()


});

// Функция для определения количества показанных товаров
function countVisibleItems() {
  const visibleItems = document.querySelectorAll('.item[style="display: block;"]');
  return visibleItems.length;
};
// Функция для обновления количества показанных товаров
function updateVisibleItemCount() {
  const visibleItemCount = countVisibleItems();
  const textBlock = document.querySelector('.cb_found_count_value');

  if (textBlock) {
    textBlock.textContent = `найдено: ${visibleItemCount}`;
  }
};

//if (JSON.parse(localStorage.getItem('current_page')) === 'index') {
function product_details_link_Listener() {
  const detailsButtons = document.querySelectorAll('.image-text-container');

  detailsButtons.forEach(container => {
      container.addEventListener('click', function() {
          const productId = container.dataset.productId;
          //window.location.href = `product-details.html?id=${productId}`;
          loadPage('product-details.html', function() {


            // Добавляем функционал для перелистывания фотографий
            let currentIndex = 0;

            // Находим товар с соответствующим идентификатором
            const product = products.find(item => item.id === productId);


            const carousel = document.querySelector('.product-carousel');

            // Функция для отображения фотографий товара
            function showImages(currentIndex) {

              carousel.innerHTML = '';
              const imgElement = document.createElement('img');
              imgElement.src = product.images[currentIndex];
              imgElement.alt = 'Фото товара';
              carousel.appendChild(imgElement);

            }

            // Функция для отображения описания товара
            function showPath() {
              const pathContainer = document.querySelector('#container-carousel-path');
              pathContainer.insertAdjacentHTML('beforeend',`<h2 class=h_style_path>/ Торты п/п / ${product.name}</h2>`);
            }

            function showTitle() {
              const titleContainer = document.querySelector('#container-carousel-title');
              titleContainer.insertAdjacentHTML('beforeend',`<h2 class="h_style_title">${product.name}</h2>`);
            }


            function showDescription() {
              const descriptionContainer = document.querySelector('#product-description');
              descriptionContainer.insertAdjacentHTML('beforeend',`<pre class="p-title-carousel">${product.description}</pre>`);
            }


            function showPrice() {
              const priceContainer = document.querySelector('#product-buttons-container-order');
              priceContainer.insertAdjacentHTML('beforeend',`<p class="p-price">${product.price} руб/кг.</p>
                <button class="btn_order btn" id="btn${product.id}" data-item-id="${product.id}">В корзину</button>
                <span class=product_in_cart_amount id="${product.id}" style="display: none;"></span>
                <img class=cartPlus src="img/cart+.png"></img>`);
            }


            function prevImage() {
                currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;

                showImages(currentIndex);
            }

            function nextImage() {
                currentIndex = (currentIndex + 1) % product.images.length;

                showImages(currentIndex);

            }

            showPath();
            showTitle();
            showImages(currentIndex);
            showDescription();
            showPrice();
            showProductInCart();
            getOrderButtons();
            showCartAmount();

            cart_link_Listener();
            home_link_Listener();


            const prevButton = document.getElementById('prevButton');
            // Обработчик для кнопки "Предыдущая фотография"
            prevButton.addEventListener('click', function() {
              prevImage()
            });

            const nextButton = document.getElementById('nextButton');
            // Обработчик для кнопки "Следующая фотография"
            nextButton.addEventListener('click', function() {
              nextImage()
            });

          });

      });
  });

};

function listenerCheckboxChange() {


  const paragraphs = document.querySelectorAll('.p_cat');
  paragraphs.forEach(paragraph => {
      paragraph.addEventListener('click', () => {
          paragraphs.forEach(p => {
              p.classList.remove('btn_clicked'); // Убираем класс 'clicked' у всех элементов
          });
          paragraph.classList.add('btn_clicked'); // Добавляем класс 'clicked' к текущему элементу
      });
  });

  // Получаем элементы кнопок и блока с чекбоксами
  const toggleButton = document.getElementById('toggleButton') || {};

  const checkboxBlock = document.getElementById('checkboxBlock') || {};
  const applyButton = document.getElementById('applyButton') || {};

  // Обработчик для кнопки "Показать список"
  toggleButton.addEventListener('click', function() {
      // При нажатии на кнопку, переключаем видимость блока с чекбоксами

      if (checkboxBlock.style.display === 'none') {
      checkboxBlock.style.display = 'block';
      } else {
      checkboxBlock.style.display = 'none';
      }
  });


  // Обработчик для кнопки "Применить"
  applyButton.addEventListener('click', function() {
      // Получаем выбранный пункт
      const selectedCheckboxes = document.querySelectorAll('#checkboxBlock input:checked');
      const selectedValues = [];
      selectedCheckboxes.forEach(checkbox => {
        selectedValues.push(checkbox.value);

    });
      if (selectedValues.length > 0) {
        filterByCategory(selectedValues);
        updateVisibleItemCount();

    } else {
        filterByCategory(["all"]); // Передаем "all" в массиве, чтобы соответствовать ожидаемому типу аргумента функции
        updateVisibleItemCount();

    };

  });
};

function handleCheckboxChange(checkbox) {
    const checkboxes = document.querySelectorAll('#checkboxBlock input[name="category"]');

    if (checkbox.value === "all") {
    // Если выбран первый пункт ("Все товары"), устанавливаем остальные checkbox в неотмеченное состояние
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
        item.checked = false;
        }
    });
    } else {
    // Если выбран любой другой пункт, снимаем отметку с первого пункта ("Все товары")
    checkboxes[0].checked = false;
    }
}

function filterByCategory(selectedValues) {
    // Получаем все контейнеры с товарами
    const allItems = document.querySelectorAll('.item');
    const selectedSet = new Set(selectedValues);


    allItems.forEach(product => {
            const productCategory = product.getAttribute('data-category').split(',');
            if (productCategory.some(category => selectedSet.has(category)) || selectedValues.includes('all')) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
};


// Функция для изменения цвета фона и записи в localStorage
function handleRadioChange(event) {
  // Получаем все радиокнопки и соответствующие им label
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll('label');
  const selectedValue = event.target.value;

  // Устанавливаем цвет фона для всех label
  labels.forEach((label) => {
    label.classList.remove('selected'); // Снимаем класс 'selected' со всех label
    label.classList.add('unselected');
  });

  // Находим label, который соответствует выбранной радиокнопке и добавляем класс 'selected'
  const correspondingLabel = document.querySelector(`label[value="${event.target.value}"]`);
  correspondingLabel.classList.add('selected');
  correspondingLabel.classList.remove('unselected');

  // Записываем выбранное значение в localStorage
  const cartInfo = JSON.parse(localStorage.getItem('cartInfo')) || {};
  cartInfo[`radio`]=selectedValue;
  localStorage.setItem('cartInfo', JSON.stringify(cartInfo));


  listenerRadioChange();

};

function listenerRadioChange() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  // Добавляем обработчик события для каждой радиокнопки
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', handleRadioChange);
  });
}
// Функция для изменения цвета фона и записи в localStorage
function saveRadioChange() {
// При загрузке страницы, проверяем, есть ли сохраненное значение в localStorage
const cartInfo = JSON.parse(localStorage.getItem('cartInfo')) || {};

const savedDelivery = cartInfo[`radio`]
//const savedDelivery = localStorage.getItem('cartInfo')
if (savedDelivery) {
  // Если есть, выбираем соответствующую радиокнопку и вызываем событие change

  const selectedRadioButton_label = document.querySelector(`label[value="${savedDelivery}"]`);
  const selectedRadioButton_input = document.querySelector(`input[value="${savedDelivery}"]`);
  if (selectedRadioButton_label) {
    //selectedRadioButton.checked = true;
    //selectedRadioButton.dispatchEvent(new Event('change'));


    const labels = document.querySelector('.delivery').querySelectorAll('label');

    // Устанавливаем цвет фона для всех label
    labels.forEach((label) => {
      label.classList.remove('selected'); // Снимаем класс 'selected' со всех label
      label.classList.add('unselected');
      const input = label.querySelector(`input`);
      input.checked = false;
    });

    // Находим label, который соответствует выбранной радиокнопке и добавляем класс 'selected'
    selectedRadioButton_label.classList.remove('unselected');
    selectedRadioButton_label.classList.add('selected');

    // Устанавливаем атрибут checked у  радио-инпута
    selectedRadioButton_input.checked = true;

  };
};
};

function setMinData () {
  // Получаем текущую дату
  const currentDate = new Date();

  // Добавляем к текущей дате 3 дня
  currentDate.setDate(currentDate.getDate() + 5);

  // Форматируем дату в строку YYYY-MM-DD (так, как это ожидает элемент input type="date")
  const minDate = currentDate.toISOString().split('T')[0];

  // Устанавливаем минимальную дату в элемент input
  document.getElementById('dataToday').min = minDate;
  document.getElementById('dataToday').value = minDate;
};


  function listenerInputChange() {

    // Получаем все кнопки "Заказать"
    const inputName = document.querySelectorAll(`input`);



    // Обработчик для кнопки "Заказать"
    inputName.forEach(inputItem => {
      inputItem.addEventListener('input', function() {
        const itemValue = inputItem.value;
        const itemType = inputItem.type;
        const cartInfo = JSON.parse(localStorage.getItem('cartInfo')) || {};
        cartInfo[`${itemType}`]=itemValue;
        localStorage.setItem('cartInfo', JSON.stringify(cartInfo));

      });
    })
  }
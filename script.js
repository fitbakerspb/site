// Включение кэширования  на 0 секунд. Отладка
//response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//localStorage.clear();
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

// Получаем параметр id из URL
//const urlParams = new URLSearchParams(window.location.search);
//const productId = urlParams.get('id');

//Массивы с информацией о товарах
const products = [
  {id: '1',name: '«Морковный» торт с фундучным пралине и грушевым компоте', images: ['photos/1_1.jpg','photos/1_2.jpg'],description: 'Бисквитный торт приготовлен без муки и без сахара🎂🔥\nКбжу на 100 гр 141/8/8/10\nСостав:\n🍰Ароматный морковный бисквит\n🍰Цитрусовый крем \n🍰Грушевое компоте \n🍰Невероятно вкусное фундучное пралине',weight: '1,5кг',price: '2000',categories: ['классика','п/п торты'],options1: ['без начинки']},
  {id: '2',name: '«Шварцвальдский» с вишней',images: ['photos/2_1.jpg','photos/2_2.jpg'],description: 'Вес ~ 1,8 кг 🔥\n\nКБЖУ на 100 грамм всего - 180/10/10/12.5 ❤️‍🔥',price: '2000',categories: ['классика','п/п торты'],options1: ['без начинки','карамель','цитрусовый курд','вишня','лимон']},
  {id: '3',name: '«Рафаэлло»',images: ['photos/3_1.jpg','photos/3_2.jpg'],description: 'Кбжу на 100 грамм 192/10/12/15\nСостав: \n🥥Нежные и сочные кокосовые коржи\n🥥Кокосовый крем \n🥥Начинка из карамелизованого хрустящего миндаля',price: '1000',categories: ['классика','п/п торты'],options1: ['без начинки','карамель','цитрусовый курд','вишня','лимон']},
  {id: '4',name: '«Вишня-кокос» с чизкейком внутри',images: ['photos/4_1.jpg','photos/4_2.jpg'],description: 'Кбжу на 100 гр.: 167/10/11,2/6,4\nСостав:\n🍰Ароматный кокосовый бисквит\n🍰Сочный вишневый соус \n🍰Нежный кокосовый чизкейк \n🍰Крем с нотками кокоса',price: '2000',categories: ['классика','п/п торты'],options1: ['без начинки','карамель','цитрусовый курд','вишня','лимон']},
];
const categories = [
  {id: '1',name: 'п/п торты', price: '2000'},
  {id: '2',name: 'классика', price: '1800'}
  ];

const weights = [
  {id: '1', weight: '1.5'},
  {id: '2', weight: '2'},
  {id: '3', weight: '2.5'},
  {id: '4', weight: '3'},
  {id: '5', weight: '3.5'},
  {id: '6', weight: '4'},
  {id: '7', weight: '4.5'},
  {id: '8', weight: '5'},
  {id: '9', weight: '5.5'},
  {id: '10', weight: '6'},
  {id: '11', weight: '6.5'},
  {id: '12', weight: '7'},
  {id: '13', weight: '7.5'},
  {id: '14', weight: '8'},
  {id: '15', weight: '8.5'},
  {id: '16', weight: '9'},
  {id: '17', weight: '9.5'},
  {id: '18', weight: '10'},
];



const defaultSelectOptions = {'select_1': '1','select_2': '1', 'select_3': '1'};


localStorage.setItem('products', JSON.stringify(products));



let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#f5919b";


function assignCategory() {
  // Получаем все контейнеры с товарами
  const allItems = document.querySelectorAll('.item');

  allItems.forEach(itemElement => {
    const itemProductId = itemElement.getAttribute('data-product-id');
    const product = products.find(product => product.id === itemProductId);
    if (product) {
      itemElement.setAttribute('data-category', product.categories.join(', '));
    }
      });
}


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
        selectOption[itemId] = defaultSelectOptions

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
          <div class=price-amount-total>
            <div>
              <img src="img/minus.png" class=minus id=${itemId}></img>
              <h2 class=h_style_p_a_t id=itemQuantity></h2>
              <img src="img/plus.png" class=plus id=${itemId}></img>
              <h2 class=h_style_p_a_t id=resultPrice></h2>
              <img src="img/cross.png" class=cross id=${itemId}></img>
            </div>
          </div>
        </div>
      </div>
      <div class=select-options>
      <div>
          <h2 class="h_style_p_a_t">Выберите вес: </h2>
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
          <h2 class="h_style_p_a_t">Выберите тип: </h2>
          <select class="selectoptions" id="select_2" size="1"><option value="1">П/п торт (2000 руб / кг)</option><option value="2">Классический торт (1800руб. / кг)</option></select>
        </div>
        <div>
          <h2 class="h_style_p_a_t">Выберите начинку: </h2>
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
  //let optionsDataCategory = '1';
  let resultPriceTotal = 0;
  // Выводим данные в корзине на странице cart.html
  for (const itemId in cartData) {
    const cartItem_itemId = cartItem.querySelector(`.cartContainer[id="${itemId}"]`);
    console.log('cartItem_itemId');
    console.log(cartItem_itemId);
    const itemQuantity = cartData[itemId];
    const optionsDataCategory = optionsData[itemId]['select_2']
    const optionsDataWeight = optionsData[itemId]['select_1']

    // Находим товар с соответствующим идентификатором
    const cartProduct = products.find(item => item.id === itemId);

    // Находим стоимость торта на кг в зависимости от выбранной категории
    const priceProduct = categories.find(item => item.id === optionsDataCategory);

    // Находим вес торта в зависимости от выбранной категории
    const weightProduct = weights.find(item => item.id === optionsDataWeight);


    const priceProductValue = priceProduct['price'];
    const weightProductValue = weightProduct['weight'];

    const resultPrice = itemQuantity*priceProductValue*weightProductValue;


    //const h2_itemQuantity = cartItem.querySelector(`#itemQuantity[id="${itemId}"]`);
    const h2_itemQuantity = cartItem_itemId.querySelector('#itemQuantity');
    const h2_resultPrice = cartItem_itemId.querySelector('#resultPrice');
    const h2_makeOrder = makeOrder.querySelector('#h2_makeOrder');
    h2_itemQuantity.textContent = `${itemQuantity}`;
    h2_resultPrice.textContent = `${resultPrice}`;
    resultPriceTotal += resultPrice;
  };
  localStorage.setItem('resultPriceTotal', JSON.stringify(resultPriceTotal));
  //h2_makeOrder.textContent = `Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.`;
  //makeOrder.insertAdjacentHTML('beforeend',`<h2 class=h_style_makeOrder>Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.</h2>`);

  h2_makeOrder.innerHTML = `<h2 class=h_style_makeOrder>Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.</h2>`;

};



function listenerCartContainer() {

  const cartData = JSON.parse(localStorage.getItem('cart'));
  //const optionsData = JSON.parse(localStorage.getItem('selectOption'));

  //const cartItem = document.querySelector('#cartContainer');
  //cartItem.innerHTML = '';
  //const makeOrder = document.querySelector('#makeOrder');
  //let optionsDataCategory = '1';
  //let resultPriceTotal = 0;
  // Выводим данные в корзине на странице cart.html


  const minus_block = document.querySelectorAll('.minus');
  minus_block.forEach(button => {
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

      //showProductInCart();
      //showCartContainer();
      showCartAmount();
      showCartContainer_itemQuantity_resultPrice();
      //loadSelectedOptions()



    });
  });

  const plus_block = document.querySelectorAll('.plus');
  document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.id; // Получаем id товара из data-атрибута
      const itemQuantity = 1; // Предполагаем, что всегда заказывается 1 штука

      // Проверяем, есть ли уже товар в корзине
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[itemId] += itemQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));

      //showProductInCart();
      //showCartContainer();
      //loadSelectedOptions()
      showCartAmount();
      showCartContainer_itemQuantity_resultPrice();

    });
  });

  const cross_block = document.querySelectorAll('.cross');
  document.querySelectorAll('.cross').forEach(button => {
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
      //showProductInCart();
      //showCartContainer();
      //loadSelectedOptions();
      showCartAmount();
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
  //if (JSON.parse(localStorage.getItem('current_page')) === 'cart') {
  //localStorage.clear();

  //let selectOption_LS_reverse = {}
  //let selectOption_LS_sub_reverse = {}


  const selectOption_LS = JSON.parse(localStorage.getItem('selectOption')) || {};
  //|| {"select_1":0,"select_2":0,"select_3":0};


  //const selectElement_1 = document.querySelector('select[id="select_1"]');
  const cartContainers = document.querySelectorAll('.cartContainer') || {};

  cartContainers.forEach(cartContainer => {

    const productId = cartContainer.id;

    const selectElements = cartContainer.querySelectorAll('.selectoptions');

    const selectOption_LS_sub = selectOption_LS[productId] || {};


    //if (localStorage.getItem('selectOption') === null) {
    //  localStorage.setItem('selectOption', JSON.stringify(selectOption_LS));

    //}





    selectElements.forEach(selectElement => {
      const id = selectElement.id
      selectElement.value = selectOption_LS_sub[id]

    });
    //selectOption_LS_reverse[productId] = selectOption_LS_sub_reverse
  });
  //localStorage.setItem('selectOption', JSON.stringify(selectOption_LS_reverse));

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
      //showCartContainer();
      loadSelectedOptions();
      showCartContainer_itemQuantity_resultPrice();


      //const selectedOptionValue = this.value;
      //saveSelectedOptions();


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

        //showProductInCart();

        showCartContainer();
        showCartAmount();
        showCartContainer_itemQuantity_resultPrice();
        listenerCartContainer();
        loadSelectedOptions();

        //saveSelectedOptions();






        const btn_order = document.getElementById("makeOrderButton_button");

        btn_order.addEventListener("click", function(){
            const resultPriceTotal_localStorage = JSON.stringify(JSON.parse(localStorage.getItem('resultPriceTotal')));


            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            }
            else {
                tg.MainButton.setText('Оплатить в телеграм или на сайте??');
                tg.sendData(resultPriceTotal_localStorage);
                const cart = JSON.parse(localStorage.getItem('cart')) || {};
                delete cart;
                const resultPriceTotal = JSON.parse(localStorage.getItem('resultPriceTotal')) || {};
                delete resultPriceTotal;
                tg.sendData(resultPriceTotal_localStorage);
                //localStorage.setItem('cart',{});
                //localStorage.setItem('resultPriceTotal',0);
                tg.MainButton.show();
            }
        });

        Telegram.WebApp.onEvent("mainButtonClicked", function(){
            tg.sendData(JSON.stringify(JSON.parse(localStorage.getItem('resultPriceTotal'))));
        });

        //let usercard = document.getElementById('usercard');
        //let p = document.createElement('p');
        //p.innerText = '${tg.initDataUnsafe.user.first_name}${tg.initDataUnsafe.user.last_name}';
        //usercard.appendChild(p);
        //cart_link = document.getElementById("cart");
        //home_link = document.getElementById("container_path_img_home");
        //window.location.reload();
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
      window.location.reload();
      //loadPage('index.html', function() {});
      showCartAmount();
      console.log('showCartAmount()');
      console.log(showCartAmount());
    })
  };
};










document.addEventListener('DOMContentLoaded', function() {
  updateVisibleItemCount();
  getOrderButtons()
  showProductInCart();
  assignCategory();
  showCartAmount();
  cart_link_Listener();
  home_link_Listener();


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

if (JSON.parse(localStorage.getItem('current_page')) === 'index') {

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
            // Обработчик для кнопки "Применить"
            prevButton.addEventListener('click', function() {
              prevImage()
            });

            const nextButton = document.getElementById('nextButton');
            // Обработчик для кнопки "Применить"
            nextButton.addEventListener('click', function() {
              nextImage()
            });

          });


      });
  });


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
  const toggleButton = document.getElementById('toggleButton');
  const checkboxBlock = document.getElementById('checkboxBlock');
  const applyButton = document.getElementById('applyButton');

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

    }

  });
}
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
}


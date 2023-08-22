function goBack() {
  window.history.back();
}

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
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

//Массивы с информацией о товарах
const products = [
  {id: '1',name: '«Морковный» торт с фундучным пралине и грушевым компоте',images: ['photos/1_1.jpg','photos/1_2.jpg'],description: 'Бисквитный торт приготовлен без муки и без сахара🎂🔥\nКбжу на 100 гр 141/8/8/10\nСостав:\n🍰Ароматный морковный бисквит\n🍰Цитрусовый крем \n🍰Грушевое компоте \n🍰Невероятно вкусное фундучное пралине',price: '2000'},{id: '2',name: '«Шварцвальдский» с вишней',images: ['photos/2_1.jpg','photos/2_2.jpg'],description: 'Вес ~ 1,8 кг 🔥\n\nКБЖУ на 100 грамм всего - 180/10/10/12.5 ❤️‍🔥',price: '2000'},{id: '3',name: '«Рафаэлло»',images: ['photos/3_1.jpg','photos/3_2.jpg'],description: 'Кбжу на 100 грамм 192/10/12/15\nСостав: \n🥥Нежные и сочные кокосовые коржи\n🥥Кокосовый крем \n🥥Начинка из карамелизованого хрустящего миндаля',price: '1000'},{id: '4',name: '«Вишня-кокос» с чизкейком внутри',images: ['photos/4_1.jpg','photos/4_2.jpg'],description: 'Кбжу на 100 гр.: 167/10/11,2/6,4\nСостав:\n🍰Ароматный кокосовый бисквит\n🍰Сочный вишневый соус \n🍰Нежный кокосовый чизкейк \n🍰Крем с нотками кокоса',price: '2000'},
];


 // Добавляем функционал отображения количества товаров в корзине
 //let products_amount = 0;
 //localStorage.clear();

function showCart() {
  const cart_amount_block = document.getElementById('cart_amount');
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let products_amount = 0;
  for (const itemId in cart) {

    products_amount += parseInt(cart[itemId]);


    const product_in_cart_amount_block = document.querySelector(`.product_in_cart_amount[id="${itemId}"]`);
    if (product_in_cart_amount_block) {
      product_in_cart_amount_block.textContent = `${cart[itemId]}`;
      product_in_cart_amount_block.style.display = 'block';

      }
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

      if (cart[itemId]) {
        cart[itemId] += itemQuantity;
      } else {
        cart[itemId] = itemQuantity;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      showCart()


    });
  })
}
;


// Функция для создания кнопки
function createButton(text, className, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener('click', clickHandler);
  return button;
}








if (window.location.pathname.includes('cart.html')) {

  const products = [
    {id: '1',name: '«Морковный» торт с фундучным пралине и грушевым компоте',images: ['photos/1_1.jpg','photos/1_2.jpg'],description: 'Бисквитный торт приготовлен без муки и без сахара🎂🔥\nКбжу на 100 гр 141/8/8/10\nСостав:\n🍰Ароматный морковный бисквит\n🍰Цитрусовый крем \n🍰Грушевое компоте \n🍰Невероятно вкусное фундучное пралине',price: '2000'},{id: '2',name: '«Шварцвальдский» с вишней',images: ['photos/2_1.jpg','photos/2_2.jpg'],description: 'Вес ~ 1,8 кг 🔥\n\nКБЖУ на 100 грамм всего - 180/10/10/12.5 ❤️‍🔥',price: '2000'},{id: '3',name: '«Рафаэлло»',images: ['photos/3_1.jpg','photos/3_2.jpg'],description: 'Кбжу на 100 грамм 192/10/12/15\nСостав: \n🥥Нежные и сочные кокосовые коржи\n🥥Кокосовый крем \n🥥Начинка из карамелизованого хрустящего миндаля',price: '1000'},{id: '4',name: '«Вишня-кокос» с чизкейком внутри',images: ['photos/4_1.jpg','photos/4_2.jpg'],description: 'Кбжу на 100 гр.: 167/10/11,2/6,4\nСостав:\n🍰Ароматный кокосовый бисквит\n🍰Сочный вишневый соус \n🍰Нежный кокосовый чизкейк \n🍰Крем с нотками кокоса',price: '2000'},
  ];


  function showCartContainer() {

    // Получаем данные из localStorage и строим корзину на странице cart.html
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const cartItem = document.querySelector('#cartContainer');
    cartItem.innerHTML = '';

    const makeOrder = document.querySelector('#makeOrder');

    let resultPriceTotal = 0;
    // Выводим данные в корзине на странице cart.html
    for (const itemId in cartData) {
      const itemQuantity = cartData[itemId];


      // Находим товар с соответствующим идентификатором
      const cartProduct = products.find(item => item.id === itemId);

      const cartImgElement = document.createElement('img');
      cartImgElement.src = cartProduct.images[0];
      cartImgElement.alt = 'Фото товара';
      //cartItem.appendChild(cartImgElement);
      const resultPrice = itemQuantity*cartProduct.price
      cartItem.insertAdjacentHTML('beforeend',`<div class="cartContainer" id=${itemId}>
      <img src=${cartProduct.images[0]}></img>
      <div>
        <h2 class="h_style_cart">${cartProduct.name}</h2>
        <div class=price-amount-total>
        <div>
        <img src="img/minus.png" class=minus id=${itemId}></img>
        <h2 class=h_style_p_a_t id=${itemId}>${itemQuantity}</h2>
        <img src="img/plus.png" class=plus id=${itemId}></img>
        <h2 class=h_style_p_a_t>${resultPrice} руб.</h2>
        <img src="img/cross.png" class=cross id=${itemId}></img>
        </div>
        </div>
      </div>
      </div>`);


      //cartItem.insertAdjacentHTML('beforeend',`<div class=price-amount-total><div><h2 class=h_style_p_a_t>Цена:</h2><h2 class=h_style_p_a_t>${cartProduct.price} руб.</h2><h2 class=h_style_p_a_t>Кол-во:</h2><h2 class=h_style_p_a_t>${itemQuantity}</h2><h2 class=h_style_p_a_t>Итого:</h2><h2 class=h_style_p_a_t>${resultPrice} руб.</h2></div></div>`);
      resultPriceTotal += resultPrice;
      makeOrder.innerHTML = '';


      makeOrder.insertAdjacentHTML('beforeend',`<h2 class=h_style_makeOrder>Стоимость заказа: <span><b>${resultPriceTotal}</b></span> руб.</h2>`);
    };
    if (resultPriceTotal === 0) {
        makeOrder.innerHTML = ''
      }
      localStorage.setItem('resultPriceTotal', JSON.stringify(resultPriceTotal));
      

      const minus_block = document.querySelectorAll('.minus');
    minus_block.forEach(button => {
      button.addEventListener('click', function() {
        const itemId = this.id; // Получаем id товара из data-атрибута
        const itemQuantity = 1; // Предполагаем, что всегда заказывается 1 штука

        // Проверяем, есть ли уже товар в корзине
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[itemId] === 1) {
          cart[itemId] -= itemQuantity;
          delete cart[itemId];


        } else {
          cart[itemId] -= itemQuantity;

        };

        localStorage.setItem('cart', JSON.stringify(cart));

        showCart();
        showCartContainer();



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

        showCart();
        showCartContainer();



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
        showCart();
        showCartContainer();
        
      });

    });


  };

  showCart();
  showCartContainer();





  let tg = window.Telegram.WebApp;

  tg.expand();

  tg.MainButton.textColor = "#FFFFFF";
  tg.MainButton.color = "#f5919b";

  

 
  const btn_order = document.getElementById("makeOrderButton_button");
  
  
  
        
  


  

  btn_order.addEventListener("click", function(){
      const resultPriceTotal_localStorage = JSON.stringify(JSON.parse(localStorage.getItem('resultPriceTotal')));
      
      
      if (tg.MainButton.isVisible) {
          tg.MainButton.hide();
      }
      else {
          tg.MainButton.setText('Оплатить в телеграм или на сайте??');
          tg.sendData(resultPriceTotal_localStorage);
          tg.MainButton.show();
      }
  });

  Telegram.WebApp.onEvent("mainButtonClicked", function(){
      tg.sendData(JSON.stringify(JSON.parse(localStorage.getItem('resultPriceTotal'))));
  });

  let usercard = document.getElementById('usercard');
  let p = document.createElement('p');
  p.innerText = '${tg.initDataUnsafe.user.first_name}${tg.initDataUnsafe.user.last_name}';
  usercard.appendChild(p);









};

if (window.location.pathname.includes('product-details.html')) {

  // Вызываем функции только на странице product-details.html
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
    priceContainer.insertAdjacentHTML('beforeend',`<p class="p-price">${product.price} руб.</p>
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

  // Добавление элементов в контейнер carousel
  document.addEventListener('DOMContentLoaded', function() {



    const prevButton = createButton('←', 'prev-button', prevImage);
    carousel.appendChild(prevButton);

    const nextButton = createButton('→', 'next-button', nextImage);
    carousel.appendChild(nextButton);


    showPath();
    showTitle();
    showImages(currentIndex);
    showDescription();
    showPrice();
    showCart();
    getOrderButtons()
  });

}




if (window.location.pathname.includes('index.html')) {
  // Сохранение данных в localStorage

  document.addEventListener('DOMContentLoaded', function() {
    updateVisibleItemCount();
    getOrderButtons()
    showCart();


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

  const detailsButtons = document.querySelectorAll('.image-text-container');
  detailsButtons.forEach(container => {
      container.addEventListener('click', function() {
          const productId = container.dataset.productId;
          window.location.href = `product-details.html?id=${productId}`;
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
      // Получаем выбранный пункт (здесь пример для одного пункта)
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
              const productCategory = product.getAttribute('data-category');
              if (selectedSet.has(productCategory) || selectedValues.includes('all')) {
                  product.style.display = 'block';
              } else {
                  product.style.display = 'none';
              }
          });
      }


}






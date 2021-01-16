// Обработчик клика по цвету
var colorBtn = document.querySelectorAll(".color__btn");
colorBtn.forEach(function(element) {
    element.addEventListener('click', toggleActiveColor, false);
});

function toggleActiveColor(e) {
    e.preventDefault();
    var parent = this.closest('.color');
    var colorText = this.innerHTML;
    var colorId = this.getAttribute('data-id');
    // parent.classList.add('active');
    parent.querySelector('.color__controller').innerHTML = colorText;
    parent.querySelector('input[name="volume"]').value = colorId;
}


//Обработчик клика по изменению количества продуктов
var сountBtn = document.querySelectorAll(".count__btn");
сountBtn.forEach(function(element) {
    element.addEventListener('click', triggerProductCount, false);
});

function triggerProductCount(e) {
    e.preventDefault();
    var parent = this.parentNode;
    var count = parent.querySelector('.count_val');
    var action = this.getAttribute('data-action');
    var result = parseInt(count.value);
    switch (action) {
        case "+":
            result = result + 1;
            break;
        case "-":
            (result <= 1) ? result = 1 : result = result - 1;
            break;
        default:
            result = result;
            break;
    }

    parent.querySelector('.count__text').innerHTML = result;
    parent.querySelector('.count_val').value = result;
    checkPrice(this);
}


//Обработчик изменние обьема который вызывает функцию пересчета цены
var volumes = document.querySelectorAll('.volume__tiny--val');
volumes.forEach(volume => {
    volume.addEventListener('change', function () {
        checkPrice(volume);
    });
});


//Функция которая обсчитывает цену
function checkPrice(el) {
    var product = el.closest('.products__tiny');
    var volume = product.querySelector('.volume__tiny input[type="radio"]:checked');
    var price = volume.getAttribute('data-price');
    var count = product.querySelector('.count_val').value;
    var result = 0;
    result = parseInt(price) * parseInt(count);
    product.querySelector('.price p span').innerHTML = result;
}

//Обработчкий изменение изображение по наведению и возвращает изначальную картинку при убирании курсора
var images = document.querySelectorAll('.products__tiny--img');
images.forEach(image => {
    image.addEventListener('mouseover', function () {
        var el = image.querySelector('img');
        var newImg = el.getAttribute('data-new');
        el.src = newImg;
    });
    image.addEventListener('mouseleave', function () {
        var el = image.querySelector('img');
        var oldImg = el.getAttribute('data-old');
        el.src = oldImg;
    })
});

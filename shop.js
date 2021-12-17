let addButton = document.querySelector('.addProduct__button'),
        removeButton = document.querySelector('.removeProduct__button'),
        calculateButton = document.querySelector('.calculate__button');

    function addProduct() {
      let fieldsArray = document.querySelectorAll('.addProduct__field input');

      fieldsArray.forEach(field => {
        if (field.value.trim() == '') {
          field.classList.add('error');
          addButton.disabled = true;

          setTimeout(()  => {
            field.classList.remove('error');
            addButton.disabled = false;
          }, 2000)
        }
      });

      if (document.querySelectorAll('input.error').length <= 0) {
        let productsList = document.querySelector('.productsList'),
            nameField = document.querySelector('.addProduct__name').value,
            imageField = document.querySelector('.addProduct__image').value,
            descriptionField = document.querySelector('.addProduct__description').value,
            priceField = document.querySelector('.addProduct__price').value,
            quantityField = document.querySelector('.addProduct__quantity').value,
            productData = `
            <div class="productsList__item">
              <p class="productsList__itemName">${nameField}</p>
              <img class="productsList__itemImage" src="${imageField}" alt="${nameField}">
              <p class="productsList__itemDescription">${descriptionField}</p>
              <p class="productsList__itemPrice">Price: <span>${priceField}</span></p>
              <p class="productsList__itemQuanlity">Quanlity: <span>${quantityField}</span></p>
              <button class="productsList__itemButton">Add product</button>
            </div>`;

          productsList.insertAdjacentHTML('beforeend', productData);

          let addedProductButtons = document.querySelectorAll('.productsList__itemButton');

          addedProductButtons.forEach(button => {
            button.addEventListener('click', (event) => {
              event.preventDefault();
              addToCart();
            })
          })
      }
    }

    function addToCart(buttons) {
      let currentProduct = event.currentTarget.closest('.productsList__item'),
          productQuantity = currentProduct.querySelector('.productsList__itemQuanlity span'),
          productPrice = currentProduct.querySelector('.productsList__itemPrice span'),
          sumValue = document.querySelector('.calculate__value span');

      productQuantity.innerText = parseInt(productQuantity.innerText) - 1;

      if (sumValue.innerText == '') {
        sumValue.innerText = parseInt(productPrice.innerText);
      } else {
        sumValue.innerText = parseInt(sumValue.innerText) + parseInt(productPrice.innerText);
      }

      if (parseInt(productQuantity.innerText) <= 0) {
        currentProduct.remove();
      }
    }

    function showSum() {
      let sumValue = document.querySelector('.calculate__value'),
          productsList = document.querySelector('.productsList');

      productsList.innerHTML = '';
      sumValue.classList.add('calculate__value--show');
    }

    function removeProduct() {
      let removeField = document.querySelector('.removeProduct__Name'),
          productTitlesArray = document.querySelectorAll('.productsList__itemName');

      if (productTitlesArray.length > 0 && removeField.value.trim() != '') {
        productTitlesArray.forEach(title => {
          if (title.innerText == removeField.value) {
            title.closest('.productsList__item').remove();
          }
        })
      } else {
        removeField.value = 'Empty list';
        removeField.classList.add('error');
        removeButton.disabled = true;

        setTimeout(()  => {
          removeField.classList.remove('error');
          removeButton.disabled = false;
        }, 2000)
      }
    }

    calculateButton.addEventListener('click', (event) => {
      event.preventDefault();
      showSum();
    });

    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      addProduct();
    });

    removeButton.addEventListener('click', (event) => {
      event.preventDefault();
      removeProduct();
    });
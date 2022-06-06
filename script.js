const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const putItemInCart = async (productId) => {
  const cart = document.querySelector('.cart__items');
  const response = await fetchItem(productId);
  const { id, title, price } = response;
  const cartItem = createCartItemElement({ sku: id, name: title, salePrice: price });
  cart.appendChild(cartItem);
};

const putProductItemElementOnScreen = async () => {
  const itemsSection = document.querySelector('.items');
  const response = await fetchProducts('computador');
  const { results: data } = response;
  data.forEach((item) => {
    const { id, title, thumbnail } = item;
    const productItem = createProductItemElement({ sku: id, name: title, image: thumbnail });
    itemsSection.appendChild(productItem);
    // productItem.lastChild is the item's button
    productItem.lastChild.addEventListener('click', () => { putItemInCart(id); });
  });
};

window.onload = () => {
  putProductItemElementOnScreen();
};

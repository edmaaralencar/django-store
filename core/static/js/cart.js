const addToCartButton = document.querySelector("#add-to-cart");
const cartButton = document.querySelector("#cart");
const cart = document.querySelector(".cart");
const APP_KEY = "@store";

function insertProductQuantityInHTML(quantity = 0) {
  document.querySelector("#cart-quantity").innerHTML = quantity;
}

function insertProductInCartHTML(product) {
  document.querySelector(".cart-container").innerHTML += `
    <div class="flex gap-4">
      <img src="${product.image}" alt="${
    product.name
  }" class="w-[140px] h-[140px]">
      <div class="flex flex-col gap-2">
        <strong class="text-2xl">${product.name}</strong>
        <span class="text-[#5b5b69] text-md">Valor: ${formatMoney(
          product.price
        )}</span>
        <span class="text-[#5b5b69] text-md">Quantidade: ${
          product.quantity
        }</span>
        <span class="text-[#5b5b69] text-md">Total: ${formatMoney(
          product.total
        )}</span>
      </div>
    </div>
  `;
}

function formatMoney(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function insertTotalInHTML(arr) {
  const total = arr.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );
  document.querySelector("#cart-total").textContent = formatMoney(total);
}

function getQuantityOfProducts(arr) {
  return arr.reduce((acc, item) => (acc += item.quantity), 0);
}

function addToCart(event) {
  const productId = event.target.dataset.product;

  const productsInStorage = getStorageItem("cart");

  if (productsInStorage && productsInStorage?.length > 0) {
    const productIsInCart = productsInStorage.find(
      (item) => item.id === productId
    );

    let product;

    if (productIsInCart) {
      const newProducts = productsInStorage.filter(
        (item) => item.id !== productId
      );

      product = {
        id: productIsInCart.id,
        quantity: (productIsInCart.quantity += 1),
      };

      const data = [...newProducts, product];
      setStorageItem("cart", data);

      insertProductQuantityInHTML(getQuantityOfProducts(data));
    } else {
      product = {
        id: productId,
        quantity: 1,
      };

      const data = [...productsInStorage, product];
      setStorageItem("cart", data);

      insertProductQuantityInHTML(getQuantityOfProducts(data));
    }
  } else {
    const data = [{ id: productId, quantity: 1 }];

    setStorageItem("cart", data);
    insertProductQuantityInHTML(getQuantityOfProducts(data));
  }
}

async function fetchCartItems() {
  const csrftoken = getCookie("csrftoken");
  const products = getStorageItem("cart");

  const response = await fetch("/get-items-from-cart/", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
    body: JSON.stringify(products),
  });

  const data = await response.json();

  for (const product of data) {
    insertProductInCartHTML(product);
  }

  insertTotalInHTML(data);
}

function getStorageItem(key) {
  if (typeof window === "undefined") return;

  const data = window.localStorage.getItem(`${APP_KEY}.${key}`);
  return JSON.parse(data);
}

function setStorageItem(key, value) {
  if (typeof window === "undefined") return;

  const data = JSON.stringify(value);
  return window.localStorage.setItem(`${APP_KEY}.${key}`, data);
}

function removeStorageItem(key) {
  if (typeof window === "undefined") return;

  return window.localStorage.removeItem(`${APP_KEY}.${key}`);
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

if (cartButton) {
  if (getStorageItem("cart")) {
    insertProductQuantityInHTML(getQuantityOfProducts(getStorageItem("cart")));
  } else {
    insertProductQuantityInHTML(0);
  }
}

if (addToCartButton) {
  addToCartButton.addEventListener("click", (event) => addToCart(event));
}

if (cart) {
  fetchCartItems();
}

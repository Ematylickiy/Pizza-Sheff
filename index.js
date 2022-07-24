new WOW().init();

const createHtmlGood = (data) => {
  return `
    <li class="goods-listItem df-column">
        <div>
            <div class='good-listItem__img '>
                <a
                    data-fancybox
                    data-src="${data.img}"
                    data-caption="${data.name}"
                >
                    <img src="${data.img}" alt="pizza">
                </a>
                
            </div>

            <div class="good-listItem-info">
                <p class="good-listItem__name">${data.name}</p>
                <p class="good-listItem__ingredients">${data.ingredients.join(
                  ", "
                )}</p>
            </div>
        </div>

        <a  href="#!" class="button  btn__cart">В корзину</a>
    </li>`;
};

const renderMenu = () => {
  const wrapperMenu = document.querySelector(".goods-list");

  menuGoods.forEach((good) => {
    wrapperMenu.innerHTML += createHtmlGood(good);
  });
};

renderMenu();

const inputPhone = document.querySelector('footer form input[type="tel"]');
inputPhone.addEventListener("focus", () => {
  const maskOptions = {
    mask: "+{375}(00)000-00-00",
  };

  const mask = IMask(inputPhone, maskOptions);
});

const showError = (small, message) => {
  small.parentElement.classList.add("invalid");
  small.textContent = message;
};

const hideError = (small) => {
  small.parentElement.classList.remove("invalid");
  small.textContent = "";
};

const validation = () => {
  const controls = document.querySelectorAll("#form input");
  let isValidForm = true;

  controls.forEach((ctrl) => {
    const small = document.getElementById(ctrl.name);
    ctrl.onfocus = () => hideError(small);

    if (!ctrl.value.trim()) {
      showError(small, "Это поле является обязательным");
      isValidForm = false;
    }

    if (
      ctrl.name === "phone" &&
      ctrl.value.length !== 17 &&
      ctrl.value.length
    ) {
      showError(small, "Введён некорректный номер");
      isValidForm = false;
    }
  });
  return isValidForm;
};

const resetForm = () => {
  const controls = document.querySelectorAll("#form input");
  controls.forEach((ctrl) => (ctrl.value = ""));
};

const overlay = document.querySelector(".overlay");

const showHidePopup = () => {
  overlay.classList.toggle("active");
};

overlay.addEventListener("click", () => showHidePopup());

const form = document.getElementById("form");
form.onsubmit = (e) => {
  e.preventDefault();

  const isValid = validation();
  if (!isValid) {
    return;
  }

  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => showHidePopup(), resetForm())
    .catch((error) => console.log(error));
};

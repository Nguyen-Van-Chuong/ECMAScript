let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
  productsInCart = [];
}
const itemCart = document.querySelector("#item-cart")

const countTheSumPrice = function () { // 4
  let sum = 0;
  productsInCart.forEach(item => {
    sum += item.price;
  });
  return sum;
}
const updataa = async function () {
  localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
  const result = await productsInCart.map(item => {
    return `
      <tr>
                    <td class="align-middle">
                      <img src="${item.image}" alt="" style="width: 50px">
                      ${item.name}
                    </td>
                    <td class="align-middle">$${item.basePrice}</td>
                    <td class="align-middle">
                      <div class="input-group quantity mx-auto" style="width: 100px">
                        <div class="input-group-btn">
                          <button class="btn btn-sm btn-primary btn-minus" data-id="${item.id}">
                            <i class="fa fa-minus"></i>
                          </button>
                        </div>
                        <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="${item.count}">
                        <div class="input-group-btn">
                          <button class="btn btn-sm btn-primary btn-plus"  data-id="${item.id}">
                            <i class="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle">$${item.price}</td>
                    <td class="align-middle">
                      <button class="btn btn-sm btn-danger"  data-id="${item.id}">
                        <i class="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
      `
  })
  // itemCart.insertAdjacentHTML("afterbegin", result)
  itemCart.innerHTML = result.join('')

  document.querySelector("#total").innerHTML = '$' + countTheSumPrice();
}
updataa()



document.addEventListener("click", (e) => {

  const isPlusButton = e.target.classList.contains('btn-plus');
  const isMinusButton = e.target.classList.contains('btn-minus');
  const clearBtn = e.target.classList.contains('btn-danger');
  if (isPlusButton || isMinusButton) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == e.target.dataset.id) {
        if (isPlusButton) {
          productsInCart[i].count += 1


        } else if (isMinusButton) {
          productsInCart[i].count -= 1
        }
        productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

        if (clearBtn) {
          // roductsInCart[i].count -= 1
          console.log("object");
        }

      }
      if (productsInCart[i].count <= 0) {
        productsInCart.splice(i, 1);
      }

    }
    updataa()

  }
})

const checkOut = document.querySelector("#check-out")
checkOut.addEventListener("click", function () {
  localStorage.removeItem('shoppingCart')[0]
})
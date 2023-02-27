import {
    initializeApp
} from "firebase/app";
// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyAAr7l7D9vn1oi2yMfPxNW-wA8kPV4L_3U",
    authDomain: "fshop-3cbbe.firebaseapp.com",
    databaseURL: "https://fshop-3cbbe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fshop-3cbbe",
    storageBucket: "fshop-3cbbe.appspot.com",
    messagingSenderId: "483860399019",
    appId: "1:483860399019:web:31863fc7cb8283e69188ee",
    measurementId: "G-HNPD5CSYN1"
};
//  
const app = initializeApp(firebaseConfig);
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

// rrealdb
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    onValue,
    query,
    startAt,
    endAt,
    orderByChild,
    limitToFirst

}
from "firebase/database"

const realdb = getDatabase();


// var OuterDiv = document.querySelector("#productsDiv");
let ArrayOfProducts = [];
window.addEventListener("load", GetAllProducts);

// function GetAllProducts() {
//     const dbref = ref(realdb);
//     get(child(dbref, "products"))
//         .then((snapshot) => {
//             snapshot.forEach(prod => {
//                 ArrayOfProducts.push(prod.val());
//             });
//             AddAllProducts();


//         })
// };
const h = document.querySelector("#price-1")
// console.log(h);


function GetAllProducts() {
    // const dbref = ref(realdb);
    // orderByChild("Price"), startAt(200), endAt(500)

    const label = document.querySelectorAll(".check")
    let que;
    label.forEach(item => {
        console.log(item);
        item.addEventListener("click", () => {
            if (item.checked == true && item.value == "1") {
                // ArrayOfProducts = []
                que = query(ref(realdb, "products"), orderByChild("Price"), startAt(200), endAt(500))
                get(que)
                    .then(snapshot => {
                        // let ArrayOfProducts = []
                        snapshot.forEach(childSnapshot => {
                            ArrayOfProducts.push(childSnapshot.val());
                        })
                        AddAllProducts();

                    })

            } else {
                que = query(ref(realdb, "products"), )
                get(que)
                    .then(snapshot => {
                        // let ArrayOfProducts = []
                        snapshot.forEach(childSnapshot => {
                            ArrayOfProducts.push(childSnapshot.val());
                        })
                        AddAllProducts();

                    })
            }
        })
    })




};

function AddAllProducts() {
    let i = 0;
    ArrayOfProducts.forEach(prod => {
        AddAProduct(prod, i++);
    });
    AssignAllEvents();
};

function AddAProduct(product, index) {
    let html = `
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1 product-under">
    <div class="product-item bg-light mb-4 text-center">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${product.LinksOfImagesArray[0]}" alt="">
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square addCart" id="addInCart" data-product-id=${index}><i
                        class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i
                        class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <p class="h6 text-decoration-none text-truncate title" id="title-${index}">
            ${product.ProductTitle}
            </div>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5 class="priceValue">${product.Price}</h5><span>$</span>
                <h6 class="text-muted ml-2"><del>$123.00</del></h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="far fa-star text-primary mr-1"></small>
                <small class="far fa-star text-primary mr-1"></small>
                <small>(99)</small>
            </div>
            <button class="btn detbtns" id="detbtn-${index}">View details</button>
        </div>
    </div>
</div>
`;
    let newProd = document.createElement("div")
    newProd.classList.add("productcard")
    newProd.innerHTML = html;
    const temp = document.querySelector(".arr")
    temp.insertAdjacentHTML("afterbegin", html)
    // -----------------------------------------------ADD CArt-----------------------------------------------------
    const products = temp.querySelectorAll(".product-under")
    // --------------------------------------------------ADD CART------------------------------------------------
    let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (!productsInCart) {
        productsInCart = [];
    }

    const updateShoppingCartHTML = function () { // 3
        localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));

    }

    function updateProductsInCart(product) { // 22222222222222222
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == product.id) {
                productsInCart[i].count += 1;
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
                return;
            }
        }
        productsInCart.push(product);
    }
    products.forEach(item => { //11111111111
        item.addEventListener("click", (e) => {
            if (e.target.classList.contains("addCart")) {
                const productID = e.target.dataset.productId;
                const productName = item.querySelector('.title').innerHTML;
                const productPrice = item.querySelector('.priceValue').innerHTML;
                const productImage = item.querySelector('img').src;
                let product = {
                    name: productName.trim(" "),
                    image: productImage,
                    id: productID,
                    count: 1,
                    price: +productPrice,
                    basePrice: +productPrice,
                }
                updateProductsInCart(product);
                updateShoppingCartHTML();
            }
        })
    })

};
// go to deltais

function GetProductIndex(id) {
    let indstart = id.indexOf('-') + 1;
    console.log(indstart);
    let indend = id.length;
    console.log(indend);
    return Number(id.substring(indstart, indend));
}

function GotoProductDeltails(event) {
    let index = GetProductIndex(event.target.id);
    localStorage.Product = JSON.stringify(ArrayOfProducts[index]);
    console.log(ArrayOfProducts[index]);
    window.location = "detail.html";
};

function AssignAllEvents() {
    const btns = document.querySelectorAll(".detbtns")
    const titles = document.querySelectorAll(".title")
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", GotoProductDeltails)
        titles[i].addEventListener("click", GotoProductDeltails)

    }
}
// window.onload = GetAllProducts
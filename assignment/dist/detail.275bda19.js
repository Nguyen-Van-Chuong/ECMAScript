let product = null;
// console.log(product);
window.onload = function() {
    product = localStorage.Product;
    console.log(product);
    if (product) {
        product = JSON.parse(product);
        LoadProduct();
    }
};
function LoadProduct() {
    document.querySelector("#titleLi").innerHTML = product.ProductTitle;
    document.querySelector("#catlink").innerHTML = product.Category;
    document.querySelector("#bigimg").src = product.LinksOfImagesArray[0];
    document.querySelector("#title").innerHTML = product.ProductTitle;
    document.querySelector("#description").innerHTML = product.Description;
    document.querySelector("#price").innerHTML = product.Price + "$";
    if (product.Stock > 1) document.querySelector("#btnDiv").innerHTML = "<h3 class='text-warning'>In stock</h3>";
    GenImgs();
}
function GenImgs() {
    let i = 1;
    let html = "";
    product.LinksOfImagesArray.forEach((imglink)=>{
        let img = document.createElement("img");
        img.src = imglink;
        const template = `
        <div class="carousel-item">
            <img src="${img.src}" class="w-100 h-100" />
              </div>
        `;
        document.querySelector("#slimg").insertAdjacentHTML("beforeend", template);
    });
}

//# sourceMappingURL=detail.275bda19.js.map

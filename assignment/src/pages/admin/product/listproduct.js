import {
    initializeApp
} from "firebase/app";
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
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import {
    getDatabase,
    ref,
    get,
    set,
    child,
    update,
    remove
} from "firebase/database"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realdb = getDatabase();
const OuterDiv = document.querySelector("#list_categories")

// btn
const LongTitle = document.querySelector("#exampleModalLongTitle")
const add = document.querySelector("#add_item")
const edit = document.querySelector("#update")
const delet = document.querySelector("#delet")
const category_id = document.querySelector("#category_id")
// btn
let ArrayOfProducts = []

function GetAllProducts() {
    const dbref = ref(realdb);
    get(child(dbref, "products"))
        .then((snapshot) => {
            snapshot.forEach(prod => {
                ArrayOfProducts.push(prod.val());
            });
            AddAllProducts();
        })
};

function AddAllProducts() {
    let i = 0;
    ArrayOfProducts.forEach(prod => {
        AddAProduct(prod, ++i);
    });

};

function AddAProduct(product, index) {
    const tempalte = document.querySelector("#list_products")
    let html = `
    <tr>
       <td id="i">${index}</td>
       <td>${product.ProductTitle}</td>
       <td>${product.Price}</td>
       <td>${product.Stock}</td>
       <td>${product.Description}</td>
       <td>                                                                                
                <button type="button"  class="btn btn-primary" id="edit_item" data-toggle="modal" data-i="${index}" data-target="#exampleModalCenter">
                    Edit
                </button>
       </td>`;

    tempalte.innerHTML += html

};

// ------------------------------add product---------------------------------
var Files = [];
var fileReaders = []
var ImageLinksArray = []
const imgdiv = document.querySelector("#imagesDiv")

const selBtn = document.querySelector("#selimgsbtn")
const addBtn = document.querySelector("#addprodbtn")
const proglab = document.querySelector("#loadlab")


const name = document.querySelector("#nameinp")
const category = document.querySelector("#category_id")
const description = document.querySelector("#description")
const price = document.querySelector("#priceinp")
const stock = document.querySelector("#stockinp")


function OpenFileDialog() {
    let inp = document.createElement('input')
    inp.type = 'file'
    inp.multiple = "multiple"
    inp.onchange = e => {
        AssignImgToFilesArray(e.target.files);
        CreateImgTags()
    }
    inp.click()
}

function AssignImgToFilesArray(thefiles) {
    let num = Files.length + thefiles.length;
    let looplim = (num <= 10) ? thefiles.length : (10 - Files.length)

    for (let i = 0; i < looplim; i++) {
        // Files.push(TheFiles[i])
        Files.push(thefiles[i])

    }
    if (num > 10) alert("maximun 10")
}


function CreateImgTags() {
    imgdiv.innerHTML = '';
    imgdiv.classList.add('imagesDivStyle')
    for (let i = 0; i < Files.length; i++) {
        fileReaders[i] = new FileReader();
        fileReaders[i].onload = function () {
            var img = document.createElement("img")
            img.id = 'imgNo' + i;
            img.classList.add("imgs");
            img.src = fileReaders[i].result;
            imgdiv.append(img)
        }
        fileReaders[i].readAsDataURL(Files[i])
    }
    let lab = document.querySelector("#label");
    lab.innerHTML = 'clear images';
    lab.style = 'cursor:pointer;display:block;color:navy;font-size:12px';
    lab.addEventListener("click", ClearImages);
    imgdiv.append(lab)
}

function ClearImages() {
    Files = [];
    ImageLinksArray = [];
    imgdiv.innerHTML = ''
    imgdiv.classList.remove('imagesDivStyle')

}

function getShortTitle() {
    let namey = name.value.substring(0, 50);
    return namey.replace(/[^a-zA-Z0-9]/g, "");
}

function GetImgUploadProgress() {
    return 'Images Uploaded ' + ImageLinksArray.length + ' of ' + Files.length
}

function IsAllImagesUploaded() {
    return ImageLinksArray.length == Files.length;
}

function RestoreBack() {
    selBtn.disabled = false;
    addBtn.disabled = false;
    proglab.innerHTML = ''
}
// -------------------------------------Even btn------------------------------------------------------
selBtn.addEventListener("click", OpenFileDialog)
addBtn.addEventListener("click", UploadAllImages)
// --------------------------------------upload imgae firebase--------------------------------------------------
function UploadAllImages() {

    ImageLinksArray = [];

    for (let i = 0; i < Files.length; i++) {

        UploadAnImage(Files[i], i);
    }
}

function UploadAnImage(imgToUpload, imgNo) {
    const metadata = {
        contentType: imgToUpload.type
    };
    const storage = getStorage();
    const ImageAddress = "TheImages/" + getShortTitle() + "/img#" + (imgNo + 1);
    const storageRef = sRef(storage, ImageAddress);
    const UploadTask = uploadBytesResumable(storageRef, imgToUpload, metadata);
    UploadTask.on('state-changed', (snapshot) => {
            proglab.innerHTML = GetImgUploadProgress()
        },
        (error) => {
            alert("error: image upload failed");
        }, () => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                ImageLinksArray.push(downloadURL);
                if (IsAllImagesUploaded()) {
                    proglab.innerHTML = "all images uploaded";
                    UploadAProduct();
                }
            });
        }
    );
}
// upload 
function UploadAProduct() {
    set(ref(realdb, "products/" + getShortTitle()), {
        Id: getShortTitle(),
        ProductTitle: name.value,
        Category: category.value,
        Description: description.value,
        Price: Number(price.value),
        Stock: Number(stock.value),
        LinksOfImagesArray: ImageLinksArray
    }).then(() => {

        alert("upload successful");
        location.reload()

    })
    RestoreBack();
}

// -----------------------------select option----------------------------------

let Categories = []

function GetAllCategories() {
    const dbref = ref(realdb);
    get(child(dbref, "categories"))
        .then((snapshot) => {
            snapshot.forEach(prod => {
                Categories.push(prod.val());
            });
            AddAllCategories();
        })
};

function AddAllCategories() {
    let i = 0;
    Categories.forEach(prod => {
        AddACategories(prod, ++i);
    });

};

function AddACategories(product, index) {
    const tempalte = document.querySelector("#category_id")
    let html = `
    <option value="${product.id}"> ${product.name}</option>`;

    tempalte.insertAdjacentHTML("beforeend", html)

};
// ------------------------------------------------------
document.addEventListener("click", function (e) {
    if (e.target.matches("#edit_item")) {
        const i = e.target.dataset.i
        delet.style.display = "block";
        edit.style.display = "block";
        addBtn.style.display = "none";
        LongTitle.innerHTML = "Edit product"
        console.log(ImageLinksArray);
        category_id.disabled = true
        name.value = ArrayOfProducts[i - 1].ProductTitle;
        category_id.value = ArrayOfProducts[i - 1].Category;
        price.value = ArrayOfProducts[i - 1].Price;
        stock.value = ArrayOfProducts[i - 1].Stock;
        description.value = ArrayOfProducts[i - 1].Description;


        // add.style.display = "none";
        // edit.style.display = "block";
        //  delet.style.display = "block";
        // delete
        delet.addEventListener("click", function (e) {


            console.log(ArrayOfProducts[i - 1].Category);
            if (confirm("bạn có muốn xóa loại hàng có tên " + ArrayOfProducts[i - 1].ProductTitle + " không") == true) {
                remove(ref(realdb, "products/" + ArrayOfProducts[i - 1].Id)).then(() => {
                    alert("data removed")
                })
                location.reload();
            }
        })

        //  update
        edit.addEventListener("click", function (e) {
            if (confirm("bạn muốn cập nhật loại hàng " + ArrayOfProducts[i - 1].ProductTitle + " ?") == true) {
                update(ref(realdb, "products/" + ArrayOfProducts[i - 1].Id), {
                    Id: ArrayOfProducts[i - 1].Id,
                    ProductTitle: name.value,
                    Category: category.value,

                    Description: description.value,
                    Price: Number(price.value),
                    Stock: Number(stock.value),
                    LinksOfImagesArray: ImageLinksArray
                }).then(() => {
                    location.reload();
                })
            }
        })


    } else if (e.target.matches("#add_item")) {

        delet.style.display = "none";
        edit.style.display = "none";
        selBtn.style.display = "block"
        addBtn.style.display = "block"
        category_id.disabled = false

        name.value = ""
        price.value = ""
        description.value = ""
        stock.value = ""
        category.value = ""
    }
});

window.onload = GetAllProducts;
GetAllCategories()
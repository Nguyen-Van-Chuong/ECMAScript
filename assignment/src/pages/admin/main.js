  // Import the functions you need from the SDKs you need
  import {
      initializeApp
  } from "firebase/app";

  // TODO: Add SDKs for Firebase 
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
  const app = initializeApp(firebaseConfig);

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
  const realdb = getDatabase();
  const OuterDiv = document.querySelector("#list_categories")
  let ArrayOfProducts = []

  function GetAllProducts() {
      const dbref = ref(realdb);
      get(child(dbref, "categories"))
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
      const tempalte = document.querySelector("#category")
      let html = `
  <tr>
                                     <td id="i">${index}</td>
                                     <td>${product.name}</td>
                                     <td>
                                 
                               
              <!-- Button trigger modal -->
                                            
              <button type="button"  class="btn btn-primary" id="delete_item" data-toggle="modal" data-i="${index}" data-target="#exampleModalCenter">
                  Edit
              </button>
                                     </td>`;

      tempalte.innerHTML += html

  };
  const name = document.querySelector("#name")
  // btn
  const LongTitle = document.querySelector("#exampleModalLongTitle")
  const add = document.querySelector("#add")
  const edit = document.querySelector("#update")
  const delet = document.querySelector("#delet")
  const category_id = document.querySelector("#category_id")
  // btn
  document.addEventListener("click", function (e) {
      if (e.target.matches("#delete_item")) {
          const i = e.target.dataset.i
          category_id.disabled = true
          LongTitle.innerHTML = "Edit Category"
          name.value = ArrayOfProducts[i - 1].name;
          category_id.value = ArrayOfProducts[i - 1].id;
          add.style.display = "none";
          edit.style.display = "block";
          delet.style.display = "block";
          // delete
          delet.addEventListener("click", function () {
              // console.log(ArrayOfProducts[i].name);
              if (confirm("bạn có muốn xóa loại hàng có tên " + ArrayOfProducts[i - 1].name + " không") == true) {
                  remove(ref(realdb, "categories/" + ArrayOfProducts[i - 1].id)).then(() => {
                      alert("data removed")
                  })
                  location.reload();
              }
          })

          //  update
          edit.addEventListener("click", function (e) {
              if (confirm("bạn muốn cập nhật loại hàng " + ArrayOfProducts[i - 1].name + " ?") == true) {
                  update(ref(realdb, "categories/" + ArrayOfProducts[i - 1].id), {
                      id: category_id.value,
                      name: name.value
                  }).then(() => {
                      location.reload();
                  })
              }
          })


      } else if (e.target.matches("#add_item")) {

          let i = 0
          name.value = ""
          category_id.value = ""
          LongTitle.innerHTML = "Add category"
          category_id.disabled = false
          add.style.display = "block";
          edit.style.display = "none"
          delet.style.display = "none"

          add.addEventListener("click", () => {
              let i = 0;
              if (name.value == "" || category_id.value == "") {

                  return alert("Name or ID empty")
              }

              if (confirm("bạn có muốn thêm loại hàng " + name.value) == true) {
                  set(ref(realdb, "categories/" + category_id.value), {
                      id: Number(category_id.value),
                      name: name.value
                  }).then(() => {
                      location.reload();

                  }).catch(err => {
                      alert("errr")
                  })
              }
          });
      }
  });
  window.onload = GetAllProducts;
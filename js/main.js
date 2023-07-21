var siteNameInput = document.getElementById("siteName");
var siteurlInput = document.getElementById("siteurl");
var productSearchInput = document.getElementById("searchInput");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex;
var products = [];
products = JSON.parse(localStorage.getItem("products"));
if (products == null) {
  products = [];
} else {
  displayProducts();
}
function addProduct() {
  var product = {
    name: siteNameInput.value,
    url: siteurlInput.value,
  };
  products.push(product);
  console.log(products);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
  clearForm();
}
/* <i class="fa-solid fa-eye pe-2></i> */
function displayProducts() {
  var data = "";
  for (var i = 0; i < products.length; i++) {
    console.log(products[i].name);
    data += ` <tr>
<td>${i+1}</td>
<td>${products[i].name}</td>
<td><button id="visitBtn" class="btn btn-outline-visit btn-sm" onClick="visitWebsite(${i})">
<i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
<td>
  <button id="updateBtn" class="btn btn-outline-warning  btn-sm" onClick="setProduct(${i})">
  <i class="fa-solid fa-edit pe-2"></i>Update</button>
  <button id="deleteBtn"  class="btn btn-outline-danger btn-sm" onClick="deleteProduct(${i})" >
  <i class="fa-solid fa-trash pe-2"></i>Delete</button>

</td>
</tr>`;
  }
  document.getElementById("tabledata").innerHTML = data;
}
function visitWebsite(index){
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(products[index].url)) {
    open(products[index].url);
  } else {
    open(`https://${products[index].url}`);
  }
}
function deleteProduct(element) {
  products.splice(element, 1);
  localStorage.setItem("products", JSON.stringify(products));
  if (productSearchInput.value == null) displayProducts();
  else searchProduct();
}
function searchProduct() {
  var term = productSearchInput.value;
  var data = "";
  for (var i = 0; i < products.length; i++) {
    if (
      products[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    ) {
      data += ` <tr>
      <td>${i+1}</td>
      <td>${products[i].name}</td>
      <td><button id="visitBtn" class="btn btn-outline-visit btn-sm" onClick="visitWebsite(${i})">
      <i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
      <td>
        <button id="updateBtn" class="btn btn-outline-warning  btn-sm" onClick="setProduct(${i})">
        <i class="fa-solid fa-edit pe-2"></i>Update</button>
        <button id="deleteBtn"  class="btn btn-outline-danger btn-sm" onClick="deleteProduct(${i})" >
        <i class="fa-solid fa-trash pe-2"></i>Delete</button>
      
      </td>
      </tr>`;
    }
  }

  document.getElementById("tabledata").innerHTML = data;
}
function setProduct(element) {
  currentIndex = element;

  var currentProduct = products[element];

  siteNameInput.value = currentProduct.name;
  siteurlInput.value = currentProduct.url;
  console.log(currentProduct);

  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");

  //  products.splice(element,1);
  // localStorage.setItem("products", JSON.stringify(products));

  //displayProducts();
}
function updateProduct() {
  var product = {
    name: siteNameInput.value,
    url: siteurlInput.value,
  };

  products.splice(currentIndex, 1, product);
  localStorage.setItem("products", JSON.stringify(products));

  displayProducts();
   updateBtn.classList.add("d-none");
   addBtn.classList.remove("d-none");
   clearForm();
}
function clearForm(){
    siteNameInput.value = null;
    siteurlInput.value = null;
}


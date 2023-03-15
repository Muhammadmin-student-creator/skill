let div = document.querySelector(".ghj");
const form = document.getElementById("form-add");
let names = document.getElementById("name");
const modal = document.getElementById("modal-skill");
function getRow(el) {
  return `
  <div class="tr">
    <h1>${el.name}</h1>
    <div class="j">
    <p>${el._id}</p>
    <p>${el.percent}</p>
        <div>
        <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-targe
            t="#experience-modal"
            onclick="{editxp('${el._id}')}"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        >
            <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger" onclick="{deleteExp('${el._id}')}">
            <i class="bi bi-trash3"></i>
        </button>
        </div>
  </div>
    `;
}

let id;
function getPortfolios() {
  div.innerHTML =
    '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  request.get("skills").then((res) => {
    div.innerHTML = "";
    for (el of res.data.data) {
      div.innerHTML += getRow(el);
    }
  });
}

getPortfolios();

function deleteExp(id) {
  let check = confirm("Rostanam o'chirishni xohlaysizmi ?");
  if (check) {
    request.delete(`skills/${id}`).then((res) => {
      getPortfolios();
    });
  }
}

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   this.classList.add("was-validated");
//   let check = this.checkValidity();
//   console.log("work");
//   if (check) {
//     let data = {
//       name: names.value,
//       percent: res.data.percent,
//     };
//     request.post("skills", data).then(() => {
//       bootstrap.Modal.getInstance(modal).hide();
//       getPortfolios();
//       alert("Portfolio is added");
//     });
//   }
// });

const fname = document.getElementById("name");
const ids = document.getElementById("Id");
const percent = document.getElementById("pr");
const submit = document.getElementById("submit");
let selec;
function editxp(id) {
  selec = id;
  fname.value = "...loading";
  ids.value = "...loading";
  percent.value = "...loading";
  request.get("skills").then((res) => {
    let r = res.data.data;
    for (el of r) {
      if (el._id == id) {
        fname.value = el.name;
        ids.value = el._id;
        percent.value = el.percent;
        submit.addEventListener("click", function (e) {
          el.name = fname.value;
          el._id = ids.value;
          el.percent = percent.value;
          getPortfolios();
        });
      }
    }
  });
}

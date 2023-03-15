let div = document.querySelector(".lk");

function getRow(el) {
  return `
  <div class="lk">
  <div class="tr">
    <h1>${el.work_name}</h1>
    <div class="j">
      <p>${el.description}</p>
      <p class="hello">${el.company_name}</p>
      <p>${el._id}</p>
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
  </div>
</div>
      `;
}

function getPortfolios() {
  div.innerHTML =
    '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  request.get("experiences").then((res) => {
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
    request.delete(`experiences/${id}`).then((res) => {
      getPortfolios();
    });
  }
}

const work_name = document.getElementById("work_name");
const company_name = document.getElementById("company_name");
const description = document.getElementById("description");
const start_date = document.getElementById("start_date");
const end_date = document.getElementById("end_date");

submit.addEventListener("click", () => {
  let data = {
    work_name: `${work_name.value}`,
    company_name: `${company_name.value}`,
    description: `${description.value}`,
    start_date: `${start_date.value}`,
    end_date: `${end_date.value}`,
  };

  request
    .post("experiences", data)
    .then((res) => {
      console.log(res);
      bootstrap.Modal.getInstance(modal).hide();
      getPortfolios();
      alert("experience is added");
    })
    .finally(() => {
      experienceBtn.disabled = false;
    });
});

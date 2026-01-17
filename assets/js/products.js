
const category = new URLSearchParams(location.search).get("category");
document.querySelector(".categoryName").textContent = category;

let currentPage = 1;
let limit = 6; 
let sortField = "title";
let sortOrder = "asc";


const getProducts = async () => {
    const skip = (currentPage - 1) * limit;

    const response = await axios.get(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortField}&order=${sortOrder}`
    );

    return response.data;
};

const displayProducts = async () => {
    const result = await getProducts();

    const productsHTML = result.products
        .map(prod => `
           <div class="card col-md-3 p-0" onclick="showDetails(${prod.id})">
                <img src="${prod.thumbnail}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${prod.title}</h5>
                    <p class="card-text">Price: $${prod.price}</p>
                    <p class="card-text">Rating: ${prod.rating}</p>
                </div>
            </div>
        `)
        .join("");

    document.querySelector(".productsRow").innerHTML = productsHTML;

    createPagination(result.total);
};

const createPagination = (total) => {
    const totalPages = Math.ceil(total / limit);
    let buttons = "";
    buttons += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <button class="page-link" onclick="changePage(${currentPage - 1})">&laquo;</button>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        buttons += `
            <li class="page-item ${currentPage === i ? "active" : ""}">
                <button class="page-link" onclick="changePage(${i})">${i}</button>
            </li>
        `;
    }
    buttons += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <button class="page-link" onclick="changePage(${currentPage + 1})">&raquo;</button>
        </li>
    `;

    document.querySelector(".pagination").innerHTML = buttons;
};

const changePage = (page) => {
    currentPage = page;
    displayProducts();
};

const applySort = () => {
    sortField = document.getElementById("sortField").value;
    sortOrder = document.getElementById("sortOrder").value;

    currentPage = 1;
    displayProducts();
};


displayProducts();

const showDetails = (id) => {
    location.href = `details.html?id=${id}`;
};

const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/category-list");
    return response.data;
};

const displayCategories = async () => {
    const categories = await getCategories();

    const cards = categories
        .map(cat => `
    <div class="card col-md-3 p-0" onclick="goToCategory('${cat}')">
        <div class="card-body text-center">
            <h5 class="card-title text-capitalize">${cat}</h5>
        </div>
    </div>
    `).join("");
    console.log(cards);
    document.querySelector(".categoriesRow").innerHTML = cards;
};

displayCategories();

const goToCategory = (catName) => {
    location.href = `products.html?category=${catName}`;
};

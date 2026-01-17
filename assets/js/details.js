
const id = new URLSearchParams(location.search).get("id");
const getProduct = async () => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
};
const displayProduct = async () => {
    const p = await getProduct();
    document.querySelector(".productTitle").textContent = p.title;
    document.querySelector(".mainImage").src = p.images[0];
    document.querySelector(".thumbnails").innerHTML = p.images
        .map(src => `
            <img src="${src}" width="70" class="border rounded" onclick="changeImage('${src}')">
        `)
        .join("");
    document.querySelector(".productDesc").textContent = p.description;
    document.querySelector(".productStock").textContent = 
        p.stock > 0 
        ? `In stock (${p.stock})`
        : "Out of stock";
    document.querySelector(".reviewsList").innerHTML = p.reviews
        .map(r => `
            <li class="list-group-item">
                <strong>${r.reviewerName}</strong> (${r.rating}/5):<br>
                ${r.comment}
            </li>
        `)
        .join("");
};
const changeImage = (src) => {
    document.querySelector(".mainImage").src = src;
};

displayProduct();

const apiUrl = "https://6784e7831ec630ca33a640d3.mockapi.io/products";
const productsContainer = document.getElementById("products-container");

// دالة Fetch لعرض المنتجات
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        // عرض المنتجات باستخدام map
        productsContainer.innerHTML = products.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <h2 class="card-title">${product.title}</h2>
                    <p class="card-price">$${product.Price}</p>
                    <p class="card-description">${product.Description}</p>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                    <button onclick="updateProduct(${product.id})">Update</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// دالة لإضافة منتج جديد
document.getElementById("addForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                Price: price,
                Description: description,
                image: image
            })
        });
        alert("Product added successfully");
        fetchProducts();
        document.getElementById("addForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
    }
});

// دالة لحذف منتج
async function deleteProduct(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        alert("Product deleted");
        fetchProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

// دالة لتحديث منتج
async function updateProduct(id) {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle })
            });
            alert("Product updated");
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
}

// جلب المنتجات عند تحميل الصفحة
fetchProducts();

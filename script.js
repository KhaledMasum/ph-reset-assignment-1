// Load All Products
function loadAllProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      const products = data;

      showTrandingProducts(products);
    });
}

// Show trending products
function showTrandingProducts(products) {
  const trandingContainer = document.getElementById("tranding-container");

  products.slice(0, 3).forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
          <div class="card bg-base-100 shadow-sm">
            <figure class="h-40 flex items-center justify-center">
                <img
                    src="${product.image}"
                    class="h-full object-contain"
                />
            </figure>
              <div class="p-4">
                  <div class="flex justify-between items-center">
                    <div class="badge badge-primary">
                        ${product.category}
                    </div>

                    <div>
                        <i class="fa-solid fa-star text-amber-600"></i>
                        ${product.rating.rate} (${product.rating.count})
                    </div>
                  </div>

                  <h2 class="card-title line-clamp-2">${product.title}</h2>
                  <p class="line-clamp-3">${product.description}</p>
                  <h2 class="text-2xl font-bold">$${product.price}</h2>

                  <div class="flex gap-2 mt-3">
                  <button class="btn btn-primary btn-outline btn-sm flex-1" onclick="loadProductDetails(${product.id})">
                      Details
                  </button>
                  <button class="btn btn-primary btn-sm flex-1">Add to Cart</button>
                  </div>
              </div>
          </div>
      `;

    trandingContainer.appendChild(productDiv);
  });
}

// Product details modal
function loadProductDetails(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      handleProductModal(data);
    });
}

const handleProductModal = (product) => {
  const productDetailsContainer = document.getElementById(
    "trending-product-container",
  );

  productDetailsContainer.innerHTML = `
    <h2 class="font-bold text-2xl">${product.title ? product.title : "No title found"}</h2>
    <p>${product.description ? product.description : "No description found"}</p>
    <div class="flex justify-between items-center">
      <h4 class="text-2xl font-semibold">Price: $${product.price ? product.price : "No price found"}</h4>
      <div>
          <i class="fa-solid fa-star text-amber-600"></i>
          ${product.rating.rate}
      </div>
    </div>
    <button class="btn btn-primary btn-sm flex-1">Buy Now</button>
  `;

  document.getElementById("trending_product_modal").showModal();
};

loadAllProducts();

/* =========================
   PRODUCTS
========================= */

const products = [

    {
        id: 1,
        name: "Nova Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.9,
        icon: "🎧"
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 3299,
        rating: 4.8,
        icon: "⌚"
    },

    {
        id: 3,
        name: "Urban Backpack",
        category: "fashion",
        price: 1899,
        rating: 4.7,
        icon: "🎒"
    },

    {
        id: 4,
        name: "Classic Sneakers",
        category: "fashion",
        price: 2799,
        rating: 4.9,
        icon: "👟"
    },

    {
        id: 5,
        name: "Minimal Sunglasses",
        category: "accessories",
        price: 1299,
        rating: 4.6,
        icon: "🕶️"
    },

    {
        id: 6,
        name: "Wireless Speaker",
        category: "electronics",
        price: 2199,
        rating: 4.8,
        icon: "🔊"
    },

    {
        id: 7,
        name: "Classic Cap",
        category: "fashion",
        price: 799,
        rating: 4.5,
        icon: "🧢"
    },

    {
        id: 8,
        name: "Travel Bottle",
        category: "accessories",
        price: 999,
        rating: 4.7,
        icon: "🥤"
    }

];


/* =========================
   STATE
========================= */

let currentCategory = "all";

let cart = [];


/* =========================
   ELEMENTS
========================= */

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const cartBtn =
    document.getElementById("cartBtn");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "all" ||
                product.category === currentCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    /* =========================
       SORT
    ========================== */

    if (sortSelect.value === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortSelect.value === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortSelect.value === "rating") {

        filtered.sort(
            (a, b) => b.rating - a.rating
        );

    }


    /* =========================
       CLEAR GRID
    ========================== */

    productGrid.innerHTML = "";


    /* =========================
       CREATE PRODUCT CARDS
    ========================== */

    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <button
                class="wishlist"
                type="button"
                aria-label="Add ${product.name} to wishlist"
                aria-pressed="false"
                onclick="toggleWishlist(this)"
            >
                ♡
            </button>


            <div
                class="product-image"
                aria-hidden="true"
            >
                ${product.icon}
            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>


                <h3>
                    ${product.name}
                </h3>


                <div
                    class="rating"
                    aria-label="Rating ${product.rating} out of 5"
                >
                    ★ ${product.rating}
                </div>


                <div class="price-row">

                    <span class="price">
                        ₹${product.price.toLocaleString()}
                    </span>


                    <button
                        class="add-btn"
                        type="button"
                        aria-label="Add ${product.name} to cart"
                        onclick="addToCart(${product.id})"
                    >
                        +
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(card);

    });


    /* =========================
       PRODUCT COUNT
    ========================== */

    productCount.textContent =
        `${filtered.length} products`;


    /* =========================
       NO PRODUCTS
    ========================== */

    noProducts.classList.toggle(
        "hidden",
        filtered.length !== 0
    );

}


/* =========================
   CATEGORY FILTER
========================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn => {

                        btn.classList.remove("active");

                        btn.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    });


                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );


                currentCategory =
                    button.dataset.category;


                displayProducts();

            }
        );

    });


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    displayProducts
);


/* =========================
   SORT
========================= */

sortSelect.addEventListener(
    "change",
    displayProducts
);


/* =========================
   WISHLIST
========================= */

function toggleWishlist(button) {

    const isSelected =
        button.getAttribute("aria-pressed") === "true";


    if (!isSelected) {

        button.textContent = "♥";

        button.style.color = "#ff5577";

        button.setAttribute(
            "aria-pressed",
            "true"
        );

        button.setAttribute(
            "aria-label",
            "Remove from wishlist"
        );

    } else {

        button.textContent = "♡";

        button.style.color = "";

        button.setAttribute(
            "aria-pressed",
            "false"
        );

        button.setAttribute(
            "aria-label",
            "Add to wishlist"
        );

    }

}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


    cart.push(product);


    updateCart();


    openCart();

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartCount.textContent =
        cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent =
            "₹0";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        item.innerHTML = `

            <div
                class="cart-item-image"
                aria-hidden="true"
            >
                ${product.icon}
            </div>


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price.toLocaleString()}
                </p>

            </div>


            <button
                class="remove-item"
                type="button"
                aria-label="Remove ${product.name} from cart"
                onclick="removeFromCart(${index})"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `₹${total.toLocaleString()}`;

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    cart.splice(index, 1);


    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("show");

    cartPanel.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================
   CART BUTTON
========================= */

cartBtn.addEventListener(
    "click",
    openCart
);


/* =========================
   CLOSE CART
========================= */

function closeCartPanel() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("show");

    cartPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


overlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            cartPanel.classList.contains("open")
        ) {

            closeCartPanel();

        }

    }
);


/* =========================
   INITIAL LOAD
========================= */

displayProducts();

updateCart();
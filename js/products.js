// ============================================
// STEWART GADGETDROP - PRODUCT DATA
// Edit this file to add your own products
// ============================================

const allProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        brand: "Apple",
        category: "Phones",
        price: 1250000,
        oldPrice: 1350000,
        rating: 4.8,
        reviews: 124,
        image: "images/products/iphone-15-pro.jpg",
        inStock: true,
        isNew: true,
        isBestSeller: true,
        discount: 7
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "Phones",
        price: 1150000,
        oldPrice: 1250000,
        rating: 4.7,
        reviews: 98,
        image: "images/products/samsung-s24.jpg",
        inStock: true,
        isNew: true,
        isBestSeller: false,
        discount: 8
    },
    {
        id: 3,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        category: "Phones",
        price: 950000,
        oldPrice: 1050000,
        rating: 4.6,
        reviews: 76,
        image: "images/products/pixel-8-pro.jpg",
        inStock: true,
        isNew: false,
        isBestSeller: false,
        discount: 10
    },
    {
        id: 4,
        name: "Apple AirPods Pro 2",
        brand: "Apple",
        category: "Earbuds",
        price: 350000,
        oldPrice: 400000,
        rating: 4.5,
        reviews: 210,
        image: "images/products/airpods-pro.jpg",
        inStock: true,
        isNew: true,
        isBestSeller: true,
        discount: 12
    },
    {
        id: 5,
        name: "Samsung Galaxy Watch 6",
        brand: "Samsung",
        category: "Smartwatches",
        price: 450000,
        oldPrice: 500000,
        rating: 4.4,
        reviews: 56,
        image: "images/products/galaxy-watch.jpg",
        inStock: true,
        isNew: false,
        isBestSeller: false,
        discount: 10
    },
    {
        id: 6,
        name: "Xiaomi Power Bank 20000mAh",
        brand: "Xiaomi",
        category: "Accessories",
        price: 85000,
        oldPrice: 100000,
        rating: 4.3,
        reviews: 45,
        image: "images/products/power-bank.jpg",
        inStock: true,
        isNew: false,
        isBestSeller: false,
        discount: 15
    },
    {
        id: 7,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        category: "Phones",
        price: 1450000,
        oldPrice: 1550000,
        rating: 4.9,
        reviews: 89,
        image: "images/products/iphone-15-pro-max.jpg",
        inStock: false,
        isNew: true,
        isBestSeller: true,
        discount: 6
    },
    {
        id: 8,
        name: "Samsung Galaxy Buds 2",
        brand: "Samsung",
        category: "Earbuds",
        price: 200000,
        oldPrice: 250000,
        rating: 4.2,
        reviews: 34,
        image: "images/products/galaxy-buds.jpg",
        inStock: true,
        isNew: false,
        isBestSeller: false,
        discount: 20
    }
];

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') return allProducts;
    return allProducts.filter(p => p.category === category);
}

// Function to get a single product by ID
function getProductById(id) {
    return allProducts.find(p => p.id === parseInt(id));
}

// Function to format price in MWK
function formatPrice(price) {
    return 'MWK ' + price.toLocaleString('en-US');
}
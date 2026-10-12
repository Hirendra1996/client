const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    count: "1,240 Products",
    img: U("photo-1498049794561-7780e7231661"),
    subcategories: ["Headphones", "Smartwatches", "Speakers", "Cameras"]
  },
  {
    id: "fashion",
    name: "Fashion",
    count: "2,890 Products",
    img: U("photo-1441986300917-64674bd600d8"),
    subcategories: ["Men", "Women", "Footwear", "Watches"]
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    count: "1,560 Products",
    img: U("photo-1556911220-bff31c812dba"),
    subcategories: ["Kitchen", "Decor", "Furniture", "Lighting"]
  },
  {
    id: "beauty",
    name: "Beauty",
    count: "980 Products",
    img: U("photo-1596462502278-27bfdc403348"),
    subcategories: ["Skincare", "Makeup", "Fragrance", "Haircare"]
  },
  {
    id: "sports",
    name: "Sports",
    count: "760 Products",
    img: U("photo-1461896836934-ffe607ba8211"),
    subcategories: ["Fitness", "Footwear", "Accessories", "Yoga"]
  },
  {
    id: "accessories",
    name: "Accessories",
    count: "1,120 Products",
    img: U("photo-1511499767150-a48a237f0083"),
    subcategories: ["Bags", "Sunglasses", "Belts", "Jewelry"]
  },
  {
    id: "mobiles",
    name: "Mobiles",
    count: "640 Products",
    img: U("photo-1511707171634-5f897ff02aa9"),
    subcategories: ["Smartphones", "Cases & Covers", "Chargers", "Screen Protectors"]
  },
  {
    id: "computers",
    name: "Computers",
    count: "420 Products",
    img: U("photo-1496181133206-80ce9b88a853"),
    subcategories: ["Laptops", "Desktops", "Monitors", "Keyboards"]
  }
];

export const NAV_LINKS = [
  { name: "Electronics", href: "#categories" },
  { name: "Fashion", href: "#categories" },
  { name: "Beauty", href: "#categories" },
  { name: "Home & Kitchen", href: "#categories" },
  { name: "Mobiles", href: "#categories" },
  { name: "Computers", href: "#categories" },
  { name: "Sports", href: "#categories" },
  { name: "Accessories", href: "#categories" },
  { name: "✨ New Arrivals", href: "#new", special: "brand" },
  { name: "Best Sellers", href: "#best" },
  { name: "🔥 Offers", href: "#flash", special: "sale" }
];

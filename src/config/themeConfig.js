const Config_url = "http://localhost:3000"; // Fallback to localhost if env variable is missing
// const Config_url = "https://e-commerce-smoky-eight.vercel.app"; // Fallback to localhost if env variable is missing

const themeConfig = {
  breadcrumb_title: "Home",
  no_found_logo: "/image/NoFoundLogo.png",
  no_found_image: "/image/No-Found-2.png",
  no_found_user: "/image/User.png",
  seo_image: "/image/favicon.png",
  seo_title: "Modern Furniture Ecommerce Website",
  seo_discription: "Modern Furniture Ecommerce Website",
  api: {
    data_url: `${Config_url}/json/data/data.json`,
    header_url: `${Config_url}/json/data/header.json`,
    footer_url: `${Config_url}/json/data/footer.json`,
    homepage_url: `${Config_url}/json/data/homepage.json`,
    single_product_url: `${Config_url}/json/data/singleproduct.json`,
    service_url: `${Config_url}/json/data/service.json`,
    about_us_url: `${Config_url}/json/data/aboutus.json`,
    error_url: `${Config_url}/json/data/error.json`,
    our_team_url: `${Config_url}/json/data/ourteam.json`,
    blogs_url: `${Config_url}/json/data/blogs.json`,
    blog_classic_url: `${Config_url}/json/data/blogclassic.json`,
    blog_details_url: `${Config_url}/json/data/blogdetails.json`,
    shop_url: `${Config_url}/json/data/shop.json`,
    gallery_url: `${Config_url}/json/data/gallery.json`,
    termsandprivacypolicy_url: `${Config_url}/json/data/termsandprivacypolicy.json`,
    contactus_url: `${Config_url}/json/data/contactus.json`,
    shoppingcart_url: `${Config_url}/json/data/shoppingcart.json`,
    wishlist_url: `${Config_url}/json/data/wishlist.json`,
    signinup_url: `${Config_url}/json/data/signinup.json`,
    shipping_url: `${Config_url}/json/data/shipping.json`,
  },
};

export default themeConfig;

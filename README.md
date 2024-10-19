# Topico Store [E-Commerce WebPage]

 E-commerce platform that allows users to browse and purchase a wide variety of products. The website features a user-friendly interface, robust account management, and an efficient product management system for admins

## Demo
You can explore the live demo of Topiko Store [Here](https://ahmedsaleh020.github.io/e-commerce/)

## Website Pages
### Homepage: 
  - A welcoming page showcasing featured products
  - Slider
- Shopping Cart Functionality :

  - Add to Cart: Users can easily add products to their cart while browsing.
  - Remove from Cart: Users can also remove products from the cart at any time.
 
  - Cart Storage:

    - If a user is not logged in, their cart data is stored locally using local storage, ensuring that their cart is preserved even when they leave the site or refresh the page.
    - If a user is logged in, their account cart  is stored in JSON file using jsonbin.io, allowing them to access and manage their accounts from any device or browser as long as they are logged into their account.

### All Products Page: 

   - Displays a complete list of products available for purchase.
   - Includes filters to refine product searches based on:

     - Category
     - Price
     - Rating

### Account Page : 
  - View Their Account Data
  - Change Their passwords
  - Log Out :

    - Update their account data in the jsonbin.io.
    - redirect user to the login page.

### Control Panel
  - Allow Admins To Upload New Products.
  - Products Images Stored Through Cloudinary.
### About Page
  - Information about TobikoStore and its mission.
### Contact Page
  - A form for users to reach out for inquiries or support.
  - Admins Can View Message Through Their Account Page.

## User Authentication and Authorization
* Users can create accounts and log in to their profiles.
* Two types of users: regular users and admins.
* Admins have the exclusive ability to add new products through a control panel.
* Non Admin Users redirected automatically from control panel to Home Page in case of reach it.
* Visitors redirect automatically from account page in case of reach it to home page.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

* **Ahmed Saleh**  -- Web Developer-- [GitHub](https://github.com/ahmedsaleh020)

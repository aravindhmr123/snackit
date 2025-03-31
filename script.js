document.addEventListener("DOMContentLoaded", () => {
  const cart = []; // Declare the cart array once at the top
  const cartLink = document.getElementById("cart-link");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  const closeBtns = document.querySelectorAll(".close-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  const menuSection = document.getElementById("menu-section");
  const menuToggleButton = document.getElementById("menu-toggle");

  const checkoutButton = document.getElementById("checkout-btn");
  const checkoutModal = document.getElementById("checkout-modal"); // Checkout modal
  const closeCheckoutButton = document.getElementById("close-checkout"); // Close checkout modal button
  const checkoutForm = document.getElementById("checkout-form");

  // Toggle the menu visibility when the "Show Menu" button is clicked
  menuToggleButton.addEventListener("click", () => {
    if (menuSection.style.display === "none" || menuSection.style.display === "") {
      menuSection.style.display = "grid";  // Show menu
      menuToggleButton.textContent = "Hide Menu"; // Change button text
    } else {
      menuSection.style.display = "none";  // Hide menu
      menuToggleButton.textContent = "Show Menu"; // Change button text
    }
  });

  // Show the cart modal when the cart is clicked
  cartLink.addEventListener("click", () => {
    cartModal.style.display = "block";
    updateCartModal();
  });

  // Close the cart modal
  closeBtns.forEach(button => {
    button.addEventListener("click", () => {
      cartModal.style.display = "none";
      checkoutModal.style.display = "none"; // Ensure checkout modal is closed when cart modal closes
    });
  });

  // Close the cart modal or checkout modal when clicking outside the modal
  window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    } else if (event.target === checkoutModal) {
      checkoutModal.style.display = "none";
    }
  });

  // Handle add-to-cart button clicks
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const menuItem = event.target.closest(".menu-item");
      const name = menuItem.dataset.name;
      const price = parseInt(menuItem.dataset.price);
      const image = menuItem.dataset.image;

      // Check if item already exists in cart, if so, increase quantity, else add new item
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        const item = {
          name,
          price,
          image,
          quantity: 1
        };
        cart.push(item);
      }

      updateCartCount();
      alert(`${name} added to cart`);
    });
  });

  // Update the cart count
  function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Update the cart modal content
  function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.style.width = "80px";  // Reduce image size

      const itemName = document.createElement("h4");
      itemName.textContent = item.name;

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `₹${item.price} x ${item.quantity}`;

      // Add increase, decrease, and remove buttons
      const increaseBtn = document.createElement("button");
      increaseBtn.textContent = "+";
      increaseBtn.classList.add("quantity-btn");
      increaseBtn.addEventListener("click", () => {
        item.quantity++;
        updateCartModal();
      });

      const decreaseBtn = document.createElement("button");
      decreaseBtn.textContent = "-";
      decreaseBtn.classList.add("quantity-btn");
      decreaseBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          updateCartModal();
        }
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        updateCartModal();
      });

      // Append elements to itemElement
      itemElement.appendChild(img);
      itemElement.appendChild(itemName);
      itemElement.appendChild(itemPrice);
      itemElement.appendChild(increaseBtn);
      itemElement.appendChild(decreaseBtn);
      itemElement.appendChild(removeBtn);

      cartItemsContainer.appendChild(itemElement);

      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total;
  }

  // Handle Checkout button click
  checkoutButton.addEventListener("click", () => {
    cartModal.style.display = "none"; // Hide the cart modal
    checkoutModal.style.display = "block"; // Show the checkout modal
  });

  // Handle closing the checkout modal
  closeCheckoutButton.addEventListener("click", () => {
    checkoutModal.style.display = "none"; // Close the checkout modal when close button is clicked
  });

  // Handle Checkout Form Submission
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh

    alert("Thank you for your order! Your order has been placed and will be served within 10 minutes.");
    checkoutModal.style.display = "none"; // Hide checkout modal after submission

    // Clear the cart after checkout
    cart.length = 0;
    updateCartCount(); // Update cart count display
  });
});

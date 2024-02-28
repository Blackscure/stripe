// Set your publishable key
var stripe = Stripe('pk_live_51OF2twGRUcFCrmzmwaNKasizaKuvTylDYXnzH06gJXObAnvaRSyCaAgkrckZwcnbVFycrM9nBEicAKk6Onoi3qnP00wOjFgy2H');

// Create an instance of Elements
var elements = stripe.elements();

// Create an instance of the card Element
var card = elements.create('card');

// Add an instance of the card Element into the `card-element` div
card.mount('#card-element');

// Handle real-time validation errors from the card Element
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle payment submission
document.getElementById('submit-payment').addEventListener('click', function() {
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server or handle it as needed
      handleToken(result.token);
    }
  });
});

// Function to handle the token (e.g., send it to your server)
function handleToken(token) {
  // You can implement your logic here
  console.log('Received token:', token);
  alert('Payment successful!');
}

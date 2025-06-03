const firebaseConfig = {
    apiKey: "AIzaSyCtQlQ8nZn4BtOdqYKJJwW8ldl1Jm0C6Q0",
    authDomain: "contactform-424c6.firebaseapp.com",
    databaseURL: "https://contactform-424c6-default-rtdb.firebaseio.com",
    projectId: "contactform-424c6",
    storageBucket: "contactform-424c6.firebasestorage.app",
    messagingSenderId: "515266503481",
    appId: "1:515266503481:web:138a9d8dab97dc2fd37ee8"
  };

//initialize firebase
firebase.initializeApp(firebaseConfig);

//reference for contactForm database
var contactFormDB = firebase.database().ref('contactForm');

//reference for quoteForm database
var quoteFormDB = firebase.database().ref('quoteForm');

// Existing contactForm submit handler
document.getElementById('contactForm').addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();

  var name = getElementVal('name');
  var email = getElementVal('email');
  var phone = getElementVal('phone');
  var message = getElementVal('message');

  console.log("Submitting contactForm with data:", {name, email, phone, message});

  saveMessages(name, email, phone, message)
    .then(() => {
      console.log("Contact form data saved successfully.");
      const alertDiv = document.querySelector('.alert');
      alertDiv.style.display = "block";

      // Hide alert after 3 seconds
      setTimeout(() => {
        alertDiv.style.display = "none";
      }, 3000);

      // Clear form
      document.getElementById('contactForm').reset();
    })
    .catch((error) => {
      console.error("Error saving contact form data:", error);
      alert("There was an error submitting the contact form. Please try again later.");
    });
}

const saveMessages = (name, email, phone,message) => {
  var newContactForm = contactFormDB.push();

  return newContactForm.set({
    name : name,
    email : email,
    phone : phone,
    message : message,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// New quoteForm submit handler
document.getElementById('quoteForm').addEventListener('submit', submitQuoteForm);

function submitQuoteForm(e) {
  e.preventDefault();

  var name = document.getElementById('quoteName').value;
  var email = document.getElementById('quoteEmail').value;
  var phone = document.getElementById('quotePhone').value;
  var serviceType = document.querySelector('#quoteForm select[name="serviceType"]').value;
  var houseType = document.querySelector('#quoteForm select[name="frequency"]').value; // house type select has name frequency in index.html
  var bedrooms = document.querySelector('#quoteForm select[name="bedrooms"]').value;
  var bathrooms = document.querySelectorAll('#quoteForm select[name="bedrooms"]')[1].value; // second select with name bedrooms is bathrooms
  var frequency = document.querySelectorAll('#quoteForm select[name="frequency"]')[1].value; // second select with name frequency is frequency

  console.log("Submitting quoteForm with data:", {name, email, phone, serviceType, houseType, bedrooms, bathrooms, frequency});

  saveQuote(name, email, phone, serviceType, houseType, bedrooms, bathrooms, frequency)
    .then(() => {
      console.log("Quote form data saved successfully.");
      // Show alert for quoteForm submission success
      alert("Your quote request has been submitted successfully.");

      // Clear quoteForm
      document.getElementById('quoteForm').reset();
    })
    .catch((error) => {
      console.error("Error saving quote form data:", error);
      alert("There was an error submitting the quote form. Please try again later.");
    });
}

const saveQuote = (name, email, phone, serviceType, houseType, bedrooms, bathrooms, frequency) => {
  var newQuoteForm = quoteFormDB.push();

  return newQuoteForm.set({
    name: name,
    email: email,
    phone: phone,
    serviceType: serviceType,
    houseType: houseType,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    frequency: frequency,
  });
};

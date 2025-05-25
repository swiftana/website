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

  //reference for database
var contactFormDB = firebase.database().ref('contactForm');

document.getElementById('contactForm').addEventListener('submit',submitForm);


function submitForm(e){
  e.preventDefault();

  var name = getElementVal('name');
  var email = getElementVal('email');
  var phone = getElementVal('phone');
  var message = getElementVal('message');

  saveMessages(name, email, phone, message);

}

const saveMessages = (name, email, phone,message) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name : name,
    email : email,
    phone : phone,
    message : message,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

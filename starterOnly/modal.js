function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const cities = document.querySelectorAll("input[name='location']"); 
const form = document.querySelector("form");
const button = document.querySelector(".btn-submit");
const box = document.querySelector(".modal-body");
const inputs = document.querySelectorAll('input[type = "text"], input[type= "email"], input[type= "date"], input[type= "number"], input[type= "radio"], input[type = "checkbox"]');
let firstData, lastData, emailData, birthdateData, quantityData, cityData, check1, check2;


//------------------------open and close modal------------------------------
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal(){
  modalbg.style.display = "none";
}
//--------------------------------------------------------------------------


//-----------------------Ecouteurs d'évenements-----------------------------
//Ecouteurs inputs
inputs.forEach((input) => input.addEventListener("input", (e)=>{
  
  switch(e.target.id){
    case "first":
      firstCheck(e.target.value);
      break;
    case "last":
      lastCheck(e.target.value);
      break;
    case "email":
      emailCheck(e.target.value);
      break;
    case "birthdate":
      dateCheck(e.target.value);
      break;
    case "quantity":
      quantityCheck(e.target.value);
      break;
    case "checkbox1":
      checkboxCheck1(e.target.checked);
      break; 
    case "checkbox2":
      checkboxCheck2(e.target.checked);
      break;
    default:
      null;
  }
})); 

//--------------------------------------------------------------------------


//--------------------------Messages erreurs--------------------------------
const messageError = {
	name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  nameError: "Ceci ne doit pas contenir de caractères spéciaux ou de chiffres",
  email: "Veuillez entrer une adresse email valide.",
	birthdate:"Vous devez entrer votre date de naissance.",
  bithdateLimit: "Vous devez avoir minimum 13 ans pour vous inscrire",
  quantityMgs: "Vous devez rentrer une quantité",
	location: "Vous devez choisir une option.",
	checkbox: "Vous devez vérifier que vous acceptez les termes et conditions.",
};

//--------------------------------------------------------------------------


//--------------------------error function----------------------------------
const errorDisplay = (tag, message, valid) =>{
  const classError = tag.parentNode;
  const redMessage = tag.parentNode.setAttribute('data-error', message);

  if(!valid){
    classError.setAttribute('data-error-visible', 'true');
    redMessage;
  }else{
    classError.setAttribute('data-error-visible', '');
    redMessage;
  }
}

//--------------------------------------------------------------------------


//-------------------------- submit form------------------------------------
function validate(){    
  //pour determiner la hauteur du modal
  let heightBox = box.offsetHeight;

if ( firstData /* && lastData && emailData && birthdateData && quantityData && cityData && check1 */ ){
  const data = {
    firstData,
    lastData,
    emailData,
    birthdateData,
    quantityData,
    cityData,
    check1,
    check2,
  }
  //recup des datas
  console.log(data);
  //reset du formulaire en cas de reload
  form.reset();
  checkbox1.checked = false;
  //
  form.innerHTML = "Merci pour votre inscription";
  box.style.height= heightBox + "px";
  box.classList.add("thanks");
  form.classList.add("thanks-form");
  let newBtn = document.createElement("input");
  newBtn.setAttribute("value", "Fermer");
  newBtn.type = "submit";
  newBtn.className = "btn-submit";
  box.appendChild(newBtn);
  newBtn.addEventListener("click", closeModal);
  return false
}else{
  alert("Vous devez remplir les champrs manquant")
  firstCheck(first.value);
  lastCheck(last.value);
  emailCheck(email.value);
  dateCheck(birthdate.value);
  quantityCheck(quantity.value);
  cityCheck;
  checkboxCheck1(checkbox1.checked)
  return false
  }
}

//--------------------------------------------------------------------------


// ----------------------------name check-----------------------------------
const nameRegex = /^[a-zA-Z\-]+$/
const firstCheck = (value) => {
  if(value.length < 2){
    errorDisplay(first, messageError.name);
    firstData = null;
    
  }else if(!value.match(nameRegex)){
    errorDisplay(first, messageError.nameError);
    firstData = null;
    
  }else{
    errorDisplay(first, "", true);
    firstData = value;
    
  }
};
const lastCheck = (value) => {

  if(value.length < 2){
    errorDisplay(last, messageError.name)
    lastData = null;
  }else if(!value.match(nameRegex)){
    errorDisplay(last, messageError.nameError)
    lastData = null;
  }else{
    errorDisplay(last, "", true);
    lastData = value;
  }
};

//--------------------------------------------------------------------------


// -----------------------------email check---------------------------------
const emailCheck = (value) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	if(!value.match(mailformat))
	{
    errorDisplay(email, messageError.email);
    emailData = null;
		}else{
    errorDisplay(email, "", true);
    emailData = value;
    }
};

//--------------------------------------------------------------------------


//--------------------------------date check--------------------------------
const dateCheck = (value) => {
  let now = new Date();
  let birth = new Date(value);
  let ageMs = now.getTime() - birth.getTime();
  let age = ageMs / (1000 * 3600 * 24 * 365);
  console.log( age);
  if(age < 2 ){
    errorDisplay(birthdate, messageError.bithdateLimit);
    birthdateData = null;
  }else if(isNaN(age)){
    errorDisplay(birthdate, messageError.birthdate);
    birthdateData = null;
    console.log(birth)
  } else{
    errorDisplay(birthdate, "", true);
    birthdateData = value;
  }

  };

//--------------------------------------------------------------------------


//-------------------------------quantity check-----------------------------
const quantityCheck = (value) => {
  let regexNum = /\d/;
if(!regexNum.test(value)){
  errorDisplay(quantity, messageError.quantityMgs);
  quantityData = null;
} else if(value == ""){
  errorDisplay(quantity, messageError.quantityMgs);
  quantityData = null;
} else{
  errorDisplay(quantity, "", true);
  quantityData = value;
}
};

//--------------------------------------------------------------------------


//---------------------------------checkbox check---------------------------
const checkboxCheck1 = (value) =>{
  
  if(!value){
    errorDisplay(checkbox1, messageError.checkbox);
    check1 = null;
  }else{
    errorDisplay(checkbox1, "", true);
    check1 = value;
    
  }
}
const checkboxCheck2 = (value) =>{
    check2 = value;
}

//--------------------------------------------------------------------------


//----------------------------------cities check----------------------------

  const cityCheck = () =>{

    for( const city of cities){
      if(city.checked){
        cityData = city.value;
        errorDisplay(location6, "", true);
        break;
      }else{
        errorDisplay(location6, messageError.location);
        cityData = null;
      }
    }
  };
  //Ecouteur les radio cities
  cities.forEach((input) => input.addEventListener('change', cityCheck));

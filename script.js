const passwordInput = document.getElementById("password");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const crackTime = document.getElementById("crackTime");

const lengthCheck = document.getElementById("lengthCheck");
const upperCheck = document.getElementById("upperCheck");
const lowerCheck = document.getElementById("lowerCheck");
const numberCheck = document.getElementById("numberCheck");
const symbolCheck = document.getElementById("symbolCheck");

const warningMessage = document.getElementById("warningMessage");
const commonResult = document.getElementById("commonResult");

/* =========================
   LIVE PASSWORD CHECK
========================= */

passwordInput.addEventListener("input", updateStrength);

function updateStrength() {

    const password = passwordInput.value;

    const validLength =
        password.length >= 8 &&
        password.length <= 32;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    lengthCheck.innerHTML =
        validLength ? "☑ 8 - 32 Characters" : "✖ 8 - 32 Characters";

    upperCheck.innerHTML =
        hasUpper ? "☑ Uppercase Letter" : "✖ Uppercase Letter";

    lowerCheck.innerHTML =
        hasLower ? "☑ Lowercase Letter" : "✖ Lowercase Letter";

    numberCheck.innerHTML =
        hasNumber ? "☑ Number" : "✖ Number";

    symbolCheck.innerHTML =
        hasSymbol ? "☑ Symbol" : "✖ Symbol";

    let score = 0;

    if(validLength) score++;
    if(hasUpper) score++;
    if(hasLower) score++;
    if(hasNumber) score++;
    if(hasSymbol) score++;

    if(password.length === 0){

        strengthText.innerHTML = "Strength: -";
        strengthFill.style.width = "0%";
        crackTime.innerHTML =
            "Estimated Crack Time: -";

        return;
    }

    if(score <= 2){

        strengthText.innerHTML =
            "Strength: Weak";

        strengthFill.style.width = "33%";
        strengthFill.style.backgroundColor = "red";

        crackTime.innerHTML =
            "Estimated Crack Time: Less than 1 Minute";

    }
    else if(score <= 4){

        strengthText.innerHTML =
            "Strength: Medium";

        strengthFill.style.width = "66%";
        strengthFill.style.backgroundColor = "orange";

        crackTime.innerHTML =
            "Estimated Crack Time: Few Days";

    }
    else{

        strengthText.innerHTML =
            "Strength: Strong";

        strengthFill.style.width = "100%";
        strengthFill.style.backgroundColor = "limegreen";

        crackTime.innerHTML =
            "Estimated Crack Time: 100+ Years";
    }

    warningMessage.innerHTML = "";
    commonResult.innerHTML = "";
}

/* =========================
   CHECK PASSWORD BUTTON
========================= */

document
.getElementById("checkPasswordBtn")
.addEventListener("click", function(){

    const password = passwordInput.value;

    const validLength =
        password.length >= 8 &&
        password.length <= 32;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const allConditionsMet =
        validLength &&
        hasUpper &&
        hasLower &&
        hasNumber &&
        hasSymbol;

    if(!allConditionsMet){

        warningMessage.innerHTML =
            "⚠ Password does not satisfy all security requirements.";

        commonResult.innerHTML = "";
        return;
    }

    warningMessage.innerHTML =
        "✅ Password satisfies all security requirements.";

    const commonPatterns = [
        "password",
        "admin",
        "welcome",
        "qwerty",
        "123456",
        "123123",
        "1122",
        "pass@123",
        "abc123"
    ];

    let commonFound = false;

    const lowerPassword =
        password.toLowerCase();

    for(let pattern of commonPatterns){

        if(lowerPassword.includes(pattern)){

            commonFound = true;
            break;
        }
    }

    if(commonFound){

        commonResult.innerHTML =
            "⚠ Common password pattern detected.";

    }
    else{

        commonResult.innerHTML =
            "✅ Password not found in common password list.";

    }

});

/* =========================
   SHOW / HIDE PASSWORD
========================= */

document
.getElementById("togglePassword")
.addEventListener("click", function(){

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

    }else{

        passwordInput.type = "password";
    }

});

/* =========================
   COPY PASSWORD INPUT
========================= */

document
.getElementById("copyPasswordInput")
.addEventListener("click", function(){

    navigator.clipboard.writeText(
        passwordInput.value
    );

});

/* =========================
   LENGTH SLIDER
========================= */

const slider =
document.getElementById("lengthSlider");

const lengthValue =
document.getElementById("lengthValue");

slider.addEventListener("input", function(){

    lengthValue.innerHTML =
        slider.value;

});

/* =========================
   STRONG PASSWORD SUGGESTION
========================= */

document
.getElementById("suggestBtn")
.addEventListener("click", function(){

    const upper =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lower =
        "abcdefghijklmnopqrstuvwxyz";

    const numbers =
        "0123456789";

    const symbols =
        "!@#$%^&*()_+-=";

    const all =
        upper + lower + numbers + symbols;

    let password = "";

    password += upper[Math.floor(Math.random()*upper.length)];
    password += lower[Math.floor(Math.random()*lower.length)];
    password += numbers[Math.floor(Math.random()*numbers.length)];
    password += symbols[Math.floor(Math.random()*symbols.length)];

    const length =
        parseInt(slider.value);

    for(let i = 4; i < length; i++){

        password += all[
            Math.floor(Math.random()*all.length)
        ];
    }

    password =
        password.split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    document.getElementById(
        "generatedPassword"
    ).value = password;

});

/* =========================
   COPY GENERATED PASSWORD
========================= */

document
.getElementById("copyBtn")
.addEventListener("click", function(){

    const generated =
        document.getElementById(
            "generatedPassword"
        ).value;

    navigator.clipboard.writeText(
        generated
    );

    document.getElementById(
        "copyMessage"
    ).innerHTML =
        "✅ Password copied successfully.";

});
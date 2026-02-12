const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    tagalog: [
        "Hindi",
        "Sigurado ka ba?",
        "Siguradong-sigurado ka na ba??",
        "Talaga bang siguradong-sigurado ka na???",
        "Pag-isipan mo uli?",
        "Di ka naniniwala sa second chances?",
        "Bakit ang cold mo naman?",
        "Pwede naman nating pag-usapan 'yan?",
        "Hindi na ako magtatanong ulit!",
        "Ok masakit na sa damdamin ah!",
        "Ang sama mo naman!",
        "Bakit mo ginagawa sa'kin 'to?",
        "Pagbigyan mo naman ako oh!",
        "Nagmamakaawa ako, tama na!",
        "Sige na, simulan natin uli.."
    ]
};

answers_yes = {
    "english": "Yes",
    "tagalog": "Oo"
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        document.getElementById('rejection-message').textContent = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        document.getElementById('rejection-message').textContent = ""; // Reset message
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }


    // Bubble animation
    no_button.classList.add('bubble');

    // Reset dimensions to auto to measure natural size
    no_button.style.width = 'auto';
    no_button.style.height = 'auto';

    // Force measure
    const width = no_button.offsetWidth;
    const height = no_button.offsetHeight;
    const diameter = Math.max(width, height) + 10; // slightly larger for comfort

    no_button.style.width = `${diameter}px`;
    no_button.style.height = `${diameter}px`;

    const buffer = 50; // Increased buffer for safety (account for shadows etc)
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const maxWidth = viewportWidth - diameter - buffer;
    const maxHeight = viewportHeight - diameter - buffer;

    // Ensure we don't get negative values if the screen is too small
    const safeMaxWidth = Math.max(0, maxWidth);
    const safeMaxHeight = Math.max(0, maxHeight);

    const randomX = Math.random() * safeMaxWidth + buffer / 2;
    const randomY = Math.random() * safeMaxHeight + buffer / 2;

    no_button.style.left = `${randomX}px`;
    no_button.style.top = `${randomY}px`;
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
    // clear rejection message
    document.getElementById('rejection-message').textContent = "";
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "tagalog") {
        questionHeading.textContent = "Pwede bang maging Valentine kita?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    no_button.innerHTML = answers_no[language][0];

    // Clear rejection message on language change
    document.getElementById('rejection-message').textContent = "";

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "tagalog") {
        successMessage.textContent = "Yieee, kita-kits soon :3";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}
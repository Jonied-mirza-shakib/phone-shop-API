const searchPhone = () => {
    const inputField = document.getElementById('input-field');
    const isInputField = inputField.value;
    if (inputField.value == '') {
        const errorMessageOne = document.getElementById('error-message-two');
        errorMessageOne.innerText = 'Please search your phone';
    } else {
        const errorMessageOne = document.getElementById('error-message-two');
        errorMessageOne.style.display = 'none';
        const spinner = document.getElementById('spinner').style.display = 'block';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${isInputField}`)
            .then(res => res.json())
            .then(data => displayPhone(data.data))


        inputField.value = '';
        showPhoneDetails();
    }

}

const displayPhone = phoneItem => {
    console.log(phoneItem)
    if (phoneItem.length == 0) {
        const errorMessageOne = document.getElementById('error-message-one');
        errorMessageOne.innerText = 'No result found';
        const spinner = document.getElementById('spinner').style.display = 'none';
    } else {
        const errorMessageOne = document.getElementById('error-message-one');
        errorMessageOne.style.display = 'none'
        const phoneDetails = document.getElementById('phone-details-section');
        phoneDetails.textContent = '';
        phoneItem.forEach(isPhoneItem => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.style.textAlign = 'center';
            div.style.backgroundColor = 'green';
            div.innerHTML = `
            <div class="card" style='background-color:darkblue;color:white'>
            <img src="${isPhoneItem.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${isPhoneItem.brand}</h4>
                <h5>${isPhoneItem.phone_name}</h5>
                <h6>${isPhoneItem.slug}</h6>
                <button onclick="phoneDetails('${isPhoneItem.slug}')" type="button" class="btn btn-primary fs-4">
                Explore
                </button>
            </div>
        </div>
            `
            phoneDetails.appendChild(div)
            const spinner = document.getElementById('spinner').style.display = 'none';
        })

    }

}

const phoneDetails = phoneInformation => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneInformation}`)
        .then(res => res.json())
        .then(data => showPhoneDetails(data.data))
}
phoneDetails()
const showPhoneDetails = showDetails => {
    const showDetailsPhone = document.getElementById('show-phone-details');
    showDetailsPhone.textContent = '';
    let div = document.createElement('div');
    div.innerHTML = `
    <div class="card text-center mb-5 w-50 mx-auto" style='background-color: darkblue; color:white'>
    <img class='mx-auto' width="100%" src="${showDetails.image}" alt="">
    <div class="card-body">
    <h4>${showDetails.name}</h4>
    <h4>${showDetails.mainFeatures.storage}</h4>
    <h5>${showDetails.mainFeatures.displaySize}</h5>
    <h5>${showDetails.mainFeatures.chipSet}</h5>
    <h5>${showDetails.mainFeatures.memory}</h5>
    <h5>${showDetails.mainFeatures.sensors[0]}</h5>
    <h5>${showDetails.mainFeatures.sensors[1]}</h5>
    <h5>${showDetails.mainFeatures.sensors[2]}</h5>
    <h5>${showDetails.mainFeatures.sensors[3]}</h5>
    <h5>${showDetails.mainFeatures.sensors[4]}</h5>
    <h5>${showDetails.releaseDate ? showDetails.releaseDate : 'no release date'}</h5>
    <h5>${showDetails.others.WLAN}</h5>
    <h5>${showDetails.others.Bluetooth}</h5>
    <h5>${showDetails.others.GPS}</h5>
    <h6>${showDetails.others.NFC}</h6>
    <h6>${showDetails.others.Radio}</h6>
    <p>${showDetails.others.USB}</p>
    </div>
  </div>
    `
    showDetailsPhone.appendChild(div)
}
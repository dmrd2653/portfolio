function validate() {
    let msg = "";
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
 
    if (name == "" || null) {
        alert(msg = "Name is required.");
        return false;
    } else if (email == "" || null) {
        alert(msg = "Email is required.");
        return false;
    } else if (message == "" || null) {
        alert(msg = "Message is required.");
        return false;
    } else {
        sendEmail();
        return true;
    }
}

function sendEmail() {
    event.preventDefault();
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };
    
    const serviceID = "service_1nidvlp";
    const templateID = "template_cfzc5to";
    
    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message has been sent successfully! Thank you!");
        })
        .catch((err) => console.err(err));
}


    


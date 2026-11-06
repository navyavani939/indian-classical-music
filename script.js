const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    // Get User Details

    const name = contactForm.querySelector(
        'input[type="text"]'
    ).value.trim();

    const email = contactForm.querySelector(
        'input[type="email"]'
    ).value.trim();

    const message = contactForm.querySelector(
        "textarea"
    ).value.trim();


    try {

        // Send Data To Backend

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name: name,

                email: email,

                message: message

            })

        });


        const result = await response.json();

        if (response.ok && result.success) {

            document.getElementById("message").innerText =
            "Thank you! Your message saved successfully.";

            contactForm.reset();

        } else {

            document.getElementById("message").innerText =
            result.message;

            
        }

    }

    catch (error) {

        document.getElementById("message").innerText =
        "Server connection failed!";

        console.log(error);

    }

});
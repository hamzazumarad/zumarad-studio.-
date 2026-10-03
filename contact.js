/* =========================================
   ZUMARAD STUDIO
   CONTACT FORM — EMAIL + WHATSAPP
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const whatsappButton = document.getElementById("sendProjectWhatsApp");

    if (!contactForm) {
        console.warn("Contact form not found.");
        return;
    }


    /* =====================================
       GET FORM DATA
    ===================================== */

    function getFormData() {

        const name = document
            .getElementById("name")
            ?.value
            .trim();

        const email = document
            .getElementById("email")
            ?.value
            .trim();

        const service = document
            .getElementById("service")
            ?.value
            .trim();

        const message = document
            .getElementById("message")
            ?.value
            .trim();


        if (!name || !email || !service || !message) {

            alert("Please fill in all fields.");

            return null;
        }


        return {
            name,
            email,
            service,
            message
        };
    }


    /* =====================================
       CREATE MESSAGE
    ===================================== */

    function createMessage(data) {

        return `NEW PROJECT REQUEST

Name: ${data.name}
Email: ${data.email}
Service: ${data.service}

Project Details:
${data.message}

--------------------------------
Zumarad Studio
`;
    }


    /* =====================================
       EMAIL SUBMIT
    ===================================== */

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const data = getFormData();

        if (!data) return;


        const subject =
            `New Project Request - ${data.service}`;


        const body = createMessage(data);


        const emailURL =
            "mailto:hamzazumarad@gmail.com" +
            "?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);


        window.location.href = emailURL;

    });


    /* =====================================
       WHATSAPP
    ===================================== */

    if (whatsappButton) {

        whatsappButton.addEventListener("click", () => {

            const data = getFormData();

            if (!data) return;


            const whatsappMessage =
                createMessage(data);


            const whatsappNumber =
                "923278518193";


            const whatsappURL =
                "https://api.whatsapp.com/send?phone=" +
                whatsappNumber +
                "&text=" +
                encodeURIComponent(whatsappMessage);


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    console.log(
        "Contact system loaded: Email + WhatsApp"
    );

});
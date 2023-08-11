// toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for aninmation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this
        else{
            sec.classList.remove('show-animate');
            
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

async function cfSubmitMessage() {
    var cfvalue = {
      name: GEBID("cfname").value,
      email: GEBID("cfemail").value.toLowerCase(),
      phone_no: GEBID("cfphone").value,
      subject: GEBID("cfsubject").value,
      message: GEBID("cfmessage").value,
    };
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    
    if (cfvalue.name === "" || cfvalue.email === "" || cfvalue.phone_no === "" || cfvalue.subject === "" || cfvalue.message === "") {
        return;
    } 
    else if (!emailRegex.test(cfvalue.email)) {
        return;
    } else {
        GEBID("cfbutton").removeAttribute("onclick");
        GEBID("cfbutton").classList.remove("color");
        GEBID("cfbutton").classList.add("onclick");
        GEBID("cfbutton").innerHTML = "Sending...";

        try {
        var sendmessage = await (
            await fetch(
            'https://conform.ukqqdzfj.workers.dev/',
            {
                method: "POST",
                body: JSON.stringify(cfvalue),
            }
            )
        ).json();

        if (sendmessage.status) {
            GEBID("cfbutton").innerHTML = "Sent!";

            localStorage.setItem(
            "contact-form",
            JSON.stringify({
                sent: true,
                canSendUnix: new Date().getTime() + 43200000,
            })
            );
        } else {
            throw new Error("Error");
        }
        } catch (error) {
        console.log(error);
        GEBID("cfbutton").innerHTML = "Error!";
        }
      }
}

function GEBID(id) {
    return document.getElementById(id);
}
const tabs = document.querySelectorAll('.tab-link');
console.log(tabs);
const tabPanes = document.querySelectorAll('.tab-pane');
console.log(tabPanes);


tabs.forEach(tab => {
    tab.addEventListener('click',() => {
        //remover active de tab
        tabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        //agregar el active al tab seleccionado
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    })
})

document.addEventListener("DOMContentLoaded", function () {
    // Manejo de pestañas
    const tabs = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Manejo de certificados en modal
    document.querySelectorAll(".formacion__certificado").forEach(button => {
        button.addEventListener("click", function () {
            const certificadoSrc = this.getAttribute("data-src");

            // Crear modal
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.style.cssText = `
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            // Contenido del modal
            const modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");
            modalContent.style.cssText = `
                background: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                max-width: 900px;
                width: 80%;
                position: relative;
            `;

            // Botón para cerrar
            const closeBtn = document.createElement("span");
            closeBtn.innerHTML = "&times;";
            closeBtn.style.cssText = `
                position: absolute;
                top: -4px;
                right: 20px;
                font-size: 30px;
                cursor: pointer;
            `;
            closeBtn.addEventListener("click", function () {
                document.body.removeChild(modal);
            });

            // Crear certificado (PDF o imagen)
            let certificadoElement;
            if (certificadoSrc.endsWith(".pdf")) {
                certificadoElement = document.createElement("iframe");
                certificadoElement.src = certificadoSrc;
                certificadoElement.style.cssText = "width: 100%; height: 500px; border: none;";
            } else {
                certificadoElement = document.createElement("img");
                certificadoElement.src = certificadoSrc;
                certificadoElement.style.cssText = "width: 100%; max-height: 400px;";
            }

            // Agregar elementos al modal
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(certificadoElement);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Cerrar modal al hacer clic fuera de él
            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
});


function getCountryInfo() {
    const countryName = document.getElementById("country-input").value.trim();
    const errorMessage = document.getElementById("error-message");
    const continent = document.getElementById("continent");
    const capital = document.getElementById("capital");
    const languages = document.getElementById("languages");

    // Limpiar mensajes anteriores
    errorMessage.textContent = "";
    continent.textContent = "";
    capital.textContent = "";
    languages.textContent = "";

    // Expresión regular: solo letras y espacios
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (countryName === "") {
        errorMessage.textContent = "Por favor, ingresa un nombre de país.";
        return;
    }

    if (!regex.test(countryName)) {
        errorMessage.textContent = "El nombre del país solo debe contener letras y espacios.";
        return;
    }

    // Llamada a la API
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(response => response.json())
    .then(data => {
        const country = data[0];
        continent.textContent = `Continente: ${country.continents}`;
        capital.textContent = `Capital: ${country.capital}`;
        languages.textContent = `Idioma(s): ${Object.values(country.languages).join(", ")}`;
    })
    .catch(() => {
        errorMessage.textContent = "No se encontró el país. Verifica el nombre e intenta nuevamente.";
    });
}
/*------------------- Toggle -------------------*/
//Se obtiene el elemento al que se va a hacer clic
let elemento = document.getElementById("elemento");
//Se obtiene el elemento a mostrar (nav)
let nav = document.getElementById("nav");
if (elemento) {
    elemento.addEventListener("click", function () {
        nav.classList.toggle("mostrar_toggle");
    })
}
//let btn_enviar = document.getElementById("btn_enviar");
/*------------------- Notificación -------------------*/
let formulario = document.getElementById("formulario");
let cerrar_ntfc = document.getElementById("cerrar_ntf");
let notificacion = document.getElementById("notificacion");
//----------------------------------------------------

//Cuando hacemos click en el boton de enviar
formulario.addEventListener("submit", async function (event) {
    event.preventDefault();
    enviar_formulario();
});

let th = document.getElementById("th");
//-----------------------------------------------------------------
async function enviar_formulario() {
    //Obtener los atributos y datos del objeto que fue creado en base a las propiedades del formulario
    const nuevo_mensaje = getData();
    const { nombre, correo, tema, mensaje } = nuevo_mensaje; // Desestructura el objeto
    th.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`
    try {
        const response = await fetch("https://formsubmit.co/1631e16ef41958e333a87b253e90e0c7", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevo_mensaje)
        }
        );

        if (response.ok) {
            th.innerHTML = "";
            if (nombre && correo && tema && mensaje) {
                //Mostrar la notificación
                notificacion.classList.add("mostrar_notificacion");
                //Agregar la animación de llegada de la notificacion
                notificacion.classList.add("animacion_ntf");
                //Quitar la animación de retroceso de la notificación
                notificacion.classList.remove("retirada");

                setTimeout(function () {
                    notificacion.classList.remove("animacion_ntf");
                    notificacion.classList.add("retirada");
                }, 5000)
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getData = () => {
    //Trae los datos del formulario
    const datos = new FormData(formulario);
    //Convierte los datos como propiedad de un objeto
    const datos_procesados = Object.fromEntries(datos.entries());
    console.log("Datos procesados:", datos_procesados); // Verifica los datos procesados

    //Limpia los campos del formulario
    formulario.reset();
    //Retorno un objeto como los datos ingresados
    return datos_procesados;
}

cerrar_ntfc.addEventListener("click", function () {
    //Hacemos clic en el botón de cerrar
    notificacion.classList.remove("animacion_ntf");
    notificacion.classList.add("retirada");
});

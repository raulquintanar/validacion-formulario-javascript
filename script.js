const firebaseConfig = {
    apiKey: "AIzaSyB_EfezSQGyem0pQ-Nsh9hHSUW7rusAtEg",
    authDomain: "datos-de-formulario-f568b.firebaseapp.com",
    projectId: "datos-de-formulario-f568b",
    storageBucket: "datos-de-formulario-f568b.appspot.com",
    messagingSenderId: "464105499634",
    appId: "1:464105499634:web:d56852dc2999532dcc196b",
    measurementId: "G-QJZ565KBR5"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) =>{ 
    event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, escribe tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electrónico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, escribe un mail valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')        
    }

    //Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas, minúsculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')  
    }
    
    //Si todos los campos son válidos, enviar formularios
    
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
        //BACKEND QUE RECIBE
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });



        alert('El formulario se ha enviado con éxito')
        document.getElementById('formulario').reset();
    }
            
})
export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacío"
  },
  email: {
      valueMissing: "Este campo no puede estar vacío",
      typeMismatch: "El correo no es válido",
  },
  password: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "6 caracteres mínimo, 12 caractéres máximo, debe contener 1 letra minúscula, 1 letra mayúscula y 1 número, no puede contener caracteres especiales",
  },
  nacimiento: {
      valueMissing: "Este campo no puede estar vacío",
      customError: "Debes tener al menos 18 años de edad",
  },
  telefono: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El formato requerido es XXXXXXXXXX",
  },
  direccion: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "Este campo debe tener entre 10 y 40 caracteres",
  },
  ciudad: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "Este campo debe tener entre 4 y 40 caracteres",
  },
  estado: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "Este campo debe tener entre 4 y 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
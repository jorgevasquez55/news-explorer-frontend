const INTERNAL_SERVER_ERROR = 500;
const CONFLICT_ERROR = 409;
const UNAUTHORIZED_ERROR = 401;
const BAD_REQUEST = 400;

export function authErrorHandler(err) {
  const { statusCode = 500 } = err;

  if (err.message) {
    return { message: err.message };
  }

  if (statusCode === INTERNAL_SERVER_ERROR) {
    return {
      message: "Ocurrió un error en el servidor, inténtalo de nuevo más tarde.",
    };
  }

  if (statusCode === CONFLICT_ERROR) {
    return {
      message: "Error al crear la cuenta: el correo ya está registrado.",
    };
  }

  if (statusCode === UNAUTHORIZED_ERROR) {
    return {
      message: "Correo o contraseña inválidos, verifica e inténtalo de nuevo.",
    };
  }

  if (statusCode === BAD_REQUEST) {
    return {
      message: "Correo inválido, verifica e inténtalo de nuevo.",
    };
  }
}

const questions = [
  {
    pregunta: "Which file does give an overview of known shells on a Linux system?",
    opciones: ["/etc/shells", "/etc/passwd", "/etc/profile", "/bin/bash"],
    respuesta: 0,
    explicacion: "El archivo /etc/shells lista las shells conocidas en el sistema."
  },
  {
    pregunta: "How to switch from one shell to another in the active terminal?",
    opciones: ["exit", "exec", "switch", "change"],
    respuesta: 1,
    explicacion: "Usa 'exec' para reemplazar la shell actual."
  },
  {
    pregunta: "Select all of user-specific startup files:",
    opciones: [".bash_profile", ".bashrc", "/etc/profile", ".bash_logout"],
    respuestas: [0,1,3],
    explicacion: "Los archivos que comienzan con '.' son específicos del usuario."
  }
];

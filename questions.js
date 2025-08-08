const questions = [
  {
    pregunta: "Which file does give an overview of known shells on a Linux system?",
    opciones: [
      "/etc/shells",
      "/etc/passwords",
      "/etc/known_shells",
      "/etc/shells.sh"
    ],
    respuesta: 0,
    explicacion: "/etc/shells lists valid login shells. It's used by chsh and other tools. The rest are invalid or fictional."
  },
  {
    pregunta: "How to switch from one shell to another in the active terminal?",
    opciones: [
      "Enter the name of the new shell",
      "Update the name of the active shell in \"/etc/shells\" file",
      "Update the name of the active shell in \"~/.bashrc\" file",
      "It can't be done in the active terminal because OS must be restarted"
    ],
    respuesta: 0,
    explicacion: "Typing the name of the new shell (like `bash`, `zsh`, etc.) starts that shell temporarily. No config file needs to be edited, and no reboot is needed."
  },
  {
    pregunta: "Select all of user-specific startup files:",
    opciones: [
      "/etc/profile",
      "/etc/.profile",
      "~/.profile",
      "~/.bashrc"
    ],
    respuestas: [2, 3],
    explicacion: "`~/.profile` and `~/.bashrc` are user-specific startup files. `/etc/profile` is global. `/etc/.profile` doesn't exist."
  },
  {
    pregunta: "Shell should not be used for (Select all of correct options):",
    opciones: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "If you’re mostly calling other utilities and are doing relatively little data manipulation",
      "Mission-critical applications upon which you are betting the future of the company"
    ],
    respuestas: [0, 1, 3],
    explicacion: "Shell scripts are unsuitable for complex data structures, strongly typed programming, and mission‑critical applications where robustness is key. They're fine for calling utilities and simple data manipulation."
  },
  {
    pregunta: "Which command will list all environment variables?",
    opciones: [
      "printenv",
      "env",
      "set",
      "all"
    ],
    respuestas: [0, 1, 2],
    explicacion: "`printenv`, `env` and `set` all show environment variables, though `set` includes shell variables too."
  },
  {
    pregunta: "What does the PATH environment variable contain?",
    opciones: [
      "A list of directories where the shell looks for commands",
      "The default directory for opening files",
      "The location of the user's home directory",
      "A list of file types recognized by the system"
    ],
    respuesta: 0,
    explicacion: "PATH is a colon-separated list of directories used to find executable programs."
  },
  {
    pregunta: "What symbol is used to represent the current user's home directory?",
    opciones: [
      "~",
      "#",
      "/",
      "%"
    ],
    respuesta: 0,
    explicacion: "`~` is shorthand for the current user’s home directory in Unix-like systems."
  },
  {
    pregunta: "What does the shebang line (#!/bin/bash) at the top of a script do?",
    opciones: [
      "Indicates the script should be run in the Bash shell",
      "Marks the script as executable",
      "Comments out the first line",
      "Declares a variable"
    ],
    respuesta: 0,
    explicacion: "The shebang tells the OS what interpreter to use to run the script."
  },
  {
    pregunta: "What command is used to make a shell script executable?",
    opciones: [
      "chmod +x script.sh",
      "bash script.sh",
      "execute script.sh",
      "sh script.sh"
    ],
    respuesta: 0,
    explicacion: "`chmod +x` sets the executable bit so the script can be run directly."
  },
  {
    pregunta: "What does the command `source ~/.bashrc` do?",
    opciones: [
      "Runs the .bashrc script in the current shell",
      "Creates a new shell",
      "Deletes and recreates the .bashrc file",
      "Compiles the script"
    ],
    respuesta: 0,
    explicacion: "`source` runs the file in the current shell session, applying any changes immediately."
  }
];

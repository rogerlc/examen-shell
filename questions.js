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
    explicacion: "Shell scripts are unsuitable for complex data structures, strongly typed programming, and mission-critical applications where robustness is key. They're fine for calling utilities and simple data manipulation."
  },
  {
    pregunta: "Shell can be used for (Select all of correct options):",
    opciones: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "If you’re mostly calling other utilities and are doing relatively little data manipulation",
      "Mission-critical applications upon which you are betting the future of the company"
    ],
    respuestas: [2],
    explicacion: "Shell is great for calling other utilities and simple data handling but not for complex structures or strict programming."
  },
  {
    pregunta: "Select all of global startup files on a Linux system:",
    opciones: [
      "/etc/profile",
      "/etc/.profile",
      "~/.profile",
      "~/.bashrc"
    ],
    respuestas: [0],
    explicacion: "`/etc/profile` is the global startup script for login shells. The others are user-specific or non-existent."
  },
  {
    pregunta: "What happens if you use the \"set -e\" in a Bash script?",
    opciones: [
      "It will cause Bash to exit if a function or subshell returns a nonzero status code.",
      "It will cause Bash to exit if a conditional returns a non-zero status code.",
      "It will cause Bash to exit if local, declare, or typeset assignments return nonzero status code.",
      "It will cause Bash to exit if a command, list of commands, compound command, or potentially a pipeline returns nonzero status code."
    ],
    respuesta: 3,
    explicacion: "`set -e` causes the script to exit when a command fails (returns non-zero), unless the failure is part of an if, while, until, or similar structure."
  },
  {
    pregunta: 'What is the output of the following code?\n\nVAR="/var/www/html/website.com/html/"\necho "${VAR#*/html}"',
    opciones: [
      "/website.com/html/",
      "/html/website.com/html/",
      "/var/www/html/website.com/",
      "Nothing will be echoed on the screen."
    ],
    respuesta: 0,
    explicacion: 'The `#` operator removes the shortest match from the beginning. `*/html` matches `/var/www/html`, leaving `/website.com/html/`.'
  },
  {
    pregunta: "In order for a Bash script to be executed like an OS command, it should start with a shebang line. What does this look like?",
    opciones: [
      "#!/usr/bin/env bash",
      "~/usr/bin/env bash",
      "'$!/usr/bin/env bash",
      "#/usr/bin/env bash"
    ],
    respuesta: 0,
    explicacion: "The correct shebang is `#!/usr/bin/env bash`. It tells the OS to use the `bash` interpreter located via `env`. The others are invalid syntax or paths."
  },
  {
    pregunta: 'What line of Bash script probably produced the following output: "The date is: Sun Mar 24 12:30:06 CST 2019!"?',
    opciones: [
      'echo "The date is: !"',
      'echo "The date is: date!"',
      'echo "The date is: (date)!"',
      'echo "The date is: $(date)!"'
    ],
    respuesta: 3,
    explicacion: '`$(date)` runs the `date` command and inserts its output into the string. The rest are treated as plain text.'
  },
  {
    pregunta: "What do you use in a case statement to tell Bash that you're done with a specific test?",
    opciones: [
      ";;",
      "::",
      "done",
      "$$"
    ],
    respuesta: 0,
    explicacion: "`;;` ends each pattern block in a Bash `case` statement. It tells Bash to stop evaluating and exit that case branch."
  },
  {
    pregunta: "Which variable would you check to verify that the last command executed successfully?",
    opciones: [
      "$$",
      "$?",
      "$!",
      "$@"
    ],
    respuesta: 1,
    explicacion: "`$?` holds the exit status of the last command. 0 means success; any non-zero means an error occurred."
  },
  {
    pregunta: "Which file allows you to save modifications to the shell environment across sessions?",
    opciones: [
      "/etc/bash.conf",
      "~/.profile",
      "/etc/bashprofile",
      "~/profile"
    ],
    respuesta: 1,
    explicacion: "`~/.profile` is a user-specific startup file used to set environment variables and shell settings for login shells. It persists across sessions."
  },
  {
    pregunta: "In order to write a script that iterates through the files in a directory, which of the following could you use?",
    opciones: [
      "bash for i in $(ls); do ... done",
      "bash for $(ls); do ... done",
      "bash for i in $ls; do ... done",
      "bash for $ls; do ... done"
    ],
    respuesta: 0,
    explicacion: "The syntax 'for i in $(ls); do ... done' uses command substitution to loop through filenames. The others are syntactically incorrect in Bash."
  },
  {
    pregunta: "When executing a command and passing the output of that command to another command, which character allows you to chain these commands together?",
    opciones: [
      "|",
      "->",
      "#",
      "@"
    ],
    respuesta: 0,
    explicacion: "The pipe character '|' passes the output of one command as input to another in Bash."
  },
  {
    pregunta: "Which statement checks whether the variable num is greater than five?",
    opciones: [
      "(( $num -gt 5 ))",
      "[ $num -lt 5 ]",
      "(( $num > 5 ))",
      "$num > 5"
    ],
    respuesta: 2,
    explicacion: "`(( $num > 5 ))` evaluates the arithmetic condition using standard operators inside double parentheses."
  },
  {
    pregunta: "Select all correct statements about indentation:",
    opciones: [
      "Indentation is two spaces",
      "Indentation is two tabs",
      "Use blank lines between blocks to improve readability",
      "Maximum line length is 80 characters",
      "Maximum line length is 120 characters"
    ],
    respuestas: [0, 2, 3],
    explicacion: "Indentation with two spaces is common, blank lines improve readability, and 80 characters is a widely accepted max line length."
  },
  {
    pregunta: "Select all correct statements about name convention",
    opciones: [
      "Constants and anything exported to the environment should be capitalized",
      "Use readonly or declare -r to create read-only variable",
      "Declare function-specific variables with \"local\". Declaration and assignment should be on different lines.",
      "A function called main is required for scripts long enough to contain at least one other function"
    ],
    respuestas: [0, 1, 2],
    explicacion: "Constants and exported vars are capitalized, readonly/declare -r makes vars read-only. main function is optional, and declaration+assignment can be on same line."
  },
  {
    pregunta: "Select all correct statements about comments:",
    opciones: [
      "Every file must have a top-level comment including a brief overview of its contents",
      "Any function that is both obvious and short must be commented",
      "Use TODO comments for code that is temporary, a short-term solution, or good-enough but not perfect"
    ],
    respuestas: [0, 2],
    explicacion: "Top-level comments clarify file purpose, TODOs mark temporary or incomplete code. Not all simple functions need comments."
  },
  {
    pregunta: `readonly app_version="3.4"

if [[ "\${app_version}" == "3.4" ]]; then
  echo "\${app_version}"
fi

Select all correct statements:`,
    opciones: [
      '"app_version" variable must be capitalized because it is a constant',
      'instruction of if statement should be indented 2 spaces',
      'this is ideal code'
    ],
    respuestas: [0, 1],
    explicacion: `- Por convención, las constantes deben estar en mayúsculas.
- La indentación de 2 espacios es buena práctica.
- "this is ideal code" es subjetivo y no estrictamente correcto.`
  }
];

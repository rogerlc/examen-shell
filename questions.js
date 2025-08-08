const questions = [
  {
    pregunta: "Which file does give an overview of known shells on a Linux system?",
    opciones: [
      "/etc/shells",
      "/etc/passwords",
      "/etc/known_shells",
      "/etc/shells.sh"
    ],
    respuesta: 0
  },
  {
    pregunta: "How to switch from one shell to another in the active terminal?",
    opciones: [
      "Enter the name of the new shell",
      "Update the name of the active shell in \"/etc/shells\" file",
      "Update the name of the active shell in \"~/.bashrc\" file",
      "It can't be done in the active terminal because OS must be restarted"
    ],
    respuesta: 0
  },
  {
    pregunta: "Select all of user-specific startup files:",
    opciones: [
      "/etc/profile",
      "/etc/.profile",
      "~/.profile",
      "~/.bashrc"
    ],
    respuestas: [2, 3]
  },
  {
    pregunta: "Shell should not be used for (Select all of correct options):",
    opciones: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "If you’re mostly calling other utilities and are doing relatively little data manipulation",
      "Mission-critical applications upon which you are betting the future of the company"
    ],
    respuestas: [0, 1, 3]
  },
  {
    pregunta: "Shell can be used for (Select all of correct options):",
    opciones: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "If you’re mostly calling other utilities and are doing relatively little data manipulation",
      "Mission-critical applications upon which you are betting the future of the company"
    ],
    respuestas: [2]
  },
  {
    pregunta: "Select all of global startup files on a Linux system:",
    opciones: [
      "/etc/profile",
      "/etc/.profile",
      "~/.profile",
      "~/.bashrc"
    ],
    respuestas: [0]
  },
  {
    pregunta: "What happens if you use the \"set -e\" in a Bash script?",
    opciones: [
      "It will cause Bash to exit if a function or subshell returns a nonzero status code.",
      "It will cause Bash to exit if a conditional returns a non-zero status code.",
      "It will cause Bash to exit if local, declare, or typeset assignments return nonzero status code.",
      "It will cause Bash to exit if a command, list of commands, compound command, or potentially a pipeline returns nonzero status code."
    ],
    respuesta: 3
  },
  {
    pregunta: 'What is the output of the following code?\n\nVAR="/var/www/html/website.com/html/"\necho "${VAR#*/html}"',
    opciones: [
      "/website.com/html/",
      "/html/website.com/html/",
      "/var/www/html/website.com/",
      "Nothing will be echoed on the screen."
    ],
    respuesta: 0
  },
  {
    pregunta: "In order for a Bash script to be executed like an OS command, it should start with a shebang line. What does this look like?",
    opciones: [
      "#!/usr/bin/env bash",
      "~/usr/bin/env bash",
      "'$!/usr/bin/env bash",
      "#/usr/bin/env bash"
    ],
    respuesta: 0
  },
  {
    pregunta: 'What line of Bash script probably produced the following output: "The date is: Sun Mar 24 12:30:06 CST 2019!"?',
    opciones: [
      'echo "The date is: !"',
      'echo "The date is: date!"',
      'echo "The date is: (date)!"',
      'echo "The date is: $(date)!"'
    ],
    respuesta: 3
  },
  {
    pregunta: "What do you use in a case statement to tell Bash that you're done with a specific test?",
    opciones: [
      ";;",
      "::",
      "done",
      "$$"
    ],
    respuesta: 0
  },
  {
    pregunta: "Which variable would you check to verify that the last command executed successfully?",
    opciones: [
      "$$",
      "$?",
      "$!",
      "$@"
    ],
    respuesta: 1
  },
  {
    pregunta: "Which file allows you to save modifications to the shell environment across sessions?",
    opciones: [
      "/etc/bash.conf",
      "~/.profile",
      "/etc/bashprofile",
      "~/profile"
    ],
    respuesta: 1
  },
  {
    pregunta: "In order to write a script that iterates through the files in a directory, which of the following could you use?",
    opciones: [
      "bash for i in $(ls); do ... done",
      "bash for $(ls); do ... done",
      "bash for i in $ls; do ... done",
      "bash for $ls; do ... done"
    ],
    respuesta: 0
  },
  {
    pregunta: "When executing a command and passing the output of that command to another command, which character allows you to chain these commands together?",
    opciones: [
      "|",
      "->",
      "#",
      "@"
    ],
    respuesta: 0
  },
  {
    pregunta: "Which statement checks whether the variable num is greater than five?",
    opciones: [
      "(( $num -gt 5 ))",
      "[ $num -lt 5 ]",
      "(( $num > 5 ))",
      "$num > 5"
    ],
    respuesta: 2
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
    respuestas: [0, 2, 3]
  },
  {
    pregunta: "Select all correct statements about name convention",
    opciones: [
      "Constants and anything exported to the environment should be capitalized",
      "Use readonly or declare -r to create read-only variable",
      "Declare function-specific variables with \"local\". Declaration and assignment should be on different lines.",
      "A function called main is required for scripts long enough to contain at least one other function"
    ],
    respuestas: [0, 1, 2]
  },
  {
    pregunta: "Select all correct statements about comments:",
    opciones: [
      "Every file must have a top-level comment including a brief overview of its contents",
      "Any function that is both obvious and short must be commented",
      "Use TODO comments for code that is temporary, a short-term solution, or good-enough but not perfect"
    ],
    respuestas: [0, 2]
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
    respuestas: [0, 1]
  }
];

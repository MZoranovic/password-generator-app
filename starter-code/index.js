const main = document.querySelector('main');
const [getState, setState] = useState(passwordGenerator);

const passwordMap = [
  { classList: 'too-weak', label: 'TOO WEAK!' },
  { classList: 'weak', label: 'WEAK' },
  { classList: 'medium', label: 'MEDIUM' },
  { classList: 'strong', label: 'STRONG' },
];

function passwordGenerator(values) {
  main.innerHTML = '';
  createNode(
    {
      tag: 'h2',
      classList: ['h2'],
      textContent: 'Password Generator',
    },
    main
  );

  const output = createNode(
    {
      tag: 'div',
      classList: ['output'],
    },
    main
  );
  let a = output.addEventListener('click', async function (e) {
    try {
      await navigator.clipboard.writeText(values.password);
      output.classList.add('copy');

      setTimeout(() => {
        output.classList.remove('copy');
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  });
  console.log(a);
  createNode(
    {
      tag: 'div',
      classList: ['password-field'],
      textContent: values.password,
    },
    output
  );

  const copy = createNode(
    {
      tag: 'div',
      classList: ['copy-field'],
    },
    output
  );

  createNode(
    {
      tag: 'img',
      src: 'assets/images/icon-copy.svg',
      classList: ['icon-copy'],
    },
    copy
  );

  const generator = createNode(
    {
      tag: 'div',
      classList: ['generator'],
    },
    main
  );

  const header = createNode(
    {
      tag: 'div',
      classList: ['header'],
    },
    generator
  );

  createNode(
    {
      tag: 'h3',
      textContent: 'Character Length',
    },
    header
  );

  createNode(
    {
      tag: 'div',
      textContent: values.charactersLength.toString(),
      classList: ['char-num'],
    },
    header
  );

  createNode(
    {
      tag: 'input',
      type: 'range',
      min: '0',
      max: '24',
      value: values.charactersLength || '0',
      classList: ['range'],
    },
    generator
  ).addEventListener('change', function (e) {
    setState({ charactersLength: e.target.value });
  });

  const checkBoxes = createNode(
    {
      tag: 'div',
      classList: ['check-boxes'],
    },
    generator
  );

  const checkBoxArray = [
    { id: 'uppercase', label: 'Include Uppercase Letters' },
    { id: 'lowercase', label: 'Include Lowercase Letters' },
    { id: 'numbers', label: 'Include Numbers' },
    { id: 'symbols', label: 'Include Symbols' },
  ];

  checkBoxArray.forEach((element) => {
    const label = createNode(
      {
        tag: 'label',
        forInput: element.id,
        textContent: element.label,
        classList: ['include'],
      },
      checkBoxes
    );
    createNode(
      {
        tag: 'input',
        type: 'checkbox',
        name: element.id,
        id: element.id,
        checked: values[element.id],
        classList: ['check'],
      },
      label
    ).addEventListener('click', function (e) {
      setState({ [e.target.id]: e.target.checked });
    });
    createNode(
      {
        tag: 'span',
        classList: ['label-box'],
      },
      label
    );
  });

  const strength = createNode(
    {
      tag: 'div',
      classList: ['strength'],
    },
    generator
  );

  createNode(
    {
      tag: 'span',
      textContent: 'STRENGTH',
    },
    strength
  );

  const level = createNode(
    {
      tag: 'div',
      classList: ['level'],
    },
    strength
  );

  const passwordStr = passwordStrength(values);
  const currentPassword = passwordMap[passwordStr];

  createNode(
    {
      tag: 'h2',
      textContent: currentPassword.label,
      classList: ['strength-level'],
    },
    level
  );

  for (let i = 0; i < 4; i++) {
    createNode(
      {
        tag: 'div',
        classList: [currentPassword.classList, 'pipe'],
      },
      level
    );
  }

  const button = createNode(
    {
      tag: 'button',
      textContent: 'GENERATE',
      disabled: disableBtn(values),
    },
    generator
  );

  button.addEventListener('click', function () {
    setState({ password: generatePassword(values) });
  });

  createNode(
    {
      tag: 'img',
      src: 'assets/images/icon-arrow-right.svg',
    },
    button
  );
}

passwordGenerator({
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
  charactersLength: 0,
});

function passwordStrength({
  charactersLength = 0,
  uppercase,
  lowercase,
  numbers,
  symbol,
}) {
  let count = 0;

  if (charactersLength) {
    count = charactersLength / 3;
  }
  if (uppercase) {
    count += 2;
  }
  if (numbers) {
    count += 1;
  }
  if (lowercase) {
    count += 1;
  }
  if (symbol) {
    count += 2.5;
  }
  if (count > 10) return 3;
  if (count >= 7) return 2;
  if (count > 4 && count < 7) return 1;
  if (count <= 4) return 0;
}

function generatePassword({
  charactersLength = 0,
  uppercase,
  lowercase,
  numbers,
  symbols,
}) {
  const uCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
  const lCase = 'abcdefghijklmnopqrstuvxyz';
  const nums = '1234567890';
  const syms = '`~!@#$%^&*()-=_+|[]{};:,<>./?';
  let password = '';
  let output = '';
  if (uppercase) password += uCase;
  if (lowercase) password += lCase;
  if (numbers) password += nums;
  if (symbols) password += syms;
  for (let i = 0; i < charactersLength; i++) {
    output += password[Math.floor(Math.random() * password.length)];
  }
  return output;
}

function disableBtn({
  uppercase,
  lowercase,
  numbers,
  symbols,
  charactersLength,
}) {
  if (
    (!uppercase || !lowercase || !numbers || !symbols) &&
    charactersLength === 0
  )
    return true;
}

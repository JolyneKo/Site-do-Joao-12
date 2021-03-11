// Quando aperta o botão de menu, coloca classe '.menu--aberto' pra abrir o menu (mobile)
$('.header__bars').click(() => {
  $('.menu').toggleClass('menu--aberto')
});

// Quando apertar o botão registrar-se
$('#registro').click((e) => {
  e.preventDefault();

  // Pega os valores dos Inputs
  const email = $('#email').val();
  const password = $('#password').val();

  // Regex pra verificar se valores são vazios ou contém espaços
  const regex = /^$|\s/g;

  // Verifica se email é válido, e os valores não são vazios/contém espaços
  const isEmailValid = validateEmail(email);
  const fieldEmpty = regex.test(email) || regex.test(password);

  // Caso for válido, registra no sistema. Se não, mostra error
  if (isEmailValid && !fieldEmpty) {
    fetch('/api/registrar', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => {
        if (res.status === 404)
          $('.container__inputs').prepend(`<p id="error">Esse email já foi registrado</p>`);
    });
  } else {
    // Mostra texto diferente para cada tipo de erro.
    const errorText = (fieldEmpty) ? "Preencha os campos" : "Email inválido";

    // Adiciona o texto de erro na tela
    $('.container__inputs').prepend(`<p id="error">${errorText}</p>`);
  } 

  // O texto de error é removido após 5s na tela
  setTimeout(() => $('#error').remove(), 5000);
});

function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
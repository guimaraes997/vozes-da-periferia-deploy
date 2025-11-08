// js/spa.js

async function carregarPagina(url, addToHistory = true) {
  const main = document.querySelector("main");
  if (!main) return console.warn("Elemento <main> não encontrado.");

  try {
  
    main.classList.add("loading");

    const res = await fetch(url, {cache: "no-store"});
    if (!res.ok) throw new Error(`Erro ao carregar a página (${res.status})`);

    const text = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

  
    const novoMain = doc.querySelector("main") || doc.querySelector("#conteudo") || null;
    const novoTitle = doc.querySelector("title") ? doc.querySelector("title").innerText : null;

    if (novoMain) {
      main.innerHTML = novoMain.innerHTML;
    } else {

      const body = doc.querySelector("body");
      main.innerHTML = body ? body.innerHTML : text;
    }

    if (novoTitle) document.title = novoTitle;


    if (addToHistory) {
      history.pushState({ spa: true, url }, "", url);
    }

    setTimeout(() => main.classList.remove("loading"), 80);

    
    if (typeof iniciarSPA === "function") iniciarSPA(); 
    if (typeof iniciarValidacaoFormulario === "function") iniciarValidacaoFormulario(); 
    if (typeof inicializarTemplates === "function") inicializarTemplates(); 

  } catch (err) {
    main.classList.remove("loading");
    main.innerHTML = `<section><h2>Erro</h2><p>${err.message}</p></section>`;
    console.error(err);
  }
}


function iniciarSPA() {
 
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    
    link.replaceWith(link.cloneNode(true));
  });

  
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http")) return;

      e.preventDefault();
      
      const url = link.dataset.page || href;
      carregarPagina(url, true);
    });
  });
}

window.addEventListener("popstate"), (e) => {
  const state = e.state;
  if (state && state.url) {
    
    carregarPagina(state.url, false);
  } else {
  
    carregarPagina(location.pathname, false);
  }
}


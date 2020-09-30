class Usuario{
    constructor(email, senha){
        this.email = email;
        this.senha = senha;
    }
    isAdmin(){
        return this.admin === true;
    }
}

class Admin extends Usuario{
    constructor(email, senha) {
        super(email, senha);
        this.admin = true;
    }
}

const User1 = new Usuario("email@teste.com", "senha123");
const Adm1 = new Admin("email@teste.com", "senha123");

console.log(User1.isAdmin()); // false
console.log(Adm1.isAdmin()); // true

// EXERCÍCIO 2

const usuarios = [
    { nome: "Diego", idade: 23, empresa: "Rocketseat" },
    { nome: "Gabriel", idade: 15, empresa: "Rocketseat" },
    { nome: "Lucas", idade: 30, empresa: "Facebook" }
];
  
const idades = usuarios.map(usuario => usuario.idade);
console.log(idades);
  
const rocketseat18 = usuarios.filter(
    usuario => usuario.empresa === "Rocketseat" && usuario.idade >= 18
);
console.log(rocketseat18);
  
const google = usuarios.find(usuario => usuario.empresa === "Google");
console.log(google);
  
const calculo = usuarios
    .map(usuario => ({ ...usuario, idade: usuario.idade * 2 }))
    .filter(usuario => usuario.idade <= 50);
  
console.log(calculo);

// EXERCÍCIO 3

// 3.1
const arr = [1, 2, 3, 4, 5];
arr.map(item => item + 10);

// 3.2
const usuario = { nome: "Diego", idade: 23 };
const mostraIdade = usuario => usuario.idade;
mostraIdade(usuario);

// 3.3
const nome = "Diego";
const idade = 23;
const mostraUsuario = (nome = "Diego", idade = 18) => ({
  nome,
  idade
});
mostraUsuario(nome, idade);
mostraUsuario(nome);

// 3.4
const promise = () => new Promise((resolve, reject) => resolve());

// EXERCÍCIO 4

// 4.1

const empresa = {
    nomeEmpresa: "Rocketseat",
    endereco: {
      cidade: "Rio do Sul",
      estado: "SC",
    },
};
  
const { nomeEmpresa, endereco: { cidade, estado }} = empresa;
  
console.log(nomeEmpresa); // Rocketseat
console.log(cidade); // Rio do Sul
console.log(estado); // SC

// 4.2  
function mostraInfo({ nome, idade }) {
    return `${nome} tem ${idade} anos.`;
}
mostraInfo({ nome: "Diego", idade: 23 });

//EXERCÍCIO 5

// 5.1 A
const arr2 = [1, 2, 3, 4, 5, 6];

const [x, ...y] = arr2;

console.log(x); // 1
console.log(y); // [2, 3, 4, 5, 6]

// 5.1 B
function soma(...nums) {
  return nums.reduce((a, b) => a + b);
}

console.log(soma(1, 2, 3, 4, 5, 6)); // 21
console.log(soma(1, 2)); // 3

// 5.2
const usuario1 = {
  nome: "Diego",
  idade: 23,
  endereco: {
    cidade: "Rio do Sul",
    uf: "SC",
    pais: "Brasil"
  }
};

const usuario2 = { ...usuario1, nome: "Gabriel" };
const usuario3 = {
  ...usuario1,
  endereco: { ...usuario1.endereco, cidade: "Lontras" }
};

// EXERCÍCIO 6

const usuarioEx6 = "Diego";
const idadeEx6 = 23;

console.log(`O usuário ${usuarioEx6} possui ${idadeEx6} anos`);

// EXERCÍCIO 7

const nomeEx7 = "Diego";
const idadeEx7 = 23;

const usuarioEx7 = {
  nomeEx7,
  idadeEx7,
  cidadeEx7: "Rio do Sul"
};


// DESAFIO 2 IMPORTANDO WEBPACK
console.log("--- DESAFIO 2 ABAIXO ---");
// 1.1
import ClasseUsuario from "./desafio2";
ClasseUsuario.info();

// 1.2
import { idade as idadeD2 } from "./desafio2";
console.log(idadeD2);

// 1.3
import ClasseUsuario3, { idade as IdadeUsuario } from "./desafio2";


// DESAFIO 3
// A

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

async function umPorSegundo() {
  await delay();
  console.log("1s");

  await delay();
  console.log("2s");

  await delay();
  console.log("3s");
}

umPorSegundo();

// B

import axios from "axios";

async function getUserFromGithub(user) {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`);

    console.log(response.data);
  } catch (err) {
    console.log("Usuário não existe");
  }
}

getUserFromGithub("diego3g");
getUserFromGithub("diego3g124123");

// C

class Github {
  static async getRepositories(repo) {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repo}`);

      console.log(response.data);
    } catch (err) {
      console.log("Repositório não existe");
    }
  }
}

Github.getRepositories("paulobordignon/socketphp");
Github.getRepositories("rocketseat/dslkvmskv");

// D

const buscaUsuario = async usuario => {
  try {
    const response = await axios.get(`https://api.github.com/users/${usuario}`);
    console.log(response.data);
  } catch (err) {
    console.log("Usuário não existe");
  }
};

buscaUsuario("paulobordignon");


// PROJETO FINAL

import api from './api';
class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById('repo-form');
    this.inputEl = document.querySelector('input[name=repository]');
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando'));
      loadingEl.setAttribute('id', 'loading');

      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById('loading').remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0)
      return;

    this.setLoading();

    try {
      const response = await api.get(`/repos/${repoInput}`);

      const { name, description, html_url, owner: { avatar_url } } = response.data;

      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url,
      });

      this.inputEl.value = '';

      this.render();
    } catch (err) {
      alert('O repositório não existe!');
    }

    this.setLoading(false);
  }

  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}

new App();
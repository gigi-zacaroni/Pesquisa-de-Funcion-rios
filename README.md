# Sistema de Gerenciamento de Funcionários em JavaScript

## Descrição do Projeto

Este projeto consiste em um sistema de gerenciamento de funcionários desenvolvido em JavaScript utilizando o ambiente Node.js. O programa realiza a leitura de dados a partir de um arquivo CSV, permitindo o gerenciamento dos registros por meio de um menu interativo executado no terminal.

O sistema foi desenvolvido com o objetivo de aplicar conceitos fundamentais de programação, estruturas de dados, manipulação de arquivos e algoritmos de busca e ordenação.

---

## Funcionalidades

O sistema oferece as seguintes funcionalidades:

* Importação de funcionários a partir de um arquivo CSV;
* Inserção de novos funcionários;
* Remoção lógica de funcionários;
* Ordenação dos registros por nome;
* Busca binária para localizar funcionários de forma eficiente;
* Exibição de todos os funcionários ativos;
* Exportação dos dados atualizados para um novo arquivo CSV;
* Interface interativa via terminal.

---

## Estrutura dos Dados

Cada funcionário é armazenado como um objeto contendo os seguintes atributos:

* Nome
* Cargo
* Departamento
* Salário
* Idade
* Status de atividade (ativo ou removido logicamente)

Exemplo:

```javascript
{
    nome: "João Silva",
    cargo: "Analista de Sistemas",
    departamento: "TI",
    salario: 5000,
    idade: 28,
    ativo: true
}
```

---

## Tecnologias Utilizadas

* JavaScript
* Node.js
* Módulo File System (fs)
* Módulo Readline
* Arquivos CSV

---

## Conceitos Aplicados

Durante o desenvolvimento deste projeto foram aplicados diversos conceitos importantes da programação, tais como:

* Manipulação de arquivos CSV;
* Leitura e escrita de arquivos utilizando Node.js;
* Estruturas de repetição;
* Estruturas condicionais;
* Vetores (arrays);
* Objetos JavaScript;
* Busca binária;
* Ordenação de dados;
* Modularização do código;
* Tratamento básico de erros;
* Interação com o usuário através do terminal.

---

## Como Executar

### Pré-requisitos

* Node.js instalado na máquina.

### Passos para execução

1. Clone ou baixe o projeto.
2. Coloque o arquivo `funcionarios.csv` na mesma pasta do programa.
3. Abra o terminal na pasta do projeto.
4. Execute o comando:

```bash
node index.js
```

5. Utilize o menu para acessar as funcionalidades disponíveis.

---

## Aprendizados Obtidos

O desenvolvimento deste projeto foi uma experiência extremamente enriquecedora, tanto do ponto de vista técnico quanto pessoal.

Um dos aspectos mais marcantes foi a realização de aulas particulares de JavaScript conduzidas inteiramente em inglês. Durante todo o processo de aprendizagem, a comunicação com o professor ocorreu exclusivamente nesse idioma, proporcionando uma imersão prática que contribuiu significativamente para o desenvolvimento das habilidades linguísticas.

Essa experiência permitiu não apenas aprofundar os conhecimentos em programação, mas também ampliar a capacidade de compreensão e comunicação em inglês técnico, uma competência cada vez mais valorizada na área de Tecnologia da Informação.

Ao discutir conceitos, resolver problemas, compreender explicações e desenvolver soluções em inglês, foi possível associar diretamente o aprendizado da língua ao contexto real de desenvolvimento de software. Isso tornou o processo mais natural e eficiente, fortalecendo simultaneamente as competências de programação e de comunicação internacional.

Além disso, a experiência demonstrou a importância do inglês como ferramenta fundamental para acessar documentações, bibliotecas, comunidades de desenvolvedores e oportunidades profissionais no mercado global de tecnologia.

Como resultado, este projeto representa não apenas a aplicação prática dos conhecimentos adquiridos em JavaScript, mas também um importante avanço no desenvolvimento profissional e acadêmico, unindo tecnologia e aprendizado de idiomas em uma única experiência de crescimento.

---


Projeto desenvolvido como atividade prática de estudo e aplicação dos conceitos de JavaScript, manipulação de arquivos, algoritmos de busca e ordenação, aliado ao aprimoramento da comunicação técnica em inglês.

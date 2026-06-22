const fs = require("fs");                    // Importa o módulo 'fs' para trabalhar com arquivos (ler e escrever)
const readline = require("readline");        // Importa o módulo 'readline' para criar interface de entrada/saída no terminal

let funcionarios = [];                       // Array que vai armazenar todos os funcionários
const nomeArquivo = "funcionarios.csv";      // Nome do arquivo CSV que será lido

// Cria interface para ler input do usuário no terminal
const rl = readline.createInterface({
    input: process.stdin,                    // Define a entrada como o teclado
    output: process.stdout                   // Define a saída como o terminal
});

// ==================== FUNÇÃO DE IMPORTAÇÃO ====================

// Função responsável por ler o arquivo CSV e carregar os funcionários
function importarCSV() {
    // Verifica se o arquivo existe antes de tentar ler
    if (!fs.existsSync(nomeArquivo)) {
        console.log("Erro: Arquivo " + nomeArquivo + " nao encontrado!");
        return 0;
    }

    const conteudo = fs.readFileSync(nomeArquivo, "utf8");  // Lê todo o conteúdo do arquivo como texto
    const linhas = conteudo.split("\n");                    // Divide o conteúdo em linhas
    let contador = 0;                                       // Contador para saber quantos funcionários foram carregados

    // Loop para processar cada linha do CSV
    for (let linha of linhas) {
        if (!linha.trim()) continue;                        // Ignora linhas vazias ou só com espaços

        // Tenta separar por ";" primeiro, se não funcionar tenta por ","
        let campos = linha.split(";");
        if (campos.length < 5) campos = linha.split(",");

        campos = campos.map(c => c.trim());                 // Remove espaços em branco de cada campo

        if (campos.length < 5) continue;                    // Ignora linhas que não têm 5 colunas

        // Adiciona o funcionário no array
        funcionarios.push({
            nome: campos[0],
            cargo: campos[1],
            departamento: campos[2],
            salario: parseFloat(campos[3]) || 0,           // Converte salário para número
            idade: parseInt(campos[4]) || 0,               // Converte idade para número
            ativo: true
        });
        contador++;
    }

    console.log(`Arquivo importado com sucesso! Total: ${contador} funcionários`);
    return contador;
}

// ==================== FUNÇÃO DE EXPORTAÇÃO ====================

// Função para salvar os funcionários em um novo arquivo CSV
function exportarCSV() {
    const nomeSaida = "funcionarios_atualizado.csv";   // Nome do arquivo de saída
    let conteudo = "";                                 // String que vai armazenar todo o conteúdo

    // Percorre todos os funcionários ativos
    for (let f of funcionarios) {
        if (f.ativo) {
            conteudo += `${f.nome};${f.cargo};${f.departamento};${f.salario};${f.idade}\n`;
        }
    }

    fs.writeFileSync(nomeSaida, conteudo);             // Escreve o conteúdo no arquivo
    console.log(`Arquivo exportado com sucesso: ${nomeSaida}`);
}

// ==================== ORDENAÇÃO ====================

// Ordena os funcionários por nome (com suporte a acentos)
function ordenarPorNome() {
    funcionarios.sort((a, b) => {
        const nomeA = a.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const nomeB = b.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return nomeA.localeCompare(nomeB);
    });
    console.log("Funcionários ordenados por nome.");
}

// ==================== BUSCA ====================

// Busca binária por nome (mais eficiente e tolerante a acentos)
function buscaBinariaNome(nomeBusca) {
    if (funcionarios.length === 0) {
        console.log("Nenhum funcionário cadastrado.");
        return;
    }

    ordenarPorNome(); // Garante que a lista está ordenada antes da busca

    function normalizar(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const procurado = normalizar(nomeBusca);
    let inicio = 0;
    let fim = funcionarios.length - 1;

    // Algoritmo de busca binária iterativa
    while (inicio <= fim) {
        const meio = Math.floor((inicio + fim) / 2);
        const atual = normalizar(funcionarios[meio].nome);

        if (atual === procurado) {
            console.log("✅ Funcionário encontrado:");
            console.log(funcionarios[meio]);
            return;
        } else if (atual < procurado) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    console.log(`❌ Funcionário "${nomeBusca}" não encontrado.`);
}

// ==================== MENU INTERATIVO ====================

// Exibe o menu e processa a escolha do usuário
function mostrarMenu() {
    console.log("\n" + "=".repeat(50));
    console.log("          SISTEMA DE GERENCIAMENTO DE FUNCIONÁRIOS");
    console.log("=".repeat(50));
    console.log("1. Buscar funcionário por nome");
    console.log("2. Inserir novo funcionário");
    console.log("3. Remover funcionário");
    console.log("4. Ordenar por nome");
    console.log("5. Exibir todos os funcionários");
    console.log("6. Exportar para CSV");
    console.log("0. Sair");
    console.log("=".repeat(50));

    // Pergunta a opção ao usuário
    rl.question("\nEscolha uma opção: ", (opcao) => {
        switch (opcao.trim()) {                    // switch case para tratar cada opção
            case "1":
                rl.question("Digite o nome do funcionário: ", (nome) => {
                    buscaBinariaNome(nome);
                    mostrarMenu();                 // Volta para o menu após a ação
                });
                break;

            case "2":
                console.log("\n--- Inserir Novo Funcionário ---");
                rl.question("Nome: ", (nome) => {
                    rl.question("Cargo: ", (cargo) => {
                        rl.question("Departamento: ", (departamento) => {
                            rl.question("Salário: ", (salario) => {
                                rl.question("Idade: ", (idade) => {
                                    inserirFuncionario(nome, cargo, departamento, parseFloat(salario), parseInt(idade));
                                    mostrarMenu();
                                });
                            });
                        });
                    });
                });
                break;

            case "3":
                rl.question("Nome do funcionário para remover: ", (nome) => {
                    removerFuncionario(nome);
                    mostrarMenu();
                });
                break;

            case "4":
                ordenarPorNome();
                mostrarMenu();
                break;

            case "5":
                exibir(0, funcionarios.length - 1);
                mostrarMenu();
                break;

            case "6":
                exportarCSV();
                mostrarMenu();
                break;

            case "0":
                console.log("Encerrando o programa...");
                rl.close();
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                mostrarMenu();
        }
    });
}

// ==================== FUNÇÕES AUXILIARES ====================

function inserirFuncionario(nome, cargo, departamento, salario, idade) {
    funcionarios.push({ nome, cargo, departamento, salario, idade, ativo: true });
    console.log("Funcionário inserido com sucesso!");
}

function removerFuncionario(nome) {
    const index = funcionarios.findIndex(f => f.ativo && f.nome.toLowerCase() === nome.toLowerCase());
    if (index !== -1) {
        funcionarios[index].ativo = false;
        console.log(" Funcionário removido logicamente.");
    } else {
        console.log(" Funcionário não encontrado.");
    }
}

function exibir(inicio, fim) {
    console.log("\n--- Lista de Funcionários Ativos ---");
    let encontrados = 0;
    for (let i = inicio; i <= fim; i++) {
        if (funcionarios[i] && funcionarios[i].ativo) {
            console.log(funcionarios[i]);
            encontrados++;
        }
    }
    if (encontrados === 0) console.log("Nenhum funcionário ativo encontrado.");
}

// ==================== INICIALIZAÇÃO DO PROGRAMA ====================

importarCSV();           // Carrega os dados do CSV ao iniciar
ordenarPorNome();        // Ordena os funcionários
mostrarMenu();           // Inicia o menu interativo
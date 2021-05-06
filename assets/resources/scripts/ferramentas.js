/*
Ferramentas   - local storage para armazenar os dados
*/

'use strict';

function CarregaVendedoresPainel(arrayVendedores) { //carrega os vendedores no painel
    arrayVendedores.sort(); //organiza em ordem alfabética a lista de vendedores
    for (let i = 1; i < arrayVendedores.length + 1; i++) { //varre a array ja ordenada
        //insere no painel
        document.getElementById('v' + i + 'c0').innerHTML = (arrayVendedores[i - 1]);
    }

    for (let i = 1; i <= 9; i++) { //varre as 9 linhas possiveis de vendedores
        var linhaVendedor = document.getElementById('v' + i + 'c0'); //coleta o se conteudo e 
        if (linhaVendedor.innerHTML === '') { //se estiver limpa
            document.getElementById('linha' + i).style.display = 'none'; //oculta a linha
        }
    }
}

function criacaoContato() { //cria um contato usando prompt
    let v = window.prompt('Digite o Nome do vendedor:'); //solicita o nome do vendedor
    if ((v === '') || (v == null)) return; //pressionou cancelar ou enter sem valor então sai
    let c = window.prompt('Digite o Nome do cliente:');
    if ((c === '') || (c == null)) return; //pressionou cancelar ou enter sem valor então sai
    let h = window.prompt('Digite o Horario na agenda HHMM:');
    if ((h === '') || (h == null)) return; //pressionou cancelar ou enter sem valor então sai


    //verifica falhas nas strings recebidas  - Validadores
    v = v.trim(); //manipulação 1
    if (v === '') {
        window.alert('Nome do vendedor não pode ser = brancos');
        return;
    }
    if (h.indexOf(':') > -1) { //manipulação 2
        window.alert('Não coloque [:] em horario, este deve ser no formato HHMM apenas');
        return;
    }
    if (c.length < 4) { //manipulação 3
        window.alert('Nome do Cliente deve ter mais que 3 caracteres');
        return;
    }
    //Manipulação 4 usando string template, extraindo somente numeros da variavel de hora
    h = h.replace(/[^0-9]/g, '');
    if (h.length !== 4) {
        window.alert('O Horario não esta no formato correto, favor colocar como HHMM');
        return;
    }
    //fim da validação!
    if (window.confirm('Deseja inserir o contato?')) {
        var contato = new Contatos(v, geraNroContato(), c, 1, h, dataCorrente);
        contatos.push(contato); //insere o contato
        new DistribuiContatos(); //distribui na tela
        //inseri o setTime, para que o Distribuidor dos contatos, possa inserir o contato 
        //sem sem perturbado pelo comfirm
        setTimeout(function () { //em segundos ira avisar que a carga foi executada e fecha o sidebar
            window.confirm('Contato Criado com sucesso!\nVendedor:' + contato.vendedor + '\nCliente: ' + contato.cliente);
        }, 100); //mensagem com delay
    }
    /*
    correções necessárias de lint
    inclusao de window. antes de confirm, alert ou promp para não gerar erro w117 [x is not defined]
    */
}

function DistribuiContatos() { //faz a busca nos contatos e posiciona no painel conforme a data, horario e vendedor
    limpaAgenda(); //limpa agenda, para trabalhar com uma tabela zerada
    let calend = $('.form_date').datetimepicker('getDate');
    let dataCorrente = calend.getDate() + '/' + (calend.getMonth() + 1) + '/' + calend.getFullYear();
    for (let v = 0; v < vendedor.length; v++) { //para cada vendedor do painel,
        for (let c = 0; c < contatos.length; c++) { //varre os contatos.
            //inserido toUpperCase() no tratamento da String para desconsiderar problemas com comparação da String
            if ((vendedor[v].toUpperCase() === contatos[c].vendedor.toUpperCase()) && (dataCorrente === contatos[c].dataContato)) {
                //se for um contato do vendedor na data mostrada na tela, então coleta os dados
                let localContato = document.getElementById('v' + (v + 1) + 'c' + contatos[c].horario);
                let elem = document.getElementById('Legc' + contatos[c].tipoAtendimento);
                let corLegenda = window.getComputedStyle(elem, null).getPropertyValue('background-color');
                // e coloca no local correto no painel
                localContato.innerHTML = contatos[c].nrocontato;
                localContato.style.backgroundColor = corLegenda;
            }
        }
    }
}

function horario() { //função que controi o horário Longo

    var relogio = document.querySelector('#relogio');
    var d = new Date();
    var seg = d.getSeconds();
    var min = d.getMinutes();
    var hr = d.getHours();
    var dia = d.getDate();
    var mes = d.getMonth();
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var diaSem = d.getDay();
    var diasSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    relogio.innerHTML = diasSemana[diaSem] + ', ' + dia + ' de ' + meses[mes] + ', ' + hr + ':' + min + ':' + seg;
}

let removeContato = function () { //remover contato que está no ponteiro e retornar uma mensagem
    if (contatoSelecionado > 0) { //se tem contato no ponteiro (selecionado)
        for (let c = 0; c < contatos.length; c++) { //lê todos os contatos
            if (contatoSelecionado === contatos[c].nrocontato) { //quando encontrar
                contatos.splice(c, 1); //remove
                new DistribuiContatos(); //como alterou a array então remove e realoca no painel
                window.alert('Contato removido com sucesso!'); //avisa que removeu
                return true; //sai
            }
        }
        window.alert('Não foi possível remover o contato, algo ocorreu de errado!');
        //se cair aqui é porque o contato nao foi encontrado
    } else { //caso contrario
        window.alert('Não foi selecionado nenhum contato para remover!'); //exibe uma mensagem
    }
};

function limpaAgenda() { //Limpa agenda contatos, usada na realocação ou mudança de data
    let idlocal = ''; //carrega variavel
    for (let linha = 1; linha < 10; linha++) { //para cada vendedor
        for (let n = 8; n <= 18; n++) { //para cada coluna ou hora entre 08 e 18
            for (let meiaHora = 0; meiaHora < 2; meiaHora++) { //hora cheia ou meia hora
                if (meiaHora === 0) { //hora cheia
                    idlocal = ('v' + linha + 'c' + n.toString().padStart(2, '0') + '00'); //gera local
                } else { //meia hora
                    if (n !== 18) { //opa, não tem 18h30mm
                        idlocal = ('v' + linha + 'c' + n.toString().padStart(2, '0') + '30'); //gera local
                    }
                }
                document.getElementById(idlocal).innerHTML = ''; //limpa o campo
                document.getElementById(idlocal).style.backgroundColor = 'White'; //backgr = branco
            }
        }
    }
}

let leContatos = (nrocont) => {
    //Função Flecha - que recebe o numero do contato e faz a busta na lista para retornar os dados pre-definidos
    for (let c = 0; c < contatos.length; c++) { //varre todos os contados
        if (nrocont === contatos[c].nrocontato) { //quando localiza o contato pelo numero
            contatoSelecionado = contatos[c].nrocontato; //marca o contato na memória como ponteiro
            return 'Dia:' + contatos[c].dataContato +
                ' - Nro:' + contatos[c].nrocontato +
                ' - Cliente:' + contatos[c].cliente +
                ' - Tipo:' + legendas[contatos[c].tipoAtendimento].innerText;
        }
    }
};
/*  Ferramentas */

'use strict';
/*global main */
/*global database */
/* jshint -W098 */
/*global Contatos */
/*global contatos */
/*global vendedor */
/*global dataCorrente */
/*global legendas */

// let nroContato = 1000;
let contatoSelecionado = 0;
let contatoMarcado = 0;
let horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
];

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
        var contato = new Contatos(v, c, 1, h, dataCorrente);
        contatos.push(contato); //insere o contato
        database.saveItemArray('arrayContatos', contato);
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

function InsereContatosViaForm() {

    if ($('#SelecVendedor option:selected').val() === 0)
        return;
    if ($('#NomeCliente').val() === '')
        return;
    if ($('#SelecTipoAt option:selected').val() === 'Tipo de atendimento')
        return;
    if ($('#SelecHora option:selected').val().replaceAll(':', '') === '')
        return;

    //fim da validação de segurança

    var contato = new Contatos($('#SelecVendedor option:selected').val(),
        $('#NomeCliente').val(),
        parseInt($('#SelecTipoAt option:selected').val().substring(0, 1)),
        $('#SelecHora option:selected').val().replaceAll(':', ''),
        dataCorrente);
    console.log(contato);
    contatos.push(contato); //insere o contato
    database.saveItemArray('arrayContatos', contato);
    new DistribuiContatos(); //distribui na tela

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

                // alert(contatos[c].nrocontato + '=>' + ('v' + (v + 1) + 'c' + contatos[c].horario));
                let localContato = document.getElementById('v' + (v + 1) + 'c' + contatos[c].horario);
                let elem = document.getElementById('Legc' + contatos[c].tipoAtendimento);
                let corLegenda = window.getComputedStyle(elem, null).getPropertyValue('background-color');
                // e coloca no local correto no painel
                localContato.innerHTML = contatos[c].nrocontato;
                localContato.style.backgroundColor = corLegenda;
                localContato.setAttribute('class', 'btn btn-default');
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
    if (document.getElementById('resp').innerHTML === '') //se não tiver nada na bandeja de seleção
        return; //sai
    if (contatoMarcado > 0) { //se tem contato no ponteiro (selecionado)
        if (window.confirm('Deseja remover o contato nro ' + contatoMarcado + '?')) {
            for (let c = 0; c < contatos.length; c++) { //lê todos os contatos
                if (contatoMarcado === contatos[c].nrocontato) { //quando encontrar
                    contatos.splice(c, 1); //remove
                    database.remove('arrayContatos');
                    database.setArray('arrayContatos', contatos);
                    new DistribuiContatos(); //como alterou a array então remove e realoca no painel
                    window.alert('Contato ' + contatoMarcado + '  removido com sucesso!'); //avisa que removeu
                    document.getElementById('remove-contato').value = 'F9 - Remove Agenda';
                    document.getElementById('atendimento-contato').value = 'Cadastro Atendimento';
                    return true; //sai
                }
            }
        }
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
                document.getElementById(idlocal).removeAttribute('class'); //retira efeitos class para campos em branco

            }
        }
    }
}
let leContatos = (nrocont) => {
    //Função Flecha - que recebe o numero do contato e faz a busta na lista para retornar os dados pre-definidos
    let legendas = document.getElementsByName('legend'); //carrega a variavel legendas como um array
    for (let c = 0; c < contatos.length; c++) { //varre todos os contados
        if (nrocont === contatos[c].nrocontato) { //quando localiza o contato pelo numero
            contatoSelecionado = contatos[c].nrocontato; //marca o contato na memória como ponteiro
            return ' Nro: ' + contatos[c].nrocontato +
                ' \nDia: ' + contatos[c].dataContato +
                ' \nHora: ' + contatos[c].horario +
                ' \nCliente: ' + contatos[c].cliente +
                ' \nTipo: ' + legendas[(contatos[c].tipoAtendimento) - 1].innerText;
        }
    }
};


let myFunction = (x) => {
    /* Função anonima com retorno
    quando o usuario pressionar um campo dentro do painel, deve executar essa função 
    que mostra o argumento no campo designado
    e para quando o campo estiver em branco, não deve mostrar nada
    */

    x.title = '';
    x.style.cursor = 'default';

    if (x.innerHTML !== '') {
        // let r = leContatos(parseInt(x.innerHTML));
        x.style.cursor = 'pointer';
        x.setAttribute('data-toggle', 'tooltip');
        // console.log(x.id.substring(3, 5));
        if (x.id.substring(3, 5) > 12) {
            x.setAttribute('data-placement', 'left');
        } else {
            x.setAttribute('data-placement', 'right');
        }
        x.setAttribute('onclick', 'myFunctionClique(this)');
        x.title = leContatos(parseInt(x.innerHTML));
    }
    $(x).tooltip('show');
    x.title = '';


};

let myFunctionClique = (x) => {
    document.getElementById('resp').innerHTML = '';
    let r = leContatos(parseInt(x.innerHTML));
    if (r !== '') {
        document.getElementById('resp').innerHTML = 'Você selecionou o contato: <strong>' +
            r +
            '</strong>';
        document.getElementById('remove-contato').value = 'F9 - Remove Agenda ' + contatoSelecionado;
        document.getElementById('atendimento-contato').value = 'Cadastro Atendimento ' + contatoSelecionado;
        contatoMarcado = contatoSelecionado;
    }
};

function CarregaForm() {
    // Carrega linha de cabeçalho na tabela
    var $wrapper = document.getElementById('linhaHorarios');
    var horasinvertido = horas.slice(0).reverse();
    for (let index = 0; index < horasinvertido.length; index++)
        $wrapper.insertAdjacentHTML('afterbegin', '<th scope = "col">' + horasinvertido[index] + '</th>');
    $wrapper.insertAdjacentHTML('afterbegin', '<th scope = "col">Vendedores</th>');

    // Carrega Select de vendedores no formulario 
    var $formVendedor = document.getElementById('SelecVendedor');
    var vendedorinvertido = vendedor.slice(0).reverse();
    for (let index = 0; index < vendedor.length; index++)
        $formVendedor.insertAdjacentHTML('afterbegin', '<option>' + vendedorinvertido[index] + '</option>');

    // Carrega Select de tipos de atendimento no formulario usando nodes
    var nodes = document.getElementById('MinhasLegendas').querySelectorAll('li');
    var list = [].slice.call(nodes);
    let c = 1;
    var innertext = list.map(function (e) { // uso de map para
        return c++ + '-' + e.innerText;
    }).join('\n');
    let tiposAtendimentos = [];
    tiposAtendimentos = innertext.split('\n'); //manipulação de variável
    var $formLegendas = document.getElementById('SelecTipoAt');
    var tipoAteInvertido = tiposAtendimentos.slice(0).reverse();
    for (let index = 0; index < tipoAteInvertido.length; index++)
        $formLegendas.insertAdjacentHTML('afterbegin', '<option>' + tipoAteInvertido[index] + '</option>');


}
jQuery('#SelecVendedor').change(function () {
    // Aqui você tem o value selecionado assim que o usuário muda o option
    document.getElementById('SelecVendedor').classList.remove('--has-error');

    var id = jQuery(this).val();
    // Carrega Select de horas no formulario 
    var horasinvertido = horas.slice(0).reverse();
    var $formHora = document.getElementById('SelecHora');
    var i, L = $formHora.options.length - 1;
    for (i = L; i >= 0; i--) {
        $formHora.remove(i);
    }

    for (let index = 0; index < horasinvertido.length; index++)
        $formHora.insertAdjacentHTML('afterbegin', '<option>' + ContatosNaAgenda(id, horasinvertido[index]) + '</option>');
});

function ContatosNaAgenda(qualVendedor, qualHora) {
    for (let c = 0; c < contatos.length; c++) { //varre todos os contados
        if ((qualVendedor === contatos[c].vendedor) && (dataCorrente === contatos[c].dataContato)) { //quando localiza o contato pelo numero
            if (qualHora.replaceAll(':', '') === contatos[c].horario)
                return qualHora + ' - Cliente:' + contatos[c].cliente;
        }
    }
    return qualHora;
}


jQuery('#SelecHora').change(function () {
    document.getElementById('SelecHora').classList.remove('--has-error');
});

jQuery('#SelecTipoAt').change(function () {
    document.getElementById('SelecTipoAt').classList.remove('--has-error');
});


const campoFormNome = document.getElementById('NomeCliente');
campoFormNome.addEventListener('keyup', function (ev) {
    const input = ev.target;
    const value = ev.target.value;

    if (value.length <= 3) {
        input.classList.add('--has-error');

    } else {
        input.classList.remove('--has-error');
    }
});

function cadastroAtend() {
    database.set('codCadastro', contatoMarcado);
    window.location.href = '/cadastro.html';
}
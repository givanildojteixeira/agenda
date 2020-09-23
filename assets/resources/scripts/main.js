/*
Main
*/
let vendedor = ['Alexandre', 'Daniele', 'Fernando', 'Lidiane', 'Lucas', 'Orlei', 'Paulo', 'Silvani', 'José']
let contatos = [];
let nroContato = 1000
let dataCorrente
let contatoSelecionado = 0

//construtor
function Contatos(vendedor, nrocontato, cliente, tipoAtendimento, horario, dataContato) {
	this.vendedor = vendedor;
	this.nrocontato = nrocontato;
	this.cliente = cliente;
	this.tipoAtendimento = tipoAtendimento;
	this.horario = horario;
	this.dataContato = dataContato;
}

/* Função com nome
Finalidade: Insere os vendedore do Array no painel até o limite de 9 vendedores
*/
function CarregaVendedores() {
	vendedor.sort() //organiza em ordem alfabética a lista de vendedores
	for (let i = 1; i < vendedor.length + 1; i++) { //varre a array ja ordenada
		document.getElementById('v' + i + 'c0').innerHTML = (vendedor[i - 1]); //insere no painel
	}

	for (let i = 1; i <= 9; i++) { //varre as 9 linhas possiveis de vendedores
		var linhaVendedor = document.getElementById('v' + i + 'c0'); //coleta o se conteudo e 
		if (linhaVendedor.innerHTML == "") { //se estiver limpa
			document.getElementById('linha' + i).style.display = "none"; //oculta a linha
		}
	}
}

/*Função com nome
criando um contato usando prompt
*/
function criacaoContato() {
	var v = prompt("Digite o Nome do vendedor:"); //solicita o nome do vendedor
	if ((v == '') || (v == null)) return; //pressionou cancelar ou enter sem valor então sai
	var c = prompt("Digite o Nome do cliente:");
	if ((c == '') || (c == null)) return; //pressionou cancelar ou enter sem valor então sai
	var h = prompt("Digite o Horario na agenda HHMM:");
	if ((h == '') || (h == null)) return; //pressionou cancelar ou enter sem valor então sai
	if (confirm("Deseja inserir o contato?")) {
		dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
		var contato = new Contatos(v, nroContato, c, 'Atendimento', h, dataCorrente);
		nroContato++;
		contatos.push(contato);
		DistribuiContatos();
		alert("Contato Criado com sucesso!\nVendedor:" + contato.vendedor + "\nCliente: " + contato.cliente);
	}
}

/* Função com nome
faz a busca nos contatos e posiciona no painel conforme a data, horario e vendedor
*/
function DistribuiContatos() {
	limpaAgenda(); //limpa agenda, para trabalhar com uma tabela zerada
	for (let v = 0; v < vendedor.length; v++) { //para cada vendedor do painel,
		for (let c = 0; c < contatos.length; c++) { //varre os contatos.
			if ((vendedor[v] == contatos[c].vendedor) && (dataCorrente == contatos[c].dataContato)) //se for um contato do vendedor na data mostrada na tela, então
				document.getElementById('v' + (v + 1) + 'c' + contatos[c].horario).innerHTML = contatos[c].nrocontato; //coloca no local correto no painel
		}
	}
}

/*Função anônima com argumento
que recebe o numero do contato e faz a busta na lista para retornar os dados pre-definidos
*/
let leContatos = function (nrocont) {
	for (let c = 0; c < contatos.length; c++) { //varre todos os contados
		if (nrocont == contatos[c].nrocontato) { //quando localiza o contato pelo numero
			contatoSelecionado = contatos[c].nrocontato //marca o contato na memória como ponteiro
			return (contatos[c].nrocontato + " - " + contatos[c].cliente) + " - " + contatos[c].tipoAtendimento; //retorna informações para o painel
		}
	}
}


/*Função anônima sem argumento
Finalidade: remover contato que está no ponteiro e retornar uma mensagem
*/
let removeContato = function () {
	if (contatoSelecionado > 0) { //se tem contato no ponteiro (selecionado)
		for (let c = 0; c < contatos.length; c++) { //lê todos os contatos
			if (contatoSelecionado == contatos[c].nrocontato) { //quando encontrar
				contatos.splice(c, 1) //remove
				alert('Contato removido com sucesso!') //avisa que removeu
				DistribuiContatos(); //como alterou a array então remove e realoca no painel
				return true; //sai
			}
		}
		alert('Não foi possível remover o contato, algo ocorreu de errado!') //se cair aqui é porque o contato nao foi encontrado
	} else { //caso contrario
		alert('Não foi selecionado nenhum contato para remover!') //exibe uma mensagem
	}
}

/* Evento de carregamento do documento - onload
Coloquei aqui o que quero que carregue no inicio 
*/
$(window).load(function () {

	CarregaVendedores(); //coloca os vendedores no painel

	//lançamento de contatos para testes e simulações
	contatos.push(new Contatos("Alexandre", geraNroContato(), "Givanildo", 'Atendimento', "0800", dataCorrente));
	contatos.push(new Contatos("Daniele", geraNroContato(), "Elisangela", 'Atendimento', "1030", dataCorrente));
	contatos.push(new Contatos("Fernando", geraNroContato(), "Lucas", 'Atendimento', "1130", dataCorrente));
	contatos.push(new Contatos("José", geraNroContato(), "Joao", 'Atendimento', "1530", dataCorrente));
	contatos.push(new Contatos("Paulo", geraNroContato(), "Luiz", 'Atendimento', "1530", dataCorrente));
	contatos.push(new Contatos("Silvani", geraNroContato(), "Moises", 'Atendimento', "1200", dataCorrente));

	DistribuiContatos() //distribui os contatos criados no painel.
});

/* Função anonima com retorno
finalidade: gerar um contador progressivo, retornando valor e armazenando o resultado na variável
*/
let geraNroContato = function () {
	return nroContato++; //acrescenta 
}

/* Função Flecha - Arrow Function
quando o usuario pressionar um campo, deve executar essa função  que mostra o argumento no campo designado
update para quando o campo estiver em branco, não deve mostrar nada
*/
var myFunction = (x) => {
	if (x.innerHTML != "") {
		document.getElementById('resp').innerHTML = 'Você selecionou o contato:<strong>' + leContatos(x.innerHTML) + '</strong>';
	} else {
		document.getElementById('resp').innerHTML = '';
	}
}


function limpaAgenda() {
	for (let linha = 1; linha < 10; linha++) {
		document.getElementById('v' + linha + 'c0800').innerHTML = '';
		document.getElementById('v' + linha + 'c0830').innerHTML = '';
		document.getElementById('v' + linha + 'c0900').innerHTML = "";
		document.getElementById('v' + linha + 'c0930').innerHTML = "";
		document.getElementById('v' + linha + 'c1000').innerHTML = "";
		document.getElementById('v' + linha + 'c1030').innerHTML = "";
		document.getElementById('v' + linha + 'c1100').innerHTML = "";
		document.getElementById('v' + linha + 'c1130').innerHTML = "";
		document.getElementById('v' + linha + 'c1200').innerHTML = "";
		document.getElementById('v' + linha + 'c1230').innerHTML = "";
		document.getElementById('v' + linha + 'c1300').innerHTML = "";
		document.getElementById('v' + linha + 'c1330').innerHTML = "";
		document.getElementById('v' + linha + 'c1400').innerHTML = "";
		document.getElementById('v' + linha + 'c1430').innerHTML = "";
		document.getElementById('v' + linha + 'c1500').innerHTML = "";
		document.getElementById('v' + linha + 'c1530').innerHTML = "";
		document.getElementById('v' + linha + 'c1600').innerHTML = "";
		document.getElementById('v' + linha + 'c1630').innerHTML = "";
		document.getElementById('v' + linha + 'c1700').innerHTML = "";
		document.getElementById('v' + linha + 'c1730').innerHTML = "";
		document.getElementById('v' + linha + 'c1800').innerHTML = "";
	}
}
//Função auto executavel
(function () {

	var fullHeight = function () {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();
	//ativa/desativa painel lateral
	$('#sidebar').toggleClass('active');
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

})(jQuery);


//configurações do calendario para fechar quando clicado, portugues, tamanho e forma
$('.form_date').datetimepicker({
	language: 'pt-BR',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
});
$('.form_date').datetimepicker("setDate", new Date());

//atribuir o uso de document by 
document.getElementById('btaoatualizar').innerHTML = 'Atualizar'
//carregar a data corrente inicial
dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
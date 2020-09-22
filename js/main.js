let vendedor = ['Alexandre', 'Daniele', 'Fernando', 'Lidiane', 'Lucas', 'Orlei', 'Paulo', 'Silvani', 'José']
let contatos = [];
let nroContato = 1000
let dataCorrente
let contatoSelecionado = 0

function Contatos(vendedor, nrocontato, cliente, tipoAtendimento, horario, dataContato) {
	this.vendedor = vendedor;
	this.nrocontato = nrocontato;
	this.cliente = cliente;
	this.tipoAtendimento = tipoAtendimento;
	this.horario = horario;
	this.dataContato = dataContato;
}

//vendedores
function CarregaVendedores() {
	vendedor.sort()
	for (let i = 1; i < vendedor.length + 1; i++) {
		document.getElementById('v' + i + 'c0').innerHTML = (vendedor[i - 1]);
	}
	mostraLinhaVendedor(); // se na linha não tiver vendedor entao oculta a linha
}

//Função com nome
function criacaoContato() {
	var v = prompt("Digite o Nome do vendedor:");
	var c = prompt("Digite o Nome do cliente:");
	var h = prompt("Digite o Horario na agenda HHMM:");
	if (confirm("Deseja inserir o contato?")) {
		dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
		var contato = new Contatos(v, nroContato, c, 'Atendimento', h, dataCorrente);
		nroContato++;
		contatos.push(contato);
		DistribuiContatos();
		alert("Contato Criado com sucesso!\nVendedor:" + contato.vendedor + "\nCliente: " + contato.cliente);
	}
}

// Função com nome
function DistribuiContatos() {
	//limpa agenda
	limpaAgenda();
	for (let v = 1; v < vendedor.length + 1; v++) {
		for (let c = 0; c < contatos.length; c++) {
			if (vendedor[v - 1] == contatos[c].vendedor)
				document.getElementById('v' + v + 'c' + contatos[c].horario).innerHTML = contatos[c].nrocontato;
		}
	}
}

//Função anônima com argumento
let leContatos = function (nrocont) {
	for (let c = 0; c < contatos.length; c++) {
		if (nrocont == contatos[c].nrocontato) {
			contatoSelecionado = contatos[c].nrocontato
			return (contatos[c].nrocontato + " - " + contatos[c].cliente) + " - " + contatos[c].tipoAtendimento;
		}
	}
}


//Função anônima sem argumento
let removeContato = function () {
	if (contatoSelecionado > 0) {
		for (let c = 0; c < contatos.length; c++) {
			if (contatoSelecionado == contatos[c].nrocontato) {
				alert(contatos[c].cliente)
				alert(contatos.splice(c, 1))
			}
		}
		DistribuiContatos();
	}
}

// Evento de carregamento do documento - onload
$(window).load(function () {

	//criação de contatos
	var teste = new Contatos("Alexandre", nroContato, "Givanildo", 'Atendimento', "0800", dataCorrente);
	contatos.push(teste);
	nroContato++;

	teste = new Contatos("Daniele", nroContato, "Elisangela", 'Atendimento', "1030", dataCorrente);
	contatos.push(teste);
	nroContato++;

	teste = new Contatos("Fernando", nroContato, "Lucas", 'Atendimento', "1130", dataCorrente);
	contatos.push(teste);
	nroContato++;

	teste = new Contatos("José", nroContato, "Joao", 'Atendimento', "1530", dataCorrente);
	contatos.push(teste);
	nroContato++;

	teste = new Contatos("Paulo", nroContato, "Luiz", 'Atendimento', "1530", dataCorrente);
	contatos.push(teste);
	nroContato++;

	teste = new Contatos("Silvani", nroContato, "Moises", 'Atendimento', "1200", dataCorrente);
	contatos.push(teste);
	nroContato++;

	DistribuiContatos()
});

let mostraLinhaVendedor = () => {
	for (let i = 1; i <= 9; i++) {
		var linhaVendedor = document.getElementById('v' + i + 'c0');
		if (linhaVendedor.innerHTML == "") {
			document.getElementById('linha' + i).style.display = "none";
		}
	}
}


//quando o usuario pressionar um campo, deve executar essa função  que mostra o argumento no campo designado
// Função Flecha - Arrow Function
var myFunction = (x) => {
	document.getElementById('resp').innerHTML = 'Você selecionou o contato:<strong>' + leContatos(x.innerHTML) + '</strong>';
}


CarregaVendedores();

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
(function ($) {

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

document.getElementById('btaoatualizar').innerHTML = 'Atualizar'
dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
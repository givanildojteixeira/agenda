/*
Main  
*/

'use strict';
/*global database */
/*global CarregaVendedoresPainel */
/*global DistribuiContatos */
/*global criacaoContato */
/*global removeContato */
/*global DistribuiContatos */
/*global horario */
/*global CarregaForm */



/*
correções necessárias de lint
inclusao de 'use strict' para evitar problemas com o codigo nos navegadores, obrigando o programador a tratar
os erros em tempo de programação
*/
let contatos = [];
let vendedor = [];

let dataCorrente = '';
let tempoAtualizarAutomaticamente = 60;


//construtor
class Contatos {
	constructor(vendedor, cliente, tipoAtendimento, horario, dataContato) {
		this.vendedor = vendedor;
		this.cliente = cliente;
		this.tipoAtendimento = tipoAtendimento;
		this.horario = horario;
		this.dataContato = dataContato;

		function pegaNro() {
			let n = 1000;
			for (let c = 0; c < contatos.length; c++) {
				n = contatos[c].nrocontato;
			}
			console.log(n++);
			return n++; //acrescenta
		}
		this.nrocontato = pegaNro();
	}
}

(function () {
	//Função auto executavel que esta vinculada ao painel lateral usado para menus  id='sidebar'
	var fullHeight = function () {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();
	//ativa/desativa painel lateral
	// $('#sidebar').toggleClass('active');
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

	$('#criar-modal').click(function () {
		$('#modal-alerta').modal();
		$('#NomeCliente').focus();
	});

	$('.modal').on('hidden.bs.modal', function () {
		$(this)
			.find('input,textarea')
			.val('')
			.end();
		$('#SelecVendedor').val('Nome do Vendedor');
		$('#SelecHora').val('Horário de atendimento');
		$('#SelecTipoAt').val('Tipo de atendimento');
		document.getElementById('SelecTipoAt').classList.add('--has-error');
		document.getElementById('SelecVendedor').classList.add('--has-error');
		document.getElementById('SelecHora').classList.add('--has-error');
	});


})(jQuery);


window.onload = function () {
	//****************************************************************************** */
	//configurações do calendario para fechar quando clicado, portugues, tamanho e forma
	$('.form_date').datetimepicker({
		language: 'pt-BR',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
	});
	$('.form_date').datetimepicker('setDate', new Date());

	$('.form_date').on('change', function () {
		new DistribuiContatos(); //distribui os contatos criados no painel.
	});

	$('.form_date').click(function () {
		new DistribuiContatos(); //distribui os contatos criados no painel.
	});

	//carregar a data corrente inicial caso nao tenha sido carregada
	if (dataCorrente === '') {
		let ca = $('.form_date').datetimepicker('getDate');
		dataCorrente = ca.getDate() + '/' + (ca.getMonth() + 1) + '/' + ca.getFullYear();
	}


	//****************************************************************************** */
	/*função para atualizar automaticamente apos um determinado tempo
	usa setInterval para atualizar o cronometro a cada 1 segundo
	*/
	setInterval(AtualizarAutomaticamente, 1000);

}();

$(window).load(function () {
	//****************************************************************************** */
	/* Evento de carregamento do documento - onload
	Coloquei aqui o que quero que carregue no inicio 
	para facilitar os testes
	*/
	vendedor = database.get('Vendedores');
	console.log(vendedor);
	if (vendedor == null) {
		vendedor = ['Alexandre', 'Daniele', 'Fernando', 'Lidiane',
			'Lucas', 'Orlei', 'Paulo', 'Silvani'
		];
		database.set('Vendedores', vendedor);
	}
	new CarregaVendedoresPainel(vendedor); //coloca os vendedores no painel
	// contatos = database.get('arrayContatos');
	new CargaInicialDidatica();
	setInterval(horario(), 1000); //mostra o horário no foot da tela

});

function AtualizarAutomaticamente() {
	tempoAtualizarAutomaticamente = tempoAtualizarAutomaticamente - 1;
	if (tempoAtualizarAutomaticamente === 0) {
		tempoAtualizarAutomaticamente = 60;
		new DistribuiContatos(); //distribui os contatos criados no painel.
	}
	document.querySelector('.clock').textContent = 'Próxima Atualização em: ' + tempoAtualizarAutomaticamente + ' segundo';
}

//****************************************************************************** */
/* usa o evento de mouse move em conjunto com getElementsByName para mostrar o que representa 
cada tipo de legenda
a princípio soment mostrando o seu nome, mas é possivel fazer um case select para colocar
instruções de como é cada atendimento, presencial ou nao */

document.querySelector('#MinhasLegendas').addEventListener('mousemove', function (e) {
	document.getElementById('resp').innerHTML = e.target.innerText;
});

//****************************************************************************** */
/* Evento getElementsByTagName que seta em array o que encontrar como tag h4
pedi para colocar o titulo em substituição ao campo arrya 0
*/
let CabecalhoAgenda = document.getElementsByTagName('h4');
CabecalhoAgenda[0].innerText = document.title;



/*
Trabalhando com eventos no JavaScript
Tratando Eventos (de navegadores)
Evento Inline
*/
var btaoDidatico = document.getElementById('btCargaInicialDidatica');
btaoDidatico.onclick = function () {
	new CargaInicialDidatica();
};



//****************************************************************************** */
// Evento de teclado com o uso de keyCode
document.addEventListener('keydown', teclaPressionada);

function teclaPressionada(event) {
	if (event.which === 119) { //tecla F8
		criacaoContato();
	} else if (event.which === 120) { //tecla F9
		removeContato();
	}
}

function CargaInicialDidatica() {
	if (JSON.parse(localStorage.getItem('arrayContatos')) != null) {
		contatos = (database.getArray('arrayContatos'));
	} else {
		//lançamento de contatos para testes e simulações
		contatos.push(new Contatos('Alexandre', 'Givanildo', 1, '0800', dataCorrente));
		contatos.push(new Contatos('Daniele', 'Elisangela', 2, '1030', dataCorrente));
		contatos.push(new Contatos('Fernando', 'Lucas', 1, '1130', dataCorrente));
		contatos.push(new Contatos('Paulo', 'Luiz', 5, '1530', dataCorrente));
		contatos.push(new Contatos('Silvani', 'Moises', 8, '1200', dataCorrente));
		contatos.push(new Contatos('Alexandre', 'Gustavo', 1, '1430', dataCorrente));
		contatos.push(new Contatos('Daniele', 'Carlos Eduardo', 2, '1630', dataCorrente));
		contatos.push(new Contatos('Fernando', 'João Vitor', 1, '1030', dataCorrente));
		contatos.push(new Contatos('Paulo', 'Rodolfo', 8, '1000', dataCorrente));
		contatos.push(new Contatos('Silvani', 'Gilberto', 7, '1800', dataCorrente));
		contatos.push(new Contatos('Orlei', 'Roni', 6, '0800', dataCorrente));
		contatos.push(new Contatos('Orlei', 'Elisangela', 3, '1030', dataCorrente));
		contatos.push(new Contatos('Silvani', 'Lucas', 1, '0930', dataCorrente));
		database.setArray('arrayContatos', contatos);
		window.alert('Carga Inicial Executada');
	}

	new CarregaForm();
	new DistribuiContatos(); //distribui os contatos criados no painel.
	setTimeout(function () { //em 1 segundos ira avisar que a carga foi executada e fecha o sidebar
		$('#sidebar').toggleClass('active');
	}, 100); //mensagem com delay pois aguarda o prenchimento da tela
}
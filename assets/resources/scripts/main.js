/*
Main   - local storage para armazenar os dados
*/

'use strict';
/*
correções necessárias de lint
inclusao de 'use strict' para evitar problemas com o codigo nos navegadores, obrigando o programador a tratar
os erros em tempo de programação
*/
let contatos = [];
let vendedor = [];
let nroContato = 1000;
let dataCorrente = '';
let contatoSelecionado = 0;
let tempoAtualizarAutomaticamente = 60;
let legendas = document.getElementsByName('legend'); //carrega a variavel legendas como um array

//construtor
function Contatos(vendedor, nrocontato, cliente, tipoAtendimento, horario, dataContato) {
	this.vendedor = vendedor;
	this.nrocontato = nrocontato++;
	this.cliente = cliente;
	this.tipoAtendimento = tipoAtendimento;
	this.horario = horario;
	this.dataContato = dataContato;
}


let myFunction = (x) => {
	/* Função anonima com retorno
	quando o usuario pressionar um campo dentro do painel, deve executar essa função 
	que mostra o argumento no campo designado
	e para quando o campo estiver em branco, não deve mostrar nada
	*/
	if (x.innerHTML !== '') {
		document.getElementById('resp').innerHTML = 'Você selecionou o contato:<strong>' +
			leContatos(parseInt(x.innerHTML)) + '</strong>';
	} else {
		document.getElementById('resp').innerHTML = '';
	}
	// myFunction(x);
	/*
	duas correções necessárias de lint
	declaração de myfunction() pois como seu uso parte do html o lint nao visualiza a funcionalidade dentro do js
	inplantação da conversao parseInt, para transformar o nro do contato em valor porque se usar === na comparação 
	da função leContatos ele persebe que o tipo string não é igual ao tipo int, logo , um dos dois tem que ser con-
	vertido 2 == "2" [com o uso de === não é igual]
	*/
};


let geraNroContato = () => {
	return nroContato++; //acrescenta
};


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
	$('#sidebar').toggleClass('active');
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
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
		/*
		 correções necessárias de lint
		 linha muito grande então ca teve que ser declarado para referenciar
		  $('.form_date').datetimepicker('getDate');
		*/
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
	if (vendedor == null) {
		vendedor = ['Alexandre', 'Daniele', 'Fernando', 'Lidiane',
			'Lucas', 'Orlei', 'Paulo', 'Silvani'
		];
		database.set('Vendedores', vendedor);
	}
	new CarregaVendedoresPainel(vendedor); //coloca os vendedores no painel
	new CargaInicialDidatica();
	setInterval(horario, 1000); //mostra o horário no foot da tela

});

function AtualizarAutomaticamente() {
	tempoAtualizarAutomaticamente = tempoAtualizarAutomaticamente - 1;
	if (tempoAtualizarAutomaticamente === 0) {
		tempoAtualizarAutomaticamente = 60;
		new DistribuiContatos(); //distribui os contatos criados no painel.
	}
	document.querySelector('.clock').textContent = 'Proxima Atualização em: ' + tempoAtualizarAutomaticamente + 'segundo';
}

//****************************************************************************** */
/* usa o evento de mouse move em conjunto com getElementsByName para mostrar o que representa cada tipo de legenda
a princípio soment mostrando o seu nome, mas é possivel fazer um case select para colocar
instruções de como é cada atendimento, presencial ou nao */

document.querySelector('#Leg1').addEventListener('mousemove', function () {
	passouOMouse(0);
});
document.querySelector('#Leg2').addEventListener('mousemove', function () {
	passouOMouse(1);
});
document.querySelector('#Leg3').addEventListener('mousemove', function () {
	passouOMouse(2);
});
document.querySelector('#Leg4').addEventListener('mousemove', function () {
	passouOMouse(3);
});
document.querySelector('#Leg5').addEventListener('mousemove', function () {
	passouOMouse(4);
});
document.querySelector('#Leg6').addEventListener('mousemove', function () {
	passouOMouse(5);
});
document.querySelector('#Leg7').addEventListener('mousemove', function () {
	passouOMouse(6);
});
document.querySelector('#Leg8').addEventListener('mousemove', function () {
	passouOMouse(7);
});
document.querySelector('#Leg9').addEventListener('mousemove', function () {
	passouOMouse(8);
});

function passouOMouse(n) {
	//Imprimir alguma propriedade do objeto event recebido como parâmetro
	document.getElementById('resp').innerHTML = (legendas[n].innerText);
}

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
	console.log('teste')
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

	//lançamento de contatos para testes e simulações
	contatos.push(new Contatos('Alexandre', geraNroContato(), 'Givanildo', 1, '0800', dataCorrente));
	contatos.push(new Contatos('Daniele', geraNroContato(), 'Elisangela', 2, '1030', dataCorrente));
	contatos.push(new Contatos('Fernando', geraNroContato(), 'Lucas', 1, '1130', dataCorrente));
	contatos.push(new Contatos('José', geraNroContato(), 'Joao', 4, '1530', dataCorrente));
	contatos.push(new Contatos('Paulo', geraNroContato(), 'Luiz', 5, '1530', dataCorrente));
	contatos.push(new Contatos('Silvani', geraNroContato(), 'Moises', 8, '1200', dataCorrente));
	contatos.push(new Contatos('Alexandre', geraNroContato(), 'Gustavo', 1, '1430', dataCorrente));
	contatos.push(new Contatos('Daniele', geraNroContato(), 'Carlos Eduardo', 2, '1630', dataCorrente));
	contatos.push(new Contatos('Fernando', geraNroContato(), 'João Vitor', 1, '1030', dataCorrente));
	contatos.push(new Contatos('José', geraNroContato(), 'Sandro', 4, '1130', dataCorrente));
	contatos.push(new Contatos('Paulo', geraNroContato(), 'Rodolfo ', 9, '1530', dataCorrente));
	contatos.push(new Contatos('Silvani', geraNroContato(), 'Gilberto', 7, '1800', dataCorrente));
	contatos.push(new Contatos('Orlei', geraNroContato(), 'Roni', 6, '0800', dataCorrente));
	contatos.push(new Contatos('Orlei', geraNroContato(), 'Elisangela', 3, '1030', dataCorrente));
	contatos.push(new Contatos('Silvani', geraNroContato(), 'Lucas', 1, '1130', dataCorrente));

	DistribuiContatos(); //distribui os contatos criados no painel.
	setTimeout(function () { //em 1 segundos ira avisar que a carga foi executada e fecha o sidebar
		window.alert('Carga Inicial Executada');
		$('#sidebar').toggleClass('active');
	}, 100); //mensagem com delay pois aguarda o prenchimento da tela
}
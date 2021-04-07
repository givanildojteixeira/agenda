/*
Main
*/
let vendedor = ['Alexandre', 'Daniele', 'Fernando', 'Lidiane', 'Lucas', 'Orlei', 'Paulo', 'Silvani', 'José']
let contatos = [];
let nroContato = 1000
let dataCorrente = ""
let contatoSelecionado = 0
let tempoAtualizarAutomaticamente = 60


//construtor
function Contatos(vendedor, nrocontato, cliente, tipoAtendimento, horario, dataContato) {
	this.vendedor = vendedor;
	this.nrocontato = nrocontato;
	this.cliente = cliente;
	this.tipoAtendimento = tipoAtendimento;
	this.horario = horario;
	this.dataContato = dataContato;
}
//****************************************************************************** */
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
//****************************************************************************** */
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
	
    //verifica falhas nas strings recebidas  - Validadores
	v = v.trim();    //manipulação 1
	if (v == ''){
		alert('Nome do vendedor não pode ser = brancos')
		return;
	}
	if (h.indexOf(':') > -1){ //manipulação 2
			alert('Não coloque [:] em horario, este deve ser no formato HHMM apenas')
		return;
	}
	if (c.length < 4) { //manipulação 3
			alert('Nome do Cliente deve ter mais que 3 caracteres')
		return;
	}
	h = h.replace(/[^0-9]/g,'');  //Manipulação 4 usando string template, extraindo somente numeros da variavel de hora
	if (h.length != 4) {
		alert('O Horario não esta no formato correto, favor colocar como HHMM')
		return;	
	}
	//fim da validação!
	if (confirm("Deseja inserir o contato?")) {
		//dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
		var contato = new Contatos(v, geraNroContato(), c, 'Atendimento', h, dataCorrente);
		contatos.push(contato);    //insere o contato
		DistribuiContatos();     //distribui na tela
		//inseri o setTime, para que o Distribuidor dos contatos, possa inserir o contato sem sem perturbado pelo comfirm
		setTimeout(function () {       //em 3 segundos ira avisar que a carga foi executada e fecha o sidebar
		confirm("Contato Criado com sucesso!\nVendedor:" + contato.vendedor + "\nCliente: " + contato.cliente);
	}, 100);  //mensagem com delay de 3s
	}
}
//****************************************************************************** */
/* Função com nome
faz a busca nos contatos e posiciona no painel conforme a data, horario e vendedor
*/
function DistribuiContatos() {
	limpaAgenda(); //limpa agenda, para trabalhar com uma tabela zerada
	dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
	for (let v = 0; v < vendedor.length; v++) { //para cada vendedor do painel,
		for (let c = 0; c < contatos.length; c++) { //varre os contatos.
			//inserido toUpperCase() no tratamento da String para desconsiderar problemas com comparação da String
			if ((vendedor[v].toUpperCase() == contatos[c].vendedor.toUpperCase()) && (dataCorrente == contatos[c].dataContato)) {//se for um contato do vendedor na data mostrada na tela, então
				document.getElementById('v' + (v + 1) + 'c' + contatos[c].horario).innerHTML = contatos[c].nrocontato; //coloca no local correto no painel
				/*implantar que o sistema coloque a cor do quadro, conforme a cor da legenda para identificar
				document.getElementById('v' + (v + 1) + 'c' + contatos[c].horario).style.backgroundColor = document.getElementById('Legc1').style.backgroundColor;
				*/
			}
		}
	}
}
/* Função Flecha - Arrow Function
quando o usuario pressionar um campo dentro do painel, deve executar essa função 
que mostra o argumento no campo designado
e para quando o campo estiver em branco, não deve mostrar nada
*/
var myFunction = (x) => {
	if (x.innerHTML != "") {
		document.getElementById('resp').innerHTML = 'Você selecionou o contato:<strong>' + leContatos(x.innerHTML) + '</strong>';
	} else {
		document.getElementById('resp').innerHTML = '';
	}
}

//****************************************************************************** */
/*Função anônima com argumento
que recebe o numero do contato e faz a busta na lista para retornar os dados pre-definidos
*/
let leContatos = function (nrocont) {
	for (let c = 0; c < contatos.length; c++) { //varre todos os contados
		if (nrocont == contatos[c].nrocontato) { //quando localiza o contato pelo numero
			contatoSelecionado = contatos[c].nrocontato //marca o contato na memória como ponteiro
			return ( "Dia:" + contatos[c].dataContato + " - Nro:" + contatos[c].nrocontato + " - Cliente:" + contatos[c].cliente) + " - Tipo:" + contatos[c].tipoAtendimento; //retorna informações para o painel
		}
	}
}

//****************************************************************************** */
/*Função anônima sem argumento
Finalidade: remover contato que está no ponteiro e retornar uma mensagem
*/
let removeContato = function () {
	if (contatoSelecionado > 0) { //se tem contato no ponteiro (selecionado)
		for (let c = 0; c < contatos.length; c++) { //lê todos os contatos
			if (contatoSelecionado == contatos[c].nrocontato) { //quando encontrar
				contatos.splice(c, 1) //remove
				confirm('Contato removido com sucesso!') //avisa que removeu
				DistribuiContatos(); //como alterou a array então remove e realoca no painel
				return true; //sai
			}
		}
		alert('Não foi possível remover o contato, algo ocorreu de errado!') //se cair aqui é porque o contato nao foi encontrado
	} else { //caso contrario
		alert('Não foi selecionado nenhum contato para remover!') //exibe uma mensagem
	}
}
//****************************************************************************** */
/* Função anonima com retorno
finalidade: gerar um contador progressivo, retornando valor e armazenando o resultado na variável
*/
let geraNroContato = function () {
	return nroContato++; //acrescenta 
}



//****************************************************************************** */
/*Função anonima sem argumento
limpa toda a agenda de contatos, 
usada para mudança de data ou recolocação dos contatos
*/
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
//****************************************************************************** */
//Função auto executavel que esta vinculada ao painel lateral usado para menus  id="sidebar"
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
$('.form_date').datetimepicker("setDate", new Date());
 
$('.form_date').on("change", function (ev) {
    DistribuiContatos() //distribui os contatos criados no painel.
    });

$('.form_date').click(function () {
	DistribuiContatos() //distribui os contatos criados no painel.
  });

//carregar a data corrente inicial caso nao tenha sido carregada
if (dataCorrente == "") {
	dataCorrente = $('.form_date').datetimepicker("getDate").getDate() + "/" + ($('.form_date').datetimepicker("getDate").getMonth() + 1) + "/" + $('.form_date').datetimepicker("getDate").getFullYear()
}


//****************************************************************************** */
/*função para atualizar automaticamente apos um determinado tempo
usa setInterval para atualizar o cronometro a cada 1 segundo
*/
function AtualizarAutomaticamente() {
	tempoAtualizarAutomaticamente = tempoAtualizarAutomaticamente - 1;
	if (tempoAtualizarAutomaticamente == 0) {
		tempoAtualizarAutomaticamente = 60;
		DistribuiContatos(); //distribui os contatos criados no painel.
	}
    document.querySelector('.clock').textContent = "Proxima Atualização em: " + tempoAtualizarAutomaticamente + " segundos.";
}

let atrazoNoProcesso = setTimeout(AtualizarAutomaticamente(), 50000);

if (atrazoNoProcesso != '') {
	const createClock = setInterval(AtualizarAutomaticamente, 1000);
}


//****************************************************************************** */
/* usa o evento de mouse move em conjunto com getElementsByName para mostrar o que representa cada tipo de legenda
a princípio soment mostrando o seu nome, mas é possivel fazer um case select para colocar
instruções de como é cada atendimento, presencial ou nao */
let legendas = document.getElementsByName("legend");   //carrega a variavel legendas como um array
//usa queryselector para programar os eventos listener nas legendas, passando uma funçao como parâmetro
document.querySelector("#Leg1").addEventListener("mousemove", function() {passouOMouse(0)});
document.querySelector("#Leg2").addEventListener("mousemove", function() {passouOMouse(1)});
document.querySelector("#Leg3").addEventListener("mousemove", function() {passouOMouse(2)});
document.querySelector("#Leg4").addEventListener("mousemove", function() {passouOMouse(3)});
document.querySelector("#Leg5").addEventListener("mousemove", function() {passouOMouse(4)});
document.querySelector("#Leg6").addEventListener("mousemove", function() {passouOMouse(5)});
document.querySelector("#Leg7").addEventListener("mousemove", function() {passouOMouse(6)});
document.querySelector("#Leg8").addEventListener("mousemove", function() {passouOMouse(7)});
document.querySelector("#Leg9").addEventListener("mousemove", function() {passouOMouse(8) });

function passouOMouse(n) {
	//Imprimir alguma propriedade do objeto event recebido como parâmetro
	document.getElementById('resp').innerHTML = (legendas[n].innerText)	
}

//****************************************************************************** */
/* Evento getElementsByTagName que seta em array o que encontrar como tag h4
pedi para colocar o titulo em substituição ao campo arrya 0
*/
let CabecalhoAgenda = document.getElementsByTagName('h4');
CabecalhoAgenda[0].innerText = document.title;

//****************************************************************************** */
/* Evento de carregamento do documento - onload
Coloquei aqui o que quero que carregue no inicio 
para facilitar os testes
*/
$(window).load(function () {

	CarregaVendedores(); //coloca os vendedores no painel
	setInterval(horario, 1000);  //mostra o horário no foot da tela
});

function CargaInicialDidatica() {
		//lançamento de contatos para testes e simulações
	contatos.push(new Contatos("Alexandre", geraNroContato(), "Givanildo", 'Atendimento', "0800", dataCorrente));
	contatos.push(new Contatos("Daniele", geraNroContato(), "Elisangela", 'Atendimento', "1030", dataCorrente));
	contatos.push(new Contatos("Fernando", geraNroContato(), "Lucas", 'Atendimento', "1130", dataCorrente));
	contatos.push(new Contatos("José", geraNroContato(), "Joao", 'Atendimento', "1530", dataCorrente));
	contatos.push(new Contatos("Paulo", geraNroContato(), "Luiz", 'Atendimento', "1530", dataCorrente));
	contatos.push(new Contatos("Silvani", geraNroContato(), "Moises", 'Atendimento', "1200", dataCorrente));

	DistribuiContatos() //distribui os contatos criados no painel.
	setTimeout(function () {       //em 1 segundos ira avisar que a carga foi executada e fecha o sidebar
		alert("Carga Inicial Executada");
		$('#sidebar').toggleClass('active');
	}, 100);  //mensagem com delay pois aguarda o prenchimento da tela
}

//função que controi o horário Longo
function horario() {

  var relogio = document.querySelector("#relogio");
  var d = new Date();
  var seg = d.getSeconds();
  var min = d.getMinutes();
  var hr = d.getHours();
  var dia = d.getDate();
  var mes = d.getMonth();
  var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var diaSem = d.getDay();
  var diasSemana = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
		relogio.innerHTML = diasSemana[diaSem] + ", " + dia + " de " + meses[mes] + ", " + hr + ":" + min + ":" + seg;
}

//****************************************************************************** */
// Evento de teclado com o uso de keyCode
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(event) {
     if(event.which==119){   //tecla F8
        criacaoContato()
    } else if (event.which==120) {    //tecla F9
        removeContato()
    }
}
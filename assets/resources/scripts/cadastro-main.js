'use strict';
/*global database */


let contatos = [];
let nroCto = 0;


$(window).load(function () {
    nroCto = database.get('codCadastro');
    contatos = (database.getArray('arrayContatos'));
    document.getElementById('NomeForm').value = leClienteContatos(nroCto);
    $('#CPF').focus();
});


$(document).ready(function () {
    $('#DataNascimento').mask('00/00/0000');
    $('.time').mask('00:00:00');
    $('.date_time').mask('00/00/0000 00:00:00');
    $('.cep').mask('00000-000');
    $('.phone').mask('0000-0000');
    $('#fonecom').mask('(00) 0000-0000');
    $('#foneres').mask('(00) 0000-0000');
    $('#celular').mask('(00) 0 0000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('#CPF').mask('000.000.000-00', {
        reverse: false
    });
    $('.cnpj').mask('00.000.000/0000-00', {
        reverse: true
    });
    $('.money').mask('000.000.000.000.000,00', {
        reverse: true
    });
    $('.money2').mask('#.##0,00', {
        reverse: true
    });
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/,
                optional: true
            }
        }
    });
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', {
        reverse: true
    });
    $('.clear-if-not-match').mask('00/00/0000', {
        clearIfNotMatch: true
    });
    $('.placeholder').mask('00/00/0000', {
        placeholder: '__/__/____'
    });
    $('.fallback').mask('00r00r0000', {
        translation: {
            'r': {
                pattern: /[\/]/,
                fallback: '/'
            },
            placeholder: '__/__/____'
        }
    });
    $('.selectonfocus').mask('00/00/0000', {
        selectOnFocus: true
    });
});

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


    var elements = document.getElementsByTagName('INPUT');
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.setCustomValidity('');
            if (!e.target.validity.valid) {
                let m = 'Campo ' + e.target.name + ' não pode ficar em branco!';
                console.log(e.target.id);
                e.target.setCustomValidity(m);
            }
        };
        elements[i].oninput = function (e) {
            e.target.setCustomValidity('');
        };
    }
    $('#sidebar').toggleClass('active')
})(jQuery);


let leClienteContatos = (nrocont) => {
    for (let c = 0; c < contatos.length; c++) //varre todos os contados
        if (nrocont === contatos[c].nrocontato) //quando localiza o contato pelo numero
            return contatos[c].cliente;
};
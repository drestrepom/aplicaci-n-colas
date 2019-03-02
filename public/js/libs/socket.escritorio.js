var socket = io();
socket.on('connect', function () {
    console.log('Conectado con el servidor')
});
socket.on('disconnect', function () {
    console.log('Desconectado del servidor')
});
var  label =  $('small');
var searchParams = new URLSearchParams(window.location.search);
if (! searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw  new Error('El escritorio es necesario ')
}
var escritorio = searchParams.get('escritorio');
$('h1').text("Escritorio " + escritorio);
$('button').on('click', function () {
    socket.emit('atenderTicket',{escritorio: escritorio}, function (resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text(resp.numero);
    });
});
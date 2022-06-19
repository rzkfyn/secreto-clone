$(function(){
    $('.message-form').on('submit', function(e) {
        e.preventDefault();

        $('.container').replaceWith(load());

        const timeStamp = new Date().toString();
        const text = $(this).children('#text').val();
        const forUserSecretId = location.href.replace(`${location.origin}/`, '').replace('/', '');
        const user = $('.username').text();
        const isRegistered = localStorage.getItem('id') && localStorage.getItem('secretId') && localStorage.getItem('name');
        
        $.post('/message', { text, timeStamp, forUserSecretId }, _ => {
            setTimeout(() => {
                $('.load').replaceWith(success(isRegistered, user));
            }, 1000);
        });
    });
});

function load() {
    return `<div class="load" style="text-align: center;">
                <img src="/imgs/gif/load.gif" alt="load">
            </div>`;
}

function success(registered, user) {
    return `<div class="container">
                <div class="title">
                    <p>Message Sent!</p>
                </div>
                <div class="success">
                    <img src="/imgs/svg/success.svg" alt="success">
                    <p>Do Not tell ${user} that you have sent the message.</p>
                </div>
                ${registered ? '' : '<a href="/">Register Now</a>'}
                <a href="${location.href}">Send Another Message</a>
            </div>`;
}
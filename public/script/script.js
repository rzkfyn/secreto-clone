$(async function(){
    if (typeof Storage == 'undefined') return alert('Your browser does\'nt support local Storage ;_;');
    const secretId = localStorage.getItem('secretId');
    const id = localStorage.getItem('id');

    if (secretId && id) {
        $.post('/getUser', { secretId, _id: id }, res => {
            if (!res) return;
            
            const el = registeredUserUi(res);
            $('main').html(el);
        });
    }

    $('.register-form').on('submit', function(e) {
        e.preventDefault();

        const name = $(this).children('#name').val();
        const secretId = `${+ new Date()}`;

        $.post('/', { name, secretId }, res => {
            localStorage.setItem('name', name)
            localStorage.setItem('secretId', secretId);
            localStorage.setItem('id', res);

            const el = registeredUserUi({ secretId });
            $('main').html(el);
        });
    });
});

function registeredUserUi(user) {
    return `<div class="mymssg-btn">
                <a href="${location.origin}/${user.secretId}">My Messages</a>
            </div>
            <div class="title">
                <h3>Make This Your Whatsapp / Instagram Status</h3>
            </div>
            <div class="container">
                <form action="" method="post">
                    <div class="secret-link">
                        <input type="text" id="secretLink" value="${location.origin}/${user.secretId}">
                        <div class="copy-btn" style="position: relative; cursor: pointer;">
                            <div class="copy-mssg" hidden>
                                copied!
                            </div>
                        </div>
                    </div>
                    <div style="position: relative;">
                        <button class="copy-btn" type="button">copy this link</button>
                        <div class="copy-mssg" style="left: 45%;" hidden>
                            copied!
                        </div>
                    </div>
                </form>
                <div class="social-media-btns">
                    <div class="lg-btns">
                        <ul>
                            <li><a href="#" class="wa-lg-btn">Whatsapp Status</a></li>
                            <li><a href="#" class="ig-lg-btn">Add to Instagram Bio</a></li>
                            <li><a href="#" class="share-lg-btn">Share</a></li>
                        </ul>
                    </div>
                    <div class="md-btns">
                        <div>
                            <ul>
                                <li><a href="#" class="sc-md-btn">Snapchat</a></li>
                                <li><a href="#" class="twit-md-btn">Twitter</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><a href="#" class="wa-md-btn">Whatsapp</a></li>
                                <li><a href="#" class="fm-md-btn">Messanger</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mymssg-btn">
                <a href="${location.origin}/${user.secretId}">My Messages</a>
            </div>`;
}
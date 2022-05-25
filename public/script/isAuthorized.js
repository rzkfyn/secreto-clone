$(function() {
    const _id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const secretId = localStorage.getItem('secretId');

    if (!_id || !name || !secretId) return;
    const id = location.href.replace(`${location.origin}/`, '');

    $.post('/isAuthorized', {id, _id, name, secretId}, res => {
        if (!res) return;

        $('.container').replaceWith(authorizedUserUi({id, secretId}));
    });
});


function authorizedUserUi(user) {
    return `<div class="title">
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
            </div>`;
}
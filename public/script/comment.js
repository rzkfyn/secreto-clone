$(function() {
    $('.comment-form').on('submit', function(e) {
        e.preventDefault();

        const text = $(this).children('input[name=comment]').val();
        if (!text || (text.trim() == '')) return;
        const forUserSecretId = location.href.replace(`${location.origin}/`, '').replace('/', '');
        const forMessageId = $(this).children('input[name=messageId]').val();

        $.post('/comment', { text, forMessageId, forUserSecretId }, res => {
            if (res.status !== 'success') return;
            $(this).next('.comments').prepend(makeCommentEl(text));
            $(this).children('input[name=comment]').val('');
        });
    });
});

function makeCommentEl(comment) {
    return `<div class="comment">
                <p>${comment}</p>
            </div>`;
}
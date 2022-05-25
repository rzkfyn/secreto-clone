$(function() {
    $('.comment-form').on('submit', function(e) {
        e.preventDefault();

        const text = $(this).children('input[name=comment]').val();
        if (!text || (text.trim() == '')) return;
        const messageId = $(this).children('input[name=messageId]').val();
        const timeStamp = new Date().toString();

        $.post('/comment', { text, messageId, timeStamp }, _ => {
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
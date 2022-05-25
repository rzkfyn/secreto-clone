$(function() {
    $(document).on('click', function(e) {
        const target = e.target;
        if (!$(target).hasClass('copy-btn')) return;
        navigator.clipboard.writeText($('#secretLink').val())
            .catch((err) => {
                console.log(err);

                // untuk beberapa browser yang malah execCommand yang bisa
                const textArea = document.createElement('textarea');
                textArea.value = $('#secretLink').val();
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
            })
            .finally(() => { 
                if ($(target).next().length != 0) {
                    $(target).next().removeAttr('hidden');
                    setTimeout(() => {
                        $(target).next().attr('hidden', '');
                    }, 800);
                } else {
                    $(target).children('.copy-mssg').removeAttr('hidden');
                    setTimeout(() => {
                        $(target).children('.copy-mssg').attr('hidden', '');
                    }, 800);
                }
            }
        );
    });
});
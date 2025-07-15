// copy-code.js
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-wrapper').querySelector('code');

            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent)
                    .then(() => {
                        const originalText = button.textContent;
                        button.textContent = 'Disalin!';
                        setTimeout(() => {
                            button.textContent = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Gagal menyalin: ', err);
                        fallbackCopyTextToClipboard(codeBlock.textContent);
                    });
            }
        });
    });

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Berhasil menyalin (fallback)!' : 'Gagal menyalin (fallback)!';
            console.log(msg);
        } catch (err) {
            console.error('Oops, tidak bisa menyalin menggunakan fallback: ', err);
        }
        document.body.removeChild(textArea);
    }
});

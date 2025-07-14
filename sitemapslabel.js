// Variabel untuk menentukan jumlah postingan yang akan ditampilkan.
// Pastikan nilai ini tidak melebihi 'max-results' di URL feed Blogger Anda.
var numposts = 999;

// Variabel untuk mengaktifkan atau menonaktifkan styling standar (tag <li>).
var standardstyling = true;

// Fungsi utama yang dipanggil setelah data feed Blogger diterima.
function startpost(json){
    // Ambil semua entri postingan dari feed JSON.
    var entries = json.feed.entry;

    // Urutkan entri postingan berdasarkan tanggal publikasi (published.$t) secara menaik (ascending).
    // Ini akan menempatkan postingan terlama di awal array.
    entries.sort(function(a, b) {
        // Konversi string tanggal ke objek Date untuk perbandingan yang akurat.
        var dateA = new Date(a.published.$t);
        var dateB = new Date(b.published.$t);
        // Mengurangi dateA dari dateB akan menghasilkan angka negatif jika dateA lebih lama,
        // nol jika sama, atau positif jika dateA lebih baru. Ini adalah cara standar
        // untuk mengurutkan tanggal secara menaik (oldest first).
        return dateA - dateB;
    });

    // Iterasi melalui entri postingan yang sudah diurutkan.
    // Menggunakan Math.min untuk memastikan kita tidak melebihi jumlah postingan yang tersedia
    // jika 'numposts' lebih besar dari total entri.
    for (var i = 0; i < Math.min(numposts, entries.length); i++){
        var entry = entries[i]; // Ambil entri postingan dari array yang sudah diurutkan.
        var posttitle = entry.title.$t; // Judul postingan.
        var posturl; // URL postingan.

        // Cari URL alternatif (URL postingan sebenarnya).
        for (var k = 0; k < entry.link.length; k++){
            if (entry.link[k].rel == 'alternate'){
                posturl = entry.link[k].href;
                break; // Keluar dari loop setelah URL ditemukan.
            }
        }

        // Buat judul postingan menjadi tautan.
        posttitle = posttitle.link(posturl);

        // Jika styling standar diaktifkan, tulis tag <li> pembuka.
        if (standardstyling) {
            document.write('<li>');
        }
        
        // Tulis judul postingan yang sudah menjadi tautan.
        document.write(posttitle);

        // Jika styling standar diaktifkan, tulis tag </li> penutup.
        // PENTING: Tag </li> harus ditutup untuk setiap item di dalam loop.
        if (standardstyling) {
            document.write('</li>');
        }
    }
}

// Fungsi ini tidak digunakan dalam konteks kode yang diberikan, tetapi tetap dipertahankan.
function finished(){}


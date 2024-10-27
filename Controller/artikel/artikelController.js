// // Menggunakan AJAX untuk mengambil data dari file JSON
// $(document).ready(function () {
//     $.ajax({
//         url: '/Teman-Bicara-Web/Controller/artikel/cardDatas.json', // URL file JSON
//         method: 'GET', // Metode permintaan
//         dataType: 'json', // Tipe data yang diharapkan
//         success: function (data) {
//             // Menghasilkan semua kartu berdasarkan data JSON
//             print(data)
//             data.forEach(cardData => {
//                 $('#card-container').append(createCard(cardData));
//             });
//         },
//         error: function (error) {
//             console.error('Error fetching JSON:', error); // Menangani kesalahan
//         }
//     });
// });

const itemsPerPage = 9; // Jumlah item per halaman
let currentPage = 1; // Halaman saat ini
let cardData = []; // Array untuk menyimpan data artikel

function createCard(cardData) {
    return `
        <div class="col-12 col-sm-6 col-md-4 mb-4 px-5">
            <div class="card custom-card-border" style="height: 18rem;">
                <img src="${cardData.imgSrc}" class="card-img-top" alt="${cardData.title}">
                <div class="card-body">
                    <h5 class="card-title">${cardData.title}</h5>
                    <div class="text-end">
                        <a href="artikelDetailPageView.html?id=${cardData.id}" class="custom-card-link">Selengkapnya</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCards(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = cardData.slice(startIndex, endIndex);

    $('#card-container').empty(); // Kosongkan kontainer sebelum menambahkan kartu baru
    paginatedData.forEach(card => {
        $('#card-container').append(createCard(card));
    });

    $('#page-info').text(`${page} of ${Math.ceil(cardData.length / itemsPerPage)}`);
    // $('#prev').prop('disabled', page === 1);
    // $('#next').prop('disabled', page === Math.ceil(cardData.length / itemsPerPage));
}

$(document).ready(function () {
    // AJAX untuk mengambil data
    $.ajax({
        url: '../../Controller/artikel/cardDatas.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            cardData = data; // Simpan data ke variabel global
            renderCards(currentPage); // Render halaman pertama
        },
        error: function (error) {
            console.error('Error fetching JSON:', error);
        }
    });

    $('#next').click(function () {
        if (currentPage < Math.ceil(cardData.length / itemsPerPage)) {
            currentPage++;
            renderCards(currentPage);
        }
    });

    $('#prev').click(function () {
        if (currentPage > 1) {
            currentPage--;
            renderCards(currentPage);
        }
    });
});

// Detail Page
$(document).ready(function () {
    // Fucntion untuk mendapatkan parameter query
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the 'id' parameter from the URL
    const articleId = getQueryParam('id');
    print(articleId)

    if (articleId) {
        // AJAX request to get the JSON data
        $.ajax({
            url: '../../Controller/artikel/cardDatas.json', // Path to the JSON file
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Find the article that matches the ID
                const article = data.find(item => item.id === articleId);

                if (article) {
                    // Update the HTML content with the data from JSON
                    $('#article-title').text(article.title);
                    $('#article-date').text(article.date);
                    $('#article-author').text(article.author);
                    $('#article-image').attr("src",article.imgSrc);
                    $('#article-content').html('<p>' + article.text + '</p>');
                } else {
                    $('#article-content').html('<p>Article not found.</p>');
                }
            },
            error: function (error) {
                console.error('Error fetching the article data:', error);
                $('#article-content').html('<p>Error loading content. Please try again later.</p>');
            }
        });
    } else {
        $('#article-content').html('<p>No article ID specified in the URL.</p>');
    }
});
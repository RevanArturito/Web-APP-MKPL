let currentQuestionIndex = 0;
let questionsData = [];

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "../../Model/soalController.json",
        dataType: "json",
        success: function (response) {
            questionsData = response;

            displayQuestion(currentQuestionIndex);

            $("#next-btn").click(function () {
                if (currentQuestionIndex < questionsData.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                }
            })

            $("#prev-btn").click(function () {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    displayQuestion(currentQuestionIndex);
                }
            });

        },
        Error: function (err) {
            console.error(err)
        }
    });
});

function displayQuestion(index) {
    $('.counting').text(`Pertanyaan ${parseInt(index) + 1}`);

    let _question = questionsData[index];
    $('#questions').text(_question.question);

    let _option = questionsData[index].options;
    _option.forEach(function (option, i) {
        $(`.label${i + 1}`).text(option);
    })
}

if (currentQuestionIndex === 0) {
    $('#prev.btn').attr('disable', true);
} else {
    $('#prev.btn').attr('disable', false);
}

if (currentQuestionIndex === questionsData - 1) {
    $('#next-btn').attr('disable', true);
} else {
    $('#next-btn').attr('disable', false);
}

let btn = document.querySelector('#btn-sidebar')
let sidebar = document.querySelector('#sidebar-soal');
btn.onclick = function () {
    sidebar.classList.toggle('active');
};

const cards = document.querySelectorAll('#no');
let completeQuestions = [];
let activeIndex = -1;

function updateCardState() {
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (completeQuestions.includes(index)) {
            card.classList.add('complete');
        } else {
            card.classList.remove('complete');
        }
    })
    if (activeIndex >= 0) {
        cards[activeIndex].classList.add('active');
        displayQuestion([activeIndex]);
    }
}

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        activeIndex = index;
        if (!completeQuestions.includes(index)) {
            completeQuestions.push(index); 
        }
        updateCardState();
    });
});

updateCardState();
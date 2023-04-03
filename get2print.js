//日付入力の初期値をセット
window.onload = function () {
    var today = new Date();
    today.setDate(today.getDate());
    var yyyy = today.getFullYear();
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var dd = ("0" + today.getDate()).slice(-2);
    document.getElementById("date").value = yyyy + '-' + mm + '-' + dd;

    ClickDay();
}

function ClickDay() {
    let dates = getDates();
    SearchDay(dates);
}

function ClickMonth() {
    //DOM取得
    let tbody = document.querySelector('#csv_data_table tbody');
    tbody.innerHTML = "";
    let tbody_html = "";
    var j = document.getElementById('selectYM').value;

    if(j != '') var monthData = loadCSV("./Schedule/20" + j + ".csv");

    for(let i = 0; i < monthData.length; i ++) {
        tbody_html += `<tr>
        <td>${monthData[i][0]}</td>
        <td>${monthData[i][1]}</td>
        <td>${monthData[i][2]}</td>
        <td>${monthData[i][3]}</td>
        <td>${monthData[i][4]}</td>
        </tr>`;
    }
    tbody.innerHTML = tbody_html;
}

function getDates() {
    let date = document.getElementById('date').value;
    var dates = date.split("-");
    return dates;
}

function SearchDay(dates) {
    ClearDay();
    let tbody = document.querySelector('#daySearch_table tbody');
    tbody.innerHTML = "";
    let tbody_html = "";
    var j = `${dates[0]}${dates[1]}`;
    var monthData = loadCSV("./Schedule/" + j + ".csv");

    tbody_html += `<tr>
        <td>${monthData[dates[2] - 1][0]}</td>
        <td>${monthData[dates[2] - 1][1]}</td>
        <td>${monthData[dates[2] - 1][2]}</td>
        <td>${monthData[dates[2] - 1][3]}</td>
        <td>${monthData[dates[2] - 1][4]}</td>
        </tr>`;
        
    tbody.innerHTML = tbody_html;
}

function loadCSV(targetFile) {
    var monthData = []; // 読み込んだデータを1行ずつ格納する配列

    // XMLHttpRequestの用意
    var request = new XMLHttpRequest();
    request.open("get", targetFile, false);
    request.send(null);

    var csvData = request.responseText; // 読み込んだCSVデータ

    var lines = csvData.split("\r\n");  // CSVの全行を取得

    for (var i = 0; i < lines.length; i++) {
        // 1行ごとの処理
        var wordSet = lines[i].split(",");
        var wordData = [wordSet[0], wordSet[1], wordSet[2], wordSet[3], wordSet[4]];

        monthData.push(wordData);
    }
    return monthData;
}

function ClearMonth() {
    let tbody = document.querySelector('#csv_data_table tbody');
    tbody.innerHTML = "";
}

function ClearDay() {
    let tbody = document.querySelector('#daySearch_table tbody');
    tbody.innerHTML = "";
}
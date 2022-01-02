

// let myDoughnutChart = document.getElementById("myChart").getContext('2d');

// let chart1 = new Chart(myDoughnutChart, {
//     type: 'doughnut',
//     data: {
//         labels: ['VĂN BẢN ĐÃ PHÊ DUYỆT', 'VĂN BẢN CHƯA PHÊ DUYỆT','VĂN BẢN CHỜ PHÂN LOẠI'],
//         datasets: [ {
//             data: [69, 31,45],
//             backgroundColor: ['#49A9EA', '#36CAAB','#B370CF']
//         }]
//     },
//     // options: {
//     //     title: {
//     //         text: "VĂN BẢN ĐẾN",
//     //         display: true
//     //     }
//     // }
// });

var vbDeChuaDuyet = "<%= lengthVBDChuaDuyet  %>";
var vbDenDaDuyet = "<%= lengthVBDaDuyet  %>";
console.log(vbDeChuaDuyet);
console.log(vbDenDaDuyet);
let myDoughnutChart = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myDoughnutChart, {
    type: 'doughnut',
    data: {
        labels: ['VĂN BẢN ĐÃ PHÊ DUYỆT', 'VĂN BẢN CHƯA PHÊ DUYỆT'],
        datasets: [ {
            data: [vbDenDaDuyet, vbDeChuaDuyet],
            backgroundColor: ['#49A9EA', '#36CAAB']
        }]
    },
    // options: {
    //     title: {
    //         text: "VĂN BẢN ĐẾN",
    //         display: true
    //     }
    // }
});
let myDoughnutChart2 = document.getElementById("myChartf").getContext('2d');

var vbdChuPheDuyet=100;
var vbddaPheDuyet=50;
let chart12 = new Chart(myDoughnutChart2, {
    type: 'doughnut',
    data: {
        labels: ['VĂN BẢN ĐÃ PHÊ DUYỆT', 'VĂN BẢN CHƯA PHÊ DUYỆT'],
        datasets: [ {
            data: [vbddaPheDuyet, vbdChuPheDuyet],
            backgroundColor: ['#49A9EA', '#36CAAB']
        }]
    },
});








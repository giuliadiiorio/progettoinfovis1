var margin = { top: 20, right: 20, bottom: 20, left: 20 }; // margini

var width = 700 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;
const dimensione_svg = 100; //per non far uscire le farfalle dallo schermo
const scala = 600;
const alfabeto = ['c', 'i', 'a', 'o', 'x'];
var dati;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)


var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

function updateScaleDomain(data) {
    xScale.domain([0, scala]);
    yScale.domain([scala, 0]);
}

function generaRandom() {

    var randoms = [];
    for (let i = 0; i < 10; i++) {
        randoms.push({
            "x": Math.random() * (scala - dimensione_svg),
            "y": Math.random() * (scala - dimensione_svg)
        });
    }

    return randoms;
}

function disegnaFarfalle(data, lettera) {

    var values;

    if (lettera === 'x')
        values = generaRandom();
    else {
        if (lettera === 'c')
            values = data[0]["points"];
        if (lettera === 'i')
            values = data[1]["points"];
        if (lettera === 'a')
            values = data[2]["points"];
        if (lettera === 'o')
            values = data[3]["points"];

    }


    var farfalle = svg.selectAll(".farfalle").data(values);


    farfalle.exit().remove();

    farfalle.enter().append("svg:image")
        .attr("class", "farfalle")
        .attr("xlink:href", "img/f1.svg")
        .attr("width", 100)
        .attr("height", 100)
        .attr('x', function (d) { return xScale(d.x); })
        .attr('y', function (d) { return yScale(d.y); })


    farfalle.transition().duration(2000)
        .attr('x', function (d) { return xScale(d.x); })
        .attr('y', function (d) { return yScale(d.y); })
}



d3.json("data/dataset.json")
    .then(function (data) {
        updateScaleDomain(data);
        disegnaFarfalle(data, 'x');
        document.addEventListener('keypress', (event) => {
            var name = event.key;
            if (alfabeto.includes(name)) {
                disegnaFarfalle(data, name);
            }
            else {
                alert(`Il tasto premuto ${name} non ha una configurazione\r\n`);
            }
        }, false);
    })
    .catch(function (error) {
        console.log(error);
    });

document.addEventListener("DOMContentLoaded", function() {
    // function body
    var temperatureData = [{
        domain: {
            x: [0, 1],
            y: [0, 1]
        },
        value: 0,
        title: {
            text: "Temperature"
        },
        type: "indicator",
        mode: "gauge+number+delta",
        delta: {
            reference: 30
        },
        gauge: {
            axis: {
                range: [0, 50]
            },
            steps: [{
                    range: [0, 25],
                    color: "lightgray"
                },
                {
                    range: [25, 40],
                    color: "gray"
                }
            ],
            threshold: {
                line: {
                    color: "red",
                    width: 4
                },
                thickness: 0.75,
                value: 40
            }
        }
    }];

    var humidityData = [{
        domain: {
            x: [0, 1],
            y: [0, 1]
        },
        value: 0,
        title: {
            text: "Humidity"
        },
        type: "indicator",
        mode: "gauge+number+delta",
        delta: {
            reference: 50
        },
        gauge: {
            axis: {
                range: [0, 100]
            },
            steps: [{
                    range: [0, 50],
                    color: "lightgray"
                },
                {
                    range: [50, 75],
                    color: "gray"
                }
            ],
            threshold: {
                line: {
                    color: "red",
                    width: 4
                },
                thickness: 0.75,
                value: 90
            }
        }
    }];

    var layout = {
        width: 600,
        height: 450,
        margin: {
            t: 0,
            b: 0
        }
    };
    Plotly.newPlot('temperatureDiv', temperatureData, layout);

    var layout = {
        width: 600,
        height: 450,
        margin: {
            t: 0,
            b: 0
        }
    };
    Plotly.newPlot('humidityDiv', humidityData, layout);

});

function updatePlot() {
    console.log("Updating chart");
    fetch(`/updateValues`)
        .then((response) => response.json())
        .then(data => {
            var temp_update = {
                value: data[0]
            };

            Plotly.update("temperatureDiv", temp_update);

            var humidity_update = {
                value: data[1]
            };
            Plotly.update("humidityDiv", humidity_update);

        })
}

(function loop() {
    setTimeout(() => {
        updatePlot()
        loop();
    }, 3000);
})();
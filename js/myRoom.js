
let url3 = "https://www.taaaakeeen.com/sensor_values"
fetch(url3)
    .then(function(response) {
        return response.json()
    })
    .then(function(sensorData) {
        console.log(sensorData)
        myRoomData(sensorData)
    })

function myRoomData(sensorData){
    const timestamps = []
    const temperatures = []
    const humiditys = []
    const barometric_pressures = []
    const co2s = []
    sensorData.map((item,idx)=>{
        timestamps.push(item["timestamp"])
        temperatures.push(item["sensor_values"]["temperature"])
        humiditys.push(item["sensor_values"]["humidity"])
        barometric_pressures.push(item["sensor_values"]["barometric_pressure"])
        co2s.push(item["sensor_values"]["co2"])
    })

    const labels = timestamps

    const data = {
        labels: labels,
        datasets: [
            {
                label: '気温',
                backgroundColor: 'rgb(205,92,92)',
                borderColor: 'rgb(205,92,92)',
                data: temperatures
            },
            {
                label: '湿度',
                backgroundColor: 'rgb(70,130,180)',
                borderColor: 'rgb(70,130,180)',
                data: humiditys
            },
            {
                label: '気圧',
                backgroundColor: 'rgb(46,139,87)',
                borderColor: 'rgb(46,139,87)',
                data: barometric_pressures
            },
            {
                label: 'CO2',
                backgroundColor: 'rgb(128,0,128)',
                borderColor: 'rgb(128,0,128)',
                data: co2s
            },
        ]
    };

    const options = {
        //凡例は非表示
        legend: {
            display: false
        },
        scales: {
            //X軸
            xAxes: [{
                //軸ラベル表示
                scaleLabel: {
                    display: true,
                    labelString: '時間'
                },
                //ここで軸を時間を設定する
                type: 'time',
                time: {
                    parser: 'HH:mm',
                    unit: 'hour',
                    stepSize: 1,
                    displayFormats: {
                        'hour': 'HH:mm'
                    }
                },
                //X軸の範囲を指定
                ticks: {
                    min: '09:00',
                    max: '20:00'
                }
            }],
            //Y軸
            yAxes: [{
                //軸ラベル表示
                scaleLabel: {
                    display: true,
                    labelString: '体温'
                },
                //Y軸の範囲を指定
                ticks: {
                    min: 34.0,
                    max: 38.0
                }
            }]
        }
    }

    const config = {
        type: 'line',
        data: data,
        options: options
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

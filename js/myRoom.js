
let url3 = "https://www.taaaakeeen.com/v1/sensors"
fetch(url3)
    .then(function(response) {
        return response.json()
    })
    .then(function(sensorData) {
        // console.log(sensorData)
        myRoomData = createChartData(sensorData)
        parseChartData(myRoomData)
    })

function createChartData(sensorData){
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
    return [
        {
            "timestamps":timestamps
        },
            [
                {"temperatures":temperatures},
                {"humiditys":humiditys},
                {"barometric_pressures":barometric_pressures},
                {"co2s":co2s}
            ]
        ]
}

function parseChartData(myRoomData){
    let timestamps = myRoomData[0]["timestamps"]
    // console.log(timestamps)
    let labels = ["気温","湿度","気圧","CO2"]
    let colors = ['rgb(205,92,92)','rgb(70,130,180)','rgb(46,139,87)','rgb(128,0,128)']
    myRoomData[1].map((item,idx)=>{
        key = Object.keys(item)
        let label = labels[idx]
        // console.log(label)
        let sensorValues = item[key]
        // console.log(sensorValues)
        let targetChart = "chart"+idx
        // console.log(targetChart)
        let color = colors[idx]
        createMyRoomChart(label,color,timestamps,sensorValues,targetChart)
    })
}

function createMyRoomChart(label,color,timestamps,sensorValues,targetChart){

    const data = {
        labels: timestamps,
        datasets: [
            {
                label: label,
                data: sensorValues,
                backgroundColor: color,
                borderColor: color,
            },
            // {
            //     label: '湿度',
            //     backgroundColor: 'rgb(70,130,180)',
            //     data: humiditys,
            //     borderColor: 'rgb(70,130,180)',
                
            // },
            // {
            //     label: '気圧',
            //     data: barometric_pressures,
            //     backgroundColor: 'rgb(46,139,87)',
            //     borderColor: 'rgb(46,139,87)',
            // },
            // {
            //     label: 'CO2',
            //     data: co2s,
            //     backgroundColor: 'rgb(128,0,128)',
            //     borderColor: 'rgb(128,0,128)',
            // },
        ]
    };

    const options = {
        //凡例は非表示
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            //X軸
            x: {
                //軸ラベル表示
                scaleLabel: {
                    display: true,
                    labelString: '時間'
                },
                //ここで軸を時間を設定する
                type: 'time',
                time: {
                    parser: 'YYYY-MM-DD HH:mm:ss',
                    unit: 'hour',
                    stepSize: 1,
                    displayFormats: {
                        'hour': 'HH時'
                    }
                },
                //X軸の範囲を指定
                // ticks: {
                //     min: '09:00',
                //     max: '20:00'
                // }
            },
            //Y軸
            y: {
                //軸ラベル表示
                // scaleLabel: {
                //     display: true,
                //     labelString: '体温'
                // },
                //Y軸の範囲を指定
                // ticks: {
                //     min: 34.0,
                //     max: 38.0
                // }
            }
        }
    }

    const config = {
        type: 'line',
        data: data,
        options: options
    };

    const myChart = new Chart(
        document.getElementById(targetChart),
        config
    );

}


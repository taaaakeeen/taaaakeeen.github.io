const formatDate = (current_datetime,type)=>{
    let formatted_date = ""
    if(type === "yyyy-MM-dd HH:mm:ss"){
        formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + current_datetime.getDate().toString().padStart(2, '0') + " " + current_datetime.getHours().toString().padStart(2, '0') + ":" + current_datetime.getMinutes().toString().padStart(2, '0') + ":" + current_datetime.getSeconds().toString().padStart(2, '0')
    }else if(type === "yyyy-MM-dd"){
        formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + current_datetime.getDate().toString().padStart(2, '0')
    }else if(type === "HH:mm:ss"){
        formatted_date = current_datetime.getHours().toString().padStart(2, '0') + ":" + current_datetime.getMinutes().toString().padStart(2, '0') + ":" + current_datetime.getSeconds().toString().padStart(2, '0')
    }
    return formatted_date;
}

const weatherCodes = {
    "100": [
        "100.svg",
        "500.svg",
        "100",
        "晴",
        "CLEAR"
    ],
    "101": [
        "101.svg",
        "501.svg",
        "100",
        "晴時々曇",
        "PARTLY CLOUDY"
    ],
    "102": [
        "102.svg",
        "502.svg",
        "300",
        "晴一時雨",
        "CLEAR, OCCASIONAL SCATTERED SHOWERS"
    ],
    "103": [
        "102.svg",
        "502.svg",
        "300",
        "晴時々雨",
        "CLEAR, FREQUENT SCATTERED SHOWERS"
    ],
    "104": [
        "104.svg",
        "504.svg",
        "400",
        "晴一時雪",
        "CLEAR, SNOW FLURRIES"
    ],
    "105": [
        "104.svg",
        "504.svg",
        "400",
        "晴時々雪",
        "CLEAR, FREQUENT SNOW FLURRIES"
    ],
    "106": [
        "102.svg",
        "502.svg",
        "300",
        "晴一時雨か雪",
        "CLEAR, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"
    ],
    "107": [
        "102.svg",
        "502.svg",
        "300",
        "晴時々雨か雪",
        "CLEAR, FREQUENT SCATTERED SHOWERS OR SNOW FLURRIES"
    ],
    "108": [
        "102.svg",
        "502.svg",
        "300",
        "晴一時雨か雷雨",
        "CLEAR, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"
    ],
    "110": [
        "110.svg",
        "510.svg",
        "100",
        "晴後時々曇",
        "CLEAR, PARTLY CLOUDY LATER"
    ],
    "111": [
        "110.svg",
        "510.svg",
        "100",
        "晴後曇",
        "CLEAR, CLOUDY LATER"
    ],
    "112": [
        "112.svg",
        "512.svg",
        "300",
        "晴後一時雨",
        "CLEAR, OCCASIONAL SCATTERED SHOWERS LATER"
    ],
    "113": [
        "112.svg",
        "512.svg",
        "300",
        "晴後時々雨",
        "CLEAR, FREQUENT SCATTERED SHOWERS LATER"
    ],
    "114": [
        "112.svg",
        "512.svg",
        "300",
        "晴後雨",
        "CLEAR,RAIN LATER"
    ],
    "115": [
        "115.svg",
        "515.svg",
        "400",
        "晴後一時雪",
        "CLEAR, OCCASIONAL SNOW FLURRIES LATER"
    ],
    "116": [
        "115.svg",
        "515.svg",
        "400",
        "晴後時々雪",
        "CLEAR, FREQUENT SNOW FLURRIES LATER"
    ],
    "117": [
        "115.svg",
        "515.svg",
        "400",
        "晴後雪",
        "CLEAR,SNOW LATER"
    ],
    "118": [
        "112.svg",
        "512.svg",
        "300",
        "晴後雨か雪",
        "CLEAR, RAIN OR SNOW LATER"
    ],
    "119": [
        "112.svg",
        "512.svg",
        "300",
        "晴後雨か雷雨",
        "CLEAR, RAIN AND/OR THUNDER LATER"
    ],
    "120": [
        "102.svg",
        "502.svg",
        "300",
        "晴朝夕一時雨",
        "OCCASIONAL SCATTERED SHOWERS IN THE MORNING AND EVENING, CLEAR DURING THE DAY"
    ],
    "121": [
        "102.svg",
        "502.svg",
        "300",
        "晴朝の内一時雨",
        "OCCASIONAL SCATTERED SHOWERS IN THE MORNING, CLEAR DURING THE DAY"
    ],
    "122": [
        "112.svg",
        "512.svg",
        "300",
        "晴夕方一時雨",
        "CLEAR, OCCASIONAL SCATTERED SHOWERS IN THE EVENING"
    ],
    "123": [
        "100.svg",
        "500.svg",
        "100",
        "晴山沿い雷雨",
        "CLEAR IN THE PLAINS, RAIN AND THUNDER NEAR MOUTAINOUS AREAS"
    ],
    "124": [
        "100.svg",
        "500.svg",
        "100",
        "晴山沿い雪",
        "CLEAR IN THE PLAINS, SNOW NEAR MOUTAINOUS AREAS"
    ],
    "125": [
        "112.svg",
        "512.svg",
        "300",
        "晴午後は雷雨",
        "CLEAR, RAIN AND THUNDER IN THE AFTERNOON"
    ],
    "126": [
        "112.svg",
        "512.svg",
        "300",
        "晴昼頃から雨",
        "CLEAR, RAIN IN THE AFTERNOON"
    ],
    "127": [
        "112.svg",
        "512.svg",
        "300",
        "晴夕方から雨",
        "CLEAR, RAIN IN THE EVENING"
    ],
    "128": [
        "112.svg",
        "512.svg",
        "300",
        "晴夜は雨",
        "CLEAR, RAIN IN THE NIGHT"
    ],
    "130": [
        "100.svg",
        "500.svg",
        "100",
        "朝の内霧後晴",
        "FOG IN THE MORNING, CLEAR LATER"
    ],
    "131": [
        "100.svg",
        "500.svg",
        "100",
        "晴明け方霧",
        "FOG AROUND DAWN, CLEAR LATER"
    ],
    "132": [
        "101.svg",
        "501.svg",
        "100",
        "晴朝夕曇",
        "CLOUDY IN THE MORNING AND EVENING, CLEAR DURING THE DAY"
    ],
    "140": [
        "102.svg",
        "502.svg",
        "300",
        "晴時々雨で雷を伴う",
        "CLEAR, FREQUENT SCATTERED SHOWERS AND THUNDER"
    ],
    "160": [
        "104.svg",
        "504.svg",
        "400",
        "晴一時雪か雨",
        "CLEAR, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"
    ],
    "170": [
        "104.svg",
        "504.svg",
        "400",
        "晴時々雪か雨",
        "CLEAR, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"
    ],
    "181": [
        "115.svg",
        "515.svg",
        "400",
        "晴後雪か雨",
        "CLEAR, SNOW OR RAIN LATER"
    ],
    "200": [
        "200.svg",
        "200.svg",
        "200",
        "曇",
        "CLOUDY"
    ],
    "201": [
        "201.svg",
        "601.svg",
        "200",
        "曇時々晴",
        "MOSTLY CLOUDY"
    ],
    "202": [
        "202.svg",
        "202.svg",
        "300",
        "曇一時雨",
        "CLOUDY, OCCASIONAL SCATTERED SHOWERS"
    ],
    "203": [
        "202.svg",
        "202.svg",
        "300",
        "曇時々雨",
        "CLOUDY, FREQUENT SCATTERED SHOWERS"
    ],
    "204": [
        "204.svg",
        "204.svg",
        "400",
        "曇一時雪",
        "CLOUDY, OCCASIONAL SNOW FLURRIES"
    ],
    "205": [
        "204.svg",
        "204.svg",
        "400",
        "曇時々雪",
        "CLOUDY FREQUENT SNOW FLURRIES"
    ],
    "206": [
        "202.svg",
        "202.svg",
        "300",
        "曇一時雨か雪",
        "CLOUDY, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"
    ],
    "207": [
        "202.svg",
        "202.svg",
        "300",
        "曇時々雨か雪",
        "CLOUDY, FREQUENT SCCATERED SHOWERS OR SNOW FLURRIES"
    ],
    "208": [
        "202.svg",
        "202.svg",
        "300",
        "曇一時雨か雷雨",
        "CLOUDY, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"
    ],
    "209": [
        "200.svg",
        "200.svg",
        "200",
        "霧",
        "FOG"
    ],
    "210": [
        "210.svg",
        "610.svg",
        "200",
        "曇後時々晴",
        "CLOUDY, PARTLY CLOUDY LATER"
    ],
    "211": [
        "210.svg",
        "610.svg",
        "200",
        "曇後晴",
        "CLOUDY, CLEAR LATER"
    ],
    "212": [
        "212.svg",
        "212.svg",
        "300",
        "曇後一時雨",
        "CLOUDY, OCCASIONAL SCATTERED SHOWERS LATER"
    ],
    "213": [
        "212.svg",
        "212.svg",
        "300",
        "曇後時々雨",
        "CLOUDY, FREQUENT SCATTERED SHOWERS LATER"
    ],
    "214": [
        "212.svg",
        "212.svg",
        "300",
        "曇後雨",
        "CLOUDY, RAIN LATER"
    ],
    "215": [
        "215.svg",
        "215.svg",
        "400",
        "曇後一時雪",
        "CLOUDY, SNOW FLURRIES LATER"
    ],
    "216": [
        "215.svg",
        "215.svg",
        "400",
        "曇後時々雪",
        "CLOUDY, FREQUENT SNOW FLURRIES LATER"
    ],
    "217": [
        "215.svg",
        "215.svg",
        "400",
        "曇後雪",
        "CLOUDY, SNOW LATER"
    ],
    "218": [
        "212.svg",
        "212.svg",
        "300",
        "曇後雨か雪",
        "CLOUDY, RAIN OR SNOW LATER"
    ],
    "219": [
        "212.svg",
        "212.svg",
        "300",
        "曇後雨か雷雨",
        "CLOUDY, RAIN AND/OR THUNDER LATER"
    ],
    "220": [
        "202.svg",
        "202.svg",
        "300",
        "曇朝夕一時雨",
        "OCCASIONAL SCCATERED SHOWERS IN THE MORNING AND EVENING, CLOUDY DURING THE DAY"
    ],
    "221": [
        "202.svg",
        "202.svg",
        "300",
        "曇朝の内一時雨",
        "CLOUDY OCCASIONAL SCCATERED SHOWERS IN THE MORNING"
    ],
    "222": [
        "212.svg",
        "212.svg",
        "300",
        "曇夕方一時雨",
        "CLOUDY, OCCASIONAL SCCATERED SHOWERS IN THE EVENING"
    ],
    "223": [
        "201.svg",
        "601.svg",
        "200",
        "曇日中時々晴",
        "CLOUDY IN THE MORNING AND EVENING, PARTLY CLOUDY DURING THE DAY,"
    ],
    "224": [
        "212.svg",
        "212.svg",
        "300",
        "曇昼頃から雨",
        "CLOUDY, RAIN IN THE AFTERNOON"
    ],
    "225": [
        "212.svg",
        "212.svg",
        "300",
        "曇夕方から雨",
        "CLOUDY, RAIN IN THE EVENING"
    ],
    "226": [
        "212.svg",
        "212.svg",
        "300",
        "曇夜は雨",
        "CLOUDY, RAIN IN THE NIGHT"
    ],
    "228": [
        "215.svg",
        "215.svg",
        "400",
        "曇昼頃から雪",
        "CLOUDY, SNOW IN THE AFTERNOON"
    ],
    "229": [
        "215.svg",
        "215.svg",
        "400",
        "曇夕方から雪",
        "CLOUDY, SNOW IN THE EVENING"
    ],
    "230": [
        "215.svg",
        "215.svg",
        "400",
        "曇夜は雪",
        "CLOUDY, SNOW IN THE NIGHT"
    ],
    "231": [
        "200.svg",
        "200.svg",
        "200",
        "曇海上海岸は霧か霧雨",
        "CLOUDY, FOG OR DRIZZLING ON THE SEA AND NEAR SEASHORE"
    ],
    "240": [
        "202.svg",
        "202.svg",
        "300",
        "曇時々雨で雷を伴う",
        "CLOUDY, FREQUENT SCCATERED SHOWERS AND THUNDER"
    ],
    "250": [
        "204.svg",
        "204.svg",
        "400",
        "曇時々雪で雷を伴う",
        "CLOUDY, FREQUENT SNOW AND THUNDER"
    ],
    "260": [
        "204.svg",
        "204.svg",
        "400",
        "曇一時雪か雨",
        "CLOUDY, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"
    ],
    "270": [
        "204.svg",
        "204.svg",
        "400",
        "曇時々雪か雨",
        "CLOUDY, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"
    ],
    "281": [
        "215.svg",
        "215.svg",
        "400",
        "曇後雪か雨",
        "CLOUDY, SNOW OR RAIN LATER"
    ],
    "300": [
        "300.svg",
        "300.svg",
        "300",
        "雨",
        "RAIN"
    ],
    "301": [
        "301.svg",
        "701.svg",
        "300",
        "雨時々晴",
        "RAIN, PARTLY CLOUDY"
    ],
    "302": [
        "302.svg",
        "302.svg",
        "300",
        "雨時々止む",
        "SHOWERS THROUGHOUT THE DAY"
    ],
    "303": [
        "303.svg",
        "303.svg",
        "400",
        "雨時々雪",
        "RAIN,FREQUENT SNOW FLURRIES"
    ],
    "304": [
        "300.svg",
        "300.svg",
        "300",
        "雨か雪",
        "RAINORSNOW"
    ],
    "306": [
        "300.svg",
        "300.svg",
        "300",
        "大雨",
        "HEAVYRAIN"
    ],
    "308": [
        "308.svg",
        "308.svg",
        "300",
        "雨で暴風を伴う",
        "RAINSTORM"
    ],
    "309": [
        "303.svg",
        "303.svg",
        "400",
        "雨一時雪",
        "RAIN,OCCASIONAL SNOW"
    ],
    "311": [
        "311.svg",
        "711.svg",
        "300",
        "雨後晴",
        "RAIN,CLEAR LATER"
    ],
    "313": [
        "313.svg",
        "313.svg",
        "300",
        "雨後曇",
        "RAIN,CLOUDY LATER"
    ],
    "314": [
        "314.svg",
        "314.svg",
        "400",
        "雨後時々雪",
        "RAIN, FREQUENT SNOW FLURRIES LATER"
    ],
    "315": [
        "314.svg",
        "314.svg",
        "400",
        "雨後雪",
        "RAIN,SNOW LATER"
    ],
    "316": [
        "311.svg",
        "711.svg",
        "300",
        "雨か雪後晴",
        "RAIN OR SNOW, CLEAR LATER"
    ],
    "317": [
        "313.svg",
        "313.svg",
        "300",
        "雨か雪後曇",
        "RAIN OR SNOW, CLOUDY LATER"
    ],
    "320": [
        "311.svg",
        "711.svg",
        "300",
        "朝の内雨後晴",
        "RAIN IN THE MORNING, CLEAR LATER"
    ],
    "321": [
        "313.svg",
        "313.svg",
        "300",
        "朝の内雨後曇",
        "RAIN IN THE MORNING, CLOUDY LATER"
    ],
    "322": [
        "303.svg",
        "303.svg",
        "400",
        "雨朝晩一時雪",
        "OCCASIONAL SNOW IN THE MORNING AND EVENING, RAIN DURING THE DAY"
    ],
    "323": [
        "311.svg",
        "711.svg",
        "300",
        "雨昼頃から晴",
        "RAIN, CLEAR IN THE AFTERNOON"
    ],
    "324": [
        "311.svg",
        "711.svg",
        "300",
        "雨夕方から晴",
        "RAIN, CLEAR IN THE EVENING"
    ],
    "325": [
        "311.svg",
        "711.svg",
        "300",
        "雨夜は晴",
        "RAIN, CLEAR IN THE NIGHT"
    ],
    "326": [
        "314.svg",
        "314.svg",
        "400",
        "雨夕方から雪",
        "RAIN, SNOW IN THE EVENING"
    ],
    "327": [
        "314.svg",
        "314.svg",
        "400",
        "雨夜は雪",
        "RAIN,SNOW IN THE NIGHT"
    ],
    "328": [
        "300.svg",
        "300.svg",
        "300",
        "雨一時強く降る",
        "RAIN, EXPECT OCCASIONAL HEAVY RAINFALL"
    ],
    "329": [
        "300.svg",
        "300.svg",
        "300",
        "雨一時みぞれ",
        "RAIN, OCCASIONAL SLEET"
    ],
    "340": [
        "400.svg",
        "400.svg",
        "400",
        "雪か雨",
        "SNOWORRAIN"
    ],
    "350": [
        "300.svg",
        "300.svg",
        "300",
        "雨で雷を伴う",
        "RAIN AND THUNDER"
    ],
    "361": [
        "411.svg",
        "811.svg",
        "400",
        "雪か雨後晴",
        "SNOW OR RAIN, CLEAR LATER"
    ],
    "371": [
        "413.svg",
        "413.svg",
        "400",
        "雪か雨後曇",
        "SNOW OR RAIN, CLOUDY LATER"
    ],
    "400": [
        "400.svg",
        "400.svg",
        "400",
        "雪",
        "SNOW"
    ],
    "401": [
        "401.svg",
        "801.svg",
        "400",
        "雪時々晴",
        "SNOW, FREQUENT CLEAR"
    ],
    "402": [
        "402.svg",
        "402.svg",
        "400",
        "雪時々止む",
        "SNOWTHROUGHOUT THE DAY"
    ],
    "403": [
        "403.svg",
        "403.svg",
        "400",
        "雪時々雨",
        "SNOW,FREQUENT SCCATERED SHOWERS"
    ],
    "405": [
        "400.svg",
        "400.svg",
        "400",
        "大雪",
        "HEAVYSNOW"
    ],
    "406": [
        "406.svg",
        "406.svg",
        "400",
        "風雪強い",
        "SNOWSTORM"
    ],
    "407": [
        "406.svg",
        "406.svg",
        "400",
        "暴風雪",
        "HEAVYSNOWSTORM"
    ],
    "409": [
        "403.svg",
        "403.svg",
        "400",
        "雪一時雨",
        "SNOW, OCCASIONAL SCCATERED SHOWERS"
    ],
    "411": [
        "411.svg",
        "811.svg",
        "400",
        "雪後晴",
        "SNOW,CLEAR LATER"
    ],
    "413": [
        "413.svg",
        "413.svg",
        "400",
        "雪後曇",
        "SNOW,CLOUDY LATER"
    ],
    "414": [
        "414.svg",
        "414.svg",
        "400",
        "雪後雨",
        "SNOW,RAIN LATER"
    ],
    "420": [
        "411.svg",
        "811.svg",
        "400",
        "朝の内雪後晴",
        "SNOW IN THE MORNING, CLEAR LATER"
    ],
    "421": [
        "413.svg",
        "413.svg",
        "400",
        "朝の内雪後曇",
        "SNOW IN THE MORNING, CLOUDY LATER"
    ],
    "422": [
        "414.svg",
        "414.svg",
        "400",
        "雪昼頃から雨",
        "SNOW, RAIN IN THE AFTERNOON"
    ],
    "423": [
        "414.svg",
        "414.svg",
        "400",
        "雪夕方から雨",
        "SNOW, RAIN IN THE EVENING"
    ],
    "425": [
        "400.svg",
        "400.svg",
        "400",
        "雪一時強く降る",
        "SNOW, EXPECT OCCASIONAL HEAVY SNOWFALL"
    ],
    "426": [
        "400.svg",
        "400.svg",
        "400",
        "雪後みぞれ",
        "SNOW, SLEET LATER"
    ],
    "427": [
        "400.svg",
        "400.svg",
        "400",
        "雪一時みぞれ",
        "SNOW, OCCASIONAL SLEET"
    ],
    "450": [
        "400.svg",
        "400.svg",
        "400",
        "雪で雷を伴う",
        "SNOW AND THUNDER"
    ]
}

const getweatherCodes = () => {
    fetch("json/weather_code.json")
        .then(response => {
            return response.json()
        })
        // .then(jsondata => console.log(jsondata))
}

const getWeatherImages = (weatherCode)=>{
    let data = weatherCodes[weatherCode]
    let dayImage = "https://www.jma.go.jp/bosai/forecast/img/" + data[0]
    let nightImage = "https://www.jma.go.jp/bosai/forecast/img/" + data[1]
    return [dayImage,nightImage]
}

let url1 = "https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json"

fetch(url1)
    .then(function(response) {
        return response.json()
    })
    .then(function(weather) {
        // console.log(weather)
        let area = weather[0].timeSeries[0].areas[0]
        document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice
        date = new Date(weather[0].reportDatetime)
        document.getElementById("reportDatetime").lastElementChild.textContent = formatDate(date,"yyyy-MM-dd HH:mm:ss")
        document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
        document.getElementById("today").lastElementChild.textContent = area.weathers[0]
        document.getElementById("targetWind").lastElementChild.textContent = area.winds[0]
        document.getElementById("targetWave").lastElementChild.textContent = area.waves[0]
        document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1]
        document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2]

        // console.log("気象台",weather[0].publishingOffice)
        // console.log("報告日時",weather[0].reportDatetime)
        // console.log("地域",weather[0].timeSeries[0].areas[0].area)
        // console.log("波の高さ",weather[0].timeSeries[0].areas[0].waves)
        // console.log("天気コード",weather[0].timeSeries[0].areas[0].weatherCodes)
        // console.log("天気",weather[0].timeSeries[0].areas[0].weathers)
        // console.log("風",weather[0].timeSeries[0].areas[0].winds)
        // console.log("日付1",weather[0].timeSeries[0].timeDefines)

        // console.log("今日の最高気温",weather[1].tempAverage.areas[0].max)
        // console.log("今日の最低気温",weather[1].tempAverage.areas[0].min)
        document.getElementById("tempMax").lastElementChild.textContent = weather[1].tempAverage.areas[0].max
        document.getElementById("tempMin").lastElementChild.textContent = weather[1].tempAverage.areas[0].min

        // console.log("地域",weather[1].timeSeries[0].areas[0].area)
        // console.log("週間降水確率",weather[1].timeSeries[0].areas[0].pops)
        // console.log("週間天気信頼度",weather[1].timeSeries[0].areas[0].reliabilities)
        // console.log("週間天気コード",weather[1].timeSeries[0].areas[0].weatherCodes)
        // console.log("日付2",weather[1].timeSeries[0].timeDefines)

        // console.log("地域",weather[1].timeSeries[1].areas[0].area)
        // console.log("週間最高気温",weather[1].timeSeries[1].areas[0].tempsMax)
        // console.log("週間最低気温",weather[1].timeSeries[1].areas[0].tempsMin)
        // console.log("日付3",weather[1].timeSeries[1].timeDefines)

        let daysData = []
        let dates = weather[0].timeSeries[0].timeDefines
        dates.map((item,idx)=>{
            let oneDay = new Date(weather[0].timeSeries[0].timeDefines[idx])
            let oneDayData = {
                "date":formatDate(oneDay,"yyyy-MM-dd"),
                "dayWeatherImage":getWeatherImages(weather[0].timeSeries[0].areas[0].weatherCodes[idx])[0],
                "nightWeatherImage":getWeatherImages(weather[0].timeSeries[0].areas[0].weatherCodes[idx])[1],
                "weather":weather[0].timeSeries[0].areas[0].weathers[idx],
                "wave":weather[0].timeSeries[0].areas[0].waves[idx],
                "wind":weather[0].timeSeries[0].areas[0].winds[idx]
            }
            daysData.push(oneDayData)
        })
        // console.log(daysData)

        let daysTable = document.getElementById("daysTable")
        daysData.map((item,idx)=>{
            let row = daysTable.insertRow(-1)
            Object.keys(item).map((key)=>{
                // console.log(item[key])
                let cell = row.insertCell(-1)
                let val = item[key]
                if (key.includes("Image")){
                    cell.innerHTML = "<img src = '" + val + "'>"
                }else{
                    cell.textContent = val
                }
            })
        })

        // let table = document.getElementById("table")
        // for (let i = 0; i < 7; i++) {
        //     let row = table.insertRow(-1)
        //     for (let j = 0; j < 6; j++) {
        //         let cell = row.insertCell(-1)
        //         cell.textContent = "["+i+","+j+"]"
        //     }
        // }
        
        let weeklyData = []
        for (let i = 0; i < 7; i++) {
            let oneDayData = {
                "date":weather[1].timeSeries[0].timeDefines[i],
                "dayWeather":weather[1].timeSeries[0].areas[0].weatherCodes[i],
                "nightWeather":weather[1].timeSeries[0].areas[0].weatherCodes[i],
                "highestTemperature":weather[1].timeSeries[1].areas[0].tempsMax[i],
                "lowestTemperature":weather[1].timeSeries[1].areas[0].tempsMin[i],
                "rainyPercent":weather[1].timeSeries[0].areas[0].pops[i],
                "degreeOfReliability":weather[1].timeSeries[0].areas[0].reliabilities[i]
            }
            weeklyData.push(oneDayData)
        }
        // console.log(weeklyData)

        let table = document.getElementById("weeklyTable")
        weeklyData.map((item,idx)=>{
            let row = table.insertRow(-1)
            Object.keys(item).map((key)=>{
                let cell = row.insertCell(-1)
                if (key === "date") {
                    let oneDay = new Date(item[key])
                    cell.textContent = formatDate(oneDay,"yyyy-MM-dd")
                }else if (key === "dayWeather") {
                    img = getWeatherImages(item[key])[0]
                    cell.innerHTML = "<img src = '" + img + "'>"
                }else if (key === "nightWeather") {
                    img = getWeatherImages(item[key])[1]
                    cell.innerHTML = "<img src = '" + img + "'>"
                }else{
                    if (item[key] === "") {
                        cell.textContent = "-"
                    }else{
                        cell.textContent = item[key]
                    }
                }
            })
        })

    })

let url2 = "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/230000.json"
fetch(url2)
    .then(function(response) {
        return response.json()
    })
    .then(function(weather) {
        // console.log("overview_forecast",weather)
        text = weather.text.replace(/\r?\n?\n\n/g, '<br>')
        text = text.replace(/\s+/g, '')
        // console.log(text)
        document.getElementById("text").lastElementChild.innerHTML = text
    })






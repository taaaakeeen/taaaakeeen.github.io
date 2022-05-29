const formatDate = (current_datetime)=>{
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + current_datetime.getDate().toString().padStart(2, '0') + " " + current_datetime.getHours().toString().padStart(2, '0') + ":" + current_datetime.getMinutes().toString().padStart(2, '0') + ":" + current_datetime.getSeconds().toString().padStart(2, '0')
    return formatted_date;
}

const getWeatherImage = (weatherCodes)=>{
    console.log("")
    // let  url = "https://www.jma.go.jp/bosai/forecast/img/" + 
}

 
function readJSON(){
 
    var f = "json/weather_code.json";
    var retJson;
   
    var obj = new XMLHttpRequest();
   
    obj.open( 'get', f, false ); //ファイルオープン : 同期モード
    obj.onload = function() {
      try {
        retJson = JSON.parse(this.responseText); //JSON型でパース。
      } catch (e) {
        alert("コマンド定義ファイルの読み込み、解析に失敗しました。");
      }
    }
    obj.send(null); //ここで読込実行。
    return retJson;
  }

let url1 = "https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json"

fetch(url1)
    .then(function(response) {
        return response.json()
    })
    .then(function(weather) {
        console.log(weather)
        //3days
        let area = weather[0].timeSeries[0].areas[0]
        document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice
        date = new Date(weather[0].reportDatetime)
        document.getElementById("reportDatetime").lastElementChild.textContent = formatDate(date)
        document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
        document.getElementById("today").lastElementChild.textContent = area.weathers[0]
        document.getElementById("targetWind").lastElementChild.textContent = area.winds[0]
        document.getElementById("targetWave").lastElementChild.textContent = area.waves[0]
        document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1]
        document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2]

        console.log("気象台",weather[0].publishingOffice)
        console.log("報告日時",weather[0].reportDatetime)
        console.log("地域",weather[0].timeSeries[0].areas[0].area)
        console.log("波の高さ",weather[0].timeSeries[0].areas[0].waves)
        console.log("天気コード",weather[0].timeSeries[0].areas[0].weatherCodes)
        console.log("天気",weather[0].timeSeries[0].areas[0].weathers)
        console.log("風",weather[0].timeSeries[0].areas[0].winds)
        console.log("日付",weather[0].timeSeries[0].timeDefines)

        console.log("今日の最高気温",weather[1].tempAverage.areas[0].max)
        console.log("今日の最低気温",weather[1].tempAverage.areas[0].min)

        console.log("地域",weather[1].timeSeries[0].areas[0].area)
        console.log("降水確率",weather[1].timeSeries[0].areas[0].pops)
        console.log("信頼度",weather[1].timeSeries[0].areas[0].reliabilities)
        console.log("天気コード",weather[1].timeSeries[0].areas[0].weatherCodes)
        console.log("日付",weather[1].timeSeries[0].timeDefines)

        console.log("地域",weather[1].timeSeries[1].areas[0].area)
        console.log("週間最高気温",weather[1].timeSeries[1].areas[0].tempsMax)
        console.log("週間最低気温",weather[1].timeSeries[1].areas[0].tempsMin)
        console.log("日付",weather[1].timeSeries[1].timeDefines)

        // getWeatherImage("100")
        console.log(readJSON())

    });

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

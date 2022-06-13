let weatherMapImagesURL = "https://www.jma.go.jp/bosai/weather_map/data/list.json"
fetch(weatherMapImagesURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(image) {
        console.log(image["near"]["now"])
        let images = image["near"]["now"]
        let png = images[images.length - 1]
        let url = "https://www.jma.go.jp/bosai/weather_map/data/png/" + png
        let elem = document.getElementById("weatherMap")
        elem.src = url
    })
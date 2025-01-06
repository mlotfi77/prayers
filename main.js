let cities = [
    { arabicName: "القاهرة", name: "cairo" },
    { arabicName: "الاسكندرية", name: "Alexandria" },
    { arabicName: "الشرقية", name: "sh" },
    { arabicName: "الجيزة", name: "Giza" },
    { arabicName: "الاقصر", name: "LUXOR" },
    { arabicName: "اسوان", name: "Aswan" },


]

for (city of cities) {
    document.getElementById("cities").innerHTML +=
        `
     <option  >${city.arabicName}</option>
    `
}


document.getElementById("cities").addEventListener("change", function () {

    let nameCity = ""

    for (city of cities) {
        if (city.arabicName == this.value) {
            nameCity = city.name
            document.getElementById("city").innerHTML = city.arabicName
        }
    }

    getMainTime(nameCity)
})


console.log(cities);

function getMainTime(nameCity) {

    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${nameCity}&country=EG&method=5`)
        .then(function (response) {
            // handle success
            console.log(response.data.data);
            console.log(response.data.data.timings);

            const timings = response.data.data.timings

            getTimeForPrayer("fajr-time", timings.Fajr)
            getTimeForPrayer("sunrise", timings.Sunrise)
            getTimeForPrayer("dhuhr", timings.Dhuhr)
            getTimeForPrayer("asr", timings.Asr)
            getTimeForPrayer("maghrib", timings.Maghrib)
            getTimeForPrayer("isha", timings.Isha)


            const day = response.data.data.date.hijri.weekday.ar
            document.getElementById("date").innerHTML = day + response.data.data.date.gregorian.date


        })
        .catch(function (error) {
            // handle error
            console.log("error");



        })
}

getMainTime("cairo")

function getTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time
}

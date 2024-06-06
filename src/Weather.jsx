import React, { useState } from 'react'
import './Weather.css'
const api = {
    key: "5ebb1e47da4ec0599a1578735596fc16",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({});


    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const search = (e) => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${input}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setInput('')
                    console.log(result);
                })
        }
    }

    const dateBuilder = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.main!="undefined") ? ((weather.main.temp>16) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className='container'>

                <div className='search-box'>
                    <input type="text" className='search-input' value={input} placeholder='Search...' onChange={handleInput} onKeyPress={search} />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name},{weather.sys.country}.
                            </div>
                            <div className='date'>
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className='weather-box'>
                            <div className='temp'>
                                {Math.round(weather.main.temp)}&deg;c
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (' ')}
            </div>
            </main>
        </div>
    )
}

export default Weather

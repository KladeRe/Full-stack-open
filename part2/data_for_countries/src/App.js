import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountries = (props) => {
    


    const validCountries = props.allCountries.filter(country => country.name.common.toUpperCase().includes(props.searchWord.toUpperCase()))

    

    if (validCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>

    } else if (validCountries.length === 1) {

        return (
            <div>
                <ShowOneCountry country={validCountries[0]}/>

            </div>
            
            
        )
    } else {
        return validCountries.map(country =>
            <div>
                <br></br>
                <form>
                    <div>
                        {country.name.common} <button type="submit" onClick={props.filterFunction} value={country.name.common}>Show</button>
                    </div>
                </form>

            </div>
        )
    }

}

const ShowOneCountry = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    
    const [result, setResult] = useState({})
    useEffect(() => {
        axios.get("http://api.openweathermap.org/data/2.5/weather?appid=" + api_key + "&q=" + props.country.capital).then(response => {
            setResult(response.data)
        })

    })

    let img_url = "https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"
    return (
        <div>
            <h1>{props.country.name.common}</h1>
            <p>capital {props.country.capital}</p>
            <p>area {props.country.area}</p>
            <p><b>languages:</b></p>
            <ul>
                {Object.values(props.country.languages).map(lang => <li>{lang}</li>)}

            </ul>
            <h1 style={{ margin: 0 + 'rem', fontSize: '200px', }}>{props.country.flag}</h1>
            <h1>Weather in {props.country.capital}</h1>
            <p>temperature {(parseFloat(result.main.temp) - 273.15).toFixed(2)} Celsius</p>
            <img src={img_url} alt="picture"></img>
            <p>wind {result.wind.speed} m/s</p>

        </div>
    )

}

const App = () => {

    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')

    const handleFilterName = (event) => {
        setFilterName(event.target.value)
    }

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then(response => {
            setCountries(response.data)
        })
    })

    return (
        <div>
            <form>
                <div>
                    find countries<input value={filterName} onChange={handleFilterName}></input>
                </div>

            </form>

            <ShowCountries allCountries={countries} searchWord={filterName} filterFunction={handleFilterName} />

        </div>
    )
}

export default App
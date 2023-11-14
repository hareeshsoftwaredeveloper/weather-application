import React from 'react'
import "./App.css"

// const api="https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb"

const App = () => {

  const [city, setCity] = React.useState("")
  const [temp, setTemp] = React.useState("")
  const [bg, setBg]=React.useState(0)

  const handleTemperature = (e) => {
    setCity(e.target.value)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
    const data = await response.json()
    if (response.ok) {
      const updatedTemp = data.main.temp - 273.15
      setBg(updatedTemp)
      const degreeSymbol = "\u00B0"
      setTemp(`Temperature at ${city}\n${Math.round(updatedTemp)}${degreeSymbol}C`)
    } 
    else {
      setTemp("Data Not found")
    }
  
  }

  return (
    <div className={bg > 30 ? "very-hot bg-img" : bg > 20 ? "hot bg-img" : bg >= 0 ? "cool bg-img" : "bg-img"}>
      <center>
        <h4>Weather App</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" value={city} required onChange={handleTemperature} /><br/><br/>
           <input type="submit" value="Get Temperature"/>
        </form>
        <h1>{temp}</h1>
       </center>

    </div>
  )
}

export default App

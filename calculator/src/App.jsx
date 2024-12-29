
import './App.css'
import { useState } from 'react'
import imagenes from './assets/imagenes';
function App() {
  const [formValues, setFormValues] = useState({dia:"", month:"", year:""})
  const [error, setError] = useState({dia:false, month:false, year:false})
  const [inputBorder, setInputBorder] = useState('');
  const [age, setAge] = useState({years:'--', months:'--', days:'--'});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors={
      dia: !formValues.dia || formValues.dia < 1 || formValues.dia > 31,
      month: !formValues.month || formValues.month < 1 || formValues.month > 12,
      year: !formValues.year || formValues.year < 1900 || formValues.year > 2024
    }
    setError(newErrors);
    return Object.values(newErrors).some((error) => error);
  };


  const handleButtonClick = () => {
    if (validateForm()) {;
      setInputBorder('2px solid hsl(0, 100%, 67%)');
    } else {
      const { dia, month, year } = formValues;
      const birthDate = new Date(year, month - 1, dia);
      const today = new Date();
      
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setAge({ years, months, days });
      setInputBorder('');
    }
  };

  return (
    <>
      <div className="form">
        <form action="" className='form__inputs'>
          <div className="form__group">
            <p className='form__dates'>DAY</p>
            <input type="number" name='dia' placeholder='DD' min={1} max={31} value={formValues.dia} onChange={handleInputChange} style={{border: error.dia ? inputBorder : ''}}  />
            <p className='form__required' style={{display: error.dia ? 'block' : 'none'}}>This field is required</p>
          </div>
          <div className="form__group">
            <p className='form__dates'>MONTH</p>
            <input type="number" name='month' placeholder='MM' min={1} max={12} value={formValues.month} onChange={handleInputChange} style={{border: error.month ? inputBorder : ''}} />
            <p className='form__required' style={{display: error.month ? 'block' : 'none'}}>This field is required</p>
          </div>
          <div className="form__group">
            <p className='form__dates'>YEAR</p>
            <input type="number" name='year' placeholder='YYYY' min={1900} max={2024} value={formValues.year} onChange={handleInputChange} style={{border: error.year ? inputBorder : ''}} />
            <p className='form__required' style={{display: error.year ? 'block' : 'none'}}>This field is required</p>
          </div>
        </form>
        <button className='form__button' onClick={handleButtonClick}>
        <img src={imagenes.arrow} alt="" />
        </button>
        <hr />
        <div className="form__result">
        <p><span>{age.years}</span>YEARS</p>
        <p><span>{age.months}</span>MONTHS</p>
        <p><span>{age.days}</span>DAYS</p>
        </div>
      </div>
    </>
  )
}

export default App

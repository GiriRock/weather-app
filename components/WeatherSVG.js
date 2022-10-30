function WeatherSVG(props) {
    let img
    if (props.id < 300) {
        img = '/images/lightning.svg';
      } else if (props.id < 400) {
        img = '/images/drizzle.svg';
      } else if (props.id < 600) {
        if (props.dt > props.sunrise && props.dt < props.sunset) {
          img = '/images/raining_sun.svg';
        } else {
          img = '/images/raining_moon.svg';
        }
      } else if (props.id < 700) {
        img = '/images/snow.svg';
      } else if (props.id === 800) {
        if (props.dt > props.sunrise && props.dt < props.sunset) {
          img = '/images/sun.svg';
        } else {
          img = '/images/moon.svg';
        }
      } else if (props.id < 900) {
        if (props.dt > props.sunrise && props.dt < props.sunset) {
          img = '/images/cloudy_sun.svg';
        } else {
          img = '/images/cloudy_moon.svg';
        }
      }    

    return (
        <div>
            <img src={img} alt="xd"/>
        </div>
    );
}

export default WeatherSVG;
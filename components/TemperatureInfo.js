function TemperatureInfo(props) {
  return props.data.lowestTemp !== undefined ? (
    
    <div className="mainInfoTR">
        <p className="infoTemperature">{Math.round(props.data.temp - 273.15) + "°"}</p>
        <p className="infoMinMax">
          {Math.round(props.data.lowestTemp)}°/
          {Math.round(props.data.highestTemp)}°
        </p>
      </div>
  ) : (
    <div></div>
  );
}

export default TemperatureInfo;

function calculateWindChill(tempC, windKmh) {
  if (tempC <= 10 && windKmh > 4.8) {
    const chill = 13.12
      + 0.6215 * tempC
      - 11.37 * Math.pow(windKmh, 0.16)
      + 0.3965 * tempC * Math.pow(windKmh, 0.16);
    return chill.toFixed(1) + " °C";
  } else {
    return "N/A";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const temp = 10;
  const wind = 5;
  const windchillSpan = document.getElementById("windchill");
  if (windchillSpan) {
    windchillSpan.textContent = calculateWindChill(temp, wind);
  }
});


const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
  }
};

const fetchIpInfo = ip =>{
  return fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${ip}`)
  .then(res=> res.json())
  .catch(err => console.error(err))
}


import weather from './weather.json'

export default (req, res) => {
  res.status(200).json(weather)
}

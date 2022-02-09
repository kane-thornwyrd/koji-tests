export default (req, res) => {
  res.status(200).json(require("./geo.json"))
}
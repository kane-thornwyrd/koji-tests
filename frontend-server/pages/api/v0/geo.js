import geo from './geo.json'

export default (req, res) => {
  res.status(200).json(geo)
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

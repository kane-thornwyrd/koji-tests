import _, { sortBy, filter } from "lodash";

import france from "../france.json";

function parseString<Type>(v: Type): string { return v + ''; }

// Filtering by "coordonnees_gps" to avoid having to request google geocoding API…
const communes_by_name = filter(sortBy(france, "Nom_commune"), "coordonnees_gps")
const communes_by_postal_code = filter(sortBy(france, "Code_postal"), "coordonnees_gps")

const uniqCommune = commune => commune["Nom_commune"] + '' + commune["Code_postal"] + '' + commune["Code_commune_INSEE"]

const methods = {
  byName: (value: string) =>
    communes_by_name
      .filter(v => [
        ...v["Nom_commune"].matchAll(RegExp(value, 'ig'))
      ].length > 0)
  ,
  byPostalCode: (value: string) =>
    communes_by_postal_code
      .filter(v => parseString(v["Code_postal"])
        .padStart(5, '0')
        .startsWith(value))
  ,
}

export default (req, res) => {
  const { args: [method, value] } = req.query
  if (!value) return res.status(200).json([]);

  if (!methods[method]) return res.status(400).json(Object.keys(methods))

  res.status(200).json(methods[method](value).map(entry => {
    return {
      ...entry,
      departement: parseString(entry["Code_postal"]).padStart(5, '0').substring(0, 2),
    }
  }))
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
}

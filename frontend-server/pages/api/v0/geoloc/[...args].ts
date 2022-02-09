import _, { sortBy } from "lodash";

import france from "../france.json";

function parseString<Type>(v: Type): string { return v + ''; }

const communes_by_name = sortBy(france, "Nom_commune")

const communes_by_postal_code = sortBy(france, "Code_postal")

const uniqCommune = commune => commune["Nom_commune"] + '' + commune["Code_postal"] + '' + commune["Code_commune_INSEE"]

const methods = {
  byName: (value: string) =>
    communes_by_name
      .filter(v => [...v["Nom_commune"]
        .matchAll(RegExp(value, 'ig'))].length > 0)
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

  setTimeout(() => {
    res.status(200).json(methods[method](value).map(entry => { return {
      ...entry,
      departement: parseString(entry["Code_postal"]).padStart(5, '0').substring(0,2),
    }}))
  }, 1000)
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
}

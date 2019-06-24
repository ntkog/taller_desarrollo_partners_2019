# Instructions

# Requirements

- [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)
- [jq](https://stedolan.github.io/jq/)

## Install Requirements

```bash
npm i -g fast-xml-parser
```

## Scaffolding

```bash
koop new app camaras
cd camaras
mkdir csvs
koop add provider ntkog/koop-provider-csv
```

## Get Data

```bash
curl -sS "http://www.mc30.es/components/com_hotspots/datos/camaras.xml" | xml2js -o camaras.json
cat camaras.json |  jq -r '.Camaras.Camara[] | [.Posicion.Longitud,.Posicion.Latitud,.Nombre,"http://" + (.URL)] |@csv' > data.csv
awk '{printf "\%s\,%s\n", NR==1 ? "id" : NR-1, $0}' data.csv > m30.csv
```

## copy your csv into **csvs** folder

```bash
cp m30.csv csvs
```

## Edit **config/default.json** properly

## run koopjs

```bash
npm run start
```

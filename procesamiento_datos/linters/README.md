# Linters

## JSON
- [jsonlint](https://github.com/zaach/jsonlint)

```bash
jsonlint myfile.json
```

```bash
cat myfile.json | jsonlint
```

- [geojsonhint](https://github.com/mapbox/geojsonhint)

```bash
geojsonhint test.geojson
```


## CSV
- [csvlint](https://github.com/Clever/csvlint)

```bash
$ csvlint bad_quote.csv
Record #1 has error: bare " in non-quoted-field

unable to parse any further

$ csvlint --lazyquotes bad_quote.csv
file is valid

$ csvlint mult_long_columns.csv
Record #2 has error: wrong number of fields in line
Record #4 has error: wrong number of fields in line

$ csvlint --delimiter='\t' mult_long_columns_tabs.csv
Record #2 has error: wrong number of fields in line
Record #4 has error: wrong number of fields in line

$ csvlint one_long_column.csv
Record #2 has error: wrong number of fields in line

$ csvlint perfect.csv
file is valid
```

> Read about [BOM](https://es.wikipedia.org/wiki/Marca_de_orden_de_bytes#Problemas_con_el_uso_de_la_marca_de_orden_de_bytes)


> Un [ejemplo](https://datosabiertos.malaga.eu/dataset/incidencias-resueltas-en-la-va-pblica-para-el-ao-2019) de datos publicados sin haber verificado si está bien el formato

## XML

- [xmllint](http://www.xmlsoft.org/xmllint.html)

```bash
xmllint --help
```

## Encoding

- **file command** : Guessing file Encoding

```bash
file -I fichero
```

- **iconv command** : Convert file Encoding

```bash
iconv -c -f ISO-8859-1 -t UTF-8
```

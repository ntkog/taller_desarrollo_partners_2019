# Prerequisitos

- NodeJS
- [Now.sh](https://zeit.co/now) - Cuenta gratuíta con github - 3 despliegues gratis


## Desplegamos el **ERP** fake

```bash
cd erp_fake_server
now
```

> Apúntate la url donde se ha desplegado el servicio

## Desplegamos Koop

> Antes de desplegar, modifica en el fichero **model.js** , el valor de **NOW_ERP_FAKE_URL**

```bash
cd koop-erp
now
```

> Apúntate la url donde se ha desplegado el servicio

## Probar desde AGOL

Ir a **Contenido** y seleccionar **desde la web**

Seleccionar **ArcGIS Server**

Introducir la URL del servicio desplegado

> Ejemplo :

[https://koop-erp-sample-poefrrrcyt.now.sh/erp/FeatureServer/0](https://koop-erp-sample-poefrrrcyt.now.sh/erp/FeatureServer/0)

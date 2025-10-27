#!/bin/bash
set -e

# Este script se conecta a la base de datos principal ($POSTGRES_DB, que es 'taskdb')
# usando el usuario y contraseña definidos para el contenedor de postgres.
# Luego, ejecuta un comando SQL inteligente:
# - SELECT 'CREATE DATABASE keycloakdb': Prepara el comando para crear la base de datos.
# - WHERE NOT EXISTS (...): Solo ejecuta el comando anterior si una base de datos llamada 'keycloakdb' NO existe ya.
# - \gexec: Ejecuta el comando SQL que fue preparado por el SELECT.
# Esto asegura que la base de datos 'keycloakdb' se cree solo la primera vez que el contenedor arranca.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE keycloakdb'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloakdb')\gexec
EOSQL
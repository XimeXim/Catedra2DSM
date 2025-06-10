module.exports =
{
  "development": {
    "database": "bd",
    "dialect": "sqlite",
    "storage": "./bd.sqlite"
  },
  "test": {
    "database": "bd_test",
    "dialect": "sqlite"
  },
  "production": {
    "database": "bd_production",
    "dialect": "sqlite"
  }
}

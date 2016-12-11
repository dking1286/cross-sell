# cross-sell
A module that suggests cross-sell items for online shopping carts

## Contents
The core `crossSell` function can be found in the `src` directory, along
with the `mongoose_interface`, which abstracts away the details of the
`mongoose` interface for interacting with MongoDB, thereby enabling
the `crossSell` function to be used with other databases in the future,
if desired.

The `sample_environment` folder contains scaffolding
to setup and seed a MongoDB database with sample data for development
and testing.

## Database Setup

To set up the database, create a file called `database_urls.json`
that specifies the URLs to connect to your development and test databases,
and place it into the `sample_environment` folder. For example:
```json
// sample_environment/database_urls.json
{
  "development": "mongodb://localhost/cross_sell",
  "test": "mongodb://localhost/cross_sell_test"
}
```

Then, to seed the database for development:
```bash
npm run seed
```
Caution: This will delete any data that is currently in the database.

## Testing
To run the test script:
```bash
npm test
```

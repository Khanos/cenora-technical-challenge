# Cenora Technical Challenge

Section 1.0
Scraping
Consists of extracting (via scraping) all data of Cruise Ships from Carnival's website
(https://www.carnival.com/cruise-ships.aspx).

- Script should be written in Javascript and must run using NodeJS.
- Libraries such as Cheerio and Puppeteer or any other preferred option can be used.
- Performance of the script will be taken into consideration.
- Data extracted must be store in a JSON file.

Techs:

- NodeJS https://nodejs.org/en/
- Cheerio https://cheerio.js.org/
- Puppeteer https://pptr.dev/

## Run Locally

Clone the project (Dahh)

```bash
  git clone git@github.com:Khanos/cenora-technical-challenge.git
```

Go to the project directory

```bash
  cd cenora-technical-challenge
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run serve
```

## API Reference

#### Get all items

```http
  GET /api/v1/getAllCruises
```

```curl
curl --location --request GET 'http://localhost:3000/api/v1/getAllCruises'
```

Any other url will return a page with the list of endpoint (For Documentation)

```http
  GET /*
```

#### getAllCruises

Returns a list of objects with info related to Carnival Cruises.

## Authors

- [@Khanos](https://www.github.com/khanos)

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
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Demo

Insert gif or link to demo

## Authors

- [@Khanos](https://www.github.com/khanos)

import CruiseShipsModel from '../models/cruiseships';
import { Request, Response } from 'express';
import { Cruise } from '../interfaces/Cruise';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

class CruiseController {
  public async getAllCruises(req: Request, res: Response) {
    try {
      const prefixUrl: string = 'https://www.carnival.com';
      const browser = await puppeteer.launch({
        headless: true,
        userDataDir: './cache',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--disable-gpu', '--window-size=1920,1080']
      });
      const page = await browser.newPage();
      await page.goto('https://www.carnival.com/cruise-ships.aspx');
      page.on('error', e => {
        throw new Error(JSON.stringify(e))
      });
      // get the body of the page
      const bodyHTML = await page.evaluate(() => document.body.innerHTML);
      // load cheerio
      const $ = cheerio.load(bodyHTML, null, false);
      // get the list of cruises
      const cruises = new Array;
      $('.activity-results > .container > .activity-result.ship-result').each((i, el) => {
        const cruiseShip = {} as Cruise;
        const cruiseResultInfo = $(el).find('.text')[1];
        cruiseShip.thumbnail = prefixUrl + $(el).find('.image > img').attr('src');
        cruiseShip.name = $(cruiseResultInfo).children('h2.title').text();
        cruiseShip.cruiseUrl = prefixUrl + $(cruiseResultInfo).children('h2.title').children('a').attr('href');
        $(cruiseResultInfo).children('ul').find('li').each((i, el) => {
          if(Number(i) === 0) {
            cruiseShip.sailTo = $(el).find('a').toArray().map(element => {
              return {
                text: $(element).text(),
                url: $(element).attr('href')
              }
            });
          }
          if(Number(i) === 1) {
            cruiseShip.sailFrom = $(el).find('a').toArray().map(element => {
              return {
                text: $(element).text(),
                url: $(element).attr('href')
              }
            });
          }
          if(Number(i) === 2) {
            cruiseShip.duration = $(el).find('a').toArray().map(element => {
              return {
                text: $(element).text(),
                url: $(element).attr('href')
              }
            });
          }
          cruises.push(cruiseShip);
        });
      })
      // Closing the borwser
      await browser.close();
      res.json({
        status: 'success',
        message: 'All cruises retrieved successfully',
        error: null,
        data: cruises
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
        error: error,
        data: null
      });
    }
  }
}

export default new CruiseController();
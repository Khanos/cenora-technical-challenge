"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio = __importStar(require("cheerio"));
class CruiseController {
    getAllCruises(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prefixUrl = 'https://www.carnival.com';
                const browser = yield puppeteer_1.default.launch({
                    headless: true,
                    userDataDir: './cache',
                    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--disable-gpu', '--window-size=1920,1080']
                });
                const page = yield browser.newPage();
                yield page.goto('https://www.carnival.com/cruise-ships.aspx');
                page.on('error', e => {
                    throw new Error(JSON.stringify(e));
                });
                // get the body of the page
                const bodyHTML = yield page.evaluate(() => document.body.innerHTML);
                // load cheerio
                const $ = cheerio.load(bodyHTML, null, false);
                // get the list of cruises
                const cruises = new Array;
                $('.activity-results > .container > .activity-result.ship-result').each((i, el) => {
                    const cruiseShip = {};
                    const cruiseResultInfo = $(el).find('.text')[1];
                    cruiseShip.thumbnail = prefixUrl + $(el).find('.image > img').attr('src');
                    cruiseShip.name = $(cruiseResultInfo).children('h2.title').text();
                    cruiseShip.cruiseUrl = prefixUrl + $(cruiseResultInfo).children('h2.title').children('a').attr('href');
                    $(cruiseResultInfo).children('ul').find('li').each((i, el) => {
                        if (Number(i) === 0) {
                            cruiseShip.sailTo = $(el).find('a').toArray().map(element => {
                                return {
                                    text: $(element).text(),
                                    url: $(element).attr('href')
                                };
                            });
                        }
                        if (Number(i) === 1) {
                            cruiseShip.sailFrom = $(el).find('a').toArray().map(element => {
                                return {
                                    text: $(element).text(),
                                    url: $(element).attr('href')
                                };
                            });
                        }
                        if (Number(i) === 2) {
                            cruiseShip.duration = $(el).find('a').toArray().map(element => {
                                return {
                                    text: $(element).text(),
                                    url: $(element).attr('href')
                                };
                            });
                        }
                        cruises.push(cruiseShip);
                    });
                });
                // Closing the borwser
                yield browser.close();
                res.json({
                    status: 'success',
                    message: 'All cruises retrieved successfully',
                    error: null,
                    data: cruises
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 'error',
                    message: error,
                    error: error,
                    data: null
                });
            }
        });
    }
}
exports.default = new CruiseController();

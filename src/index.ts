import Got from 'got';
import * as moment from 'moment-timezone';
import { JSDOM } from 'jsdom';
import { off } from 'process';

export interface dilbertComic {
    url: string;
    title: string;
    date: string;
}

/**
 * date of the first dilbert comic.
 */
export const dilbertStart = moment().second(0).minute(0).hour(12).date(16).month(3).year(1989);

/**
 * finds the newest dilbert comic and returns it.
 * @throws dilbert get exception
 */
export async function getLatest():Promise<dilbertComic>{
    let time = moment().add(1, 'day').startOf('day');
    return await getByMomentObject(time);
}

/**
 * returns the dilbert comic.
 * @param date the date as a moment object.
 * @throws dilbert get exception
 */
async function getByMomentObject(date: moment.Moment):Promise<dilbertComic> {
    const formatted = date.format("YYYY-MM-DD");
    return await getByDateString(formatted);
}

/**
 * returns the time.
 * @param date the date as a string
 * @throws dilbert get exception
 */
export async function getByDateString(date: string):Promise<dilbertComic> {
    try {
        let response = await Got(`https://dilbert.com/strip/${date}`);
        if(response.statusCode!==200) throw "request error";
        const dom = new JSDOM(response.body);
        const splitUrl =response.url.split('/');
        return {
            url: dom.window.document.querySelector('.img-responsive').getAttribute('src').trim(),
            title: dom.window.document.querySelector('.comic-title-name').textContent.trim(),
            date: splitUrl[splitUrl.length-1].trim()
        }
    } catch (error) {
        console.log(error);
        throw 'dilbert get exception';
    }
}
/**
 * @returns a random dilbert comic.
 * @throws dilbert get exception
 */
export async function getRandom(): Promise<dilbertComic> {
    const days = Math.floor(moment.duration(moment().startOf('day').diff(dilbertStart)).asDays());
    const offset = Math.floor(Math.random() * (days + 1));
    //console.log(offset);
    const day = dilbertStart.clone().add(offset, 'day');
    return await getByMomentObject(day);
}

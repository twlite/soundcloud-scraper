import fetch from 'isomorphic-unfetch';
import { parse as HtmlParser } from 'node-html-parser';
import { Endpoints } from './constants';

const splitTags = [
    { from: 'client_id:"', to: '"' },
    { from: 'client_id=', to: '"' },
];

export async function getHtml(url: string, options?: RequestInit) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error('failed to parse html');
        return await res.text();
    } catch(e) {
        throw e;
    }
}

export async function getJSON<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    const data = await getHtml(url, options);
    return JSON.parse(data);
}

export async function getClientId() {
    try {
        const html = await getHtml(Endpoints.Main);
        const dom = HtmlParser(html);
        const scripts = dom.querySelectorAll('script[crossorigin]')
            .map(m => m.getAttribute('src')!)
            .filter(u => typeof u === 'string');

        const result = await Promise.all(scripts.map(async m => {
            try {
                const page = await getHtml(m);
                if (!page.includes('client_id')) return null;

                for (const tag of splitTags) {
                    try {
                        const token = page.split(tag.from)[1].split(tag.to)[0];
                        if (token) return token;
                    } catch {
                        //
                    }
                }

                return null;
            } catch {
                return null;
            }
        }));

        return result.find(r => typeof r === 'string' && r.length > 0) || null;
    } catch(e) {
        throw e;
    }
}
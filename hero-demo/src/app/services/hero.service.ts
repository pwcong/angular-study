import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Hero } from '../models/hero';



export const HEROES: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';

    private headers = new Headers({
        'Content-Type': 'application/json'
    });


    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(res => res.json().data as Hero[])
            .catch(this.handleError);
    }


    getHero(id: number): Promise<Hero> {

        const url = `${this.heroesUrl}/${id}`;

        return this.http
            .get(url)
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);

    }

    update(hero: Hero): Promise<Hero> {

        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {
                headers: this.headers
            })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);

    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name }), {
                headers: this.headers
            })
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

}

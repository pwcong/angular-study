import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = this.selectedHero === hero ? null : hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes;
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });



  }

  constructor(private heroService: HeroService, private router: Router) { }
}

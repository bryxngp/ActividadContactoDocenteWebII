import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAcerca } from './hero-acerca';

describe('HeroAcerca', () => {
  let component: HeroAcerca;
  let fixture: ComponentFixture<HeroAcerca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAcerca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroAcerca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

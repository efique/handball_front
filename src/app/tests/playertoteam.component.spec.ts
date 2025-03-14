import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayertoteamComponent } from './playertoteam.component';

describe('PlayertoteamComponent', () => {
  let component: PlayertoteamComponent;
  let fixture: ComponentFixture<PlayertoteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayertoteamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayertoteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetronomeLayoutComponent } from './metronome-layout.component';

describe('MetronomeLayoutComponent', () => {
  let component: MetronomeLayoutComponent;
  let fixture: ComponentFixture<MetronomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetronomeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetronomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

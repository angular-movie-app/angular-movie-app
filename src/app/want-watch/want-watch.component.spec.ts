import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantWatchComponent } from './want-watch.component';

describe('WantWatchComponent', () => {
  let component: WantWatchComponent;
  let fixture: ComponentFixture<WantWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WantWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

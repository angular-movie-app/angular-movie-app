import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToWatchComponent } from './want-watch.component';

describe('WantToWatchComponent', () => {
  let component: WantToWatchComponent;
  let fixture: ComponentFixture<WantToWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantToWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WantToWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostComponent } from './view-post.component';

describe('ViewPostComponent', () => {
  let component: ViewPostComponent;
  let fixture: ComponentFixture<ViewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

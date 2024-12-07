import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserRecipeComponent } from './view-user-recipe.component';

describe('ViewUserRecipeComponent', () => {
  let component: ViewUserRecipeComponent;
  let fixture: ComponentFixture<ViewUserRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserRecipeComponent]
    });
    fixture = TestBed.createComponent(ViewUserRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

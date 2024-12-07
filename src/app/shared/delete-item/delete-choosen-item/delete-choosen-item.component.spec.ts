import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChoosenItemComponent } from './delete-choosen-item.component';

describe('DeleteChoosenItemComponent', () => {
  let component: DeleteChoosenItemComponent;
  let fixture: ComponentFixture<DeleteChoosenItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteChoosenItemComponent]
    });
    fixture = TestBed.createComponent(DeleteChoosenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

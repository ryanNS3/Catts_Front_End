import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonGhostLink } from './button-ghost-link';

describe('ButtonGhostLink', () => {
  let component: ButtonGhostLink;
  let fixture: ComponentFixture<ButtonGhostLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGhostLink]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonGhostLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

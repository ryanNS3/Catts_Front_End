import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AnimalModal } from "./animal-modal";

describe("AnimalModal", () => {
  let component: AnimalModal;
  let fixture: ComponentFixture<AnimalModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

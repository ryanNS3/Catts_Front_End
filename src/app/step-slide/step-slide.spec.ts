import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StepSlide } from "./step-slide";

describe("StepSlide", () => {
  let component: StepSlide;
  let fixture: ComponentFixture<StepSlide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSlide],
    }).compileComponents();

    fixture = TestBed.createComponent(StepSlide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

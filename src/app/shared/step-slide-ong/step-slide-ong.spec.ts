import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StepSlideOng } from "./step-slide-ong";

describe("StepSlideOng", () => {
  let component: StepSlideOng;
  let fixture: ComponentFixture<StepSlideOng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSlideOng],
    }).compileComponents();

    fixture = TestBed.createComponent(StepSlideOng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

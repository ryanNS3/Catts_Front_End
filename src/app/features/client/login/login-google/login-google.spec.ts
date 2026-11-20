import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginGoogle } from "./login-google";

describe("LoginGoogle", () => {
  let component: LoginGoogle;
  let fixture: ComponentFixture<LoginGoogle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginGoogle],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginGoogle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

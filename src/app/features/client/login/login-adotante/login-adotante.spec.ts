import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginAdotante } from "./login-adotante";

describe("LoginAdotante", () => {
  let component: LoginAdotante;
  let fixture: ComponentFixture<LoginAdotante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdotante],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAdotante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginOng } from "./login-ong";

describe("LoginOng", () => {
  let component: LoginOng;
  let fixture: ComponentFixture<LoginOng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOng],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginOng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

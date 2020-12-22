import { TestBed, async } from '@angular/core/testing';
import { JoinOptionsComponent } from './join-options.component';
describe('JoinOptionsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JoinOptionsComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(JoinOptionsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

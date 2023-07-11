import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have undefined props', () => {
    expect(component.tabName).not.toBeTruthy();
    expect(component.tabCount).not.toBeTruthy();
    expect(component.active).not.toBeTruthy();
  });

  it('should have prop values as defined', () => {
    component.tabName = 'Testing';
    component.tabCount = '5';
    component.active = true;

    expect(component.tabName).toBe('Testing');
    expect(component.tabCount).toBe('5');
    expect(component.active).toBeTruthy();
  });
});

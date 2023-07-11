import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabbedComponent } from './tabbed.component';
import { Component } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'fridge-to-plate-test-cmp',
  template: `<fridge-to-plate-tabbed>
    <fridge-to-plate-tab tabName="General"></fridge-to-plate-tab>
    <fridge-to-plate-tab tabName="Recommendations"></fridge-to-plate-tab>
  </fridge-to-plate-tabbed>`,
})
class TestWrapperComponent {}

describe('TabbedComponent', () => {
  let component: TabbedComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWrapperComponent, TabbedComponent, TabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have only two tabs', () => {
    expect(component.tabs.length).toBe(2);
  });

  it('should start on General tab', () => {
    const activeTab: TabComponent[] = component.tabs.filter(
      (tab) => tab.active
    );

    expect(activeTab.length).toBe(1);
    expect(activeTab[0].tabName).toBe('General');
  });

  it('should navigate to Recommendations tab', () => {
    component.selectTab(component.tabs.last);

    const activeTab: TabComponent[] = component.tabs.filter(
      (tab) => tab.active
    );

    expect(activeTab.length).toBe(1);

    expect(activeTab[0].tabName).toBe('Recommendations');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhitePaperPage } from './white-paper.page';

describe('WhitePaperPage', () => {
  let component: WhitePaperPage;
  let fixture: ComponentFixture<WhitePaperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitePaperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

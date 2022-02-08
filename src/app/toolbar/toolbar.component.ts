import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  //value used to keep track of the Calendar Week
  calendarWeek: number = 1;
  //start index used for mapping each note or array of notes in the template
  startIndex = 0;
  // Start of first Week in ms
  calendarWeekStart: number = 1641164400000;
  // values used for the filter on the left of the toolbar
  isFrontend: boolean = true;
  isBackend: boolean = true;
  isSecurity: boolean = true;
  // value used for Darkmode switch
  isDarkMode: boolean = false;
  isOpened: boolean = true;
  isMobile: boolean = true;

  /**
   * <p>After intialization any screen size changes are detected,</p>
   * <p>such as maximizing window or restore down</p>
   * <p>Because these are not detected by the Host Listener</p>
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkScreenSize(window.innerWidth, window.innerHeight);
    }, 0);
  }

  /**
   * method to listen on change events<br>
   * change isDarkmode to true or false depending on switch state
   * @param state is the state of the Theme switch "true" or "false"
   */
  onChange(state: any): void {
    this.isDarkMode = state.checked;
  }

  /**
   * this method used to navigate trough Calendar Weeks
   * @param operator value used to check if the calendar week must be increassed or decreased by one week
   */
  setWeekDate(operator: string) {
    let oneWeek = 604800005;
    if (operator === '+' && this.calendarWeek < 52) {
      this.calendarWeek++;
      this.startIndex += 7;
      this.calendarWeekStart += oneWeek;
    }
    if (operator === '-' && this.calendarWeek > 1) {
      this.calendarWeek--;
      this.startIndex -= 7;
      this.calendarWeekStart -= oneWeek;
    }
  }

  /**
   * Method listening to the value of the filter and based on that value is filtering the rows accordingly
   * @param event is the value of the selected option
   */
  filterLabels(event: any) {
    if (event.target.value == 'all') {
      this.isFrontend = true;
      this.isBackend = true;
      this.isSecurity = true;
    }
    if (event.target.value == 'frontend') {
      this.isFrontend = true;
      this.isBackend = false;
      this.isSecurity = false;
    }
    if (event.target.value == 'backend') {
      this.isFrontend = false;
      this.isBackend = true;
      this.isSecurity = false;
    }
    if (event.target.value == 'security') {
      this.isFrontend = false;
      this.isBackend = false;
      this.isSecurity = true;
    }
  }

  /**
   * This Host Listener is listening to screen size changes and fires the checkScreenSize function
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(window.innerWidth, window.innerHeight);
  }

  /**
   *Function used to check if the screen size is in mobile mode under 800px Height or 1000px Width
   * @param width Screen inner Width
   * @param height Screen inner Height
   */
  checkScreenSize(width: number, height: number) {
    if (width < 1000 || height < 800) {
      this.isMobile = true;
      this.isOpened = false;
    } else {
      this.isMobile = false;
      this.isOpened = true;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css'],
})
export class TextButtonComponent implements OnInit {
  color!: string;
  @Input() hue!: string;
  @Input() saturation!: string;
  @Input() lightness!: string;

  ngOnInit() {
    this.initColor();
  }

  initColor() {
    const hue = this.hue ? this.hue : '213';
    const saturation = this.saturation ? this.saturation : '10';
    const lightness = this.lightness ? this.lightness : '45';

    this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  setHoverLightness() {
    const hue = this.hue ? this.hue : '213';
    const saturation = this.saturation ? this.saturation : '10';
    const lightness = this.lightness ? this.lightness : '45';

    this.color = `hsl(${hue}, ${saturation}%, ${Number(lightness) - 10}%)`;
  }

  setLeaveLightness() {
    this.initColor();
  }
}
